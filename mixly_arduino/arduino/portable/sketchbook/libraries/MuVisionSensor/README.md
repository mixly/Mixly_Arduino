[![Morpx-bbs](http://bbs.morpx.com/template/mu/images/logo.png)](http://bbs.morpx.com/forum.php)
[![Git-rep](https://img.shields.io/github/repo-size/mu-opensource/MuVisionSensorIII.svg)](https://github.com/mu-opensource/MuVisionSensorIII)
[![Git-release](https://img.shields.io/github/downloads/mu-opensource/MuVisionSensorIII/total.svg)](https://github.com/mu-opensource/MuVisionSensorIII/releases)


MuVisionSensor
==============

[![Pic-vision-sensor](http://mai.morpx.com/images/page201904/banner1.jpg)](http://mai.morpx.com/)

The MU Vision Sensor is a sensor module that supports Arduino, Microbit, and other haredware platform that supports UART or I2C communication protocols.

You can use these libraries to read data or set properties of the MU Vision Sensor.

## Simple example

How quickly can you get up and running with the library?  Here's a simple program:
```cpp
#include <MuVisionSensor.h>
#include <Wire.h>
#define VISION_TYPE VISION_BALL_DETECT
#define MU_ADDRESS    0x60
MuVisionSensor Mu(MU_ADDRESS);
void setup() { 
  Wire.begin();                                           // I2C or Serial must initialize before MU vision sensor
  Mu.begin(&Wire);                                        // MU begin
  Mu.VisionBegin(VISION_TYPE);                            // vision begin
}
void loop() {
  if (Mu.GetValue(VISION_TYPE, kStatus)) {                // get vision status value
    int x = Mu.GetValue(VISION_TYPE, kXValue);            // get vision X axes value
    int y = Mu.GetValue(VISION_TYPE, kYValue);            // get vision Y axes value
    int width = Mu.GetValue(VISION_TYPE, kWidthValue);    // get vision width value
    int height = Mu.GetValue(VISION_TYPE, kHeightValue);  // get vision height value
    int label = Mu.GetValue(VISION_TYPE, kLabel);         // get vision label value
  }
}
```
## Supported platforms

Right now the library is supported on a variety of arduino compatable platforms. If you want to use the library on other plantforms which supported on C/C++, please follow the steps below:

### Uart

> 1.Edit file `mu_vision_sensor_uart_hw_interface.h` in path `MuVisionSensor/src/` 

> 2.Modify typedef `MuVsUart` in line `21` to the UART Class supported by the platform

> 3.Save and close file `mu_vision_sensor_uart_hw_interface.h`

> 4.Edit file `mu_vision_sensor_uart_hw_interface.cpp` in path `MuVisionSensor/src/`

> 5.Override the functions below:
```cpp
/**
  * @brief  Uart read characters from stream into buffer.
  * @param  temp: uart buffer.
  * @param  length: the number of characters you want to read.
  * @retval returns the number of characters placed in the buffer, terminates if length characters have been read, or timeout.
  */
uint32_t MuVisionSensorUart::UartRead(uint8_t* temp, uint8_t length);

/**
  * @brief  Uart write characters from buffer into stream.
  * @param  temp: uart buffer.
  * @param  length: the number of characters you want to write.
  * @retval returns the number of characters placed in the stream, terminates if length characters have been write, or timeout.
  */
uint32_t MuVisionSensorUart::UartWrite(uint8_t* temp, uint8_t length);
```
> 6.Save and close file `mu_vision_sensor_uart_hw_interface.cpp`

### I2C

> 1.Edit file `mu_vision_sensor_i2c_hw_interface.h` in path `MuVisionSensor/src/` 

> 2.Modify typedef `MuVsI2C` in line `24` to the I2C Class supported by the platform

> 3.Save and close file `mu_vision_sensor_i2c_hw_interface.h`

> 4.Edit file `mu_vision_sensor_i2c_hw_interface.cpp` in path `MuVisionSensor/src/`

> 5.Override the functions below:
```cpp
/**
  * @brief  I2C read byte.
  * @param  reg_address: register address.
  * @param  temp: register value.
  * @retval 0: read success
  *         not 0: error
  */
uint32_t MuVisionSensorI2C::I2CRead(uint8_t reg_address, uint8_t* temp);

/**
  * @brief  I2C write byte.
  * @param  reg_address: register address.
  * @param  value: the value write to register.
  * @retval 0: write success
  *         not 0: error
  */
uint32_t MuVisionSensorI2C::I2CWrite(uint8_t reg_address, uint8_t value);
```
> 6.Save and close file `mu_vision_sensor_i2c_hw_interface.cpp`

## What about other library for MuVisionSensor?

* Mixly		[https://github.com/mu-opensource/MuVisionSensorIII-Mixly](https://github.com/mu-opensource/MuVisionSensorIII-Mixly)
* Micro:Bit	[https://github.com/mu-opensource/MuVisionSensor-MakeCode](https://github.com/mu-opensource/MuVisionSensor-MakeCode)

## For more information

Check out the official site [http://www.morpx.com/zn.index.html](http://www.morpx.com/zn.index.html) for links to documentation, issues, and news


