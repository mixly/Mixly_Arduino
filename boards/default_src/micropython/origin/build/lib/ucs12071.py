"""
UCS12071

MicroPython library for the UCS12071 (Color sensor)
=======================================================
@dahanzimin From the Mixly Team
"""
import time
from micropython import const

UCS_SYSM_CTRL			= const(0x00)
UCS_INT_FLAG			= const(0x02)
UCS_WAIT_TIME			= const(0x03)
UCS_CLS_GAIN			= const(0x04)
UCS_CLS_TIME			= const(0x05)
UCS_CLS_DATA			= const(0x1C)

_GAINS_X = (1, 4, 8, 32, 96, 192)

class UCS12071:
	def __init__(self, i2c_bus, addr=0x38, gain=2):
		self._device  =  i2c_bus
		self._address = addr
		self._gain = gain
		self._color = [0, 0, 0]
		self._ir = 0
		self._als = 0
		self._configure()

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _configure(self):
		'''Configuration Register'''
		#self._wreg(UCS_SYSM_CTRL, 0x80)					#Software reset
		self._wreg(UCS_SYSM_CTRL, 0x03)						#CLS & IR Enable
		self._wreg(UCS_CLS_GAIN, 1 << self._gain | 0x80)	#CLS sensing gain
		self._wreg(UCS_CLS_TIME, 0x03)						#CLSCONV INT_TIME
		self._wreg(UCS_WAIT_TIME, 0x00)						#10ms per time unit
	
	def status(self):
		'''Data conversion status'''
		return self._rreg(UCS_INT_FLAG) & 0x40

	def getdata(self):
		'''Processing data acquisition'''
		if not self.status():
			_buf = self._rreg(UCS_CLS_DATA, 10)
			self._color[0] = _buf[0] | _buf[1] << 8
			self._color[1] = _buf[2] | _buf[3] << 8
			self._color[2] = _buf[4] | _buf[5] << 8
			self._als = _buf[6] | _buf[7] << 8
			self._ir = _buf[8] | _buf[9] << 8
		return self._als, self._ir, self._color

	def color(self):
		w, _, (r, g, b) = self.getdata()
		if w == 0:
			return (0, 0, 0)
		else:
			red = int(pow((int((r / w) * 256) / 255), 2.5) * 255)
			green = int(pow((int((g / w) * 256) / 255), 2.5) * 255)
			blue = int(pow((int((b / w) * 256) / 255), 2.5) * 255)
			return (min(red, 255), min(green, 255), min(blue, 255))

	def color_raw(self):
		return self.getdata()[2]

	def ir(self):
		return round(self.getdata()[1] / _GAINS_X[self._gain])

	def als(self):
		return round(self.getdata()[0] / _GAINS_X[self._gain])
