/*
MD_MAXPanel - Library for panels of MAX72xx LED matrix controllers

See header file for comments

This file contains library related definitions and is not visible
to user code.

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
#pragma once

/**
 * \file
 * \brief Includes library only definitions
 */

#define MP_DEBUG 0   ///< Enable or disable (default) debugging output from the MD_MAX72xx library

#if MP_DEBUG
#define PRINT(s, v)   { Serial.print(F(s)); Serial.print(v); }      ///< Print a string followed by a value (decimal)
#define PRINTX(s, v)  { Serial.print(F(s)); Serial.print(v, HEX); } ///< Print a string followed by a value (hex)
#define PRINTB(s, v)  { Serial.print(F(s)); Serial.print(v, BIN); } ///< Print a string followed by a value (binary)
#define PRINTS(s)     { Serial.print(F(s)); }                       ///< Print a string
#else
#define PRINT(s, v)   ///< Print a string followed by a value (decimal)
#define PRINTX(s, v)  ///< Print a string followed by a value (hex)
#define PRINTB(s, v)  ///< Print a string followed by a value (binary)
#define PRINTS(s)     ///< Print a string
#endif

#define X2COL(x, y) (((y / ROW_SIZE) * (getXMax() + 1)) + (getXMax() - (x % (getXMax() + 1)))) ///< Convert x coord to linear coord
#define Y2ROW(x, y) (ROW_SIZE - (y % ROW_SIZE) - 1)    ///< Convert y coord to linear coord

#define CHAR_SPACING_DEFAULT 1  ///< Default number of pixels between characters
