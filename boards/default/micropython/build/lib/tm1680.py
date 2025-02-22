"""
TM1680

library for the TM1680 Matrix32x12
=======================================================

#Preliminary composition					20230412

@dahanzimin From the Mixly Team
"""
import uframebuf
from micropython import const

TM1680_SYS_EN			= const(0x81)
TM1680_LED_ON			= const(0x83)
TM1680_COM_16N			= const(0xA4)

class TM1680(uframebuf.FrameBuffer_Uincode):
	def __init__(self, i2c, address=0x72, brightness=0.3, width=32, height=12):
		self._device= i2c
		self._address = address	
		self._blink_rate=0
		self._brightness=brightness		
		self._buffer = bytearray((width + 7) // 8 * height)
		super().__init__(self._buffer, width, height, uframebuf.MONO_HMSB)
		self._write_cmd(TM1680_SYS_EN)	 #打开系统振荡器
		self._write_cmd(TM1680_LED_ON)	 #开启 LED 循环
		self._write_cmd(TM1680_COM_16N)	 #16COM Nmos
		self.blink_rate(0)
		self.set_brightness(brightness)
		self.fill(0)
		self.show()

	def _write_cmd(self, val):
		'''I2C write command'''
		self._device.writeto(self._address,val.to_bytes(1, 'little'))

	def blink_rate(self, rate=None):
		if rate is None:
			return self._blink_rate
		if not 0 <= rate <= 3:
			raise ValueError("Blink rate must be an integer in the range: 0-3")
		rate = rate & 0x03
		self._blink_rate = rate
		self._write_cmd(0x88 | rate)

	def get_brightness(self):
		return self._brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
		self._brightness = brightness
		xbright = round(15 * brightness)
		xbright = xbright & 0x0F
		self._write_cmd(0xB0 | xbright)

	def show(self):
		"""Refresh the display and show the changes."""
		tm_buffer = bytearray(48)
		for i in range(len(self._buffer)):
			if i<24:	#Convert the buffer content according to the address of tm1680 
				tm_buffer[i]=self._buffer[i*2-1] if i%2  else self._buffer[i*2] 
			else:
				tm_buffer[i]=self._buffer[(i-23)*2-1] if i%2  else self._buffer[(i-23)*2] 
						#Convert the high and low 4 bits of the address content
			tm_buffer[i]= (tm_buffer[i]>>4) | (tm_buffer[i] <<4)
		self._device.writeto_mem(self._address,0x00,tm_buffer)
