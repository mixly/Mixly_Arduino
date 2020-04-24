// Implements the game of Snake using MD_MAXPanel library
//
// Hardware used
// =============
// LEFT_PIN   - left move switch, INPUT_PULLUP
// UP_PIN     - up move switch, INPUT_PULLUP
// DOWN_PIN   - down move switch, INPUT_PULLUP
// RIGHT_PIN  - right move switch, INPUT_PULLUP
// SELECT_PIN - unused
// ENTER_PIN - unused
// BEEPER_PIN - piezo speaker
// CLK_PIN, DATA_PIN, CS_PIN - LED matrix display connections
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
//
// Rules of the Game
// =================
// Guide the snake around the screen using the direction keys. Running into
// a pill will increase the length of the snake. Running into the sides or 
// the snake will end the game.

#include <MD_MAXPanel.h>
#include "Font5x3.h"
#include "score.h"
#include "sound.h"
#include "randomseed.h"

// Turn on debug statements to the serial output
#define  DEBUG  1

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
// All momentary on switches are initialized PULLUP
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

uint16_t FIELD_TOP, FIELD_RIGHT;    // needs to be initialised in setup()
const uint16_t FIELD_LEFT = 0;
const uint16_t FIELD_BOTTOM = 0;

const uint8_t SNAKE_SIZE_DEFAULT = 2;

const char TITLE_TEXT[] = "SNAKE";
const uint16_t SPLASH_DELAY =3000;     // in milliseconds

const char GAME_TEXT[] = "GAME";
const char OVER_TEXT[] = "OVER";
const uint16_t GAME_OVER_DELAY = 3000;   // in milliseconds

const uint8_t MAX_LENGTH = 999;

const uint8_t FONT_NUM_WIDTH = 3;
const uint16_t MAX_SCORE = MAX_LENGTH;
const uint16_t MAX_FOOD = 99;

// A class to encapsulate the snake direction switches
// Can move up, down, left, right
class cMoveSW
{
private:
  uint8_t  _pinLeft;
  uint8_t  _pinRight;
  uint8_t  _pinUp;
  uint8_t  _pinDown;

public:
  enum moveType_t { MOVE_NONE, MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT };

  void begin(uint8_t pinL, uint8_t pinR, uint8_t pinU, uint8_t pinD)
  {
    _pinLeft = pinL;
    _pinRight = pinR;
    _pinUp = pinU;
    _pinDown = pinD;
    pinMode(_pinLeft, INPUT_PULLUP);
    pinMode(_pinRight, INPUT_PULLUP);
    pinMode(_pinUp, INPUT_PULLUP);
    pinMode(_pinDown, INPUT_PULLUP);
  }

  bool anyKey(void) { return (move() != MOVE_NONE);}

  moveType_t move(void)
  {
    if (digitalRead(_pinLeft) == LOW)
      return(MOVE_LEFT);
    else if (digitalRead(_pinRight) == LOW)
      return(MOVE_RIGHT);
    else if (digitalRead(_pinUp) == LOW)
      return(MOVE_UP);
    else if (digitalRead(_pinDown) == LOW)
      return(MOVE_DOWN);
      
    return(MOVE_NONE);
  }
};

// A class to encapsulate the food pill
class cPill
{
private:
  uint16_t _x, _y;        // pill coordinates
  uint16_t _xmin, _xmax;  // boundaries for the creation of the pill
  uint16_t _ymin, _ymax;
  uint8_t  _value;        // value of the pill

public:
  void begin(uint16_t xmin, uint16_t ymin, uint16_t xmax, uint16_t ymax)
  {
    _value = 0;
    _xmin = xmin;
    _xmax = xmax;
    _ymin = ymin;
    _ymax = ymax;
    PRINTXY("\n-- PILL boundaries ", _xmin, _ymin);
    PRINTXY(" to ", _xmax, _ymax);
  }

  uint16_t getX(void) { return(_x); }
  uint16_t getY(void) { return(_y); }
  uint8_t getValue(void) { return(_value); }

  void reset(void)
  {
    do  // search for an unused space
    {
      _x = _xmin + (random(_xmax - _xmin + 1));
      _y = _ymin + (random(_ymax - _ymin + 1));
      //PRINTXY("\n--- PILL TEST ", _x, _y);
    } while (mp.getPoint(_x, _y));

    _value = random(10);
    PRINTXY("\n-- PILL @", _x, _y);
    PRINT(" worth ", _value);

    mp.setPoint(_x, _y, true);
  }
};

// A class to encapsulate the snake
class cSnake
{
private:
  struct snakeNode_t
  {
    uint8_t x, y;       // coordinate for this body segment. This is UINT*_T to save 
                        // RAM, could overflow with larger displays
    snakeNode_t *next;  // the next in the linked list
  };

  snakeNode_t *_head;     // the head segment of the snake
  snakeNode_t *_tail;     // the tail segment of the snake
  snakeNode_t *_deleted;  // deleted blocks list
  int8_t   _dx, _dy;      // the movement offsets for the x and y direction
  uint32_t _timeLastMove; // last time the snake was moved
  uint16_t _moveDelay;    // the delay between moves in milliseconds
  bool     _run;          // snake is moving when true
  cScore  *_pFoodCount;   // the food counter

  void draw(uint16_t x, uint16_t y)  { mp.setPoint(x, y, true); } 
  void erase(uint16_t x, uint16_t y) { mp.setPoint(x, y, false); }

  snakeNode_t *add(uint16_t x, uint16_t y)
  // add a body segment to the tail
  // the list is stored from tail to head
  {
    snakeNode_t *psn;
    
    if (_deleted == nullptr)
      psn = new snakeNode_t;
    else
    {
      // take one from the head of the deleted list
      psn = _deleted;
      _deleted = _deleted->next;
    }

    if (psn != nullptr)
    {
      psn->x = x;
      psn->y = y;
      if (_tail == nullptr)
      {
        psn->next = nullptr;
        _head = _tail = psn;    // the first segment
        PRINTS("\n-- SNAKE added first element");
      }
      else
      {
        psn->next = _tail;
        _tail = psn;
        PRINTS("\n-- SNAKE added element");
      }
    }
    return(psn);
  }

  void deleteAll()
  // delete all the body segments in the snake
  {
    snakeNode_t *psn;
    uint16_t count = 0;

    while (_tail != nullptr)
    {
      // adjust the linked list by consuming from the tail
      psn = _tail;
      _tail = _tail->next;

      // put the block in the deleted list
      psn->next = _deleted;
      _deleted = psn;

      count++;
    }
    _head = nullptr;

    PRINT("\n-- SNAKE nodes deleted: ", count);
  }

public:
  enum moveType_t { MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT };

  uint16_t getHeadX(void) { return (_head->x); }
  uint16_t getHeadY(void) { return (_head->y); }

  uint16_t getDelay(void) { return (_moveDelay); }
  void setDelay(uint16_t delay) { if (delay > 10) _moveDelay = delay; }

  void start(void) { _run = true; }
  void stop(void)  { _run = false; }

  void setDirection(moveType_t d)
  {
    switch (d)
    {
    case MOVE_UP:    _dx = 0;  _dy = 1;  break;
    case MOVE_DOWN:  _dx = 0;  _dy = -1; break;
    case MOVE_LEFT:  _dx = -1; _dy = 0;  break;
    case MOVE_RIGHT: _dx = 1;  _dy = 0;  break;
    }
  }

  void reset(uint16_t x, uint16_t y)
  {
    deleteAll();
    for (uint8_t i = 0; i < SNAKE_SIZE_DEFAULT; i++)
    {
      snakeNode_t *psn = add(x - i, y);
      if (psn != nullptr) draw(psn->x, psn->y);
    }
    setDirection(MOVE_RIGHT);
    _pFoodCount->reset();
  }

  void begin(cScore *pFoodCount)
  {
    _dx = 1;
    _dy = 0;
    _timeLastMove = 0;
    _moveDelay = 100;
    _run = false;
    _pFoodCount = pFoodCount;
    _pFoodCount->reset();
    _deleted = nullptr;
  }

  bool move(void)
  // return true if something was hit
  { 
    // if this is the time for a move? 
    if (_run && millis() - _timeLastMove <= _moveDelay)
      return(false);
    _timeLastMove = millis();

    // do the animation
    snakeNode_t *psn = _tail;
    bool hitSomething = false;

    // check if we would be colliding with the snake body
    while (psn != nullptr && !hitSomething)
    {
      hitSomething = (psn->x == _head->x + _dx && psn->y == _head->y + _dy);
      psn = psn->next;
    }
    if (hitSomething) PRINTS("\n-! COLLIDE snake");

    if (!hitSomething)
    {
      psn = _tail;    // reset back to the start of the data

      // do we need to add one?
      if (_pFoodCount->score() != 0)
      {
        add(_tail->x, _tail->y);  // make a copy of the tail
        _pFoodCount->decrement();
      }
      else    // delete the tail on the display
        erase(_tail->x, _tail->y);

      while (psn != nullptr)
      {
        if (psn->next != nullptr) // main body segment
        {
          psn->x = psn->next->x;
          psn->y = psn->next->y;
        }
        else      // the head
        {
          psn->x += _dx;
          psn->y += _dy;
          // check if this is already used
          hitSomething = (mp.getPoint(psn->x, psn->y));
          draw(psn->x, psn->y);
        }
        psn = psn->next;
      }

      if (hitSomething) PRINTS("\n-! COLLIDE not snake");
    }

    return(hitSomething);
  }
};

// main objects coordinated by the code logic
cScore score, food;
cPill pill;
cSnake snake;
cMoveSW moveSW;
cSound sound;

void setupField(void)
// Draw the playing field at the start of the game.
{
  mp.clear();
  mp.drawHLine(FIELD_TOP, FIELD_LEFT, FIELD_RIGHT);
  mp.drawHLine(FIELD_BOTTOM, FIELD_LEFT, FIELD_RIGHT);
  mp.drawVLine(FIELD_LEFT, 0, FIELD_TOP);
  mp.drawVLine(FIELD_RIGHT, 0, FIELD_TOP);
  score.draw();
  food.draw();
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_Snake]");

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  mp.setRotation(MD_MAXPanel::ROT_90);

  randomSeed(seedOut(31, RANDOM_SEED_PORT));

  // one time initialization
  FIELD_TOP = mp.getYMax() - mp.getFontHeight() - 2;
  FIELD_RIGHT = mp.getXMax();
  pill.begin(FIELD_LEFT + 1, FIELD_BOTTOM + 1, FIELD_RIGHT - 1, FIELD_TOP - 1);
  food.begin(&mp, FIELD_LEFT + 1, FIELD_TOP + 1 + mp.getFontHeight(), MAX_FOOD);

  sound.begin(BEEPER_PIN);
  score.limit(MAX_SCORE);   // set the width so we can use it below
  score.begin(&mp, FIELD_RIGHT - ((score.width() * (FONT_NUM_WIDTH) + mp.getCharSpacing())) - mp.getCharSpacing(), FIELD_TOP + 1 + mp.getFontHeight(), MAX_SCORE);

  moveSW.begin(LEFT_PIN, RIGHT_PIN, UP_PIN, DOWN_PIN);
  snake.begin(&food);
}

bool doSwitches(void)
{
  bool b = true;

  switch (moveSW.move())
  {
  case cMoveSW::MOVE_UP:    snake.setDirection(cSnake::MOVE_UP);    break;
  case cMoveSW::MOVE_DOWN:  snake.setDirection(cSnake::MOVE_DOWN);  break;
  case cMoveSW::MOVE_LEFT:  snake.setDirection(cSnake::MOVE_LEFT);  break;
  case cMoveSW::MOVE_RIGHT: snake.setDirection(cSnake::MOVE_RIGHT); break;
  case cMoveSW::MOVE_NONE:  b = false; break;
  }

  return(b);
}

void loop(void)
{
  static enum { S_SPLASH, S_INIT, S_WAIT_START, S_POINT_PLAY, S_GAME_OVER } runState = S_SPLASH;

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
    score.reset();
    food.reset();
    setupField();
    snake.reset((FIELD_RIGHT - FIELD_LEFT) / 2, (FIELD_TOP - FIELD_BOTTOM) / 2);
    pill.reset();

    runState = S_WAIT_START;
    PRINTSTATE("WAIT_START");
    break;

  case S_WAIT_START:  // waiting for the start of a new game
    if (doSwitches())
    {
      PRINTS("\n-- Starting Game");
      sound.start();
      snake.start();
      runState = S_POINT_PLAY;
      PRINTSTATE("POINT_PLAY");
    }
    break;

  case S_POINT_PLAY:    // playing a point
    // handle the switches
    doSwitches();

    // move snake and check what this means
    if (snake.move())
    {
      if (snake.getHeadX() == pill.getX() && snake.getHeadY() == pill.getY()) // have we hit the pill?
      {
        sound.hit();
        score.increment(pill.getValue());
        food.increment(pill.getValue());
        pill.reset();
      }
      else    // we have hit the wall or ourselves
      {
        snake.stop();
        runState = S_GAME_OVER;
      }
    }
    break;

  case S_GAME_OVER:
    PRINTSTATE("GAME_OVER");
    mp.drawText((mp.getXMax() - mp.getTextWidth(GAME_TEXT)) / 2, FIELD_TOP / 2 + mp.getFontHeight() + 1, GAME_TEXT);
    mp.drawText((mp.getXMax() - mp.getTextWidth(OVER_TEXT)) / 2, FIELD_TOP / 2 - 1, OVER_TEXT);

    sound.over();
    delay(GAME_OVER_DELAY);
    runState = S_INIT;
    break;
  }
}
