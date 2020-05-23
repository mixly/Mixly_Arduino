/***************************************************************************
 *  This is a basic example showing how to use ESP8266Spiram library       *
 *  you can write and read a Byte in a given location of the SRAM          *                               *
 *  for usage and connections, see:                                        *
 *  https://github.com/arduino/ESPBee/blob/master/ESP8266_Spiram/README.md *
 *                                                                         *
 *  written by Giacarlo Bacchio                                            *
 ***************************************************************************/

#include <SPI.h>
#include <ESP8266Spiram.h>

ESP8266Spiram Spiram;


void setup() {
  Serial.begin(115200);
  delay(1000);
  Spiram.begin();
}


void loop() {
  Spiram.setByteMode();
  uint8_t rRam[5] = {0x01, 0x02, 0x03, 0x04, 0x05};
  uint8_t wRam[5];
  Spiram.write(0x00, rRam, 5);
  Spiram.read(0x00, wRam, 5);
  for (int i = 0; i < 5; i++)
    Serial.println(wRam[i]);
  delay(2000);
}





