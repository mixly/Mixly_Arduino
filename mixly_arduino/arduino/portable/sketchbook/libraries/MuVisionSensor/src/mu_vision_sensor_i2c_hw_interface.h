// Copyright 2018 Morpx Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_I2C_HW_INTERFACE_H_
#define ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_I2C_HW_INTERFACE_H_

#include "mu_vision_sensor_i2c_interface.h"
#include <Wire.h>
//@type define I2C type
typedef TwoWire MuVsI2C;

// if u want to use software wire in arduino, change include and MuVsI2C type here
//#include <SoftwareWire.h>
//@type define I2C type
//typedef SoftwareWire MuVsI2C;


// @Must public inheritance class MuVsI2CMethod
class MuVisionSensorI2C: public MuVsI2CMethod {
 public:
  MuVisionSensorI2C(MuVsI2C* i2c_port, uint32_t address);
  virtual ~MuVisionSensorI2C();
  MuVisionSensorI2C(const MuVisionSensorI2C&) = delete;
  MuVisionSensorI2C& operator=(const MuVisionSensorI2C &) = delete;

/**
  * @brief  I2C read byte.
  * @param  reg_address: register address.
  * @param  temp: register value.
  * @retval 0: read success
  *         not 0: error
  */
  virtual uint32_t I2CRead(uint8_t reg_address, uint8_t* temp) override;
/**
  * @brief  I2C write byte.
  * @param  reg_address: register address.
  * @param  value: the value write to register.
  * @retval 0: write success
  *         not 0: error
  */
  virtual uint32_t I2CWrite(uint8_t reg_address, uint8_t value) override;

 private:
  MuVsI2C* i2c_port_ = nullptr;

 protected:
};

#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_HW_INTERFACE_H_ */
