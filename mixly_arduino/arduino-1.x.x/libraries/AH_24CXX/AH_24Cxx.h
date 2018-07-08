
/********************************************************
**  Download from:                                     **
**  http://www.arduino-projekte.de                     **
**                                                     **
**  Based on Code from:				       **
**  http://arduino.cc/playground/                      **
**                                                     **
**  Released into the public domain.                   **
********************************************************/

#ifndef AH_24Cxx_h
#define AH_24Cxx_h

#include <Arduino.h>   //Arduino IDE >= V1.0



class AH_24Cxx
{
  public:
    // Constructor
    AH_24Cxx(int ic_type,int deviceaddress);   	
    void write_byte  (unsigned int eeaddress, byte data);
    void write_page  (unsigned int eeaddresspage, byte* data, byte length);
    byte read_byte   (unsigned int eeaddress);
    void read_buffer (unsigned int eeaddress, byte *buffer, int length);

  private:
    int _mode;
    int _deviceaddress;
    



};

#endif 
