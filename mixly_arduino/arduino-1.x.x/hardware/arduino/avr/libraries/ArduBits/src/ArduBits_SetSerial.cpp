 
#include "ArduBits_SetSerial.h"


SetSerial::SetSerial(uint8_t _TX_pin ,uint8_t _RX_pin) : SoftwareSerial(_TX_pin , _RX_pin)
{
	
}

SetSerial::~SetSerial()
{
  SoftwareSerial::end();
}
