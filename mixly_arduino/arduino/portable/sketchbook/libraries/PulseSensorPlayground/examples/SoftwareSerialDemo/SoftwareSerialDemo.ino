/*
   Code to detect pulses from the PulseSensor,
   using an interrupt service routine and
   using SoftwareSerial for Serial output.

   Here is a link to the tutorial that discusses this coe
   https://pulsesensor.com/pages/getting-advanced

   Copyright World Famous Electronics LLC - see LICENSE
   Contributors:
     Joel Murphy, https://pulsesensor.com
     Yury Gitman, https://pulsesensor.com
     Bradford Needham, @bneedhamia, https://bluepapertech.com

   Licensed under the MIT License, a copy of which
   should have been included with this software.

   This software is not intended for medical use.
*/

#define USE_ARDUINO_INTERRUPTS true    // we want the Playground to use interrupts
#include <PulseSensorPlayground.h>
#include <SoftwareSerial.h>

/*
   The format of our output.

   Set this to PROCESSING_VISUALIZER if you're going to run
    the Processing Visualizer Sketch.
    See https://github.com/WorldFamousElectronics/PulseSensor_Amped_Processing_Visualizer

   Set this to SERIAL_PLOTTER if you're going to run
    the Arduino IDE's Serial Plotter.
*/
const int OUTPUT_TYPE = SERIAL_PLOTTER;

/*
     PIN_RX = Serial Receive pin (input into Arduino)
     PIN_TX = Serial Transmit pin (output from Arduino)

     In most cases, you'll want to wire the Arduino PIN_RX
     to the TRANSMIT pin of the external serial device,
     and the Arduino PIN_TX to the RECEIVE pin of the
     external device.
*/
const int PIN_RX = 7;
const int PIN_TX = 8;

const int PULSE_INPUT = A0;
const int PULSE_BLINK = 13;    // Pin 13 is the on-board LED
const int PULSE_FADE = 5;      // Must be a PWM pin other than 9 or 10.
const int THRESHOLD = 550;   // Adjust this number to avoid noise when idle

/*
   Our software serial controller.
 */
SoftwareSerial ourSerial(PIN_RX, PIN_TX);

PulseSensorPlayground pulseSensor;

void setup() {

  ourSerial.begin(115200);

  // Configure the PulseSensor manager.

  pulseSensor.analogInput(PULSE_INPUT);
  pulseSensor.blinkOnPulse(PULSE_BLINK);
  pulseSensor.fadeOnPulse(PULSE_FADE);

  pulseSensor.setSerial(ourSerial);
  pulseSensor.setOutputType(OUTPUT_TYPE);
  pulseSensor.setThreshold(THRESHOLD);

  if (!pulseSensor.begin()) {
    /*
     * PulseSensor initialization failed,
     * likely because our particular Arduino platform interrupts
     * aren't supported yet.
     *
     * If your Sketch hangs here, try changing USE_ARDUINO_INTERRUPTS to false.
     */
    for(;;) {
      // Flash the led to show things didn't work.
      digitalWrite(PULSE_BLINK, LOW);
      delay(50);
      digitalWrite(PULSE_BLINK, HIGH);
      delay(50);
    }
  }
}

void loop() {
  delay(20);

  pulseSensor.outputSample();

  if (pulseSensor.sawStartOfBeat()) {
    pulseSensor.outputBeat();
  }
}
