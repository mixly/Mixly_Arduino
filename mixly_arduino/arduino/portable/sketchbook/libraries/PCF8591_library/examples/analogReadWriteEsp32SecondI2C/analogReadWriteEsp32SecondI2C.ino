/*
 * 	PCF8591 Analog Port Expand
 *  Read all analog pins and write value on analog ouput
 *
 *  by Mischianti Renzo <http://www.mischianti.org>
 *
 *  https://www.mischianti.org/2019/01/03/pcf8591-i2c-analog-i-o-expander/
 *
 *
 * PCF8574    ----- Esp32
 * A0         ----- GRD
 * A1         ----- GRD
 * A2         ----- GRD
 * SDA        ----- 21
 * SCL        ----- 22
 *
 *
 */
#include "Arduino.h"

#include "PCF8591.h"
#define PCF8591_I2C_ADDRESS 0x48

// Instantiate Wire for generic use at 400kHz
TwoWire I2Cone = TwoWire(0);
// Instantiate Wire for generic use at 100kHz
TwoWire I2Ctwo = TwoWire(1);

// Set i2c address
//PCF8591 pcf8591(&I2Ctwo, PCF8591_I2C_ADDRESS);
 PCF8591 pcf8591(&I2Ctwo, 0x20, 21, 22);

void setup()
{
	Serial.begin(115200);
	I2Cone.begin(16,17,400000); // SDA pin 16, SCL pin 17, 400kHz frequency

	pcf8591.begin();
}

void loop()
{
	PCF8591::AnalogInput ai = pcf8591.analogReadAll();
	Serial.print(ai.ain0);
	Serial.print(" - ");
	Serial.print(ai.ain1);
	Serial.print(" - ");
	Serial.print(ai.ain2);
	Serial.print(" - ");
	Serial.println(ai.ain3);

	delay(3000);

	int ana = pcf8591.analogRead(AIN0);
	Serial.print("AIN0 --> ");
	Serial.println(ana);

	ana = pcf8591.analogRead(AIN1);
	Serial.print("AIN1 --> ");
	Serial.println(ana);

	ana = pcf8591.analogRead(AIN2);
	Serial.print("AIN2 --> ");
	Serial.println(ana);

	ana = pcf8591.analogRead(AIN3);
	Serial.print("AIN3 --> ");
	Serial.println(ana);
	delay(3000);

	pcf8591.analogWrite(0);
	delay(3000);
	pcf8591.analogWrite(128);
	delay(3000);
	pcf8591.analogWrite(255);
	delay(3000);
}
