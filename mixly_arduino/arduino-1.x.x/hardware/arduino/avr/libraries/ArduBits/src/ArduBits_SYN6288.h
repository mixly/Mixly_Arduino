#ifndef _ArduBits_SYN6288_h_
#define ArduBits_SYN6288_h_
#include "Arduino.h"
#include "ArduBits_SetSerial.h"
#include <inttypes.h>
#include <stddef.h>
#define HEADLEN      5


class SYN6288 : public SetSerial
{
public:

	SYN6288(uint8_t tx_pin,uint8_t rx_pin);
  void play(uint8_t *text,uint8_t TEXTLEN,uint8_t music);
  void Slaveboudset(uint16_t boudr);

private:
    uint8_t music;
    uint8_t TEXTLEN;
    uint8_t pi;
	uint8_t _SYN6288;
//	uint8_t _SYN6288_pin;
};
#endif


