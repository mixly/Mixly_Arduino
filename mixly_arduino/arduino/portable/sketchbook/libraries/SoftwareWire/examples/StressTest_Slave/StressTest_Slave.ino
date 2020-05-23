// Stress test for SoftwareWire library.
// Tested with an Arduino Uno connected to an Arduino Uno.
// This is the sketch for the Slave Arduino using the hardware I2C.

#include <Wire.h>

volatile byte buffer[40];
volatile int rxHowMany;
volatile int rxInterrupts = 0;
volatile boolean flagRequest;

void setup()
{
  Serial.begin(9600);           // start serial for output
  Serial.println("\nSlave");

  Wire.begin(4);                // join i2c bus as slave with address #4
  Wire.onReceive(receiveEvent); // interrupt handler for receiving i2c data
  Wire.onRequest(requestEvent); // interrupt handler for when data is requested by i2c
}

void loop()
{
  noInterrupts();
  int rxInterruptsCopy = rxInterrupts;
  rxInterrupts = 0;
  interrupts();
  
  // Using all the text output to the Serial port is part of the stress test.
  // That causes delays and interrupts.
  if( rxInterruptsCopy > 0)
  {
    Serial.print("Receive: ");
    if( rxInterruptsCopy > 1)
    {
      // Printing to the serial port at 9600 is slow.
      // Therefor it is normal that this sketch misses received data,
      // if too much data was received.
      // As long as the i2c data is correct, everything is okay. It is a stress test.
      Serial.print("Missed:");
      Serial.print( rxInterruptsCopy);
      Serial.print(" ");
    }
    Serial.print("howMany:");
    Serial.print( rxHowMany);
    
    Serial.print(", data:");
    for(int i=0; i<rxHowMany; i++)
    {
      if( i == 0)
        Serial.print(F("*"));      // indicate the first number (sometimes used for a counter value).

      Serial.print((unsigned int) buffer[i], DEC);
      Serial.print(" ");
    }
    Serial.println();
  }
  
  noInterrupts();
  boolean flagRequestCopy = flagRequest;
  flagRequest = false;
  interrupts();
  
  if( flagRequestCopy)
  {
    Serial.println("Request: Data was requested and send");
  }
  
  // Stress the master by disabling interrupts.
  // A value of 500 microseconds will even corrupt the transmission with the normal Arduino Wire library.
  noInterrupts();
  delayMicroseconds(50);
  interrupts();
}

void receiveEvent(int howMany)
{
  for( int i=0; i<howMany; i++)
    buffer[i] = Wire.read();
  
  rxHowMany = howMany;
  rxInterrupts++;
}

void requestEvent()
{
  static byte x = 0;
  
  // Fill array with numbers.
  char TXbuf[] = { 188, 0, 255, 1, 120, 150, 44, 2, 131, 72 };
  TXbuf[0] = x++;         // overwrite the first with a counter.
  Wire.write(TXbuf, sizeof(TXbuf));
  
  flagRequest = true;
}

