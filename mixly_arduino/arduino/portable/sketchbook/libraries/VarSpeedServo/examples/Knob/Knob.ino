/*
  Knob
  Controlling a servo position using a potentiometer (variable resistor) 
  by Michal Rinott <http://people.interaction-ivrea.it/m.rinott> 
  Adapted by Philip van Allen <philvanallen.com> for the VarSpeedServo.h library (October 2013)
  This example code is in the public domain
  
  Moves a servo to a position, determined by a scaled value from an analog input, driven by a knob (potentiometer)
  Note that servos usually require more power than is available from the USB port - use an external power supply!
*/

#include <VarSpeedServo.h> 
 
VarSpeedServo myservo;    // create servo object to control a servo 
 
const int potPin = 0;    // analog pin used to connect the potentiometer
const int servoPin = 9;  // the digital pin used for the servo

int val;                 // variable to read the value from the analog pin
 
 
void setup() {
  myservo.attach(servoPin);  // attaches the servo on pin 9 to the servo object 
} 
 
void loop() {
  val = analogRead(potPin);            // reads the value of the potentiometer (value between 0 and 1023) 
  val = map(val, 0, 1023, 0, 180);     // scale it to use it with the servo (value from 0 and 180) 
  myservo.write(val);                  // sets the servo position according to the scaled value 
  delay(15);                           // waits a bit before the next value is read and written 
} 
