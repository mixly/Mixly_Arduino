"""
AHT21

Micropython library for the AHT21(temperature,humidity)
=======================================================

#Changed from circuitpython to micropython		20220211
#Format unified									20220623

dahanzimin From the Mixly Team 
"""
import utime
from micropython import const

AHTX0_I2CADDR_DEFAULT 	= const(0x38)  		# Default I2C address
AHTX0_CMD_INITIALIZE 	= const(0xE1)		# Initialization command
AHTX0_CMD_TRIGGER 		= const(0xAC)  		# Trigger reading command
AHTX0_CMD_SOFTRESET 	= const(0xBA)  		# Soft reset command
AHTX0_STATUS_BUSY 		= const(0x80)  		# Status bit for busy
AHTX0_STATUS_CALIBRATED = const(0x08)  		# Status bit for calibrated

class AHTx0:
    """Interface library for AHT10/AHT20 temperature+humidity sensors"""
    def __init__(self, i2c, address=AHTX0_I2CADDR_DEFAULT):
        utime.sleep_ms(20)  # 20ms delay to wake up
        self._i2c = i2c
        self._address = address
        self._buf = bytearray(6)
        self.reset()
        if not self.initialize():
            raise AttributeError("Cannot find a AHTx0")
        self._temp = None
        self._humidity = None

    def reset(self):
        """Perform a soft-reset of the AHT"""
        self._buf[0] = AHTX0_CMD_SOFTRESET
        self._i2c.writeto(self._address, self._buf[0:1])
        utime.sleep_ms(20)  # 20ms delay to wake up

    def initialize(self):
        """Ask the sensor to self-initialize. Returns True on success, False otherwise"""
        self._buf[0] = AHTX0_CMD_INITIALIZE
        self._buf[1] = 0x08
        self._buf[2] = 0x00
        self._i2c.writeto(self._address, self._buf[0:3])
        self._wait_for_idle()
        if not self.status() & AHTX0_STATUS_CALIBRATED:
            return False
        return True

    def status(self):
        """The status byte initially returned from the sensor, see datasheet for details"""
        self._read_to_buffer()
        return self._buf[0]

    def _read_to_buffer(self):
        self._i2c.readfrom_into(self._address, self._buf)
    
    def _trigger_measurement(self):
        """Internal function for triggering the AHT to read temp/humidity"""
        self._buf[0] = AHTX0_CMD_TRIGGER
        self._buf[1] = 0x33
        self._buf[2] = 0x00
        self._i2c.writeto(self._address, self._buf[0:3])

    def _wait_for_idle(self):
        while self.status() & AHTX0_STATUS_BUSY:
            utime.sleep_ms(5)

    def _perform_measurement(self):
        self._trigger_measurement()
        self._wait_for_idle()
        self._read_to_buffer()

    def humidity(self):
        """The measured relative humidity in percent."""
        self._perform_measurement()
        self._humidity = (self._buf[1] << 12) | (self._buf[2] << 4) | (self._buf[3] >> 4)
        self._humidity = (self._humidity * 100) / 0x100000
        return self._humidity

    def temperature(self):
        """The measured temperature in degrees Celcius."""
        self._perform_measurement()
        self._temp = ((self._buf[3] & 0xF) << 16) | (self._buf[4] << 8) | self._buf[5]
        self._temp = ((self._temp * 200.0) / 0x100000) - 50
        return self._temp