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

#ifndef ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_INTERFACE_H_
#define ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_INTERFACE_H_

#include "mu_vision_sensor_interface.h"

class MuVsUartMethod : public MuVsMethod {
 public:
  MuVsUartMethod(uint32_t address);
  virtual ~MuVsUartMethod(void);
  MuVsUartMethod(const MuVsUartMethod&) = delete;
  MuVsUartMethod& operator=(const MuVsUartMethod &) = delete;

  virtual uint32_t UartRead(uint8_t* temp, uint8_t length) = 0;
  virtual uint32_t UartWrite(uint8_t* temp, uint8_t length) = 0;

  virtual mu_err_t Get(const uint8_t reg_address,
                       uint8_t* value) override;
  virtual mu_err_t Set(const uint8_t reg_address,
                       const uint8_t value) override;
  mu_err_t Read(uint8_t* mu_address,
                MuVsMessageVisionType* vision_type,
                MuVsVisionState* vision_state);
  mu_err_t GetMessage(MuVsMessageVisionType);

 private:
 protected:
  mu_err_t GetProtocolHead(uint8_t* buf);
  mu_err_t GetProtocolBody(uint8_t* buf);
  uint8_t SumCheck(uint8_t* buf, uint8_t len);
};

#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_UART_INTERFACE_H_ */
