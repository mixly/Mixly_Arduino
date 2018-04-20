/*

DS2431 example that dumps the whole memory and prints it to Serial.
Then a write operation is done and the memory is read again.

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

#include <DS2431.h>
#include <OneWire.h>

const int ONE_WIRE_PIN = 2; // One Wire pin, change according to your needs. A 4.7k pull up resistor is needed.

OneWire oneWire(ONE_WIRE_PIN);

void setup()
{
  Serial.begin(115200);
  while (!Serial); // wait for Serial to come up on USB boards

  // Search the 1-Wire bus for a connected device.
  byte serialNb[8];
  oneWire.target_search(DS2431::ONE_WIRE_FAMILY_CODE);
  if (!oneWire.search(serialNb))
  {
    Serial.println("No DS2431 found on the 1-Wire bus.");
    return;
  }

  // Check serial number CRC
  if (oneWire.crc8(serialNb, 7) != serialNb[7])
  {
    Serial.println("A DS2431 was found but the serial number CRC is invalid.");
    return;
  }

  Serial.print("DS2431 found with serial number : ");
  printBuffer(serialNb, 8);
  Serial.println("");

  // Initialize DS2431 object
  DS2431 eeprom(oneWire, serialNb);

  // Read all memory content
  byte data[128];
  eeprom.read(0, data, sizeof(data));

  Serial.println("Memory contents : ");
  printLargeBuffer(data, sizeof(data));
  Serial.println("");

  // Write a 8-byte row
  byte newData[] = {1,2,3,4,5,6,7,8};
  word address = 0;
  if (eeprom.write(address, newData))
  {
    Serial.print("Successfully wrote new data @ address ");
    Serial.println(address);
  }
  else
  {
    Serial.print("Failed to write data @ address ");
    Serial.println(address);
  }
  oneWire.depower(); // Call this after writing to avoid leaving the bus powered.
  Serial.println("");

  // Read again memory content
  eeprom.read(0, data, sizeof(data));

  Serial.println("Memory contents : ");
  printLargeBuffer(data, sizeof(data));
  Serial.println("");

  // Read single byte
  Serial.print("Data @ address ");
  Serial.print(address);
  Serial.print(" : ");
  Serial.println(eeprom.read(address));
}

void loop()
{
  // Nothing to do
}

void printBuffer(const uint8_t *buf, uint8_t len)
{
  for (int i = 0; i < len-1; i++)
  {
    Serial.print(buf[i], HEX);
    Serial.print(",");
  }
  Serial.println(buf[len-1], HEX);
}

void printLargeBuffer(const uint8_t *buf, uint16_t len)
{
  uint8_t bytesPerLine = 8;

  for (int i = 0; i < len / bytesPerLine; i++)
  {
    Serial.print(i * bytesPerLine);
    Serial.print("\t\t:");
    printBuffer(buf + i * bytesPerLine, bytesPerLine);
  }
}
