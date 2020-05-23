/**
 * @brief PCF8574_Soft arduino library
 * @author SkyWodd <skywodd@gmail.com>
 * @version 2.0
 * @link http://skyduino.wordpress.com/
 *
 * @section intro_sec Introduction
 * This class is designed to allow user to use PCF8574_Soft gpio expander like any standard arduino pins.\n
 * This class provided standards arduino functions like pinMode, digitalWrite, digitalRead, ...\n
 * This new version is fully optimized and documented.\n
 * \n
 * Please report bug to <skywodd at gmail.com>
 *
 * @section license_sec License
 *  This program is free software: you can redistribute it and/or modify\n
 *  it under the terms of the GNU General Public License as published by\n
 *  the Free Software Foundation, either version 3 of the License, or\n
 *  (at your option) any later version.\n
 * \n
 *  This program is distributed in the hope that it will be useful,\n
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of\n
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n
 *  GNU General Public License for more details.\n
 * \n
 *  You should have received a copy of the GNU General Public License\n
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.\n
 *
 * @section other_sec Others notes and compatibility warning
 * Compatible with arduino 1.0.x and >=0023\n
 * Retro-compatible with the previous library version
 */
#ifndef PCF8574_Soft_H
#define PCF8574_Soft_H

/** Comment this define to disable interrupt support */
#define PCF8574_Soft_INTERRUPT_SUPPORT

/* Retro-compatibility with arduino 0023 and previous version */
#include "Arduino.h"
#include <SoftwareWire.h>
/**
 * @brief PCF8574_Soft Arduino class
 */
class PCF8574_Soft {
public:
	/**
	 * Create a new PCF8574_Soft instance
	 */
	PCF8574_Soft();

	/**
	 * Start the I2C controller and store the PCF8574_Soft chip address
	 */
	void begin(uint8_t address, SoftwareWire *theWire);

	/**
	 * Set the direction of a pin (OUTPUT, INPUT or INPUT_PULLUP)
	 * 
	 * @param pin The pin to set
	 * @param mode The new mode of the pin
	 * @remarks INPUT_PULLUP does physicaly the same thing as INPUT (no software pull-up resistors available) but is REQUIRED if you use external pull-up resistor
	 */
	void pinMode(uint8_t pin, uint8_t mode);

	/**
	 * Set the state of a pin (HIGH or LOW)
	 * 
	 * @param pin The pin to set
	 * @param value The new state of the pin
	 * @remarks Software pull-up resistors are not available on the PCF8574_Soft
	 */
	void digitalWrite(uint8_t pin, uint8_t value);

	/**
	 * Read the state of a pin
	 * 
	 * @param pin The pin to read back
	 * @return
	 */
	uint8_t digitalRead(uint8_t pin);

	/**
	 * Set the state of all pins in one go
	 * 
	 * @param value The new value of all pins (1 bit = 1 pin, '1' = HIGH, '0' = LOW)
	 */
	void write(uint8_t value);

	/**
	 * Read the state of all pins in one go
	 * 
	 * @return The current value of all pins (1 bit = 1 pin, '1' = HIGH, '0' = LOW)
	 */
	uint8_t read();

	/**
	 * Exactly like write(0x00), set all pins to LOW
	 */
	void clear();

	/**
	 * Exactly like write(0xFF), set all pins to HIGH
	 */
	void set();

	/**
	 * Toggle the state of a pin
	 */
	void toggle(uint8_t pin);

	/**
	 * Mark a pin as "pulled up"
	 * 
	 * @warning DO NOTHING - FOR RETRO COMPATIBILITY PURPOSE ONLY
	 * @deprecated
	 * @param pin Pin the mark as "pulled up"
	 */
	void pullUp(uint8_t pin);

	/**
	 * Mark a pin as "pulled down"
	 * 
	 * @warning DO NOTHING - FOR RETRO COMPATIBILITY PURPOSE ONLY
	 * @deprecated
	 * @param pin Pin the mark as "pulled down"
	 */
	void pullDown(uint8_t pin);

	/**
	 * Make a pin blink N times for T duration
	 * 
	 * @warning Blocking function, not recommended for new code
	 * @deprecated
	 * @param pin The pin to blink
	 * @param count The number of ON/OFF couples to execute
	 * @param duration The duration of the whole blink action in milliseconds
	 */
	void blink(uint8_t pin, uint16_t count, uint32_t duration);

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
	/**
	 * Enable interrupts support and setup interrupts handler
	 * 
	 * @remarks Any pin can be used as "INT" pin, internally the library use PCINT to work.
	 * @warning The check wrapping routine must be provided by user and define in the global scope space.
	 * @param pin The pin OF YOUR ARDUINO (not the PCF8574_Soft) to use as "INT" pin for interrupts detection
	 * @param selfCheckFunction The wrapping routine used to process interrupts events.
	 * @remarks For best performances you should avoid this "user friendly" fonction and use the standard attachInterrupt() fonction ;)
	 * @remarks If multiple PCF8574_Soft are wired on the same "INT" pin this function should be called only one time
	 */
	void enableInterrupt(uint8_t pin, void (*selfCheckFunction)(void));

	/**
	 * Disable interrupts support
	 */
	void disableInterrupt();

	/**
	 * Check for interrupt and process routine
	 * 
	 * @remarks Call this routine from your wrapping routine to detect and process interrupts (if any) of this PCF8574_Soft instance.
	 */
	void checkForInterrupt();

	/**
	 * Attach a function to an interrupt event of a pin of the PCF8574_Soft
	 * 
	 * @param pin The pin to attach the interrupt event on
	 * @param userFunc The callback function to call when the interrupt event is triggered
	 * @param mode The interrupt mode to check for, only interrupts events coming from the specified pin and with the specified mode will call the callback function.
	 * @remarks 1 PCF8574_Soft pin = 1 interrupt, multiple interrupts on the same pin is not supported
	 */
	void attachInterrupt(uint8_t pin, void (*userFunc)(void), uint8_t mode);

	/**
	 * Detach any interrupt attached to the specified pin
	 * 
	 * @param pin The pin to detach any interrupt from
	 */
	void detachInterrupt(uint8_t pin);
#endif

protected:
	/** Output pins values */
	volatile uint8_t _PORT;

	/** Current input pins values */
	volatile uint8_t _PIN;

	/** Pins modes values (OUTPUT or INPUT) */
	volatile uint8_t _DDR;

	/** PCF8574_Soft I2C address */
	uint8_t _address;

	SoftwareWire *_wire;

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
	/** Old value of _PIN variable */
	volatile uint8_t _oldPIN;
	
	/** ISR ignore flag */
	volatile uint8_t _isrIgnore;

	/** PCINT pin used for "INT" pin handling */
	uint8_t _pcintPin;

	/** Interrupts modes of pins ( LOW, CHANGE, FALLING, RISING)  */
	uint8_t _intMode[8];

	/** Interrupts callback functions */
	void (*_intCallback[8])(void);
#endif

	/** 
	 * Read GPIO states and store them in _PIN variable
	 *
	 * @remarks Before reading current GPIO states, current _PIN variable value is moved to _oldPIN variable
	 */
	void readGPIO();

	/** 
	 * Write value of _PORT variable to the GPIO
	 * 
	 * @remarks Only pin marked as OUTPUT are set, for INPUT pins their value are unchanged
	 * @warning To work properly (and avoid any states conflicts) readGPIO() MUST be called before call this function !
	 */
	void updateGPIO();
};

#endif
