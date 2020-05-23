#include "pins_arduino.h"

volatile uint8_t *port_to_pcmask[] = { &PCMSK0, &PCMSK1, &PCMSK2 };

static int PCintMode[24];

typedef void (*voidFuncPtr)(void);

volatile static voidFuncPtr PCintFunc[24] = { NULL };

volatile static uint8_t PCintLast[3];

/*
 * attach an interrupt to a specific pin using pin change interrupts.
 */
void PCattachInterrupt(uint8_t pin, void (*userFunc)(void), int mode) {
	uint8_t bit = digitalPinToBitMask(pin);
	uint8_t port = digitalPinToPort(pin);
	uint8_t slot;
	volatile uint8_t *pcmask;

	// map pin to PCIR register
	if (port == NOT_A_PORT) {
		return;
	} else {
		port -= 2;
		pcmask = port_to_pcmask[port];
	}

// -- Fix by Baziki. In the original sources it was a little bug, which cause analog ports to work incorrectly.
	if (port == 1) {
		slot = port * 8 + (pin - 14);
	} else {
		slot = port * 8 + (pin % 8);
	}
// --Fix end
	PCintMode[slot] = mode;
	PCintFunc[slot] = userFunc;
	// set the mask
	*pcmask |= bit;
	// enable the interrupt
	PCICR |= 0x01 << port;
	
	// Fix init by SkyWodd
	PCintLast[0] = *portInputRegister(2);
	PCintLast[1] = *portInputRegister(3);
	PCintLast[2] = *portInputRegister(4);
}

void PCdetachInterrupt(uint8_t pin) {
	uint8_t bit = digitalPinToBitMask(pin);
	uint8_t port = digitalPinToPort(pin);
	volatile uint8_t *pcmask;

	// map pin to PCIR register
	if (port == NOT_A_PORT) {
		return;
	} else {
		port -= 2;
		pcmask = port_to_pcmask[port];
	}

	// disable the mask.
	*pcmask &= ~bit;
	// if that's the last one, disable the interrupt.
	if (*pcmask == 0) {
		PCICR &= ~(0x01 << port);
	}
}

// common code for isr handler. "port" is the PCINT number.
// there isn't really a good way to back-map ports and masks to pins.
static void PCint(uint8_t port) {
	uint8_t bit;
	uint8_t curr;
	uint8_t mask;
	uint8_t pin;

	// get the pin states for the indicated port.
	curr = *portInputRegister(port + 2);
	mask = curr ^ PCintLast[port];
	PCintLast[port] = curr;
	// mask is pins that have changed. screen out non pcint pins.
	if ((mask &= *port_to_pcmask[port]) == 0) {
		return;
	}
	// mask is pcint pins that have changed.
	for (uint8_t i = 0; i < 8; i++) {
		bit = 0x01 << i;
		if (bit & mask) {
			pin = port * 8 + i;
			// Trigger interrupt if mode is CHANGE, or if mode is RISING and
			// the bit is currently high, or if mode is FALLING and bit is low.
			if ((PCintMode[pin] == CHANGE
					|| ((PCintMode[pin] == RISING) && (curr & bit))
					|| ((PCintMode[pin] == FALLING) && !(curr & bit)))
					&& (PCintFunc[pin] != NULL)) {
				PCintFunc[pin]();
			}
		}
	}
}

SIGNAL(PCINT0_vect) {
	PCint(0);
}
SIGNAL(PCINT1_vect) {
	PCint(1);
}
SIGNAL(PCINT2_vect) {
	PCint(2);
}
