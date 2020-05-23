/***************************************************
  This is a library for the HTU21DF Humidity & Temp Sensor

  Designed specifically to work with the HTU21DF sensor from Adafruit
  ----> https://www.adafruit.com/products/1899

  These displays use I2C to communicate, 2 pins are required to
  interface
  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ****************************************************/

#include "Adafruit_HTU21DF.h"

#if defined(__AVR__)
#include <util/delay.h>
#endif

/**
 * Constructor for the HTU21DF driver.
 */
Adafruit_HTU21DF::Adafruit_HTU21DF() {
  /* Assign default values to internal tracking variables. */
  _last_humidity = 0.0f;
  _last_temp = 0.0f;
}

/**
 * Initialises the I2C transport, and configures the IC for normal operation.
 *
 * @return true (1) if the device was successfully initialised, otherwise
 *         false (0).
 */
boolean Adafruit_HTU21DF::begin(void) {
  Wire.begin();

  reset();

  Wire.beginTransmission(HTU21DF_I2CADDR);
  Wire.write(HTU21DF_READREG);
  Wire.endTransmission();
  Wire.requestFrom(HTU21DF_I2CADDR, 1);
  return (Wire.read() == 0x2); // after reset should be 0x2
}

/**
 * Sends a 'reset' request to the HTU21DF, followed by a 15ms delay.
 */
void Adafruit_HTU21DF::reset(void) {
  Wire.beginTransmission(HTU21DF_I2CADDR);
  Wire.write(HTU21DF_RESET);
  Wire.endTransmission();
  delay(15);
}

/**
 * Performs a single temperature conversion in degrees Celsius.
 *
 * @return a single-precision (32-bit) float value indicating the measured
 *         temperature in degrees Celsius.
 */
float Adafruit_HTU21DF::readTemperature(void) {
  // OK lets ready!
  Wire.beginTransmission(HTU21DF_I2CADDR);
  Wire.write(HTU21DF_READTEMP);
  Wire.endTransmission();

  delay(50); // add delay between request and actual read!

  uint8_t count = Wire.requestFrom(HTU21DF_I2CADDR, 3);

  /* Make sure we got 3 bytes back. */
  if (count != 3) {
    return 0.0f;
  }

  /* Read 16 bits of data, dropping the last two status bits. */
  uint16_t t = Wire.read();
  t <<= 8;
  t |= Wire.read() & 0b11111100;

  uint8_t crc = Wire.read();
  (void)crc;

  float temp = t;
  temp *= 175.72f;
  temp /= 65536.0f;
  temp -= 46.85f;

  /* Track the value internally in case we need to access it later. */
  _last_temp = temp;

  return temp;
}

/**
 * Performs a single relative humidity conversion.
 *
 * @return A single-precision (32-bit) float value indicating the relative
 *         humidity in percent (0..100.0%).
 */
float Adafruit_HTU21DF::readHumidity(void) {
  /* Prepare the I2C request. */
  Wire.beginTransmission(HTU21DF_I2CADDR);
  Wire.write(HTU21DF_READHUM);
  Wire.endTransmission();

  /* Wait a bit for the conversion to complete. */
  delay(50);

  /* Read the conversion results. */
  uint8_t count = Wire.requestFrom(HTU21DF_I2CADDR, 3);

  /* Make sure we got 3 bytes back. */
  if (count != 3) {
    return 0.0f;
  }

  /* Read 16 bits of data, dropping the last two status bits. */
  uint16_t h = Wire.read();
  h <<= 8;
  h |= Wire.read() & 0b11111100;

  uint8_t crc = Wire.read();
  (void)crc;

  float hum = h;
  hum *= 125.0f;
  hum /= 65536.0f;
  hum -= 6.0f;

  /* Track the value internally in case we need to access it later. */
  _last_humidity = hum;

  return hum;
}
