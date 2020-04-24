// Implements the game of Meteors using MD_MAXPanel library
//
// Hardware used
// =============
// LEFT_PIN   - bat left switch, INPUT_PULLUP
// RIGHT_PIN  - bat right switch, INPUT_PULLUP
// UP_PIN     - unused
// DOWN_PIN   - unused
// SELECT_PIN - shooting bullets switch, INPUT_PULLUP
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
// The player controls a spaceship in an meteor field. The object of the 
// game is to shoot and destroy meteors while not colliding with any meteor
// fragments. Meteors start as a large size and become smaller and move 
// faster as they fragment when they are hit. Smaller, faster meteors 
// score more points that large slow ones. The game ends when a meteor 
// hits the spaceship, destroying it.

#include <MD_MAXPanel.h>
#include "Font5x3.h"
#include "score.h"
#include "sound.h"
#include "randomseed.h"

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

uint16_t FIELD_TOP, FIELD_RIGHT;   // needs to be initialized in setup()
const uint16_t FIELD_LEFT = 0;

const uint8_t BRICK_SIZE_DEFAULT = 3;
const uint8_t BAT_SIZE_DEFAULT = 3;   // must be an odd number
const uint8_t BAT_EDGE_OFFSET = 1;

const char TITLE_TEXT[] = "METEOR";
const uint16_t SPLASH_DELAY = 3000;     // in milliseconds

const char GAME_TEXT[] = "GAME";
const char OVER_TEXT[] = "OVER";
const uint16_t GAME_OVER_DELAY = 3000;   // in milliseconds

const uint8_t FONT_NUM_WIDTH = 3;
const uint16_t MAX_SCORE = 999;
const uint16_t START_SCORE = 25;

const uint8_t ROID_BIG_SIZE = 4;
const uint8_t ROID_MID_SIZE = 2;
const uint8_t ROID_SML_SIZE = 1;

const uint8_t MAX_BULLETS = 5;

// A class to encapsulate the shooter
// Shooter is at the bottom of the display shooting bullets upwards
class cGun
{
private:
  uint16_t _x, _y;        // the position of the tip of the gun
  uint16_t _xmin, _xmax;  // the max and min gun boundaries
  uint8_t  _pinLeft;      // the pin for the left switch
  uint8_t  _pinRight;     // the pin for the right switch
  uint16_t _moveDelay;    // the delay between possible moves of the gun in milliseconds
  uint32_t _timeLastMove; // the millis() value for the last time we moved the gun

public:
  void begin(uint16_t x, uint16_t y, uint16_t xmin, uint16_t xmax, uint8_t pinL, uint8_t pinR)
  {
    _x = x;
    _y = y;
    _xmin = xmin;
    _xmax = xmax;
    _pinLeft = pinL;
    _pinRight = pinR;
    _moveDelay = 25;
    pinMode(_pinLeft, INPUT_PULLUP);
    pinMode(_pinRight, INPUT_PULLUP);
  }

  uint16_t getX(void) { return (_x); }
  uint16_t getY(void) { return (_y); }

  void draw(void) { mp.setPoint(_x, _y, true); mp.drawHLine(_y-1, _x-1, _x+1, true); }
  void erase(void) { mp.setPoint(_x, _y, false); mp.drawHLine(_y-1, _x-1, _x+1, false); }

  bool anyKey(void) { return(digitalRead(_pinLeft) == LOW || digitalRead(_pinRight) == LOW); }

  bool move(void)
  {
    bool moveLeft = (digitalRead(_pinLeft) == LOW);
    bool moveRight = (digitalRead(_pinRight) == LOW);

    // if this is the time for a move? 
    if (millis() - _timeLastMove <= _moveDelay)
      return(false);
    _timeLastMove = millis();

    mp.update(false);

    if (moveRight)
    {
      //PRINTS("\n-- GUN move right");
      erase();
      _x++;
      if (_x + 1 > _xmax) _x--;  // keep within right boundary
      draw();
    }
    else if (moveLeft)
    {
      //PRINTS("\n-- GUN move left");
      erase();
      _x--;
      if (_x - 1 < _xmin) _x++;  // keep within left boundary
      draw();
    }

    mp.update(true);

    return((moveLeft || moveRight));
  }

  bool checkHits(uint16_t x, uint16_t y)
  {
    bool b = false;

    if (_y >= y)
      b = (_x == x) || ((y == _y - 1) && (x == _x - 1 || x == _x + 1));

    return(b);
  }
};

// A class to encapsulate all the bullets
// Bullets are fired from the gun and move straight upwards
class cBullet
{
private:
typedef struct bullet_t
  {
    uint16_t x, y;         // the position of the center of the bullet
    uint32_t timeLastMove; // time bullet last moved
    bullet_t *next;        // next in the list
  };
  
  uint8_t _pinShoot;       // the shooting switch pin
  uint16_t _ymin, _ymax;   // maximum bounds for the bullet
  uint32_t _moveDelay;     // delay between bullets moves in milliseconds
  uint16_t _shootDelay;    // the delay between shots in milliseconds
  uint32_t _timeLastShoot; // the last time the gun was shot in milliseconds
  bullet_t *_bullets;      // the queue of bullets being fired
  bullet_t *_deleted;      // delete bullets list
  bullet_t *_pScan;        // for getFirst(), getNext()
  uint8_t _count;          // count the number of bullets

  bullet_t *add(uint16_t x, uint16_t y)
  {
    bullet_t* pb = nullptr;

    if (_count < MAX_BULLETS)
    {
      if (_deleted == nullptr)
      {
        pb = new bullet_t;
        PRINTS(" new");
      }
      else
      {
        // take one from the front of the deleted queue
        pb = _deleted;
        _deleted = _deleted->next;
        PRINTS(" recyle");
      }

      // save the data
      if (pb != nullptr)
      {
        _count++;
        pb->x = x;
        pb->y = y;
        pb->timeLastMove = 0;
        pb->next = _bullets;
        _bullets = pb;
      }
    }
    return(pb);
  }

  void del(bullet_t *pbPrev, bullet_t * pb)
  {
    if (pbPrev == nullptr)
      _bullets = pb->next;
    else
      pbPrev->next = pb->next;
    _count--;

    // save to the front of the deleted list
    pb->next = _deleted;
    _deleted = pb;
  }
  
public:
  void begin(uint16_t ymin, uint16_t ymax, uint8_t pinShoot)
  {
    _moveDelay = 50;
    _shootDelay = _moveDelay * 3;
    _ymin = ymin;
    _ymax = ymax;
    _deleted = _bullets = nullptr;
    _pinShoot = pinShoot;
    _count = 0;

    pinMode(_pinShoot, INPUT_PULLUP);
  }

  bool getFirstXY(uint16_t &x, uint16_t &y) 
  { 
    _pScan = _bullets;
    if (_pScan == nullptr)
      return(false);

    x = _pScan->x;
    y = _pScan->y;
    _pScan = _pScan->next;

    return(true); 
  }

  bool getNextXY(uint16_t &x, uint16_t &y)
  {
    if (_pScan == nullptr)
      return(false);

    x = _pScan->x;
    y = _pScan->y;
    _pScan = _pScan->next;

    return(true);
  }

  void draw(bullet_t *pb)  { if (pb != nullptr) mp.setPoint(pb->x, pb->y, true); } //PRINTXY("\nbullet @", pb->x, pb->y); }
  void erase(bullet_t *pb) { if (pb != nullptr) mp.setPoint(pb->x, pb->y, false); }

  void reset(void) { while (_bullets != nullptr) { erase(_bullets); del(nullptr, _bullets); }}
  bool empty(void) { return (_bullets == nullptr); }

  void kill(uint16_t x, uint16_t y)
  // search for and kill the bullet at (x, y)
  {
    bullet_t *pb = _bullets;
    bullet_t *pbPrev = nullptr;

    while (pb!= nullptr)
    { 
      if (pb->x == x && pb->y == y)
      {
        erase(pb);
        del(pbPrev, pb);
        break;    // found it, no need to look further
      }
      // advance pointers
      pbPrev = pb;
      pb = pb->next;
    }
  }
  
  void move(void) 
  { 
    bullet_t *pb = _bullets;
    bullet_t *pbPrev = nullptr;
    
    mp.update(false);
    while (pb != nullptr)
    {
      // is this the time for a move? 
      if (millis() - pb->timeLastMove >= _moveDelay)
      {
        pb->timeLastMove = millis();

        // do the animation
        erase(pb);  
        pb->y++;

        if (pb->y >= FIELD_TOP)
        {
          PRINTS("\n-- BULLET ending");
          del(pbPrev, pb);
          pb = pbPrev;    // we have just deleted pb!
        }
        else
          draw(pb);
      }
      // advance pointers
      pbPrev = pb;
      if (pb != nullptr) pb = pb->next;
    }
    mp.update(true);
  }

  bool shoot(uint16_t x, uint16_t y)
  // shoot the next bullet if switch is pressed
  {
    bool b = false;

    // if this is the time for a move? 
    if (millis() - _timeLastShoot <= _shootDelay)
      return(b);
    _timeLastShoot = millis();

    // now check if the switch is pressed
    if (digitalRead(_pinShoot) == LOW)
    {
      PRINTS("\n-- BULLET shoot");
      b = (add(x, y) != nullptr);
    }
      
    return(b);
  }
};

// A class to encapsulate all the meteors
class cMeteors
{
private:
  typedef struct meteor_t
  {
    // NOTE - these are uint8_t to save RAM
    uint8_t x, y;         // lower tip coordinate for this meteor
    uint8_t dx, dy;       // speed in the x, y direction
    uint8_t size;         // size of the meteor (BIG, MID, SML)
    uint32_t timeLastMove;// when this meteor last moved
    meteor_t *next;       // the next in the linked list
  };

  uint32_t _timeTick;      // base time multiplied by size
  uint32_t _timeLastBorn;  // last time an meteor was born
  uint32_t _timeGestation; // time between meteors being born
  meteor_t *_meteors;      // start of the list
  meteor_t *_deleted;      // the deleted list
  meteor_t *_pScan;        // for getFirst(), getNext()

  void drawBig(meteor_t *pa, bool b)
  {
    mp.setPoint(pa->x, pa->y, b);
    if ((pa->y + 1) < FIELD_TOP)
    {
      mp.drawHLine(pa->y + 1, pa->x - 1, pa->x + 1, b);
      if ((pa->y + 2) < FIELD_TOP)
        mp.setPoint(pa->x, pa->y + 2, b);
    }
  }

  void drawMid(meteor_t *pa, bool b)
  {
    mp.setPoint(pa->x, pa->y, b);
    if ((pa->y + 1) < FIELD_TOP)
    {
      mp.setPoint(pa->x, pa->y + 1, b);
    }
  }

  void drawSml(meteor_t *pa, bool b)
  {
    mp.setPoint(pa->x, pa->y, b);
  }

  void draw(meteor_t *pa)  
  {
    //PRINTXY("\nmeteor @", pa->x, pa->y);
    if (pa == nullptr) return;

    switch (pa->size)
    {
    case ROID_BIG_SIZE: drawBig(pa, true); break;
    case ROID_MID_SIZE: drawMid(pa, true); break;
    case ROID_SML_SIZE: drawSml(pa, true); break;
    }
  }

  void erase(meteor_t *pa)
  {
    if (pa == nullptr) return;
    
    switch (pa->size)
    {
    case ROID_BIG_SIZE: drawBig(pa, false); break;
    case ROID_MID_SIZE: drawMid(pa, false); break;
    case ROID_SML_SIZE: drawSml(pa, false); break;
    }
  }

  meteor_t *add(uint16_t x, uint16_t y)
  // add a brick to the start of the list
  {
    meteor_t *pa = nullptr;

    if (_deleted == nullptr)
    {
      pa = new meteor_t;
      PRINTS("new");
    }
    else
    {
      // take from the front of the deleted list
      pa = _deleted;
      _deleted = _deleted->next;
      PRINTS("recyle");
    }

    if (pa != nullptr)
    {
      pa->x = x;
      pa->y = y;
      pa->dx = 0;
      pa->dy = -1;
      pa->size = ROID_BIG_SIZE;
      pa->timeLastMove = 0;

      pa->next = _meteors;
      _meteors = pa;
    }

    return(pa);
  }

  void del(meteor_t *paPrev, meteor_t *pa)
  // delete the specified brick from the list
  {
    if (paPrev == nullptr)
      _meteors = pa->next;
    else
      paPrev->next = pa->next;

    // save to the front of the deleted list
    pa->next = _deleted;
    _deleted = pa;
  }

  bool generate(void)
  {
    if (millis() - _timeLastBorn < _timeGestation)
      return(false);;
    _timeLastBorn = millis();

    if (_timeGestation > 500) _timeGestation -= 10;   // speed up the number born over the game duration

    {
      uint16_t x = FIELD_LEFT + 2 + random(FIELD_RIGHT - FIELD_LEFT - 4);
      uint16_t y = FIELD_TOP - 1;
      PRINTXY("\n-- ASTEROID create @", x, y);
      add(x, y);
    }

    return(true);
  }

public:
  void begin()
  {
    _meteors = _deleted = nullptr;
    _timeTick = 250;
    _timeGestation = 5000;
  }

  bool emptyField(void) { return(_meteors == nullptr); }
  void drawField(void)  { for (meteor_t *pa = _meteors; pa != nullptr; pa = pa->next) draw(pa); }
  void eraseField(void) { while (_meteors != nullptr) { erase(_meteors); del(nullptr, _meteors); } }

  bool getFirstXY(uint16_t &x, uint16_t &y)
  {
    _pScan = _meteors;
    if (_pScan == nullptr)
      return(false);

    x = _pScan->x;
    y = _pScan->y;
    _pScan = _pScan->next;

    return(true);
  }

  bool getNextXY(uint16_t &x, uint16_t &y)
  {
    if (_pScan == nullptr)
      return(false);

    x = _pScan->x;
    y = _pScan->y;
    _pScan = _pScan->next;

    return(true);
  }

  void move(void)
  {
    meteor_t *pa = _meteors;
    meteor_t *paPrev = nullptr;
    
    mp.update(false);

    generate();   // create a new one if time to do so

    while (pa != nullptr)
    {
      // is this the time for a move? 
      if (millis() - pa->timeLastMove >= _timeTick * pa->size)
      {
        pa->timeLastMove = millis();

        // do the animation
        erase(pa);

        // y==0 neede to persist after the increment so the collision code can find it.
        // Time to deletw it now before calculating moves.
        if (pa->y == 0)     
        {
          PRINTS("\n-- ASTEROID ending bottom");
          del(paPrev, pa);
          pa = paPrev;    // we have just deleted pa!
        }
        else
        {
          pa->y += pa->dy;
          pa->x += pa->dx;

          if (pa->x <= FIELD_LEFT || pa->x >= FIELD_RIGHT)
          {
            PRINTS("\n-- ASTEROID ending side");
            del(paPrev, pa);
            pa = paPrev;    // we have just deleted pa!
          }
          else
            draw(pa);
        }
      }
      // advance pointers
      paPrev = pa;
      if (pa != nullptr) pa = pa->next;
    }

    mp.update(true);
  }

  uint8_t checkHits(uint16_t x, uint16_t y)
  // Returns the points for the meteor hit
  {
    meteor_t *pa = _meteors;
    meteor_t *paPrev = nullptr;
    meteor_t *paNew;
    uint8_t points = 0;
    bool notFound = true;

    //PRINTXY("\n--- CHECKHITS for ", x, y);
    
    while (pa != nullptr && notFound)
    {
      switch (pa->size)
      {
      case ROID_SML_SIZE:   // front on point hit only
        if (pa->x == x && pa->y == y)
        {
          //PRINTXY("\n-- ASTEROID SML hit @", pa->x, pa->y);
          // smallest one just gets deleted
          erase(pa);
          del(paPrev, pa);
          points = 4;
          notFound = false;
        }
        break;

      case ROID_MID_SIZE:   // front on point hit only
        if (pa->x == x && pa->y == y)
        {
          //PRINTXY("\n-- ASTEROID MID hit @", pa->x, pa->y);
          // needs to be split
          erase(pa);
          paNew = add(pa->x, pa->y);
          pa->dx = -1;
          paNew->dx = 1;
          pa->size = paNew->size = ROID_SML_SIZE;
          draw(pa);
          draw(paNew);
          points = 2;
          notFound = false;
        }
        break;

      case ROID_BIG_SIZE:    // front on point and either side hits
        if ((pa->x == x && pa->y == y) ||
          ((pa->x - 1 == x || pa->x + 1 == x) && (pa->y + 1 == y)))
        {
          //PRINTXY("\n-- ASTEROID BIG hit @", pa->x, pa->y);
          // needs to be split
          erase(pa);
          paNew = add(pa->x, pa->y);
          pa->dx = -1;
          paNew->dx = 1;
          pa->size = paNew->size = ROID_MID_SIZE;
          draw(pa);
          draw(paNew);
          points = 1;
          notFound = false;
        }
        break;

      default:
        PRINT("\n--- CHECKHIT UNKNOWN size=", pa->size);
        break;
      }

      // advance the pointers
      paPrev = pa;
      if (pa != nullptr) pa = pa->next;
    }

    return(points);
  }
};

// main objects coordinated by the code logic
cScore score;
cGun gun;
cBullet bullets;
cMeteors meteors;
cSound sound;

void setupField(void)
// Draw the playing field at the start of the game.
{
  mp.clear();
  mp.drawHLine(FIELD_TOP, FIELD_LEFT, FIELD_RIGHT);
  mp.drawVLine(FIELD_LEFT, 0, FIELD_TOP);
  mp.drawVLine(FIELD_RIGHT, 0, FIELD_TOP);
  gun.draw();
  score.draw();
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_Bricks]");

  randomSeed(seedOut(31, RANDOM_SEED_PORT));

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  //mp.setRotation(MD_MAXPanel::ROT_90);

  // one time initialization
  FIELD_TOP = mp.getYMax() - mp.getFontHeight() - 2;
  FIELD_RIGHT = mp.getXMax();

  gun.begin((FIELD_RIGHT - FIELD_LEFT) / 2, BAT_EDGE_OFFSET, FIELD_LEFT + 1, FIELD_RIGHT - 1, LEFT_PIN, RIGHT_PIN);
  bullets.begin(1, FIELD_TOP-1, SELECT_PIN);
  score.limit(MAX_SCORE);   // set width() so we can use it below
  score.begin(&mp, FIELD_RIGHT - (score.width() * (FONT_NUM_WIDTH + mp.getCharSpacing())) + mp.getCharSpacing(), FIELD_TOP + 1 + mp.getFontHeight(), MAX_SCORE);
  sound.begin(BEEPER_PIN);
}

void loop(void)
{
  static enum { S_SPLASH, S_INIT, S_WAIT_START, S_GAME_PLAY, S_GAME_OVER } runState = S_SPLASH;

  switch (runState)
  {
  case S_SPLASH:    // show splash screen at start
    PRINTSTATE("SPLASH");
    {
      const uint16_t border = 2;

      mp.clear();
      mp.drawRectangle(border, border, mp.getXMax() - border, mp.getYMax() - border);
      mp.drawLine(0, 0, border, border);
      mp.drawLine(0, mp.getYMax(), border, mp.getYMax() - border);
      mp.drawLine(mp.getXMax(), 0, mp.getXMax() - border, border);
      mp.drawLine(mp.getXMax(), mp.getYMax(), mp.getXMax() - border, mp.getYMax() - border);
      mp.drawText((mp.getXMax() - mp.getTextWidth(TITLE_TEXT)) / 2, (mp.getYMax() + mp.getFontHeight()) / 2, TITLE_TEXT);
      sound.splash();
      delay(SPLASH_DELAY);

      runState = S_INIT;
    }
    break;

  case S_INIT:  // initialize for a new game
    PRINTSTATE("INIT");
    bullets.reset();
    score.set(START_SCORE);
    setupField();
    meteors.begin();

    runState = S_WAIT_START;
    PRINTSTATE("WAIT_START");
    break;

  case S_WAIT_START:  // waiting for the start of a new game
    if (gun.anyKey())
    {
      PRINTS("\n-- Starting Game");
      sound.start();
      runState = S_GAME_PLAY;
      PRINTSTATE("GAME_PLAY");
    }
    break;

  case S_GAME_PLAY:    // playing a point
    // handle shooting first
    if (score.score() != 0)   // we have some bullets ...
      if (bullets.shoot(gun.getX(), gun.getY() + 1))  // ... and we can shoot ...
      {
        score.decrement();    // ... then we have one bullet less
        sound.hit();
      }

    // then run animations
    gun.move();
    meteors.move();
    bullets.move();

    // now check for bullet collisions
    {
      uint16_t x, y;

      //PRINTS("\n--- CHECK bullets collisions");
      if (bullets.getFirstXY(x, y))
      {
        do
        {
          uint8_t points = meteors.checkHits(x, y);

          if (points != 0)
          {
            //PRINT(", hit=", points);
            bullets.kill(x, y);       // bullet is now dead
            //PRINTS(", kill");
            sound.bounce();
            //PRINTS(", sound");
            score.increment(points);
            //PRINTS(", score");
          }
        } while (bullets.getNextXY(x, y));
      }

      // now check for gun collisions
      //PRINTS("\n--- CHECK guns collisions");
      if (meteors.getFirstXY(x, y))
      {
        do
        {
          if (gun.checkHits(x, y))
            runState = S_GAME_OVER;
        } while (meteors.getNextXY(x, y) && runState != S_GAME_OVER);
      }
    }
    //PRINTS("\n--- CHECK collisions done");

    // finally, have we reached the end of the line?
    if (bullets.empty() && score.score() == 0) 
      runState = S_GAME_OVER;
    break;

  case S_GAME_OVER:
    PRINTSTATE("GAME_OVER");
    meteors.eraseField();
    bullets.reset();
    mp.drawText((mp.getXMax() - mp.getTextWidth(GAME_TEXT)) / 2, FIELD_TOP / 2 + mp.getFontHeight() + 1, GAME_TEXT);
    mp.drawText((mp.getXMax() - mp.getTextWidth(OVER_TEXT)) / 2, FIELD_TOP / 2 - 1, OVER_TEXT);

    sound.over();
    delay(GAME_OVER_DELAY);
    runState = S_INIT;
    break;
  }
}
