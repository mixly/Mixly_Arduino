/*
 * mu_vision_sensor_uart_interface.cpp
 *
 *  Created on: 2018年8月8日
 *      Author: ysq
 */

#include "mu_vision_sensor_uart_interface.h"

MuVsUartMethod::MuVsUartMethod(uint32_t address)
    : MuVsMethod() {
  mu_address_ = address;
}

MuVsUartMethod::~MuVsUartMethod() {}

mu_err_t MuVsUartMethod::Get(const uint8_t reg_address,
                             uint8_t* value) {
  const uint8_t mu_address = mu_address_;
  uint8_t data_buf[8] = {0};
  data_buf[0] = MU_PROTOCOL_START;
  data_buf[1] = 0x07;
  data_buf[2] = mu_address;
  data_buf[3] = MU_PROTOCOL_COMMADN_GET;
  data_buf[4] = reg_address;
  data_buf[5] = SumCheck(data_buf, 6);
  data_buf[6] = MU_PROTOCOL_END;
  uint32_t len = 7;
  uint32_t write_len = UartWrite(data_buf, len);
  if (write_len < len) return CLIENT_WRITE_TIMEOUT;

  //Read response
  uint32_t read_responce_count = 0;
  mu_err_t err;
  while(1) {
    if(++read_responce_count > 3) {
      err = err==MU_OK ? SERVER_RESPONSE_TIMEOUT:err;
      return err;
    }
    err = GetProtocolHead(data_buf);
    if (err == SERVER_RESPONSE_TIMEOUT) return err;
    if (data_buf[1] > 8) {
      err = MU_ERROR_COMMAND;
      continue;
    }
    err = GetProtocolBody(data_buf);
    if (err == SERVER_RESPONSE_TIMEOUT) return err;
    if (data_buf[3] == MU_ERROR_OK && data_buf[4] == MU_PROTOCOL_COMMADN_GET) {
      *value = data_buf[5];
      return MU_OK;
    } else if (data_buf[1] == 6) {
      return data_buf[3];
    }
  }
}

mu_err_t MuVsUartMethod::Set(const uint8_t reg_address,
                             const uint8_t value) {
  const uint8_t mu_address = mu_address_;
  uint8_t data_buf[8] = {0};
  data_buf[0] = MU_PROTOCOL_START;
  data_buf[1] = 0x08;
  data_buf[2] = mu_address;
  data_buf[3] = MU_PROTOCOL_COMMADN_SET;
  data_buf[4] = reg_address;
  data_buf[5] = value;
  data_buf[6] = SumCheck(data_buf, 6);
  data_buf[7] = MU_PROTOCOL_END;
  uint32_t len = sizeof(data_buf);
  uint32_t write_len = UartWrite(data_buf, len);
  if (write_len < len) return CLIENT_WRITE_TIMEOUT;

  //Read response
  uint32_t read_responce_count = 0;
  mu_err_t err;
  while(1) {
    if(++read_responce_count > 3) {
      err = err==MU_OK ? SERVER_RESPONSE_TIMEOUT:err;
      return err;
    }
    err = GetProtocolHead(data_buf);
    if (err != MU_OK) return err;
    if (data_buf[1] > 8) {
      err = MU_ERROR_COMMAND;
      continue;
    }
    err = GetProtocolBody(data_buf);
    if (err != MU_OK)
      return err;
    if (data_buf[3] == MU_ERROR_OK &&
        data_buf[4] == MU_PROTOCOL_COMMADN_SET &&
        data_buf[5] == reg_address) {
      return MU_OK;
    } else if (data_buf[1] == 6) {
      return data_buf[3];
    }
  }

}

mu_err_t MuVsUartMethod::Read(uint8_t* mu_address,
                              MuVsMessageVisionType* vision_type,
                              MuVsVisionState* vision_state) {
  uint8_t data_buf[9+MU_MAX_RESULT*5] = {0};
  mu_err_t err;
  uint32_t read_len;
  do {
    //TODO may get data from other serial device.
    read_len = UartRead(data_buf, 1);
    if (read_len == 0) return SERVER_RESPONSE_TIMEOUT;
  } while (data_buf[0] != MU_PROTOCOL_START);
  read_len = UartRead(&data_buf[1], 2);
  if (read_len != 2) return SERVER_RESPONSE_TIMEOUT;

  if (data_buf[1] > sizeof(data_buf)) return MU_ERROR_COMMAND;
  err = GetProtocolBody(data_buf);
  if (err != MU_OK) return err;
  if (data_buf[3] != MU_PROTOCOL_MESSAGE) return MU_ERROR_COMMAND;
  //Assignment
  *mu_address = data_buf[2];
  vision_state->frame = (MuVsMessageVisionType)data_buf[4];
  *vision_type = (MuVsMessageVisionType)data_buf[5];
  vision_state->detect = data_buf[6]>MU_MAX_RESULT ? MU_MAX_RESULT:data_buf[6];
  if (data_buf[6] == 0) return MU_OK;
  for (uint8_t i = 0; i < data_buf[6]; i++) {
    vision_state->vision_result[i].x_value = data_buf[7+5*i];
    vision_state->vision_result[i].y_value = data_buf[8+5*i];
    vision_state->vision_result[i].width = data_buf[9+5*i];
    vision_state->vision_result[i].height = data_buf[10+5*i];
    vision_state->vision_result[i].color = data_buf[11+5*i];
  }

  return MU_OK;
}

mu_err_t MuVsUartMethod::GetMessage(MuVsMessageVisionType vision_type) {
  uint8_t data_buf[7] = {0xFF,0x07,(uint8_t)mu_address_,0x12,vision_type,0,0xED};
  data_buf[5] = SumCheck(data_buf, 5);
  uint32_t write_len = UartWrite(data_buf, 7);
  if (write_len < 7) return CLIENT_WRITE_TIMEOUT;
  return MU_OK;
}

mu_err_t MuVsUartMethod::GetProtocolHead(uint8_t* buf) {
  uint32_t read_len;
  uint32_t read_responce_timeout_count = 0;
  do {
    do {
      //TODO may get data from other serial device.
      read_len = UartRead(buf, 1);
      if (read_len == 0) return SERVER_RESPONSE_TIMEOUT;
    } while (buf[0] != MU_PROTOCOL_START);
    read_len = UartRead(&buf[1], 2);
    if (read_len != 2) return SERVER_RESPONSE_TIMEOUT;
    read_responce_timeout_count++;
    if (read_responce_timeout_count > 2) return SERVER_RESPONSE_TIMEOUT;
  } while(buf[2] != mu_address_);
  return MU_OK;
}
mu_err_t MuVsUartMethod::GetProtocolBody(uint8_t* buf) {
  uint32_t read_len;
  read_len = UartRead(&buf[3], buf[1]-3);
  if (read_len != (uint8_t)(buf[1]-3)) return SERVER_RESPONSE_TIMEOUT;
  if (buf[buf[1]-1] != 0xED) return MU_ERROR_FAIL;
  if (buf[buf[1]-2] != SumCheck(buf, buf[1]-2)) {
    return MU_ERROR_CHECK_SUM;
  }
  return MU_OK;
}

uint8_t MuVsUartMethod::SumCheck(uint8_t* buf, uint8_t len) {
  uint32_t sum = 0;
  for (int i = 0; i < len; i++) {
    sum += buf[i];
  }
  return (uint8_t)(sum&0xFF);
}




