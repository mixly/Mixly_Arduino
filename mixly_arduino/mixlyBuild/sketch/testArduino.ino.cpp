#include <Arduino.h>
#line 1 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
#line 1 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
#include "Mixly.h"

DS1307 myRTC(4,7);

#line 5 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
void setup();
#line 11 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
void loop();
#line 5 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
void setup(){
  myRTC.setDate(1970,1,1);
  myRTC.setDOW(1970,1,1);
  myRTC.setTime(8,0,0);
}

void loop(){

}
