
/// 
///  Fast and simple IO library for Arduino compatible boards.
///  Not the fastest, but simplest to use (for me at least).
///  Created for personal use, use it at your own risk and benefit.
///	 https://github.com/GitMoDu/Fast
/// 

#ifndef _FAST_h
#define _FAST_h


#include <Arduino.h>

class Fast
{

protected:
#define INVALID_PIN 254
	uint8_t *Mode;
	volatile uint8_t *OutPin;
	volatile uint8_t *InPin;
	uint8_t PinAddressMaskOn, PinAddressMaskOff;

	bool Get();

public:
	Fast(const uint8_t pin = INVALID_PIN);
	bool virtual Setup(const uint8_t pin);
};

class FastOut : public Fast
{
public:
	FastOut(const uint8_t pin = INVALID_PIN, const bool startValue = false);
	FastOut& operator = (boolean value)
	{
		Set(value);
		return *this;
	}

	bool Setup(const uint8_t pin, const bool startValue);
	void Set(const bool value);
	void Toggle();
};

class FastOutCached : public FastOut
{
private:
	bool LastValueCache = false;

public:
	FastOutCached(const uint8_t pin = INVALID_PIN, const bool startValue = false);
	FastOutCached& operator = (boolean value)
	{
		Set(value);
		return *this;
	}

	bool Setup(const uint8_t pin, const bool startValue = false);
	void Set(const bool value);
	void Toggle();
};

class FastIn : public Fast
{
public:
	FastIn(const uint8_t pin = INVALID_PIN, const bool startValue = false);

	operator bool() {
		return Get();
	}
};

class FastShifter : public FastOut
{
public:
	virtual bool Setup(const uint8_t pin, const bool startValue = false);
	void PulseLow();
	void PulseHigh();
	void PulseLow(const uint16_t pulseIntervalMicros);
	void PulseHigh(const int16_t pulseIntervalMicros);
};

#endif

