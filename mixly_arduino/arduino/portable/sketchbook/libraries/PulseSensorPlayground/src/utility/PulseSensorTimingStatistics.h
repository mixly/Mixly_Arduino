/*
   Sample time statistics functions.
   Designed to provide insite into the timing accuracy of
   programs that don't use interrupts to read data from a PulseSensor.

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
#ifndef PULSE_SENSOR_TIMING_STATISTICS_H
#define PULSE_SENSOR_TIMING_STATISTICS_H

#include <Arduino.h>

/*
   Timing statistics show how accurate the beats per minute
   and inter-beat interval measurements are.

   An average offset other than zero shows that samples were recorded
   at a rate different from the expected rate.
   For example, for an expected sample interval of 2000 microseconds
   (500 samples per second), an offset of 60 microseconds indicates that
   samples were recorded at a rate 3% slower than expected, which in turn
   shows that the measured beats per minute and inter-beat interval
   have a 3% error due to timing offset.

   A large span between minimum and maximum jitter shows that sometimes
   the sampling loop was slow or fast. This could be due to, for example,
   unexpectedly slow code that executes only every so often.
*/
class PulseSensorTimingStatistics {
  public:
    /*
       Constructs an object for measuring statistics about the timing
       of samples from the PulseSensor.

       sampleIntervalMicros = expected time between samples, in microseconds.
       samplesToMeasure = number of samples to measure timing over.
    */
    PulseSensorTimingStatistics(long sampleIntervalMicros, int samplesToMeasure);
    
    /*
       (re)start the collection of timing statistics.
       Called automatically by the PulseSensorTimingStatistics constructor.
    */
    void resetStatistics();


    /*
       Record the fact that we just now read the PulseSensor output.

       Returns the number of samples remaining to be recorded.
       The caller should stop calling recordSampleTime() once
       this function returns 0.
    */
    int recordSampleTime();

    /*
       Serial prints the sample timing statistics.
    */
    void outputStatistics(Stream *pOut);

    int getMinJitterMicros() {
      return MinJitterMicros;
    }
    int getMaxJitterMicros() {
      return MaxJitterMicros;
    }
    
    /*
       Returns the average offset seen so far, in microseconds.
    */
    int getAverageOffsetMicros();

  private:
    long SampleIntervalMicros; // desired sample interval, in microseconds.
    int SamplesDesired;       // total number of samples we want to record.
    unsigned long LastSampleMicros; // time (microseconds) of the previous sample.
    int MinJitterMicros;      // minimum offset seen.
    int MaxJitterMicros;      // maximum offset seen.
    float OffsetsSum;         // sum of offsets so far.
    int SamplesSeen;          // number of samples seen so far.
};
#endif // PULSE_SENSOR_TIMING_STATISTICS_H
