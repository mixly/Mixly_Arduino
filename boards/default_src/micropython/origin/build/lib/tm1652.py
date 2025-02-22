"""
TM1652-framebuf

Micropython	library for the TM1652 Matrix8x5
=======================================================

#Preliminary composition	  	    20230126

@dahanzimin From the Mixly Team
"""
import time
import uframebuf
from machine import Pin
from micropython import const

_TM1652_REG_ADD	     = const(0x08)		#Display address command
_TM1652_REG_CMD	     = const(0x18)		#Display control command
_TM1652_SET_CUR	     = const(0x04)      #LED current setting 3/8 

class TM1652(uframebuf.FrameBuffer_Ascall):
	def __init__(self, pin, brightness=0.3, width=8, height=5):
		self.pin=Pin(pin,Pin.OUT)
		self.pin.value(1)	
		self._buffer = bytearray((width + 7) // 8 * height)	
		super().__init__(self._buffer, width, height, uframebuf.MONO_HMSB)	
		self.brightness = brightness
		self._brightness = None
		self.set_brightness(brightness)
		time.sleep_ms(5)
		self.fill(0)
		self.show()

	def _write_cmd(self, val):
		'''Serial write command'''
		falg=0
		#Start bit
		self.pin.value(1)
		time.sleep_us(15)
		self.pin.value(0)		
		time.sleep_us(30)
		#Data bits	
		for i in range(8):		
			if (val >> i) & 0x01:
				self.pin.value(1)
				falg+=1
			else:
				self.pin.value(0)
				falg+=0
			time.sleep_us(44)
		#Check bit
		self.pin.value(1) if  falg%2 == 0 else self.pin.value(0)
		time.sleep_us(50)
		#Stop bit
		self.pin.value(1)			
		time.sleep_us(15)

	def get_brightness(self):
		return round(self.brightness,2)

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0~1.0")
		self.brightness = brightness
		xbright = round(15 * brightness) 
		xbright = ((xbright & 0xA) >>1) | ((xbright & 0x5) <<1)
		xbright = ((xbright & 0xC) >>2) | ((xbright & 0x3) <<2)
		self._brightness = (xbright << 4) | _TM1652_SET_CUR		#高四位倒序|驱动电流

	def show(self):
		"""Refresh the display and show the changes."""
		for _ in range(2):
			self._write_cmd(_TM1652_REG_ADD)
			for i in range(5):
				self._write_cmd(self._buffer[i])
			time.sleep_ms(3)
			self._write_cmd(_TM1652_REG_CMD)
			self._write_cmd(self._brightness)
			time.sleep_ms(3)
