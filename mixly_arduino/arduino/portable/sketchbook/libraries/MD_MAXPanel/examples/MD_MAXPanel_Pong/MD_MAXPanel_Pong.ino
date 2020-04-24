// Implements the game of Pong using MD_MAXPanel library
//
// Hardware Used
// =============
// UP_PIN     - left bat up switch, INPUT_PULLUP
// RIGHT_PIN  - right bat up switch, INPUT_PULLUP
// RIGHT_PIN  - left bat up switch, INPUT_PULLUP
// DOWN_PIN   - right bat up switch, INPUT_PULLUP
// SELECT_PIN - unused
// ENTER_PIN  - unused
// BEEPER_PIN - piezo speaker
// CLK_PIN, DATA_PIN, CS_PIN - LED matrix display connections
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
//
// Rules of the Game
// =================
// Simple game like table tennis where each player has to bat the ball to keep
// it in play. Points awarded when the ball goes out at the opponents side. First
// to reach MAX_SCORE is the winner.


#include <MD_MAXPanel.h>
#include "Font5x3.h"
#include "score.h"
#include "sound.h"

// Turn on debug statements to the serial output
#define  DEBUG  0

#if  DEBUG
#define PRINT(s, x)  { Serial.print(F(s)); Serial.print(x); }
#define PRINTS(x)    { Serial.print(F(x)); }
#define PRINTD(x)    { Serial.print(x, DEC); }
#define PRINTXY(s, x, y) { Serial.print(s); Serial.print(F("(")); Serial.print(x); Serial.print(F(",")); Serial.print(y); Serial.print(")"); }

#else
#define PRINT(s, x)
#define PRINTS(x)
#define PRINTD(x)
#define PRINTXY(s, x, y)

#endif

// Hardware pin definitions. 
// All momentary on switches are initialised INPUT_PULLUP
const uint8_t UP_PIN = 2;
const uint8_t RIGHT_PIN = 3;
const uint8_t DOWN_PIN = 4;
const uint8_t LEFT_PIN = 5;
const uint8_t SELECT_PIN = 6;
const uint8_t ENTER_PIN = 7;
const uint8_t BEEPER_PIN = 9;

// Define the number of devices in the chain and the SPI hardware interface
// NOTE: These pin numbers will probably not work with your hardware and may
// need to be adapted
const MD_MAX72XX::moduleType_t HARDWARE_TYPE = MD_MAX72XX::FC16_HW;
const uint8_t X_DEVICES = 4;
const uint8_t Y_DEVICES = 5;

const uint8_t CLK_PIN = 13;   // or SCK
const uint8_t DATA_PIN = 11;  // or MOSI
const uint8_t CS_PIN = 10;    // or SS

// SPI hardware interface
MD_MAXPanel mp = MD_MAXPanel(HARDWARE_TYPE, CS_PIN, X_DEVICES, Y_DEVICES);
// Arbitrary pins
// MD_MAXPanel mx = MD_MAXPanel(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES);

uint16_t FIELD_TOP;   // needs to be initialised in setup()
const uint16_t FIELD_BOTTOM = 0;

const uint8_t BAT_SIZE_DEFAULT = 3;
const uint8_t BAT_EDGE_OFFSET = 1;

const char TITLE_TEXT[] = "PONG";
const uint16_t SPLASH_DELAY = 5000;     // in milliseconds

const char GAME_TEXT[] = "GAME";
const char OVER_TEXT[] = "OVER";
const uint16_t GAME_OVER_DELAY = 3000;   // in milliseconds

const uint8_t FONT_NUM_WIDTH = 3;
const uint8_t MAX_SCORE = 11;

// A class to encapsulate the pong bat
// Bats are used either side of the display, moving up and down
class cPongBat
{
private:
  uint16_t _x, _y;    // the position of the center of the bat
  uint16_t _ymin, _ymax;  // the max and min bat boundaries
  int8_t   _vel;      // the velocity of the bat (+1 for moving up, -1 moving down)
  uint8_t  _size;     // the size in pixels for the bat (odd number)
  uint8_t  _pinUp;    // the pin for the up switch
  uint8_t  _pinDown;  // the pin for th down switch
  uint16_t _batDelay; // the delay between possible moves of the bat in milliseconds
  uint32_t _timeLastMove; // the millis() value for the last time we moved the bat

public:
  enum hitType_t { NO_HIT, CORNER_HIT, FLAT_HIT };

  void begin(uint16_t x, uint16_t y, uint16_t ymin, uint16_t ymax, uint8_t size, uint8_t pinU, uint8_t pinD)
  {
    _x = x;
    _y = y;
    _ymin = ymin;
    _ymax = ymax;
    _vel = 0;
    _size = size;
    _pinUp = pinU;
    _pinDown = pinD;
    _batDelay = 40;
    pinMode(_pinUp, INPUT_PULLUP);
    pinMode(_pinDown, INPUT_PULLUP);
  }

  uint16_t getX(void) { return (_x); }
  uint16_t getY(void) { return (_y); }

  int8_t getVelocity(void) { return(_vel); }
  void draw(void)   { mp.drawVLine(_x, _y - (_size / 2), _y + (_size / 2), true); }
  void erase(void)  { mp.drawVLine(_x, _y - (_size / 2), _y + (_size / 2), false); }
  bool anyKey(void) { return((digitalRead(_pinUp) == LOW) || (digitalRead(_pinDown) == LOW)); }

  hitType_t hit(uint16_t x0, uint16_t y0, uint16_t x1, uint16_t y1) 
  { 
    int16_t dy = y1 - y0;

    // if we are not in the same x plane as the bat there can be no hit
    if (x1 != _x) return(NO_HIT);

    // if the ball is at 
    // - the top of the bat and traveling down, or 
    // - the bottom of the bat and traveling up
    // then it is a corner hit
    if ((y1 == _y + (_size / 2) && dy < 0) || (y1 == _y - (_size / 2) && dy>0))
      return(CORNER_HIT);

    // the ball is between the top and bottom of the bat boundaries inclusive
    // then it is a flat hit
    if (y1 <= _y + (_size / 2) && y1 >= _y - (_size / 2))
      return(FLAT_HIT);

    // and in case we missed something, a default no hit
    return(NO_HIT); 
  }

  void move(void)
  {
    bool moveUp = (digitalRead(_pinUp) == LOW);
    bool moveDown = (digitalRead(_pinDown) == LOW);

    // if this is the time for a move? 
    if (millis() - _timeLastMove <= _batDelay)
      return;
    _timeLastMove = millis();

    mp.update(false);

    if (moveUp)
    {
      PRINTS("\n-- BAT move up");
      erase();
      _vel = 1;
      _y++;
      if (_y + (_size/2) > _ymax) _y--;  // keep within top boundary
      draw();
    }
    else if (moveDown)
    {
      PRINTS("\n-- BAT move down");
      erase();
      _vel = -1;
      _y--;
      if (_y - (_size/2) < _ymin) _y++;  // keep within bottom boundary
      draw();
    }
    else
      _vel = 0;

    mp.update(true);
  }
};

// A class to encapsulate the pong ball
// Ball will bounce around. Bounces off the edges and bats.
class cPongBall
{
private:
  uint16_t _x, _y;        // the position of the center of the ball
  int8_t   _dx, _dy;      // the offsets for the x and y direction
  uint32_t _timeLastMove; // last time the ball was moved
  uint16_t _ballDelay;    // the delay between ball moves in milliseconds
  bool     _run;          // ball is running when true

public:
  enum bounce_t { BOUNCE_NONE, BOUNCE_BACK, BOUNCE_TOP, BOUNCE_BOTTOM, BOUNCE_LEFT, BOUNCE_RIGHT }; 

  void begin(uint16_t x, uint16_t y)
  {
    reset(x, y); 
    _dx = _dy = 1;
    _timeLastMove = 0;
    _ballDelay = 100;
    _run = false;
  }

  uint16_t getX(void) { return (_x); }
  uint16_t getY(void) { return (_y); }
  uint16_t getNextX(void) { return (_x + _dx); }
  uint16_t getNextY(void) { return (_y + _dy); }

  void start(void) { _run = true; }
  void stop(void)  { _run = false; }
  void draw(void)  { mp.setPoint(_x, _y, true); } //PRINTS("\nball@"); PRINTXY(_x, _y); }
  void erase(void) { mp.setPoint(_x, _y, false); }
  void reset(uint16_t x, uint16_t y) { _x = x; _y = y; }

  bool move(void) 
  { 
    // if this is the time for a move? 
    if (_run && millis() - _timeLastMove <= _ballDelay)
      return(false);
    _timeLastMove = millis();

    // do the animation
    mp.update(false);
    erase();  
    _x = _x + _dx;
    _y = _y + _dy;
    draw();
    mp.update(true);

    return(true);
  }

  void bounce(bounce_t b)
  {
    switch (b)
    {
    case BOUNCE_TOP:    
    case BOUNCE_BOTTOM: _dy = -_dy; break;
    case BOUNCE_LEFT:   
    case BOUNCE_RIGHT:  _dx = -_dx; break;
    case BOUNCE_BACK:   _dx = -_dx; _dy = -_dy; break;
    }
  }
};

// main objects coordinated by the code logic
cPongBat batL, batR;
cScore scoreL, scoreR;
cPongBall ball;
cSound sound;

void centerLine(void)
// Dotted line down the middle
{
  bool bOn = true;

  mp.update(false);
  for (uint16_t y = FIELD_BOTTOM + 1; y < FIELD_TOP; y++)
  {
    mp.setPoint(mp.getXMax() / 2, y, bOn);
    mp.setPoint((mp.getXMax() + 1) / 2, y, bOn);
    bOn = !bOn;
  }
  mp.update(true);
}

void setupField(void)
// Draw the playing field at the start of the game.
{
  mp.clear();
  mp.drawHLine(FIELD_BOTTOM, 0, mp.getXMax());
  mp.drawHLine(FIELD_TOP, 0, mp.getXMax());
  centerLine();
  batL.draw();
  batR.draw();
  scoreL.draw();
  scoreR.draw();
  ball.draw();
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_Pong]");

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  mp.setRotation(MD_MAXPanel::ROT_90);

  sound.begin(BEEPER_PIN);

  FIELD_TOP = mp.getYMax() - mp.getFontHeight() - 2;
}

void loop(void)
{
  static enum { S_SPLASH, S_INIT, S_GAME_START, S_POINT_PLAY, S_POINT_END, S_WAIT_LSTART, S_WAIT_RSTART, S_GAME_OVER } runState = S_SPLASH;

  switch (runState)
  {
  case S_SPLASH:    // show splash screen at start
    {
      const uint16_t border = 2;

      mp.clear();
      mp.drawRectangle(border, border, mp.getXMax() - border, mp.getYMax() - border);
      mp.drawLine(0, 0, border, border);
      mp.drawLine(0, mp.getYMax(), border, mp.getYMax()-border);
      mp.drawLine(mp.getXMax(), 0, mp.getXMax()-border, border);
      mp.drawLine(mp.getXMax(), mp.getYMax(), mp.getXMax()-border, mp.getYMax()-border);
      mp.drawText((mp.getXMax() - mp.getTextWidth(TITLE_TEXT)) / 2, (mp.getYMax() + mp.getFontHeight())/2 , TITLE_TEXT); 
      sound.splash();
      delay(SPLASH_DELAY);
      runState = S_INIT;
    }
    break;

  case S_INIT:  // initialise for a new game
    batL.begin(BAT_EDGE_OFFSET, (FIELD_TOP - FIELD_BOTTOM) / 2, FIELD_BOTTOM + 1, FIELD_TOP - 1, BAT_SIZE_DEFAULT, UP_PIN, LEFT_PIN);
    batR.begin(mp.getXMax() - BAT_EDGE_OFFSET, (FIELD_TOP - FIELD_BOTTOM) / 2, FIELD_BOTTOM + 1, FIELD_TOP - 1, BAT_SIZE_DEFAULT, RIGHT_PIN, DOWN_PIN);

    scoreL.begin(&mp, BAT_EDGE_OFFSET, FIELD_TOP + 1 + mp.getFontHeight(), MAX_SCORE);
    scoreR.limit(MAX_SCORE);    // set width() used below
    scoreR.begin(&mp, mp.getXMax() - (scoreR.width() * (FONT_NUM_WIDTH + mp.getCharSpacing())) + mp.getCharSpacing(), FIELD_TOP + 1 + mp.getFontHeight(), MAX_SCORE);

    ball.begin((mp.getXMax() / 2) - BAT_EDGE_OFFSET - 1, (FIELD_TOP - FIELD_BOTTOM) / 3);

    setupField();

    runState = S_GAME_START;
    break;

  case S_GAME_START:  // waiting for the start of a new game
    if (batL.anyKey() || batR.anyKey())
    {
      PRINTS("\n-- Starting Game");
      scoreL.reset();
      scoreR.reset();
      sound.start();
      ball.start();
      runState = S_POINT_PLAY;
    }
    break;

  case S_POINT_PLAY:    // playing a point
    // handle the bat animation first
    batL.move();
    batR.move();

    // now move the ball and check what this means
    if (ball.move())
    {
      cPongBat::hitType_t lastHit;

      // redraw the centerline if the ball is near it
      if (ball.getX() >= (mp.getXMax() / 2) - 1 || ball.getX() >= (mp.getXMax() / 2) + 2)
      {
        centerLine();
        ball.draw();
      }

      // check for top/bottom edge collisions
      if (ball.getY() == FIELD_TOP - 1)
      {
        PRINTS("\n-- COLLISION top edge");
        ball.bounce(cPongBall::BOUNCE_TOP);
        sound.bounce();
      }
      else if (ball.getY() == FIELD_BOTTOM + 1)
      {
        PRINTS("\n-- COLLISION bottom edge");
        ball.bounce(cPongBall::BOUNCE_BOTTOM);
        sound.bounce();
      }

      // check for bat collisions
      if ((lastHit = batL.hit(ball.getX(), ball.getY(), ball.getNextX(), ball.getNextY())) != cPongBat::NO_HIT)
      {
        PRINTS("\n-- COLLISION left bat");
        ball.bounce(lastHit == cPongBat::CORNER_HIT ? cPongBall::BOUNCE_BACK: cPongBall::BOUNCE_LEFT);
        sound.hit();
      }
      else if ((lastHit = batR.hit(ball.getX(), ball.getY(), ball.getNextX(), ball.getNextY())) != cPongBat::NO_HIT)
      {
        PRINTS("\n-- COLLISION right bat");
        ball.bounce(lastHit == cPongBat::CORNER_HIT ? cPongBall::BOUNCE_BACK : cPongBall::BOUNCE_RIGHT);
        sound.hit();
      }

      // check for out of bounds
      if ((ball.getX() < BAT_EDGE_OFFSET) || (ball.getX() > mp.getXMax() - BAT_EDGE_OFFSET))
      {
        PRINTS("\n-- OUT!");
        runState = S_POINT_END;
      }
    }
    break;

  case S_POINT_END:  // handle the ball going out
    ball.stop();
    batL.draw();
    batR.draw();
    sound.point();
    delay(500);
    ball.erase();
    if (ball.getX() < BAT_EDGE_OFFSET)  // out on the left side
    {
      PRINTS("\n--- LEFT side");
      ball.reset(BAT_EDGE_OFFSET + 1, batL.getY());
      ball.bounce(cPongBall::BOUNCE_LEFT);
      scoreR.increment();
      if (scoreR.score() == MAX_SCORE)
        runState = S_GAME_OVER;
      else
      runState = S_WAIT_LSTART;
    }
    else      // out on the right side
    {
      PRINTS("\n--- RIGHT side");
      ball.reset(mp.getXMax() - BAT_EDGE_OFFSET - 1, batR.getY());
      ball.bounce(cPongBall::BOUNCE_RIGHT);
      scoreL.increment();
      if (scoreL.score() == MAX_SCORE)
        runState = S_GAME_OVER;
      else
        runState = S_WAIT_RSTART;
    }
    ball.draw();
    break;

  case S_WAIT_LSTART: // waiting for left playter to restart the game
    if (batL.anyKey())
    {
      ball.start();
      runState = S_POINT_PLAY;
    }
    break;

  case S_WAIT_RSTART: // waiting fo the right player to restrt the game
    if (batR.anyKey())
    {
      ball.start();
      runState = S_POINT_PLAY;
    }
    break;

  case S_GAME_OVER:
    mp.drawText((mp.getXMax() - mp.getTextWidth(GAME_TEXT))/2, (FIELD_TOP - FIELD_BOTTOM)/2 + mp.getFontHeight() + 1, GAME_TEXT);
    mp.drawText((mp.getXMax() - mp.getTextWidth(OVER_TEXT)) / 2, (FIELD_TOP - FIELD_BOTTOM)/2 - 1, OVER_TEXT);
    sound.over();
    delay(GAME_OVER_DELAY);
    runState = S_INIT;
    break;
  }
}
