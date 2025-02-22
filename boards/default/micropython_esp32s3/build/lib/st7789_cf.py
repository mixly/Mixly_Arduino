"""
ST7789/FrameBuffer

MicroPython library for the ST7789(TFT-SPI)
=======================================================
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
	def __init__(self, spi, width, height, dc_pin=None,  backlight=None, font_address=0x700000):
		self.spi = spi
		self.dc = Pin(dc_pin, Pin.OUT, value=1)
		self._buffer = bytearray(width * height * 2)
		super().__init__(self._buffer, width, height, uframebuf.RGB565)
		self.font(font_address)
		self._init()
		self.show()
		self._backlight = backlight
		self.set_brightness(0.5)

	def _write(self, cmd, dat=None):
		self.dc.off()
		self.spi.write(bytearray([cmd]))
		if dat is not None:
			self.dc.on()
			self.spi.write(dat)

	def _init(self):
		"""Display initialization configuration"""
		for cmd, data, delay in [
			##(_CMD_SWRESET, None, 20000),
			(_CMD_SLPOUT, None, 120000),
			(_CMD_MADCTL, b'\x00', 50),
			(_CMD_COLMOD, b'\x05', 50),
			(0xB2, b'\x0c\x0c\x00\x33\x33', 10),
			(0xB7, b'\x35', 10),
			(0xBB, b'\x19', 10),
			(0xC0, b'\x2C', 10),
			(0xC2, b'\x01', 10),
			(0xC3, b'\x12', 10),
			(0xC4, b'\x20', 10),
			(0xC6, b'\x0F', 10),
			(0xD0, b'\xA4\xA1', 10),
			(0xE0, b'\xD0\x04\x0D\x11\x13\x2B\x3F\x54\x4C\x18\x0D\x0B\x1F\x23', 10),
			(0xE1, b'\xD0\x04\x0C\x11\x13\x2C\x3F\x44\x51\x2F\x1F\x1F\x20\x23', 10),
			(_CMD_INVON, None, 10),
			(_CMD_DISPON, None, 10),
		]:
			self._write(cmd, data)
			if delay:
				time.sleep_us(delay)

	def get_brightness(self):
		return self._backlight() / 100

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0~1.0")
		self._backlight(int(brightness * 100))

	def color(self, red, green=None, blue=None):
		"""	Convert red, green and blue values (0-255) into a 16-bit 565 encoding."""
		if green is None or blue is None:
			return red
		else:
			return (red & 0xf8) << 8 | (green & 0xfc) << 3 | blue >> 3

	def show(self):
		"""Refresh the display and show the changes."""
		self._write(_CMD_CASET, b'\x00\x00\x00\xef')
		self._write(_CMD_RASET, b'\x00\x00\x00\xef')
		self._write(_CMD_RAMWR, self._buffer)
