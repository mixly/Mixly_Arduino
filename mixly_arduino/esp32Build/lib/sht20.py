from machine import Pin, I2C
from struct import unpack as unp
from time import sleep_ms

# SHT20 default address
SHT20_I2CADDR = 64

# SHT20 Command
TRI_T_MEASURE_NO_HOLD = b'\xf3'
TRI_RH_MEASURE_NO_HOLD = b'\xf5'
READ_USER_REG = b'\xe7'
WRITE_USER_REG = b'\xe6'
SOFT_RESET = b'\xfe'



class SHT20(object):

    def __init__(self, scl_pin=22,sda_pin=21,clk_freq=100000):
        self._address = SHT20_I2CADDR

        pin_c = Pin(scl_pin)
        pin_d = Pin(sda_pin)
        self._bus = I2C(scl=pin_c, sda=pin_d, freq=clk_freq)

    def get_temperature(self):
        self._bus.writeto(self._address, TRI_T_MEASURE_NO_HOLD)
        sleep_ms(150)
        origin_data = self._bus.readfrom(self._address, 2)
        origin_value = unp('>h', origin_data)[0]
        value = -46.85 + 175.72 * (origin_value / 65536)
        return value

    def get_relative_humidity(self):
        self._bus.writeto(self._address, TRI_RH_MEASURE_NO_HOLD)
        sleep_ms(150)
        origin_data = self._bus.readfrom(self._address, 2)
        origin_value = unp('>H', origin_data)[0]
        value = -6 + 125 * (origin_value / 65536)
        return value
while True:
  sht_sensor = SHT20()
  T = sht_sensor.get_temperature()
  RH = sht_sensor.get_relative_humidity()
  print('temperature:', T)
  print('relative_humidity:', RH)
  sleep_ms(1000) 