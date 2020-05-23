/*
   Formatting of Serial output from PulseSensors.
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
#include "PulseSensorSerialOutput.h"

PulseSensorSerialOutput::PulseSensorSerialOutput() {
  pOutput = NULL;
  OutputType = SERIAL_PLOTTER;
}

void PulseSensorSerialOutput::setSerial(Stream &output) {
  pOutput = &output;
}

Stream *PulseSensorSerialOutput::getSerial() {
  return pOutput;
}

void PulseSensorSerialOutput::setOutputType(byte outputType) {
  OutputType = outputType;
}

void PulseSensorSerialOutput::outputSample(PulseSensor sensors[], int numSensors) {
  if (!pOutput) {
    return;  // no serial output object has been set.
  }

  switch (OutputType) {
    case SERIAL_PLOTTER:
      if (numSensors == 1) {
        pOutput->print(sensors[0].getBeatsPerMinute());
        pOutput->print(F(","));
        pOutput->print(sensors[0].getInterBeatIntervalMs());
        pOutput->print(F(","));
        pOutput->println(sensors[0].getLatestSample());
      } else {
        for (int i = 0; i < numSensors; ++i) {
          if (i != 0) {
            pOutput->print(F(","));
          }
          pOutput->print(sensors[i].getLatestSample());
          // Could output BPM and IBI here.
        }
        pOutput->println();
      }
      break;

    case PROCESSING_VISUALIZER:
      // Don't print bpm and ibi here; they're printed per-beat.
      if (numSensors == 1) {
        outputToSerial('S', sensors[0].getLatestSample());
      } else {
        // PulseSensor 0 = a; #1 = b; #2 = c, etc.
        for(int i = 0; i < numSensors; ++i){
          outputToSerial('a' + i, sensors[i].getLatestSample());
        }
      }
      break;

    default:
      // unknown output type: no output
      break;
  }
}

void PulseSensorSerialOutput::outputBeat(PulseSensor sensors[], int numSensors, int sensorIndex) {
  if (!pOutput) {
    return;  // no serial output object has been set.
  }

  switch (OutputType) {
    case SERIAL_PLOTTER:
      /*
         The plotter doesn't understand occasionally-printed data,
         so we print nothing per-beat.
      */
      break;

    case PROCESSING_VISUALIZER:
      if (numSensors == 1) {
        outputToSerial('B', sensors[sensorIndex].getBeatsPerMinute());
        outputToSerial('Q', sensors[sensorIndex].getInterBeatIntervalMs());
      } else {
        // PulseSensor 0 = A, M; #1 = B, N; etc.
        outputToSerial('A' + sensorIndex
          , sensors[sensorIndex].getBeatsPerMinute());
        outputToSerial('M' + sensorIndex
          , sensors[sensorIndex].getInterBeatIntervalMs());
      }
      break;

    default:
      // unknown output type: no output
      break;
  }
}


    // // testing feedback
    // void printThreshSetting() {
    //
    // }

void PulseSensorSerialOutput::outputToSerial(char symbol, int data) {
  if (!pOutput) {
    return;  // no serial output object has been set.
  }

  pOutput->print(symbol);
  pOutput->println(data);
}
