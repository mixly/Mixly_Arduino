/**

AT24CX_Soft.cpp
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
#include "AT24CX_Soft.h"
#include <SoftwareWire.h>

/**
 * Constructor with AT24Cx EEPROM at given index and size of page
 */
AT24CX_Soft::AT24CX_Soft(byte index, byte pageSize, SoftwareWire *theWire) {
	init(index, pageSize, theWire);
}

/**
 * Init
 */
void AT24CX_Soft::init(byte index, byte pageSize, SoftwareWire *theWire) {
	_wire = theWire;
	_id = AT24CX_Soft_ID | (index & 0x7);
	_pageSize = pageSize;
	_wire->begin();
}

/**
 * Write byte
 */
void AT24CX_Soft::write(unsigned int address, byte data) {
	/*
	if(_pageSize >= 32 || _pageSize <= 8)
		_wire->beginTransmission(_id);
	else
		_wire->beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
    if(_wire->endTransmission()==0) {
		if(_pageSize >= 32)
		{
			_wire->beginTransmission(_id);
    		_wire->write(address >> 8);
    		_wire->write(address & 0xFF);
		}
		else if(_pageSize >= 16)
		{
			_wire->beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
			_wire->write(address & 0xFF);
		}
		else
		{
			_wire->beginTransmission(_id);
			_wire->write(address);
		}
		*/
	connect(address);
	_wire->write(data);
	_wire->endTransmission();
	delay(10);
}

/**
 * Write integer
 */
void AT24CX_Soft::writeInt(unsigned int address, unsigned int data) {
	write(address, (byte*)&data, 2);
}

/**
 * Write long
 */
void AT24CX_Soft::writeLong(unsigned int address, unsigned long data) {
	write(address, (byte*)&data, 4);
}

/**
 * Write float
 */
void AT24CX_Soft::writeFloat(unsigned int address, float data) {
	write(address, (byte*)&data, 4);
}

/**
 * Write double
 */
void AT24CX_Soft::writeDouble(unsigned int address, double data) {
	write(address, (byte*)&data, 8);
}

/**
 * Write chars
 */
void AT24CX_Soft::writeChars(unsigned int address, char *data, int length) {
	write(address, (byte*)data, length);
}

/**
 * Read integer
 */
unsigned int AT24CX_Soft::readInt(unsigned int address) {
	read(address, _b, 2);
	return *(unsigned int*)&_b[0];
}

/**
 * Read long
 */
unsigned long AT24CX_Soft::readLong(unsigned int address) {
	read(address, _b, 4);
	return *(unsigned long*)&_b[0];
}

/**
 * Read float
 */
float AT24CX_Soft::readFloat(unsigned int address) {
	read(address, _b, 4);
	return *(float*)&_b[0];
}

/**
 * Read double
 */
double AT24CX_Soft::readDouble(unsigned int address) {
	read(address, _b, 8);
	return *(double*)&_b[0];
}

/**
 * Read chars
 */
void AT24CX_Soft::readChars(unsigned int address, char *data, int n) {
	read(address, (byte*)data, n);
}

/**
 * Write sequence of n bytes
 */
void AT24CX_Soft::write(unsigned int address, byte *data, int n) {
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
void AT24CX_Soft::write(unsigned int address, byte *data, int offset, int n) {
	/*
    _wire->beginTransmission(_id);
    if (_wire->endTransmission()==0) {
     	_wire->beginTransmission(_id);
		if(_pageSize >= 32)
		{
    		_wire->write(address >> 8);
    		_wire->write(address & 0xFF);
		}
		else
		{
			_wire->write(address);
		}
		*/
	connect(address);
	byte *adr = data+offset;
	_wire->write(adr, n);
	_wire->endTransmission();
	delay(10);
}

/**
 * Read byte
 */
byte AT24CX_Soft::read(unsigned int address) {
	byte b = 0;
	int r = 0;
	connect(address);
    if (_wire->endTransmission()==0) {
		_wire->requestFrom(_id, 1);
		while (_wire->available() > 0 && r<1) {
			b = (byte)_wire->read();
			r++;
		}
    }
    return b;
}

/**
 * Read sequence of n bytes
 */
void AT24CX_Soft::read(unsigned int address, byte *data, int n) {
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
void AT24CX_Soft::read(unsigned int address, byte *data, int offset, int n) {
	connect(address);
    if (_wire->endTransmission()==0) {
		int r = 0;
    	_wire->requestFrom(_id, n);
		while (_wire->available() > 0 && r<n) {
			data[offset+r] = (byte)_wire->read();
			r++;
		}
    }
}

void AT24CX_Soft::connect(unsigned int address) {
	if(_pageSize >= 32)
	{
		_wire->beginTransmission(_id);
    	_wire->write(address >> 8);
    	_wire->write(address & 0xFF);
	}
	else if(_pageSize >= 16)
	{
		_wire->beginTransmission((byte)(_id | ((address >> 8) & 0x07)));
		_wire->write(address & 0xFF);
	}
	else
	{
		_wire->beginTransmission(_id);
		_wire->write(address);
	}
}
