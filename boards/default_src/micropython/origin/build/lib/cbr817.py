"""
CBR817

MicroPython library for the CBR817 (Microwave radar sensor)
=======================================================
@dahanzimin From the Mixly Team
"""
import time
from machine import Pin
from micropython import const

CBR_ADDRESS			= const(0x71)
CBR_OP_SET			= const(0x02)
CBR_TX_RF			= const(0x03)
CBR_POWER			= const(0x04)
CBR_LIGHT			= const(0x0B)
CBR_REG_CTR1		= const(0X13)
CBR_SENSOR_THR		= const(0X18)
CBR_NOISE_THR		= const(0X1A)
CBR_TRIGER			= const(0x1C)
CBR_DELAY_TIM		= const(0X1D)
CBR_LOCK_TIM		= const(0X20)
CBR_SEL_REG			= const(0x23)
CBR_REG_CTR2		= const(0X24)
CBR_FILTER			= const(0x2A)
CBR_RESULT			= const(0x81)

class CBR817:
	def __init__(self, i2c_bus, addr=CBR_ADDRESS, tx_power=3, threshold=5000, noise=256, delay=500, lock=500):
		self._device  = i2c_bus
		self._address = addr
		_str_i2c = str(self._device)	#唤醒需要SCL管脚给高脉冲
		self._scl = Pin(int(_str_i2c[_str_i2c.find('=') + 1 : _str_i2c.find(",")]), Pin.OUT, Pin.OPEN_DRAIN)

		self._configure()
		self.tx_power(tx_power)
		self.threshold(threshold)
		self.noise(noise)
		self.delay_ms(delay)
		self.lock_ms(lock)

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address, reg, val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes <= 1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _wake(self):
		'''Wake up from low power consumption'''
		self._scl.value(0)
		time.sleep_us(10)

	def threshold(self, value=None):
		self._wake()
		if value is None:
			return self._rreg(CBR_SENSOR_THR) | self._rreg(CBR_SENSOR_THR + 1) << 8 
		else:
			self._wreg(CBR_SENSOR_THR, value & 0xFF)
			self._wreg(CBR_SENSOR_THR + 1, (value >> 8) & 0xFF)

	def noise(self, value=None):
		self._wake()
		if value is None:
			return self._rreg(CBR_NOISE_THR) | self._rreg(CBR_NOISE_THR + 1) << 8 
		else:
			self._wreg(CBR_NOISE_THR, value & 0xFF)
			self._wreg(CBR_NOISE_THR + 1, (value >> 8) & 0xFF)

	def delay_ms(self, value=None):
		self._wake()
		if value is None:
			return round((self._rreg(CBR_DELAY_TIM) | self._rreg(CBR_DELAY_TIM + 1) << 8  | self._rreg(CBR_DELAY_TIM + 2) << 16) / 32)
		else:
			value = value * 32
			self._wreg(CBR_DELAY_TIM, value & 0xFF)
			self._wreg(CBR_DELAY_TIM + 1, (value >> 8) & 0xFF)
			self._wreg(CBR_DELAY_TIM + 2, (value >> 16) & 0xFF)

	def lock_ms(self, value=None):
		self._wake()
		if value is None:
			return round((self._rreg(CBR_LOCK_TIM) | self._rreg(CBR_LOCK_TIM + 1) << 8  | self._rreg(CBR_LOCK_TIM + 2) << 16) // 32)
		else:
			value = value * 32
			self._wreg(CBR_LOCK_TIM, value & 0xFF)
			self._wreg(CBR_LOCK_TIM + 1, (value >> 8) & 0xFF)
			self._wreg(CBR_LOCK_TIM + 2, (value >> 16) & 0xFF)

	def tx_power(self, value=None):
		self._wake()
		if value is None:
			return self._rreg(CBR_TX_RF) & 0x07
		else:
			self._wreg(CBR_TX_RF, (value & 0x07) | 0x30)

	def _configure(self):
		self._wake()
		self._wreg(CBR_SEL_REG, 0xC0)			#唤醒射频芯片
		_star = time.ticks_ms()
		while self._rreg(CBR_SEL_REG) != 0xC0:
			self._wreg(CBR_SEL_REG, 0xC0)
			time.sleep_us(10)
			if time.ticks_diff(time.ticks_ms(), _star) >= 200:
				raise AttributeError("Cannot find a CBR817")
		self._wreg(CBR_TRIGER, 0x55)			#连续检测
		self._wreg(CBR_LIGHT, 0x12)				#关闭光敏
		self._wreg(CBR_POWER, 0xA0)				#功耗全供电
		self._wreg(CBR_FILTER, 0x0F)			#打开滤波器
		self._wreg(CBR_OP_SET, 0x5C)			#单运放，0.5uA电流
		self._wreg(CBR_REG_CTR1, 0X61)			#感应门限和噪声门限改寄存器控制
		self._wreg(CBR_REG_CTR2, 0X60)			#延时时间和闭锁时间改寄存器控制

	def result(self):
		self._wake()
		return bool(self._rreg(CBR_RESULT) & 0x20)
