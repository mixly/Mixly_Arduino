"""
IR-Remote

Micropython library for the IR-Remote/Timer(IR_RX&TX)
===============================================
#Preliminary composition               20240302

@dahanzimin From the Mixly Team
"""
import array, time, gc
from esp32 import RMT
from machine import Pin, Timer

'''接收部分'''
class IR_RX:
	BADSTART = 'Invalid start pulse'
	BADDATA = 'Invalid data'
	def __init__(self, pin, callback=None, timeout=15000, timer_id=1):
		self._start = 0
		self._ready = False
		self._enable = False
		self._timeout = timeout
		self._callback = callback	
		self._pulses = array.array('H')
		self.code = [None, None, None, memoryview(self._pulses)] 	#存放[cmd, addr, data, pulses]
		Pin(pin, Pin.IN).irq(handler=self._irq_cb, trigger=(Pin.IRQ_FALLING | Pin.IRQ_RISING))
		Timer(timer_id).init(period=5, mode=Timer.PERIODIC, callback=self._timer_cb)

	def _irq_cb(self, pin):
		if not self._enable:
			_intime = time.ticks_us()
			if self._start == 0:
				self._start = _intime
				return
			self._pulses.append(time.ticks_diff(_intime, self._start))
			self._start = _intime
		else:
			self._start = 0
			self._pulses = array.array('H')

	def _timer_cb(self, tim):
		if len(self._pulses) >= 3 and time.ticks_diff(time.ticks_us(), self._start) > self._timeout:
			#接收完成，开始解码
			self.code[3] = memoryview(self._pulses)
			if self.decode() is None and self._callback:
				self._callback(self.code[0], self.code[1], self.code[2], self.code[3])
			self._ready = True
			self._start = 0
			self._pulses = array.array('H')
			gc.collect()

	def recv_cb(self, callback):
		self._callback = callback

	def timeout(self, timeout=15000):
		self._timeout = timeout

	def any(self):
		ready = self._ready
		self._ready = False
		return ready

	def enable(self, onoff):
		self._enable = onoff

class NEC_RX(IR_RX):
	def __init__(self, pin, bits=None, callback=None):
		super().__init__(pin, callback, timeout=15000)
		self._bits = bits

	def decode(self):
		pulse_len = len(self._pulses)
		if pulse_len < 3:
			print("Warning:", self.BADSTART)
			return False
		else:
			start_i = 0
			value = 0
			#跳过帧头(各厂家定义不一)
			for i in range(pulse_len):
				if self._pulses[i] <= 2250:
					start_i = i
					break
			val = 1 << ((pulse_len - start_i - 1) // 2) - 1 if (pulse_len - start_i) >= 3 else 0
			#根据高低脉冲定义转码
			for edge in range(start_i, pulse_len - 1, 2):
				value >>= 1
				if self._pulses[edge + 1] > 1120:
					value |= val
			#判读是8、16位解码
			if self._bits == 8 or self._bits == 16:
				cmd = value >> 16 & 0xff
				if cmd != (value >> 24 ^ 0xff) and value != 0x0:
					print("Warning:", self.BADDATA)
					return False
				addr = value & 0xff if self._bits == 8 else  value & 0xffff
				self.code[0:3] = cmd, addr, value
			#其他未定义直接输出转码
			else:
				self.code[0:3] = None, None, value

class RC5_RX(IR_RX):
	def __init__(self, pin, callback=None):
		super().__init__(pin, callback, timeout=15000)

	def decode(self):
		pulse_len = len(self._pulses)
		if pulse_len < 3:
			print("Warning:", self.BADSTART)
			return False
		else:
			bit = 1
			value = 0 
			num = 0
			while True:
				short = self._pulses[num] < 1334
				if not short:
					bit ^= 1
				value <<= 1
				value |= bit
				num += 1 + int(short)
				if num >= pulse_len:
					value >>= 1
					break
			#判读解码
			cmd = (value & 0x3f) | (0 if ((value >> 12) & 1) else 0x40)
			addr = (value >> 6) & 0x1f
			self.code[0:3] = cmd, addr, value

'''发射部分'''
class IR_TX:
	def __init__(self, pin, cfreq=38000, power=60):
		self._rmt = RMT(0, pin=Pin(pin), clock_div=80, tx_carrier = (cfreq, round(power * 0.75), 1))
		self._pulses = array.array('H')
		self.carrier = False

	def transmit(self, cmd=None, addr=None, toggle=None, pulses=None, raw=None):
		if pulses is None:
			self.carrier = False
			if raw is None:
				self.tx(cmd, addr, toggle)
			else:
				self.tx_raw(raw)
			self._rmt.write_pulses(tuple(self._pulses))
			self._pulses = array.array('H')
		else:
			self._rmt.write_pulses(tuple(pulses))

	def busy(self):
		return not self._rmt.wait_done()

	def _append(self, *times):
		for t in times:
			self._pulses.append(t)
			self.carrier = not self.carrier

	def _add(self, t):
		assert t > 0
		self._pulses[len(self._pulses)-1] +=t

class NEC_TX(IR_TX):  
	_TBURST = const(563)
	_T_ONE 	= const(1687)
	def __init__(self, pin, samsung=False, power=60): 
		super().__init__(pin, 38000, power) 
		self._samsung = samsung

	def _bit(self, b):
		self._append(_TBURST, _T_ONE if b else _TBURST)

	def tx(self, cmd, addr, toggle=0):  #cmd:0~0xff, addr:0~0xffff, toggle:0,1
		if self._samsung:
			self._append(4500, 4500)
		else:
			self._append(9000, 4500)
		if addr < 256:  # Short address: append complement
			if self._samsung:
			  addr |= addr << 8
			else:
			  addr |= ((addr ^ 0xff) << 8)
		for _ in range(16):
			self._bit(addr & 1)
			addr >>= 1
		cmd |= ((cmd ^ 0xff) << 8)
		for _ in range(16):
			self._bit(cmd & 1)
			cmd >>= 1
		self._append(_TBURST) 
		if toggle == 1:
			self._append(30000, 9000, 2250, _TBURST) 

	def tx_raw(self, raw):
		self._append(9000, 4500)
		while raw:
			self._bit(raw & 1)
			raw >>= 1
		self._append(_TBURST) 

class RC5_TX(IR_TX):  
	_T_RC5 = const(889)
	def __init__(self, pin, power=60): 
		super().__init__(pin, 36000, power) 

	def tx(self, cmd, addr, toggle):  #cmd:0~0x3f, addr:0~0x1f, toggle:0,1 
		d = (cmd & 0x3f) | ((addr & 0x1f) << 6) | (((cmd & 0x40) ^ 0x40) << 6) | ((toggle & 1) << 11)
		mask = 0x2000
		while mask:
			if mask == 0x2000:
				self._append(_T_RC5)
			else:
				bit = bool(d & mask)
				if bit ^ self.carrier:
					self._add(_T_RC5)
					self._append(_T_RC5)
				else:
					self._append(_T_RC5, _T_RC5)
			mask >>= 1

	def tx_raw(self, raw):
		self._append(_T_RC5)
		mask = 1 << len(bin(raw)) - 3
		while mask:
			if bool(raw & mask) ^ self.carrier:
				self._add(_T_RC5)
				self._append(_T_RC5)
			else:
				self._append(_T_RC5, _T_RC5)
			mask >>= 1
		self._append(_T_RC5)
