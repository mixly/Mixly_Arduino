/*
MD_MAXPanel - Library for MAX7219/7221 LED Panel

See header file for comments

This file contains font and text related methods.
 */
#include <Arduino.h>
#include "MD_MAXPanel.h"
#include "MD_MAXPanel_lib.h"

/**
 * \file
 * \brief Implements font and text methods
 */

uint16_t MD_MAXPanel::getTextWidth(const char *psz)
{
  uint16_t  sum = 0;
  uint8_t bufSize = _D->getMaxFontWidth();
  uint8_t buf[bufSize];

  while (*psz != '\0')
  {
    sum += _D->getChar(*psz++, bufSize, buf);
    if (*psz) sum += _charSpacing;  // next character is not nul, so add inter-character spacing
  }

  return(sum);
}

uint16_t MD_MAXPanel::drawText(uint16_t x, uint16_t y, const char *psz, rotation_t rot, bool state)
{
  uint8_t height = _D->getFontHeight();
  uint8_t bufSize = _D->getMaxFontWidth() + _charSpacing;
  uint8_t buf[bufSize];
  uint8_t size;
  uint16_t sum = 0;

  int16_t nextPos;

  PRINT("\ndrawText: ", psz);
  PRINT(" height ", height);
  while (*psz != '\0')
  {
    PRINT("\nChar ", *psz);
    memset(buf, '\0', bufSize*sizeof(uint8_t));
    size = _D->getChar(*psz, bufSize, buf);
    psz++;
    if (*psz != '\0') size += _charSpacing;   // add in the blank columns
    sum += size;

    // now display the char depending on what the orientation is
    switch (rot)
    {
    case ROT_0:
      for (uint16_t i = 0; i < size; i++)
        for (uint16_t j = 0; j < height; j++)
            setPoint(x + i, y - j, (buf[i] & (1 << j) ? state : !state));
      x += size;
      break;

    case ROT_90:
      for (uint16_t j = 0; j < size; j++)
        for (uint16_t i = 0; i < height; i++)
          setPoint(x + i, y + j, (buf[j] & (1 << i) ? state : !state));
      y += size;
      break;

    case ROT_180:
      for (uint16_t i = 0; i < size; i++)
        for (uint16_t j = 0; j < height; j++)
          setPoint(x - i, y + j, (buf[i] & (1 << j) ? state : !state));
      x -= size;
      break;

    case ROT_270:
      for (uint16_t j = 0; j < size; j++)
        for (uint16_t i = 0; i < height; i++)
          setPoint(x - i, y - j, (buf[j] & (1 << i) ? state : !state));
      y -= size;
      break;
    }
  }

  return(sum);
}
