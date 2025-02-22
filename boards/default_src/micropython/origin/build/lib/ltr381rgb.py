"""
LTR-381RGB-XX

MicroPython library for the LTR-381RGB-XX (Color sensor)
=======================================================

#Preliminary composition       			20230417

@dahanzimin From the Mixly Team
"""
import time
from micropython import const

LTR_MAIN_CTRL			= const(0x00)
LTR_ALS_CS_MEAS_RATE	= const(0x04)
LTR_ALS_CS_GAIN			= const(0x05)
LTR_PART_ID				= const(0x06)
LTR_MAIN_STATUS			= const(0x07)
LTR_CS_DATA				= const(0x0A)
		   #1x 3x 6x 9x 18x
_GAINS_X = (1, 3, 6, 9, 18)

class LTR_381RGB:
	def __init__(self, i2c_bus, addr=0x53, gain=1):
		self._device  =  i2c_bus
		self._address = addr
		self._gain = gain
		self._color = [0, 0, 0]
		self._ir = 0
		self._als = 0

		if (self._chip_id() & 0xF0) != 0xC0:
			raise AttributeError("Cannot find a LTR-381RGB")
		
		self._configure()
		time.sleep(0.1)
	
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))
	
	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self): 
		'''Proofreading device ID'''	
		return self._rreg(LTR_PART_ID)
		
	def _configure(self):
		'''Configuration Register'''
		self._wreg(LTR_MAIN_CTRL, 0x06)					#CS mode & ALS/CS Enable
		self._wreg(LTR_ALS_CS_MEAS_RATE, 0x22)			#Resolution = 18 bit, Meas Rate =100ms
		self._wreg(LTR_ALS_CS_GAIN,	self._gain & 0x07)	#CS measurement Gain Range
	
	def status(self):
		'''Data conversion status'''
		return self._rreg(LTR_MAIN_STATUS) & 0x08

	def getdata(self):
		'''Processing data acquisition'''
		if self.status():
			_buf=self._rreg(LTR_CS_DATA, 12)
			self._ir = _buf[2] << 16 | _buf[1] << 8 | _buf[0]
			self._color [1] = _buf[5] << 16 | _buf[4] << 8 | _buf[3]
			self._color [0] = _buf[8] << 16 | _buf[7] << 8 | _buf[6]
			self._color [2] = _buf[11] << 16 | _buf[10] << 8 | _buf[9]
			self._als = 0.8 * self._color [1] * (1 - 0.033 * self._ir / self._color [1]) / _GAINS_X[self._gain]
		return round(self._als, 2), self._ir, self._color 

	def color(self):	
		return self.getdata()[2]

	def ir(self):	
		return self.getdata()[1]

	def als(self):	
		return self.getdata()[0]
