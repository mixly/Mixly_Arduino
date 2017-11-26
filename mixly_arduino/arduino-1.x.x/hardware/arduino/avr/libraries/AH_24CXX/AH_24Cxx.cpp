
/********************************************************
**  Download from:                                     **
**  http://www.arduino-projekte.de                     **
**                                                     **
**  Based on Code from:				       **
**  http://arduino.cc/playground/                      **
**                                                     **
**  Released into the public domain.                   **
********************************************************/

#include <Arduino.h>
#include <AH_24Cxx.h>
#include <Wire.h> 

#define AT24C01  0
#define AT24C02  1
#define AT24C04  2
#define AT24C08  3
#define AT24C16  4
#define AT24C32  5
#define AT24C64  6
#define AT24C128 8
#define AT24C256 9


//************************************************************************

// Constructor
AH_24Cxx::AH_24Cxx(int ic_type, int deviceaddress){	
  //  Wire.begin(); // initialise the connection
   _mode = ic_type;
   _deviceaddress = B01010<<3 | deviceaddress; //Address: B01010(A2)(A1)(A0)    A2=0; A1=0; A0=0 => Address: B01010000(BIN) | 0x50(HEX) | 80(DEC)
}


//*************************************************************************

  // WARNING: address is a page address, 6-bit end will wrap around
  // also, data can be maximum of about 30 bytes, because the Wire library has a buffer of 32 bytes

  void AH_24Cxx::write_page( unsigned int eeaddresspage, byte* data, byte length ) {

    Wire.beginTransmission(_deviceaddress);
    if (_mode>4){
      Wire.write((int)(eeaddresspage >> 8)); // MSB
      Wire.write((int)(eeaddresspage & 0xFF)); // LSB
    }
    else { 
      Wire.write((int)eeaddresspage);
    }

    byte c;
    for ( c = 0; c < length; c++)
      Wire.write(data[c]);
    Wire.endTransmission();
  }


//*************************************************************************

  // maybe let's not read more than 30 or 32 bytes at a time!

  void AH_24Cxx::read_buffer(unsigned int eeaddress, byte *buffer, int length ) {
    Wire.beginTransmission(_deviceaddress);
    if (_mode>4){
      Wire.write((int)(eeaddress >> 8)); // MSB
      Wire.write((int)(eeaddress & 0xFF)); // LSB
    }
    else { 
      Wire.write((int)eeaddress);
    }
    Wire.endTransmission();
    Wire.requestFrom(_deviceaddress,length);
    int c = 0;
    for ( c = 0; c < length; c++ )
      if (Wire.available()) buffer[c] = Wire.read();
  }


//*************************************************************************

  void AH_24Cxx::write_byte(unsigned int eeaddress, byte data) {

    int rdata = data;
    Wire.beginTransmission(_deviceaddress);
    if (_mode>4){
      Wire.write((int)(eeaddress >> 8)); // MSB
      Wire.write((int)(eeaddress & 0xFF)); // LSB
    }
    else { 
      Wire.write((int)eeaddress);
    }
    Wire.write(rdata);
    Wire.endTransmission();
  }

//*************************************************************************

  byte AH_24Cxx::read_byte(unsigned int eeaddress) {
    byte rdata = 0xFF;
    Wire.beginTransmission(_deviceaddress);
    if (_mode>4){
      Wire.write((int)(eeaddress >> 8)); // MSB
      Wire.write((int)(eeaddress & 0xFF)); // LSB
    }
    else { 
      Wire.write((int)eeaddress);
    }
    Wire.endTransmission();
    Wire.requestFrom(_deviceaddress,1);
    if (Wire.available()) rdata = Wire.read();
    return rdata;
  }

