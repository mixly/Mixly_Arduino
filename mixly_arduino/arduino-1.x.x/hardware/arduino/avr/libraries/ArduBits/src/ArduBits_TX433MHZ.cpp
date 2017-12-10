#include"ArduBits_TX433MHZ.h"
#include "Arduino.h"

TX433MHZ::TX433MHZ(uint8_t porta , uint8_t portb)
{
	_tx433mhz_pina=porta;
	_tx433mhz_pinb=portb;	
	//pinMode(_tx433mhz_pin, OUTPUT);	
}

void TX433MHZ::txa(void)
{
	pinMode(_tx433mhz_pina, OUTPUT);
	digitalWrite(_tx433mhz_pina, HIGH);
	delay(200);
	pinMode(_tx433mhz_pina, INPUT);
	//delay(200);
}

void TX433MHZ::txb(void)
{
	pinMode(_tx433mhz_pinb, OUTPUT);
	digitalWrite(_tx433mhz_pinb, HIGH);
	delay(200);
	pinMode(_tx433mhz_pinb, INPUT);
	//delay(200);
}

