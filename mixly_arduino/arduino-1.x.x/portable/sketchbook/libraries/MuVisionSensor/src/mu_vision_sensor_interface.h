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

#ifndef ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_INTERFACE_H_
#define ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_INTERFACE_H_

#include <stdint.h>
#include "mu_vision_sensor_type.h"

class MuVsMethod {
 public:
  MuVsMethod(void) {}
  virtual ~MuVsMethod(void) {}
  MuVsMethod(const MuVsMethod&) = delete;
  MuVsMethod& operator=(const MuVsMethod &) = delete;

  virtual mu_err_t Get(const uint8_t reg_address,
                       uint8_t* value) = 0;
  virtual mu_err_t Set(const uint8_t reg_address,
                       const uint8_t value) = 0;
 private:
 protected:
  uint32_t mu_address_ = 0;
};

#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MU_VISION_SENSOR_INTERFACE_H_ */
