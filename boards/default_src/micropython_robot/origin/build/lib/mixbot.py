"""
Mixbot-Onboard resources

Micropython library for the Mixbot-Onboard resources
=======================================================

@dahanzimin From the Mixly Team
"""

import time, gc, random, uframebuf
from micropython import const
from machine import Pin, SoftI2C, ADC, PWM, RTC

'''RTC'''
rtc_clock=RTC()

'''2RGB_WS2812'''
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(12), 2, default=1, timing=(450, 900, 850, 500))

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(25)

spk_en = Pin(27, Pin.OUT)
spk_en.value(0)

'''i2c-onboard & ext'''
class I2C_device(SoftI2C):

	CRC8_Table =b'\x00^\xbc\xe2a?\xdd\x83\xc2\x9c~ \xa3\xfd\x1fA\x9d\xc3!\x7f\xfc\xa2@\x1e_\x01\xe3\xbd>`\x82\xdc#}\x9f\xc1B\x1c\xfe\xa0\xe1\xbf]\x03\x80\xde<b\xbe\xe0\x02\\\xdf\x81c=|"\xc0\x9e\x1dC\xa1\xffF\x18\xfa\xa4\'y\x9b\xc5\x84\xda8f\xe5\xbbY\x07\xdb\x85g9\xba\xe4\x06X\x19G\xa5\xfbx&\xc4\x9ae;\xd9\x87\x04Z\xb8\xe6\xa7\xf9\x1bE\xc6\x98z$\xf8\xa6D\x1a\x99\xc7%{:d\x86\xd8[\x05\xe7\xb9\x8c\xd20n\xed\xb3Q\x0fN\x10\xf2\xac/q\x93\xcd\x11O\xad\xf3p.\xcc\x92\xd3\x8do1\xb2\xec\x0eP\xaf\xf1\x13M\xce\x90r,m3\xd1\x8f\x0cR\xb0\xee2l\x8e\xd0S\r\xef\xb1\xf0\xaeL\x12\x91\xcf-s\xca\x94v(\xab\xf5\x17I\x08V\xb4\xeai7\xd5\x8bW\t\xeb\xb56h\x8a\xd4\x95\xcb)w\xf4\xaaH\x16\xe9\xb7U\x0b\x88\xd64j+u\x97\xc9J\x14\xf6\xa8t*\xc8\x96\x15K\xa9\xf7\xb6\xe8\nT\xd7\x89k5'

	def _crc8(self, buf):
		_sum = 0
		for i in range(0, len(buf)):
			_sum = self.CRC8_Table[_sum ^ buf[i]]
		return _sum

	def read_device(self, addr, cmd, nbytes=1):
		buf = self.readfrom_mem(addr, cmd, nbytes+2)
		if self._crc8(buf[:-1]) == buf[-1]:
			return buf[1] if nbytes<=1 else buf[1:-1]

	def write_device(self, addr, cmd, buf=0):
		buf = buf.to_bytes(1, 'little') if type(buf) is int else buf
		buf = bytearray([cmd, random.randint(0, 255)]) + buf
		crc8 = self._crc8(buf).to_bytes(1, 'little')
		self.writeto(addr, buf + crc8)
		if crc8 == self.readfrom(addr, 1):
			return True

onboard_i2c = I2C_device(scl=Pin(18), sda=Pin(23) , freq=400000)
ext_i2c = I2C_device(scl=Pin(22), sda=Pin(21), freq=200000)

'''Version judgment'''
if 0x68 in onboard_i2c.scan():
	version=1
else:
	version=0

'''Accelerometer+Gyroscope'''
if version:
	import icm42670
	acc_gyr = icm42670.ICM42670(onboard_i2c)

'''2-Button'''
class Button:
	def __init__(self, pin, level=True):
		self._pin = Pin(pin, Pin.IN)
		self._flag = True
		self._level = level

	def get_presses(self, delay = 1):
		last_time,presses = time.time(), 0
		while time.time() < last_time + delay:
			time.sleep(0.05)
			if self.was_pressed():
				presses += 1
		return presses

	def is_pressed(self):
		return self._pin.value() == self._level

	def was_pressed(self):
		if self._pin.value() != self._flag:
			time.sleep(0.01)
			self._flag = self._pin.value()
			return self._level if self._flag else not self._level

	def irq(self, handler, trigger):
		self._pin.irq(handler = handler, trigger = trigger)

button_p = Button(34, True)
button_a = Button(35, False)
button_b = Button(39, False)

'''2-LED'''  
class LED:
	def __init__(self, pin):
		self._pin =PWM(Pin(pin), freq=5000, duty_u16=65535)
		self.setbrightness(0)
		
	def setbrightness(self,val):
		if not 0 <= val <= 100:
			raise ValueError("Brightness must be in the range: 0-100%")
		self._brightness=val
		self._pin.duty_u16(val * 65535 // 100)

	def getbrightness(self):
		return self._brightness

	def setonoff(self,val):
		if(val == -1):
			self.setbrightness(100)  if self._brightness < 50 else self.setbrightness(0) 
		elif(val == 1):
			self.setbrightness(100) 
		elif(val == 0):
			self.setbrightness(0) 
			
	def getonoff(self):
		return True if self._brightness > 0 else False

	def value(self,val=None):
		if val is None:
			return self.getonoff()
		else:
			self.setbrightness(100)  if val else self.setbrightness(0)

rled = LED(2)
gled = LED(4)

'''3-ADCSensor'''
class ADCSensor:
	def __init__(self, pin):
		self.adc=ADC(Pin(pin))
		self.adc.atten(ADC.ATTN_11DB) 

	def read(self):
		return self.adc.read_u16()
	
	def voltage(self, scale=4.6):
		return round(self.adc.read_uv() * scale / 1000000, 2) 

	def loudness(self):
		values = []
		for i in range(200):
			val = self.adc.read_u16()
			values.append(val)
		return max(values) - min(values)

adc1 = ADCSensor(33)
adc2 = ADCSensor(32)
battery = ADCSensor(36)
sound = ADCSensor(38)

'''4-FindLine /i2c'''
class FindLine(object):

	CORRECTING_WHITE        = const(0x01)
	CORRECTING_BLACK        = const(0x02)
	CORRECTING_RESET_TO_FAB = const(0x04)

	def __init__(self, i2c_bus, addr=0x01):
		self._i2c = i2c_bus
		self._addr = addr
		self._data = (0,0,0,0)
	
	def getdata(self):
		_buf = self._i2c.read_device(self._addr, 0x10, 4)
		if _buf:
			self._data = tuple(_buf)
		return self._data
	
	def correct(self,type):
		'''type 0x01 校正白色 0x02 校正黑色 0x04 恢复出厂 '''
		if type not in [CORRECTING_WHITE, CORRECTING_BLACK, CORRECTING_RESET_TO_FAB]:
			raise ValueError('Invalid parameter')
		self._i2c.write_device(self._addr, 0xA0, type)

patrol = FindLine(onboard_i2c)

'''4-LEDmatrix /i2c'''
class Matrix5x5(uframebuf.FrameBuffer_Ascall):

	"""Graph module 5x5"""
	HEART = b'\n\x1f\x1f\x0e\x04'
	HEART_SMALL = b'\x00\n\x0e\x04\x00'
	HAPPY = b'\x00\n\x00\x11\x0e'
	SAD = b'\x00\n\x00\x0e\x11'
	SMILE =  b'\x00\x00\x00\x11\x0e'
	SILLY = b'\x11\x00\x1f\x14\x1c'
	FABULOUS = b'\x1f\x1b\x00\n\x0e'
	SURPRISED = b'\n\x00\x04\n\x04'
	ASLEEP = b'\x00\x1b\x00\x0e\x00'
	ANGRY = b'\x11\n\x00\x1f\x15'		
	CONFUSED = b'\x00\n\x00\n\x15'
	NO = b'\x11\n\x04\n\x11'
	YES = b'\x00\x10\x08\x05\x02'
	LEFT_ARROW = b'\x04\x02\x1f\x02\x04'
	RIGHT_ARROW = b'\x04\x08\x1f\x08\x04'
	DRESS = b'\n\x1b\x0e\x0e\x1f'
	TRANSFORMERS = b'\x04\x0e\x15\n\x11'
	SCISSORS = b'\x13\x0b\x04\x0b\x13'
	EXIT = b'\x04\x0e\x15\x0b\x10'
	TREE = b'\x04\x0e\x1f\x04\x04'
	PACMAN = b'\x1e\x0b\x07\x0f\x1e'
	TARGET = b'\x04\x0e\x1b\x0e\x04'
	TSHIRT = b'\x1b\x1f\x0e\x0e\x0e'
	ROLLERSKATE = b'\x18\x18\x1f\x1f\n'
	DUCK = b'\x06\x07\x1e\x0e\x00'
	HOUSE = b'\x04\x0e\x1f\x0e\n'
	TORTOISE = b'\x00\x0e\x1f\n\x00'
	BUTTERFLY = b'\x1b\x1f\x04\x1f\x1b'
	STICKFIGURE = b'\x04\x1f\x04\n\x11'
	GHOST = b'\x1f\x15\x1f\x1f\x15'
	PITCHFORK = b'\x15\x15\x1f\x04\x04'
	MUSIC_QUAVERS = b'\x1e\x12\x12\x1b\x1b'	
	MUSIC_QUAVER = b'\x04\x0c\x14\x07\x07'
	MUSIC_CROTCHET = b'\x04\x04\x04\x07\x07'
	COW = b'\x11\x11\x1f\x0e\x04'
	RABBIT = b'\x05\x05\x0f\x0b\x0f'
	SQUARE_SMALL = b'\x00\x0e\n\x0e\x00'
	SQUARE = b'\x1f\x11\x11\x11\x1f'
	DIAMOND_SMALL = b'\x00\x04\n\x04\x00'
	DIAMOND = b'\x04\n\x11\n\x04' 
	CHESSBOARD = b'\n\x15\n\x15\n'
	TRIANGLE_LEFT = b'\x01\x03\x05\t\x1f'				
	TRIANGLE = b'\x00\x04\n\x1f\x00'
	SNAKE = b'\x03\x1b\n\x0e\x00'
	UMBRELLA = b'\x0e\x1f\x04\x05\x06'
	SKULL = b'\x0e\x15\x1f\x0e\x0e'	
	GIRAFFE = b'\x03\x02\x02\x0e\n'
	SWORD = b'\x04\x04\x04\x0e\x04' 


	def __init__(self, i2c_bus, addr=0x03, brightness=0.5):
		self._i2c = i2c_bus
		self._addr = addr
		self._brightness= brightness
		self._buffer = bytearray(5)
		super().__init__(self._buffer, 5, 5, uframebuf.MONO_HMSB) 
		self.font("5x5")
		self.screenbright(self._brightness)
		self.clear()   

	def screenbright(self, brightness=None, background=0):
		if brightness is None :
			return self._brightness
		else:
			if not 0.0 <= brightness <= 1.0:
				raise ValueError("Brightness must be a decimal number in the range: 0.0-1.0")
			self._brightness = brightness
			self._i2c.write_device(self._addr, 0xA5, bytes([round(255 * brightness), round(255 * background)])) 

	def ambientbright(self):
		bright = self._i2c.read_device(self._addr, 0x10)
		if bright:
			return bright

	def direction(self,mode = 0):
		'''set display direction '''
		self._i2c.write_device(self._addr, 0xA7, mode)

	def show(self):
		'''Refresh the display and show the changes'''
		buf = bytearray(4)
		buf[0] = (self._buffer[4] & 0xF0) >> 4
		buf[1] = (self._buffer[3] & 0x1E) >> 1 | (self._buffer[4] & 0x0F) << 4
		buf[2] = (self._buffer[1] & 0x18) >> 3 | (self._buffer[2] & 0x1F) << 2 | (self._buffer[3] & 0x01) << 7
		buf[3] = (self._buffer[0] & 0x1F) | (self._buffer[1] & 0x07) << 5 
		self._i2c.write_device(self._addr, 0xA1, buf)

	def clear(self):
		''' clear display'''
		self._i2c.write_device(self._addr, 0xA6)
	
onboard_matrix = Matrix5x5(onboard_i2c)

'''2 Motor /i2c'''
class Motor(object):
	
	STOP_MODE	= const(0x00)
	BRAKE_MODE	= const(0x01)
	PWR_MODE	= const(0x02)
	SPEED_MODE	= const(0x03)
	TURNS_MODE	= const(0x04)
	
	def __init__(self, i2c_bus, addr=0x02, scale=90 * 4):
		self._i2c = i2c_bus
		self._addr = addr
		self._scale = scale
		self._signala = PWM(Pin(13), freq=500, duty_u16=49150)
		self._signalb = PWM(Pin(14), freq=500, duty_u16=49150)
		self._status = ((0,0,0,0), (0,0,0,0))
		self._motor = ([0,0], [0,0])
	
	def _u2s(self, value, n=8):
		return value if value < (1 << (n-1)) else value - (1 << n)	
	
	def status(self):
		_buf = self._i2c.read_device(self._addr, 0x10, 9)
		if _buf:
			self._status = ((_buf[0] >> 4, -self._u2s(_buf[1]), -self._u2s(_buf[3]), abs(self._u2s(_buf[6] << 8 | _buf[5], 16))),
							(_buf[0] & 0x0F, self._u2s(_buf[2]), self._u2s(_buf[4]), abs(self._u2s(_buf[8] << 8 | _buf[7], 16))))   
		return self._status
		
	def run(self, idx, mode, value):
		if idx == 1 or idx == 2:
			self._motor[idx-1][0], self._motor[idx-1][1] = mode, value
		else:
			self._motor = ([mode, value], [mode, value])

		buf =  bytearray(5)
		m1_pwr_speed, m2_pwr_speed = 0, 0
		buf[0] = (self._motor[0][0] << 4) | self._motor[1][0] 
		if self._motor[0][0] == self.TURNS_MODE:
			_turns = round(self._motor[0][1] * self._scale)
			buf[1] = (- _turns) & 0xFF
			buf[2] = ((- _turns) >> 8) & 0xFF
		else:
			m1_pwr_speed = - max(min(self._motor[0][1], 100), -100)
		if self._motor[1][0] == self.TURNS_MODE:
			_turns = round(self._motor[1][1] * self._scale)
			buf[3] = _turns & 0xFF
			buf[4] = (_turns >> 8) & 0xFF
		else:
			m2_pwr_speed = max(min(self._motor[1][1], 100), -100)
		
		self._i2c.write_device(self._addr, 0xA0, buf)
		self._signala.duty_u16(33422 + 31457 * (m1_pwr_speed + 100) // 200)
		self._signalb.duty_u16(33422 + 31457 * (m2_pwr_speed + 100) // 200)

	def move(self, action, mode, value=100):
		if action=="N":
			self.run(0, self.STOP_MODE, 0)
		elif action=="P":
			self.run(0, self.BRAKE_MODE, 0)
		elif action=="F":
			self.run(0, mode, value)
		elif action=="B":
			self.run(0, mode, -value)
		elif action=="L":
			self.run(1, mode, -value)
			self.run(2, mode, value)
		elif action=="R":
			self.run(1, mode, value)
			self.run(2, mode, -value)			
		else:
			raise ValueError('Invalid input, valid are "N","P","F","B","L","R"') 

motor = Motor(onboard_i2c)

'''Reclaim memory'''
gc.collect()
