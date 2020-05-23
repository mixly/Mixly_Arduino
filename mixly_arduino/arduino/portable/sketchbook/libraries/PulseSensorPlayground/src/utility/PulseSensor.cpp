/*
   PulseSensor measurement manager.
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
#include <PulseSensorPlayground.h>

/*
   Internal constants controlling the rate of fading for the FadePin.

   FADE_SCALE = FadeLevel / FADE_SCALE is the corresponding PWM value.
   FADE_LEVEL_PER_SAMPLE = amount to decrease FadeLevel per sample.
   MAX_FADE_LEVEL = maximum FadeLevel value.

   The time (milliseconds) to fade to black =
     (MAX_FADE_LEVEL / FADE_LEVEL_PER_SAMPLE) * sample time (2ms)
*/
#define FADE_SCALE 10
#define FADE_LEVEL_PER_SAMPLE 12
#define MAX_FADE_LEVEL (255 * FADE_SCALE)

/*
   Constructs a Pulse detector that will process PulseSensor voltages
   that the caller reads from the PulseSensor.
*/
PulseSensor::PulseSensor() {
  // Initialize the default configuration
  InputPin = A0;
  BlinkPin = -1;
  FadePin = -1;

  // Initialize (seed) the pulse detector
  sampleIntervalMs = PulseSensorPlayground::MICROS_PER_READ / 1000;
	resetVariables();
}

void PulseSensor::resetVariables(){
	for (int i = 0; i < 10; ++i) {
    rate[i] = 0;
  }
  QS = false;
  BPM = 0;
  IBI = 750;                  // 750ms per beat = 80 Beats Per Minute (BPM)
  Pulse = false;
  sampleCounter = 0;
  lastBeatTime = 0;
  P = 512;                    // peak at 1/2 the input range of 0..1023
  T = 512;                    // trough at 1/2 the input range.
  threshSetting = 550;        // used to seed and reset the thresh variable
  thresh = 550;     // threshold a little above the trough
  amp = 100;                  // beat amplitude 1/10 of input range.
  firstBeat = true;           // looking for the first beat
  secondBeat = false;         // not yet looking for the second beat in a row
  FadeLevel = 0; // LED is dark.
}

void PulseSensor::analogInput(int inputPin) {
  InputPin = inputPin;
}

void PulseSensor::blinkOnPulse(int blinkPin) {
  BlinkPin = blinkPin;
}

void PulseSensor::fadeOnPulse(int fadePin) {
  FadePin = fadePin;
}

void PulseSensor::setThreshold(int threshold) {
  DISABLE_PULSE_SENSOR_INTERRUPTS;
  threshSetting = threshold;
  thresh = threshold;
  ENABLE_PULSE_SENSOR_INTERRUPTS;
}

int PulseSensor::getLatestSample() {
  return Signal;
}

int PulseSensor::getBeatsPerMinute() {
  return BPM;
}

int PulseSensor::getInterBeatIntervalMs() {
  return IBI;
}

int PulseSensor::getPulseAmplitude() {
  return amp;
}

unsigned long PulseSensor::getLastBeatTime() {
  return lastBeatTime;
}

boolean PulseSensor::sawStartOfBeat() {
  // Disable interrupts to avoid a race with the ISR.
  DISABLE_PULSE_SENSOR_INTERRUPTS;
  boolean started = QS;
  QS = false;
  ENABLE_PULSE_SENSOR_INTERRUPTS;

  return started;
}

boolean PulseSensor::isInsideBeat() {
  return Pulse;
}

void PulseSensor::readNextSample() {
  // We assume assigning to an int is atomic.
  Signal = analogRead(InputPin);
}

void PulseSensor::processLatestSample() {
  // Serial.println(threshSetting);
  // Serial.print('\t');
  // Serial.println(thresh);
  sampleCounter += sampleIntervalMs;         // keep track of the time in mS with this variable
  int N = sampleCounter - lastBeatTime;      // monitor the time since the last beat to avoid noise

  // Fade the Fading LED
  FadeLevel = FadeLevel - FADE_LEVEL_PER_SAMPLE;
  FadeLevel = constrain(FadeLevel, 0, MAX_FADE_LEVEL);

  //  find the peak and trough of the pulse wave
  if (Signal < thresh && N > (IBI / 5) * 3) { // avoid dichrotic noise by waiting 3/5 of last IBI
    if (Signal < T) {                        // T is the trough
      T = Signal;                            // keep track of lowest point in pulse wave
    }
  }

  if (Signal > thresh && Signal > P) {       // thresh condition helps avoid noise
    P = Signal;                              // P is the peak
  }                                          // keep track of highest point in pulse wave

  //  NOW IT'S TIME TO LOOK FOR THE HEART BEAT
  // signal surges up in value every time there is a pulse
  if (N > 250) {                             // avoid high frequency noise
    if ( (Signal > thresh) && (Pulse == false) && (N > (IBI / 5) * 3) ) {
      Pulse = true;                          // set the Pulse flag when we think there is a pulse
      IBI = sampleCounter - lastBeatTime;    // measure time between beats in mS
      lastBeatTime = sampleCounter;          // keep track of time for next pulse

      if (secondBeat) {                      // if this is the second beat, if secondBeat == TRUE
        secondBeat = false;                  // clear secondBeat flag
        for (int i = 0; i <= 9; i++) {       // seed the running total to get a realisitic BPM at startup
          rate[i] = IBI;
        }
      }

      if (firstBeat) {                       // if it's the first time we found a beat, if firstBeat == TRUE
        firstBeat = false;                   // clear firstBeat flag
        secondBeat = true;                   // set the second beat flag
        // IBI value is unreliable so discard it
        return;
      }


      // keep a running total of the last 10 IBI values
      word runningTotal = 0;                  // clear the runningTotal variable

      for (int i = 0; i <= 8; i++) {          // shift data in the rate array
        rate[i] = rate[i + 1];                // and drop the oldest IBI value
        runningTotal += rate[i];              // add up the 9 oldest IBI values
      }

      rate[9] = IBI;                          // add the latest IBI to the rate array
      runningTotal += rate[9];                // add the latest IBI to runningTotal
      runningTotal /= 10;                     // average the last 10 IBI values
      BPM = 60000 / runningTotal;             // how many beats can fit into a minute? that's BPM!
      QS = true;                              // set Quantified Self flag (we detected a beat)
      FadeLevel = MAX_FADE_LEVEL;             // If we're fading, re-light that LED.
    }
  }

  if (Signal < thresh && Pulse == true) {  // when the values are going down, the beat is over
    Pulse = false;                         // reset the Pulse flag so we can do it again
    amp = P - T;                           // get amplitude of the pulse wave
    thresh = amp / 2 + T;                  // set thresh at 50% of the amplitude
    P = thresh;                            // reset these for next time
    T = thresh;
  }

  if (N > 2500) {                          // if 2.5 seconds go by without a beat
    thresh = threshSetting;                // set thresh default
    P = 512;                               // set P default
    T = 512;                               // set T default
    lastBeatTime = sampleCounter;          // bring the lastBeatTime up to date
    firstBeat = true;                      // set these to avoid noise
    secondBeat = false;                    // when we get the heartbeat back
    QS = false;
    BPM = 0;
    IBI = 600;                  // 600ms per beat = 100 Beats Per Minute (BPM)
    Pulse = false;
    amp = 100;                  // beat amplitude 1/10 of input range.

  }
}

void PulseSensor::initializeLEDs() {
  if (BlinkPin >= 0) {
    pinMode(BlinkPin, OUTPUT);
    digitalWrite(BlinkPin, LOW);
  }
  if (FadePin >= 0) {
	#ifndef NO_ANALOG_WRITE
    pinMode(FadePin, OUTPUT);
    analogWrite(FadePin, 0); // turn off the LED.
	#endif
  }
}

void PulseSensor::updateLEDs() {
  if (BlinkPin >= 0) {
		if(Pulse){
    	digitalWrite(BlinkPin, HIGH);
  	}else{
			digitalWrite(BlinkPin,LOW);
		}
	}

  if (FadePin >= 0) {
		#ifndef NO_ANALOG_WRITE
	    analogWrite(FadePin, FadeLevel / FADE_SCALE);
		#endif
  }
}
