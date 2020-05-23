/*
 * \brief I2C LM75A_Soft temperature sensor library
 *
 * \author Quentin Comte-Gaz <quentin@comte-gaz.com>
 * \date 8 July 2016 & 14 January 2018
 * \license MIT License (contact me if too restrictive)
 * \copyright Copyright (c) 2016 Quentin Comte-Gaz
 * \version 1.1
 */

#ifndef LM75A_Soft_h
#define LM75A_Soft_h

#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#include <SoftwareWire.h>

#define INVALID_LM75A_Soft_TEMPERATURE 1000

class LM75A_Soft
{
  public:
    /*!
     * \brief LM75A_Soft Initialize I2C LM75A_Soft Temperature sensor instance
     * \param A0_value (bool) A0 Pin value (used for address)
     * \param A1_value (bool) A1 Pin value (used for address)
     * \param A2_value (bool) A2 Pin value (used for address)
     */
    LM75A_Soft();

    void begin(int addr, SoftwareWire *theWire);

    /*!
     * \brief getTemperatureInDegrees Get temperature from LM75A_Soft sensor in degrees
     * \return (float) Sensor temperature in degrees (return INVALID_LM75A_Soft_TEMPERATURE if error happened)
     */
    float getTemperatureInDegrees() const;

    /*!
     * \brief getTemperatureInFahrenheit Get temperature from LM75A_Soft sensor in fahrenheit
     * \return (float) Sensor temperature in fahrenheit (return INVALID_LM75A_Soft_TEMPERATURE if error happened)
     */
    float getTemperatureInFahrenheit() const;

    /*!
     * \brief fahrenheitToDegrees Convert temperature from fahrenheit to degrees
     */
    static float fahrenheitToDegrees(float temperature_in_fahrenheit);

    /*!
     * \brief degreesToFahrenheit Convert temperature from degrees to fahrenheit
     */
    static float degreesToFahrenheit(float temperature_in_degrees);

  private:
    int _i2c_device_address;
    SoftwareWire *_wire;
};

#endif //LM75A_Soft_h

