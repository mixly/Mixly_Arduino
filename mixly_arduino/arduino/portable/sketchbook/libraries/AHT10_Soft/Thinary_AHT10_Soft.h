/*
  AHT10_Soft - A Humidity Library for Arduino.

  Supported Sensor modules:
    AHT10_Soft-Breakout Module - https://www.aliexpress.com/item/33002710848.html

  Created by Thinary Eletronic at Modern Device on April 2019.

 * This file is part of Thinary_AHT10_Soft.
 *
 * Thinary_AHT10_Soft is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * as published by the Free Software Foundation, either version 3 of
 * the License, or(at your option) any later version.
 *
 * Sodaq_SHT2x is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with Thinary_AHT10_Soft.  If not, see
 * <http://www.gnu.org/licenses/>.
 */


#ifndef AHT10_Soft_H
#define AHT10_Soft_H

#include <stdint.h>
#include <SoftwareWire.h>

typedef enum {
    eAHT10_SoftAddress_default = 0x38,
    eAHT10_SoftAddress_Low     = 0x38,
    eAHT10_SoftAddress_High    = 0x39,
} HUM_SENSOR_T;

typedef unsigned char Sensor_CMD;

class AHT10_SoftClass
{
  private:
    unsigned long readSensor(boolean GetDataCmd);
    unsigned char AHT10_Soft_address;
    SoftwareWire *_wire;
  public:
    AHT10_SoftClass();
    bool begin(unsigned char _AHT10_Soft_address, SoftwareWire *theWire);
    float GetHumidity(void);
    float GetTemperature(void);
    float GetDewPoint(void);
    unsigned char readStatus(void);
    void Reset(void);
};

#endif
