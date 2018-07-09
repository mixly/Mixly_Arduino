/*
  setColor.ino
  2013 Copyright (c) Seeed Technology Inc.  All right reserved.

  Author:Loovee
  2013-10-15

  Grove - Serial LCD RGB Backlight demo.
  you can set color by serial input, input "rrr ggg bbb"

  rrr means red, 0-255, eg: 005, 015, 135
  ggg means green
  bbb means blue
  
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

char dtaUart[15];
char dtaLen = 0;

void setup() 
{
    Serial.begin(115200);
    // set up the LCD's number of columns and rows:
    lcd.begin(16, 2);
    // Print a message to the LCD.
    lcd.print("set cllor");
}

void loop() 
{

    if(dtaLen == 11)
    {
        int r = (dtaUart[0]-'0')*100 + (dtaUart[1] - '0')*10 + (dtaUart[2] - '0');          // get r
        int g = (dtaUart[4]-'0')*100 + (dtaUart[5] - '0')*10 + (dtaUart[6] - '0');
        int b = (dtaUart[8]-'0')*100 + (dtaUart[9] - '0')*10 + (dtaUart[10] - '0');
        
        dtaLen = 0;
        
        lcd.setRGB(r, g, b);

        Serial.println("get data");
        
        Serial.println(r);
        Serial.println(g);
        Serial.println(b);
        Serial.println();

    }
}

void serialEvent()
{
    while(Serial.available())
    {
        dtaUart[dtaLen++] = Serial.read();
    }
}

/*********************************************************************************************************
  END FILE
*********************************************************************************************************/