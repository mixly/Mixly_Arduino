/*
  TextDirection.ino
  2013 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author:Loovee
  2013-9-18

  Grove - Serial LCD RGB Backlight demo.

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
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

#include <Wire.h>
#include "rgb_lcd.h"

rgb_lcd lcd;

int thisChar = 'a';

void setup() 
{
    // set up the LCD's number of columns and rows:
    lcd.begin(16, 2);
    // turn on the cursor:
    lcd.cursor();
}

void loop() 
{
    // reverse directions at 'm':
    if (thisChar == 'm') 
    {
        // go right for the next letter
        lcd.rightToLeft();
    }
    // reverse again at 's':
    if (thisChar == 's') 
    {
        // go left for the next letter
        lcd.leftToRight();
    }
    // reset at 'z':
    if (thisChar > 'z')
    {
        // go to (0,0):
        lcd.home();
        // start again at 0
        thisChar = 'a';
    }
    // print the character
    lcd.write(thisChar);
    // wait a second:
    delay(1000);
    // increment the letter:
    thisChar++;
}

/*********************************************************************************************************
  END FILE
*********************************************************************************************************/