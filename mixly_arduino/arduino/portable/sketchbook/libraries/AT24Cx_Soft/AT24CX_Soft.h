/**

AT24CX_Soft.h
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
#ifndef AT24CX_Soft_h
#define AT24CX_Soft_h

// includes
#include <Arduino.h>
#include <SoftwareWire.h>
// byte
typedef uint8_t byte;

// AT24Cx I2C adress
// 80
// 0x50
#define AT24CX_Soft_ID B1010000

// general class definition
class AT24CX_Soft {
public:
	AT24CX_Soft(byte index, byte pageSize, SoftwareWire *theWire);
	void write(unsigned int address, byte data);
	void write(unsigned int address, byte *data, int n);
	void writeInt(unsigned int address, unsigned int data);
	void writeLong(unsigned int address, unsigned long data);
	void writeFloat(unsigned int address, float data);
	void writeDouble(unsigned int address, double data);
	void writeChars(unsigned int address, char *data, int length);
	byte read(unsigned int address);
	void read(unsigned int address, byte *data, int n);
	unsigned int readInt(unsigned int address);
	unsigned long readLong(unsigned int address);
	float readFloat(unsigned int address);
	double readDouble(unsigned int address);
	void readChars(unsigned int address, char *data, int n);
protected:
	void init(byte index, byte pageSize, SoftwareWire *theWire);
private:
	SoftwareWire *_wire;
	void read(unsigned int address, byte *data, int offset, int n);
	void write(unsigned int address, byte *data, int offset, int n);
	void connect(unsigned int address);
	int _id;
	byte _b[8];
	byte _pageSize;
};

#endif
