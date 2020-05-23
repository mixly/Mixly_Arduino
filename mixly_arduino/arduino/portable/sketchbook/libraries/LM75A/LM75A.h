/*
 * \brief I2C LM75A temperature sensor library
 *
 * \author Quentin Comte-Gaz <quentin@comte-gaz.com>
 * \date 8 July 2016 & 14 January 2018
 * \license MIT License (contact me if too restrictive)
 * \copyright Copyright (c) 2016 Quentin Comte-Gaz
 * \version 1.1
 */

#ifndef LM75A_h
#define LM75A_h

#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#define INVALID_LM75A_TEMPERATURE 1000

class LM75A
{
  public:
    /*!
     * \brief LM75A Initialize I2C LM75A Temperature sensor instance
     * \param A0_value (bool) A0 Pin value (used for address)
     * \param A1_value (bool) A1 Pin value (used for address)
     * \param A2_value (bool) A2 Pin value (used for address)
     */
    LM75A(bool A0_value = false, bool A1_value = false, bool A2_value = false);

    /*!
     * \brief getTemperatureInDegrees Get temperature from LM75A sensor in degrees
     * \return (float) Sensor temperature in degrees (return INVALID_LM75A_TEMPERATURE if error happened)
     */
    float getTemperatureInDegrees() const;

    /*!
     * \brief getTemperatureInFahrenheit Get temperature from LM75A sensor in fahrenheit
     * \return (float) Sensor temperature in fahrenheit (return INVALID_LM75A_TEMPERATURE if error happened)
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
};

#endif //LM75A_h

