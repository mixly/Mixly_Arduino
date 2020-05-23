#include "MAX44009.h"
//#include <math.h>  //use for pow() function

MAX44009::MAX44009() {}

int MAX44009::begin()
{
	Wire.beginTransmission(MAX_ADDR);
	Wire.write(0x02);
	Wire.write(0x00); // changed from 0x40
	
	return Wire.endTransmission();
}


float MAX44009::get_lux(void)
{
	unsigned int data[2];
	
	Wire.beginTransmission(MAX_ADDR);
	Wire.write(0x03); //request high-byte register data
	Wire.endTransmission();

	// Request 1 byte of data
	Wire.requestFrom(MAX_ADDR, 1);

	// Read first byte of data
	if (Wire.available() == 1)
	{
		data[0] = Wire.read();
	}

    	Wire.beginTransmission(MAX_ADDR);
	Wire.write(0x04); //request low-byte register data
	Wire.endTransmission();

	// Request 1 byte of data
	Wire.requestFrom(MAX_ADDR, 1);

	// Read second byte of data
	if (Wire.available() == 1)
	{
		data[1] = Wire.read();
	}
 
	// Convert the data to lux
	int exponent = (data[0] & 0xF0) >> 4;
	int mantissa = ((data[0] & 0x0F) << 4) | (data[1] & 0x0F);
	
	//float luminance = pow(2, exponent) * mantissa * 0.045;
	float luminance = (float)(((0x00000001 << exponent) * (float)mantissa) * 0.045);
	
	return luminance; 
}
