
/// 
///  Created for personal use, use it at your own risk and benefit.
///	 https://github.com/GitMoDu/Fast
/// 

#include "Fast.h"

bool FastShifter::Setup(const uint8_t pin, const bool startValue)
{
	return FastOut::Setup(pin, startValue);
}

void FastShifter::PulseHigh()
{
	Set(HIGH);
	Set(LOW);
}

void FastShifter::PulseLow()
{
	Set(LOW);
	Set(HIGH);
}

void FastShifter::PulseHigh(const int16_t pulseIntervalMicros)
{
	Set(HIGH);
	delayMicroseconds(pulseIntervalMicros);
	Set(LOW);
}

void FastShifter::PulseLow(const uint16_t pulseIntervalMicros)
{
	Set(LOW);
	delayMicroseconds(pulseIntervalMicros);
	Set(HIGH);
}

FastOut::FastOut(const uint8_t pin, const bool startValue)
{
	Setup(pin, startValue);
}

bool FastOut::Setup(const uint8_t pin, const bool startValue)
{
	if (Fast::Setup(pin))
	{
		Set(startValue);
		return true;
	}
	else
	{
		return false;
	}

}

bool FastOutCached::Setup(const uint8_t pin, const bool startValue)
{
	return FastOut::Setup(pin, startValue);
}

void FastOut::Toggle()
{
	if (Get())
	{
		*OutPin &= PinAddressMaskOff;
	}
	else
	{
		*OutPin |= PinAddressMaskOn;
	}
}

void FastOut::Set(const bool value)
{
	if (value)
	{
		*OutPin |= PinAddressMaskOn;
	}
	else
	{
		*OutPin &= PinAddressMaskOff;
	}
}

FastOutCached::FastOutCached(const uint8_t pin, const bool startValue)
{
	Setup(pin, startValue);
}

void FastOutCached::Toggle()
{
	if (LastValueCache)
	{
		Set(LOW);
	}
	else
	{
		Set(HIGH);
	}
}

inline void FastOutCached::Set(const bool value)
{
	LastValueCache = value;
	if (LastValueCache)
	{
		*OutPin |= PinAddressMaskOn;
	}
	else
	{
		*OutPin &= PinAddressMaskOff;
	}
}


Fast::Fast(const uint8_t pin)
{
	if (pin != INVALID_PIN)
	{
		Setup(pin);
	}
}

bool Fast::Setup(const uint8_t pin)
{
	PinAddressMaskOn = digitalPinToBitMask(pin);
	PinAddressMaskOff = ~PinAddressMaskOn;
	Mode = portModeRegister(digitalPinToPort(pin));
	OutPin = portOutputRegister(digitalPinToPort(pin));
	InPin = portInputRegister(digitalPinToPort(pin));

	*Mode |= PinAddressMaskOn;//TODO, ensure input compatibility

	return true;
}

inline bool Fast::Get()
{
	return *InPin & PinAddressMaskOn;
}