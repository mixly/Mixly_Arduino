/*****************************************************************
| LEDbar Arduino library - based on the 74HC164 shift register   |
| Developed and maintained by MCUdude                            |
| https://github.com/MCUdude/LEDbar                              |            
| Released to the public domain                                  |
|                                                                |
| VU meter example - Read analog pin A0 and display the level    |
| on the LED bar.                                                |
*****************************************************************/

// Include the library code
#include "LEDbar.h"

// Pin definitions
byte CLK = 5;
byte DATA = 4;
byte DIM = 3;
byte analogPin = A0;

// Constants
const byte numberOfLEDs = 40; // My module has 40 LEDs

// Global variables
byte vuData = 0;

// Initialize the library with dim pin
LEDbar led(CLK, DATA, DIM);
// Alternative without dim pin (tie the dimm pin on the LED bar to Vcc)
//LEDbar led(CLK, DATA);


void setup()
{
	// Initialize the LED bar with 40 LEDs
	led.begin(numberOfLEDs);
	
	// Set the brightness to 100 (8-bit --> 0 - 255)
	led.brightness(100);
}


void loop()
{
	// Map the analog value (0 - 1023 steps) to fit the LED bar (0 - 40 steps)
	vuData = map(analogRead(analogPin), 0, 1023, 0, numberOfLEDs);
	
	// Display vuData on the LED bar
	led.setLevel(vuData);
	
  // Alternative way to run from the oposite direction
  //led.setLevel(-vuData);
  
  // Slow down a little
  delay(5);
}