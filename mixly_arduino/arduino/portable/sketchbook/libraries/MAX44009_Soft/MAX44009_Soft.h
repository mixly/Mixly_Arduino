#ifndef MAX44009_Soft_h
#define MAX44009_Soft_h
#include <Arduino.h>
#include <SoftwareWire.h>

#define MAX_ADDR 0x4A // or 0x4B if A0 pin connected to Vcc

class MAX44009_Soft {
    public:
		MAX44009_Soft();
		
		int begin(SoftwareWire *theWire);
		        
		float get_lux(void);
		
	private:
		SoftwareWire *_wire;
};



#endif
