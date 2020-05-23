// I2C Digital Potentiometer
// by Nicholas Zambetti <http://www.zambetti.com>
// and Shawn Bonkowski <http://people.interaction-ivrea.it/s.bonkowski/>

// Demonstrates use of the Wire library
// Controls AD5171 digital potentiometer via I2C/TWI

// Created 31 March 2006

// This example code is in the public domain.

// ---------------------------------
// Example from : http://www.arduino.cc/en/Tutorial/DigitalPotentiometer
// Adapted to show usage of the SoftwareWire library
// ---------------------------------


#include <SoftwareWire.h>

// SoftwareWire constructor.
// Parameters:
//   (1) pin for the software sda
//   (2) pin for the software scl
//   (3) use internal pullup resistors. Default true. Set to false to disable them.
//   (4) allow the Slave to stretch the clock pulse. Default true. Set to false for faster code.
//
// Using pin 2 (software sda) and 3 (software scl) in this example.

SoftwareWire myWire( 2, 3);

void setup()
{
  myWire.begin(); // join i2c bus (address optional for master)
}

byte val = 0;

void loop()
{
  myWire.beginTransmission(44); // transmit to device #44 (0x2c)
                              // device address is specified in datasheet
  myWire.write(byte(0x00));            // sends instruction byte  
  myWire.write(val);             // sends potentiometer value byte  
  myWire.endTransmission();     // stop transmitting

  val++;        // increment value
  if(val == 64) // if reached 64th position (max)
  {
    val = 0;    // start over from lowest value
  }
  delay(500);
}
