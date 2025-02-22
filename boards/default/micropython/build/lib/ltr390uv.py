"""
LTR-390UV

Micropython library for the LTR-390UV(ALS+UV)
=======================================================

#Preliminary composition       			20240120

@dahanzimin From the Mixly Team 
"""
import time
from micropython import const

_LTR390_ADDRESS		= const(0x53)
_LTR390_REG_CTRL	= const(0x00)
_LTR390_REG_MEAS	= const(0x04) 
_LTR390_REG_GAIN	= const(0x05)
_LTR390_REG_ID		= const(0x06)
_LTR390_REG_ALS		= const(0x0D)
_LTR390_REG_UVS		= const(0x10)

_RATE_DEFAULT		= const(0x02)	#100ms
_RESOLUTION_20BIT	= (0<<4, 4)
_RESOLUTION_19BIT	= (1<<4, 2)
_RESOLUTION_18BIT 	= (2<<4, 1)
_RESOLUTION_17BIT	= (3<<4, 0.5)
_RESOLUTION_16BIT	= (4<<4, 0.25)
_RESOLUTION_13BIT	= (5<<4, 0.125)

_GAIN_X1	= (0, 1)
_GAIN_X3	= (1, 3)
_GAIN_X6	= (2, 6)
_GAIN_X9	= (3, 9)
_GAIN_X18	= (4, 18)

class ALS_UVS:
	def __init__(self, i2c_bus, addr=_LTR390_ADDRESS, gain=_GAIN_X1, resolution=_RESOLUTION_17BIT):
		self._device = i2c_bus
		self._address = addr
		self._gain = gain
		self._reso = resolution
		self._flaga = False
		self._flagu = False

		if self._rreg(_LTR390_REG_ID) != 0xB2:
			raise AttributeError("Cannot find a LTR-390UV")

		self._wreg(_LTR390_REG_MEAS, self._reso[0] | _RATE_DEFAULT)				
		self._wreg(_LTR390_REG_GAIN, self._gain[0])	
		
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def ultraviolet(self): 
		if not self._flagu:
			self._wreg(_LTR390_REG_CTRL, 0x0A)		#UVS in Active Mode	
			time.sleep_ms(int(self._reso[1] * 100))
			self._flagu = True
		self._flaga = False
		buf = self._rreg(_LTR390_REG_UVS, 3)
		return buf[2] << 16 | buf[1] << 8 | buf[0]

	def ambient_light(self):
		if not self._flaga: 
			self._wreg(_LTR390_REG_CTRL, 0x02)		#ALS in Active Mode	
			time.sleep_ms(int(self._reso[1] * 100))
			self._flaga = True
		self._flagu = False	
		buf = self._rreg(_LTR390_REG_ALS, 3)
		return 0.6 * (buf[2] << 16 | buf[1] << 8 | buf[0]) / (self._gain[1] * self._reso[1])
