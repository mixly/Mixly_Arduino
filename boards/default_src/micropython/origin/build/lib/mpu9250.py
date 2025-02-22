"""
MicroPython I2C driver for MPU9250 9-axis motion tracking device
"""
from micropython import const
import ustruct
import time
import math
from machine import Pin,SoftI2C

_GYRO_CONFIG = const(0x1b)
_ACCEL_CONFIG = const(0x1c)
_ACCEL_CONFIG2 = const(0x1d)
_INT_PIN_CFG = const(0x37)
_ACCEL_XOUT_H = const(0x3b)
_ACCEL_XOUT_L = const(0x3c)
_ACCEL_YOUT_H = const(0x3d)
_ACCEL_YOUT_L = const(0x3e)
_ACCEL_ZOUT_H = const(0x3f)
_ACCEL_ZOUT_L= const(0x40)
_TEMP_OUT_H = const(0x41)
_TEMP_OUT_L = const(0x42)
_GYRO_XOUT_H = const(0x43)
_GYRO_XOUT_L = const(0x44)
_GYRO_YOUT_H = const(0x45)
_GYRO_YOUT_L = const(0x46)
_GYRO_ZOUT_H = const(0x47)
_GYRO_ZOUT_L = const(0x48)
_WHO_AM_I = const(0x75)

#_ACCEL_FS_MASK = const(0b00011000)
ACCEL_FS_SEL_2G = const(0b00000000)
ACCEL_FS_SEL_4G = const(0b00001000)
ACCEL_FS_SEL_8G = const(0b00010000)
ACCEL_FS_SEL_16G = const(0b00011000)

_ACCEL_SO_2G = 16384 # 1 / 16384 ie. 0.061 mg / digit
_ACCEL_SO_4G = 8192 # 1 / 8192 ie. 0.122 mg / digit
_ACCEL_SO_8G = 4096 # 1 / 4096 ie. 0.244 mg / digit
_ACCEL_SO_16G = 2048 # 1 / 2048 ie. 0.488 mg / digit

#_GYRO_FS_MASK = const(0b00011000)
GYRO_FS_SEL_250DPS = const(0b00000000)
GYRO_FS_SEL_500DPS = const(0b00001000)
GYRO_FS_SEL_1000DPS = const(0b00010000)
GYRO_FS_SEL_2000DPS = const(0b00011000)

_GYRO_SO_250DPS = 131
_GYRO_SO_500DPS = 62.5
_GYRO_SO_1000DPS = 32.8
_GYRO_SO_2000DPS = 16.4

# Used for enablind and disabling the i2c bypass access
_I2C_BYPASS_MASK = const(0b00000010)
_I2C_BYPASS_EN = const(0b00000010)
_I2C_BYPASS_DIS = const(0b00000000)

SF_G = 1
SF_M_S2 = 9.80665 # 1 g = 9.80665 m/s2 ie. standard gravity
SF_DEG_S = 1
SF_RAD_S = 57.295779578552 # 1 rad/s is 57.295779578552 deg/s


_WIA = const(0x00)
_HXL = const(0x03)
_HXH = const(0x04)
_HYL = const(0x05)
_HYH = const(0x06)
_HZL = const(0x07)
_HZH = const(0x08)
_ST2 = const(0x09)
_CNTL1 = const(0x0a)
_ASAX = const(0x10)
_ASAY = const(0x11)
_ASAZ = const(0x12)

_MODE_POWER_DOWN = 0b00000000
MODE_SINGLE_MEASURE = 0b00000001
MODE_CONTINOUS_MEASURE_1 = 0b00000010 # 8Hz
MODE_CONTINOUS_MEASURE_2 = 0b00000110 # 100Hz
MODE_EXTERNAL_TRIGGER_MEASURE = 0b00000100
_MODE_SELF_TEST = 0b00001000
_MODE_FUSE_ROM_ACCESS = 0b00001111

OUTPUT_14_BIT = 0b00000000
OUTPUT_16_BIT = 0b00010000

_SO_14BIT = 0.6 #  per digit when 14bit mode
_SO_16BIT = 0.15 #  per digit when 16bit mode

class MPU6500:
	"""Class which provides interface to MPU6500 6-axis motion tracking device."""
	def __init__(
		self, i2c, address=0x68,
		accel_fs=ACCEL_FS_SEL_2G, gyro_fs=GYRO_FS_SEL_250DPS,
		accel_sf=SF_M_S2, gyro_sf=SF_RAD_S
	):
		self.i2c = i2c
		self.address = address

		if 0x71 != self.whoami:
			raise RuntimeError("MPU9250 not found in I2C bus.")

		self._accel_so = self._accel_fs(accel_fs)
		self._gyro_so = self._gyro_fs(gyro_fs)
		self._accel_sf = accel_sf
		self._gyro_sf = gyro_sf

		# Enable I2C bypass to access for MPU9250 magnetometer access.
		char = self._register_char(_INT_PIN_CFG)
		char &= ~_I2C_BYPASS_MASK # clear I2C bits
		char |= _I2C_BYPASS_EN
		self._register_char(_INT_PIN_CFG, char)
		
	@property
	def temperature(self):
		tempbuf=self._register_short(0x41)
		return tempbuf/333.87 + 21  # I think
		
	# @property
	def acceleration(self):
		so = self._accel_so
		sf = self._accel_sf

		xyz = self._register_three_shorts(_ACCEL_XOUT_H)
		return tuple([value / so * sf for value in xyz])

	@property
	def gyro(self):
		"""	X, Y, Z radians per second as floats."""
		so = self._gyro_so
		sf = self._gyro_sf

		xyz = self._register_three_shorts(_GYRO_XOUT_H)
		return tuple([value / so * sf for value in xyz])

	@property
	def whoami(self):
		""" Value of the whoami register. """
		return self._register_char(_WHO_AM_I)

	def _register_short(self, register, value=None, buf=bytearray(2)):
		if value is None:
			self.i2c.readfrom_mem_into(self.address, register, buf)
			return ustruct.unpack(">h", buf)[0]

		ustruct.pack_into(">h", buf, 0, value)
		return self.i2c.writeto_mem(self.address, register, buf)

	def _register_three_shorts(self, register, buf=bytearray(6)):
		self.i2c.readfrom_mem_into(self.address, register, buf)
		return ustruct.unpack(">hhh", buf)

	def _register_char(self, register, value=None, buf=bytearray(1)):
		if value is None:
			self.i2c.readfrom_mem_into(self.address, register, buf)
			return buf[0]

		ustruct.pack_into("<b", buf, 0, value)
		return self.i2c.writeto_mem(self.address, register, buf)

	def _accel_fs(self, value):
		self._register_char(_ACCEL_CONFIG, value)

		# Return the sensitivity divider
		if ACCEL_FS_SEL_2G == value:
			return _ACCEL_SO_2G
		elif ACCEL_FS_SEL_4G == value:
			return _ACCEL_SO_4G
		elif ACCEL_FS_SEL_8G == value:
			return _ACCEL_SO_8G
		elif ACCEL_FS_SEL_16G == value:
			return _ACCEL_SO_16G

	def _gyro_fs(self, value):
		self._register_char(_GYRO_CONFIG, value)

		# Return the sensitivity divider
		if GYRO_FS_SEL_250DPS == value:
			return _GYRO_SO_250DPS
		elif GYRO_FS_SEL_500DPS == value:
			return _GYRO_SO_500DPS
		elif GYRO_FS_SEL_1000DPS == value:
			return _GYRO_SO_1000DPS
		elif GYRO_FS_SEL_2000DPS == value:
			return _GYRO_SO_2000DPS

	def __enter__(self):
		return self

	def __exit__(self, exception_type, exception_value, traceback):
		pass

class AK8963:
	"""Class which provides interface to AK8963 magnetometer."""
	def __init__(
		self, i2c, address=0x0c,
		mode=MODE_CONTINOUS_MEASURE_1, output=OUTPUT_16_BIT,
		offset=(0, 0, 0), scale=(1, 1, 1)
	):
		self.i2c = i2c
		self.address = address
		self._offset = offset
		self._scale = scale

		if 0x48 != self.whoami:
			raise RuntimeError("MPU9250 not found in I2C bus.")

		# Sensitivity adjustement values
		self._register_char(_CNTL1, _MODE_FUSE_ROM_ACCESS)
		asax = self._register_char(_ASAX)
		asay = self._register_char(_ASAY)
		asaz = self._register_char(_ASAZ)
		self._register_char(_CNTL1, _MODE_POWER_DOWN)

		# Should wait atleast 100us before next mode
		self._adjustement = (
			(0.5 * (asax - 128)) / 128 + 1,
			(0.5 * (asay - 128)) / 128 + 1,
			(0.5 * (asaz - 128)) / 128 + 1
		)

		# Power on
		self._register_char(_CNTL1, (mode | output))

		if output is OUTPUT_16_BIT:
			self._so = _SO_16BIT
		else:
			self._so = _SO_14BIT
	
	
	@property
	def magnetic(self):
		"""
		X, Y, Z axis micro-Tesla (uT) as floats.
		"""
		xyz = list(self._register_three_shorts(_HXL))
		self._register_char(_ST2) # Enable updating readings again

		# Apply factory axial sensitivy adjustements
		xyz[0] *= self._adjustement[0]
		xyz[1] *= self._adjustement[1]
		xyz[2] *= self._adjustement[2]

		# Apply output scale determined in constructor
		so = self._so
		xyz[0] *= so
		xyz[1] *= so
		xyz[2] *= so

		# Apply hard iron ie. offset bias from calibration
		xyz[0] -= self._offset[0]
		xyz[1] -= self._offset[1]
		xyz[2] -= self._offset[2]

		# Apply soft iron ie. scale bias from calibration
		xyz[0] *= self._scale[0]
		xyz[1] *= self._scale[1]
		xyz[2] *= self._scale[2]

		return tuple(xyz)

	@property
	def adjustement(self):
		return self._adjustement

	@property
	def whoami(self):
		""" Value of the whoami register. """
		return self._register_char(_WIA)

	def calibrate(self, count=3, delay=200):
		self._offset = (0, 0, 0)
		self._scale = (1, 1, 1)

		reading = self.magnetic
		minx = maxx = reading[0]
		miny = maxy = reading[1]
		minz = maxz = reading[2]

		while count:
			time.sleep_ms(delay)
			reading = self.magnetic
			minx = min(minx, reading[0])
			maxx = max(maxx, reading[0])
			miny = min(miny, reading[1])
			maxy = max(maxy, reading[1])
			minz = min(minz, reading[2])
			maxz = max(maxz, reading[2])
			count -= 1


		# Hard iron correction
		offset_x = (maxx + minx) / 2
		offset_y = (maxy + miny) / 2
		offset_z = (maxz + minz) / 2

		self._offset = (offset_x, offset_y, offset_z)

		# Soft iron correction
		avg_delta_x = (maxx - minx) / 2
		avg_delta_y = (maxy - miny) / 2
		avg_delta_z = (maxz - minz) / 2

		avg_delta = (avg_delta_x + avg_delta_y + avg_delta_z) / 3

		scale_x = avg_delta / avg_delta_x
		scale_y = avg_delta / avg_delta_y
		scale_z = avg_delta / avg_delta_z

		self._scale = (scale_x, scale_y, scale_z)

		return self._offset, self._scale

	def _register_short(self, register, value=None, buf=bytearray(2)):
		if value is None:
			self.i2c.readfrom_mem_into(self.address, register, buf)
			return ustruct.unpack("<h", buf)[0]

		ustruct.pack_into("<h", buf, 0, value)
		return self.i2c.writeto_mem(self.address, register, buf)

	def _register_three_shorts(self, register, buf=bytearray(6)):
		self.i2c.readfrom_mem_into(self.address, register, buf)
		return ustruct.unpack("<hhh", buf)

	def _register_char(self, register, value=None, buf=bytearray(1)):
		if value is None:
			self.i2c.readfrom_mem_into(self.address, register, buf)
			return buf[0]

		ustruct.pack_into("<b", buf, 0, value)
		return self.i2c.writeto_mem(self.address, register, buf)

	def __enter__(self):
		return self

	def __exit__(self, exception_type, exception_value, traceback):
		pass
		

class MPU9250:
	"""Class which provides interface to MPU9250 9-axis motion tracking device."""
	def __init__(self, i2c, mpu6500 = None, ak8963 = None):
		if mpu6500 is None:
			self.mpu6500 = MPU6500(i2c)
		else:
			self.mpu6500 = mpu6500

		if ak8963 is None:
			self.ak8963 = AK8963(i2c)
		else:
			self.ak8963 = ak8963

	def mpu9250_get_temperature(self):
		return self.mpu6500.temperature
		
	def mpu9250_get_values(self):
		g = self.mpu6500.acceleration()
		a = [round(x/9.8, 2) for x in g]
		return tuple(a)

	def mpu9250_get_x(self):
		return round(self.mpu6500.acceleration()[0]/9.8, 2)
	
	def mpu9250_get_y(self):
		return round(self.mpu6500.acceleration()[1]/9.8, 2)

	def mpu9250_get_z(self):
		return round(self.mpu6500.acceleration()[2]/9.8, 2)

		   
	def mpu9250_is_gesture(self,choice):
		if choice == 'face up':
			if self.mpu6500.acceleration()[2] <= -9:
				return True
			else:
				return False
		if choice == 'face down':
			if self.mpu6500.acceleration()[2] >= 9:
				return True
			else:
				return False
		if choice == 'shake':
			if abs(self.mpu6500.acceleration()[0]) >= 9 and abs(self.mpu6500.acceleration()[1]) >= 9 :
				return True
			else:
				return False
		if choice == 'up':
			if self.mpu6500.acceleration()[1] >= 9:
				return True
			else:
				return False
		if choice == 'down':
			if self.mpu6500.acceleration()[1] <= -9:
				return True
			else:
				return False
		if choice == 'right':
			if self.mpu6500.acceleration()[0] <= -9:
				return True
			else:
				return False
		if choice == 'left':
			if self.mpu6500.acceleration()[0] >= 9:
				return True
			else:
				return False

	@property
	def mpu9250_gyro(self):
		return self.mpu6500.gyro

	def mpu9250_gyro_x(self):
		return self.mpu6500.gyro[0]

	def mpu9250_gyro_y(self):
		return self.mpu6500.gyro[1]

	def mpu9250_gyro_z(self):
		return self.mpu6500.gyro[2]

	def mpu9250_gyro_values(self):
		return self.mpu6500.gyro

	@property
	def mpu9250_magnetic(self):
		"""X, Y, Z axis micro-Tesla (uT) as floats."""
		return self.ak8963.magnetic

	def mpu9250_magnetic_x(self):
		return self.mpu9250_magnetic[0]

	def mpu9250_magnetic_y(self):
		return self.mpu9250_magnetic[1]

	def mpu9250_magnetic_z(self):
		return self.mpu9250_magnetic[2]

	def mpu9250_magnetic_values(self):
		return self.mpu9250_magnetic
		
	# @property
	def mpu9250_get_field_strength(self):
		x=self.mpu9250_magnetic[0]
		y=self.mpu9250_magnetic[1]
		z=self.mpu9250_magnetic[2]
		return (x**2+y**2+z**2)**0.5*1000

	def mpu9250_heading(self):
		x=self.mpu9250_magnetic[0]
		y=self.mpu9250_magnetic[1]
		z=self.mpu9250_magnetic[2]
		a=math.atan(z/x)
		b=math.atan(z/y)
		xr=x*math.cos(a)+y*math.sin(a)*math.sin(b)-z*math.cos(b)*math.sin(a)
		yr=x*math.cos(b)+z*math.sin(b)
		return 60*math.atan(yr/xr)

	@property
	def whoami(self):
		return self.mpu6500.whoami

	def __enter__(self):
		return self

	def __exit__(self, exception_type, exception_value, traceback):
		pass

class Compass:
	RAD_TO_DEG = 57.295779513082320876798154814105

	def __init__(self, sensor):
		self.sensor = sensor

	def get_x(self):
		return self.sensor.mpu9250_magnetic[0]

	def get_y(self):
		return self.sensor.mpu9250_magnetic[1]

	def get_z(self):
		return self.sensor.mpu9250_magnetic[2]

	def get_field_strength(self):
		return self.sensor.mpu9250_get_field_strength()

	def heading(self):
		from math import atan2
		xyz = self.sensor.mpu9250_magnetic
		return int(((atan2(xyz[1], xyz[0]) * Compass.RAD_TO_DEG) + 180) % 360)

	def calibrate(self):
		import matrix16x8
		mp_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)
		mp_matrix = matrix32x12.Matrix(mp_i2c) 
		if self.is_calibrate() is False:
			# print('The calibration need to shaking in the air (e.g. 8 or 0) and waiting for a moment')
			print('First write 8 or 0 in the air with the board about 30 seconds, and then try to rotate the board in different direnctions several times.')
			mp_matrix.pixel(7, 3, 1)
			#mp_matrix.blink_rate(2)
			l1=0
			l2=0
			l3=0
			l4=0
			l5=0
			l6=0
			l7=0
			l8=0
			while True:
				x = self.sensor.mpu6500.acceleration()[0]
				y = self.sensor.mpu6500.acceleration()[1]
				z = self.sensor.mpu6500.acceleration()[2]
				a=(x**2+y**2+z**2)**0.5
				if z > 0:
					if x > 0 and y > 0 and a >= 12:
						l1=l1 + 1
					if x > 0 and y < 0 and a >= 12:
						l2=l2 + 1
					if x < 0 and y > 0 and a >= 12:
						l3=l3 + 1
					if x < 0 and y < 0 and a >= 12:
						l4=l4 + 1
				if z < 0:
					if x > 0 and y > 0 and a >= 12:
						l5=l5 + 1
					if x > 0 and y < 0 and a >= 12:
						l6=l6 + 1
					if x < 0 and y > 0 and a >= 12:
						l7=l7 + 1
					if x < 0 and y < 0 and a >= 12:
						l8=l8 + 1
				if l1 >= 2:
					mp_matrix.pixel(7, 0, 1)
					mp_matrix.pixel(8, 0, 1)
					mp_matrix.pixel(9, 1, 1)
				if l2 >= 2:
					mp_matrix.pixel(10, 2, 1)
					mp_matrix.pixel(10, 3, 1)
				if l3 >= 2:
					mp_matrix.pixel(10, 4, 1)
					mp_matrix.pixel(10, 5, 1)
				if l4 >= 2:
					mp_matrix.pixel(9, 6, 1)
					mp_matrix.pixel(8, 7, 1)
				if l5 >= 2:
					mp_matrix.pixel(7, 7, 1)
					mp_matrix.pixel(6, 7, 1)
				if l6 >= 2:
					mp_matrix.pixel(5, 6, 1)
					mp_matrix.pixel(4, 5, 1)
				if l7 >= 2:
					mp_matrix.pixel(4, 4, 1)
					mp_matrix.pixel(4, 3, 1)
				if l8 >= 2:
					mp_matrix.pixel(4, 2, 1)
					mp_matrix.pixel(5, 1, 1)
					mp_matrix.pixel(6, 0, 1)
				if l1>=2 and l2>=2 and l3>=2 and l4>=2 and l5>=2 and l6>=2 and l7>=2 and l8>=2:
					break    
				else:
					self.sensor.ak8963.calibrate()
					with open("compass_cfg.py", "w") as f:
						f.write('\n_offset = ' + str(self.sensor.ak8963._offset) + '\n_scale = ' + str(self.sensor.ak8963._offset))
		else:
			print('The calibration configuration already exists. If you need to recalibrate, enter os.remove("compass_cfg.py") in repl and restart')
			try:
				import compass_cfg
				self.sensor.ak8963._offset = compass_cfg._offset
				self.sensor.ak8963._scale = compass_cfg._scale
			except Exception as e:
				print('compass_cfg error! delete it, please.')
		with open("compass_cfg.py") as f:
			for line in f:
				print(line)

	def is_calibrate(self):
		try:
			import compass_cfg
			return True
		except Exception as e:
			return False

	def reset_calibrate(self):
		import os
		os.remove("compass_cfg.py")
