/*
 * mu_vision_sensor_uart_hw_interface.cpp
 *
 *  Created on: 2018年8月8日
 *      Author: ysq
 */

#include "mu_vision_sensor_uart_hw_interface.h"
#include <Arduino.h>

MuVisionSensorUart::MuVisionSensorUart(MuVsUart* uart,
                                       uint32_t address)
    : MuVsUartMethod(address),
      uart_(uart) {
}

MuVisionSensorUart::~MuVisionSensorUart() {}

uint32_t MuVisionSensorUart::UartRead(uint8_t* temp, uint8_t length) {
#if STREAM_DEBUG_ENABLE
  uint8_t ret = uart_->readBytes(temp, length);
  for (int i = 0; i < ret; i++) {
    Serial.print("0x");
    Serial.print(temp[i], HEX);
    Serial.print(',');
  }
  return ret;
#endif
  return uart_->readBytes(temp, length);
}

uint32_t MuVisionSensorUart::UartWrite(uint8_t* temp, uint8_t length) {
#if STREAM_DEBUG_ENABLE
  uint8_t ret = uart_->write(temp, length);
  for (int i = 0; i < ret; i++) {
    Serial.print(temp[i], HEX);
    Serial.print(',');
  }
  return ret;
#endif
  return uart_->write(temp, length);
}

