/**

AT24CX.cpp
Library for using the EEPROM AT24C32/64

Copyright (c) 2014 Christian Paul

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */
#include "AT24CX.h"
#include <Wire.h>

/**
 * Constructor with AT24Cx EEPROM at index 0
 */
AT24CX::AT24CX() {
	init(0, 32);
}

/**
 * Constructor with AT24Cx EEPROM at given index and size of page
 */
AT24CX::AT24CX(byte index, byte pageSize) {
	init(index, pageSize);
}

/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C01::AT24C01(byte index) {
	init(index, 8);
}
/**
 * Constructor with AT24C01 EEPROM at index 0
 */
AT24C01::AT24C01() {
	init(0, 8);
}

/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C02::AT24C02(byte index) {
	init(index, 8);
}
/**
 * Constructor with AT24C02 EEPROM at index 0
 */
AT24C02::AT24C02() {
	init(0, 8);
}

/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C04::AT24C04(byte index) {
	init(index, 16);
}
/**
 * Constructor with AT24C04 EEPROM at index 0
 */
AT24C04::AT24C04() {
	init(0, 16);
}

/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C08::AT24C08(byte index) {
	init(index, 16);
}
/**
 * Constructor with AT24C08 EEPROM at index 0
 */
AT24C08::AT24C08() {
	init(0, 16);
}

/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C16::AT24C16(byte index) {
	init(index, 16);
}
/**
 * Constructor with AT24C16 EEPROM at index 0
 */
AT24C16::AT24C16() {
	init(0, 16);
}

/**
 * Constructor with AT24C32 EEPROM at index 0
 */
AT24C32::AT24C32() {
	init(0, 32);
}
/**
 * Constructor with AT24Cx EEPROM at given index
 */
AT24C32::AT24C32(byte index) {
	init(index, 32);
}

/**
 * Constructor with AT24C64 EEPROM at index 0
 */
AT24C64::AT24C64() {
	init(0, 32);
}
/**
 * Constructor with AT24C64 EEPROM at given index
 */
AT24C64::AT24C64(byte index) {
	init(index, 32);
}

/**
 * Constructor with AT24C128 EEPROM at index 0
 */
AT24C128::AT24C128() {
	init(0, 64);
}
/**
 * Constructor with AT24C128 EEPROM at given index
 */
AT24C128::AT24C128(byte index) {
	init(index, 64);
}

/**
 * Constructor with AT24C256 EEPROM at index 0
 */
AT24C256::AT24C256() {
	init(0, 64);
}
/**
 * Constructor with AT24C128 EEPROM at given index
 */
AT24C256::AT24C256(byte index) {
	init(index, 64);
}

/**
 * Constructor with AT24C512 EEPROM at index 0
 */
AT24C512::AT24C512() {
	init(0, 128);
}
/**
 * Constructor with AT24C512 EEPROM at given index
 */
AT24C512::AT24C512(byte index) {
	init(index, 128);
}

/**
 * Init
 */
void AT24CX::init(byte index, byte pageSize) {
	_id = AT24CX_ID | (index & 0x7);
	_pageSize = pageSize;
	Wire.begin();
}

/**
 * Write byte
 */
void AT24CX::write(unsigned int address, byte data) {
	/*
	if(_pageSize >= 32 || _pageSize <= 8)
		Wire.beginTransmission(_id);
	else
		Wire.beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
    if(Wire.endTransmission()==0) {
		if(_pageSize >= 32)
		{
			Wire.beginTransmission(_id);
    		Wire.write(address >> 8);
    		Wire.write(address & 0xFF);
		}
		else if(_pageSize >= 16)
		{
			Wire.beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
			Wire.write(address & 0xFF);
		}
		else
		{
			Wire.beginTransmission(_id);
			Wire.write(address);
		}
		*/
	connect(address);
	Wire.write(data);
	Wire.endTransmission();
	delay(10);
}

/**
 * Write integer
 */
void AT24CX::writeInt(unsigned int address, unsigned int data) {
	write(address, (byte*)&data, 2);
}

/**
 * Write long
 */
void AT24CX::writeLong(unsigned int address, unsigned long data) {
	write(address, (byte*)&data, 4);
}

/**
 * Write float
 */
void AT24CX::writeFloat(unsigned int address, float data) {
	write(address, (byte*)&data, 4);
}

/**
 * Write double
 */
void AT24CX::writeDouble(unsigned int address, double data) {
	write(address, (byte*)&data, 8);
}

/**
 * Write chars
 */
void AT24CX::writeChars(unsigned int address, char *data, int length) {
	write(address, (byte*)data, length);
}

/**
 * Read integer
 */
unsigned int AT24CX::readInt(unsigned int address) {
	read(address, _b, 2);
	return *(unsigned int*)&_b[0];
}

/**
 * Read long
 */
unsigned long AT24CX::readLong(unsigned int address) {
	read(address, _b, 4);
	return *(unsigned long*)&_b[0];
}

/**
 * Read float
 */
float AT24CX::readFloat(unsigned int address) {
	read(address, _b, 4);
	return *(float*)&_b[0];
}

/**
 * Read double
 */
double AT24CX::readDouble(unsigned int address) {
	read(address, _b, 8);
	return *(double*)&_b[0];
}

/**
 * Read chars
 */
void AT24CX::readChars(unsigned int address, char *data, int n) {
	read(address, (byte*)data, n);
}

/**
 * Write sequence of n bytes
 */
void AT24CX::write(unsigned int address, byte *data, int n) {
	// status quo
	int c = n;						// bytes left to write
	int offD = 0;					// current offset in data pointer
	int offP;						// current offset in page
	int nc = 0;						// next n bytes to write

	// write alle bytes in multiple steps
	while (c > 0) {
		// calc offset in page
		offP = address % _pageSize;
		// maximal 30 bytes to write
		nc = min(min(c, 30), _pageSize - offP);
		write(address, data, offD, nc);
		c-=nc;
		offD+=nc;
		address+=nc;
	}
}

/**
 * Write sequence of n bytes from offset
 */
void AT24CX::write(unsigned int address, byte *data, int offset, int n) {
	/*
    Wire.beginTransmission(_id);
    if (Wire.endTransmission()==0) {
     	Wire.beginTransmission(_id);
		if(_pageSize >= 32)
		{
    		Wire.write(address >> 8);
    		Wire.write(address & 0xFF);
		}
		else
		{
			Wire.write(address);
		}
		*/
	connect(address);
	byte *adr = data+offset;
	Wire.write(adr, n);
	Wire.endTransmission();
	delay(10);
}

/**
 * Read byte
 */
byte AT24CX::read(unsigned int address) {
	byte b = 0;
	int r = 0;
	connect(address);
    if (Wire.endTransmission()==0) {
		Wire.requestFrom(_id, 1);
		while (Wire.available() > 0 && r<1) {
			b = (byte)Wire.read();
			r++;
		}
    }
    return b;
}

/**
 * Read sequence of n bytes
 */
void AT24CX::read(unsigned int address, byte *data, int n) {
	int c = n;
	int offD = 0;
	// read until are n bytes read
	while (c > 0) {
		// read maximal 32 bytes
		int nc = c;
		if (nc > 32)
			nc = 32;
		read(address, data, offD, nc);
		address+=nc;
		offD+=nc;
		c-=nc;
	}
}


/**
 * Read sequence of n bytes to offset
 */
void AT24CX::read(unsigned int address, byte *data, int offset, int n) {
	connect(address);
    if (Wire.endTransmission()==0) {
		int r = 0;
    	Wire.requestFrom(_id, n);
		while (Wire.available() > 0 && r<n) {
			data[offset+r] = (byte)Wire.read();
			r++;
		}
    }
}

void AT24CX::connect(unsigned int address) {
	if(_pageSize >= 32)
	{
		Wire.beginTransmission(_id);
    	Wire.write(address >> 8);
    	Wire.write(address & 0xFF);
	}
	else if(_pageSize >= 16)
	{
		Wire.beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
		Wire.write(address & 0xFF);
	}
	else
	{
		Wire.beginTransmission(_id);
		Wire.write(address);
	}
}
