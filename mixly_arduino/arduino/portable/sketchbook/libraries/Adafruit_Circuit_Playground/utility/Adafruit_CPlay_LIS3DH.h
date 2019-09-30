/**************************************************************************/
/*!
    @file     Adafruit_CPlay_LIS3DH.h
    @author   K. Townsend / Limor Fried (Adafruit Industries)
    license  BSD (see license.txt)

    This is a library for the Adafruit LIS3DH Accel breakout board
    ----> https://www.adafruit.com/products/2809

    Adafruit invests time and resources providing this open source code,
    please support Adafruit and open-source hardware by purchasing
    products from Adafruit!

    v1.0  - First release
*/
/**************************************************************************/

#ifndef ADAFRUIT_CPLAY_LIS3DH_H
#define ADAFRUIT_CPLAY_LIS3DH_H

#if ARDUINO >= 100
 #include "Arduino.h"
#else
 #include "WProgram.h"
#endif

#include <Wire.h>
#ifndef __AVR_ATtiny85__
  #include <SPI.h>
#endif
#include "utility/Adafruit_CPlay_Sensor.h"

/*=========================================================================
    I2C ADDRESS/BITS
    -----------------------------------------------------------------------*/
    #define LIS3DH_DEFAULT_ADDRESS  (0x18)    ///< default I2C address. if SDO/SA0 is 3V, its 0x19.
/*=========================================================================*/

/**************************************************************************/
/*! 
    @brief  LIS3DH register definitions
*/
/**************************************************************************/
enum {
  LIS3DH_REG_STATUS1  =      0x07,
  LIS3DH_REG_OUTADC1_L  =    0x08,
  LIS3DH_REG_OUTADC1_H  =    0x09,
  LIS3DH_REG_OUTADC2_L  =    0x0A,
  LIS3DH_REG_OUTADC2_H  =    0x0B,
  LIS3DH_REG_OUTADC3_L  =    0x0C,
  LIS3DH_REG_OUTADC3_H  =    0x0D,
  LIS3DH_REG_INTCOUNT   =     0x0E,
  LIS3DH_REG_WHOAMI   =      0x0F,
  LIS3DH_REG_TEMPCFG    =     0x1F,
  LIS3DH_REG_CTRL1  =        0x20,
  LIS3DH_REG_CTRL2    =      0x21,
  LIS3DH_REG_CTRL3    =      0x22,
  LIS3DH_REG_CTRL4      =     0x23,
  LIS3DH_REG_CTRL5      =     0x24,
  LIS3DH_REG_CTRL6      =     0x25,
  LIS3DH_REG_REFERENCE    =   0x26,
  LIS3DH_REG_STATUS2      =   0x27,
  LIS3DH_REG_OUT_X_L      =   0x28,
  LIS3DH_REG_OUT_X_H    =    0x29,
  LIS3DH_REG_OUT_Y_L    =    0x2A,
  LIS3DH_REG_OUT_Y_H    =    0x2B,
  LIS3DH_REG_OUT_Z_L    =    0x2C,
  LIS3DH_REG_OUT_Z_H    =    0x2D,
  LIS3DH_REG_FIFOCTRL     =   0x2E,
  LIS3DH_REG_FIFOSRC      =   0x2F,
  LIS3DH_REG_INT1CFG      =   0x30,
  LIS3DH_REG_INT1SRC      =   0x31,
  LIS3DH_REG_INT1THS      =   0x32,
  LIS3DH_REG_INT1DUR      =   0x33,
  LIS3DH_REG_CLICKCFG     =   0x38,
  LIS3DH_REG_CLICKSRC     =   0x39,
  LIS3DH_REG_CLICKTHS     =  0x3A,
  LIS3DH_REG_TIMELIMIT      = 0x3B,
  LIS3DH_REG_TIMELATENCY    = 0x3C,
  LIS3DH_REG_TIMEWINDOW     = 0x3D,
};

/**************************************************************************/
/*! 
    @brief  LIS3DH measurement ranges
*/
/**************************************************************************/
typedef enum
{
  LIS3DH_RANGE_16_G         = 0b11,   // +/- 16g
  LIS3DH_RANGE_8_G           = 0b10,   // +/- 8g
  LIS3DH_RANGE_4_G           = 0b01,   // +/- 4g
  LIS3DH_RANGE_2_G           = 0b00    // +/- 2g (default value)
} lis3dh_range_t;

/**************************************************************************/
/*! 
    @brief  LIS3DH axis numbers
*/
/**************************************************************************/
typedef enum
{
  LIS3DH_AXIS_X         = 0x0,
  LIS3DH_AXIS_Y         = 0x1,
  LIS3DH_AXIS_Z         = 0x2,
} lis3dh_axis_t;


/**************************************************************************/
/*! 
    @brief  LIS3DH datarates
    @note Used with register 0x2A (LIS3DH_REG_CTRL_REG1) to set bandwidth
*/
/**************************************************************************/
typedef enum
{
  LIS3DH_DATARATE_400_HZ     = 0b0111, //  400Hz 
  LIS3DH_DATARATE_200_HZ     = 0b0110, //  200Hz
  LIS3DH_DATARATE_100_HZ     = 0b0101, //  100Hz
  LIS3DH_DATARATE_50_HZ      = 0b0100, //   50Hz
  LIS3DH_DATARATE_25_HZ      = 0b0011, //   25Hz
  LIS3DH_DATARATE_10_HZ      = 0b0010, // 10 Hz
  LIS3DH_DATARATE_1_HZ       = 0b0001, // 1 Hz
  LIS3DH_DATARATE_POWERDOWN  = 0,
  LIS3DH_DATARATE_LOWPOWER_1K6HZ  = 0b1000,
  LIS3DH_DATARATE_LOWPOWER_5KHZ  =  0b1001,

} lis3dh_dataRate_t;

/**************************************************************************/
/*! 
    @brief  Class that stores state and functions for LIS3DH accelerometer on the circuitPlayground board
*/
/**************************************************************************/
class Adafruit_CPlay_LIS3DH : public Adafruit_Sensor {
 public:
  Adafruit_CPlay_LIS3DH(void);
  Adafruit_CPlay_LIS3DH(int8_t cspin);
  Adafruit_CPlay_LIS3DH(int8_t cspin, int8_t mosipin, int8_t misopin, int8_t sckpin);
  
  bool       begin(uint8_t addr = LIS3DH_DEFAULT_ADDRESS);

  void read();
  int16_t readADC(uint8_t a);

  void setRange(lis3dh_range_t range);
  lis3dh_range_t getRange(void);

  void setDataRate(lis3dh_dataRate_t dataRate);
  lis3dh_dataRate_t getDataRate(void);

  bool getEvent(sensors_event_t *event);
  void getSensor(sensor_t *sensor);

  void setClick(uint8_t c, uint8_t clickthresh, uint8_t timelimit = 10, uint8_t timelatency = 20, uint8_t timewindow = 255);
  uint8_t getClick(void);

/**************************************************************************/
/*! 
    @brief  integer axis readings
*/
/**************************************************************************/
  int16_t x, ///> integer x-axis reading 
          y, ///> integer y-axis reading
          z; ///> integer z-axis reading

/**************************************************************************/
/*! 
    @brief  floating point axis readings
*/
/**************************************************************************/
  float x_g,  ///> floating point G reading for x axis
        y_g,  ///> floating point G reading for y axis
        z_g; ///> floating point G reading for z axis

 private:
  
  uint8_t readRegister8(uint8_t reg);
  void writeRegister8(uint8_t reg, uint8_t value);
  uint8_t spixfer(uint8_t x = 0xFF);

  // SPI
  int8_t _cs, _mosi, _miso, _sck;

  int8_t  _i2caddr;
  int32_t _sensorID;
};

#endif
