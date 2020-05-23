// LCD5110_Graph_Demo 
// Copyright (C)2015 Rinky-Dink Electronics, Henning Karlsen. All right reserved
// web: http://www.RinkyDinkElectronics.com/
//
// This program is a demo of most of the functions
// in the library.
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

extern uint8_t SmallFont[];
extern uint8_t arduino_logo[];
extern unsigned char TinyFont[];
extern uint8_t The_End[];
extern uint8_t pacman1[];
extern uint8_t pacman2[];
extern uint8_t pacman3[];
extern uint8_t pill[];

float y;
uint8_t* bm;
int pacy;

void setup()
{
  myGLCD.InitLCD();
  myGLCD.setFont(SmallFont);
  randomSeed(analogRead(7));
}

void loop()
{
  myGLCD.clrScr();
  myGLCD.drawBitmap(0, 0, arduino_logo, 84, 48);
  myGLCD.update();

  delay(2000);
  
  myGLCD.clrScr();
  myGLCD.print("LCD5110_Graph", CENTER, 0);
  myGLCD.print("DEMO", CENTER, 20);
  myGLCD.drawRect(28, 18, 56, 28);
  for (int i=0; i<6; i++)
  {
    myGLCD.drawLine(57, 18+(i*2), 83-(i*3), 18+(i*2));
    myGLCD.drawLine((i*3), 28-(i*2), 28, 28-(i*2));
  }
  myGLCD.setFont(TinyFont);
  myGLCD.print("(C)2015 by", CENTER, 36);
  myGLCD.print("Henning Karlsen", CENTER, 42);
  myGLCD.update();
  
  delay(5000);
  
  myGLCD.clrScr();
  for (int i=0; i<48; i+=2)
  {
    myGLCD.drawLine(0, i, 83, 47-i);
    myGLCD.update();
  }
  for (int i=83; i>=0; i-=2)
  {
    myGLCD.drawLine(i, 0, 83-i, 47);
    myGLCD.update();
  }

  delay(2000);
  
  myGLCD.clrScr();
  myGLCD.drawRect(0, 0, 83, 47);
  for (int i=0; i<48; i+=4)
  {
    myGLCD.drawLine(0, i, i*1.75, 47);
    myGLCD.update();
  }
  for (int i=0; i<48; i+=4)
  {
    myGLCD.drawLine(83, 47-i, 83-(i*1.75), 0);
    myGLCD.update();
  }

  delay(2000);
  
  myGLCD.clrScr();
  for (int i=0; i<8; i++)
  {
    myGLCD.drawRoundRect(i*3, i*3, 83-(i*3), 47-(i*3));
    myGLCD.update();
  }

  delay(2000);
  
  myGLCD.clrScr();
  for (int i=0; i<17; i++)
  {
    myGLCD.drawCircle(41, 23, i*3);
    myGLCD.update();
  }

  delay(2000);
  
  myGLCD.clrScr();
  myGLCD.drawRect(0, 0, 83, 47);
  myGLCD.drawLine(0, 23, 84, 23);
  myGLCD.drawLine(41, 0, 41, 47);
  for (int c=0; c<4; c++)
  {
    for (int i=0; i<84; i++)
    {
      y=i*0.017453292519943295769236907684886;
      myGLCD.invPixel(i, (sin(y*6)*20)+23);
      myGLCD.update();
      delay(20);
    }
  }

  delay(2000);

  for (int pc=0; pc<3; pc++)
  {
    pacy=random(0, 28);
  
    for (int i=-20; i<84; i++)
    {
      myGLCD.clrScr();
      for (int p=4; p>((i+20)/20); p--)
        myGLCD.drawBitmap(p*20-8, pacy+7, pill, 5, 5);
      switch(((i+20)/3) % 4)
      {
        case 0: bm=pacman1;
                break;
        case 1: bm=pacman2;
                break;
        case 2: bm=pacman3;
                break;
        case 3: bm=pacman2;
                break;
      }
      myGLCD.drawBitmap(i, pacy, bm, 20, 20);
      myGLCD.update();
      delay(25);
    }
  }

  for (int i=0; i<25; i++)
  {
    myGLCD.clrScr();
    myGLCD.drawBitmap(0, i-24, The_End, 84, 24);
    myGLCD.update();
    delay(100);
  }
  myGLCD.setFont(SmallFont);
  myGLCD.print("Runtime (ms):", CENTER, 32);
  myGLCD.printNumI(millis(), CENTER, 40);
  myGLCD.update();
  for (int i=0; i<5; i++)
  {
    myGLCD.invert(true);
    delay(1000);
    myGLCD.invert(false);
    delay(1000);
  }
}
