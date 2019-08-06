/*
 * mu_vision_sensor_uart_interface.cpp
 *
 *  Created on: 2018年8月8日
 *      Author: ysq
 */

#include "mu_vision_sensor_i2c_interface.h"

MuVsI2CMethod::MuVsI2CMethod(uint32_t address)
    : MuVsMethod() {
  mu_address_ = address;
}

MuVsI2CMethod::~MuVsI2CMethod() {}

mu_err_t MuVsI2CMethod::Get(const uint8_t reg_address,
                             uint8_t* value) {
	return I2CRead(reg_address, value);
}

mu_err_t MuVsI2CMethod::Set(const uint8_t reg_address,
                            const uint8_t value) {
  return I2CWrite(reg_address, value);
}

mu_err_t MuVsI2CMethod::Read(MuVsMessageVisionType vision_type,
                             MuVsVisionState* vision_state) {
  mu_err_t err;
  err = I2CWrite(kRegVisionId, vision_type);
  if (err) return err;
  err = I2CRead(kRegResultNumber, &vision_state->detect);
  if (err) return err;
  if (!vision_state->detect) return MU_OK;
  err = I2CRead(kRegFrameCount, &vision_state->frame);
  if (err) return err;
  vision_state->detect = MU_MAX_RESULT<vision_state->detect ?
      MU_MAX_RESULT:vision_state->detect;
  for (uint32_t i = 0; i < vision_state->detect; ++i) {
    err = I2CWrite(kRegResultId, i+1);
    if (err) return err;
    I2CRead(kRegResultData1, &vision_state->vision_result[i].result_data1);
    I2CRead(kRegResultData2, &vision_state->vision_result[i].result_data2);
    I2CRead(kRegResultData3, &vision_state->vision_result[i].result_data3);
    I2CRead(kRegResultData4, &vision_state->vision_result[i].result_data4);
    I2CRead(kRegResultData5, &vision_state->vision_result[i].result_data5);
  }
  return MU_OK;
}





