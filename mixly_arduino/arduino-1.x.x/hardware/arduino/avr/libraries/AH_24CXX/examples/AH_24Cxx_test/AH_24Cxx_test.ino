
/********************************************************
**  Download from:                                     **
**  http://www.arduino-projekte.de                     **
**                                                     **
**  Based on Code from:				       **
**  http://arduino.cc/playground/                      **
**                                                     **
**  Released into the public domain.                   **
********************************************************/

#include <AH_24Cxx.h>
#include <Wire.h> 

#define AT24C01  0
#define AT24C02  1
#define AT24C04  2
#define AT24C08  3
#define AT24C16  4
#define AT24C32  5
#define AT24C64  6
#define AT24C128 8
#define AT24C256 9
//Initialisation

int data;

#define BUSADDRESS  0x00      
#define EEPROMSIZE  2048     //AT24C16 2048byte

AH_24Cxx ic_eeprom = AH_24Cxx(AT24C16, BUSADDRESS);

void setup(){
 Serial.begin(9600);
 Wire.begin();
 Serial.println("Write data");
 for(int i = 0; i < 10; i++) {
   data = i;
   ic_eeprom.write_byte(i,data);
   delay(100);
 }
}

void loop(){
  Serial.println("Read data");
  for (int i=0;i<EEPROMSIZE;i++){
    Serial.print("pos. ");
    Serial.print(i);
    Serial.print(": ");
    Serial.println(ic_eeprom.read_byte(i));
    delay(1000);
  }
}

