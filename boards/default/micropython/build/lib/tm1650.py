"""
TM1650 for Four Digit LED Display

CircuitPython library for the TM1650
=======================================================

#Changed from circuitpython to micropython       20220216

dahanzimin From the Mixly Team 
"""
import time
from micropython import const


COMMAND_I2C_ADDRESS        = const(0x24)
DISPLAY_I2C_ADDRESS        = const(0x34)


buf = (0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F,0x77,0x7C,0x39,0x5E,0x79,0x71)

class TM1650:

	def __init__(self, i2c_bus):
		self.i2c = i2c_bus
		self._intensity = 2
		self.dbuf = [0, 0, 0, 0]
		self.tbuf = bytearray(1)
		self.on()
		
	def intensity(self, dat = -1):
		if dat < 0 or dat > 8:
			return self._intensity
		if dat == 0:
			self.off()
		else:
			self._intensity = dat
			self.cmd((dat<<4)|0x01)
			
	def cmd(self,command):
		self.tbuf[0]  = command &0xff
		self.i2c.writeto(COMMAND_I2C_ADDRESS, self.tbuf)
			
	def dat(self,bit, data):
		self.tbuf[0] = data&0xff
		self.i2c.writeto(DISPLAY_I2C_ADDRESS + bit%4, self.tbuf)

	def on(self):
		self.cmd((self._intensity<<4)|0x01)

	def off(self):
		self._intensity = 0
		self.cmd(0)

	def clear(self):
		self.dat(0, 0)
		self.dat(1, 0)
		self.dat(2, 0)
		self.dat(3, 0)
		self.dbuf = [0, 0, 0, 0]

	def showbit(self, num, bit = 0):
		self.dbuf[bit%4] = buf[num%16]
		self.dat(bit, buf[num%16])

	def shownum(self, num):
		if num < 0:
			self.dat(0, 0x40)   # '-'
			num = -num
		else:
			self.showbit((num // 1000) % 10)
		self.showbit(num % 10, 3)
		self.showbit((num // 10) % 10, 2)
		self.showbit((num // 100) % 10, 1)

	def showhex(self, num):
		if num < 0:
			self.dat(0, 0x40)   # '-'
			num = -num
		else:
			self.showbit((num >> 12) % 16)
		self.showbit(num % 16, 3)
		self.showbit((num >> 4) % 16, 2)
		self.showbit((num >> 8) % 16, 1)
        
	def showDP(self, bit = 1, show = True):
		if show:
			self.dat(bit, self.dbuf[bit] | 0x80)
		else:
			self.dat(bit, self.dbuf[bit] & 0x7F)
