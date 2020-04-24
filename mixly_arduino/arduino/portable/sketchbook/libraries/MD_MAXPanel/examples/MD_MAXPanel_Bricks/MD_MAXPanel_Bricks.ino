// Implements the game of Bricks using MD_MAXPanel library
//
// Hardware used
// =============
// LEFT_PIN   - bat left switch, INPUT_PULLUP
// RIGHT_PIN  - bat right  switch, INPUT_PULLUP
// UP_PIN     - unused
// DOWN_PIN   - unused
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
// Player must keep the ball in play by batting it away. Each 'brick' that
// is hit scores points. Once all the bricks are cleared the game continues
// with a new screen. Game end when the ball is let out of bounds.

#include <MD_MAXPanel.h>
#include "Font5x3.h"
#include "score.h"
#include "sound.h"

// Turn on debug statements to the serial output
#define  DEBUG  0

#if  DEBUG
#define PRINT(s, x)    { Serial.print(F(s)); Serial.print(x); }
#define PRINTS(x)      { Serial.print(F(x)); }
#define PRINTD(x)      { Serial.print(x, DEC); }
#define PRINTXY(s,x,y) { Serial.print(F(s)); Serial.print(F("(")); Serial.print(x); Serial.print(F(",")); Serial.print(y); Serial.print(")"); }
#define PRINTSTATE(s)  { Serial.print("\n++>"); Serial.print(s); }

#else
#define PRINT(s, x)
#define PRINTS(x)
#define PRINTD(x)
#define PRINTXY(s,x,y)
#define PRINTSTATE(s)

#endif

// Hardware pin definitions. 
// All momentary on switches are initialized INPUT_PULLUP
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

const uint8_t CLK_PIN = 12;   // or SCK
const uint8_t DATA_PIN = 11;  // or MOSI
const uint8_t CS_PIN = 10;    // or SS

// SPI hardware interface
MD_MAXPanel mp = MD_MAXPanel(HARDWARE_TYPE, CS_PIN, X_DEVICES, Y_DEVICES);
// Arbitrary pins
// MD_MAXPanel mx = MD_MAXPanel(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES);

uint16_t FIELD_TOP, FIELD_RIGHT;   // needs to be initialised in setup()
const uint16_t FIELD_LEFT = 1;

const uint8_t BRICK_SIZE_DEFAULT = 3;
const uint8_t BAT_SIZE_DEFAULT = 3;   // must be an odd number
const uint8_t BAT_EDGE_OFFSET = 1;

const char TITLE_TEXT[] = "BRICKS";
const uint16_t SPLASH_DELAY =3000;     // in milliseconds

const char GAME_TEXT[] = "GAME";
const char OVER_TEXT[] = "OVER";
const uint16_t GAME_OVER_DELAY = 3000;   // in milliseconds

const uint8_t FONT_NUM_WIDTH = 3;
const uint8_t MAX_LIVES = 9;
const uint16_t MAX_SCORE = 999;

// A class to encapsulate the bricks bat
// Bat runs at the bottom of the display to keep the ball in play
class cBrickBat
{
private:
  uint16_t _x, _y;      // the position of the center of the bat
  uint16_t _xmin, _xmax;  // the max and min bat boundaries
  int8_t   _vel;        // the velocity of the bat (+1 for moving up, -1 moving down)
  uint8_t  _size;       // the size in pixels for the bat (odd number)
  uint8_t  _pinLeft;    // the pin for the up switch
  uint8_t  _pinRight;   // the pin for th down switch
  uint16_t _batDelay;   // the delay between possible moves of the bat in milliseconds
  uint32_t _timeLastMove; // the millis() value for the last time we moved the bat

public:
  enum hitType_t { NO_HIT, CORNER_HIT, FLAT_HIT };

  void begin(uint16_t x, uint16_t y, uint16_t xmin, uint16_t xmax, uint8_t size, uint8_t pinL, uint8_t pinR)
  {
    _x = x;
    _y = y;
    _xmin = xmin;
    _xmax = xmax;
    _vel = 0;
    _size = size;
    _pinLeft = pinL;
    _pinRight = pinR;
    _batDelay = 40;
    pinMode(_pinLeft, INPUT_PULLUP);
    pinMode(_pinRight, INPUT_PULLUP);
    PRINTXY("\nbat @", _x, _y);
    PRINTXY(" limits", _xmin, _xmax);
  }

  uint16_t getX(void) { return (_x); }
  uint16_t getY(void) { return (_y); }

  int8_t getVelocity(void) { return(_vel); }
  void draw(void)   { mp.drawHLine(_y, _x - (_size / 2), _x + (_size / 2), true); }
  void erase(void)  { mp.drawHLine(_y, _x - (_size / 2), _x + (_size / 2), false); }
  bool anyKey(void) { return(digitalRead(_pinLeft) == LOW || digitalRead(_pinRight) == LOW); }

  hitType_t hit(uint16_t x0, uint16_t y0, uint16_t x1, uint16_t y1) 
  { 
    int16_t dx = x1 - x0;

    // if we are not in the same y plane as the bat there can be no hit
    if (y1 != _y) return(NO_HIT);

    // if the ball is at 
    // - the left of the bat and travelling left to right, or 
    // - the right of the bat and travelling right to left
    // then it is a corner hit
    if ((x1 == _x + (_size / 2) && dx < 0) || (x1 == _x - (_size / 2) && dx>0))
      return(CORNER_HIT);

    // the ball is between the left and right bat boundaries inclusive
    // then it is a flat hit
    if (x1 <= _x + (_size / 2) && x1 >= _x - (_size / 2))
      return(FLAT_HIT);

    // and in case we missed something, a default no hit
    return(NO_HIT); 
  }

  bool move(void)
  {
    bool moveLeft = (digitalRead(_pinLeft) == LOW);
    bool moveRight = (digitalRead(_pinRight) == LOW);

    // if this is the time for a move? 
    if (millis() - _timeLastMove <= _batDelay)
      return(false);
    _timeLastMove = millis();

    mp.update(false);

    if (moveRight)
    {
      PRINTS("\n-- BAT move Left");
      erase();
      _vel = 1;
      _x++;
      if (_x + (_size/2) > _xmax) _x--;  // keep within top boundary
      draw();
    }
    else if (moveLeft)
    {
      PRINTS("\n-- BAT move right");
      erase();
      _vel = -1;
      _x--;
      if (_x - (_size/2) < _xmin) _x++;  // keep within bottom boundary
      draw();
    }
    else
      _vel = 0;

    mp.update(true);
    return((moveLeft || moveRight));
  }
};

// A class to encapsulate the bricks ball
// Ball bounces off the bat, edges and bricks
class cBrickBall
{
private:
  uint16_t _x, _y;        // the position of the center of the ball
  int8_t   _dx, _dy;      // the offsets for the x and y direction
  uint16_t _xmin, _ymin;  // minimum bounds for the ball
  uint16_t _xmax, _ymax;  // maximum bounds for the ball
  uint32_t _timeLastMove; // last time the ball was moved
  uint16_t _ballDelay;    // the delay between ball moves in milliseconds
  bool     _run;          // ball is running when true

public:
  enum bounce_t { BOUNCE_NONE, BOUNCE_BACK, BOUNCE_TOP, BOUNCE_BOTTOM, BOUNCE_LEFT, BOUNCE_RIGHT }; 

  void begin(uint16_t x, uint16_t y, uint16_t xmin, uint16_t ymin, uint16_t xmax, uint16_t ymax)
  {
    _dx = _dy = 1;
    _timeLastMove = 0;
    _ballDelay = 100;
    _xmin = xmin;
    _xmax = xmax;
    _ymin = ymin;
    _ymax = ymax;
    _run = false;
    reset(x, y);
  }

  uint16_t getX(void) { return (_x); }
  uint16_t getY(void) { return (_y); }
  uint16_t getNextX(void) { return (_x + _dx); }
  uint16_t getNextY(void) { return (_y + _dy); }
  uint16_t getDelay(void) { return (_ballDelay); }
  void setDelay(uint16_t delay) { if (delay > 10) _ballDelay = delay; }

  void start(void) { _run = true; }
  void stop(void)  { _run = false; }
  void draw(void)  { mp.setPoint(_x, _y, true); } // PRINTXY("\nball@", _x, _y); }
  void erase(void) { mp.setPoint(_x, _y, false); }
  void reset(uint16_t x, uint16_t y) { _x = x; _y = y; _dy = 1; }

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

    // ensure it always stays in bounds
    if (_x < _xmin) { _x = _xmin; _dx = -_dx; }
    if (_x > _xmax) { _x = _xmax; _dx = -_dx; }
    if (_y < _ymin) { _y = _ymin; _dy = -_dy; }
    if (_y > _ymax) { _y = _ymax; _dy = -_dy; }

    // now update
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

// A class to encapsulate the entire field of bricks
// All the bricks are contained in this object.
class cBrickField
{
private:
  struct brick_t
  {
    uint16_t x, y; // leftmost coordinate for this brick
    brick_t *next; // the next in the linked list
  };

  uint8_t _size;      // size of the bricks
  brick_t *_bricks;   // start of the list
  brick_t *_deleted;  // the deleted list

  void draw(brick_t *pb)  { mp.drawHLine(pb->y, pb->x, pb->x + _size-1, true); }
  void erase(brick_t *pb) { mp.drawHLine(pb->y, pb->x, pb->x + _size-1, false); }

  void add(uint16_t x, uint16_t y)
  // add a brick to the start of the list
  {
    brick_t *pb;
    
    if (_deleted == nullptr)
      pb = new brick_t;
    else
    {
      // take from the front of the deleted list
      pb = _deleted;
      _deleted = _deleted->next;
    }

    pb->x = x;
    pb->y = y;
    pb->next = _bricks;
    _bricks = pb;

    return(pb);
  }

  void del(brick_t *pbPrev, brick_t *pb)
  // delete the specified brick from the list
  {
    if (pbPrev == nullptr)
      _bricks = pb->next;
    else
      pbPrev->next = pb->next;

    // save to the front of the deleted list
    pb->next = _deleted;
    _deleted = pb;
  }

  void dumpList(void)
  {
    PRINTS("\nDUMP List ===");
    for (brick_t *pb = _bricks; pb != nullptr; pb = pb->next)
    {
      PRINTXY("\n", pb->x, pb->y);
      draw(pb);
    }
    PRINTS("\n===");
  }

public:
  enum bounce_t { BOUNCE_NONE, BOUNCE_BACK, BOUNCE_UP, BOUNCE_DOWN };

  void begin(uint16_t xmin, uint16_t ymin, uint16_t xmax, uint16_t ymax, uint8_t size)
  {
    // work out how many bricks we can put in the space
    const uint8_t gapX = 2;
    const uint8_t gapY = 3;
    uint8_t marginSide = 2;
    const uint8_t marginTop = gapY;
    const uint8_t numAcross = (xmax - xmin - marginSide - marginSide + size) / (gapX + size);
    const uint8_t numDown = (ymax - ymin - marginTop) / gapY;

    // now adjust the side margin to center the display as much as possible
    marginSide = (1 + (xmax - xmin) - ((numAcross - 1)*gapX) - (numAcross*size))/2;

    PRINT("\nBricks size=", size);
    PRINTXY(" field = ", xmin, ymin);
    PRINTXY(" ", xmax, ymax);
    PRINT(" -> Across=", numAcross);
    PRINT(" Down=", numDown);
    PRINT(" Adj margin=", marginSide);

    _size = size;
    _bricks = _deleted = nullptr;

    // create all the bricks
    uint16_t x = xmin + marginSide;
    for (uint8_t i = 0; i < numAcross; i++)
    {
      uint16_t y = ymax - marginTop;

      PRINT("\nin column ", i);
      for (uint8_t j = 0; j < numDown; j++)
      {
        add(x, y);
        PRINTXY(" - ", x, y);
        y -= gapY;
      }
      x += (gapX + size);
    }

    //dumpList();  // debug to verify the list is created properly
  }

  bool emptyField(void) { return(_bricks == nullptr); }
  void drawField(void)  { for (brick_t *pb = _bricks; pb != nullptr; pb = pb->next) draw(pb); }
  void eraseField(void) { while (_bricks != nullptr) { erase(_bricks); del(nullptr, _bricks); } }

  bounce_t checkHits(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2)
  {
    brick_t *pb = _bricks;
    brick_t *pbPrev = nullptr;
    int16_t dx = x2 - x1;
    int16_t dy = y2 - y1;
    bounce_t b = BOUNCE_NONE;

    while (pb != nullptr)
    {
      if (y2 == pb->y)  // at the same height as this brick
      {
        // check one of the corners with sideways approach
        if ((x2 == pb->x && dx > 0) || (x2 == pb->x - _size - 1 && dx < 0))
        {
          PRINTS("\n-! BRICK hit on corner");
          b = BOUNCE_BACK;
        }
        // check the whole flat surface with any approach
        else if (x2 >= pb->x && x2 <= pb->x + _size - 1)
        {
          if (dy < 0)
          {
            b = BOUNCE_UP;
            PRINTS("\n-! BRICK hit on top");
          }
          else
          {
            b = BOUNCE_DOWN;
            PRINTS("\n-! BRICK hit on bottom");
          }
        }

        // eliminate this brick
        if (b != BOUNCE_NONE)
        {
          PRINTXY("\n-! Ball @", x1, y1);
          PRINTXY(" next@", x2, y2);
          PRINTXY(" brick ", pb->x, pb->y);
          PRINTXY("-", pb->x+_size-1, pb->y);
          PRINTS(" - deleting");
          erase(pb);
          del(pbPrev, pb);
          break;   // no point looping further - only one brick per hit
        }
      }
      // advance the pointers
      pbPrev = pb;
      pb = pb->next;
    }

    return(b);
  }
};

// main objects coordinated by the code logic
cScore lives, score;
cBrickBall ball;
cBrickBat bat;
cBrickField bricks;
cSound sound;

void setupField(void)
// Draw the playing field at the start of the game.
{
  mp.clear();
  mp.drawHLine(FIELD_TOP, FIELD_LEFT, FIELD_RIGHT);
  mp.drawVLine(FIELD_LEFT, 0, FIELD_TOP);
  mp.drawVLine(FIELD_RIGHT, 0, FIELD_TOP);
  bat.draw();
  lives.draw();
  score.draw();
  ball.draw();
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_Bricks]");

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  mp.setRotation(MD_MAXPanel::ROT_90);

  // one time initialization
  FIELD_TOP = mp.getYMax() - mp.getFontHeight() - 2;
  FIELD_RIGHT = mp.getXMax() - 1;

  bat.begin((FIELD_RIGHT - FIELD_LEFT) / 2, BAT_EDGE_OFFSET, FIELD_LEFT + 1, FIELD_RIGHT - 1, BAT_SIZE_DEFAULT, LEFT_PIN, RIGHT_PIN);
  ball.begin(bat.getX(), bat.getY() + 1, FIELD_LEFT+1, 0, FIELD_RIGHT-1, FIELD_TOP-1);
  lives.begin(&mp, FIELD_LEFT + 1, FIELD_TOP + 1 + mp.getFontHeight(), MAX_LIVES);
  score.limit(MAX_SCORE);   // set width() so we can used it below
  score.begin(&mp, FIELD_RIGHT - (score.width() * (FONT_NUM_WIDTH + mp.getCharSpacing())) + mp.getCharSpacing(), FIELD_TOP + 1 + mp.getFontHeight(), MAX_SCORE);
  sound.begin(BEEPER_PIN);
}

void loop(void)
{
  static enum { S_SPLASH, S_INIT, S_WAIT_START, S_POINT_PLAY, S_BALL_OUT, S_BRICKS_EMPTY, S_POINT_RESET, S_GAME_OVER } runState = S_SPLASH;

  switch (runState)
  {
  case S_SPLASH:    // show splash screen at start
    PRINTSTATE("SPLASH");
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

  case S_INIT:  // initialize for a new game
    PRINTSTATE("INIT");
    ball.reset(bat.getX(), bat.getY() + 1);
    lives.set(MAX_LIVES);
    score.reset();
    setupField();
    bricks.begin(FIELD_LEFT + 1, FIELD_TOP / 3, FIELD_RIGHT - 1, FIELD_TOP - 1, BRICK_SIZE_DEFAULT);
    bricks.drawField();

    runState = S_WAIT_START;
    PRINTSTATE("WAIT_START");
    break;

  case S_WAIT_START:  // waiting for the start of a new game
    if (bat.anyKey())
    {
      PRINTS("\n-- Starting Game");
      sound.start();
      ball.start();
      runState = S_POINT_PLAY;
      PRINTSTATE("POINT_PLAY");
    }
    break;

  case S_POINT_PLAY:    // playing a point
    // handle the bat animation first
    bat.move();

    // now move the ball and check what this means
    if (ball.move())
    {
      cBrickBat::hitType_t lastHit;

      // check for top/bottom edge collisions
      if (ball.getX() <= FIELD_LEFT + 1)
      {
        PRINTS("\n-- COLLISION left edge");
        ball.bounce(cBrickBall::BOUNCE_LEFT);
        sound.bounce();
      }
      else if (ball.getX() >= FIELD_RIGHT - 1)
      {
        PRINTS("\n-- COLLISION right edge");
        ball.bounce(cBrickBall::BOUNCE_RIGHT);
        sound.bounce();
      }
      if (ball.getY() >= FIELD_TOP - 1)
      {
        PRINTS("\n-- COLLISION top edge");
        ball.bounce(cBrickBall::BOUNCE_TOP);
        sound.bounce();
      } 

      // check for bat collisions
      if ((lastHit = bat.hit(ball.getX(), ball.getY(), ball.getNextX(), ball.getNextY())) != cBrickBat::NO_HIT)
      {
        PRINTS("\n-- COLLISION bat");
        ball.bounce(lastHit == cBrickBat::CORNER_HIT ? cBrickBall::BOUNCE_BACK : cBrickBall::BOUNCE_BOTTOM);
        sound.hit();
      }

      // check for out of bounds at the bottom
      if (ball.getY() < BAT_EDGE_OFFSET)
      {
        PRINTS("\n-- OUT!");
        runState = S_BALL_OUT;
      }

      // check for any hits to bricks
      cBrickField::bounce_t b;
      if ((b = bricks.checkHits(ball.getX(), ball.getY(), ball.getNextX(), ball.getNextY())) != cBrickField::BOUNCE_NONE)
      {
        score.increment();
        sound.bounce();
        // check if this is the end of all the bricks
        if (bricks.emptyField())
        {
          PRINTS("\n== BRICKS empty");
          runState = S_BRICKS_EMPTY;
        }
        else
        {
          // otherwise we need to bounce the ball in the right direction
          switch (b)
          {
          case cBrickField::BOUNCE_UP:   ball.bounce(cBrickBall::BOUNCE_BOTTOM); break;
          case cBrickField::BOUNCE_DOWN: ball.bounce(cBrickBall::BOUNCE_TOP);    break;
          case cBrickField::BOUNCE_BACK: ball.bounce(cBrickBall::BOUNCE_BACK);   break;
          }
        }
      }
    }
    break;

  case S_BRICKS_EMPTY:  // handle the bricks being completed
    PRINTSTATE("BRICKS_EMPTY");
    ball.stop();
    ball.erase();
    lives.increment();
    ball.setDelay(ball.getDelay() - 5);
    sound.point();
    bricks.begin(FIELD_LEFT + 1, FIELD_TOP / 3, FIELD_RIGHT - 1, FIELD_TOP - 1, BRICK_SIZE_DEFAULT);
    bricks.drawField();
    runState = S_POINT_RESET;
    break;

  case S_BALL_OUT:  // handle the ball going out
    PRINTSTATE("BALL_OUT");
    ball.stop();
    ball.erase();
    lives.decrement();
    sound.point();
    if (lives.score() != 0)
      runState = S_POINT_RESET;
    else
      runState = S_GAME_OVER;
    break;

  case S_POINT_RESET:
    PRINTSTATE("POINT_RESET");
    bat.draw();
    ball.reset(bat.getX(), bat.getY() + 1);
    ball.draw();
    delay(500);
    runState = S_WAIT_START;
    PRINTSTATE("WAIT_START");
    break;

  case S_GAME_OVER:
    PRINTSTATE("GAME_OVER");
    bricks.eraseField();
    mp.drawText((mp.getXMax() - mp.getTextWidth(GAME_TEXT)) / 2, FIELD_TOP / 2 + mp.getFontHeight() + 1, GAME_TEXT);
    mp.drawText((mp.getXMax() - mp.getTextWidth(OVER_TEXT)) / 2, FIELD_TOP / 2 - 1, OVER_TEXT);

    sound.over();
    delay(GAME_OVER_DELAY);
    runState = S_INIT;
    break;
  }
}
