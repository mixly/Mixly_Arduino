#include "ArduBits_TM1650.h"
#include <Arduino.h>


TM1650::TM1650(uint8_t sda_pin,uint8_t scl_pin):SoftI2C(scl_pin,sda_pin)
{
	iNumDigits = 4;
}

/** Initialization
 * initializes the driver. Turns display on, but clears all digits.
 */
void TM1650::init() {
	iPosition = NULL;
	for (int i=0; i<iNumDigits; i++) {
		iBuffer[i] = 0;
		iCtrl[i] = 0;
	}
    SoftI2C::beginTransmission(TM1650_DISPLAY_BASE);
    iActive = (SoftI2C::endTransmission() == 0);
	clear();
	displayOn();
}

/** Set brightness of all digits equally
 * aValue - brightness value with 1 being the lowest, and 7 being the brightest
 */
void TM1650::setBrightness(unsigned int aValue) {
	if (!iActive) return;

	iBrightness = (aValue > TM1650_MAX_BRIGHT) ? TM1650_MAX_BRIGHT : aValue;

	for (int i=0; i<iNumDigits; i++) {
		SoftI2C::beginTransmission(TM1650_DCTRL_BASE+i);
		iCtrl[i] = (iCtrl[i] & TM1650_MSK_BRIGHT) | ( iBrightness << TM1650_BRIGHT_SHIFT );
		SoftI2C::write((byte) iCtrl[i]);
		SoftI2C::endTransmission();
	}
}

/** Set brightness of all digits equally
 * aValue - brightness value with 1 being the lowest, and 7 being the brightest
 */
void TM1650::setBrightnessGradually(unsigned int aValue) {
	if (!iActive || aValue == iBrightness) return;

	if (aValue > TM1650_MAX_BRIGHT) aValue = TM1650_MAX_BRIGHT;
	int step = (aValue < iBrightness) ? -1 : 1;
	unsigned int i = iBrightness;
	do {
		setBrightness(i);
		delay(50);
		i += step;
	} while (i!=aValue);
}

/** Turns display on or off according to aState
 */
void TM1650::displayState (bool aState)
{
  if (aState) displayOn ();
  else displayOff();
}

/** Turns the display on
 */
void TM1650::displayOn ()
// turn all digits on
{
  if (!iActive) return;
  for (int i=0; i<iNumDigits; i++) {
    SoftI2C::beginTransmission(TM1650_DCTRL_BASE+i);
	iCtrl[i] = (iCtrl[i] & TM1650_MSK_ONOFF) | TM1650_BIT_DOT;
    SoftI2C::write((byte) iCtrl[i]);
    SoftI2C::endTransmission();
  }
}
/** Turns the display off
 */
void TM1650::displayOff ()
// turn all digits off
{
  if (!iActive) return;
  for (int i=0; i<iNumDigits; i++) {
    SoftI2C::beginTransmission(TM1650_DCTRL_BASE+i);
	iCtrl[i] = (iCtrl[i] & TM1650_MSK_ONOFF);
    SoftI2C::write((byte) iCtrl[i]);
    SoftI2C::endTransmission();
  }
}

/** Directly write to the CONTROL register of the digital position
 * aPos = position to set the control register for
 * aValue = value to write to the position
 *
 * Internal control buffer is updated as well
 */
void TM1650::controlPosition(unsigned int aPos, byte aValue) {
	if (!iActive) return;
	if (aPos < iNumDigits) {
	    SoftI2C::beginTransmission(TM1650_DCTRL_BASE + (int) aPos);
	    iCtrl[aPos] = aValue;
		SoftI2C::write(aValue);
	    SoftI2C::endTransmission();
	}
}

/** Directly write to the digit register of the digital position
 * aPos = position to set the digit register for
 * aValue = value to write to the position
 *
 * Internal position buffer is updated as well
 */
void TM1650::setPosition(unsigned int aPos, byte aValue) {
	if (!iActive) return;
	if (aPos < iNumDigits) {
	    SoftI2C::beginTransmission(TM1650_DISPLAY_BASE + (int) aPos);
	    iBuffer[aPos] = aValue;
	    SoftI2C::write(aValue);
	    SoftI2C::endTransmission();
	}
}

/** Directly set/clear a 'dot' next to a specific position
 * aPos = position to set/clear the dot for
 * aState = display the dot if true, clear if false
 *
 * Internal buffer is updated as well
 */
void	TM1650::setDot(unsigned int aPos, bool aState) {
	iBuffer[aPos] = iBuffer[aPos] & 0x7F |(aState ? 0b10000000 : 0);
	setPosition(aPos, iBuffer[aPos]);
}

/** Clear all digits. Keep the display on.
 */
void TM1650::clear()
// clears all digits
{
  if (!iActive) return;
  for (int i=0; i<iNumDigits; i++) {
    SoftI2C::beginTransmission(TM1650_DISPLAY_BASE+i);
 	iBuffer[i] = 0;
	SoftI2C::write((byte) 0);
    SoftI2C::endTransmission();
  }
}

/** Display string on the display 
 * aString = character array to be displayed
 *
 * Internal buffer is updated as well
 * Only first N positions of the string are displayed if
 *  the string is longer than the number of digits
 */
void TM1650::displayString(char *aString)
{
	if (!iActive) return;
	unsigned int slen =strlen(aString);
	String bString = aString;
	for (int i = 0; i < 4 - slen; i++) 
		bString = " " + bString;

	for (int i = 0; i<iNumDigits; i++) {
		byte a = ((byte)bString.charAt(i)) & 0b01111111;
		byte dot = ((byte)bString.charAt(i)) & 0b10000000;
#ifndef TM1650_USE_PROGMEM	  
		iBuffer[i] = TM1650_CDigits[a];
#else
		iBuffer[i] = pgm_read_byte_near(TM1650_CDigits + a);
#endif
		if (a) {
			SoftI2C::beginTransmission(TM1650_DISPLAY_BASE + i);
			SoftI2C::write(iBuffer[i] | dot);
			SoftI2C::endTransmission();
		}
		else
			break;

	}

}
void TM1650::displayString(String aString)
{
	if (!iActive) return;
	unsigned int slen = aString.length();
	for (int i = 0; i < 4 - slen; i++)
		aString = " " + aString;
	for (int i = 0; i<iNumDigits; i++) {
		byte a = ((byte)aString.charAt(i)) & 0b01111111;
		byte dot = ((byte)aString.charAt(i)) & 0b10000000;
#ifndef TM1650_USE_PROGMEM	  
		iBuffer[i] = TM1650_CDigits[a];
#else
		iBuffer[i] = pgm_read_byte_near(TM1650_CDigits + a);
#endif
		if (a) {
			SoftI2C::beginTransmission(TM1650_DISPLAY_BASE + i);
			SoftI2C::write(iBuffer[i] | dot);
			SoftI2C::endTransmission();
		}
		else
			break;

	}
}
void TM1650::displayString(float value)
{
	if (!iActive) return;
	String aString = String("") + value;
	aString = aString + "_";
	aString.replace("000_", "");
	aString.replace("00_", "");
	aString.replace("0_", "");
	unsigned int slen = aString.length();

	for (int i = 0; i < 4 - slen; i++)
		aString = " " + aString;
	for (int i = 0; i<iNumDigits; i++) {
		byte a = ((byte)aString.charAt(i)) & 0b01111111;
		byte dot = ((byte)aString.charAt(i)) & 0b10000000;
#ifndef TM1650_USE_PROGMEM	  
		iBuffer[i] = TM1650_CDigits[a];
#else
		iBuffer[i] = pgm_read_byte_near(TM1650_CDigits + a);
#endif
		if (a) {
			SoftI2C::beginTransmission(TM1650_DISPLAY_BASE + i);
			SoftI2C::write(iBuffer[i] | dot);
			SoftI2C::endTransmission();
		}
		else
			break;

	}
}
void TM1650::displayString(int value)
{
	if (!iActive) return;
	String aString = String("") + value;
	unsigned int slen = aString.length();

	for (int i = 0; i < 4 - slen; i++)
		aString = " " + aString;
	for (int i = 0; i<iNumDigits; i++) {
		byte a = ((byte)aString.charAt(i)) & 0b01111111;
		byte dot = ((byte)aString.charAt(i)) & 0b10000000;
#ifndef TM1650_USE_PROGMEM	  
		iBuffer[i] = TM1650_CDigits[a];
#else
		iBuffer[i] = pgm_read_byte_near(TM1650_CDigits + a);
#endif
		if (a) {
			SoftI2C::beginTransmission(TM1650_DISPLAY_BASE + i);
			SoftI2C::write(iBuffer[i] | dot);
			SoftI2C::endTransmission();
		}
		else
			break;

	}
}
void TM1650::displayString(long value)
{
	displayString((int)value);
}

/** Display string on the display in a running fashion
 * aString = character array to be displayed
 *
 * Starts with first N positions of the string.
 * Subsequent characters are displayed with 1 char shift each time displayRunningShift() is called
 *
 * returns: number of iterations remaining to display the whole string
 */
int TM1650::displayRunning(char *aString) {

	strncpy(iString, aString, TM1650_MAX_STRING+1);
	iPosition = iString;
	iString[TM1650_MAX_STRING] = '\0'; //just in case.
    	displayString(iPosition);

	int l = strlen(iPosition);
	if (l <= iNumDigits) return 0;
	return (l - iNumDigits);
}

/** Display next segment (shifting to the left) of the string set by displayRunning()
 * Starts with first N positions of the string.
 * Subsequent characters are displayed with 1 char shift each time displayRunningShift is called
 *
 * returns: number of iterations remaining to display the whole string
 */
int TM1650::displayRunningShift() {
    	if (strlen(iPosition) <= iNumDigits) return 0;
    	displayString(++iPosition);
	return (strlen(iPosition) - iNumDigits);
}



