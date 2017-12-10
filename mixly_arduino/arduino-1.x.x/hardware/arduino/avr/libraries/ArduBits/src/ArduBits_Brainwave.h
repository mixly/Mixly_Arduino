#ifndef _ArduBits_Brainwave_h_
#define ArduBits_Brainwave_h_
#include "Arduino.h"
#include "ArduBits_SetSerial.h"
#include <inttypes.h>
#include <stddef.h>


class Brainwave : public SetSerial
{
public:

  Brainwave(uint8_t tx_pin,uint8_t rx_pin);
  void begin(unsigned long baud);
  uint8_t  get_poorQuality(void);
  uint8_t  get_attention(void);
  uint8_t  get_meditation(void);
 
private:

  
  void get_wave(byte abread);
  byte ReadOneByte(void);
  
  byte poorQuality = 0;
  byte attention = 0;
  byte meditation = 0;
  boolean bigPacket = false;
	byte generatedChecksum = 0;
	byte checksum = 0; 
	int payloadLength = 0;
	byte payloadData[64] = {
  	0};
   	
};
#endif
