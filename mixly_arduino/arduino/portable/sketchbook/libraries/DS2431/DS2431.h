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

#ifndef _DS2431_H
#define _DS2431_H

#include <OneWire.h>

class DS2431 {
public:
  const static uint8_t ONE_WIRE_FAMILY_CODE = 0x2D;

  DS2431(OneWire &ow, // OneWire class
    uint8_t serialNumber[8]); // family code, 48bit serial number and CRC as returned by OneWire search function

  /* Single byte read
  */
  uint8_t read(uint16_t address);

  /* Multiple byte read.
  */
  void read(uint16_t address, uint8_t *buf, uint16_t len);

  /* Full row (8 byte) write. Please note : address must be a multiple of 8.
  Return true if operation was successful.
  The OneWire bus should be de-powered after calling this function.
  */
  bool write(uint16_t address, uint8_t buf[8]);

private:
  OneWire &_ow;
  uint8_t _serialNumber[8];

  const static uint16_t EEPROM_SIZE = 128;

  enum Commands {
    WRITE_SCRATCHPAD = 0x0F,
    READ_SCRATCHPAD = 0xAA,
    COPY_SCRATCHPAD = 0x55,
    READ_MEMORY = 0xF0
  };
};

#endif // _DS2431_H
