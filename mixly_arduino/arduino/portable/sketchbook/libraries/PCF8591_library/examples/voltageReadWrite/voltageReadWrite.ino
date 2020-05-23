/*
 * 	PCF8591 Analog Port Expand
 *  Read write voltage on pins
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
 * SDA        ----- A4
 * SCL        ----- A5
 *
 *
 */
#include "Arduino.h"
#include "PCF8591.h"
#define PCF8591_I2C_ADDRESS 0x48

PCF8591 pcf8591(PCF8591_I2C_ADDRESS);

void setup()
{
	Serial.begin(115200);
	pcf8591.begin();
}

void loop()
{
	pcf8591.voltageWrite(2.7); // 2.7Volts output
	delay(3000);

	float ana0V = pcf8591.voltageRead(AIN0);
	Serial.println(ana0V);

	float ana1V = pcf8591.voltageRead(AIN1);
	Serial.println(ana1V);

	float ana2V = pcf8591.voltageRead(AIN2);
	Serial.println(ana2V);
	delay(3000);

}
