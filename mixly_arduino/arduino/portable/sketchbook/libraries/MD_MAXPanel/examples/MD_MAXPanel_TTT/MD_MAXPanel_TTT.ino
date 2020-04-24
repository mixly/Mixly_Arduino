// Implements the game of TTT using MD_MAXPanel library
// Adapted from the LCD example in the MD_TTT library
//
// Hardware used
// =============
// LEFT_PIN   - unused
// UP_PIN     - unused
// DOWN_PIN   - unused
// RIGHT_PIN  - unused
// SELECT_PIN - switch moves from one selection to another,INPUT_PULLUP
// ENTER_PIN  - accepts the current selection, INPUT_PULLUP
// BEEPER_PIN - piezo speaker
// CLK_PIN, DATA_PIN, CS_PIN - LED matrix display connections
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
// MD_TTT available from https://github.com/MajicDesigns/MD_TTT
//
// Rules of the Game
// =================
// Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a 
// paper-and-pencil game for two players, X and O, who take turns marking 
// the spaces in a 3×3 grid. The player who succeeds in placing three 
// of their marks in a horizontal, vertical, or diagonal row wins the 
// game. This version has the computer as one of the players.
//

#include <MD_TTT.h>
#include <MD_MAXPanel.h>
#include "Font5x3.h"
#include "MD_MAXPanel_TTT_Types.h"

// Turn on debug statements to the serial output
#define  DEBUG  0

#if  DEBUG
#define PRINT(s, x)  { Serial.print(F(s)); Serial.print(x); }
#define PRINTS(x)    { Serial.print(F(x)); }
#define PRINTD(x)    { Serial.print(x, DEC); }
#define PRINTXY(s, x, y) { Serial.print(s); Serial.print(F("(")); Serial.print(x); Serial.print(F(",")); Serial.print(y); Serial.print(")"); }
#define PRINTSTATE(s)  { Serial.print("\n++>"); Serial.print(s); }

#else
#define PRINT(s, x)
#define PRINTS(x)
#define PRINTD(x)
#define PRINTXY(s, x, y)
#define PRINTSTATE(s)

#endif

// function prototype
void tttCallback(uint8_t position, int8_t player);

// User switches for gameplay
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

// Miscellaneous defines
const uint16_t FLASH_DELAY = 500; // milliseconds
const uint8_t FLASH_REPEAT = 5;   // number of flashes

const char TITLE_TEXT[] = "TTT";
const uint16_t SPLASH_DELAY = 3000;     // in milliseconds

// Coordinates for a board position
boardCoord_t movePos[TTT_BOARD_SIZE] = { 0 };

// Handling for switch states (User Input)
swState_t swAccept = { ENTER_PIN, false, 0 };
swState_t swSelect = { SELECT_PIN, false, 0 };

// Main objects used defined here
MD_TTT TTT(tttCallback);
MD_MAXPanel mp = MD_MAXPanel(HARDWARE_TYPE, CS_PIN, X_DEVICES, Y_DEVICES); // SPI hardware interface
// MD_MAXPanel mx = MD_MAXPanel(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES); // Arbitrary pins

int8_t  curPlayer = TTT_P2;
bool  inGamePlay = false;

// variables and constants used for the display
uint16_t USER_MESG, GRID_BOTTOM, GRID_RIGHT, GRID_TOP;
uint8_t squareSize, offsetX, offsetY;

void calcGridSize(void)
{
  uint16_t dx = (GRID_RIGHT - 2) / 3;
  uint16_t dy = (GRID_TOP - GRID_BOTTOM - 2) / 3;
  squareSize = min(dx, dy);
  offsetX = ((GRID_RIGHT - 2) - (squareSize * 3)) / 2; // offset from vert edge
  offsetY = ((GRID_TOP - GRID_BOTTOM - 2) - (squareSize * 3)) / 2;  // offset from horiz edge
  GRID_BOTTOM = GRID_TOP - offsetY - (3 * squareSize) - 2;

  PRINT("\nsquareSize = ", squareSize);
  PRINT(", offsetX = ", offsetX);
  PRINT(", offsetY = ", offsetY);

  // set up the board square coordinates
  for (uint8_t j = 0; j < TTT_BOARD_SIZE / 3; j++)
    for (uint8_t i = 0; i < TTT_BOARD_SIZE / 3; i++)
    {
      uint8_t idx = (j * 3) + i;

      movePos[idx].x = offsetX + (i*squareSize) + i;  // last element is for lines
      movePos[idx].y = GRID_TOP - offsetY - (j*squareSize) - j; // last element is for lines
      movePos[idx].size = squareSize-1;
      
      PRINT("\nmovePos[", idx);
      PRINTXY("] - ", movePos[idx].x, movePos[idx].y);
      PRINT(" size=", movePos[idx].size);
    }
}

void displayGrid(void)
{
  mp.update(false);
  mp.clear();

  mp.drawVLine(offsetX + squareSize, GRID_BOTTOM + offsetY, GRID_TOP - offsetY);
  mp.drawVLine(offsetX + (2*squareSize) + 1, GRID_BOTTOM + offsetY, GRID_TOP - offsetY);
  mp.drawHLine(GRID_TOP - offsetY - squareSize, offsetX, GRID_RIGHT - offsetX);
  mp.drawHLine(GRID_TOP - offsetY - (2*squareSize) - 1, offsetX, GRID_RIGHT - offsetX);

  mp.update(true);
}

void highlightCell(uint8_t cell, bool b = true)
{
  mp.drawRectangle(movePos[cell].x, movePos[cell].y, 
          movePos[cell].x + movePos[cell].size, movePos[cell].y - movePos[cell].size, b);
}

bool detectSwitch(swState_t *ss)
// detects the HIGH to LOW transition of a switch
// returns true if a transition has occurred
// only check if a period of time has expired to debounce
{
  boolean b = false;

  if ((millis() - ss->lastCheckTime) > 50)
  {
    bool curState = (digitalRead(ss->pin) == LOW);

    ss->lastCheckTime = millis();
    b = (curState && !ss->lastState);
    ss->lastState = curState;
  }

  return(b);
}

void userMessage(char *psz)
{
  mp.clear(1, 0, mp.getXMax(), USER_MESG);
  mp.drawText(1, USER_MESG, psz, MD_MAXPanel::ROT_0, true);
}

uint8_t getMove(void)
// get the next move from the player
// there may not be a move there so we need to split the 
// function into a prompting and then checking phase
// return 0xff of no move entered
{
  static enum { UI_START, UI_HILIGHT, UI_SELECT, UI_NEXT_HILIGHT, UI_ACCEPT } promptMode = UI_START;
  static uint8_t curPosUI = 0;

  uint8_t m = 0xff;

  switch (promptMode)
  {
  case UI_START:  // print the message
    PRINTS("\n- START");
    userMessage("You move");
    promptMode = UI_HILIGHT;
    break;

  case UI_HILIGHT:  // find the first empty cell and highlight it
    PRINTS("\n- HILIGHT");
    //highlightCell(curPosUI, false);     // unhighlight current selection
    for (curPosUI = 0; curPosUI<TTT_BOARD_SIZE; curPosUI++)
    {
      PRINT(" ", curPosUI);
      if (TTT.getBoardPosition(curPosUI) == TTT_P0)
      {
        PRINTS(": FOUND");
        highlightCell(curPosUI);        // highlight new selection
        break;
      }
    }
    promptMode = UI_SELECT;
    break;

  case UI_SELECT: // highlight the cell we are on and handle switches
    if (detectSwitch(&swSelect))
      promptMode = UI_NEXT_HILIGHT;
    else if (detectSwitch(&swAccept))
      promptMode = UI_ACCEPT;
    break;

  case UI_NEXT_HILIGHT: // user selected next cell, find it and highlight it
    PRINTS("\n- NEXT HILIGHT");
    if (curPosUI < TTT_BOARD_SIZE)
      highlightCell(curPosUI, false);     // unhighlight current selection

    for (curPosUI=curPosUI+1; curPosUI<TTT_BOARD_SIZE; curPosUI++)
    {
      PRINT(" ", curPosUI);
      if (TTT.getBoardPosition(curPosUI) == TTT_P0)
      {
        PRINTS(": FOUND");
        highlightCell(curPosUI);        // highlight new selection
        break;
      }
    }

    if (curPosUI == TTT_BOARD_SIZE) // oops - none there
    {
      PRINTS(": NOT FOUND");
      promptMode = UI_HILIGHT;  // start again
    }
    else
      promptMode = UI_SELECT;   // wait for a switch again
    break;

  case UI_ACCEPT: // we have a selection, return the appropriate move
    PRINTS("\n- ACCEPT");
    highlightCell(curPosUI, false);     // unhighlight current selection
    m = curPosUI;
    promptMode = UI_START;  // set up for next time
    break;

  default: // catch all - reset
    promptMode = UI_START;
    break;
  } 

  return(m);
}

void tttCallback(uint8_t position, int8_t player)
// update the board position with the player token
{
  displayPosition(position, player);
}

void displayPosition(uint8_t pos, int8_t player)
{
  // update the position on the grid
  switch (player)
  {
  case TTT_P0: // clear the space
    mp.clear(movePos[pos].x, movePos[pos].y, 
             movePos[pos].x+movePos[pos].size, movePos[pos].y-movePos[pos].size);
    break;

  case TTT_P1: // draw an X
    mp.drawLine(movePos[pos].x+1, movePos[pos].y-1,
                movePos[pos].x-1+movePos[pos].size, movePos[pos].y+1-movePos[pos].size);
    mp.drawLine(movePos[pos].x+1, movePos[pos].y+1-movePos[pos].size,
                movePos[pos].x-1+movePos[pos].size, movePos[pos].y-1);
    break;

  case TTT_P2: // draw an O
    mp.drawCircle(movePos[pos].x+(movePos[pos].size / 2), movePos[pos].y-(movePos[pos].size / 2),
                  (movePos[pos].size / 2) - 1);
    break;
  }
}

void flashLine(uint8_t line)
// note this is blocking as it uses delay();
{
  uint8_t l[3];

  // work out the cells for this line
  switch (line)
  {
  case TTT_WL_D1: l[0]=0; l[1]=4; l[2]=8; break;
  case TTT_WL_D2: l[0]=2; l[1]=4; l[2]=6; break;
  case TTT_WL_H1: l[0]=0; l[1]=1; l[2]=2; break;
  case TTT_WL_H2: l[0]=3; l[1]=4; l[2]=5; break;
  case TTT_WL_H3: l[0]=6; l[1]=7; l[2]=8; break;
  case TTT_WL_V1: l[0]=0; l[1]=3; l[2]=6; break;
  case TTT_WL_V2: l[0]=1; l[1]=4; l[2]=7; break;
  case TTT_WL_V3: l[0]=2; l[1]=5; l[2]=8; break;
  }

  // turn them off and on a number of times (flash!)
  for (uint8_t i=0; i<FLASH_REPEAT; i++)
  {
    mp.update(false);
    for (uint8_t j=0; j<ARRAY_SIZE(l); j++)
      displayPosition(l[j], TTT_P0);
    mp.update(true);
    delay(FLASH_DELAY);

    mp.update(false);
    for (uint8_t j=0; j<ARRAY_SIZE(l); j++)
      displayPosition(l[j], TTT.getBoardPosition(l[j]));
    mp.update(true);
    delay(FLASH_DELAY);
	}
}

void setup()
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel_TTT]");

  mp.begin();
  mp.setFont(_Fixed_5x3);
  mp.setIntensity(4);
  //mp.setRotation(MD_MAXPanel::ROT_90);

  // initialize switch pins for input
  pinMode(swAccept.pin, INPUT_PULLUP);
  pinMode(swSelect.pin, INPUT_PULLUP);

  // set up global constants
  USER_MESG = mp.getFontHeight() + 1;
  GRID_BOTTOM = USER_MESG + 1;
  GRID_RIGHT = mp.getXMax();
  GRID_TOP = mp.getYMax();

  // initialize display
  calcGridSize();
  TTT.setAutoPlayer(curPlayer);
}

void loop(void)
{
  static enum { S_SPLASH, S_START, S_GET_MOVE, S_CHECK_END } curState = S_SPLASH; // current state

  switch (curState)
  {
  case S_SPLASH:    // show splash screen at start
  {
    const uint16_t border = 2;

    PRINTSTATE("S_SPLASH");
    mp.clear();
    mp.drawRectangle(border, border, mp.getXMax() - border, mp.getYMax() - border);
    mp.drawLine(0, 0, border, border);
    mp.drawLine(0, mp.getYMax(), border, mp.getYMax() - border);
    mp.drawLine(mp.getXMax(), 0, mp.getXMax() - border, border);
    mp.drawLine(mp.getXMax(), mp.getYMax(), mp.getXMax() - border, mp.getYMax() - border);
    mp.drawText((mp.getXMax() - mp.getTextWidth(TITLE_TEXT)) / 2, (mp.getYMax() + mp.getFontHeight()) / 2, TITLE_TEXT);
    delay(SPLASH_DELAY);
    curState = S_START;
  }
  break;

  case S_START: // initialize for a new game
    PRINTSTATE("S_START");
    displayGrid();
    inGamePlay = TTT.start();
    curState = S_GET_MOVE;
    break;

  case S_GET_MOVE: // get and make player move - this section is non-blocking
    {
      uint8_t m = 0;

      if (TTT.getAutoPlayer() != curPlayer)
        m = getMove();

      if (m != 0xff)
      {
        TTT.doMove(m, curPlayer);
        curState = S_CHECK_END;
      }
    }
    break;

  case S_CHECK_END: // switch players and check if this is the end of the game
    PRINTSTATE("S_CHECK_END");
    if (TTT.isGameOver())
    {
      inGamePlay = false;

      if (TTT.getGameWinner() == TTT_P0)
      {
        userMessage("A draw");
          delay(FLASH_REPEAT * 2 * FLASH_DELAY); // yes this blocks - so does flashLine()
      }
      else if (TTT.getGameWinner() == TTT.getAutoPlayer())
        userMessage("I win!");
      else
        userMessage("You win!");

      if (TTT.getGameWinner() != TTT_P0)  // not a draw
        flashLine(TTT.getWinLine());

      curState = S_START; // restart
    }
    else
      curState = S_GET_MOVE;  // get or make next move

    // switch turns for players
    curPlayer = (curPlayer == TTT_P1 ? TTT_P2 : TTT_P1);
    break;

  default:
    PRINTSTATE("DEFAULT!");
    curState = S_START;
    break;
  }
}