#include "ArduBits_Tadpole.h"
#include "Arduino.h"

void Tadpole::Car_Init(void)
{
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(7, INPUT);
    
}
/********前进********/
void Tadpole::Car_Forward(uint8_t Speed)
{
  analogWrite(5,Speed);
  analogWrite(6,0);
  analogWrite(10,Speed);
  analogWrite(11,0);
}
/********后退********/
void Tadpole::Car_Back(uint8_t Speed)
{
  analogWrite(5,0);
  analogWrite(6,Speed);
  analogWrite(10,0);
  analogWrite(11,Speed);
}
/********左转********/
void Tadpole::Car_Left(uint8_t Speed)
{
  analogWrite(5,0);
  analogWrite(6,Speed);
  analogWrite(10,Speed);
  analogWrite(11,0);
}
/********单左转********/
void Tadpole::Car_Single_Left(uint8_t Speed)
{
  analogWrite(5,0);
  analogWrite(6,0);
  analogWrite(10,Speed);
  analogWrite(11,0);
}
/********右转********/
void Tadpole::Car_Right(uint8_t Speed)
{
  analogWrite(5,Speed);
  analogWrite(6,0);
  analogWrite(10,0);
  analogWrite(11,Speed);
}
/********单右转********/
void Tadpole::Car_Single_Right(uint8_t Speed)
{
  analogWrite(5,Speed);
  analogWrite(6,0);
  analogWrite(10,0);
  analogWrite(11,0);
}
/********停********/
void Tadpole::Car_Stop(uint8_t Speed)
{
  analogWrite(5,Speed);
  analogWrite(6,Speed);
  analogWrite(10,Speed);
  analogWrite(11,Speed);
}
/********语音播报第一首********/
void Tadpole::Car_Voice_One(void)
{
  digitalWrite(12,LOW);
  digitalWrite(13,HIGH);
  delay(200);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
}
/********语音播报第二首********/
void Tadpole::Car_Voice_Two(void)
{
  digitalWrite(12,HIGH);
  digitalWrite(13,LOW);
  delay(200);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
}
/********语音播报第三首********/
void Tadpole::Car_Voice_Three(void)
{
  digitalWrite(12,HIGH);
  digitalWrite(13,HIGH);
  delay(200);
  digitalWrite(12,LOW);
  digitalWrite(13,LOW);
}




