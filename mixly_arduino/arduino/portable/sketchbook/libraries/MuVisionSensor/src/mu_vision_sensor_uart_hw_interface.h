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

#ifndef ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_HW_INTERFACE_H_
#define ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_HW_INTERFACE_H_

#include "mu_vision_sensor_uart_interface.h"
#include <Stream.h>

typedef Stream MuVsUart;

class MuVisionSensorUart: public MuVsUartMethod {
 public:
  MuVisionSensorUart(MuVsUart* uart,
                     uint32_t address);
  virtual ~MuVisionSensorUart();
  MuVisionSensorUart(const MuVisionSensorUart&) = delete;
  MuVisionSensorUart& operator=(const MuVisionSensorUart &) = delete;

  virtual uint32_t UartRead(uint8_t* temp, uint8_t length) override;
  virtual uint32_t UartWrite(uint8_t* temp, uint8_t length) override;

 private:
 protected:
  MuVsUart* uart_ = nullptr;
};

#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_HW_INTERFACE_H_ */
