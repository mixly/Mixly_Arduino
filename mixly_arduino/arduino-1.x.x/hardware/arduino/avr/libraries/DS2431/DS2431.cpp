/*
MIT License

Copyright (c) 2017 Tom Magnier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

#include "DS2431.h"

DS2431::DS2431(OneWire &ow, uint8_t serialNumber[8])
: _ow(ow)
{
  memcpy(_serialNumber, serialNumber, 8);
}

uint8_t DS2431::read(uint16_t address)
{
  uint8_t res = 0xFF;

  read(address, &res, 1);

  return res;
}

void DS2431::read(uint16_t address, uint8_t *buf, uint16_t len)
{
  _ow.reset();
  _ow.select(_serialNumber);
  _ow.write(READ_MEMORY, 1);
  _ow.write(lowByte(address), 1);
  _ow.write(highByte(address), 1);

  for (int i = 0; i < len; i++)
    buf[i] = _ow.read();

  _ow.depower();
}

bool DS2431::write(uint16_t address, uint8_t buf[8])
{
  if (address >= EEPROM_SIZE || address % 8 != 0) //Address has to be aligned on an 8-byte boundary
    return false;

  //Write scratchpad with CRC check
  uint8_t buffer[13];
  buffer[0] = WRITE_SCRATCHPAD;
  buffer[1] = lowByte(address);
  buffer[2] = highByte(address);
  memcpy(&buffer[3], buf, 8);

  _ow.reset();
  _ow.select(_serialNumber);
  _ow.write_bytes(buffer, 11, 1);
  _ow.read_bytes(&buffer[11], 2); //Read CRC-16

  if (!_ow.check_crc16(buffer, 11, &buffer[11]))
    return false; //CRC not matching

  //Read scratchpad
  buffer[0] = READ_SCRATCHPAD;

  _ow.reset();
  _ow.select(_serialNumber);
  _ow.write(buffer[0], 1);
  _ow.read_bytes(&buffer[1], 13); //Read TA1, TA2, E/S, scratchpad and CRC

  if (!_ow.check_crc16(buffer, 12, &buffer[12]))
    return false; //CRC not matching. TODO this does not indicate that scratchpad data is invalid, retry read instead ?

  if (address != ((buffer[2] << 8) + buffer[1]))
    return false; //Address not matching

  if (buffer[3] != 0x07)
    return false; //Invalid transfer or data already copied (wrong value for E/S).

  if (memcmp(&buffer[4], buf, 8) != 0)
    return false; //Data in the scratchpad is invalid.

  //Copy scratchpad
  _ow.reset();
  _ow.select(_serialNumber);
  _ow.write(COPY_SCRATCHPAD, 1);
  _ow.write_bytes(&buffer[1], 3, 1); //Send authorization code (TA1, TA2, E/S)
  delay(15); // t_PROG = 12.5ms worst case.

  if (_ow.read() != 0xAA)
    return false;

  return true;
}
