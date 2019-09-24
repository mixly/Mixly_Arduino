
/*
 Stepper Motor Control - one turn
 */

 #include <Stepper2.h>

 const int rpm = 15; // max rpm on 28BYJ-48 is ~15
 int pinOut[4] = { D1, D2, D5, D6 };

 Stepper2 myStepper(pinOut);

 void setup() {
   Serial.begin(115200);
   myStepper.setSpeed(rpm);
 }

 void loop() {
   Serial.println("start");
   myStepper.setDirection(0); // clock-wise
   myStepper.turn();          // one full turn
   myStepper.stop();
   myStepper.setDirection(1); // counter-clock-wise
   myStepper.turn(3);         // three full turns
   myStepper.stop();
   delay(15 * 1000);
 }
