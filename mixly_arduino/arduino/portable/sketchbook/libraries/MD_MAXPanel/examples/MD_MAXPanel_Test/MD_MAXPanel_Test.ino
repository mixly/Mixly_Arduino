// Program to exercise the MD_MAXPanel library
//
// Uses most of the functions in the library
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
//

#include <MD_MAXPanel.h>
#include "Font5x3.h"

// Turn on debug statements to the serial output
#define  DEBUG  1

#if  DEBUG
#define PRINT(s, x) { Serial.print(F(s)); Serial.print(x); }
#define PRINTS(x)   Serial.print(F(x))
#define PRINTD(x)   Serial.print(x, DEC)

#else
#define PRINT(s, x)
#define PRINTS(x)
#define PRINTD(x)

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
// MD_MAXPanel mx = MD_MAXPanel(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES);

// We always wait a bit between updates of the display
#define  DELAYTIME  100  // in milliseconds

void zeroPointer(void)
// Demonstrates the use of setPoint and
// show where the zero point is in the display
{
  PRINTS("\nZero point highlight");
  mp.clear();

  for (uint8_t i=0; i<=max(mp.getXMax(), mp.getYMax()); i++)
  {
    mp.setPoint(i, i, true);
    mp.setPoint(0, i, true);
    mp.setPoint(i, 0, true);
    delay(DELAYTIME/mp.getXMax());
  }

  delay(DELAYTIME*6);
}

void showUp(void)
// Triangle pointing to the of the display as currently rotated
{
  PRINTS("\nTop of display");
  char sz[] = "UP";
  uint8_t w, h;
   
  mp.setFont(_Fixed_5x3);
  w = mp.getTextWidth(sz); 
  h = 5;

  mp.clear();
  mp.drawTriangle(0, mp.getYMax() / 2, (mp.getXMax() + 1) / 2, mp.getYMax(), mp.getXMax(), mp.getYMax() / 2, true);
  mp.drawText((mp.getXMax() - w) / 2, (mp.getYMax() / 2) + 2 + h, sz);
  mp.setFont(nullptr);

  delay(DELAYTIME * 10);
}

void brightness(void)
// Demonstrate the use of setBrightness()
// Striped display so as not to overload power supply
{
  const uint8_t SKIP_COUNT = 3;
  uint8_t c = 0;

  PRINTS("\nBrigtness");
  mp.clear();

  // set up diagonal dots on the display to avoid using too 
  // much power in big displays
  for (uint16_t i = 0; i <= mp.getXMax(); i++)
  {
    uint8_t ctr = c;
    
    c++;
    if (c > SKIP_COUNT) c = 0;

    for (uint16_t j = 0; j <= mp.getYMax(); j++)
    {
      mp.setPoint(i, j, (ctr == 0));
      ctr++;
      if (ctr > SKIP_COUNT) ctr = 0;
    }
  }

  // now show the brightness
  for (uint8_t i = 0; i < MAX_INTENSITY; i++)
  {
    mp.setIntensity(i);
    PRINT(" ", i);
    delay(DELAYTIME * 5);
  }

  // reset to a sensible value
  mp.setIntensity(7);
}

void lines(void)
// Demonstrate the use of drawLine().
// Stepped fan out lines from each corner
{
  PRINTS("\nLines");
  const uint8_t stepSize = 4;

  mp.clear();

  for (uint16_t x = 0; x<=mp.getXMax(); x += stepSize)
  {
    mp.drawLine(0, 0, x, mp.getYMax(), true);
    delay(DELAYTIME);
    mp.clear();
  }
  
  for (uint16_t x = 0; x<=mp.getXMax(); x += stepSize)
  {
    mp.drawLine(0, mp.getYMax(), x, 0, true);
    delay(DELAYTIME);
    mp.clear();
  }
  
  for (uint16_t x = 0; x<=mp.getXMax(); x += stepSize)
  {
    mp.drawLine(mp.getXMax(), mp.getYMax(), mp.getXMax() - x, 0, true);
    delay(DELAYTIME);
    mp.clear();
  }
  
  for (uint16_t x = 0; x<=mp.getXMax(); x += stepSize)
  {
    mp.drawLine(mp.getXMax(), 0, mp.getXMax() - x, mp.getYMax(), true);
    delay(DELAYTIME);
    mp.clear();
  }
}

void hLines(void)
// Demonstrate the use of drawHLine()
// Draw a sawtooth across the display (depends on aspect ratio)
{
  PRINTS("\nHorizontal Lines");

  mp.clear();
  for (uint8_t y = 0; y < mp.getYMax(); y++)
  {
    mp.drawHLine(y, 0, y % mp.getXMax(), true);
    delay(DELAYTIME/4);
  }
}

void vLines(void)
// Demonstrate the use of drawVLine()
// Stepped increment lines from zero point
{
  PRINTS("\nVertical Lines");

  mp.clear();
  for (uint16_t x = 0; x < mp.getXMax(); x++)
  {
    mp.drawVLine(x, 0, x % mp.getYMax(), true);
    delay(DELAYTIME/4);
  }
}

void rectanglesFill(void)
// Demonstrate the use of drawFillRectangle()
// Various sized rectangles spanning the entire display
{
  PRINTS("\nRectangles Fill");
  mp.clear();

  for (uint8_t stepSize = 2; stepSize < 6; stepSize++)
  {
    for (uint16_t i = 0; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawFillRectangle(i, i, mp.getXMax() - i, mp.getYMax() - i, true);
      delay(2 * DELAYTIME);
      mp.drawFillRectangle(i, i, mp.getXMax() - i, mp.getYMax() - i, false);
      delay(2 * DELAYTIME);
    }
  }
}

void rectangles(void)
// Demonstrate the use of drawRectangle()
// Nested rectangles spanning the entire display
{
  PRINTS("\nRectangles");
  mp.clear();

  for (uint8_t stepSize = 2; stepSize < 6; stepSize++)
  {
    for (uint16_t i = 0; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawRectangle(i, i, mp.getXMax() - i, mp.getYMax() - i, true);
      delay(2 * DELAYTIME);
    }

    for (uint16_t i = 0; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawRectangle(i, i, mp.getXMax() - i, mp.getYMax() - i, false);
      delay(2 * DELAYTIME);
    }
  }
}

void quadrilaterals(void)
// Demonstrate the use of drawQuadrilateral()
// Rubber band quadrilaterals anchored to the display edge
{
  const uint8_t numQuadri = min(mp.getXMax(), mp.getYMax())/2;
  const uint8_t stepSizeX = mp.getXMax() / numQuadri;
  const uint8_t stepSizeY = mp.getYMax() / numQuadri;
  const uint8_t offset = 2;

  PRINTS("\nQuadrilaterals");
  mp.clear();

  for (uint8_t j = 0; j < 4; j++)
  {
    for (uint16_t i = 0; i < numQuadri; i++)
    {
      uint16_t x = stepSizeX * i;
      uint16_t y = stepSizeY * i;

      mp.drawQuadrilateral(x+offset, 0+offset, 0+offset, mp.getYMax() - y - offset, mp.getXMax() - x - offset, mp.getYMax() - offset, mp.getXMax() - offset, y + offset, true);
      delay(DELAYTIME/2);
      mp.drawQuadrilateral(x + offset, 0 + offset, 0 + offset, mp.getYMax() - y - offset, mp.getXMax() - x - offset, mp.getYMax() - offset, mp.getXMax() - offset, y + offset, false);
    }
  }
}

void trianglesFill(void)
// Demonstrate the use of drawFillTriangle()
// Random triangles.
{
  const uint8_t NUM_TRIANGLE = 25;
  const uint8_t NUM_VERTEX = 3;

  uint16_t x[NUM_VERTEX], y[NUM_VERTEX];

  PRINTS("\nTriangles Fill");
  mp.clear();

  for (uint8_t j = 0; j < NUM_TRIANGLE; j++)
  {
    for (uint16_t i = 0; i < NUM_VERTEX; i++)
    {
      x[i] = random(mp.getXMax() + 1);
      y[i] = random(mp.getYMax() + 1);
    }

    mp.drawFillTriangle(x[0], y[0], x[1], y[1], x[2], y[2], true);
    delay(2 * DELAYTIME);
    mp.drawFillTriangle(x[0], y[0], x[1], y[1], x[2], y[2], false);
    delay(2 * DELAYTIME);
  }
}

void triangles(void)
// Demonstrate the use of drawTriangle()
// Random triangles.
{
  const uint8_t NUM_TRIANGLE = 25;
  const uint8_t NUM_VERTEX = 3;

  uint16_t x[NUM_VERTEX], y[NUM_VERTEX];

  PRINTS("\nTriangles");
  mp.clear();

  for (uint8_t j = 0; j < NUM_TRIANGLE; j++)
  {
    for (uint16_t i = 0; i < NUM_VERTEX; i++)
    {
      x[i] = random(mp.getXMax() + 1);
      y[i] = random(mp.getYMax() + 1);
    }

    mp.drawTriangle(x[0], y[0], x[1], y[1], x[2], y[2], true);
    delay(2 * DELAYTIME);
    mp.drawTriangle(x[0], y[0], x[1], y[1], x[2], y[2], false);
    delay(2 * DELAYTIME);
  }
}

void circlesFill(void)
// Demonstrate the use of drawFillCircle()
// Nested circles spanning the entire display
{
  PRINTS("\nCircles Fill");
  mp.clear();

  for (uint8_t stepSize = 2; stepSize < 6; stepSize++)
  {
    for (uint16_t i = stepSize; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawFillCircle(mp.getXMax()/2, mp.getYMax()/2, i, true);
      delay(2 * DELAYTIME);
      mp.drawFillCircle(mp.getXMax() / 2, mp.getYMax() / 2, i, false);
      delay(2 * DELAYTIME);
    }
  }
}

void circles(void)
// Demonstrate the use of drawCircle()
// Nested circles spanning the entire display
{
  PRINTS("\nCircles");
  mp.clear();

  for (uint8_t stepSize = 2; stepSize < 6; stepSize++)
  {
    for (uint16_t i = stepSize; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawCircle(mp.getXMax() / 2, mp.getYMax() / 2, i, true);
      delay(2 * DELAYTIME);
    }

    for (uint16_t i = stepSize; i < min(mp.getXMax(), mp.getYMax()) / 2; i += stepSize)
    {
      mp.drawCircle(mp.getXMax() / 2, mp.getYMax() / 2, i, false);
      delay(2 * DELAYTIME);
    }
  }
}

void bounce(void)
// Animation of a bouncing ball
{
  const uint16_t minX = 0;
  const uint16_t maxX = mp.getXMax();
  const uint16_t minY = 0;
  const uint16_t maxY = mp.getYMax();
  
  uint16_t  nCounter = 0;

  uint16_t  y = random(maxY/2) + maxY/2, x = random(maxX/2) + maxX/2;
  int8_t dy = 1, dx = 1;	// delta row and column

  PRINTS("\nBouncing ball");
  mp.clear();

  while (nCounter++ < 200)
  {
    mp.setPoint(x, y, false);
    x += dx;
    y += dy;
    mp.setPoint(x, y, true);
    delay(DELAYTIME/2);

    if ((x == minX) || (x == maxX))
      dx = -dx;
    if ((y == minY) || (y == maxY))
      dy = -dy;
  }
}

void text(MD_MAX72XX::fontType_t *fontData)
// Demonstrate the use of drawText()
// Display text in different orientations and fonts
{
  PRINTS("\nText");

  mp.setFont(fontData);
  PRINT(" - Font height: ", mp.getFontHeight());

  mp.clear();
  mp.drawText(0, mp.getYMax(), "R_0", MD_MAXPanel::ROT_0);
  delay(5 * DELAYTIME);

  mp.clear();
  mp.drawText(0, 0, "R_90", MD_MAXPanel::ROT_90);
  delay(5 * DELAYTIME);

  mp.clear();
  mp.drawText(mp.getXMax(), 0, "R_180", MD_MAXPanel::ROT_180);
  delay(5 * DELAYTIME);

  mp.clear();
  mp.drawText(mp.getXMax(), mp.getYMax(), "R_270", MD_MAXPanel::ROT_270);
  delay(5 * DELAYTIME);
}

void setup(void)
{
  mp.begin();

#if  DEBUG
  Serial.begin(57600);
#endif
  PRINTS("\n[MD_MAXPanel Test & Demo]");
}

void loop(void)
{
  zeroPointer();
  showUp();
  brightness();
  lines();
  hLines();
  vLines();
  rectangles();
  rectanglesFill();
  circles();
  circlesFill();
  triangles();
  trianglesFill();
  quadrilaterals();
  bounce();
  text(_Fixed_5x3);
  text(nullptr);

  // rotate the display and do it all again
  mp.setRotation(mp.getRotation() == MD_MAXPanel::ROT_0 ? MD_MAXPanel::ROT_90 : MD_MAXPanel::ROT_0);
}

