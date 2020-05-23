/*
 * \brief I2C LM75A_Soft temperature sensor library (implementation)
 *
 * \author Quentin Comte-Gaz <quentin@comte-gaz.com>
 * \date 8 July 2016 & 14 January 2018
 * \license MIT License (contact me if too restrictive)
 * \copyright Copyright (c) 2016 Quentin Comte-Gaz
 * \version 1.1
 */

#include "LM75A_Soft.h"
#include <SoftwareWire.h>

namespace LM75A_SoftConstValues
{

const int LM75A_Soft_BASE_ADDRESS = 0x48;

const float LM75A_Soft_DEGREES_RESOLUTION = 0.125;

const int LM75A_Soft_REG_ADDR_TEMP = 0;
//const int LM75A_Soft_REG_ADDR_CONF = 1;  // Not used for now
//const int LM57A_REG_ADDR_THYST = 2; // Not used for now
//const int LM57A_REG_ADDR_TOS = 3;   // Not used for now

}

using namespace LM75A_SoftConstValues;

LM75A_Soft::LM75A_Soft(){}

void LM75A_Soft::begin(int addr, SoftwareWire *theWire)
{
  _i2c_device_address = addr;
  _wire = theWire;
  _wire->begin();
}

float LM75A_Soft::fahrenheitToDegrees(float temperature_in_fahrenheit)
{
  return ((temperature_in_fahrenheit - 32.0) / 1.8);
}

float LM75A_Soft::degreesToFahrenheit(float temperature_in_degrees)
{
  return ((temperature_in_degrees * 1.8) + 32.0);
}

float LM75A_Soft::getTemperatureInFahrenheit() const
{
  float temperature_in_degrees = getTemperatureInDegrees();

  if (temperature_in_degrees == INVALID_LM75A_Soft_TEMPERATURE) {
    return INVALID_LM75A_Soft_TEMPERATURE;
  }

  return degreesToFahrenheit(temperature_in_degrees);
}

float LM75A_Soft::getTemperatureInDegrees() const
{
  uint16_t real_result = INVALID_LM75A_Soft_TEMPERATURE;
  uint16_t i2c_received = 0;

  // Go to temperature data register
  _wire->beginTransmission(_i2c_device_address);
  _wire->write(LM75A_Soft_REG_ADDR_TEMP);
  if(_wire->endTransmission()) {
    // Transmission error
    return real_result;
  }

  // Get content
  if (_wire->requestFrom(_i2c_device_address, 2)) {
    _wire->readBytes((uint8_t*)&i2c_received, 2);
  } else {
    // Can't read temperature
    return real_result;
  }

  // Modify the value (only 11 MSB are relevant if swapped)
  int16_t refactored_value;
  uint8_t* ptr = (uint8_t*)&refactored_value;

  // Swap bytes
  *ptr = *((uint8_t*)&i2c_received + 1);
  *(ptr + 1) = *(uint8_t*)&i2c_received;

  // Shift data (left-aligned)
  refactored_value >>= 5;

  float real_value;
  if (refactored_value & 0x0400) {
    // When sign bit is set, set upper unused bits, then 2's complement
    refactored_value |= 0xf800;
    refactored_value = ~refactored_value + 1;
    real_value = (float)refactored_value * (-1) * LM75A_Soft_DEGREES_RESOLUTION;
  }
  else {
    real_value = (float)refactored_value *  LM75A_Soft_DEGREES_RESOLUTION;
  }

  return real_value;
}
