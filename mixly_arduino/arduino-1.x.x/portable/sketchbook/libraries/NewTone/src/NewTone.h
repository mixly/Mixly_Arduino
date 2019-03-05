#ifndef _NEWTONE_h
#define _NEWTONE_h

#include "Arduino.h"
#include "pitches.h"
void NewTone(int tonePin, int frequency, int duration);
void NewNoTone(uint8_t pin);
#endif
