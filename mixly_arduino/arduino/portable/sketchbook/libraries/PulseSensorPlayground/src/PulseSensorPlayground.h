/*
   A central Playground object to manage a set of PulseSensors.
   See https://www.pulsesensor.com to get started.

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
  NOTE: Every Sketch that uses the PulseSensor Playground
  must define the variable USE_ARDUINO_INTERRUPTS *before* including
  PulseSensorPlayground.h. If you don't, you will get a compiler error
  about "undefined reference to `PulseSensorPlayground::UsingInterrupts".

  In particular, if your Sketch wants the Playground to use interrupts
  to read and process PulseSensor data, your Sketch must contain the
  following two lines, in order:
    #define USE_ARDUINO_INTERRUPTS true
    #include <PulseSensorPlayground.h>

  If, instead, your Sketch does not use interrupts to read PulseSensor
  data,  your Sketch must instead contain the
  following two lines, in order:
    #define USE_ARDUINO_INTERRUPTS false
    #include <PulseSensorPlayground.h>

  See utility/interrupts.h for details.

  Internal, developer note: in the Playground code, don't use
  USE_ARDUINO_INTERRUPTS as a variable; instead, refer to
  PulseSensorPlayground::UsingInterrupts, which is a static variable
  that reflects what the Sketch defined USE_ARDUINO_INTERRUPTS to.
  Because USE_ARDUINO_INTERRUPTS is defined *only* in the user's Sketch,
  it doesn't exist when the various Playground modules are compiled.

  See further notes in interrupts.h
*/


#ifndef PULSE_SENSOR_PLAYGROUND_H
#define PULSE_SENSOR_PLAYGROUND_H

/*
   If you wish to perform timing statistics on your non-interrupt Sketch:

   Uncomment the line below: #define PULSE_SENSOR_TIMING_ANALYSIS true
   Compile and download your Sketch.
   Start the Arduino IDE Serial Monitor.
   Wait about 30 seconds. The Sketch should then print 3 numbers and hang.
   The three numbers are:
     Minimum variation (microseconds) from the 2 millisecond sample time.
     Average variation in that number.
     Maximum variation in that number.
   For example and output of -4 0 18 says that samples were made between
   4 microseconds short of 2 milliseconds, and 18 microseconds longer,
   with an average sample time right at 2 milliseconds (0 microseconds offset).

   If the average number is larger than, say, 50 microseconds, your Sketch
   is taking too much time per loop(), causing inaccuracies in the
   measured signal, heart rate, and inter-beat interval.

   You should aim for an average offset of under 50 microseconds.

   NOTES:

   1) This is an approximate measure, because interrupts can occur that
   the timing statistics cannot measure.

   2) These statistics compile only for non-interrupt Sketches. If your
   Sketch uses Interrupts to sample the PulseSensor signal, enabling
   this timing analysis will have no effect and will print nothing.

   3) Because timing analysis results are printed on Serial, you cannot
   use the Arduino IDE Serial Plotter or the Processing Visualizer to
   examine output when timing analysis is enabled.

   4) If the average is a negative number, your assumed Arduino clock
   speed may be incorrect. For example, if you compiled for an 8MHz clock
   and your Arduino actually runs at 16MHz, you would likely see an
   average offset of something like -1000.

*/
#define PULSE_SENSOR_TIMING_ANALYSIS false
//#define PULSE_SENSOR_TIMING_ANALYSIS true

/*
   If you wish to print the amount of memory used before your Sketch
   starts:

   Uncomment the line below: #define PULSE_SENSOR_MEMORY_USAGE true
   Compile and download your Sketch.
   Start the Arduino IDE Serial Monitor
   Your Sketch will start normally, then print memory usage, then hang.

   The memory usage consists of five numbers:
   data = bytes of global, uninitialized data storage (int x;)
   bss = bytes of global, initialized data storage (int x = 5;)
   heap = bytes of dynamically allocated memory (new Stream;)
   stack = bytes of local variables (those defined within a function)
   total = the total of data, bss, heap, and stack memory used.

   The amount of flash memory used is printed by the Arduino IDE
   when compilation finishes, with a printout such as:
     Sketch uses 5036 bytes (15%) of program storage space.

   NOTE: you must call pulse.setSerial(Serial) in your Sketch's setup().
*/
#define PULSE_SENSOR_MEMORY_USAGE false
// #define PULSE_SENSOR_MEMORY_USAGE true


#include <Arduino.h>
#include "utility/PulseSensor.h"
#include "utility/PulseSensorSerialOutput.h"
#include "utility/PulseSensorTimingStatistics.h"

class PulseSensorPlayground {
  public:
    /*
       The number of microseconds per sample of data from the PulseSensor.
       1 millisecond is 1,000 microseconds.

       Refer to this value as PulseSensorPlayground::MICROS_PER_READ
    */
    static const unsigned long MICROS_PER_READ = (2 * 1000L); // usecs per sample.

    //---------- PulseSensor Manager functions

    /*
       Construct the one PulseSensor Playground manager,
       that manages the given number of PulseSensors.
       Your Sketch should declare either PulseSensorPlayground() for one sensor
       or PulseSensorPlayground(n) for n PulseSensors.

       For example:
         PulseSensorPlayground pulse();
       or
         PulseSensorPlayground pulse(2); // for 2 PulseSensors.
    */
    PulseSensorPlayground(int numberOfSensors = 1);

    /*
       Start reading and processing data from the PulseSensors.

       Your Sketch should make all necessary PulseSensor configuration calls
       before calling begin().

       If the Sketch defined USE_ARDUINO_INTERRUPTS as true, this function
       sets up and turns on interrupts for the PulseSensor.

       If instead the Sketch defined USE_ARDUINO_INTERRUPTS as false,
       it initializes what's necessary for the Sketch to process
       PulsSensor signals. See sawNewSample(), below.

       Returns true if successful, false if unsuccessful.
       Returns false if PulseSensorPlayground doesn't yet support
       interrupts on this Arduino platform and the user's Sketch
       did a #define USE_ARDUINO_INTERRUPTS true.

       If begin() returns false, you can either use a different
       type of Arduino platform, or you can change your Sketch's
       definition of USE_ARDUINO_INTERRUPTS to false:
         #define USE_ARDUINO_INTERRUPTS false
    */
    boolean begin();

    /*
       Returns true if a new sample has been read from each PulseSensor.
       You'll likely want to add this call to your Sketch's loop()
       only if you either 1) want to do something with each sample of the
       PulseSensor signals, or 2) your Sketch doesn't use interrupts
       to read from the PulseSensors.

       NOTE: If your Sketch defined USE_ARDUINO_INTERRUPTS as false,
       you must call pulse.sawNewSample() frequently (at least
       once every 2 milliseconds) to assure that PulseSensor signals
       are read accurately.
       A typical loop() that doesn't use interrupts will contain:
         if (pulse.sawNewSample()) {
           int latest = pulse.getLatestSample();
           ...do whatever you want with the sample read from the PulseSensor.
         }
    */
    boolean sawNewSample();

    //---------- Per-PulseSensor functions

    /*
       By default, the Playground assumes the PulseSensor is connected to A0.
       If your PulseSensor is connected to a different analog input pin,
       call pulse.analogInput(pin) or pulse.analogInput(pin, sensorIndex).

       inputPin = the analog input this PulseSensor is connected to.
       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor to configure.
    */
    void analogInput(int inputPin, int sensorIndex = 0);

    /*
       By default, the Playground doesn't blink LEDs automatically.

       If you wish the Playground to automatically blink an LED
       during each detected pulse,
       call pulse.blinkOnPulse(blinkPin) or
       pulse.blinkOnPulse(blinkPin, sensorIndex).

       blinkPin = the pin to blink on each pulse, which you've connected
         to an LED and 220 ohm resistor, or the built in LED pin
         on your Arduino (for example, pin 13 on Arduino Uno).
       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor to configure.
    */
    void blinkOnPulse(int blinkPin, int sensorIndex = 0);

    /*
       By default, the Playground doesn't blink LEDs automatically.

       If you wish the Playground to automatically blink a fading LED
       during each detected pulse,
       call fadeOnPulse(fadePin) or fadeOnPulse(fadePin, sensorIndex).

       NOTE: the fade pin must be a PWM (Pulse-Width Modulation) pin.

       fadePin = the PWM pin to blink and fade on each pulse,
         which is connected to an LED and a current-limit resistor.
       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor to configure.
    */
    void fadeOnPulse(int fadePin, int sensorIndex = 0);

    /*
       (Internal to library - do not call from a Sketch)
       Perform all the processing necessary when it's time to
       read from all the PulseSensors and process their signals.
    */
    void onSampleTime();

    /*
       Returns the most recently read analog value from the given PulseSensor
       (range: 0..1023).

       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor of interest.
    */
    int getLatestSample(int sensorIndex = 0);

    /*
       Returns the latest beats-per-minute measure for the given PulseSensor.

       The internal beats-per-minute measure is updated per-PulseSensor,
       when a beat is detected from that PulseSensor.

       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor of interest.
    */
    int getBeatsPerMinute(int sensorIndex = 0);

    /*
       Returns the latest IBI (inter-beat interval, in milliseconds) measure
       for the given PulseSensor.

       The internal IBI measure is updated per-PulseSensor,
       when a beat is detected from that PulseSensor.

       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor of interest.
    */
    int getInterBeatIntervalMs(int sensorIndex = 0);

    /*
       Returns true if a new heartbeat (pulse) has been detected
       from the given PulseSensor since the last call to sawStartOfBeat()
       on this PulseSensor.

       Typical use in loop():
         if (pulse.sawStartOfBeat()) {
           ...do what you want to do per-heartbeat.
         }

       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor of interest.
    */
    boolean sawStartOfBeat(int sensorIndex = 0);

    /*
       Returns true if the given PulseSensor signal is currently
       inside a heartbeat. That is, returns true if the signal is above
       the automatically-set threshold of a beat, false otherwise.

       Typical use in loop():
         if (pulse.isInsideBeat()) {
           ...do what you want while in the beat.
         } else {
           ...do what you want while between beats.
         }

       sensorIndex = optional, index (0..numberOfSensors - 1)
         of the PulseSensor of interest.
    */
    boolean isInsideBeat(int sensorIndex = 0);

    //---------- Serial Output functions

    /*
       By default, the Playround doesn't output serial data automatically.

       If you want to output serial pulse data, call pulse.setSerial(Serial),
       pulse.setSerial(Serial1), or whatever Serial stream you like.

       output = the Stream to write data to. Serial, Serial1, Serial2,
       etc., and a SoftwareSerial are valid parameters to pass.
    */
    void setSerial(Stream &output);

    /*
       By default, Playground output is in SERIAL_PLOTTER format.

       If you want output in a different format, call this function once
       sometime before calling pulse.begin().

       Remember to call pulse.setSerial() if you want serial output.

       outputType = SERIAL_PLOTTER to output to the Arduino Serial Plotter,
       PROCESSSING_VISUALIZER to output to the Processing Sketch
       that draws the PulseSensor output.
    */
    void setOutputType(byte outputType);

    /*
       By default, the threshold value is 530.
       threshold is used to find the heartbeat
       adjust this value up in the setup function to avoid noise.
    */
    void setThreshold(int threshold, int sensorIndex = 0);

    /*
       Output the current signal information for each PulseSensor,
       in the previously-set outputType.

       If your Sketch wants to plot samples, it should call this function
       every so often.
    */
    void outputSample();

    /*
       Serial print data with prefix.
       Used exclusively with the Pulse Sensor Processing sketch.
    */
    void outputToSerial(char symbol, int data);

    /*
        Returns the current amplitude of the pulse waveform.
    */
    int getPulseAmplitude(int sensorIndex = 0);

    /*
       Returns the sample number when the last beat was found. 2mS resolution.
    */
    unsigned long getLastBeatTime(int sensorIndex = 0);

    /*
       Output the current per-beat information for each PulseSensor,
       in the previously-set outputType.

       If your Sketch wants to plot beat information, it should call this
       function every time a beat is detected.

       Typical use:
         if (pulse.sawStartOfBeat()) {
           pulse.outputBeat();
         }
    */
    void outputBeat(int sensorIndex = 0);

		// check to see if the library is sampling (on interrupt OR in software)
		boolean isPaused();

		// option to pause Pulse Sensor sampling in order to do other stuff
		// this function will only tell the timer to stop interrupting
		// does not return PWM or other fuctionality to effected pins
		boolean pause();

		// restart sampling the Pulse Sensor after a pause
		boolean resume();


    // (internal to the library) "this" pointer for the ISR.
    static PulseSensorPlayground *OurThis;

  private:

    /*
       Configure and enable interrupts to read samples.
       Call only if PulseSensorPlayground::UsingInterrupts is true.

       This function is defined (vs. declared here) in interrupts.h
    */
    // void setupInterrupt();
		// boolean disableInterrupt();
		// boolean enableInterrupt();

#if PULSE_SENSOR_MEMORY_USAGE
    /*
       Print our RAM usage. See PULSE_SENSOR_MEMORY_USAGE
    */
    void printMemoryUsage();
#endif // PULSE_SENSOR_MEMORY_USAGE

    /*
       If true, the Sketch wants to use interrupts to read the PulseSensor(s).

       This variable is defined (vs. declared here) in interrupts.h
    */
    static boolean UsingInterrupts;
		boolean Paused;
    byte SensorCount;              // number of PulseSensors in Sensors[].
    PulseSensor *Sensors;          // use Sensors[idx] to access a sensor.
    volatile unsigned long NextSampleMicros; // Desired time to sample next.
    volatile boolean SawNewSample; // "A sample has arrived from the ISR"
    PulseSensorSerialOutput SerialOutput; // Serial Output manager.
#if PULSE_SENSOR_TIMING_ANALYSIS   // Don't use ram and flash we don't need.
    PulseSensorTimingStatistics *pTiming;
#endif // PULSE_SENSOR_TIMING_ANALYSIS
};

/*
   We include interrupts.h here instead of above
   because it depends on variables and functions we declare (vs. define)
   in PulseSensorPlayground.h.
*/
#include "utility/Interrupts.h"

#endif // PULSE_SENSOR_PLAYGROUND_H
