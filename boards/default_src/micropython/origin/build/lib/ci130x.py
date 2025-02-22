"""
CI130X

MicroPython library for the CI130X (ASR-I2C)
=======================================================
@dahanzimin From the Mixly Team
"""
import time
from struct import pack
from micropython import const

_CI_ADDRESS			= const(0x64)
_CI_ID_GET			= const(0x02)
_CI_ID_SET			= const(0x03)
_CI_ID_NUM			= const(0x06)
_CI_ID_CLE			= const(0x07)
_CI_ID_END			= const(0x5A)

class CI130X:
	def __init__(self, i2c_bus, addr=_CI_ADDRESS):
		self._device  = i2c_bus
		self._address = addr
		self._cmd_id = None
		try:
			self._rreg(_CI_ID_GET, 3)
		except:
			raise AttributeError("Cannot find a CI130X")

	def _wreg(self, reg):
		'''Write memory address'''
		self._device.writeto(self._address, reg)

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)

	def status(self):
		"""返回 (是否唤醒, 是否播放)"""
		_buf = self._rreg(_CI_ID_GET, 3)
		return (bool(_buf[1] & 0x01), bool(_buf[1] & 0x10)) if _buf[2] == _CI_ID_END else (None, None)

	def cmd_id(self, repeat=False):
		"""返回 识别命令词对应ID"""
		_buf = self._rreg(_CI_ID_GET, 3)
		if not repeat:
			self._wreg(bytes([_CI_ID_CLE, 0, 0, _CI_ID_END]))
			time.sleep_ms(50)
		self._cmd_id = _buf[0] if _buf[2] == _CI_ID_END else None
		return self._cmd_id

	def result(self, ext_id=None):
		"""获取比较结果 或者输出结果"""
		return self._cmd_id if ext_id is None else  bool(self._cmd_id == ext_id)

	def sys_cmd(self, value, blocking=True):
		"""系统命令，1,2唤醒 202~205音量调整 206,207回复播报开关 208退出唤醒"""
		self.play_id(value, blocking)

	def play_id(self, value, blocking=True):
		"""播放命令词对应ID语音"""
		self._wreg(bytes([_CI_ID_SET, value, 0, _CI_ID_END]))
		while blocking:
			time.sleep_ms(10)
			if not self.status()[1]:
				break

	def play_num(self, value, blocking=True):
		"""播放浮点数据的合成语音"""
		self._wreg(bytes([_CI_ID_NUM]) + pack('d', float(value)) + bytes([0, _CI_ID_END]))
		while blocking:
			time.sleep_ms(10)
			if not self.status()[1]:
				break

	def play(self, star=None, num=None, end=None, delay=10):
		"""组合播报名词+数值+单位"""
		if star is not None: 
			self.play_id(star)
			time.sleep_ms(delay)
		if num is not None: 
			self.play_num(num)
			time.sleep_ms(delay)
		if end is not None: 
			self.play_id(end)
			time.sleep_ms(delay)
