/*
MD_MAXPanel - Library for MAX7219/7221 LED Panel

See header file for comments

This file contains class and hardware related methods.

Copyright (C) 2018 Marco Colli. All rights reserved.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 */
#include <Arduino.h>
#include "MD_MAXPanel.h"
#include "MD_MAXPanel_lib.h"

/**
 * \file
 * \brief Implements class graphics methods
 */

MD_MAXPanel::MD_MAXPanel(MD_MAX72XX::moduleType_t mod, uint8_t dataPin, uint8_t clkPin, uint8_t csPin, uint8_t xDevices, uint8_t yDevices) :
_xDevices(xDevices), _yDevices(yDevices), _rotatedDisplay(false)
{
  _D = new MD_MAX72XX(mod, dataPin, clkPin, csPin, xDevices*yDevices);
  _killOnDestruct = true;
}

MD_MAXPanel::MD_MAXPanel(MD_MAX72XX::moduleType_t mod, uint8_t csPin, uint8_t xDevices, uint8_t yDevices) :
_xDevices(xDevices), _yDevices(yDevices), _rotatedDisplay(false)
{
  _D = new MD_MAX72XX(mod, csPin, xDevices*yDevices);
  _killOnDestruct = true;
}

MD_MAXPanel::MD_MAXPanel(MD_MAX72XX *D, uint8_t xDevices, uint8_t yDevices) :
_xDevices(xDevices), _yDevices(yDevices), _rotatedDisplay(false)
{
  _D = D;
  _killOnDestruct = false;
}

void MD_MAXPanel::begin(void)
{
  _D->begin();
  _charSpacing = CHAR_SPACING_DEFAULT;
  _updateEnabled = true;
}

MD_MAXPanel::~MD_MAXPanel(void)
{
  if (_killOnDestruct) delete _D;
}

uint16_t MD_MAXPanel::getXMax(void)
{ 
  uint16_t m;

  if (_rotatedDisplay)
    m = (_yDevices * ROW_SIZE) - 1;
  else
    m = (_xDevices * COL_SIZE) - 1;

  return(m);
}

uint16_t MD_MAXPanel::getYMax(void) 
{ 
  uint16_t m;

  if (_rotatedDisplay)
    m = (_xDevices * COL_SIZE) - 1;
  else
    m = (_yDevices * ROW_SIZE) - 1;

  return(m);
}

bool MD_MAXPanel::drawHLine(uint16_t y, uint16_t x1, uint16_t x2, bool state)
// draw a horizontal line at row y between columns x1 and x2 inclusive
{
  bool b = true;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);

  if (x1 > x2)      // swap x1/x2
  {
    uint16_t  t = x1;
    x1 = x2;
    x2 = t;
  }

  for (uint16_t i = x1; i <= x2; i++)
    b &= setPoint(i, y, state);

  update(_updateEnabled);

  return(b);
}

bool MD_MAXPanel::drawVLine(uint16_t x, uint16_t y1, uint16_t y2, bool state)
// draw a vertical line at column x between rows y1 and y2 inclusive
{
  bool b = true;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);

  if (y1 > y2)      // swap y1/y2
  {
    uint8_t  t = y1;
    y1 = y2;
    y2 = t;
  }

  for (uint8_t i = y1; i <= y2; i++)
    b &= setPoint(x, i, state);

  update(_updateEnabled);

  return(b);
}

bool MD_MAXPanel::drawLine(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state)
// draw an arbitrary line between two points using Bresentham's line algorithm
// Bresentham's line algorithm at https://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#C
{
  bool b = true;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);

  PRINT("\n\nLine from ", x1); PRINT(",", y1);
  PRINT(" to ", x2); PRINT(",", y2);

  if (x1 > x2)    // swap direction for line
  {
    uint16_t t;

    t = x1; x1 = x2; x2 = t;
    t = y1; y1 = y2; y2 = t;
    //    PRINTS(" SWAP X");
  }

  //  PRINT("\nPlotting from ", x1); PRINT(",", y1);
  //  PRINT(" to ", x2); PRINT(",", y2);

  int16_t dx = x2 - x1;
  int16_t sx = 1;
  int16_t dy = y2 - y1;
  if (dy < 0) dy = -dy;
  int16_t sy = y1 < y2 ? 1 : -1;
  int16_t err = (dx > dy ? dx : -dy) / 2;
  int16_t e2;

  //  PRINT("\ndx=", dx);
  //  PRINT(" dy=", dy);
  //  PRINT(" ystep=", sy);
  //  PRINT(" xstep=", sx);

  for (;;)
  {
    //    PRINT("\nerror=", err);
    //    PRINT(" [", x1); PRINT(",", y1); PRINTS("]");

    b &= setPoint(x1, y1, state);
    if (x1 == x2 && y1 == y2) break;
    e2 = err;
    if (e2 >-dx) { err -= dy; x1 += sx; }
    if (e2 < dy) { err += dx; y1 += sy; }
  }

  update(_updateEnabled);

  return(b);
}

bool MD_MAXPanel::drawRectangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state)
// draw a rectangle given the 2 diagonal vertices
{
  bool b = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  b &= drawHLine(y1, x1, x2, state);
  b &= drawHLine(y2, x1, x2, state);
  b &= drawVLine(x1, y1, y2, state);
  b &= drawVLine(x2, y1, y2, state);
  
  update(u);

  return(b);
}

bool MD_MAXPanel::drawFillRectangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state)
{
  bool b = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  for (uint8_t i = x1; i <= x2; i++)
    drawVLine(i, y1, y2, state);

  update(u);

  return(b);
};

bool MD_MAXPanel::drawQuadrilateral(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, uint16_t x4, uint16_t y4, bool state)
// draw a arbitrary quadrilateral given the 4 corner vertices
{
  bool b = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  b &= drawLine(x1, y1, x2, y2, state);
  b &= drawLine(x2, y2, x3, y3, state);
  b &= drawLine(x3, y3, x4, y4, state);
  b &= drawLine(x4, y4, x1, y1, state);

  update(u);

  return(b);
}

bool MD_MAXPanel::drawTriangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, bool state)
// draw an arbitrary triangle given the 3 corner vertices
{
  bool b = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  b &= drawLine(x1, y1, x2, y2, state);
  b &= drawLine(x2, y2, x3, y3, state);
  b &= drawLine(x3, y3, x1, y1, state);

  update(u);

  return(b);
}

/*
bool MD_MAXPanel::drawFillTriangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, bool state)
// draw an arbitrary filled triangle given the 3 corner vertices
// Uses slope method, originally from Adafruit Industries
{
#define SWAP(a, b) { uint16_t t = a; a = b; b = t; }

  uint8_t a, b, y, last;
  bool r = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  // Sort coordinates by Y order (y3 >= y2 >= y1)
  if (y1 > y2) { SWAP(y1, y2); SWAP(x1, x2); }
  if (y2 > y3) { SWAP(y3, y2); SWAP(x3, x2); }
  if (y1 > y2) { SWAP(y1, y2); SWAP(x1, x2); }

  if (y1 == y3) // All in same line
  {
    a = b = x1;
    if (x2 < a)      a = x2;
    else if (x2 > b) b = x2;

    if (x3 < a)      a = x3;
    else if (x3 > b) b = x3;

    r &= drawHLine(y1, a, b, state);
  }
  else
  {
    int8_t dx12 = x2 - x1;
    int8_t dy12 = y2 - y1;
    int8_t dx13 = x3 - x1;
    int8_t dy13 = y3 - y1;
    int8_t dx23 = x3 - x2;
    int8_t dy23 = y3 - y2;
    int16_t sa = 0, sb = 0;

    // For upper part of triangle, find scanline crossings for segment
    // 1-2 and 1-3.  If y2=y3 (flat-bottomed triangle), the scanline y
    // is included here (and second loop will be skipped, avoiding a /0
    // error there), otherwise scanline y2 is skipped here and handle
    // in the second loop...which also avoids a /0 error here if y1=y
    // (flat-topped triangle)
    if (y2 == y3) last = y2;   // Include y2 scanline
    else          last = y2 - 1; // Skip it

    for (y = y1; y <= last; y++)
    {
      a = x1 + sa / dy12;
      b = x1 + sb / dy13;
      sa += dx12;
      sb += dx13;
      // longhand a = x1 + (x2 - x1) * (y - y1) / (y2 - y1)
      //          b = x0 + (x3 - x1) * (y - y1) / (y3 - y1)
      r &= drawHLine(y, a, b, state);
    }

    // For lower part of triangle, find scanline crossings for segment
    // 1-3 and 2-3.  This loop is skipped if y2=y3
    sa = dx23 * (y - y2);
    sb = dx13 * (y - y1);
    for (; y <= y3; y++)
    {
      a = x2 + sa / dy23;
      b = x1 + sb / dy13;
      sa += dx23;
      sb += dx13;
      // longhand a = x2 + (x3 - x2) * (y - y2) / (y3 - y2)
      //          b = x1 + (x2 - x1) * (y - y1) / (y3 - y1)
      r &= drawHLine(y, a, b, state);
    }
  }

  update(u);

  return(r);
}
*/

bool MD_MAXPanel::drawFillTriangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, bool state)
// Fill a triangle - Bresenham method
// Original from http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
{
#define SWAP(a, b) { uint16_t t = a; a = b; b = t; }

  uint8_t t1x, t2x, y, minx, maxx, t1xp, t2xp;
  bool changed1 = false;
  bool changed2 = false;
  int8_t signx1, signx2, dx1, dy1, dx2, dy2;
  uint8_t e1, e2;
  bool b = true;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  // Sort vertices
  if (y1>y2) { SWAP(y1, y2); SWAP(x1, x2); }
  if (y1>y3) { SWAP(y1, y3); SWAP(x1, x3); }
  if (y2>y3) { SWAP(y2, y3); SWAP(x2, x3); }

  t1x = t2x = x1; y = y1;   // Starting points

  dx1 = (int8_t)(x2 - x1); 
  if (dx1<0) { dx1 = -dx1; signx1 = -1; }
  else signx1 = 1;
  dy1 = (int8_t)(y2 - y1);

  dx2 = (int8_t)(x3 - x1); 
  if (dx2<0) { dx2 = -dx2; signx2 = -1; }
  else signx2 = 1;
  dy2 = (int8_t)(y3 - y1);

  if (dy1 > dx1) // swap values
  {
    SWAP(dx1, dy1);
    changed1 = true;
  }
  if (dy2 > dx2) // swap values
  {
    SWAP(dy2, dx2);
    changed2 = true;
  }

  e2 = (uint8_t)(dx2 >> 1);
  // Flat top, just process the second half
  if (y1 == y2) goto next;
  e1 = (uint8_t)(dx1 >> 1);

  for (uint8_t i = 0; i < dx1;) 
  {
    t1xp = 0; t2xp = 0;
    if (t1x<t2x) { minx = t1x; maxx = t2x; }
    else		     { minx = t2x; maxx = t1x; }
    // process first line until y value is about to change
    while (i<dx1) 
    {
      i++;
      e1 += dy1;
      while (e1 >= dx1) 
      {
        e1 -= dx1;
        if (changed1) t1xp = signx1;//t1x += signx1;
        else          goto next1;
      }
      if (changed1) break;
      else t1x += signx1;
    }
    // Move line
  next1:
    // process second line until y value is about to change
    while (1) 
    {
      e2 += dy2;
      while (e2 >= dx2) 
      {
        e2 -= dx2;
        if (changed2) t2xp = signx2;//t2x += signx2;
        else          goto next2;
      }
      if (changed2)     break;
      else              t2x += signx2;
    }
  next2:
    if (minx>t1x) minx = t1x; 
    if (minx>t2x) minx = t2x;
    if (maxx<t1x) maxx = t1x; 
    if (maxx<t2x) maxx = t2x;
    b &= drawHLine(y, minx, maxx, state); // Draw line from min to max points found on the y
    // Now increase y
    if (!changed1) t1x += signx1;
    t1x += t1xp;
    if (!changed2) t2x += signx2;
    t2x += t2xp;
    y += 1;
    if (y == y2) break;

  }
  next:
  // Second half
  dx1 = (int8_t)(x3 - x2); 
  if (dx1<0) { dx1 = -dx1; signx1 = -1; }
  else       signx1 = 1;
  dy1 = (int8_t)(y3 - y2);
  t1x = x2;

  if (dy1 > dx1) 
  {   // swap values
    SWAP(dy1, dx1);
    changed1 = true;
  }
  else changed1 = false;

  e1 = (uint8_t)(dx1 >> 1);

  for (uint8_t i = 0; i <= dx1; i++) 
  {
    t1xp = 0; t2xp = 0;
    if (t1x<t2x) { minx = t1x; maxx = t2x; }
    else		     { minx = t2x; maxx = t1x; }
    // process first line until y value is about to change
    while (i<dx1) 
    {
      e1 += dy1;
      while (e1 >= dx1) 
      {
        e1 -= dx1;
        if (changed1) { t1xp = signx1; break; }//t1x += signx1;
        else          goto next3;
      }
      if (changed1) break;
      else   	   	  t1x += signx1;
      if (i<dx1) i++;
    }
  next3:
    // process second line until y value is about to change
    while (t2x != x3) 
    {
      e2 += dy2;
      while (e2 >= dx2) 
      {
        e2 -= dx2;
        if (changed2) t2xp = signx2;
        else          goto next4;
      }
      if (changed2) break;
      else          t2x += signx2;
    }
  next4:

    if (minx>t1x) minx = t1x; 
    if (minx>t2x) minx = t2x;
    if (maxx<t1x) maxx = t1x; 
    if (maxx<t2x) maxx = t2x;
    b &= drawHLine(y, minx, maxx, state);    // Draw line from min to max points found on the y
    // Now increase y
    if (!changed1) t1x += signx1;
    t1x += t1xp;
    if (!changed2) t2x += signx2;
    t2x += t2xp;
    y += 1;
    if (y>y3) goto outtahere;
  }

outtahere:
  update(u);

  return(b);
}


bool MD_MAXPanel::drawCirclePoints(uint16_t xc, uint16_t yc, uint16_t x, uint16_t y, bool state)
// draw symmetrical circle points
{
  bool b = true;

  b &= setPoint(xc + x, yc + y, state);
  b &= setPoint(xc - x, yc + y, state);
  b &= setPoint(xc + x, yc - y, state);
  b &= setPoint(xc - x, yc - y, state);
  b &= setPoint(xc + y, yc + x, state);
  b &= setPoint(xc - y, yc + x, state);
  b &= setPoint(xc + y, yc - x, state);
  b &= setPoint(xc - y, yc - x, state);

  return(b);
}

bool MD_MAXPanel::drawCircle(uint16_t xc, uint16_t yc, uint16_t r, bool state)
// draw a circle given center and radius
// Bresenhams Algorith from http://www.pracspedia.com/CG/bresenhamcircle.html
{
  int x = 0, y = r;
  int pk = 3 - (2 * r);
  bool b = false;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);

  PRINT("\n\nCircle center ", xc); PRINT(",", yc); PRINT(" radius ", r);

  b &= drawCirclePoints(xc, yc, x, y, state);

  while (x < y)
  {
    // check for decision parameter and correspondingly update pk, x, y
    if (pk <= 0)
    {
      pk = pk + (4 * x) + 6;
      b &= drawCirclePoints(xc, yc, ++x, y, state);
    }
    else
    {
      pk = pk + (4 * (x - y)) + 10;
      b &= drawCirclePoints(xc, yc, ++x, --y, state);
    }
  }

  update(_updateEnabled);

  return(b);
}

bool MD_MAXPanel::drawCircleLines(uint16_t xc, uint16_t yc, uint16_t x, uint16_t y, bool state)
// draw symmetrical circle lines for the filled circle
{
  bool b = true;

  b &= drawHLine(yc - y, xc - x, xc + x, state);
  b &= drawHLine(yc + y, xc - x, xc + x, state);
  b &= drawHLine(yc - x, xc - y, xc + y, state);
  b &= drawHLine(yc + x, xc - y, xc + y, state);

  return(b);
}

bool MD_MAXPanel::drawFillCircle(uint16_t xc, uint16_t yc, uint16_t r, bool state)
// Draw a filled circle given center and radius
// Bresenhams Algorith from http://www.pracspedia.com/CG/bresenhamcircle.html
{
  int x = 0, y = r;
  int pk = 3 - (2 * r);
  bool b = false;
  bool u = _updateEnabled;

  _D->control(MD_MAX72XX::UPDATE, MD_MAX72XX::OFF);
  update(false);

  PRINT("\n\nFilled Circle center ", xc); PRINT(",", yc); PRINT(" radius ", r);
  b &= drawCircleLines(xc, yc, x, y, state);
  while (x < y)
  {
    // check for decision parameter and correspondingly update pk, x, y
    if (pk <= 0)
    {
      pk = pk + (4 * x) + 6;
      b &= drawCircleLines(xc, yc, ++x, y, state);
    }
    else
    {
      pk = pk + (4 * (x - y)) + 10;
      b &= drawCircleLines(xc, yc, ++x, --y, state);
    }
  }

  update(u);

  return(b);
}

uint16_t MD_MAXPanel::Y2Row(uint16_t x, uint16_t y)
// Convert y coord to linear coord
{
  uint16_t Y;

  if (_rotatedDisplay)
  {
    x = getXMax() - x;
    Y = (ROW_SIZE - (x % ROW_SIZE) - 1);
  }
  else
    Y = (ROW_SIZE - (y % ROW_SIZE) - 1);

  return(Y);
}

uint16_t MD_MAXPanel::X2Col(uint16_t x, uint16_t y)
// Convert x coord to linear coord
{
  uint16_t X;

  if (_rotatedDisplay)
  {
    x = getXMax() - x;
    X = ((x / ROW_SIZE) * (_xDevices * COL_SIZE) + (_xDevices * COL_SIZE) - 1 - (y % (_xDevices * COL_SIZE)));
  }
  else
    X = ((y / ROW_SIZE) * (_xDevices * COL_SIZE) + (_xDevices * COL_SIZE) - 1 - (x % (_xDevices * COL_SIZE)));

  return(X);
}

bool MD_MAXPanel::getPoint(uint16_t x, uint16_t y)
{
  if (x > getXMax() || y > getYMax())
    return(false);

  return(_D->getPoint(Y2Row(x,y), X2Col(x,y)));
}

bool MD_MAXPanel::setPoint(uint16_t x, uint16_t y, bool state)
{
  if (x > getXMax() || y > getYMax())
    return(false);

  //PRINT("[", x); PRINT(",", y); PRINTS("]");

  return(_D->setPoint(Y2Row(x,y), X2Col(x,y), state));
}

