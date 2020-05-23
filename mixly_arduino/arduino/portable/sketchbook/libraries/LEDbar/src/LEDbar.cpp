#include "Arduino.h"
#include "LEDbar.h"


// Constructor without dim pin
LEDbar::LEDbar(uint8_t clk, uint8_t data)
{
  // Store to local variables
  _clk = clk;
  _data = data;

  // Set clk, data and dim as output
  pinMode(_clk, OUTPUT);
  pinMode(_data, OUTPUT);
}


// Pass the number of LEDs
void LEDbar::begin(uint8_t numberOfLEDs)
{
  _numberOfLEDs = numberOfLEDs;  
}


// Clear the LED bar
void LEDbar::clear()
{
  for(uint8_t i = 0; i < _numberOfLEDs; i++)
    strobe(LOW);
}


// Turn on all LEDs
void LEDbar::all()
{
  for(uint8_t i = 0; i < _numberOfLEDs; i++)
    strobe(HIGH);
}


// Set n dots from position x 
void LEDbar::setDots(uint8_t position, uint8_t dots)
{
  // Turn LEDs off
  uint8_t a = _numberOfLEDs;
  
  // Shift out leading zeros
  for (a; a > position + dots; a--)
    strobe(LOW);

  // Shift out ones
  for (a; a > position; a--)
    strobe(HIGH);

  // Shift out tailing zeros
  for (a; a > 0; a--)
    strobe(LOW);
}


 // Turn on n leds from start position. Use negative numbers to start from the other end
void LEDbar::setLevel(int8_t level)
{
  // Turn LEDs off
  if (level >= 0)
  {
    uint8_t a = _numberOfLEDs;
    for (a; a > level; a--)
      strobe(0);

    for (a; a > 0; a--)
      strobe(1);
  }
  else
  {
    int8_t a = -_numberOfLEDs;
    for (a; a < -_numberOfLEDs - level; a++)
      strobe(1);

    for (a; a < 0; a++)
      strobe(0);
  }
}


// Set a repeating pattern, 8 bit standard
void LEDbar::setPattern(uint64_t pattern, uint8_t length)
{
  // Shift out the bits
  for(uint8_t i = 0; i < (_numberOfLEDs/length); i++)
  {
    for(uint8_t j = 0; j < length; j++)
      strobe(bitRead(pattern, j));
  }
}


// Latch bit
void LEDbar::strobe(bool dataIn)
{
  digitalWrite(_data, dataIn);
  digitalWrite(_clk, HIGH);
  delayMicroseconds(10);
  digitalWrite(_clk, LOW);
}

