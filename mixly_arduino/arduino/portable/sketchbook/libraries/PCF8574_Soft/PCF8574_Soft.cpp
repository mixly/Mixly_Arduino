/*
 * See header file for details
 *
 *  This program is free software: you can redistribute it and/or modify\n
 *  it under the terms of the GNU General Public License as published by\n
 *  the Free Software Foundation, either version 3 of the License, or\n
 *  (at your option) any later version.\n
 * 
 *  This program is distributed in the hope that it will be useful,\n
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of\n
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n
 *  GNU General Public License for more details.\n
 * 
 *  You should have received a copy of the GNU General Public License\n
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.\n
 */

/* Dependencies */
#include <SoftwareWire.h>
#include "PCF8574_Soft.h"
#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
#include "PCint.h"
#endif

PCF8574_Soft::PCF8574_Soft() :
		_PORT(0), _PIN(0), _DDR(0), _address(0)
#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
		, _oldPIN(0), _isrIgnore(0), _pcintPin(0), _intMode(), _intCallback()
#endif
{
}

void PCF8574_Soft::begin(uint8_t address, SoftwareWire *theWire) {

	/* Store the I2C address and init the Wire library */
	_wire = theWire;
	_address = address;
	_wire->begin();
	readGPIO();
}

void PCF8574_Soft::pinMode(uint8_t pin, uint8_t mode) {

	/* Switch according mode */
	switch (mode) {
	case INPUT:
		_DDR &= ~(1 << pin);
		_PORT &= ~(1 << pin);
		break;

	case INPUT_PULLUP:
		_DDR &= ~(1 << pin);
		_PORT |= (1 << pin);
		break;

	case OUTPUT:
		_DDR |= (1 << pin);
		_PORT &= ~(1 << pin);
		break;

	default:
		break;
	}

	/* Update GPIO values */
	updateGPIO();
}

void PCF8574_Soft::digitalWrite(uint8_t pin, uint8_t value) {

	/* Set PORT bit value */
	if (value)
		_PORT |= (1 << pin);
	else
		_PORT &= ~(1 << pin);

	/* Update GPIO values */
	updateGPIO();
}

uint8_t PCF8574_Soft::digitalRead(uint8_t pin) {

	/* Read GPIO */
	readGPIO();

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
	/* Check for interrupt (manual detection) */
	//checkForInterrupt();
#endif

	/* Read and return the pin state */
	return (_PIN & (1 << pin)) ? HIGH : LOW;
}

void PCF8574_Soft::write(uint8_t value) {

	/* Store pins values and apply */
	_PORT = value;

	/* Update GPIO values */
	updateGPIO();
}

uint8_t PCF8574_Soft::read() {

	/* Read GPIO */
	readGPIO();

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
	/* Check for interrupt (manual detection) */
	//checkForInterrupt();
#endif

	/* Return current pins values */
	return _PIN;
}

void PCF8574_Soft::pullUp(uint8_t pin) {

	/* Same as pinMode(INPUT_PULLUP) */
	pinMode(pin, INPUT_PULLUP); // /!\ pinMode form THE LIBRARY
}

void PCF8574_Soft::pullDown(uint8_t pin) {

	/* Same as pinMode(INPUT) */
	pinMode(pin, INPUT); // /!\ pinMode form THE LIBRARY
}

void PCF8574_Soft::clear() {

	/* User friendly wrapper for write() */
	write(0x00);
}

void PCF8574_Soft::set() {

	/* User friendly wrapper for write() */
	write(0xFF);
}

void PCF8574_Soft::toggle(uint8_t pin) {

	/* Toggle pin state */
	_PORT ^= (1 << pin);

	/* Update GPIO values */
	updateGPIO();
}

void PCF8574_Soft::blink(uint8_t pin, uint16_t count, uint32_t duration) {

	/* Compute steps duration */
	duration /= count * 2;

	/* Loop n times */
	while (count--) {

		/* Toggle pin 2 times */
		toggle(pin);
		delay(duration);
		toggle(pin);
		delay(duration);
	}
}

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
void PCF8574_Soft::enableInterrupt(uint8_t pin, void (*selfCheckFunction)(void)) {

	/* Store interrupt pin number */
	_pcintPin = pin;

	/* Setup interrupt pin */
#if ARDUINO >= 100
	::pinMode(pin, INPUT_PULLUP); // /!\ pinMode form THE ARDUINO CORE
#else
	::pinMode(pin, INPUT); // /!\ pinMode form THE ARDUINO CORE
	::digitalWrite(pin, HIGH); // /!\ digitalWrite form THE ARDUINO CORE
#endif

	/* Attach interrupt handler */
	PCattachInterrupt(pin, selfCheckFunction, FALLING);
}

void PCF8574_Soft::disableInterrupt() {

	/* Detach interrupt handler */
	PCdetachInterrupt(_pcintPin);
}

void PCF8574_Soft::checkForInterrupt() {

	/* Avoid nested interrupt triggered by I2C read/write */
	if(_isrIgnore)
		return;
	else
		_isrIgnore = 1;
		
	/* Re-enable interrupts to allow Wire library to work */
	sei();

	/* Read current pins values */
	readGPIO();

	/* Check all pins */
	for (uint8_t i = 0; i < 8; ++i) {

		/* Check for interrupt handler */
		if (!_intCallback[i])
			continue;

		/* Check for interrupt event */
		switch (_intMode[i]) {
		case CHANGE:
			if ((1 << i) & (_PIN ^ _oldPIN))
				_intCallback[i]();
			break;

		case LOW:
			if (!(_PIN & (1 << i)))
				_intCallback[i]();
			break;

		case FALLING:
			if ((_oldPIN & (1 << i)) && !(_PIN & (1 << i)))
				_intCallback[i]();
			break;

		case RISING:
			if (!(_oldPIN & (1 << i)) && (_PIN & (1 << i)))
				_intCallback[i]();
			break;
		}
	}
	
	/* Turn off ISR ignore flag */
	_isrIgnore = 0;
}

void PCF8574_Soft::attachInterrupt(uint8_t pin, void (*userFunc)(void),
		uint8_t mode) {

	/* Store interrupt mode and callback */
	_intMode[pin] = mode;
	_intCallback[pin] = userFunc;
}

void PCF8574_Soft::detachInterrupt(uint8_t pin) {

	/* Void interrupt handler */
	_intCallback[pin] = 0;
}
#endif

void PCF8574_Soft::readGPIO() {

#ifdef PCF8574_Soft_INTERRUPT_SUPPORT
	/* Store old _PIN value */
	_oldPIN = _PIN;
#endif

	/* Start request, wait for data and receive GPIO values as byte */
	_wire->requestFrom(_address, (uint8_t) 0x01);
	while (_wire->available() < 1)
		;
	_PIN = _wire->read();
}

void PCF8574_Soft::updateGPIO() {

	/* Read current GPIO states */
	//readGPIO(); // Experimental

	/* Compute new GPIO states */
	//uint8_t value = ((_PIN & ~_DDR) & ~(~_DDR & _PORT)) | _PORT; // Experimental
	uint8_t value = (_PIN & ~_DDR) | _PORT;

	/* Start communication and send GPIO values as byte */
	_wire->beginTransmission(_address);
	_wire->write(value);
	_wire->endTransmission();
}
