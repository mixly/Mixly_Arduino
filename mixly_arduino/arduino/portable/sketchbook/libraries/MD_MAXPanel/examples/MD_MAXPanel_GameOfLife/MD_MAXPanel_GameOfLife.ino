// Implements Conway's Game of Life using MD_MAXPanel library
//
// Hardware used
// =============
// Momentary On push switch on SWITCH_PIN to start a new game. The digital I/O  
// will be initialize INPUT_PULLUP
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
//
// Rules of the Game
// =================
// The universe of the Game of Life is an infinite, two-dimensional orthogonal 
// grid of square cells, each of which is in one of two possible states, 
// alive or dead (or populated and unpopulated). Every cell interacts with 
// its eight neighbors, which are the cells that are horizontally, vertically,
// or diagonally adjacent. At each step in time, the following transitions occur:
//
// 1. Any live cell with fewer than two live neighbors dies, as if by under population.
// 2. Any live cell with two or three live neighbors lives on to the next generation.
// 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbors becomes a live cell, as if 
//    by reproduction.
//
// The initial pattern constitutes the seed of the system. The first generation is 
// created by applying the above rules simultaneously to every cell in the seed; 
// births and deaths occur simultaneously, and the discrete moment at which this 
// happens is sometimes called a tick. Each generation is a pure function of the 
// preceding one. The rules continue to be applied repeatedly to create further 
// generations.
//

#include <MD_MAXPanel.h>
#include "randomseed.h"

// Turn on debug statements to the serial output
#define  DEBUG  0

#if  DEBUG
#define PRINT(s, x)   { Serial.print(F(s)); Serial.print(x); }
#define PRINTS(x)     { Serial.print(F(x)); }
#define PRINTD(x)     { Serial.print(x, DEC); }
#define PRINTXY(s, x, y) { Serial.print(s); Serial.print(F("(")); Serial.print(x); Serial.print(F(",")); Serial.print(y); Serial.print(F(")")); }

#else
#define PRINT(s, x)
#define PRINTS(x)
#define PRINTD(x)
#define PRINTXY(s, x, y)

#endif

// Define the number of devices we have in the chain and the hardware interface
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
// MD_MAXPanel mx = MD_MAXPanel(HARWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES);

#define SWITCH_PIN 6

// We always wait a bit between updates of the display
#define  TICK_TIME  150  // in milliseconds

void setup(void)
{
#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel Game of Life]");

  pinMode(SWITCH_PIN, INPUT_PULLUP);
  
  mp.begin();
  mp.clear();
  randomSeed(seedOut(31, RANDOM_SEED_PORT));
}

void loop(void)
{
  static uint32_t timeLastRun = 0;
  static uint8_t sameCount = 10;
  static uint32_t lastCount = 0;
  uint32_t count = countCells();
  
  if (lastCount == count) sameCount++; else sameCount = 0;

  if (digitalRead(SWITCH_PIN) == LOW || sameCount >= 10)
  {
    mp.clear();     // mark the end of the display ...
    delay(1000);    // ... with a minor pause!
    firstGeneration();
    sameCount = 0;
  }
  lastCount = count;
    
  // Check if next generation time
  if (millis() - timeLastRun >= TICK_TIME)
  {
    timeLastRun = millis();
    nextGeneration();
  }
}

uint32_t countCells(void)
{
  uint32_t count = 0;

  for (uint16_t x = 0; x <= mp.getXMax(); x++)
    for (uint16_t y = 0; y <= mp.getYMax(); y++)
      count += (mp.getPoint(x,y) ? 1:0);

  return(count);
}

void firstGeneration(void)
// Create a 4-way symmetric random setup
{
  mp.update(false);

  PRINTS("\n-- FIRST Generation");
  PRINTXY("\n-- Field size (1,1) - ", mp.getXMax() - 1, mp.getYMax() - 1);
  mp.clear();
  for (uint16_t x=1; x<(mp.getXMax()+1) / 2; x++)
    for (uint16_t y = 1; y < (mp.getYMax()+1) / 2; y++)
    {
      bool b = (random(101) > 50);

      mp.setPoint(x, y, b);
      mp.setPoint(mp.getXMax() - x, y, b);
      mp.setPoint(x, mp.getYMax() - y, b);
      mp.setPoint(mp.getXMax() - x, mp.getYMax() - y, b);
    }
      
  mp.update(true);
}

void nextGeneration(void)
// Apply the rules
{
  bool rowBuf[2][mp.getXMax()+2];
  uint16_t count;
  bool newCell;

  PRINTS("\n-- NEW generation");
  // clear out the row buffers
  memset(rowBuf, 0, sizeof(rowBuf));
  mp.update(false);
  
  for (uint16_t y=mp.getYMax()-1; y>=1; y--)
  {
    // copy the current row to the buffer
    for (uint16_t x=0; x<mp.getXMax(); x++)
      rowBuf[1][x] = mp.getPoint(x, y);

    // work out a 'new' current row
    for (uint16_t x=1; x<mp.getXMax(); x++)
    {
      // count the number of neighbours
      count = rowBuf[0][x-1] ? 1:0;
      count += rowBuf[0][x]  ? 1:0;
      count += rowBuf[0][x+1]? 1:0;
      count += rowBuf[1][x-1]? 1:0;
      count += rowBuf[1][x+1]? 1:0;
      count += mp.getPoint(x-1, y-1)? 1:0;
      count += mp.getPoint(x, y-1)  ? 1:0;
      count += mp.getPoint(x+1, y-1)? 1:0;

      PRINTXY("\n@", x, y);
      PRINT(" count=", count);
      PRINTS(" ->");
      
      if (count < 2)
      {
        // A live cell with fewer than two neighbors dies.
        newCell = false;
        PRINTS("dies.");
      }
      else if ((count == 2 || count == 3) && mp.getPoint(x, y))
      {
        // A live cell with two or three neighbors lives on.
        newCell = true;
        PRINTS("stays.");
      }
      else if (count == 3 && !mp.getPoint(x, y))
      {
        // A dead cell with exactly three neighbors becomes live.
        newCell = true;
        PRINTS("born.");
      }
      else
      {
        // A live cell with more than three neighbors dies.
        newCell = false;
        PRINTS("dies.");
      }

      mp.setPoint(x, y, newCell);
    }

    // update the saved row buffers
    for (uint16_t x=0; x<=mp.getXMax(); x++)
      rowBuf[0][x] = rowBuf[1][x];
  }

  mp.update(true);
}
