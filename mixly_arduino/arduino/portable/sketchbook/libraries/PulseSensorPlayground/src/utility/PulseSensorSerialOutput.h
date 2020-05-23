/*
   Serial output formatter for the PulseSensor Playground.
   This object knows all about the formats for our Serial output.
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
#ifndef PULSE_SENSOR_SERIAL_OUTPUT_H
#define PULSE_SENSOR_SERIAL_OUTPUT_H

#include <Arduino.h>
#include "PulseSensor.h" // to access PulseSensor state.

/*
   Destinations for serial output:
   PROCESSING_VISUALIZER = write to the Processing Visualizer Sketch.
   SERIAL_PLOTTER = write to the Arduino IDE Serial Plotter.
*/
#define PROCESSING_VISUALIZER ((byte) 1)
#define SERIAL_PLOTTER ((byte) 2)

class PulseSensorSerialOutput {
  public:

    /*
       Constructs a default Serial output manager.
    */
    PulseSensorSerialOutput();

    /*
       Tells the library what Serial output to use,
       such as Serial, Serial1, or a SoftwareSerial.
    */
    void setSerial(Stream &output);

    /*
       Find what Serial stream we are configured to print to.

       Returns a pointer to the Serial we're configured for
       (for example Serial, Serial1, or a SoftwareSerial object),
       or NULL if no Serial output has been set up.
    */
    Stream *getSerial();

    /*
       Sets the format (destination) of the Serial Output:
       SERIAL_PLOTTER or PROCESSING_VISUALIZER.
    */
    void setOutputType(byte outputType);

    /*
       Output the Signal data for all PulseSensors
    */
    void outputSample(PulseSensor sensors[], int numberOfSensors);

    /*
       Output the per-beat data (Beats per Minute, Inter-beat Interval)
       for the given PulseSensor.

       sensorIndex = the sensor to output beat information about.
         Usually is the PulseSensor that a beat was detected on.
    */
    void outputBeat(PulseSensor sensors[], int numberOfSensors, int sensorIndex);

    /*
        Write the given data prefixed by the given symbol.
    */
    void outputToSerial(char symbol, int data);

  private:
    // If non-null, the output stream to print to. If null, don't print.
    Stream *pOutput;

    // The destination of data: PROCESSING_VISUALIZER or SERIAL_PLOTTER
    int OutputType;

};
#endif // PULSE_SENSOR_SERIAL_OUTPUT_H
