/*************************************************** 
  This is a library for the MLX90614 Temp Sensor

  Designed specifically to work with the MLX90614 sensors in the
  adafruit shop
  ----> https://www.adafruit.com/products/1748
  ----> https://www.adafruit.com/products/1749

  These sensors use I2C to communicate, 2 pins are required to  
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/
#include <SoftwareWire.h>
#include "Adafruit_MLX90614_Soft.h"

Adafruit_MLX90614_Soft::Adafruit_MLX90614_Soft(void) {
}


boolean Adafruit_MLX90614_Soft::begin(SoftwareWire *theWire, uint8_t i2caddr) {
  _wire = theWire;
  _addr = i2caddr;
  _wire->begin();

  /*
  for (uint8_t i=0; i<0x20; i++) {
    Serial.print(i); Serial.print(" = ");
    Serial.println(read16(i), HEX);
  }
  */
  return true;
}

//////////////////////////////////////////////////////


double Adafruit_MLX90614_Soft::readObjectTempF(void) {
  return (readTemp(MLX90614_TOBJ1) * 9 / 5) + 32;
}


double Adafruit_MLX90614_Soft::readAmbientTempF(void) {
  return (readTemp(MLX90614_TA) * 9 / 5) + 32;
}

double Adafruit_MLX90614_Soft::readObjectTempC(void) {
  return readTemp(MLX90614_TOBJ1);
}


double Adafruit_MLX90614_Soft::readAmbientTempC(void) {
  return readTemp(MLX90614_TA);
}

float Adafruit_MLX90614_Soft::readTemp(uint8_t reg) {
  float temp;
  
  temp = read16(reg);
  temp *= .02;
  temp  -= 273.15;
  return temp;
}

/*********************************************************************/

uint16_t Adafruit_MLX90614_Soft::read16(uint8_t a) {
  uint16_t ret;

  _wire->beginTransmission(_addr); // start transmission to device 
  _wire->write(a); // sends register address to read from
  _wire->endTransmission(false); // end transmission
  
  _wire->requestFrom(_addr, (uint8_t)3);// send data n-bytes read
  ret = _wire->read(); // receive DATA
  ret |= _wire->read() << 8; // receive DATA

  uint8_t pec = _wire->read();

  return ret;
}
