/*
 * ESP32 Servo Example
 * John K. Bennett
 * March, 2017
 * 
 * This sketch uses low-level ESP32 PWM functionality to sweep 4 servos in sequence.
 * It does NOT use the ESP32_Servo library for Arduino.
 * 
 * The ESP32 supports 16 hardware LED PWM channels that are intended
 * to be used for LED brightness control. The low level ESP32 code allows us to set the 
 * PWM frequency and bit-depth, and then control them by setting bits in the relevant control
 * register. The core files esp32-hal-ledc.* provides helper functions to make this set up 
 * straightforward.  
 * 
 * Different servos require different pulse widths to vary servo angle, but the range is 
 * an approximately 500-2500 microsecond pulse every 20ms (50Hz). In general, hobbyist servos
 * sweep 180 degrees, so the lowest number in the published range for a particular servo
 * represents an angle of 0 degrees, the middle of the range represents 90 degrees, and the top
 * of the range represents 180 degrees. So for example, if the range is 1000us to 2000us,
 * 1000us would equal an angle of 0, 1500us would equal 90 degrees, and 2000us would equal 1800
 * degrees.
 * 
 * The ESP32 PWM timers allow us to set the timer width (max 20 bits). Thus
 * the timer "tick" length is (pulse_period/2**timer_width), and the equation for pulse_high_width
 * (the portion of cycle (20ms in our case) that the signal is high) becomes:
 * 
 *                  pulse_high_width  = count * tick_length
 *                                    = count * (pulse_period/2**timer_width)    
 *                                    
 *            and count = (pulse_high_width / (pulse_period/2**timer_width))
 *                                    
 * For example, if we want a 1500us pulse_high_width, we set pulse_period to 20ms (20000us)
 * (this value is set in the ledcSetup call), and count (used in the ledcWrite call) to
 * 1500/(20000/65655), or 4924. This is the value we write to the timer in the ledcWrite call.
 *
 * As a concrete example, suppose we want to repeatedly sweep four Tower Pro SG90 servos
 * from 0 to 180 degrees.  The published pulse width range for the SG90 is 500-2400us. Thus,
 * we should vary the count used in ledcWrite from 1638 to 7864.
 * 
 * Circuit:
 * Servo motors have three wires: power, ground, and signal. The power wire is typically red,
 * the ground wire is typically black or brown, and the signal wire is typically yellow,
 * orange or white. Since the ESP32 can supply limited current at only 3.3V, and servos draw
 * considerable power, we will connect servo power to the VBat pin of the ESP32 (located
 * near the USB connector). THIS IS ONLY APPROPRIATE FOR SMALL SERVOS. 
 * 
 * We could also connect servo power to a separate external
 * power source (as long as we connect all of the grounds (ESP32, servo, and external power).
 * In this example, we just connect ESP32 ground to servo ground. The servo signal pins
 * connect to any available GPIO pins on the ESP32 (in this example, we use pins
 * 22, 19, 23, & 18).
 * 
 * In this example, we assume four Tower Pro SG90 small servos.
 * The published min and max for this servo are 500 and 2400, respectively.
 * These values actually drive the servos a little past 0 and 180, so
 * if you are particular, adjust the min and max values to match your needs.
 * Experimentally, 550us and 2350us are pretty close to 0 and 180.
 * 
 * This code was inspired by a post on Hackaday by Elliot Williams.
 */

 // Values for TowerPro SG90 small servos; adjust if needed
 #define COUNT_LOW 1638
 #define COUNT_HIGH 7864

 #define TIMER_WIDTH 16

#include "esp32-hal-ledc.h"

void setup() {
   ledcSetup(1, 50, TIMER_WIDTH); // channel 1, 50 Hz, 16-bit width
   ledcAttachPin(22, 1);   // GPIO 22 assigned to channel 1
   
   ledcSetup(2, 50, TIMER_WIDTH); // channel 2, 50 Hz, 16-bit width
   ledcAttachPin(19, 2);   // GPIO 19 assigned to channel 2
   
   ledcSetup(3, 50, TIMER_WIDTH); // channel 3, 50 Hz, 16-bit width
   ledcAttachPin(23, 3);   // GPIO 23 assigned to channel 3
   
   ledcSetup(4, 50, TIMER_WIDTH); // channel 4, 50 Hz, 16-bit width
   ledcAttachPin(18, 4);   // GPIO 18 assigned to channel 4
}

void loop() {
   for (int i=COUNT_LOW ; i < COUNT_HIGH ; i=i+100)
   {
      ledcWrite(1, i);       // sweep servo 1
      delay(200);
   }
    
   for (int i=COUNT_LOW ; i < COUNT_HIGH ; i=i+100)
   {
      ledcWrite(2, i);       // sweep servo 2
      delay(200);
   }

   for (int i=COUNT_LOW ; i < COUNT_HIGH ; i=i+100)
   {
      ledcWrite(3, i);       // sweep the servo
      delay(200);
   }

   for (int i=COUNT_LOW ; i < COUNT_HIGH ; i=i+100)
    {
      ledcWrite(4, i);       // sweep the servo
      delay(200);
    }
}

