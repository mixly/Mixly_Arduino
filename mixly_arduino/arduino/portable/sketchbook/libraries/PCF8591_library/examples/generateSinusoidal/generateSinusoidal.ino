/*
 * 	PCF8591 Analog Port Expand
 *  Production of a sinusoïdal signal using a PCF8591 module
 *
 *  by  Yves Pelletier <http://electroniqueamateur.blogspot.com>
 *
 *  http://electroniqueamateur.blogspot.com/2019/01/pcf8591-et-esp8266-ou-arduino.html
 *
 *
 * PCF8574    ----- Esp32
 * A0         ----- GRD
 * A1         ----- GRD
 * A2         ----- GRD
 * SDA        ----- A4
 * SCL        ----- A5
 *
 *
 */

#include "PCF8591.h" // bibliothèque https://github.com/xreef/PCF8591_library
#define PCF8591_I2C_ADDRESS 0x48  //adresse i2c du module PCF8591

PCF8591 pcf8591(PCF8591_I2C_ADDRESS);

int compteur;

void setup()
{
  pcf8591.begin();
}

void loop(){
  pcf8591.analogWrite(100 + 100 * sin(2*3.1416*compteur/200) ); // sinus

  // pcf8591.analogWrite(compteur ); // dent de scie

  compteur++;
  if (compteur > 200){
    compteur = 0;
  }
  delay(1);
}
