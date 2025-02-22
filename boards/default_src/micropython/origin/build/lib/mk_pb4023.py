"""
MK-PB4023PS&ASL&VC-A01E

MicroPython library for the MK-PB4023PS&ASL&VC-A01E (PS,ASL,CS)
=======================================================
@dahanzimin From the Mixly Team
"""
import time
from micropython import const

_MK_SYSM 			= const(0x80)
_MK_ID 				= const(0x98)
_MK_DATA 			= const(0xA0)

class MK_PB4023:
	def __init__(self, i2c_bus, addr=0x39):
		self._device  =  i2c_bus
		self._address = addr
		if self._rreg(_MK_ID) != 0xA0:
			raise AttributeError("Cannot find a MK-PB4023")
		self._configure()

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)

	def _configure(self):
		'''Configuration Register'''
		self._wreg(0X82, 0x80)
		self._wreg(0x83, 0x01)
		self._wreg(0x84, 0x07)
		self._wreg(0x85, 0x0B)
		self._wreg(0x86, 0x03)
		self._wreg(0x87, 0x1A)
		self._wreg(0x89, 0x38)
		self._wreg(_MK_SYSM,0x0F) #Enable Register

	def getdata(self):
		'''Processing data acquisition'''
		_buf = self._rreg(_MK_DATA, 12)
		_r = _buf[0] | _buf[1] << 8
		_g = _buf[2] | _buf[3] << 8
		_b = _buf[4] | _buf[5] << 8
		_c = _buf[6] | _buf[7] << 8
		_ir = _buf[8] | _buf[9] << 8
		_ps = _buf[10] | _buf[11] << 8
		return _c, _ir, (_r, _g, _b), _ps

	def color(self):
		w, _, (r, g, b), _ = self.getdata()
		if w == 0:
			return (0, 0, 0)
		else:
			red = int(pow((int((r / w) * 256) / 255), 2.5) * 255)
			green = int(pow((int((g / w) * 256) / 255), 2.5) * 255)
			blue = int(pow((int((b / w) * 256) / 255), 2.5) * 255)
			return (min(red, 255), min(green, 255), min(blue, 255))

	def color_raw(self):
		return self.getdata()[2]

	def ir(self):
		return self.getdata()[1]

	def als(self):
		w, ir, (r, g, b), _ = self.getdata()
		return round((w + ir + r + g + b) / 17.8, 2)

	def ps(self):
		return self.getdata()[3]
