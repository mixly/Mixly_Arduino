"""
MINI_WCH

Micropython	library for the MINI_WCH(TOUCH*2, MIC*1, Buzzer*1, PWM*2, Matrix8x12, HID)
=======================================================
@dahanzimin From the Mixly Team
"""
import time, math
from esp import flash_read
from micropython import const
from framebuf import FrameBuffer, MONO_VLSB

_BOT035_ADDRESS		= const(0x13)
_BOT5_TOUCH			= const(0x01)
_BOT035_MIC			= const(0x05)
_BOT035_SPK			= const(0x07)
_BOT035_PWM			= const(0x0B)
_BOT035_FLAG		= const(0x0F)
_BOT035_LEDS		= const(0x10)
_BOT035_PGA			= const(0x20)
_BOT035_KB			= const(0x1C)
_BOT035_MS			= const(0x20)
_BOT035_STR			= const(0x24)
_BOT035_STA			= const(0x25)
_FONT_W				= const(5)
_FONT_H				= const(8)
_LEDS_W				= const(12)
_LEDS_H				= const(8)
_FONT5x8_CODE		= const(b'\x05\x08\x00\x00\x00\x00\x00\x00\x00_\x00\x00\x00\x07\x00\x07\x00\x14\x7f\x14\x7f\x14$*\x7f*\x12#\x13\x08db6IV P\x00\x08\x07\x03\x00\x00\x1c"A\x00\x00A"\x1c\x00*\x1c\x7f\x1c*\x08\x08>\x08\x08\x00\x80p0\x00\x08\x08\x08\x08\x08\x00\x00``\x00 \x10\x08\x04\x02>QIE>\x00B\x7f@\x00rIIIF!AIM3\x18\x14\x12\x7f\x10\'EEE9<JII1A!\x11\t\x076III6FII)\x1e\x00\x00\x14\x00\x00\x00@4\x00\x00\x00\x08\x14"A\x14\x14\x14\x14\x14\x00A"\x14\x08\x02\x01Y\t\x06>A]YN|\x12\x11\x12|\x7fIII6>AAA"\x7fAAA>\x7fIIIA\x7f\t\t\t\x01>AAQs\x7f\x08\x08\x08\x7f\x00A\x7fA\x00 @A?\x01\x7f\x08\x14"A\x7f@@@@\x7f\x02\x1c\x02\x7f\x7f\x04\x08\x10\x7f>AAA>\x7f\t\t\t\x06>AQ!^\x7f\t\x19)F&III2\x03\x01\x7f\x01\x03?@@@?\x1f @ \x1f?@8@?c\x14\x08\x14c\x03\x04x\x04\x03aYIMC\x00\x7fAAA\x02\x04\x08\x10 \x00AAA\x7f\x04\x02\x01\x02\x04@@@@@\x00\x03\x07\x08\x00 TTx@\x7f(DD88DDD(8DD(\x7f8TTT\x18\x00\x08~\t\x02\x18\xa4\xa4\x9cx\x7f\x08\x04\x04x\x00D}@\x00 @@=\x00\x7f\x10(D\x00\x00A\x7f@\x00|\x04x\x04x|\x08\x04\x04x8DDD8\xfc\x18$$\x18\x18$$\x18\xfc|\x08\x04\x04\x08HTTT$\x04\x04?D$<@@ |\x1c @ \x1c<@0@<D(\x10(DL\x90\x90\x90|DdTLD\x00\x086A\x00\x00\x00w\x00\x00\x00A6\x08\x00\x02\x01\x02\x04\x02<&#&<')
_Uincode_ADDR		= const(0x3A0000)

class BOT035(FrameBuffer):
	def __init__(self, i2c_bus, brightness=0.8):
		self._i2c= i2c_bus
		self._buffer = bytearray(12)
		self._brightness = brightness
		self._touchs = [self.touch(0), self.touch(1)]
		self._version = True if self._rreg(0x00) == 0x27 else False
		super().__init__(self._buffer, _LEDS_W, _LEDS_H, MONO_VLSB)
		self.reset()
		self.show()
	
	def _chardata(self, ch):
		'''Ascall code font reading data'''
		if  0x20 <= ord(ch) <= 0x7f:
			char_index = 2 + (ord(ch)-32) * _FONT_W 
			return _FONT5x8_CODE[char_index : char_index + _FONT_W]
		else:
			raise ValueError("Cannot display characters other than ASCLL code")

	def _uincode(self, ch):
		'''uincode code font reading data'''
		uni = ord(ch)
		if 0x20 <= uni <= 0x2642 :	
			_address = 0x28 + (uni - 0x20) * 4
		elif 0x3001 <= uni <= 0x9fa0 :
			_address = 0x98b4 + (uni - 0x3001) * 4
		elif 0xff01 <= uni <= 0xffe5 :
			_address = 0x25734 + (uni - 0xff01) * 4
		else:
			raise ValueError("Cannot display characters other than GB2312 code")
		buffer = bytearray(4)
		flash_read(_Uincode_ADDR + _address, buffer) 
		font_info = buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0]
		font_address = font_info & 0X3FFFFFF
		font_width = font_info >> 26
		buffer = bytearray( 12 * (font_width // 8 + 1))
		flash_read(_Uincode_ADDR + font_address, buffer)				 
		return buffer, font_width	

	def shift(self, x, y, rotate=False):
		"""Shift pixels by x and y"""
		if x > 0:  # Shift Right
			for _ in range(x):
				for row in range(0, _LEDS_H):
					last_pixel = self.pixel(_LEDS_W - 1, row) if rotate else 0
					for col in range(_LEDS_W - 1, 0, -1):
						self.pixel(col, row, self.pixel(col - 1, row))
					self.pixel(0, row, last_pixel)
		elif x < 0:  # Shift Left
			for _ in range(-x):
				for row in range(0, _LEDS_H):
					last_pixel = self.pixel(0, row) if rotate else 0
					for col in range(0, _LEDS_W - 1):
						self.pixel(col, row, self.pixel(col + 1, row))
					self.pixel(_LEDS_W - 1, row, last_pixel)
		if y > 0:  # Shift Up
			for _ in range(y):
				for col in range(0, _LEDS_W):
					last_pixel = self.pixel(col, _LEDS_H - 1) if rotate else 0
					for row in range(_LEDS_H - 1, 0, -1):
						self.pixel(col, row, self.pixel(col, row - 1))
					self.pixel(col, 0, last_pixel)	
		elif y < 0:  # Shift Down
			for _ in range(-y):
				for col in range(0, _LEDS_W):
					last_pixel = self.pixel(col, 0) if rotate else 0
					for row in range(0, _LEDS_H - 1):
						self.pixel(col, row, self.pixel(col, row + 1))
					self.pixel(col, _LEDS_H - 1, last_pixel)	
		self.show()

	def shift_right(self, num, rotate=False):
		"""Shift all pixels right"""
		self.shift(num, 0, rotate)

	def shift_left(self, num, rotate=False):
		"""Shift all pixels left"""
		self.shift(-num, 0, rotate)

	def shift_up(self, num, rotate=False):
		"""Shift all pixels up"""
		self.shift(0, -num, rotate)

	def shift_down(self, num, rotate=False):
		"""Shift all pixels down"""
		self.shift(0, num, rotate)

	def map_invert(self, own):
		"""Graph invert operation"""
		result = bytearray()
		for i in range(len(own)):
			result.append(~ own[i])
		return result

	def map_add(self, own, other):
		"""Graph union operation"""
		result = bytearray()
		for i in range(min(len(own), len(other))):
			result.append(own[i] | other[i])
		return result

	def map_sub(self, own, other):
		"""Graphic subtraction operation"""
		result = bytearray()
		for i in range(min(len(own), len(other))):
			result.append((own[i] ^ other[i]) & own[i])
		return result

	def set_buffer(self, buffer):
		for i in range(len(buffer)):
			self._buffer[i] = self._buffer[i] | buffer[i]

	def _ascall_bitmap(self, buffer, x=0):
		if -_FONT_W <= x <= _LEDS_W:		
			for _x in range(_FONT_W):
				for _y in range(_FONT_H):
					if (buffer[_x] >> _y) & 0x1:
						self.pixel(x + _x, _y, 1)

	def _uincode_bitmap(self, buffer, x=0):
		_buffer, width = buffer 
		if -width < x < _LEDS_H:
			for _y in range(12):
				for _x in range(width):
					if _buffer[_y * ((width + 7) // 8) + _x // 8] & (0x80 >> (_x & 7)):
						self.pixel(_y, _LEDS_H - (x + _x), 1) 

	def shows(self, data, space=1, center=True):
		"""Display character"""
		if data is not None:
			self.fill(0)
			if type(data) in [bytes, bytearray]:
				self.set_buffer(data)
				self.show()
			else:
				data = str(data)
				x = (_LEDS_W - len(data) * (_FONT_W + space) + space) // 2 if center else 0
				for char in data:
					self._ascall_bitmap(self._chardata(char), x) 
					x = _FONT_W + x + space
				self.show()

	def frame(self, data, delay=500):
		"""Display one frame per character"""
		if data is not None:
			data = str(data)
			for char in data:
				self.fill(0)
				self._ascall_bitmap(self._chardata(char), (_LEDS_W - _FONT_W) // 2)
				self.show()
				time.sleep_ms(delay) 

	def scroll(self, data, space=0, speed=100):
		"""Scrolling characters"""
		if data is not None:
			data = str(data)
			uincode = False
			for char in data:
				if ord(char) >= 0xff:
					uincode =True
					break
			if uincode:
				font_buffer = []
				str_len = 0
				for c in data:
					_buffer = self._uincode(c)
					font_buffer.append(_buffer)
					str_len = str_len + _buffer[1] + space
				for i in range(str_len + _LEDS_H - space):	
					x = _LEDS_H - i
					self.fill(0)
					for buffer in font_buffer:
						self._uincode_bitmap(buffer, x)
						x = buffer[1] + x + space
					self.show()
					time.sleep_ms(speed)
			else:
				str_len = len(data) * (_FONT_W + space) - space
				for i in range(str_len + _LEDS_W + 1):	
					x = _LEDS_W -i
					self.fill(0)
					for char in data:
						self._ascall_bitmap(self._chardata(char), x)
						x = _FONT_W + x + space
					self.show()
					time.sleep_ms(speed)

	def pointern(self, x=_LEDS_W // 2, y=_LEDS_H // 2, l=_LEDS_H // 2, angle=0):
		radian = math.radians(angle)
		self.fill(0)
		self.line(x, y, round(x + l * math.sin(radian)), round(y - l * math.cos(radian)), 1)
		self.show()

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._i2c.writeto_mem(_BOT035_ADDRESS, reg, val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		self._i2c.writeto(_BOT035_ADDRESS, reg.to_bytes(1, 'little'))
		return  self._i2c.readfrom(_BOT035_ADDRESS, nbytes)[0]

	def reset(self):
		"""Reset SPK, PWM, HID registers to default state"""
		self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_SPK, b'\x0A\x00\x00\x00\x20\x4E\x64\x64')
		if self._version: self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_KB, bytes(9))

	def get_brightness(self):
		return self._brightness

	def set_brightness(self, brightness):
		if not 0.0 <= brightness <= 1.0:
			raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
		self._brightness = brightness
		self._wreg(_BOT035_FLAG, _BOT035_PGA | round(10 * brightness))

	def show(self):
		self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_LEDS, self._buffer)

	def buzzer(self, duty=None, freq=None):
		if duty is not None:
			duty = max(min(duty, 100), 0)
			self._wreg(_BOT035_SPK + 2, int(duty))		
		if freq is not None:
			freq = max(min(freq, 65535), 10)
			self._wreg(_BOT035_SPK, freq & 0xFF)
			self._wreg(_BOT035_SPK + 1, freq >> 8)
		if freq is None and duty is None:
			return self._rreg(_BOT035_SPK + 2), self._rreg(_BOT035_SPK) | self._rreg(_BOT035_SPK + 1) << 8

	def usben(self, index=1, duty=None, freq=None):
		index = max(min(index, 2), 1) - 1
		if duty is not None:
			duty = max(min(duty, 100), 0)
			self._wreg(_BOT035_PWM + index + 2, int(duty))
		if freq is not None:
			freq = max(min(freq, 65535), 10)
			self._wreg(_BOT035_PWM, freq & 0xFF)
			self._wreg(_BOT035_PWM + 1, freq >> 8)
		if freq is None and duty is None:
			return self._rreg(_BOT035_PWM + index + 2), self._rreg(_BOT035_PWM) | self._rreg(_BOT035_PWM + 1) << 8

	def touch(self, index, value=None):
		index = max(min(index, 1), 0)
		touch = 4095 - (self._rreg(_BOT5_TOUCH + index * 2) | self._rreg(_BOT5_TOUCH + index * 2 + 1) << 8)
		return touch > value if value else  touch

	def touched(self, index, value=600):
		return self.touch(index, value)

	def touch_slide(self):
		values = []
		for i in range(30):
			values.append((self.touch(1) - self._touchs[1]) - (self.touch(0) - self._touchs[0]))
		return round(sorted(values)[15] / 10) 

	def soundlevel(self):
		values = []
		for i in range(50):
			values.append(self._rreg(_BOT035_MIC) | self._rreg(_BOT035_MIC + 1) << 8)
		values = sorted(values)
		return values[-10] - values[10]

	def hid_keyboard(self, special=0, general=0, release=True):
		if self._version:
			self._buf = bytearray(4)
			self._buf[0] = special
			if type(general) in (tuple, list):
				for i in range(len(general)):
					if i > 2: break
					self._buf[i + 1] = general[i]
			else:
				self._buf[1] = general
			self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_KB, self._buf)
			if release:
				time.sleep_ms(10)
				self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_KB, bytes(4))
		else:
			print("Warning: Please upgrade the coprocessor firmware to use this feature")

	def hid_keyboard_str(self, string, delay=0):
		if self._version:
			for char in str(string):
				self._wreg(_BOT035_STR, ord(char) & 0xFF)
				time.sleep_ms(20 + delay)
		else:
			print("Warning: Please upgrade the coprocessor firmware to use this feature")

	def hid_keyboard_state(self):
		state = self._rreg(_BOT035_STA)
		return bool(state & 0x10), bool(state & 0x20), bool(state & 0x40)

	def hid_mouse(self, keys=0, move=(0, 0), wheel=0, release=True):
		if self._version:
			self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_MS, bytes([keys & 0x0F, move[0] & 0xFF, move[1] & 0xFF, wheel & 0xFF]))
			if release:
				time.sleep_ms(10)
				self._i2c.writeto_mem(_BOT035_ADDRESS, _BOT035_MS, bytes(4))
		else:
			print("Warning: Please upgrade the coprocessor firmware to use this feature")

	"""Graph module"""
	HEART =b'\x00\x0c\x1e?~\xfc~?\x1e\x0c\x00\x00'
	HEART_SMALL =b'\x00\x00\x0c\x1e<x<\x1e\x0c\x00\x00\x00'
	HAPPY =b'\x00\x06\x06\x10 @@ \x10\x06\x06\x00'
	SAD =b'\x04\x02\x02B \x10\x10 B\x02\x02\x04'
	SMILE =b'\x04\x02\x02$@\x80\x80@$\x02\x02\x04'
	ANGRY =b'\x01\x02\x84B!\x10\x10!B\x84\x02\x01'
	NO =b'\x00\x00\x00B$\x18\x18$B\x00\x00\x00'
	YES =b'\x00\x00\x10 @@ \x10\x08\x04\x02\x00'
	DOOR_OPEN =b'\x00\x00\xfe\xfd\x01\x01\x01\x01\x01\xfe\x00\x00'
	DOOR_OPENING =b'\x00\x00\xfe\x03\x03\x15\xf9\x01\x01\xfe\x00\x00'
	DOOR_CLOSE =b'\x00\x00\xfe\x03\x03\x03\x13\x13\xff\xfe\x00\x00'
