/*

  This is a library for the BH1750_SoftFVI Digital Light Sensor breakout board.

  The BH1750_Soft board uses I2C for communication. Two pins are required to
  interface to the device. Configuring the I2C bus is expected to be done
  in user code. The BH1750_Soft library doesn't do this automatically.

  Datasheet: http://www.elechouse.com/elechouse/images/product/Digital%20light%20Sensor/bh1750fvi-e.pdf

  Written by Christopher Laws, March, 2013.

*/

#ifndef BH1750_Soft_h
#define BH1750_Soft_h

#if (ARDUINO >= 100)
  #include <Arduino.h>
#else
  #include <WProgram.h>
#endif

#include <SoftwareWire.h>

// Uncomment, to enable debug messages
// #define BH1750_Soft_DEBUG

// No active state
#define BH1750_Soft_POWER_DOWN 0x00

// Waiting for measurement command
#define BH1750_Soft_POWER_ON 0x01

// Reset data register value - not accepted in POWER_DOWN mode
#define BH1750_Soft_RESET 0x07

// Default MTreg value
#define BH1750_Soft_DEFAULT_MTREG 69

class BH1750_Soft {

  public:

    enum Mode
    {
      UNCONFIGURED = 0,
      // Measurement at 1 lux resolution. Measurement time is approx 120ms.
      CONTINUOUS_HIGH_RES_MODE  = 0x10,
      // Measurement at 0.5 lux resolution. Measurement time is approx 120ms.
      CONTINUOUS_HIGH_RES_MODE_2 = 0x11,
      // Measurement at 4 lux resolution. Measurement time is approx 16ms.
      CONTINUOUS_LOW_RES_MODE = 0x13,
      // Measurement at 1 lux resolution. Measurement time is approx 120ms.
      ONE_TIME_HIGH_RES_MODE = 0x20,
      // Measurement at 0.5 lux resolution. Measurement time is approx 120ms.
      ONE_TIME_HIGH_RES_MODE_2 = 0x21,
      // Measurement at 4 lux resolution. Measurement time is approx 16ms.
      ONE_TIME_LOW_RES_MODE = 0x23
    };

    BH1750_Soft();
    bool begin(Mode mode, byte addr, SoftwareWire *theWire);
    bool configure(Mode mode);
    bool setMTreg(byte MTreg);
    float readLightLevel(bool maxWait = false);

  private:
    SoftwareWire *_wire;
    byte BH1750_Soft_I2CADDR;
    byte BH1750_Soft_MTreg = (byte)BH1750_Soft_DEFAULT_MTREG;
    // Correction factor used to calculate lux. Typical value is 1.2 but can
    // range from 0.96 to 1.44. See the data sheet (p.2, Measurement Accuracy)
    // for more information.
    const float BH1750_Soft_CONV_FACTOR = 1.2;
    Mode BH1750_Soft_MODE = UNCONFIGURED;

};

#endif
