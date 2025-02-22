"""
QMC5883L

MicroPython library for the  QMC5883L 3-Axis Magnetic Sensor
=======================================================
#Preliminary composition       20220217

by https://github.com/RigacciOrg/py-qmc5883l.git

dahanzimin From the Mixly Team 
"""

import math
import time
from micropython import const

I2CADDR_DEFAULT			= const(0x0D)  		# Default I2C address

REG_XOUT_LSB			= const(0x00)  		# Output Data Registers for magnetic sensor.
REG_YOUT_LSB			= const(0x02)  		# Output Data Registers for magnetic sensor.
REG_ZOUT_LSB			= const(0x04)  		# Output Data Registers for magnetic sensor.
REG_STATUS_1			= const(0x06)  		# Status Register.
REG_TOUT_LSB			= const(0x07)  		# Output Data Registers for temperature.

REG_CONTROL_1			= const(0x09)  		# Reg to control mode of compass.
REG_CONTROL_2			= const(0x0A)  		# Reg to contro2 mode of compass.
REG_RST_PERIOD			= const(0x0B)  		# SET/RESET Period Register.
REG_CHIP_ID				= const(0x0D)  		# Chip ID register.

# Flags for Status Register #1.
STAT_DRDY				= const(0b00000001)  # Data Ready.
STAT_OVL 				= const(0b00000010)  # Overflow flag.
STAT_DOR				= const(0b00000100)  # Data skipped for reading.
# Flags for Status Register #2.
INT_ENB 				= const(0b00000001)  # Interrupt Pin Enabling.
SOFT_RST				= const(0b10000000)  # Soft Reset.
# Flags for Control Register 1.
MODE_STBY 				= const(0b00000000)  # Standby mode.
MODE_CONT				= const(0b00000001)  # Continuous read mode.
ODR_10HZ 				= const(0b00000000)  # Output Data Rate Hz.
ODR_50HZ				= const(0b00000100)  
ODR_100HZ 				= const(0b00001000) 
ODR_200HZ				= const(0b00001100)  
RNG_2G 					= const(0b00000000)  # Range 2 Gauss: for magnetic-clean environments.
RNG_8G					= const(0b00010000)  # Range 8 Gauss: for strong magnetic fields.
OSR_512 				= const(0b00000000)  # Over Sample Rate 512: less noise, more power.
OSR_256					= const(0b01000000)  
OSR_128					= const(0b10000000)  
OSR_64					= const(0b11000000)  

class Compass:

	def __init__(self,i2c_bus,ODR=ODR_200HZ,RNG=RNG_8G,OSR=OSR_512):
		self._device = i2c_bus
		self._address = I2CADDR_DEFAULT
		self.output_range = RNG
		self._declination = 0.0
		self._calibration = [[1.0, 0.0, 0.0],
							 [0.0, 1.0, 0.0],
							 [0.0, 0.0, 1.0]]
		self._device.scan()					 
		time.sleep(0.1)
		if self._read_byte(REG_CHIP_ID) != 0xFF:
			raise AttributeError("Cannot find a QMC5883L")
			
		self.mode_cont = (MODE_CONT | ODR	   | RNG	| OSR)
		self.mode_stby = (MODE_STBY | ODR_10HZ | RNG_2G | OSR_64)
		self.mode_continuous()

	def __del__(self):
		"""Once finished using the sensor, switch to standby mode."""
		self.mode_standby()

	def _write_byte(self, reg, val):
		"""Write memory address"""
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _read_byte(self, reg,nbytes=1):
		"""Read memory address"""
		return	self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]
		
	def mode_continuous(self):
		"""Set the device in continuous read mode."""
		self._write_byte(REG_CONTROL_2, SOFT_RST)  # Soft reset.
		self._write_byte(REG_CONTROL_2, INT_ENB)  # Disable interrupt.
		self._write_byte(REG_RST_PERIOD, 0x01)  # Define SET/RESET period.
		self._write_byte(REG_CONTROL_1, self.mode_cont)  # Set operation mode.

	def mode_standby(self):
		"""Set the device in standby mode."""
		self._write_byte(REG_CONTROL_2, SOFT_RST)
		self._write_byte(REG_CONTROL_2, INT_ENB)
		self._write_byte(REG_RST_PERIOD, 0x01)
		self._write_byte(REG_CONTROL_1, self.mode_stby)  # Set operation mode.

	def _read_word_2c(self, registry):
		"""Calculate the 2's complement of a two bytes value."""
		data=self._read_byte(registry,2)
		val = (data[1] << 8) | data[0]
		if val >= 0x8000:  # 32768
			return val - 0x10000  # 65536
		else:
			return val

	def ready(self):
		return self._read_byte(REG_STATUS_1)
		
	def get_data(self):
		"""Read data from magnetic and temperature data registers."""
		i = 0
		[x, y, z, t] = [None, None, None, 0]
		while i < 20:  # Timeout after about 0.20 seconds.
			status = self.ready()
			if status & STAT_OVL:
				# Some values have reached an overflow.
				if self.output_range == RNG_2G:
					raise AttributeError("Consider switching to RNG_8G output range")
				else:
					raise AttributeError("Magnetic sensor overflow")
			if status & STAT_DOR:
				# Previous measure was read partially, sensor in Data Lock.
				x = self._read_word_2c(REG_XOUT_LSB)
				y = self._read_word_2c(REG_YOUT_LSB)
				z = self._read_word_2c(REG_ZOUT_LSB)
				continue
			if status & STAT_DRDY:
				# Data is ready to read.
				x = self._read_word_2c(REG_XOUT_LSB)
				y = self._read_word_2c(REG_YOUT_LSB)
				z = self._read_word_2c(REG_ZOUT_LSB)
				t = self._read_word_2c(REG_TOUT_LSB)
				break
			else:
				# Waiting for DRDY.
				time.sleep(0.01)
				i += 1
		return [x, y, z, t/100+20]

	def get_magnet_raw(self):
		"""Get the 3 axis values from magnetic sensor."""
		[x, y, z, t] = self.get_data()
		return [x, y, z]

	def get_magnet(self):
		"""Return the horizontal magnetic sensor vector with (x, y) calibration applied."""
		[x, y, z] = self.get_magnet_raw()
		if x is None or y is None:
			[x1, y1] = [x, y]
		else:
			c = self._calibration
			x1 = x * c[0][0] + y * c[0][1] + c[0][2]
			y1 = x * c[1][0] + y * c[1][1] + c[1][2]
		return [x1, y1]

	def get_bearing_raw(self):
		"""Horizontal bearing (in degrees) from magnetic value X and Y."""
		[x, y, z] = self.get_magnet_raw()
		if x is None or y is None:
			return None
		else:
			b = math.degrees(math.atan2(y, x))
			if b < 0:
				b += 360.0
			return b

	def get_bearing(self):
		"""Horizontal bearing, adjusted by calibration and declination."""
		[x, y] = self.get_magnet()
		if x is None or y is None:
			return None
		else:
			b = math.degrees(math.atan2(y, x))
			if b < 0:
				b += 360.0
			b += self._declination
			if b < 0.0:
				b += 360.0
			elif b >= 360.0:
				b -= 360.0
		return round(b,2)

	def get_temp(self):
		"""Raw (uncalibrated) data from temperature sensor."""
		[x, y, z, t] = self.get_data()
		return t

	def set_declination(self, value):
		"""Set the magnetic declination, in degrees."""
		try:
			d = float(value)
			if d < -180.0 or d > 180.0:
				raise AttributeError('Declination must be >= -180 and <= 180')
			else:
				self._declination = d
		except:
			raise AttributeError('Declination must be a float value')

	def get_declination(self):
		"""Return the current set value of magnetic declination."""
		return self._declination

	def set_calibration(self, value):
		"""Set the 3x3 matrix for horizontal (x, y) magnetic vector calibration."""
		c = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]
		try:
			for i in range(0, 3):
				for j in range(0, 3):
					c[i][j] = float(value[i][j])
			self._calibration = c
		except:
			logging.error(u'Calibration must be a 3x3 float matrix.')

	def get_calibration(self):
		"""Return the current set value of the calibration matrix."""
		return self._calibration