"""
framebuf-extend

Micropython library for the framebuf-extend
=======================================================

#Preliminary composition					20230412	

@dahanzimin From the Mixly Team
"""

import esp, time, gc
from framebuf import *

class Font_Ascall:
	'''Ascall code font reading data'''
	#字库格式:2字节字宽和高，后逐列式，按满字节低位在前
	font4x5_code=b'\x04\x05\x00\x00\x00\x00\x00\x17\x00\x00\x03\x00\x03\x00\x1f\n\x1f\x00\x16\x1f\x1a\x00\x19\x04\x13\x00\n\x15\x1a\x00\x00\x01\x03\x00\x00\x0e\x11\x00\x11\x0e\x00\x00\x15\x0e\x15\x00\x04\x0e\x04\x00\x00\x08\x18\x00\x04\x04\x04\x00\x18\x18\x00\x00\x18\x04\x03\x00\x1f\x11\x1f\x00\x12\x1f\x10\x00\x1d\x15\x17\x00\x15\x15\x1f\x00\x07\x04\x1f\x00\x17\x15\x1d\x00\x1f\x15\x1d\x00\x01\x01\x1f\x00\x1f\x15\x1f\x00\x17\x15\x1f\x00\x1b\x1b\x00\x00\x00\x0b\x1b\x00\x04\n\x11\x00\n\n\n\x00\x11\n\x04\x00\x01\x15\x07\x00\x0e\x15\x16\x00\x1e\x05\x1e\x00\x1f\x15\n\x00\x0e\x11\x11\x00\x1f\x11\x0e\x00\x1f\x15\x15\x00\x1f\x05\x05\x00\x0e\x15\x1d\x00\x1f\x04\x1f\x00\x11\x1f\x11\x00\x08\x11\x0f\x00\x1f\x0c\x12\x00\x1f\x10\x10\x00\x1f\x02\x1f\x00\x1e\x04\x0f\x00\x0e\x11\x0e\x00\x1f\x05\x02\x00\x0e\x19\x1e\x00\x1f\t\x16\x00\x12\x15\t\x00\x01\x1f\x01\x00\x1f\x10\x1f\x00\x0f\x10\x0f\x00\x1f\x08\x1f\x00\x1b\x04\x1b\x00\x07\x1c\x07\x00\x19\x15\x13\x00\x00\x1f\x11\x00\x03\x0c\x10\x00\x11\x1f\x00\x00\x02\x01\x02\x00\x10\x10\x10\x00\x00\x03\x02\x00\n\x16\x1e\x00\x1f\x14\x08\x00\x0c\x12\x12\x00\x08\x14\x1f\x00\x0c\x1a\x14\x00\x04\x1e\x05\x00\x14\x1a\x1e\x00\x1f\x04\x18\x00\x00\x1d\x00\x00\x10\x1d\x00\x00\x1e\x08\x14\x00\x00\x1e\x00\x00\x1e\x04\x1e\x00\x1e\x02\x1e\x00\x0c\x12\x0c\x00\x1e\n\x04\x00\x04\n\x1e\x00\x1e\x04\x02\x00\x12\x15\t\x00\x04\x1e\x14\x00\x1e\x10\x1e\x00\x0e\x10\x0e\x00\x1e\x08\x1e\x00\x12\x0c\x12\x00\x16\x18\x0e\x00\x19\x15\x13\x00\x04\x1f\x11\x00\x00\x1f\x00\x00\x11\x1f\x04\x00\x02\x06\x04\x00\x15\n\x15\x00'
	font5x5_code=b'\x05\x05\x00\x00\x00\x00\x00\x00\x17\x00\x00\x00\x00\x03\x00\x03\x00\n\x1f\n\x1f\n\n\x17\x15\x1d\n\x13\t\x04\x12\x19\n\x15\x15\n\x10\x00\x03\x00\x00\x00\x00\x0e\x11\x00\x00\x00\x11\x0e\x00\x00\x00\n\x04\n\x00\x00\x04\x0e\x04\x00\x00\x10\x08\x00\x00\x00\x04\x04\x04\x00\x00\x08\x00\x00\x00\x10\x08\x04\x02\x01\x0e\x11\x11\x0e\x00\x00\x12\x1f\x10\x00\x19\x15\x15\x12\x00\t\x11\x15\x0b\x00\x0c\n\t\x1f\x08\x17\x15\x15\x15\t\x08\x14\x16\x15\x08\x11\t\x05\x03\x01\n\x15\x15\x15\n\x02\x15\r\x05\x02\x00\n\x00\x00\x00\x00\x10\n\x00\x00\x00\x04\n\x11\x00\x00\n\n\n\x00\x00\x11\n\x04\x00\x02\x01\x15\x05\x02\x0e\x11\x15\t\x0e\x1e\x05\x05\x1e\x00\x1f\x15\x15\n\x00\x0e\x11\x11\x11\x00\x1f\x11\x11\x0e\x00\x1f\x15\x15\x11\x00\x1f\x05\x05\x01\x00\x0e\x11\x11\x15\x0c\x1f\x04\x04\x1f\x00\x11\x1f\x11\x00\x00\t\x11\x11\x0f\x01\x1f\x04\n\x11\x00\x1f\x10\x10\x10\x00\x1f\x02\x04\x02\x1f\x1f\x02\x04\x08\x1f\x0e\x11\x11\x0e\x00\x1f\x05\x05\x02\x00\x06\t\x19\x16\x00\x1f\x05\x05\n\x10\x12\x15\x15\x08\x00\x01\x01\x1f\x01\x01\x0f\x10\x10\x0f\x00\x07\x08\x10\x08\x07\x07\x08\x10\x08\x07\x1b\x04\x04\x1b\x00\x01\x02\x1c\x02\x01\x19\x15\x13\x11\x00\x00\x1f\x11\x11\x00\x01\x02\x04\x08\x10\x00\x11\x11\x1f\x00\x00\x02\x01\x02\x00\x10\x10\x10\x10\x10\x00\x01\x02\x00\x00\x0c\x12\x12\x1e\x10\x1f\x14\x14\x08\x00\x0c\x12\x12\x12\x00\x08\x14\x14\x1f\x00\x0e\x15\x15\x12\x00\x04\x1e\x05\x01\x00\x02\x15\x15\x0f\x00\x1f\x04\x04\x18\x00\x00\x1d\x00\x00\x00\x00  \x1d\x00\x1f\x04\n\x10\x00\x00\x0f\x10\x10\x00\x1e\x02\x04\x02\x1e\x1e\x02\x02\x1c\x00\x0c\x12\x12\x0c\x00\x1e\n\n\x04\x00\x04\n\n\x1e\x00\x1c\x02\x02\x02\x00\x10\x14\n\x02\x00\x00\x0f\x14\x14\x10\x0e\x10\x10\x1e\x10\x06\x08\x10\x08\x06\x1e\x10\x08\x10\x1e\x12\x0c\x0c\x12\x00\x12\x14\x08\x04\x02\x12\x1a\x16\x12\x00\x00\x04\x1f\x11\x00\x00\x1f\x00\x00\x00\x11\x1f\x04\x00\x00\x00\x04\x04\x08\x08\x02\x06\x06\x06\x06'
	font5x8_code=b'\x05\x08\x00\x00\x00\x00\x00\x00\x00_\x00\x00\x00\x07\x00\x07\x00\x14\x7f\x14\x7f\x14$*\x7f*\x12#\x13\x08db6IV P\x00\x08\x07\x03\x00\x00\x1c"A\x00\x00A"\x1c\x00*\x1c\x7f\x1c*\x08\x08>\x08\x08\x00\x80p0\x00\x08\x08\x08\x08\x08\x00\x00``\x00 \x10\x08\x04\x02>QIE>\x00B\x7f@\x00rIIIF!AIM3\x18\x14\x12\x7f\x10\'EEE9<JII1A!\x11\t\x076III6FII)\x1e\x00\x00\x14\x00\x00\x00@4\x00\x00\x00\x08\x14"A\x14\x14\x14\x14\x14\x00A"\x14\x08\x02\x01Y\t\x06>A]YN|\x12\x11\x12|\x7fIII6>AAA"\x7fAAA>\x7fIIIA\x7f\t\t\t\x01>AAQs\x7f\x08\x08\x08\x7f\x00A\x7fA\x00 @A?\x01\x7f\x08\x14"A\x7f@@@@\x7f\x02\x1c\x02\x7f\x7f\x04\x08\x10\x7f>AAA>\x7f\t\t\t\x06>AQ!^\x7f\t\x19)F&III2\x03\x01\x7f\x01\x03?@@@?\x1f @ \x1f?@8@?c\x14\x08\x14c\x03\x04x\x04\x03aYIMC\x00\x7fAAA\x02\x04\x08\x10 \x00AAA\x7f\x04\x02\x01\x02\x04@@@@@\x00\x03\x07\x08\x00 TTx@\x7f(DD88DDD(8DD(\x7f8TTT\x18\x00\x08~\t\x02\x18\xa4\xa4\x9cx\x7f\x08\x04\x04x\x00D}@\x00 @@=\x00\x7f\x10(D\x00\x00A\x7f@\x00|\x04x\x04x|\x08\x04\x04x8DDD8\xfc\x18$$\x18\x18$$\x18\xfc|\x08\x04\x04\x08HTTT$\x04\x04?D$<@@ |\x1c @ \x1c<@0@<D(\x10(DL\x90\x90\x90|DdTLD\x00\x086A\x00\x00\x00w\x00\x00\x00A6\x08\x00\x02\x01\x02\x04\x02<&#&<'

	def __init__(self, font_code="4x5"):
		if type(font_code) in [tuple, list, bytes, bytearray]:
			self._font_code = font_code
		elif font_code == "4x5":
			self._font_code = self.font4x5_code
		elif font_code == "5x5":
			self._font_code = self.font5x5_code
		elif font_code == "5x8":
			self._font_code = self.font5x8_code
		else:
			raise ValueError("This font selection is not supported")
		self.font_width, self.font_height = self._font_code[0], self._font_code[1]

	def chardata(self, ch):
		if  0x20 <= ord(ch) <= 0x7f:
			char_index= 2 + (ord(ch)-32) * self.font_width 
			buffer=self._font_code[char_index : char_index + self.font_width]
			return buffer, (self.font_width, self.font_height)
		else:
			return None, (self.font_width, self.font_height)

class Font_Uincode:
	'''uincode code font reading data'''
	def __init__(self, start_address=0x3A0000):
		self.start_address = start_address
		buffer = bytearray(40)
		esp.flash_read(self.start_address, buffer)
		
		if buffer[0] != 0x55:
			raise ValueError("Using font file is not Unicode encoding")
		self.height=buffer[9]
		self.no1_char  =buffer[16] | buffer[17] << 8
		self.no1e_char =buffer[18] | buffer[19] << 8
		self.no1_index =buffer[20] | buffer[21] << 8 | buffer[22] << 16 | buffer[23] << 24
		self.no2_char  =buffer[24] | buffer[25] << 8
		self.no2e_char =buffer[26] | buffer[27] << 8
		self.no2_index =buffer[28] | buffer[29] << 8 | buffer[30] << 16 | buffer[31] << 24
		self.no3_char  =buffer[32] | buffer[33] << 8
		self.no3e_char =buffer[34] | buffer[35] << 8
		self.no3_index =buffer[36] | buffer[37] << 8 | buffer[38] << 16 | buffer[39] << 24

	def chardata(self, c):
		uni = ord(c)
		if self.no1_char <= uni <= self.no1e_char :	
			char_address = self.no1_index + (uni - self.no1_char) * 4
		elif self.no2_char <= uni <= self.no2e_char :
			char_address = self.no2_index + (uni - self.no2_char) * 4
		elif self.no3_char <= uni <= self.no3e_char :
			char_address = self.no3_index + (uni - self.no3_char) * 4
		else:
			return None, (0, self.height)
		
		buffer = bytearray(4)
		esp.flash_read(self.start_address + char_address, buffer) 
		font_info=buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0]
		font_address=font_info & 0X3FFFFFF
		font_width=font_info >> 26
		buffer = bytearray(self.height*(font_width // 8 + 1))
		esp.flash_read(self.start_address + font_address, buffer)				 
		return buffer, (font_width, self.height)

class Image:
	def load(self, path, invert=0):
		self.invert = invert
		with open(path, 'rb') as file:
			image_type = file.read(2).decode()
			file.seek(0)
			img_arrays = bytearray(file.read())
			if image_type == 'P4':
				buffer = self._pbm_decode(img_arrays)
			elif image_type == 'BM':
				buffer = self._bmp_decode(img_arrays)
			else:
				raise TypeError("Unsupported image format {}".format(image_type))
			gc.collect()
			return buffer

	def load_py(self, name, invert=0):
		self.invert = invert
		image_type = name[0:2]
		if image_type == b'P4':
			buffer = self._pbm_decode(bytearray(name))
		elif image_type == b'BM':
			buffer = self._bmp_decode(bytearray(name))
		else:
			raise TypeError("Unsupported image format {}".format(image_type))
		gc.collect()
		return buffer

	def _pbm_decode(self, img_arrays):
		next_value = bytearray()
		pnm_header = []
		stat = True
		index = 3
		while stat:
			next_byte = bytes([img_arrays[index]])
			if next_byte == b"#":
				while bytes([img_arrays[index]]) not in [b"", b"\n"]:
					index += 1
			if not next_byte.isdigit():
				if next_value:
					pnm_header.append(int("".join(["%c" % char for char in next_value])))
					next_value = bytearray()
			else:
				next_value += next_byte
			if len(pnm_header) == 2:
				stat = False
			index += 1
		pixel_arrays = img_arrays[index:]
		if self.invert == 1:
			for i in range(len(pixel_arrays)):
				pixel_arrays[i] = (~pixel_arrays[i]) & 0xff
		return pixel_arrays,(pnm_header[0], pnm_header[1])		

	def _bmp_decode(self, img_arrays):
		file_size = int.from_bytes(img_arrays[2:6], 'little')
		offset = int.from_bytes(img_arrays[10:14], 'little')
		width = int.from_bytes(img_arrays[18:22], 'little')
		height = int.from_bytes(img_arrays[22:26], 'little')
		bpp = int.from_bytes(img_arrays[28:30], 'little')
		if bpp != 1:
			raise TypeError("Only support 1 bit color bmp")
		line_bytes_size = (bpp * width + 31) // 32 * 4
		array_size = width * abs(height) // 8
		pixel_arrays = bytearray(array_size)
		array_row = width // 8 + 1 if width % 8 else width // 8
		array_col = height
		for i in range(array_col):
			for j in range(array_row):
				index = -(array_row * (i + 1) - j)
				_offset = offset + i * line_bytes_size + j
				if self.invert == 0:
					pixel_byte = (~img_arrays[_offset]) & 0xff
				else:
					pixel_byte = img_arrays[_offset]
				pixel_arrays[index] = pixel_byte
		return pixel_arrays,(width, height)

class FrameBuffer_Base(FrameBuffer):
	"""Inheritance and Extension"""
	def __init__(self, buf, width, height, *args, **kw):
		super().__init__(buf, width, height, *args, **kw)	
		self.width = width
		self.height = height
		self._buffer = buf
		self.auto_show = True

	def __getitem__(self, key):
		x, y = key
		return self.pixel(x, y)

	def __setitem__(self, key, value):
		x, y = key
		self.pixel(x, y, value)

	def show(self):
		print("External inheritance is required to override this method")

	def shift(self, x, y, rotate=False):
		"""Shift pixels by x and y"""
		if x > 0:  # Shift Right
			for _ in range(x):
				for row in range(0, self.height):
					last_pixel = self[self.width - 1, row] if rotate else 0
					for col in range(self.width - 1, 0, -1):
						self[col, row] = self[col - 1, row]
					self[0, row] = last_pixel
		elif x < 0:  # Shift Left
			for _ in range(-x):
				for row in range(0, self.height):
					last_pixel = self[0, row] if rotate else 0
					for col in range(0, self.width - 1):
						self[col, row] = self[col + 1, row]
					self[self.width - 1, row] = last_pixel
		if y > 0:  # Shift Up
			for _ in range(y):
				for col in range(0, self.width):
					last_pixel = self[col, self.height - 1] if rotate else 0
					for row in range(self.height - 1, 0, -1):
						self[col, row] = self[col, row - 1]
					self[col, 0] = last_pixel
		elif y < 0:  # Shift Down
			for _ in range(-y):
				for col in range(0, self.width):
					last_pixel = self[col, 0] if rotate else 0
					for row in range(0, self.height - 1):
						self[col, row] = self[col, row + 1]
					self[col, self.height - 1] = last_pixel
		if self.auto_show: self.show()

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
		if type(own) in [list, bytes, tuple, bytearray]:
			result=bytearray()
			for i in range(len(own)):
				result.append(~ own[i])
			return result
		else:
			raise ValueError("This graphic operation is not supported")

	def map_add(self, own, other):
		"""Graph union operation"""
		if type(own) in [list, bytes, tuple, bytearray] and type(other) in [list, bytes, tuple, bytearray]:
			result=bytearray()
			for i in range(min(len(own), len(other))):
				result.append(own[i] | other[i])
			return result
		else:
			raise ValueError("This graphic operation is not supported")

	def map_sub(self, own, other):
		"""Graphic subtraction operation"""
		if type(own) in [list, bytes, tuple, bytearray] and type(other) in [list, bytes, tuple, bytearray]:
			result=bytearray()
			for i in range(min(len(own), len(other))):
				result.append((own[i] ^ other[i]) & own[i])
			return result
		else:
			raise ValueError("This graphic operation is not supported")

	def set_buffer(self, buffer):
		for i in range(min(len(buffer),len(self._buffer))):
			self._buffer[i] = self._buffer[i] | buffer[i]

	def get_buffer(self):
		return self._buffer	

class FrameBuffer_Ascall(FrameBuffer_Base):
	'''FrameBuffer for Ascall'''
	def font(self, font):
		"""Font selection or externally defined font code"""
		self._font = Font_Ascall(font)

	def bitmap(self, buffer, x=0, y=0):
		"""Graphic model display(buffer,(width,height))"""	
		buffer_info, (width, height) = buffer
		if x < -width or x >= self.width or y < -height or y >= self.height:		
			return			#Limit reasonable display area
		for char_x in range(width):
			for char_y in range(height):
				if (buffer_info[char_x] >> char_y) & 0x1:
					self.pixel(x + char_x, y + char_y, 1) if height <= self.height else self.pixel(y + char_y, self.height-(x + char_x), 1)

	def shows(self, data, space=0, center=True):
		"""Display character"""
		if data is not None:
			self.fill(0)
			if type(data) in [list, bytes, tuple, bytearray]:
				self.set_buffer(data)
				if self.auto_show: self.show()
			else:
				data=str(data)
				x = (self.width - len(data) * (self._font.font_width + space) + space) // 2 if center else 0
				for char in data:
					self.bitmap(self._font.chardata(char), x) 
					x=self._font.font_width + x + space
				if self.auto_show: self.show()

	def frame(self, data, delay=500):
		"""Display one frame per character"""
		if data is not None:
			if type(data) in [list,tuple]:
				for dat in data:
					if type(dat) in [list,bytes,tuple,bytearray]:
						self.fill(0)
						self.set_buffer(dat)
						self.show()
						time.sleep_ms(delay)
			else:
				data=str(data)
				x=(self.width - self._font.font_width) // 2 
				for char in data:
					self.fill(0)
					self.bitmap(self._font.chardata(char), x)
					self.show()
					time.sleep_ms(delay) 

	def scroll(self, data, space=0, speed=100):
		"""Scrolling characters"""
		if data is not None:
			data = str(data)
			str_len = len(data) * (self._font.font_width + space) - space
			for i in range(str_len + self.width + 1):	
				x = -i + self.width
				self.fill(0)
				for char in data:
					self.bitmap(self._font.chardata(char),x)
					x = self._font.font_width + x + space
				self.show()
				time.sleep_ms(speed)

class FrameBuffer_Uincode(FrameBuffer_Base):
	'''FrameBuffer for Uincode'''
	def font(self, font_address):
		"""Font selection or externally defined font code"""
		self._font = Font_Uincode(font_address)

	def image(self, path, x=None, y=None, size=None, invert=0, color=0xffff):
		"""Set buffer to value of Python Imaging Library image"""
		if type(path) is str :
			buffer_info, (width, height) = Image().load(path, invert) 
		elif type(path) in [bytes, bytearray]:
			buffer_info, (width, height) =  Image().load_py(path, invert)
		else:
			raise ValueError("invalid input")
		if width > self.width or height > self.height:
			raise ValueError("Image must be less than display ({0}x{1}).".format(self.width, self.height))
		size = min(self.height // height, self.width // width) if size is None else size
		size = max(round(size), 1)
		x =(self.width - width * size) // 2 if x is None else x
		y =(self.height - height * size) // 2 if y is None else y
		if self.auto_show: self.fill_rect(x, y, width * size, height * size, 0)
		self.bitmap((buffer_info,(width, height)), x, y, size, color)    
		if self.auto_show: self.show()

	def bitmap(self, buffer, x=0, y=0, size=1, color=0xffff):
		"""Graphic model display(buffer,(width,height))"""    
		buffer_info,(width,height)=buffer    
		if x < -width*size or x >= self.width or y < -height*size or y >= self.height:        
			return            #Limit reasonable display area    
		bytewidth = (width + 7) // 8
		for j in range(height):
			for i in range(width):
				if buffer_info[j * bytewidth + i // 8] & (0x80 >> (i & 7)):
					self.fill_rect(x + i * size, y + j * size, size, size, color)  

	def _take_buffer(self, strs, space, size=1):
		'''Get character lattice information first'''
		font_buffer = []
		font_len = 0
		for c in strs:                    
			buffer = self._font.chardata(c)
			font_buffer.append(buffer)
			font_len = font_len + buffer[1][0] * size + space
		return font_len, font_buffer

	def shows(self, data, space=0, center=True, x=0, y=None, size=None, color=0xffff, bg_color=0x0):
		"""Display character"""
		if data is not None:
			if type(data) in [list, bytes, tuple, bytearray]:
				if self.auto_show: self.fill(bg_color)
				self.set_buffer(data)
				if self.auto_show: self.show()
			else:
				yy = y 
				if size is None:
					font_len, font_buffer = self._take_buffer(str(data), space, 1)
					size = min(self.width // font_len, self.height // self._font.height)
				size = max(round(size), 1)
				font_len, font_buffer = self._take_buffer(str(data), space, size)
				x = (self.width - font_len + space) // 2 if center else x
				y = (self.height - self._font.height * size) // 2 if y is None else y
				if self.auto_show:
					if yy is None:
						self.fill(bg_color)
					else:
						self.fill_rect(x - 1, y - 1, font_len + 2, font_buffer[0][1][1] * size + 2, bg_color)
				for buffer in font_buffer:    #Display character
					self.bitmap(buffer, x, y, size, color)
					x = buffer[1][0] * size + x + space
				if self.auto_show: self.show()

	def texts(self, data, space_x=0, space_y=1, x=0, y=0, size=1, color=0xffff, bg_color=0x0):
		size = max(round(size), 1)
		lines = data.split('\n')
		if self.auto_show: self.fill(bg_color)
		for line in lines:
			for char in line:
				buffer = self._font.chardata(char)
				if x > self.width - buffer[1][0] * size:
					x = 0
					y = buffer[1][1] * size + y + space_y
				if y > self.height:
					if self.auto_show: self.show()
					return None
				self.bitmap(buffer, x, y, size, color)
				x = buffer[1][0] * size + x + space_x
			x = 0
			y = self._font.height * size + y + space_y
		if self.auto_show: self.show()

	def frame(self, data, delay=500, size=None, color=0xffff, bg_color=0x0):
		"""Display one frame per character"""
		if data is not None:
			if type(data) in [list, tuple]:
				for dat in data:
					if type(dat) in [list, bytes, tuple,  bytearray]:
						if self.auto_show: self.fill(bg_color)
						self.set_buffer(dat)
						self.show()
						time.sleep_ms(delay)
			else:
				size = self.height // (self._font.height * 3) if size is None else size
				size = max(round(size), 1)
				_, font_buffer = self._take_buffer(str(data), 0)
				for buffer in font_buffer:
					x=(self.width - buffer[1][0] * size) // 2 
					y=(self.height - buffer[1][1] * size) // 2 
					if self.auto_show: self.fill(bg_color)
					self.bitmap(buffer, x, y, size, color)
					self.show()
					time.sleep_ms(delay) 

	def scroll(self, data, space=0, speed=20, y=None, size=None, step= None, color=0xffff, bg_color=0x0):
		"""Scrolling characters"""
		if data is not None:
			size = self.height // (self._font.height * 3) if size is None else size
			size = max(round(size), 1)
			step = max(self.width // 30, 1)if step is None else step
			font_len, font_buffer = self._take_buffer(str(data), space, size)
			for i in range(0, font_len - space + self.width, step):
				x = -i + self.width
				y = (self.height - self._font.height * size) // 2 if y is None else y
				if self.auto_show: self.fill_rect(x - 2 , y - 2 , self.width -x + 4, font_buffer[0][1][1] * size + 4, bg_color)
				for buffer in font_buffer:
					self.bitmap(buffer, x, y, size, color)
					x = buffer[1][0] * size + x + space
				self.show()
				time.sleep_ms(speed)
