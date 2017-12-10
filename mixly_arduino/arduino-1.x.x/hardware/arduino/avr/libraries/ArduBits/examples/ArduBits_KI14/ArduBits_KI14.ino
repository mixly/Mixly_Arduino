#include "ArduBits_RTC.h"

RTC rtc(2,3);

void setup() {
  Serial.begin(9600);
  rtc.fillByHMS(17, 40, 00); // 17:40:00
  rtc.fillByYMD(2017, 8, 1);// 2017.8.1
  rtc.fillByWeek(2017, 8, 1); // 根据年月日自动算星期     

}

void loop() {

  printTime();
  delay(500);
}

void printTime()
{
  Serial.print(rtc.getYear(), DEC);
  Serial.print("/");
  Serial.print(rtc.getMonth(), DEC);
  Serial.print("/");
  Serial.print(rtc.getDay(), DEC);
  Serial.print(" ");
  Serial.print(rtc.getHour(), DEC);
  Serial.print(":");
  Serial.print(rtc.getMinute(), DEC);
  Serial.print(":");
  Serial.print(rtc.getSecond(), DEC);
  
  Serial.print(" ");
  
  switch(rtc.getWeek())
  {
   case 1:Serial.println("Mon");
   break;
 
   case 2:Serial.println("Tues");
   break; 
   
   case 3:Serial.println("Wed");
   break;
   
   case 4:Serial.println("Thur");
   break;
   
   case 5:Serial.println("Fri");
   break;
   
   case 6:Serial.println("Sat");
   break;
   
   case 7:Serial.println("Sun");
   break;
  }

	
}
