"""
ST7789/FrameBuffer

MicroPython library for the ST7789(TFT-SPI)
=======================================================
#Preliminary composition       	20240110

@dahanzimin From the Mixly Team
"""
import time, uframebuf
from machine import Pin, PWM
from micropython import const

_CMD_SWRESET 		= const(0x01)
_CMD_SLPIN 			= const(0x10)
_CMD_SLPOUT 		= const(0x11)
_CMD_PTLON 			= const(0x12)
_CMD_NORON 			= const(0x13)
_CMD_INVOFF 		= const(0x20)
_CMD_INVON 			= const(0x21)
_CMD_DISPOFF 		= const(0x28)
_CMD_DISPON 		= const(0x29)
_CMD_CASET 			= const(0x2A)
_CMD_RASET 			= const(0x2B)
_CMD_RAMWR 			= const(0x2C)
_CMD_RAMRD 			= const(0x2E)
_CMD_PTLAR 			= const(0x30)
_CMD_VSCRDEF 		= const(0x33)
_CMD_COLMOD 		= const(0x3A)
_CMD_MADCTL 		= const(0x36)

class ST7789(uframebuf.FrameBuffer_Uincode):
	def __init__(self, spi, width, height, dc_pin=None, cs_pin=None, bl_pin=None, font_address=0x700000):
		if height != 240 or width not in [320, 240, 135]:
			raise ValueError("Unsupported display. 320x240, 240x240 and 135x240 are supported.")
		self.spi = spi
		self.dc = Pin(dc_pin, Pin.OUT, value=1)
		self.cs = Pin(cs_pin, Pin.OUT, value=1)
		self._buffer = bytearray(width * height * 2)
		super().__init__(self._buffer, width, height, uframebuf.RGB565)
		self.font(font_address)
		self._init()
		self.show()
		time.sleep_ms(100)
		self._brightness = 0.6 
		self.bl_led = PWM(Pin(bl_pin), duty_u16=int(self._brightness * 60000)) if bl_pin else None

	def _write(self, cmd, dat = None):
		self.cs.off()
		self.dc.off()
		self.spi.write(bytearray([cmd]))
		self.cs.on()
		if dat is not None:
			self.cs.off()
			self.dc.on()
			self.spi.write(dat)
			self.cs.on()

	def _init(self):
		"""Display initialization configuration"""
		for cmd, data, delay in [
			(_CMD_SWRESET, None, 150),
			(_CMD_SLPOUT, None, None),
			(_CMD_COLMOD, b'\x55', 50),
			(_CMD_MADCTL, b'\x60', 50),
			(_CMD_INVOFF, None, 10),
			(_CMD_NORON, None, 10),
			(_CMD_DISPON, None, 200),
		]:
			self._write(cmd, data)
			if delay:
				time.sleep_us(delay)

	def _write(self, command=None, data=None):
		"""SPI write to the device: commands and data."""
		if command is not None:
			self.cs.off()
			self.dc.off()
			self.spi.write(bytes([command]))
			self.cs.on()
		if data is not None:
			self.cs.off()
			self.dc.on()
			self.spi.write(data)
			self.cs.on()

	def get_brightness(self):
		return self._brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0~1.0")
		self._brightness = brightness
		self.bl_led.duty_u16(int(brightness*60000))

	def color(self, red, green=None, blue=None):
		"""	Convert red, green and blue values (0-255) into a 16-bit 565 encoding."""
		if green is None or blue is None:
			return red
		else:
			return (red & 0xf8) << 8 | (green & 0xfc) << 3 | blue >> 3

	def show(self):
		"""Refresh the display and show the changes."""
		self._write(_CMD_CASET, b'\x00\x00\x01\x3f')
		self._write(_CMD_RASET, b'\x00\x00\x00\xef')
		self._write(_CMD_RAMWR, self._buffer)
