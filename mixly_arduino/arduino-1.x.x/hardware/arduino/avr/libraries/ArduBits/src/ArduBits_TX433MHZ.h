#ifndef _ArduBits_TX433MHZ_h_
#define _ArduBits_TX433MHZ_h_
#include "Arduino.h"
#include "ArduBits.h"



class TX433MHZ
{
public:

	TX433MHZ(uint8_t porta , uint8_t portb);
	void txa(void);        //A端口
	void txb(void);        //B端口

private:
	uint8_t _tx433mhz_pina;
	uint8_t _tx433mhz_pinb;
	
};
#endif
