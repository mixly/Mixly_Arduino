/*
DS3231.cpp: DS3231 Real-Time Clock library
original code by
Eric Ayars
4/1/11

updated to Arduino 1.0 
John Hubert
Feb 7, 2012

Released into the public domain.
*/

#include "DS3231.h"

#define CLOCK_ADDRESS 0x68

// Constructor
DS3231::DS3231() {
	// nothing to do for this constructor.
}

/***************************************** 
	Public Functions
 *****************************************/

void DS3231::getTime(byte& year, byte& month, byte& date, byte& DoW, byte& hour, byte& minute, byte& second) {
	byte tempBuffer;
	bool PM;
	bool h12;

	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x00));
	Wire.endTransmission();
	
	Wire.requestFrom(CLOCK_ADDRESS, 7);

	second = bcdToDec(Wire.read());
	minute = bcdToDec(Wire.read());
	tempBuffer = Wire.read();
	h12 = tempBuffer & 0b01000000;
	if (h12) {
		PM = tempBuffer & 0b00100000;
		hour = bcdToDec(tempBuffer & 0b00011111);
	} else {
		hour = bcdToDec(tempBuffer & 0b00111111);
	}
	DoW = bcdToDec(Wire.read());
	date = bcdToDec(Wire.read());
	month = bcdToDec(Wire.read() & 0b01111111);
	year = bcdToDec(Wire.read());
}

byte DS3231::getSecond() {
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x00));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return bcdToDec(Wire.read());
}

byte DS3231::getMinute() {
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(0x01);
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return bcdToDec(Wire.read());
}

byte DS3231::getHour(bool& h12, bool& PM) {
	byte temp_buffer;
	byte hour;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(0x02);
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	temp_buffer = Wire.read();
	h12 = temp_buffer & 0b01000000;
	if (h12) {
		PM = temp_buffer & 0b00100000;
		hour = bcdToDec(temp_buffer & 0b00011111);
	} else {
		hour = bcdToDec(temp_buffer & 0b00111111);
	}
	return hour;
}

byte DS3231::getDoW() {
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x03));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return bcdToDec(Wire.read());
}

byte DS3231::getDate() {
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x04));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return bcdToDec(Wire.read());
}

byte DS3231::getMonth(bool& Century) {
	byte temp_buffer;
	byte hour;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x05));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	temp_buffer = Wire.read();
	Century = temp_buffer & 0b10000000;
	return (bcdToDec(temp_buffer & 0b01111111)) ;
}

byte DS3231::getYear() {
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x06));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return bcdToDec(Wire.read());
}

void DS3231::setSecond(byte Second) {
	// Sets the seconds 
	// This function also resets the Oscillator Stop Flag, which is set
	// whenever power is interrupted.
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x00));
	Wire.write(decToBcd(Second));	
	Wire.endTransmission();
	// Clear OSF flag
	byte temp_buffer = readControlByte(1);
	writeControlByte((temp_buffer & 0b01111111), 1);
}

void DS3231::setMinute(byte Minute) {
	// Sets the minutes 
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x01));
	Wire.write(decToBcd(Minute));	
	Wire.endTransmission();
}

void DS3231::setHour(byte Hour) {
	// Sets the hour, without changing 12/24h mode.
	// The hour must be in 24h format.

	bool h12;

	// Start by figuring out what the 12/24 mode is
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x02));
	Wire.endTransmission();
	Wire.requestFrom(CLOCK_ADDRESS, 1);
	h12 = (Wire.read() & 0b01000000);
	// if h12 is true, it's 12h mode; false is 24h.

	if (h12) {
		// 12 hour
		if (Hour > 11) {
			Hour = decToBcd(Hour-12) | 0b01100000;
		} else {
			//Hour = decToBcd(Hour) & 0b11011111;
			Hour = decToBcd(Hour) | 0b01000000;
		}
	} else {
		// 24 hour
		Hour = decToBcd(Hour) & 0b10111111;
	}

	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x02));
	Wire.write(Hour);
	Wire.endTransmission();
}

void DS3231::setDoW(byte DoW) {
	// Sets the Day of Week
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x03));
	Wire.write(decToBcd(DoW));	
	Wire.endTransmission();
}

void DS3231::setDate(byte Date) {
	// Sets the Date
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x04));
	Wire.write(decToBcd(Date));	
	Wire.endTransmission();
}

void DS3231::setMonth(byte Month) {
	// Sets the month
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x05));
	Wire.write(decToBcd(Month));	
	Wire.endTransmission();
}

void DS3231::setYear(byte Year) {
	// Sets the year
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x06));
	Wire.write(decToBcd(Year));	
	Wire.endTransmission();
}

void DS3231::setClockMode(bool h12) {
	// sets the mode to 12-hour (true) or 24-hour (false).
	// One thing that bothers me about how I've written this is that
	// if the read and right happen at the right hourly millisecnd,
	// the clock will be set back an hour. Not sure how to do it better, 
	// though, and as long as one doesn't set the mode frequently it's
	// a very minimal risk. 
	// It's zero risk if you call this BEFORE setting the hour, since
	// the setHour() function doesn't change this mode.
	
	byte temp_buffer;

	// Start by reading byte 0x02.
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x02));
	Wire.endTransmission();
	Wire.requestFrom(CLOCK_ADDRESS, 1);
	temp_buffer = Wire.read();

	// Set the flag to the requested value:
	if (h12) {
		temp_buffer = temp_buffer | 0b01000000;
	} else {
		temp_buffer = temp_buffer & 0b10111111;
	}

	// Write the byte
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x02));
	Wire.write(temp_buffer);
	Wire.endTransmission();
}

float DS3231::getTemperature() {
	// Checks the internal thermometer on the DS3231 and returns the 
	// temperature as a floating-point value.
	byte temp;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x11));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 2);
	temp = Wire.read();	// Here's the MSB
	return float(temp) + 0.25*(Wire.read()>>6);
}

void DS3231::getA1Time(byte& A1Day, byte& A1Hour, byte& A1Minute, byte& A1Second, byte& AlarmBits, bool& A1Dy, bool& A1h12, bool& A1PM) {
	byte temp_buffer;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x07));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 4);

	temp_buffer	= Wire.read();	// Get A1M1 and A1 Seconds
	A1Second	= bcdToDec(temp_buffer & 0b01111111);
	// put A1M1 bit in position 0 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>7;

	temp_buffer		= Wire.read();	// Get A1M2 and A1 minutes
	A1Minute	= bcdToDec(temp_buffer & 0b01111111);
	// put A1M2 bit in position 1 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>6;

	temp_buffer	= Wire.read();	// Get A1M3 and A1 Hour
	// put A1M3 bit in position 2 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>5;
	// determine A1 12/24 mode
	A1h12		= temp_buffer & 0b01000000;
	if (A1h12) {
		A1PM	= temp_buffer & 0b00100000;			// determine am/pm
		A1Hour	= bcdToDec(temp_buffer & 0b00011111);	// 12-hour
	} else {
		A1Hour	= bcdToDec(temp_buffer & 0b00111111);	// 24-hour
	}

	temp_buffer	= Wire.read();	// Get A1M4 and A1 Day/Date
	// put A1M3 bit in position 3 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>4;
	// determine A1 day or date flag
	A1Dy		= (temp_buffer & 0b01000000)>>6;
	if (A1Dy) {
		// alarm is by day of week, not date.
		A1Day	= bcdToDec(temp_buffer & 0b00001111);
	} else {
		// alarm is by date, not day of week.
		A1Day	= bcdToDec(temp_buffer & 0b00111111);
	}
}

void DS3231::getA2Time(byte& A2Day, byte& A2Hour, byte& A2Minute, byte& AlarmBits, bool& A2Dy, bool& A2h12, bool& A2PM) {
	byte temp_buffer;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x0b));
	Wire.endTransmission();

	Wire.requestFrom(CLOCK_ADDRESS, 3); 
	temp_buffer	= Wire.read();	// Get A2M2 and A2 Minutes
	A2Minute	= bcdToDec(temp_buffer & 0b01111111);
	// put A2M2 bit in position 4 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>3;

	temp_buffer	= Wire.read();	// Get A2M3 and A2 Hour
	// put A2M3 bit in position 5 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>2;
	// determine A2 12/24 mode
	A2h12		= temp_buffer & 0b01000000;
	if (A2h12) {
		A2PM	= temp_buffer & 0b00100000;			// determine am/pm
		A2Hour	= bcdToDec(temp_buffer & 0b00011111);	// 12-hour
	} else {
		A2Hour	= bcdToDec(temp_buffer & 0b00111111);	// 24-hour
	}

	temp_buffer	= Wire.read();	// Get A2M4 and A1 Day/Date
	// put A2M4 bit in position 6 of DS3231_AlarmBits.
	AlarmBits	= AlarmBits | (temp_buffer & 0b10000000)>>1;
	// determine A2 day or date flag
	A2Dy		= (temp_buffer & 0b01000000)>>6;
	if (A2Dy) {
		// alarm is by day of week, not date.
		A2Day	= bcdToDec(temp_buffer & 0b00001111);
	} else {
		// alarm is by date, not day of week.
		A2Day	= bcdToDec(temp_buffer & 0b00111111);
	}
}

void DS3231::setA1Time(byte A1Day, byte A1Hour, byte A1Minute, byte A1Second, byte AlarmBits, bool A1Dy, bool A1h12, bool A1PM) {
	//	Sets the alarm-1 date and time on the DS3231, using A1* information
	byte temp_buffer;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x07));	// A1 starts at 07h
	// Send A1 second and A1M1
	Wire.write(decToBcd(A1Second) | ((AlarmBits & 0b00000001) << 7));
	// Send A1 Minute and A1M2
	Wire.write(decToBcd(A1Minute) | ((AlarmBits & 0b00000010) << 6));
	// Figure out A1 hour 
	if (A1h12) {
		// Start by converting existing time to h12 if it was given in 24h.
		if (A1Hour > 12) {
			// well, then, this obviously isn't a h12 time, is it?
			A1Hour = A1Hour - 12;
			A1PM = true;
		}
		if (A1PM) {
			// Afternoon
			// Convert the hour to BCD and add appropriate flags.
			temp_buffer = decToBcd(A1Hour) | 0b01100000;
		} else {
			// Morning
			// Convert the hour to BCD and add appropriate flags.
			temp_buffer = decToBcd(A1Hour) | 0b01000000;
		}
	} else {
		// Now for 24h
		temp_buffer = decToBcd(A1Hour); 
	}
	temp_buffer = temp_buffer | ((AlarmBits & 0b00000100)<<5);
	// A1 hour is figured out, send it
	Wire.write(temp_buffer); 
	// Figure out A1 day/date and A1M4
	temp_buffer = ((AlarmBits & 0b00001000)<<4) | decToBcd(A1Day);
	if (A1Dy) {
		// Set A1 Day/Date flag (Otherwise it's zero)
		temp_buffer = temp_buffer | 0b01000000;
	}
	Wire.write(temp_buffer);
	// All done!
	Wire.endTransmission();
}

void DS3231::setA2Time(byte A2Day, byte A2Hour, byte A2Minute, byte AlarmBits, bool A2Dy, bool A2h12, bool A2PM) {
	//	Sets the alarm-2 date and time on the DS3231, using A2* information
	byte temp_buffer;
	Wire.beginTransmission(CLOCK_ADDRESS);
	Wire.write(uint8_t(0x0b));	// A1 starts at 0bh
	// Send A2 Minute and A2M2
	Wire.write(decToBcd(A2Minute) | ((AlarmBits & 0b00010000) << 3));
	// Figure out A2 hour 
	if (A2h12) {
		// Start by converting existing time to h12 if it was given in 24h.
		if (A2Hour > 12) {
			// well, then, this obviously isn't a h12 time, is it?
			A2Hour = A2Hour - 12;
			A2PM = true;
		}
		if (A2PM) {
			// Afternoon
			// Convert the hour to BCD and add appropriate flags.
			temp_buffer = decToBcd(A2Hour) | 0b01100000;
		} else {
			// Morning
			// Convert the hour to BCD and add appropriate flags.
			temp_buffer = decToBcd(A2Hour) | 0b01000000;
		}
	} else {
		// Now for 24h
		temp_buffer = decToBcd(A2Hour); 
	}
	// add in A2M3 bit
	temp_buffer = temp_buffer | ((AlarmBits & 0b00100000)<<2);
	// A2 hour is figured out, send it
	Wire.write(temp_buffer); 
	// Figure out A2 day/date and A2M4
	temp_buffer = ((AlarmBits & 0b01000000)<<1) | decToBcd(A2Day);
	if (A2Dy) {
		// Set A2 Day/Date flag (Otherwise it's zero)
		temp_buffer = temp_buffer | 0b01000000;
	}
	Wire.write(temp_buffer);
	// All done!
	Wire.endTransmission();
}

void DS3231::turnOnAlarm(byte Alarm) {
	// turns on alarm number "Alarm". Defaults to 2 if Alarm is not 1.
	byte temp_buffer = readControlByte(0);
	// modify control byte
	if (Alarm == 1) {
		temp_buffer = temp_buffer | 0b00000101;
	} else {
		temp_buffer = temp_buffer | 0b00000110;
	}
	writeControlByte(temp_buffer, 0);
}

void DS3231::turnOffAlarm(byte Alarm) {
	// turns off alarm number "Alarm". Defaults to 2 if Alarm is not 1.
	// Leaves interrupt pin alone.
	byte temp_buffer = readControlByte(0);
	// modify control byte
	if (Alarm == 1) {
		temp_buffer = temp_buffer & 0b11111110;
	} else {
		temp_buffer = temp_buffer & 0b11111101;
	}
	writeControlByte(temp_buffer, 0);
}

bool DS3231::checkAlarmEnabled(byte Alarm) {
	// Checks whether the given alarm is enabled.
	byte result = 0x0;
	byte temp_buffer = readControlByte(0);
	if (Alarm == 1) {
		result = temp_buffer & 0b00000001;
	} else {
		result = temp_buffer & 0b00000010;
	}
	return result;
}

bool DS3231::checkIfAlarm(byte Alarm) {
	// Checks whether alarm 1 or alarm 2 flag is on, returns T/F accordingly.
	// Turns flag off, also.
	// defaults to checking alarm 2, unless Alarm == 1.
	byte result;
	byte temp_buffer = readControlByte(1);
	if (Alarm == 1) {
		// Did alarm 1 go off?
		result = temp_buffer & 0b00000001;
		// clear flag
		temp_buffer = temp_buffer & 0b11111110;
	} else {
		// Did alarm 2 go off?
		result = temp_buffer & 0b00000010;
		// clear flag
		temp_buffer = temp_buffer & 0b11111101;
	}
	writeControlByte(temp_buffer, 1);
	return result;
}

void DS3231::enableOscillator(bool TF, bool battery, byte frequency) {
	// turns oscillator on or off. True is on, false is off.
	// if battery is true, turns on even for battery-only operation,
	// otherwise turns off if Vcc is off.
	// frequency must be 0, 1, 2, or 3.
	// 0 = 1 Hz
	// 1 = 1.024 kHz
	// 2 = 4.096 kHz
	// 3 = 8.192 kHz (Default if frequency byte is out of range)
	if (frequency > 3) frequency = 3;
	// read control byte in, but zero out current state of RS2 and RS1.
	byte temp_buffer = readControlByte(0) & 0b11100111;
	if (battery) {
		// turn on BBSQW flag
		temp_buffer = temp_buffer | 0b01000000;
	} else {
		// turn off BBSQW flag
		temp_buffer = temp_buffer & 0b10111111;
	}
	if (TF) {
		// set ~EOSC to 0 and INTCN to zero.
		temp_buffer = temp_buffer & 0b01111011;
	} else {
		// set ~EOSC to 1, leave INTCN as is.
		temp_buffer = temp_buffer | 0b10000100;
	}
	// shift frequency into bits 3 and 4 and set.
	frequency = frequency << 3;
	temp_buffer = temp_buffer | frequency;
	// And write the control bits
	writeControlByte(temp_buffer, 0);
}

void DS3231::enable32kHz(bool TF) {
	// turn 32kHz pin on or off
	byte temp_buffer = readControlByte(1);
	if (TF) {
		// turn on 32kHz pin
		temp_buffer = temp_buffer | 0b00001000;
	} else {
		// turn off 32kHz pin
		temp_buffer = temp_buffer & 0b11110111;
	}
	writeControlByte(temp_buffer, 1);
}

bool DS3231::oscillatorCheck() {
	// Returns false if the oscillator has been off for some reason.
	// If this is the case, the time is probably not correct.
	byte temp_buffer = readControlByte(1);
	bool result = true;
	if (temp_buffer & 0b10000000) {
		// Oscillator Stop Flag (OSF) is set, so return false.
		result = false;
	}
	return result;
}

/***************************************** 
	Private Functions
 *****************************************/

byte DS3231::decToBcd(byte val) {
// Convert normal decimal numbers to binary coded decimal
	return ( (val/10*16) + (val%10) );
}

byte DS3231::bcdToDec(byte val) {
// Convert binary coded decimal to normal decimal numbers
	return ( (val/16*10) + (val%16) );
}

byte DS3231::readControlByte(bool which) {
	// Read selected control byte
	// first byte (0) is 0x0e, second (1) is 0x0f
	Wire.beginTransmission(CLOCK_ADDRESS);
	if (which) {
		// second control byte
		Wire.write(uint8_t(0x0f));
	} else {
		// first control byte
		Wire.write(uint8_t(0x0e));
	}
	Wire.endTransmission();
	Wire.requestFrom(CLOCK_ADDRESS, 1);
	return Wire.read();	
}

void DS3231::writeControlByte(byte control, bool which) {
	// Write the selected control byte.
	// which=false -> 0x0e, true->0x0f.
	Wire.beginTransmission(CLOCK_ADDRESS);
	if (which) {
		Wire.write(uint8_t(0x0f));
	} else {
		Wire.write(uint8_t(0x0e));
	}
	Wire.write(control);
	Wire.endTransmission();
}

