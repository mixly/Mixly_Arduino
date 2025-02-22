"""
TM1931-

Micropython	library for the TM1931 (18 channel IO port extension)
=======================================================

#Preliminary composition	  	    			20220614

dahanzimin From the Mixly Team
"""

import time
import framebuf
from machine import UART
from micropython import const

_TM1931_ADDRESS			= const(0x54)
_TM1931_REG_SSD			= const(0x00)		
_TM1931_REG_UPD			= const(0x16)		
_TM1931_REG_RST		    = const(0x17)      

class TM1931:
	def __init__(self, i2c_bus, addr=_TM1931_ADDRESS):
		self._i2c=i2c_bus
		self._addr = addr
		self._duty = bytearray(18)	
		self.reset()
		
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._i2c.writeto_mem(self._addr,reg,val.to_bytes(1, 'little'))
	
	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._i2c.readfrom_mem(self._addr, reg, nbytes)[0] if nbytes<=1 else self._i2c.readfrom_mem(self._addr, reg, nbytes)[0:nbytes]

	def work(self,start=True):
		"""Start and open all output channels"""
		self._wreg(_TM1931_REG_SSD,0x01& start)
		start=0xff if start else 0
		for i in range(0x13,0x16,1):
			self._wreg(i,start)

	def update(self):
		"""Load PWM register and LED control register data"""
		self._wreg(_TM1931_REG_UPD,0xff)
	
	def reset(self):
		"""Reset all registers to default state"""
		self._wreg(_TM1931_REG_RST,0x00)
		self.work(True)

	def duty(self,index):
		"""Obtain PWM duty cycle"""
		if not 1 <= index <= 18:
			raise ValueError("Port must be a number in the range: 1-18")
		return self._duty[index-1]
 
	def pwm(self,index,duty):
		"""18 channel PWM duty cycle data register"""
		if not 0 <= duty <= 255:
			raise ValueError("Duty must be a number in the range: 0-255")
		if not 1 <= index <= 18:
			raise ValueError("Port must be a number in the range: 1-18")
		self._duty[index-1]	= duty
		self._wreg(index,duty)
		self.update()
