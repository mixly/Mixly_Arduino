#ifndef _ArduBits_SetSerial_h_
#define _ArduBits_SetSerial_h_

#include "Arduino.h"
#include <SoftwareSerial.h>

class SetSerial : public SoftwareSerial
{
private:
  // per object data
  uint8_t _TX_pin;
  uint8_t _RX_pin;
 
  // Expressed as 4-cycle delays (must never be 0!)
  uint16_t _rx_delay_centering;
  uint16_t _rx_delay_intrabit;
  uint16_t _rx_delay_stopbit;
  uint16_t _tx_delay;

  uint16_t _buffer_overflow:1;
  uint16_t _inverse_logic:1;

 

public:
  // public methods
  SetSerial(uint8_t _TX_pin ,uint8_t _RX_pin);
  ~SetSerial();
};

// Arduino 0012 workaround

#endif
