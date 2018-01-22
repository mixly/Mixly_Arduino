# 1 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
# 1 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino"
# 2 "D:\\Mixly_Arduino\\new\\Mixly0.997_WIN\\testArduino\\testArduino.ino" 2

DS1307 myRTC(4,7);

void setup(){
  myRTC.setDate(1970,1,1);
  myRTC.setDOW(1970,1,1);
  myRTC.setTime(8,0,0);
}

void loop(){

}
