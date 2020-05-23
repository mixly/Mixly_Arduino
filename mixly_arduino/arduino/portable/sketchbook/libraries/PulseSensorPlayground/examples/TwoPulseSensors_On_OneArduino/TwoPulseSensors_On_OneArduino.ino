/*
   Arduino Sketch to detect pulses from two PulseSensors.

   Here is a link to the tutorial
   https://pulsesensor.com/pages/two-or-more-pulse-sensors

   Copyright World Famous Electronics LLC - see LICENSE
   Contributors:
     Joel Murphy, https://pulsesensor.com
     Yury Gitman, https://pulsesensor.com
     Bradford Needham, @bneedhamia, https://bluepapertech.com

   Licensed under the MIT License, a copy of which
   should have been included with this software.

   This software is not intended for medical use.
*/

/*
   Every Sketch that uses the PulseSensor Playground must
   define USE_ARDUINO_INTERRUPTS before including PulseSensorPlayground.h.
   Here, #define USE_ARDUINO_INTERRUPTS false tells the library to
   not use interrupts to read data from the PulseSensor.

   If you want to use interrupts, simply change the line below
   to read:
     #define USE_ARDUINO_INTERRUPTS true

   Set US_PS_INTERRUPTS to false if either
   1) Your Arduino platform's interrupts aren't yet supported
   by PulseSensor Playground, or
   2) You don't wish to use interrupts because of the side effects.

   NOTE: if US_PS_INTERRUPTS is false, your Sketch must
   call pulse.sawNewSample() at least once every 2 milliseconds
   to accurately read the PulseSensor signal.
*/
#define USE_ARDUINO_INTERRUPTS true
#include <PulseSensorPlayground.h>


/*
   The format of our output.

   Set this to PROCESSING_VISUALIZER if you're going to run
    the multi-sensor Processing Visualizer Sketch.
    See https://github.com/WorldFamousElectronics/PulseSensorAmped_2_Sensors

   Set this to SERIAL_PLOTTER if you're going to run
    the Arduino IDE's Serial Plotter.
*/
const int OUTPUT_TYPE = SERIAL_PLOTTER;

/*
   Number of PulseSensor devices we're reading from.
*/
const int PULSE_SENSOR_COUNT = 2;

/*
     PULSE_POWERx = the output pin that the red (power) pin of
      the first PulseSensor will be connected to. PulseSensor only
      draws about 4mA, so almost any micro can power it from a GPIO.
      If you don't want to use pins to power the PulseSensors, you can remove
      the code dealing with PULSE_POWER0 and PULSE_POWER1.
     PULSE_INPUTx = Analog Input. Connected to the pulse sensor
      purple (signal) wire.
     PULSE_BLINKx = digital Output. Connected to an LED (must have at least
      470 ohm resistor) that will flash on each detected pulse.
     PULSE_FADEx = digital Output. PWM pin onnected to an LED (must have
      at least 470 ohm resistor) that will smoothly fade with each pulse.

     NOTE: PULSE_FADEx must be pins that support PWM.
       If USE_INTERRUPTS is true, Do not use pin 9 or 10 for PULSE_FADEx
       because those pins' PWM interferes with the sample timer.
*/
const int PULSE_INPUT0 = A0;
const int PULSE_BLINK0 = 13;    // Pin 13 is the on-board LED
const int PULSE_FADE0 = 5;

const int PULSE_INPUT1 = A1;
const int PULSE_BLINK1 = 12;
const int PULSE_FADE1 = 11;

const int THRESHOLD = 550;   // Adjust this number to avoid noise when idle

/*
   All the PulseSensor Playground functions.
   We tell it how many PulseSensors we're using.
*/
PulseSensorPlayground pulseSensor(PULSE_SENSOR_COUNT);

void setup() {
  /*
     Use 250000 baud because that's what the Processing Sketch expects to read,
     and because that speed provides about 25 bytes per millisecond,
     or 50 characters per PulseSensor sample period of 2 milliseconds.

     If we used a slower baud rate, we'd likely write bytes faster than
     they can be transmitted, which would mess up the timing
     of readSensor() calls, which would make the pulse measurement
     not work properly.
  */
  Serial.begin(250000);

  /*
     Configure the PulseSensor manager,
     telling it which PulseSensor (0 or 1)
     we're configuring.
  */

  pulseSensor.analogInput(PULSE_INPUT0, 0);
  pulseSensor.blinkOnPulse(PULSE_BLINK0, 0);
  pulseSensor.fadeOnPulse(PULSE_FADE0, 0);

  pulseSensor.analogInput(PULSE_INPUT1, 1);
  pulseSensor.blinkOnPulse(PULSE_BLINK1, 1);
  pulseSensor.fadeOnPulse(PULSE_FADE1, 1);

  pulseSensor.setSerial(Serial);
  pulseSensor.setOutputType(OUTPUT_TYPE);
  pulseSensor.setThreshold(THRESHOLD);


  // Now that everything is ready, start reading the PulseSensor signal.
  if (!pulseSensor.begin()) {
    /*
       PulseSensor initialization failed,
       likely because our Arduino platform interrupts
       aren't supported yet.

       If your Sketch hangs here, try changing USE_ARDUINO_INTERRUPTS to false.
    */
    for (;;) {
      // Flash the led to show things didn't work.
      digitalWrite(PULSE_BLINK0, LOW);
      delay(50);
      digitalWrite(PULSE_BLINK0, HIGH);
      delay(50);
    }
  }
}

void loop() {

  /*
     Wait a bit.
     We don't output every sample, because our baud rate
     won't support that much I/O.
  */
  delay(20);

  // write the latest sample to Serial.
  pulseSensor.outputSample();

  /*
     If a beat has happened on a given PulseSensor
     since we last checked, write the per-beat information
     about that PulseSensor to Serial.
  */
  for (int i = 0; i < PULSE_SENSOR_COUNT; ++i) {
    if (pulseSensor.sawStartOfBeat(i)) {
      pulseSensor.outputBeat(i);
    }
  }
}
