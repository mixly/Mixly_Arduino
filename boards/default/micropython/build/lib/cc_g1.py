"""
CC_G1

Micropython	library for the CC_G1(Remote control handle)
=======================================================

#Preliminary composition	  	    			20231222

@dahanzimin From the Mixly Team
"""
from micropython import const
from machine import Pin,SoftI2C

_CC_G1_ADDRESS			= const(0x27)
_CC_G1_ID				= const(0x00)
_CC_G1_VBAT				= const(0x01)
_CC_G1_ADC				= const(0x03)
_CC_G1_KEY				= const(0x07)

class Handle:
	def __init__(self, i2c_bus, addr=_CC_G1_ADDRESS):
		self._i2c=i2c_bus
		self._addr = addr
		if self._rreg(_CC_G1_ID)!= 0x27:
			raise AttributeError("Cannot find a CC_G1")

	def _wreg(self, reg, val):
		'''Write memory address'''
		try:
			self._i2c.writeto_mem(self._addr, reg, val.to_bytes(1, 'little'))
		except:
			return 0 

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		try:
			self._i2c.writeto(self._addr, reg.to_bytes(1, 'little'))
			return  self._i2c.readfrom(self._addr, nbytes)[0] if nbytes<=1 else self._i2c.readfrom(self._addr, nbytes)[0:nbytes]
		except:
			return 0

	def read_bat(self, ratio=5/1023):
		'''Read battery power'''
		vbat = self._rreg(_CC_G1_VBAT)<<2 | self._rreg(_CC_G1_VBAT+1)>>6
		return round(vbat*ratio, 2)

	def read_joystick(self, ratio=100/1023):
		'''Read joystick'''
		y_axis = 1023 - (self._rreg(_CC_G1_ADC) << 2 | self._rreg(_CC_G1_ADC + 1) >> 6)
		x_axis = self._rreg(_CC_G1_ADC + 2 ) << 2 | self._rreg(_CC_G1_ADC + 3) >> 6
		return round(x_axis*ratio), round(y_axis*ratio)
	
	def read_key(self, index):
		'''Read key1~6'''
		if not 0 <= index <= 5:
			raise ValueError("The key number must be a number in the range: 0~5")
		if index<=4:
			return bool(self._rreg(_CC_G1_KEY) >> index & 0x01)
		else:
			return bool(self._rreg(_CC_G1_KEY) >> 7 & 0x01)

	def shutdown(self, flag=True):
		"""This function is only available on battery power"""
		if flag:
			self._wreg(_CC_G1_KEY, (self._rreg(_CC_G1_KEY)) & 0XBF)
		else:
			self._wreg(_CC_G1_KEY, (self._rreg(_CC_G1_KEY)) | 0X40)

'''Select instantiation objects'''
try:
	#MixGo CC/ME
	ext_i2c = SoftI2C(scl=Pin(0), sda=Pin(1), freq=100000)
	handle = Handle(ext_i2c)
except:
	try:
		#MixGo CE
		ext_i2c = SoftI2C(scl=Pin(17), sda=Pin(18), freq=100000)
		handle = Handle(ext_i2c)
	except:
		try:
			#MixGo 	Mini
			ext_i2c = SoftI2C(scl=Pin(8), sda=Pin(7), freq=100000)
			handle = Handle(ext_i2c)
		except:
			print("MixGo board cannot find a CC_G1")
