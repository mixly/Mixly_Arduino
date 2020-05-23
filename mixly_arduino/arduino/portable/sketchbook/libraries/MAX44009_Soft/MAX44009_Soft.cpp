#include "MAX44009_Soft.h"
//#include <math.h>  //use for pow() function
#include <SoftwareWire.h>

MAX44009_Soft::MAX44009_Soft() {}

int MAX44009_Soft::begin(SoftwareWire *theWire)
{
	_wire = theWire;
	_wire->beginTransmission(MAX_ADDR);
	_wire->write(0x02);
	_wire->write(0x00); // changed from 0x40
	
	return _wire->endTransmission();
}


float MAX44009_Soft::get_lux(void)
{
	unsigned int data[2];
	
	_wire->beginTransmission(MAX_ADDR);
	_wire->write(0x03); //request high-byte register data
	_wire->endTransmission();

	// Request 1 byte of data
	_wire->requestFrom(MAX_ADDR, 1);

	// Read first byte of data
	if (_wire->available() == 1)
	{
		data[0] = _wire->read();
	}

    	_wire->beginTransmission(MAX_ADDR);
	_wire->write(0x04); //request low-byte register data
	_wire->endTransmission();

	// Request 1 byte of data
	_wire->requestFrom(MAX_ADDR, 1);

	// Read second byte of data
	if (_wire->available() == 1)
	{
		data[1] = _wire->read();
	}
 
	// Convert the data to lux
	int exponent = (data[0] & 0xF0) >> 4;
	int mantissa = ((data[0] & 0x0F) << 4) | (data[1] & 0x0F);
	
	//float luminance = pow(2, exponent) * mantissa * 0.045;
	float luminance = (float)(((0x00000001 << exponent) * (float)mantissa) * 0.045);
	
	return luminance; 
}
