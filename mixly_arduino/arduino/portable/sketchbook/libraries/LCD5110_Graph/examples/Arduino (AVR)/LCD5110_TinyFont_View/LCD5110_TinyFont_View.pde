// LCD5110_TinyFont_View 
// Copyright (C)2015 Rinky-Dink Electronics, Henning Karlsen. All right reserved
// web: http://www.RinkyDinkElectronics.com/
//
// This program is a demo of the tiniest font.
//
// This program requires a Nokia 5110 LCD module.
//
// It is assumed that the LCD module is connected to
// the following pins using a levelshifter to get the
// correct voltage to the module.
//      SCK  - Pin 8
//      MOSI - Pin 9
//      DC   - Pin 10
//      RST  - Pin 11
//      CS   - Pin 12
//
#include <LCD5110_Graph.h>

LCD5110 myGLCD(8,9,10,11,12);

extern uint8_t TinyFont[];

void setup()
{
  myGLCD.InitLCD();
  myGLCD.setFont(TinyFont);
}

void loop()
{
  myGLCD.print(" !\"#$%&'()*+,-./", CENTER, 0);
  myGLCD.print("0123456789:;<=>?", CENTER, 6);
  myGLCD.print("@ABCDEFGHIJKLMNO", CENTER, 12);
  myGLCD.print("PQRSTUVWXYZ[\\]^_", CENTER, 18);
  myGLCD.print("`abcdefghijklmno", CENTER, 24);
  myGLCD.print("pqrstuvwxyz{|}~ ", CENTER, 30);
  myGLCD.update();
  
  while (1);
}
