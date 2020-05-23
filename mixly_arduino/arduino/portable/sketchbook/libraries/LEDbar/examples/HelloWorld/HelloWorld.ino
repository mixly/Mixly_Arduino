/*****************************************************************
| LEDbar Arduino library - based on the 74HC164 shift register   |
| Developed and maintained by MCUdude                            |
| https://github.com/MCUdude/LEDbar                              |            
| Released to the public domain                                  |
|                                                                |
| Hello world! - A basic test program that shows the different   |
| functionality in this library                                  |
*****************************************************************/

// Include the library code
#include "LEDbar.h"

// Pin definitions
byte CLK = 5;
byte DATA = 6;
byte DIM = 7;

// Constants
const byte numberOfLEDs = 8; // My module has 40 LEDs
const byte commonDelay = 10;  // Use the same delay everywhere

// Global variables

// Initialize the library with dim pin
//LEDbar led(CLK, DATA, DIM);
// Alternative without dim pin (tie the dimm pin on the LED bar to Vcc)
LEDbar led(CLK, DATA);


void setup()
{
	// Initialize the LED bar with 40 LEDs
	led.begin(numberOfLEDs);
	
	// Set the brightness to 100 (8-bit --> 0 - 255)
	//led.brightness(10);
}


void loop()
{
	
	// Grow from 0 to 40 from left to right
	for(uint8_t i = 0; i < numberOfLEDs; i++)
  {
    led.setLevel(i);
    delay(commonDelay);
  }
  
  // Reduce from 40 to 0 from right to left
  for(uint8_t i = numberOfLEDs; i > 0; i--)
  {
    led.setLevel(i);
    delay(commonDelay);
  }
  
  // Grow from 0 to 40 from right to left
  for(uint8_t i = 0; i < numberOfLEDs; i++)
  {
  	// A minus indicates to start from the oposite side
    led.setLevel(-i);
    delay(commonDelay);
  }
  
  // Reduce from 40 to 0 from left to right
  for(int8_t i = numberOfLEDs; i > -1; i--)
  {
    // A minus indicates to start from the oposite side
    led.setLevel(-i);
    delay(commonDelay);
  }
  
  // Short pause
  delay(2000);
  
  // Bounce back and forth, and grow each every time
  for (uint8_t i = 1; i < numberOfLEDs; i++)
  {
    // Count up
    for (uint8_t j = 0; j < numberOfLEDs - i; j++)
    {
      led.setDots(j, i); // (position, number of leds lit)
      delay(commonDelay * 5); // Slow down a little
    }
    
    // Count down
    for (int8_t j = numberOfLEDs - i; j > -1; j--)
    {
      led.setDots(j, i); // (position, number of leds lit)
      delay(commonDelay * 5); // Slow down a little
    }
  }
  
  // Set different repeating patterns
  // Default length is 8 bit  
  led.setPattern(0b11110000); 
  delay(3000);

  // Length 20 bit
  //led.setPattern(0b11111000001111100000, 20); 
  //delay(3000);

  // Length 40 bit
  //led.setPattern(0b1111111011111100111110001111000011100000, 40); 
  //delay(3000);
  
  // Clear all - fill with zeros
  led.clear();
  delay(1000);
	
	
}
