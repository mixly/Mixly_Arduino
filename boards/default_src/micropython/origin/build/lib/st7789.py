"""
ST7789

MicroPython library for the ST7789(TFT-SPI)
=======================================================
#Preliminary composition       	20220830
#https://github.com/russhughes/st7789py_mpy

dahanzimin From the Mixly Team
"""

import time
from machine import Pin
from micropython import const
from uframebuf import Font_Uincode, Image
import ustruct as struct


ST7789_NOP = const(0x00)
ST7789_SWRESET = const(0x01)
ST7789_RDDID = const(0x04)
ST7789_RDDST = const(0x09)
ST7789_SLPIN = const(0x10)
ST7789_SLPOUT = const(0x11)
ST7789_PTLON = const(0x12)
ST7789_NORON = const(0x13)
ST7789_INVOFF = const(0x20)
ST7789_INVON = const(0x21)
ST7789_DISPOFF = const(0x28)
ST7789_DISPON = const(0x29)
ST7789_CASET = const(0x2A)
ST7789_RASET = const(0x2B)
ST7789_RAMWR = const(0x2C)
ST7789_RAMRD = const(0x2E)
ST7789_PTLAR = const(0x30)
ST7789_VSCRDEF = const(0x33)
ST7789_COLMOD = const(0x3A)
ST7789_MADCTL = const(0x36)
ST7789_VSCSAD = const(0x37)
ST7789_MADCTL_MY = const(0x80)
ST7789_MADCTL_MX = const(0x40)
ST7789_MADCTL_MV = const(0x20)
ST7789_MADCTL_ML = const(0x10)
ST7789_MADCTL_BGR = const(0x08)
ST7789_MADCTL_MH = const(0x04)
ST7789_MADCTL_RGB = const(0x00)
ST7789_RDID1 = const(0xDA)
ST7789_RDID2 = const(0xDB)
ST7789_RDID3 = const(0xDC)
ST7789_RDID4 = const(0xDD)
COLOR_MODE_65K = const(0x50)
COLOR_MODE_262K = const(0x60)
COLOR_MODE_12BIT = const(0x03)
COLOR_MODE_16BIT = const(0x05)
COLOR_MODE_18BIT = const(0x06)
COLOR_MODE_16M = const(0x07)

# Color definitions
BLACK = const(0x0000)
BLUE = const(0x001F)
RED = const(0xF800)
GREEN = const(0x07E0)
CYAN = const(0x07FF)
MAGENTA = const(0xF81F)
YELLOW = const(0xFFE0)
WHITE = const(0xFFFF)

_BUFFER_SIZE = const(256)

# Rotation tables (width, height, xstart, ystart)[rotation % 4]
WIDTH_320 = [(240, 320,  0,  0),(320, 240,  0,  0),(240, 320,  0,  0),(320, 240,  0,  0)]
WIDTH_240 = [(240, 240,  0,  0),(240, 240,  0,  0),(240, 240,  0, 80),(240, 240, 80,  0)]
WIDTH_135 = [(135, 240, 52, 40),(240, 135, 40, 53),(135, 240, 53, 40),(240, 135, 40, 52)]

ROTATIONS = [0x00, 0x60, 0xc0, 0xa0]

def color565(red, green=0, blue=0):
	"""	Convert red, green and blue values (0-255) into a 16-bit 565 encoding."""
	try:
		red, green, blue = red  # see if the first var is a tuple/list
	except TypeError:
		pass
	return (red & 0xf8) << 8 | (green & 0xfc) << 3 | blue >> 3

def _encode_pos(x, y):
	"""Encode a postion into bytes."""
	return struct.pack(">HH", x, y)

def _encode_pixel(color):
	"""Encode a pixel color into bytes."""
	return struct.pack(">H", color)

class ST7789():
	def __init__(self, spi, width, height, dc_pin=None,cs_pin=None, rotation=0, font_address=0x700000):
		if height != 240 or width not in [320, 240, 135]:
			raise ValueError("Unsupported display. 320x240, 240x240 and 135x240 are supported.")

		self._font= Font_Uincode(font_address)
		self._image= Image()
		self._display_width = self.width = width
		self._display_height = self.height = height
		self.xstart = 0
		self.ystart = 0
		self.spi = spi
		self.spi.init(polarity=1)
		self.dc = Pin(dc_pin, Pin.OUT)
		self.cs = Pin(cs_pin, Pin.OUT)
		self._rotation = rotation % 4
		self.soft_reset()
		self.sleep_mode(False)

		self._set_color_mode(COLOR_MODE_65K | COLOR_MODE_16BIT)
		time.sleep_ms(50)
		self.rotation(self._rotation)
		self.inversion_mode(True)
		time.sleep_ms(10)
		self._write(ST7789_NORON)
		time.sleep_ms(10)
		self.fill(0)
		self._write(ST7789_DISPON)
		time.sleep_ms(500)

	def _write(self, command=None, data=None):
		"""SPI write to the device: commands and data."""
		if self.cs:
			self.cs.off()
		if command is not None:
			self.dc.off()
			self.spi.write(bytes([command]))
		if data is not None:
			self.dc.on()
			self.spi.write(data)
			if self.cs:
				self.cs.on()

	def soft_reset(self):
		"""Soft reset display."""
		self._write(ST7789_SWRESET)
		time.sleep_ms(150)

	def sleep_mode(self, value):
		"""Enable or disable display sleep mode."""
		if value:
			self._write(ST7789_SLPIN)
		else:
			self._write(ST7789_SLPOUT)

	def inversion_mode(self, value):
		"""Enable or disable display inversion mode."""
		if value:
			self._write(ST7789_INVON)
		else:
			self._write(ST7789_INVOFF)

	def _set_color_mode(self, mode):
		"""	Set display color mode.	"""
		self._write(ST7789_COLMOD, bytes([mode & 0x77]))

	def rotation(self, rotation):
		"""Set display rotation."""
		rotation %= 4
		self._rotation = rotation
		madctl = ROTATIONS[rotation]

		if self._display_width == 320:
			table = WIDTH_320
		elif self._display_width == 240:
			table = WIDTH_240
		elif self._display_width == 135:
			table = WIDTH_135
		else:
			raise ValueError("Unsupported display. 320x240, 240x240 and 135x240 are supported.")
		self.width, self.height, self.xstart, self.ystart = table[rotation]
		self._write(ST7789_MADCTL, bytes([madctl]))

	def _set_columns(self, start, end):
		"""Send CASET (column address set) command to display."""
		if start <= end <= self.width:
			self._write(ST7789_CASET, _encode_pos(
				start+self.xstart, end + self.xstart))

	def _set_rows(self, start, end):
		"""Send RASET (row address set) command to display."""
		if start <= end <= self.height:
			self._write(ST7789_RASET, _encode_pos(
				start+self.ystart, end+self.ystart))

	def _set_window(self, x0, y0, x1, y1):
		"""Set window to column and row address."""
		self._set_columns(x0, x1)
		self._set_rows(y0, y1)
		self._write(ST7789_RAMWR)

	def vline(self, x, y, length, color):
		"""Draw vertical line at the given location and color."""
		self.fill_rect(x, y, 1, length, color)

	def hline(self, x, y, length, color):
		"""Draw horizontal line at the given location and color."""
		self.fill_rect(x, y, length, 1, color)

	def pixel(self, x, y, color):
		"""Draw a pixel at the given location and color."""
		self._set_window(x, y, x, y)
		pixel_color =_encode_pixel(color) if type(color)==int else _encode_pixel(color565(color))
		self._write(None, pixel_color)

	def blit_buffer(self, buffer, x, y, width, height):
		"""Copy buffer to display at the given location."""
		self._set_window(x, y, x + width - 1, y + height - 1)
		self._write(None, buffer)

	def rect(self, x, y, w, h, color):
		"""Draw a rectangle at the given location, size and color."""
		self.hline(x, y, w, color)
		self.vline(x, y, h, color)
		self.vline(x + w - 1, y, h, color)
		self.hline(x, y + h - 1, w, color)

	def fill_rect(self, x, y, width, height, color):
		"""Draw a rectangle at the given location, size and filled with color."""
		self._set_window(x, y, x + width - 1, y + height - 1)
		chunks, rest = divmod(width * height, _BUFFER_SIZE)
		pixel = _encode_pixel(color) if type(color)==int else _encode_pixel(color565(color))
		self.dc.on()
		if chunks:
			data = pixel * _BUFFER_SIZE
			for _ in range(chunks):
				self._write(None, data)
		if rest:
			self._write(None, pixel * rest)

	def fill(self, color):
		"""Fill the entire FrameBuffer with the specified color."""
		self.fill_rect(0, 0, self.width, self.height, color)

	def line(self, x0, y0, x1, y1, color):
		"""Draw a single pixel wide line starting at x0, y0 and ending at x1, y1."""
		steep = abs(y1 - y0) > abs(x1 - x0)
		if steep:
			x0, y0 = y0, x0
			x1, y1 = y1, x1
		if x0 > x1:
			x0, x1 = x1, x0
			y0, y1 = y1, y0
		dx = x1 - x0
		dy = abs(y1 - y0)
		err = dx // 2
		ystep = 1 if y0 < y1 else -1
		while x0 <= x1:
			if steep:
				self.pixel(y0, x0, color)
			else:
				self.pixel(x0, y0, color)
			err -= dy
			if err < 0:
				y0 += ystep
				err += dx
			x0 += 1

	def image(self,path, x=0, y=0, size=1, color=WHITE, invert=0):
		"""Set buffer to value of Python Imaging Library image"""
		size=max(round(size),1)
		if type(path) ==str :
			buffer_info,(width, height) = self._image.load(path,invert) 
		elif type(path) ==bytes:
			buffer_info,(width, height) =  self._image.load_py(path,invert)
		else:
			raise ValueError("invalid input")

		self.bitmap((buffer_info,(width, height)), x, y, size, color)   

	def bitmap(self,buffer, x=0, y=0, size=1, color=WHITE):
		"""Graphic model display(buffer,(width,height))""" 
		buffer_info,(width,height)=buffer	
		if x < -width*size or x >= self.width or y < -height*size or y >= self.height:        
			return            #Limit reasonable display area    				
		color_buffer = bytearray(0)
		byteWidth = int((width + 7) / 8)
		for j in range(height):
			for i in range(width):
				if buffer_info[int(j * byteWidth + i / 8)] & (0x80 >> (i & 7)):
					self.fill_rect(x+i*size, y+j*size, size, size, color)
						
	def _take_buffer(self,strs,space,size=1):
		'''Get character lattice information first'''
		font_buffer=[]
		font_len=0
		for c in strs:                    
			buffer=self._font.chardata(c)
			font_buffer.append(buffer)
			font_len=font_len+buffer[1][0]*size+space
		return font_len,font_buffer

	def shows(self,data,x=0,y=0,size=1,space=0,center=False, color=WHITE):
		"""Display character"""
		if data:
			size=max(round(size),1)
			font_len,font_buffer=self._take_buffer(str(data),space,size)
			x=(self.width-font_len+space)//2 if center else x
			#self.fill_rect(x-1,y-1,font_len+2,font_buffer[0][1][1]*size+2,0)
			for buffer in font_buffer:    #Display character
				self.bitmap(buffer,x,y,size,color)
				x=buffer[1][0]*size+x+space

	def frame(self, data, delay=500, size=5, color=WHITE):
		"""Display one frame per character"""
		if data:
			size=max(round(size),1)
			_,font_buffer=self._take_buffer(str(data),0)
			for buffer in font_buffer:
				x=(self.width - buffer[1][0]*size)//2 
				y=(self.height - buffer[1][1]*size)//2 
				self.fill_rect(x-1,y-1,buffer[1][0]*size+2,buffer[1][1]*size+2,0)
				self.bitmap(buffer,x,y,size,color)
				#self.show()
				time.sleep_ms(delay) 

	def scroll(self, data, y=0, size=1, space=0, speed=5, color=WHITE):
		"""Scrolling characters"""
		if data:
			size=max(round(size),1)
			font_len,font_buffer=self._take_buffer(str(data),space,size)
			for i in range(font_len-space+self.width):    
				x=-i+self.width
				self.fill_rect(x-1,y-1,self.width-x+2,font_buffer[0][1][1]*size+2,0)
				for buffer in font_buffer:
					self.bitmap(buffer,x,y,size,color)
					x=buffer[1][0]*size+x+space
				time.sleep_ms(speed)
