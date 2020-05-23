// LCD5110_Scrolling_Text 
// Copyright (C)2015 Rinky-Dink Electronics, Henning Karlsen. All right reserved
// web: http://www.RinkyDinkElectronics.com/
//
// This program is a demo of how to use print().
//
// This program requires a Nokia 5110 LCD module.
//
// It is assumed that the LCD module is connected to
// the following pins:
//      SCK  - Pin 8
//      MOSI - Pin 9
//      DC   - Pin 10
//      RST  - Pin 11
//      CS   - Pin 12
//
#include <LCD5110_Graph.h>

LCD5110 myGLCD(8,9,10,11,12);

extern unsigned char SmallFont[];

int y;

void setup()
{
  myGLCD.InitLCD();
  myGLCD.setFont(SmallFont);
  randomSeed(analogRead(0));
}

void loop()
{
  y = random(0, 40);
  for (int i=84; i>=-(34*6); i--)
  {
    myGLCD.print("LCD5110_Graph Scrolling Text Demo ", i, y);
    myGLCD.update();
    delay(50);
  }
}
