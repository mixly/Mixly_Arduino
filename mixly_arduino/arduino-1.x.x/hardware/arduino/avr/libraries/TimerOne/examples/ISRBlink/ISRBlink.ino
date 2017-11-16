#include <TimerOne.h>
 
void setup() 
{
  // Initialize the digital pin as an output.
  // Pin 13 has an LED connected on most Arduino boards
  pinMode(13, OUTPUT);    
  
  Timer1.initialize(100000); // set a timer of length 100000 microseconds (or 0.1 sec - or 10Hz => the led will blink 5 times, 5 cycles of on-and-off, per second)
  Timer1.attachInterrupt( timerIsr ); // attach the service routine here
}
 
void loop()
{
  // Main code loop
  // TODO: Put your regular (non-ISR) logic here
}
 
/// --------------------------
/// Custom ISR Timer Routine
/// --------------------------
boolean sta=false;
void timerIsr()
{
    // Toggle LED
    sta=!sta;
    digitalWrite( 13, sta);
}