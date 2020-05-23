#ifndef FreqCount_h
#define FreqCount_h

#include <Arduino.h>

class FreqCountClass {
public:
	static void begin(uint16_t msec);
	static uint8_t available(void);
	static uint32_t read(void);
	static void end(void);
};

extern FreqCountClass FreqCount;

#endif
