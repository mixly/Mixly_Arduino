/*

SoftwareSerial.cpp - Implementation of the Arduino software serial for ESP32.
Copyright (c) 2015-2016 Peter Lerup. All rights reserved.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/

#include <Arduino.h>

// The Arduino standard GPIO routines are not enough,
// must use some from the Espressif SDK as well
extern "C" {
#include "esp32-hal-gpio.h"
}

#include <SoftwareSerial.h>

#define MAX_PIN 35

// As the Arduino attachInterrupt has no parameter, lists of objects
// and callbacks corresponding to each possible GPIO pins have to be defined
SoftwareSerial *ObjList[MAX_PIN + 1];

void IRAM_ATTR sws_isr_0() { ObjList[0]->rxRead(); };
void IRAM_ATTR sws_isr_2() { ObjList[2]->rxRead(); };
void IRAM_ATTR sws_isr_4() { ObjList[4]->rxRead(); };
void IRAM_ATTR sws_isr_5() { ObjList[5]->rxRead(); };
void IRAM_ATTR sws_isr_12() { ObjList[12]->rxRead(); };
void IRAM_ATTR sws_isr_13() { ObjList[13]->rxRead(); };
void IRAM_ATTR sws_isr_14() { ObjList[14]->rxRead(); };
void IRAM_ATTR sws_isr_15() { ObjList[15]->rxRead(); };
void IRAM_ATTR sws_isr_16() { ObjList[16]->rxRead(); };
void IRAM_ATTR sws_isr_17() { ObjList[17]->rxRead(); };
void IRAM_ATTR sws_isr_18() { ObjList[18]->rxRead(); };
void IRAM_ATTR sws_isr_19() { ObjList[19]->rxRead(); };
void IRAM_ATTR sws_isr_21() { ObjList[21]->rxRead(); };
void IRAM_ATTR sws_isr_22() { ObjList[22]->rxRead(); };
void IRAM_ATTR sws_isr_23() { ObjList[23]->rxRead(); };
void IRAM_ATTR sws_isr_25() { ObjList[25]->rxRead(); };
void IRAM_ATTR sws_isr_26() { ObjList[26]->rxRead(); };
void IRAM_ATTR sws_isr_27() { ObjList[27]->rxRead(); };
void IRAM_ATTR sws_isr_32() { ObjList[32]->rxRead(); };
void IRAM_ATTR sws_isr_33() { ObjList[33]->rxRead(); };
void IRAM_ATTR sws_isr_34() { ObjList[34]->rxRead(); };
void IRAM_ATTR sws_isr_35() { ObjList[35]->rxRead(); };

static void (*ISRList[MAX_PIN + 1])() = {
    sws_isr_0,
    NULL,
    sws_isr_2,
    NULL,
    sws_isr_4,
    sws_isr_5,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    sws_isr_12,
    sws_isr_13,
    sws_isr_14,
    sws_isr_15,
    sws_isr_16,
    sws_isr_17,
    sws_isr_18,
    sws_isr_19,
    NULL,
    sws_isr_21,
    sws_isr_22,
    sws_isr_23,
    NULL,
    sws_isr_25,
    sws_isr_26,
    sws_isr_27,
    NULL,
    NULL,
    NULL,
    NULL,
    sws_isr_32,
    sws_isr_33,
    sws_isr_34,
    sws_isr_35};

bool SoftwareSerial::isValidGPIOpin(uint8_t pin)
{
  if (pin < MAX_PIN)
  {
    return ISRList[pin] != NULL;
  }
  return false;
}

SoftwareSerial::SoftwareSerial(int receivePin, int transmitPin, bool inverse_logic, unsigned int buffSize)
{
  m_invert = inverse_logic;
  m_rxValid = m_txValid = m_txEnabled = m_rxEnabled = false;
  m_buffer = NULL;
  m_overflow = false;
  if (isValidGPIOpin(receivePin))
  {
    m_buffer = (uint8_t *)malloc(buffSize);
    if (m_buffer != NULL)
    {
      m_buffSize = buffSize;
      m_inPos = m_outPos = 0;

      m_rxPin = receivePin;
      pinMode(m_rxPin, INPUT);
      ObjList[m_rxPin] = this;
      m_rxValid = true;
    }
  }
  if (isValidGPIOpin(transmitPin))
  {
    m_txPin = transmitPin;
    pinMode(m_txPin, OUTPUT);
    digitalWrite(m_txPin, !m_invert);
    m_txValid = true;
  }
}

SoftwareSerial::~SoftwareSerial()
{
  enableRx(false);
  if (m_rxValid)
    ObjList[m_rxPin] = NULL;
  if (m_buffer)
    free(m_buffer);
}

void SoftwareSerial::begin(uint32_t speed)
{
  // Use getCycleCount() loop to get as exact timing as possible
  m_bitTime = ESP.getCpuFreqMHz() * 1000000 / speed;
  enableRx(true);
}

long SoftwareSerial::baudRate()
{
  return ESP.getCpuFreqMHz() * 1000000 / m_bitTime;
}

void SoftwareSerial::setTransmitEnablePin(int transmitEnablePin)
{
  if (isValidGPIOpin(transmitEnablePin))
  {
    m_txEnabled = true;
    m_txEnablePin = transmitEnablePin;
    pinMode(m_txEnablePin, OUTPUT);
    digitalWrite(m_txEnablePin, LOW);
  }
  else
  {
    m_txEnabled = false;
  }
}

void SoftwareSerial::enableRx(bool on)
{
  if (m_rxValid && m_rxEnabled != on)
  {
    if (on)
    {
      attachInterrupt(m_rxPin, ISRList[m_rxPin], m_invert ? RISING : FALLING);
    }
    else
    {
      detachInterrupt(m_rxPin);
    }
    m_rxEnabled = on;
  }
}

int SoftwareSerial::read()
{
  if (!m_rxValid || (m_inPos == m_outPos))
    return -1;
  uint8_t ch = m_buffer[m_outPos];
  m_outPos = (m_outPos + 1) % m_buffSize;
  return ch;
}

int SoftwareSerial::available()
{
  if (m_rxValid)
  {
    int avail = m_inPos - m_outPos;
    return (avail < 0) ? avail + m_buffSize : avail;
  }
  return -1;
}

#define WaitBitTime(wait) \
 for (uint32_t start = ESP.getCycleCount(); ESP.getCycleCount() - start < wait; )

size_t SoftwareSerial::write(uint8_t b)
{
  if (!m_txValid)
    return 0;
  if (m_invert)
    b = ~b;
  // Disable interrupts in order to get a clean transmit
  cli();
  if (m_txEnabled)
  {
    digitalWrite(m_txEnablePin, HIGH);
  }
  // create tx interrupts to start bit.
  digitalWrite(m_txPin, HIGH), digitalWrite(m_txPin, LOW);

  WaitBitTime(m_bitTime);
  for (uint8_t i = 0; i != 8; i++)
  {
    digitalWrite(m_txPin, (b & 1) ? HIGH : LOW);
    WaitBitTime(m_bitTime);
    b >>= 1;
  }
  // Stop bit
  digitalWrite(m_txPin, HIGH);
  WaitBitTime(m_bitTime);
  if (m_txEnabled)
  {
    digitalWrite(m_txEnablePin, LOW);
  }
  sei();
  return 1;
}

void IRAM_ATTR SoftwareSerial::rxRead()
{
  // Advance the starting point for the samples but compensate for the
  // initial delay which occurs before the interrupt is delivered
  // uint32_t wait_time = m_bitTime + m_bitTime / 3 - 500, start_time = ESP.getCycleCount();
  
  uint32_t bit_time = m_bitTime;
  // uint32_t start_time = bit_time / 5;
  // uint32_t end_time = bit_time * 4 / 5;
  uint32_t start_time = bit_time / 9;
  uint32_t end_time = bit_time * 8 / 9;
  uint8_t rec = 0;

  // (m_invert) flag invert set Start 1 And Stop 0 invert
  // But myself not need, so need extra added by yourself

  // Wait Start Bit To Start
  WaitBitTime(start_time);
  if (0 == digitalRead(m_rxPin))
  {
    for (uint8_t i = 0; i != 8; i++)
    {
      rec >>= 1;
      WaitBitTime(bit_time);
      if (digitalRead(m_rxPin))
      {
        rec |= 0x80;
      }
    }
    // Wait Start Bit To End
    WaitBitTime(end_time);
    if (1 == digitalRead(m_rxPin))
    {
      // Stop bit Allow Into RecvBuffer
      // Store the received value in the buffer unless we have an overflow
      int next = (m_inPos + 1) % m_buffSize;
      if (next != m_outPos)
      {
        m_buffer[m_inPos] = (m_invert) ? ~rec : rec;
        m_inPos = next;
      }
      else
      {
        m_overflow = true;
      }
    }
  }
  // Must clear this bit in the interrupt register,
  // it gets set even when interrupts are disabled
  
  // Esp32 GPIO.status_w1tc interrupt auto recovery

  // GPIO_REG_WRITE(GPIO.status_w1tc, 1 << m_rxPin);
}

void SoftwareSerial::flush()
{
  m_inPos = m_outPos = 0;
  m_overflow = false;
}

bool SoftwareSerial::overflow()
{
  return m_overflow;
}

int SoftwareSerial::peek()
{
  if (!m_rxValid || (m_inPos == m_outPos))
  {
    return -1;
  }
  return m_buffer[m_outPos];
}
