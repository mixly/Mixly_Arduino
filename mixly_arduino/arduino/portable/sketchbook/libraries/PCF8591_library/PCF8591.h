/** \mainpage PCF8591 library
 * PCF8591 Analog Port Expand
 * https://www.mischianti.org/2019/01/03/pcf8591-i2c-analog-i-o-expander/
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Renzo Mischianti www.mischianti.org All right reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#ifndef PCF8591_h
#define PCF8591_h

#include "Wire.h"

#if ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

// Uncomment to enable printing out nice debug messages.
// #define PCF8591_DEBUG

// Define where debug output will be printed.
#define DEBUG_PRINTER Serial

// Setup debug printing macros.
#ifdef PCF8591_DEBUG
	#define DEBUG_PRINT(...) { DEBUG_PRINTER.print(__VA_ARGS__); }
	#define DEBUG_PRINTLN(...) { DEBUG_PRINTER.println(__VA_ARGS__); }
#else
	#define DEBUG_PRINT(...) {}
	#define DEBUG_PRINTLN(...) {}
#endif

#include <math.h>

#define AIN0 B00000000
#define AIN1 B00000001
#define AIN2 B00000010
#define AIN3 B00000011

#define CHANNEL0 B00000000
#define CHANNEL1 B00000001
#define CHANNEL2 B00000010
#define CHANNEL3 B00000011

#define AUTOINCREMENT_READ B00000100

#define SINGLE_ENDED_INPUT B00000000
#define TREE_DIFFERENTIAL_INPUT B00010000
#define TWO_SINGLE_ONE_DIFFERENTIAL_INPUT B00100000
#define TWO_DIFFERENTIAL_INPUT B00110000

#define ENABLE_OUTPUT B01000000
#define DISABLE_OUTPUT B01000000

#define OUTPUT_MASK B01000000

class PCF8591 {
public:
	struct AnalogInput {
	   uint8_t ain0;
	   uint8_t ain1;
	   uint8_t ain2;
	   uint8_t ain3;
	} analogInput;

	PCF8591(uint8_t address);

#if !defined(__AVR) && !defined(__STM32F1__)
	PCF8591(uint8_t address, uint8_t sda, uint8_t scl);

	#ifdef ESP32
		PCF8591(TwoWire *pWire, uint8_t address);
		PCF8591(TwoWire *pWire, uint8_t address, uint8_t sda, uint8_t scl);
	#endif

#endif

	void begin(void);
	struct AnalogInput analogReadAll(byte readType = SINGLE_ENDED_INPUT);
	uint8_t analogRead(uint8_t channel, byte readType = SINGLE_ENDED_INPUT);
	void analogWrite(uint8_t value);

	void voltageWrite(float value, bool microcontrollerReferenceVoltage = true, float referenceVoltage = 5.0);
	float voltageRead(uint8_t analogPin, bool microcontrollerReferenceVoltage = true, float referenceVoltage = 5.0);

private:
	TwoWire *_wire;

	uint8_t _address;
	uint8_t _sda = SDA;
	uint8_t _scl = SCL;

	byte _outputStatus = DISABLE_OUTPUT;

	long readVcc(void);
};

#endif
