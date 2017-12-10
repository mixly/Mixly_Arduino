#include "ArduBits_Telecontrol.h"
#include "Arduino.h"

void Telecontrol::Init(void)
{
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);
  pinMode(9, INPUT);
  pinMode(10, INPUT);
    
}

void Telecontrol::rocker(void)
{
   if (analogRead(A5) <= 448)
   {
      tt=0;
      ss=1;
      sz=map(analogRead(A5), 448, 0, 0, 255);
    }
   if (analogRead(A5) >= 575) 
   {
      tt=0;
      ww=1;
      wz=map(analogRead(A5), 575, 1023, 0, 255);
   }
   if (analogRead(A4) <= 448)
   {
      tt=0;
      aa=1;
      az=map(analogRead(A4), 448, 0, 0, 255);
    }
    if (analogRead(A4) >= 575) 
    {
      tt=0;
      dd=1;
      dz=map(analogRead(A4), 575, 1023, 0, 255);
    }
    if ((analogRead(A4) > 448 && analogRead(A4) < 575) && (analogRead(A5) > 448 && analogRead(A5) < 575))
    {
      ww=0;
      aa=0;
      ss=0;
      dd=0;
      tt=1;
      tz=255;
    }
}

bool Telecontrol::W_Xal(void)
{
  rocker();
  return  ww; 
}
uint8_t Telecontrol::W_Num(void)
{
  rocker();
  if(ww==1)
    return  wz;
  else
    return  0;
}

bool Telecontrol:: S_Xal(void)
{
  rocker();
  return  ss; 
}
uint8_t Telecontrol::S_Num(void)
{
  rocker();
  if(ss==1)
    return  sz;
  else
    return  0;
}

bool Telecontrol:: A_Xal(void)
{
  rocker();
  return  aa; 
}
uint8_t Telecontrol::A_Num(void)
{
  rocker();
  if(aa==1)
    return  az;
  else
    return  0;
}
bool Telecontrol:: D_Xal(void)
{
  rocker();
  return  dd; 
}
uint8_t Telecontrol::D_Num(void)
{
  rocker();
  if(dd==1)
    return  dz;
  else
    return  0;
}
bool Telecontrol:: T_Xal(void)
{
  rocker();
  return  tt; 
}
uint8_t Telecontrol::T_Num(void)
{
  rocker();
  if(tt==1)
    return  tz;
  else
    return  0;
}


