/*
 * mu_vision_sensor_uart_hw_interface.cpp
 *
 *  Created on: 2018年8月8日
 *      Author: ysq
 */

#include "mu_vision_sensor_i2c_hw_interface.h"
#include <Arduino.h>

MuVisionSensorI2C::MuVisionSensorI2C(MuVsI2C* i2c_port, uint32_t address)
    : MuVsI2CMethod(address),
      i2c_port_(i2c_port) {
}

MuVisionSensorI2C::~MuVisionSensorI2C() {}

uint32_t MuVisionSensorI2C::I2CRead(uint8_t reg_address, uint8_t* temp) {
  uint8_t ret = MU_OK;
  i2c_port_->beginTransmission((uint8_t)mu_address_);
  ret = i2c_port_->write(reg_address);
  if (!ret) return SERVER_RESPONSE_TIMEOUT;
  i2c_port_->endTransmission();
  //Debug Output
#if STREAM_DEBUG_ENABLE
  Serial.print("[R:");
  Serial.print(reg_address, HEX);
  Serial.print(',');
#endif
  if (i2c_port_->requestFrom(mu_address_, 1) != 1)
    return SERVER_RESPONSE_TIMEOUT;

  *temp = i2c_port_->read();
  //Debug Output
#if STREAM_DEBUG_ENABLE
  Serial.print(*temp, HEX);
  Serial.print("],");
#endif

  return MU_OK;
}

uint32_t MuVisionSensorI2C::I2CWrite(uint8_t reg_address, uint8_t value) {
  uint8_t ret = MU_OK;
  i2c_port_->beginTransmission((uint8_t)mu_address_);
  ret = i2c_port_->write(reg_address);
  if (!ret) return SERVER_RESPONSE_TIMEOUT;
  ret = i2c_port_->write(value);
  if (!ret) return SERVER_RESPONSE_TIMEOUT;
  i2c_port_->endTransmission();
  //Debug Output
#if STREAM_DEBUG_ENABLE
  Serial.print("[W:");
  Serial.print(reg_address, HEX);
  Serial.print(',');
  Serial.print(value, HEX);
  Serial.print("],");
#endif
  return MU_OK;
}
