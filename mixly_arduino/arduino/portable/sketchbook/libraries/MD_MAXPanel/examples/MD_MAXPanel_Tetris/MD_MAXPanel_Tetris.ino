// Implements the game of Tetris using MD_MAXPanel library
// Tips for coding this taken from https://www.youtube.com/watch?v=8OK8_tHeCIA
//
// Hardware used
// =============
//
// LEFT_PIN   - move left switch, INPUT_PULLUP
// RIGHT_PIN  - move right switch, INPUT_PULLUP
// UP_PIN     - unused
// DOWN_PIN   - drop the piece switch, INPUT_PULLUP
// SELECT_PIN - rotate the piece switch, INPUT_PULLUP
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
// Game pieces are shaped like tetrominoes, geometric shapes composed of four 
// square blocks each. A random sequence of tetrominoes fall down the playing 
// field (a rectangular vertical shaft, called the "well" or "matrix"). The 
// objective of the game is to manipulate these tetrominoes, by moving each one 
// sideways (if the player feels the need) and rotating it by 90 degree units, 
// with the aim of creating a horizontal line of ten units without gaps. When 
// such a line is created, it gets destroyed, and any block above the deleted 
// line will fall. When a certain number of lines are cleared, the game enters 
// a new level. As the game progresses, each level causes the tetrominoes to fall 
// faster, and the game ends when the stack of tetrominoes reaches the top of 
// the playing field and no new tetrominos are able to enter.

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

const uint16_t FIELD_WIDTH = 10;    // playable area width inside 'bucket'
const uint16_t FIELD_HEIGHT = 21;   // playable area depth inside 'bucket' 

const uint16_t FIELD_BOTTOM = 3;    // y coord bottom wall
const uint16_t FIELD_LEFT = 5;      // x coord left wall
const uint16_t FIELD_TOP = FIELD_BOTTOM + FIELD_HEIGHT;    // y coord top opening of the 'bucket'
const uint16_t FIELD_RIGHT = FIELD_LEFT + FIELD_WIDTH + 1; // x coord right wall

const char TITLE_TEXT[] = "TETRIS";
const uint16_t SPLASH_DELAY = 3000;     // in milliseconds

const char GAME_TEXT[] = "GAME";
const char OVER_TEXT[] = "OVER";
const uint16_t GAME_OVER_DELAY = 3000;   // in milliseconds

const uint8_t FONT_NUM_WIDTH = 3;
const uint16_t MAX_SCORE = 60000;
const uint16_t PIECE_SCORE = 5;
const uint16_t LINE_SCORE = 20;

#define ARRAY_SIZE(a) (sizeof(a)/sizeof(a[0]))

// A class to encapsulate the snake direction switches
// Can move up, down, rotate, drop
class cMoveSW
{
private:
  uint8_t  _pinLeft;
  uint8_t  _pinRight;
  uint8_t  _pinRotate;
  uint8_t  _pinDrop;
  uint16_t _timeDelay;     // the delay between switch detection
  uint32_t _timeLastCheck; // the millis() value for the last time we checked

public:
  enum moveType_t { MOVE_NONE, MOVE_LEFT, MOVE_RIGHT, MOVE_DROP, MOVE_ROTATE };

  void begin(uint8_t pinL, uint8_t pinR, uint8_t pinRot, uint8_t pinD)
  {
    _timeDelay = 100;
    _pinLeft = pinL;
    _pinRight = pinR;
    _pinRotate = pinRot;
    _pinDrop = pinD;
    _timeLastCheck = 0;
    pinMode(_pinLeft, INPUT_PULLUP);
    pinMode(_pinRight, INPUT_PULLUP);
    pinMode(_pinRotate, INPUT_PULLUP);
    pinMode(_pinDrop, INPUT_PULLUP);
  }

  bool anyKey(void) { return (move() != MOVE_NONE);}

  moveType_t move(void)
  {
    if (millis() - _timeLastCheck < _timeDelay)
      return(MOVE_NONE);
    _timeLastCheck = millis();

    if (digitalRead(_pinLeft) == LOW)
      return(MOVE_LEFT);
    else if (digitalRead(_pinRight) == LOW)
      return(MOVE_RIGHT);
    else if (digitalRead(_pinRotate) == LOW)
      return(MOVE_ROTATE);
    else if (digitalRead(_pinDrop) == LOW)
      return(MOVE_DROP);
      
    return(MOVE_NONE);
  }
};

// A class to encapsulate the Tetris field
class cTetris
{
private:
  const uint8_t OMINO_SIZE = 4;  // 4x4 field flattened out into 16 bits

  const uint8_t MAX_ROTATE = 4;  // maximum number of rotations

  uint16_t _tetromino[7];        // tetronimoes, values initialized in the constructor
  
  bool _field[FIELD_WIDTH][FIELD_HEIGHT];

  uint32_t _timeLastMove; // last time the snake was moved
  uint16_t _moveDelay;    // the delay between moves in milliseconds
  bool     _run;          // game is playing when true
  int8_t _pieceCount;     // number of pieces completed

  uint8_t _curOmino;    // current tetronimo
  uint8_t _nxtOmino;    // the next tetronimo
  uint8_t _curRotation; // current rotated orientation
  uint16_t _x, _y;      // _field coordinates for the piece
  cScore *_pScore;      // for keeping score
  cSound *_pSound;      // for making noise

  void dumpOmino(uint8_t omino, uint8_t rot)
  // for debugging only
  {
    PRINT("\n -- DUMPOMINO ", omino); PRINT(" R:", rot);
    for (int8_t j = 0; j < OMINO_SIZE; j++)
    {
      PRINT("\n L", j); PRINTS(": ");
      for (int8_t i = 0; i < OMINO_SIZE; i++)
      {
        // Get index into piece
        int8_t idx = rotate(i, j, rot);

        // draw the point
        if ((_tetromino[omino] >> idx) & 1) { PRINTS(" 1") }
        else { PRINTS(" 0") }
      }
    }
  }

  void showOmino(uint8_t omino, uint8_t rot, int16_t x, int16_t y, bool b)
  // show the tetronimo on the actual display
  // x and y need to be display coordinates
  {
    //PRINT("\n-- SHOW ", omino);
    //PRINTXY(" @", x, y);
    //PRINT(" b=", b);
    mp.update(false);
    //dumpOmino(omino, rot);
    for (int8_t j = 0; j < OMINO_SIZE; j++)
      for (int8_t i = 0; i < OMINO_SIZE; i++)
      {
        // Get index into piece
        int8_t idx = rotate(i, j, rot);

        // draw the point
        //PRINTXY(" ", FIELD_LEFT + x + i, FIELD_TOP - y - j);
        //PRINT(" i", idx);
        //PRINT(" v", (_tetromino[omino] >> idx) & 1);
        if ((_tetromino[omino] >> idx) & 1)
          mp.setPoint(x + i, y - j, b);
      }
    mp.update(true);
  }

  void drawNxtOmino(void) { showOmino(_nxtOmino, 0, FIELD_RIGHT + OMINO_SIZE, FIELD_TOP - (2*OMINO_SIZE), true); }
  void eraseNxtOmino(void) { showOmino(_nxtOmino, 0, FIELD_RIGHT + OMINO_SIZE, FIELD_TOP - (2*OMINO_SIZE), false); }
  void drawOmino(uint8_t omino, uint8_t rot, int16_t x, int16_t y) { showOmino(omino, rot, FIELD_LEFT + x + 1, FIELD_TOP - y, true); }
  void eraseOmino(uint8_t omino, uint8_t rot, int16_t x, int16_t y) { showOmino(omino, rot, FIELD_LEFT + x + 1, FIELD_TOP - y, false); }

  void omino2Field(uint8_t omino, uint8_t rot, int16_t x, int16_t y)
  // copy the tetronimo to the field, leaving the rest untouched
  {
    for (int8_t j = 0; j < OMINO_SIZE; j++)
    {
      for (int8_t i = 0; i < OMINO_SIZE; i++)
      {
        // Get index into piece
        int8_t idx = rotate(i, j, rot);

        // set in field if set in tetronimo
        if ((_tetromino[omino] >> idx) & 1)
          _field[x + i][y + j] = true;
      }
    }
  }

  void displayField(void)
  // display the field, mindful of offsets in displayable field
  {
    mp.update(false);
    for (uint8_t j = 0; j < FIELD_HEIGHT; j++)
      for (uint8_t i = 0; i < FIELD_WIDTH; i++)
        mp.setPoint(FIELD_LEFT+i+1, FIELD_TOP-j, _field[i][j]);
    mp.update(true);
  }

  void clearField(void)
  // clear the playing field
  {
    memset(_field, 0, sizeof(bool)*FIELD_HEIGHT*FIELD_WIDTH);
    displayField();
  }

  uint8_t rotate(uint8_t x, uint8_t y, uint8_t r)
  // return the linear index for from the x, y coords and the 
  // current rotation
  {
    uint8_t idx = 0;

    switch (r)             // Rotation effect
    {
      case 0: // 0 degrees    // 0  1  2  3
      idx = y * 4 + x;        // 4  5  6  7
      break;                  // 8  9 10 11
                              //12 13 14 15

    case 1: // 90 degrees     //12  8  4  0
      idx = 12 + y - (x * 4); //13  9  5  1
      break;                  //14 10  6  2
                              //15 11  7  3

    case 2: // 180 degrees    //15 14 13 12
      idx = 15 - (y * 4) - x; //11 10  9  8
      break;                  // 7  6  5  4
                              // 3  2  1  0

    case 3: // 270 degrees    // 3  7 11 15
      idx = 3 - y + (x * 4);  // 2  6 10 14
      break;                  // 1  5  9 13
    }                         // 0  4  8 12

    return(idx);
  }
  
  bool checkPieceFit(uint8_t omino, uint8_t rot, int16_t x, int16_t y)
    // does the piece fit in the _field array?
  {
    /*
    PRINTXY("\n-- CHKFIT @", x, y);
    PRINT(" T:", omino);
    PRINT(" R:", rot);
    PRINT(" H:", FIELD_HEIGHT);
    PRINT(" W:", FIELD_WIDTH);
    */
    for (int8_t j = 0; j < OMINO_SIZE; j++)
    {
      for (int8_t i = 0; i < OMINO_SIZE; i++)
      {
        // Get index into piece
        int8_t idx = rotate(i, j, rot);
        bool bCell = (_tetromino[omino] >> idx) & 1;

        if (bCell)  // we have an occupied cell in the tetromino
        {
          // PRINTXY("\n", i, j); PRINTXY("=>", x + i, y + j); PRINT(" i:", idx); PRINT(" cell: ", bCell);
          // check it is in bounds
          if (x + i < 0 || x + i >= FIELD_WIDTH)
          {
            //PRINTS(" fail x");
            return(false);  // out of side bounds
          }
          else if (y + j < 0 || y + j >= FIELD_HEIGHT)
          {
            //PRINTS(" fail y");
            return(false);  // out of bounds
          }
          else if (_field[x + i][y + j]) // in bounds - do a collision check
          {
            //PRINTS(" fail field");
            return(false); // occupied field cell
          }
        }
      }
    }
    //PRINTS(" pass");
    return(true);
  }

public:
  enum moveType_t { M_LEFT, M_RIGHT, M_DROP, M_ROTATE };

  cTetris(void)
  {
    // straight block
    // 0010
    // 0010
    // 0010
    // 0010
    _tetromino[0] = 0x2222;

    // T block
    // 0010
    // 0110
    // 0010
    // 0000
    _tetromino[1] = 0x2620; 

    // square block
    // 0000
    // 0110
    // 0110
    // 0000
    _tetromino[2] = 0x0660;

    // normal Z block
    // 0010
    // 0110
    // 0100
    // 0000
    _tetromino[3] = 0x2640;

    // reversed Z block 
    // 0100
    // 0110
    // 0010
    // 0000
    _tetromino[4] = 0x4620;

    // normal L block
    // 0100
    // 0100
    // 0110
    _tetromino[5] = 0x4460;

    // reversed L block
    // 0010
    // 0010
    // 0110
    _tetromino[6] = 0x2260;
  }

  uint16_t getDelay(void) { return (_moveDelay); }
  void setDelay(uint16_t delay) { if (delay > 10) _moveDelay = delay; }

  void start(void) { _run = true; }
  void stop(void)  { _run = false; }

  void begin(cScore *pScore, cSound *pSound)
  {
    _timeLastMove = 0;
    _moveDelay = 1000;
    _pieceCount = 0;
    _run = false;

    // set up the next tetronimo
    _curOmino = 0;
    _nxtOmino = random(ARRAY_SIZE(_tetromino));
    _curRotation = 0;

    // save and reset the score
    _pScore = pScore;
    _pScore->reset();

    // save the sound object
    _pSound = pSound;

    // clear and display the field
    clearField();
  }

  bool nextOmino(void)
  {
    _x = (FIELD_WIDTH - OMINO_SIZE) / 2;
    _y = 0;
    _curRotation = 0;
    _curOmino = _nxtOmino;
    if (!checkPieceFit(_curOmino, _curRotation, _x, _y))
      return(false);    // can't fit it it, pass the message back!
    drawOmino(_curOmino, _curRotation, _x, _y);
    _pSound->hit();

    // work out and display the next omino
    eraseNxtOmino();
    _nxtOmino = random(ARRAY_SIZE(_tetromino));
    drawNxtOmino();
    return(true);
  }

  bool move(moveType_t moveType)
  // user defined action to do something
  {
    bool b = false;

    eraseOmino(_curOmino, _curRotation, _x, _y);

    switch (moveType)
    {
    case M_LEFT:
      if (b = checkPieceFit(_curOmino, _curRotation, _x - 1, _y))
        _x--;
      break;

    case M_RIGHT:
      if (b = checkPieceFit(_curOmino, _curRotation, _x + 1, _y))
        _x++;
      break;

    case M_ROTATE:
      if (b = checkPieceFit(_curOmino, (_curRotation + 1) % MAX_ROTATE, _x, _y))
        _curRotation = (_curRotation + 1) % MAX_ROTATE;
      break;

    case M_DROP:
      if (b = checkPieceFit(_curOmino, _curRotation, _x, _y + 1))
        _y++;
      break;
    }

    drawOmino(_curOmino, _curRotation, _x, _y);

    return(b);
  }

  bool run(void)
    // return false if the game has ended
  {
    bool bReturn = true;

    // if this is the time for a move? 
    if (_run && millis() - _timeLastMove <= _moveDelay)
      return(true);
    _timeLastMove = millis();

    // check if the piece can be moved down
    if (checkPieceFit(_curOmino, _curRotation, _x, _y + 1))
    {
      // yes - do it and animate the display
      eraseOmino(_curOmino, _curRotation, _x, _y);
      _y++;
      drawOmino(_curOmino, _curRotation, _x, _y);

      // now adjust the seed if we have reached the threshold
      if (_pieceCount >= 10)
      {
        // cap how fast we make it!
        if (_moveDelay >= 200) _moveDelay -= 50;
        _pieceCount = 0;
      }
    }
    else
    {
      _pieceCount++; // just landed another one

      // insert the current piece in the field, show it and update the score
      omino2Field(_curOmino, _curRotation, _x, _y);
      displayField();
      _pScore->increment(PIECE_SCORE);

      // Check for lines to delete
      // There can only be lines in the span of the last block, so
      // check the 4 lines it takes up
      uint16_t lines = 0;

      for (int16_t y = _y + OMINO_SIZE; (y >= _y) && (y >= 0); y--)
      {
        int16_t count = 0;

        for (int16_t x = 0; x < FIELD_WIDTH; x++)
          count += (_field[x][y] ? 1 : 0);

        if (count == FIELD_WIDTH)
        {
          lines++;    // keep count of lines completed

          // delete the line - blank it out, pause for effect, 
          // make a sound then collapse the lines!
          for (int16_t x = 0; x < FIELD_WIDTH; x++)
            _field[x][y] = false;

          displayField();
          delay(200);
          _pSound->bounce();

          for (int16_t j = y; j >= 1; j--)
            for (int16_t x = 0; x < FIELD_WIDTH; x++)
              _field[x][j] = _field[x][j-1];
          displayField();

          // roll back the index as we have just changed the lines
          y++;
        }
      }

      // update the score if deleted lines
      if (lines != 0) _pScore->increment((1 << lines)*LINE_SCORE);

      // create the next omino and return status
      bReturn = nextOmino();
    }

    return(bReturn);
  }
};

// main objects coordinated by the code logic
cScore score;
cMoveSW moveSW;
cSound sound;
cTetris tetris;

void setupField(void)
// Draw the playing field at the start of the game.
{
  mp.clear();
  mp.drawHLine(FIELD_BOTTOM, FIELD_LEFT, FIELD_RIGHT);
  mp.drawVLine(FIELD_LEFT, FIELD_TOP, FIELD_BOTTOM);
  mp.drawVLine(FIELD_RIGHT, FIELD_TOP, FIELD_BOTTOM);
  score.draw();
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_Tetris]");

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  // mp.setRotation(MD_MAXPanel::ROT_90);

  sound.begin(BEEPER_PIN);
  score.limit(MAX_SCORE);   // so we can use width() below
  score.begin(&mp, mp.getXMax() - (score.width() * (FONT_NUM_WIDTH + mp.getCharSpacing())) + mp.getCharSpacing(), mp.getYMax() - 1, MAX_SCORE);

  moveSW.begin(LEFT_PIN, RIGHT_PIN, SELECT_PIN, DOWN_PIN);

  randomSeed(seedOut(31, RANDOM_SEED_PORT));
}

bool handleUI(void)
{
  bool b = true;

  switch (moveSW.move())
  {
  case cMoveSW::MOVE_ROTATE:tetris.move(cTetris::M_ROTATE); break;
  case cMoveSW::MOVE_DROP:  tetris.move(cTetris::M_DROP);   break;
  case cMoveSW::MOVE_LEFT:  tetris.move(cTetris::M_LEFT);  break;
  case cMoveSW::MOVE_RIGHT: tetris.move(cTetris::M_RIGHT); break;
  case cMoveSW::MOVE_NONE:  b = false; break;
  }

  return(b);
}

void loop(void)
{
  static enum { S_SPLASH, S_INIT, S_WAIT_START, S_PLAY, S_GAME_OVER } runState = S_SPLASH;

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
    setupField();
    tetris.begin(&score, &sound);

    runState = S_WAIT_START;
    PRINTSTATE("WAIT_START");
    break;

  case S_WAIT_START:  // waiting for the start of a new game
    if (moveSW.anyKey())
    {
      PRINTS("\n-- Starting Game");
      sound.start();
      tetris.start();
      if (tetris.nextOmino())
      {
        runState = S_PLAY;
        PRINTSTATE("PLAY");
      }
      else
        runState = S_GAME_OVER;
    }
    break;

  case S_PLAY:    // playing a point
    // handle the switches
    handleUI();

    // move and finish the game if false
    if (!tetris.run())
    {
      tetris.stop();
      runState = S_GAME_OVER;
    }
    break;

  case S_GAME_OVER:
  {
    uint16_t w, x, y;

    PRINTSTATE("GAME_OVER");

    w = mp.getTextWidth(GAME_TEXT);
    x = ((mp.getXMax() - w) / 2) - 1;
    y = (mp.getYMax() / 2) + mp.getFontHeight() + 2;
    mp.clear(x, y, x + w + 2, y - mp.getFontHeight() - 2);
    mp.drawText(x + 1, y - 1, GAME_TEXT);

    w = mp.getTextWidth(OVER_TEXT);
    x = ((mp.getXMax() - w) / 2) - 1;
    y = (mp.getYMax() / 2) - 1 + 2;
    mp.clear(x, y, x + w + 2, y - mp.getFontHeight() - 1);
    mp.drawText(x + 1, y - 1, OVER_TEXT);

    sound.over();
    delay(GAME_OVER_DELAY);
    runState = S_INIT;
    }
    break;
  }
}
