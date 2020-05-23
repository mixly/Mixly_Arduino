#ifndef MAX44009_h
#define MAX44009_h
#include <Arduino.h>
#include <Wire.h>

#define MAX_ADDR 0x4A // or 0x4B if A0 pin connected to Vcc

class MAX44009 {
    public:
		MAX44009();
		
		int begin();
		        
		float get_lux(void);
		
};



#endif
