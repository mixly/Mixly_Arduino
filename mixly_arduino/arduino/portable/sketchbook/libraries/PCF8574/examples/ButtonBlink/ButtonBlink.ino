/**
 * This demo code demonstrate all functionnalities of the PCF8574 library.
 *
 * PCF8574 pins map :
 * 0: led
 * 1: led
 * 2: led
 * 3: button + pull-up resistor
 */

/* Dependencies */
#include <Wire.h>    // Required for I2C communication
#include "PCF8574.h" // Required for PCF8574

/** PCF8574 instance */
PCF8574 expander;

/** setup() */
void setup() {

  /* Setup serial for debug */
  Serial.begin(115200);
  
  /* Start I2C bus and PCF8574 instance */
  expander.begin(0x20);
  
  /* Setup some PCF8574 pins for demo */
  expander.pinMode(0, OUTPUT);
  expander.pinMode(1, OUTPUT);
  expander.pinMode(2, OUTPUT);
  expander.pinMode(3, INPUT_PULLUP);
  
  /* Enable PCF8574 interrupts, use pin D8 as "INT" pin and ISRgateway() as callback function */
  expander.enableInterrupt(8, ISRgateway);
  
  /* Attach a software interrupt on pin 3 of the PCF8574 */
  expander.attachInterrupt(3, ISRdemo, FALLING);
  expander.digitalWrite(0, HIGH); // Turn off led 1
}

/** This function will be called each time the state of a pin of the PCF8574 change */
void ISRgateway() {
  expander.checkForInterrupt();
}

/** This function will be called each time the button on pin 3 is pressed (LOW-to-HIGH transition) */
void ISRdemo() {

  /* Blink hardware LED for debug */
  digitalWrite(13, HIGH);  
  
  /* Toggle PCF8574 output 0 for demo */
  expander.toggle();
  
  /* Blink hardware LED for debug */
  digitalWrite(13, LOW);
}

/** loop() */
void loop() {

  /* Blink demo */
  expander.blink(1, 5, 500); // Blink led 2
  delay(1000);
  expander.blink(2, 5, 500); // Blink led 3
  delay(1000);

  /* DigitalWrite demo */
  expander.digitalWrite(1, HIGH); // Turn off led 2
  delay(500);
  expander.digitalWrite(2, HIGH); // Turn off led 3
  delay(500);
  expander.digitalWrite(1, LOW);  // Turn on led 2
  delay(500);
  expander.digitalWrite(2, LOW);  // Turn on led 3
  delay(500);

  /* Toggle demo */
  expander.toggle(1);  // Toggle led 2
  expander.toggle(2);  // Toggle led 3
  delay(1000);
  expander.toggle(1);  // Toggle led 2
  expander.toggle(2);  // Toggle led 3
  delay(1000);

  /* Direct pins acces demo (does not with input setup) */
  //expander.write(255); // All led off
  //delay(1000);
  //expander.write(0);   // All led on
  //delay(1000);

  /* DigitalRead demo */
  expander.detachInterrupt(3); // Temporaly disable button interrupt
  delay(1000);                 // PRESS THE BUTTON NOW (if you want to press it) !
  Serial.println(expander.digitalRead(3) ? "HIGH" : "LOW"); // Print button pin state
  Serial.println(expander.read(), DEC); // Read the whole pins input register
  expander.attachInterrupt(3, ISRdemo, FALLING); // Re-enable interrupt on button pin

  /* Final demo (warning: will make button bug) */
  //expander.set();   // All led off
  //delay(1000);
  //expander.clear(); // All led on
  delay(5000);
}
