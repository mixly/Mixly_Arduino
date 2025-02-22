"""
SC7A20

Micropython library for the SC7A20 Accelerometer
=================================================
#Preliminary composition               20240312

@dahanzimin From the Mixly Team 
"""
import time
from math import atan,sqrt,degrees
from micropython import const

SC7A20_ADDRESS		= const(0x19)
SC7A20_REG_ID		= const(0x0F)
SC7A20_REG_CTRL1	= const(0x20)
SC7A20_REG_CTRL2	= const(0x21)
SC7A20_REG_CTRL3	= const(0x22)
SC7A20_REG_CTRL4	= const(0x23)
SC7A20_REG_DATA		= const(0x28)

					#2g  4g  8g  16g			
_Range_X		= (1024,512,256,128)

class SC7A20:

	def __init__(self, i2c_bus, set_range=2, front=False):
		self._device = i2c_bus
		self._address = SC7A20_ADDRESS
		self._range = set_range     #default 8g range
		self._front = front

		if self._rreg(SC7A20_REG_ID) != 0x11:
			raise AttributeError("Cannot find a SC7A20")
		self._wreg(SC7A20_REG_CTRL1, 0X77)  #400HZ,xyz使能
		self._wreg(SC7A20_REG_CTRL2, 0X00)  #禁止高通滤波模式
		self._wreg(SC7A20_REG_CTRL3, 0X00)  #禁止中断
		self._wreg(SC7A20_REG_CTRL4, 0X00 | set_range << 4)  #连续更新,设置量程

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, 1)[0]

	def u2s(self, n):
		return n if n < (1 << 7) else n - (1 << 8)	

	@property
	def getdata(self): 
		x_acc = ((self.u2s(self._rreg(SC7A20_REG_DATA + 1)) << 8 | self._rreg(SC7A20_REG_DATA + 0)) >> 4) / _Range_X[self._range]
		y_acc = ((self.u2s(self._rreg(SC7A20_REG_DATA + 3)) << 8 | self._rreg(SC7A20_REG_DATA + 2)) >> 4) / _Range_X[self._range]
		z_acc = ((self.u2s(self._rreg(SC7A20_REG_DATA + 5)) << 8 | self._rreg(SC7A20_REG_DATA + 4)) >> 4) / _Range_X[self._range]
		return (-x_acc, y_acc, z_acc, None) if self._front else (x_acc, y_acc, z_acc, None)

	def acceleration(self): 
		return self.getdata[0:3]

	def strength(self): 
		from math import sqrt
		return sqrt(self.getdata[0]**2+self.getdata[1]**2+self.getdata[2]**2)

	def temperature(self): 
		return self.getdata[3]

	def eulerangles(self,upright=False): 
		x, y, z = self.acceleration()
		pitch = degrees(atan(z / sqrt(x ** 2 + y ** 2))) if upright else degrees(atan(y / sqrt(x ** 2 + z ** 2)))
		roll =  degrees(atan(x / sqrt(y ** 2 + z ** 2)))
		return round(pitch,2),round(roll,2)
