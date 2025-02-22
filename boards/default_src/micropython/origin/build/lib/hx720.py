"""
HX720/HX711

Micropython	library for the HX720/HX711(Load Cell)
=======================================================
@dahanzimin From the Mixly Team
"""
import time
from machine import Pin
from micropython import const

DATA_BITS 			= const(24)
READY_TIMEOUT_SEC 	= const(500)

class HX720:
	def __init__(self, sck_pin, dat_pin, scale=500, pulse_obj=1):
		self._sck = Pin(sck_pin, Pin.OUT, value=0)
		self._dat = Pin(dat_pin, Pin.IN, Pin.PULL_UP)
		self._obj = min(max(pulse_obj, 1), 3)
		self.scale = scale
		self.tare()

	def _wait(self):
		"""超时响应报错"""
		star = time.ticks_ms()
		while not self.is_ready():
			if time.ticks_diff(time.ticks_ms(), star) > READY_TIMEOUT_SEC:
				raise AttributeError("Cannot find a HX711/HX720")

	def is_ready(self):
		"""检查是否有数据可以读取"""
		return self._dat.value() == 0

	def set_scale(self, scale):
		"""设置比例因子"""
		self.scale = scale

	def read_raw(self):
		"""读取传感器的原始数据"""
		if not self.is_ready():
			self._wait()        
		raw_data = 0
		for _ in range(DATA_BITS):
			self._sck.value(1)
			self._sck.value(0)
			raw_data = raw_data << 1 | self._dat.value()

		# 根据脉冲功能设置多读几次
		for _ in range(self._obj):
			self._sck.value(1)
			self._sck.value(0)
		
		return raw_data | 0xFF000000 if raw_data & 0x800000 else raw_data

	def tare(self, times=10):
		"""清零传感器"""
		total = 0
		for _ in range(times):
			total += self.read_raw()
		self.offset = total / times

	def read_weight(self, times=5):
		"""读取重量数据，返回去掉偏移量的平均值"""
		total = 0
		for _ in range(times):
			total += self.read_raw()
		return round((total / times - self.offset) / self.scale, 2)
