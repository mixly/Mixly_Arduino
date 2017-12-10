#ifndef _ArduBits_RFID_h_
#define _ArduBits_RFID_h_
#include "Arduino.h"
#include "ArduBits_SetSerial.h"
#include <inttypes.h>
#include <stddef.h>


class RFID : public SetSerial
{
public:

  RFID(uint8_t tx_pin,uint8_t rx_pin);
  void begin(unsigned long baud);
  unsigned long  get_RFID_num(void);

 
private:

  unsigned long  RFID_NUM=0;
  void   read_ID(void);
  uint16_t  Code[6]={0x00,0x00,0x00,0x00,0x00,0x00};
  boolean  RX_Flag=0;
 
};
#endif
