#ifndef _ArduBits_DHTxx_H_
#define _ArduBits_DHTxx_H_
#include "Arduino.h"
//#include "ArduBits.h"

// 8 MHz(ish) AVR ---------------------------------------------------------
#if (F_CPU >= 7400000UL) && (F_CPU <= 9500000UL)
#define COUNT 3
// 16 MHz(ish) AVR --------------------------------------------------------
#elif (F_CPU >= 15400000UL) && (F_CPU <= 19000000L)
#define COUNT 6
#else
#error "CPU SPEED NOT SUPPORTED"
#endif
#define MAXTIMINGS 85

#define DHT11 11
#define DHT22 22
#define DHT21 21
#define AM2301 21

class DHT
{
 private:
  uint8_t data[6];
  uint8_t _pin, _type, _count;
  boolean read(void);
  unsigned long _lastreadtime;
  boolean firstreading;
 public:
  DHT(uint8_t port);
  DHT(uint8_t port, uint8_t type, uint8_t count=COUNT);
  int readTemperature(bool S=false);
  int convertCtoF(int);
  int readHumidity(void);
};
#endif
