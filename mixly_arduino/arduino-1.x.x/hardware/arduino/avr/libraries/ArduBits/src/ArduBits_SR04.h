#ifndef _ArduBits_SR04_H_
#define _ArduBits_SR04_H_

#if defined(ARDUINO) && ARDUINO >= 100
	#include "Arduino.h"
#else
	#include "WProgram.h"
#endif

#include <inttypes.h>

#define PULSE_TIMEOUT 150000L	// 100ms
#define DEFAULT_DELAY 10
#define DEFAULT_PINGS 4

class SR04 
{
public:
	
  	SR04(int triggerPin , int echoPin);
	  long Distance();
	  long DistanceAvg(int wait=DEFAULT_DELAY, int count=DEFAULT_PINGS);
	  void Ping() ;
	  long getDistance();
	

private:
	  long MicrosecondsToCentimeter(long duration);
  	long _currentDistance;
	  int _echoPin, _triggerPin;
	  long _duration, _distance;
	  bool _autoMode;
};
#endif



