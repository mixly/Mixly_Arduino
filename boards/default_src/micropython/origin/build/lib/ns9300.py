"""
NS9300

Micropython library for the NS9300(Music Player)
=======================================================
@dahanzimin From the Mixly Team 
"""
import time
from micropython import const

_PLAY_CTRL			= const(0x04)
_PLAY_VOL			= const(0x06)
_PLAY_INS			= const(0x09)
_PLAY_MODE			= const(0x0B)

class NS9300:
	def __init__(self, uart, delay=250):
		self._uart = uart
		self._delay = delay
		self._uart.init(baudrate=9600, timeout_char=5)
		if not self._chip_id():
			raise AttributeError("Cannot find a NS930x")

	def _wreg(self, cmd, data=b'\x00'):
		'''Write memory address'''
		_buf = bytearray([cmd, 255 - cmd, len(data)]) + data
		eec = 0
		for i in range(len(_buf)):
			eec += _buf[i]
		_buf.append(eec & 0xFF)
		#print("TX:", bytes(_buf), len(_buf))
		self._uart.write(_buf)

	def _rreg(self, cmd):
		'''read memory address'''
		time.sleep_ms(self._delay)
		if self._uart.any():
			_buf = self._uart.read()
			#print("RX:", _buf, len(_buf))
			if _buf[0] == 0xAA and _buf[1] == 0x55:
				raise OSError("Play Error", _buf[4])
			elif _buf[0] == cmd and _buf[0] == (255 - _buf[1]):
				#eec = 0
				#for i in range(len(_buf) - 1):
					#eec += _buf[i]
				#if (eec & 0xFF) == _buf[-1]:
				return _buf[3:3 + _buf[2]]

	def _chip_id(self):
		'''复位指令有问题，暂停止播放态处理'''
		for _ in range(10):
			self._wreg(_PLAY_CTRL, b'\x03')
			if self._rreg(_PLAY_CTRL):
				return True

	def _ascll(self, data):
		'''获取ASCLL字节，剔除中文'''
		_strs=''
		for char in data:
			_strs += char if ord(char) <= 0xFF else "*"
		return _strs.encode()

	def status(self, value=1):
		"""0已停止? 1播放中? 2已暂停?"""
		return self.control(0) == value

	def control(self, value=0):
		"""0查询(0停止 1播放 2暂停) 1播放  2暂停 3停止 4上一曲 5下一曲 6总曲数 7当前曲"""
		self._wreg(_PLAY_CTRL, (value if value <= 5  else value + 7).to_bytes(1, 'little'))
		_dat = self._rreg(_PLAY_CTRL)
		if _dat:
			return _dat[1] if value <= 3 else _dat[1] << 8 | _dat[2]

	def play(self, value='m*.mp3'):
		"""int播放曲目 str播放文件(*省略,GBK编码MPY不支持)"""
		if isinstance(value, int):
			self._wreg(_PLAY_CTRL, b'\x06' + value.to_bytes(2, 'big'))
		elif isinstance(value, str):
			self._wreg(_PLAY_CTRL, b'\x07' + self._ascll(value)) 
		else:
			raise ValueError("Input format error")
		_dat = self._rreg(_PLAY_CTRL)
		if _dat:
			return _dat[1] << 8 | _dat[2]

	def insert(self, value='m*.mp3'):
		"""int播放曲目 str播放文件(*省略,GBK编码MPY不支持)"""
		if isinstance(value, int):
			self._wreg(_PLAY_INS, b'\x00\x02' + value.to_bytes(2, 'big'))
		elif isinstance(value, str):
			self._wreg(_PLAY_INS, b'\x01\x02' + self._ascll(value))
		else:
			raise ValueError("Input format error")
		time.sleep_ms(self._delay)

	def volume(self, value=None):
		"""None返回音量 int设置音量(0~30)"""
		if value is None:
			self._wreg(_PLAY_VOL, b'\x00')
			_dat = self._rreg(_PLAY_VOL)
			if _dat:
				return _dat[1]
		else:
			value = min(30, max(0, value))
			self._wreg(_PLAY_VOL, b'\x01' + value.to_bytes(1, 'little')) 
			time.sleep_ms(self._delay)

	def mode(self, value=None):
		"""0全部循环 1单曲循环 2目录循环 3随机播放 4单曲停止 5顺序播放"""
		if value is None:
			self._wreg(_PLAY_MODE, b'\x00')
			_dat = self._rreg(_PLAY_MODE)
			if _dat:
				return _dat[1]
		else:
			self._wreg(_PLAY_MODE, b'\x01' + value.to_bytes(1, 'little')) 
			time.sleep_ms(self._delay)
