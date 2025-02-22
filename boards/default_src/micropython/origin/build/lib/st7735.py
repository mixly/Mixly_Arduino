"""
ST7735

MicroPython library for the ST7735(TFT-SPI)
=======================================================
#Preliminary composition       	20230822

@dahanzimin From the Mixly Team
"""
import time, uframebuf
from machine import Pin, PWM
from micropython import const

_CMD_SWRESET 	= const(0x01)
_CMD_SLPOUT  	= const(0x11)
_CMD_PTLON 		= const(0x12)
_CMD_NORON 		= const(0x13)
_CMD_INVOFF 	= const(0x20)
_CMD_INVON		= const(0x21)
_CMD_DISPOFF 	= const(0x28)
_CMD_DISPON 	= const(0x29)
_CMD_CASET 		= const(0x2A)
_CMD_RASET 		= const(0x2B)
_CMD_RAMWR 		= const(0x2C)
_CMD_RAMRD 		= const(0x2E)
_CMD_PTLAR 		= const(0x30)
_CMD_COLMOD 	= const(0x3A)
_CMD_MADCTL		= const(0x36)
_CMD_FRMCTR1 	= const(0xB1)
_CMD_FRMCTR2 	= const(0xB2)
_CMD_FRMCTR3 	= const(0xB3)
_CMD_INVCTR 	= const(0xB4)
_CMD_PWCTR1 	= const(0xC0)
_CMD_PWCTR2 	= const(0xC1)
_CMD_PWCTR3 	= const(0xC2)
_CMD_PWCTR4 	= const(0xC3)
_CMD_PWCTR5 	= const(0xC4)
_CMD_VMCTR1 	= const(0xC5)
_CMD_GMCTRP1 	= const(0xE0)
_CMD_GMCTRN1 	= const(0xE1)

class ST7735(uframebuf.FrameBuffer_Uincode):
	def __init__(self, spi, width, height, dc_pin=None, cs_pin=None, bl_pin=None, font_address=0x700000, rotation=0):
		self.spi = spi
		self.dc = Pin(dc_pin, Pin.OUT, value=1)
		self.cs = Pin(cs_pin, Pin.OUT, value=1)
		self._buffer = bytearray(width * height * 2)
		super().__init__(self._buffer, width, height, uframebuf.RGB565)
		self.font(font_address)
		self._init()
		self.rotation(rotation)
		self.fill(0)
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
			(_CMD_SWRESET, None, 100),
			(_CMD_SLPOUT, None, 200),
			(_CMD_FRMCTR1, b'\x01\x2c\x2d', 10),
			(_CMD_FRMCTR2, b'\x01\x2c\x2d', 10),
			(_CMD_FRMCTR3, b'\x01\x2c\x2d', 10),
			(_CMD_INVCTR, b'\x07', None),
			(_CMD_PWCTR1, b'\xa2\x02\x84', 10),
			(_CMD_PWCTR2, b'\xc5', None),
			(_CMD_PWCTR3, b'\x0a\x00', None),
			(_CMD_PWCTR4, b'\x8a\x2a', None),
			(_CMD_PWCTR5, b'\x8a\xee', None),
			(_CMD_VMCTR1, b'\x0e', None),
			(_CMD_GMCTRP1, b'\x02\x1c\x07\x12\x37\x32\x29\x2d\x29\x25\x2b\x39\x00\x01\x03\x10', None),
			(_CMD_GMCTRN1, b'\x03\x1d\x07\x06\x2e\x2c\x29\x2d\x2e\x2e\x37\x3f\x00\x00\x02\x10', None),
			(_CMD_COLMOD, b'\x05', 10),
			(_CMD_NORON, None, 10),
			(_CMD_DISPON, None, 200),
		]:
			self._write(cmd, data)
			if delay:
				time.sleep_us(delay)

	def rotation(self, rotation):
		self._write(_CMD_MADCTL, b'\x60') if rotation else self._write(_CMD_MADCTL, b'\xa0')
		self._write(_CMD_CASET, b'\x01\x01\x01\xa0')
		self._write(_CMD_RASET, b'\x02\x02\x02\x81')

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
		self._write(_CMD_RAMWR, self._buffer)
