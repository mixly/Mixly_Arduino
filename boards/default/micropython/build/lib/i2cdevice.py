"""
I2C_Device

Micropython library for the I2C communication Device(TD)
=======================================================

@dahanzimin From the Mixly Team
"""
import random
from machine import SoftI2C

def _u2s(value, n=8):
	return value if value < (1 << (n-1)) else value - (1 << n)	

'''i2c-Inheritance'''
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

'''Fundamentals of Sensors'''
class Base:
	def __init__(self, i2c_bus):
		self._i2c = i2c_bus

	def addr_set(self, old=0, new=0):
		try:
			self._i2c.write_device(self._addrs[old], 0x04, bytearray([self._addrs[old], self._addrs[new]])) 
		except Exception as e:
			print("Warning: No serial number can be changed or", e)	

	def addr_get(self):
		_addred = []
		for add in self._i2c.scan():
			if add in self._addrs:
				_addred.append(self._addrs.index(add))
		return tuple(_addred)	

'''Motor'''
class Motor(Base):
	_addrs = [0x30, 0x31, 0x32, 0x33]
	
	def run(self, naddr=0, speed=None):
		'''普票电机参数 speed: 速度-100~100%, None返回速度值'''
		try:
			if speed is None:
				return _u2s(self._i2c.read_device(self._addrs[naddr], 0x10))
			else:
				speed = max(min(speed, 100), -100)
				self._i2c.write_device(self._addrs[naddr], 0xA0, speed)
		except Exception as e:
			raise RuntimeError("Cannot find a Motor device", e)

'''Traffic light'''
class Traffic_LED(Base):
	_addrs = [0x48, 0x49, 0x4A, 0x4B]

	def led(self, naddr=0, num=0, value=0):
		'''交通灯参数 value: 0,全灭 1,长亮 -1,闪烁(1hz)'''
		try:
			if value == 0:
				self._i2c.write_device(self._addrs[naddr], 0xA0, 0x00) 
			elif value == 1:
				self._i2c.write_device(self._addrs[naddr], 0xA0, 0x04 >> num)
			elif value == -1:
				self._i2c.write_device(self._addrs[naddr], 0xA0, 0x40 >> num)	
		except Exception as e:
			raise RuntimeError("Cannot find a Traffic lights", e)

'''LED'''
class LED(Base):

	def brightness(self, naddr=0, value=None):
		'''LED灯参数 value: 亮度0~100%, None返回亮度值'''
		try:
			if value is None:
				return self._i2c.read_device(self._addrs[naddr], 0x10)
			else:
				value = max(min(value, 100), 0)
				self._i2c.write_device(self._addrs[naddr], 0xA0, value)

		except Exception as e:
			raise RuntimeError("Cannot find a LED device", e)

class W_LED(LED):
	_addrs = [0x38, 0x39, 0x3A, 0x3B]

class R_LED(LED):
	_addrs = [0x3C, 0x3D, 0x3E, 0x3F]

class Y_LED(LED):
	_addrs = [0x40, 0x41, 0x42, 0x43]

class G_LED(LED):
	_addrs = [0x44, 0x45, 0x46, 0x47]

class B_LED(LED):
	_addrs = [0x78, 0x79, 0x7A, 0x7B]

'''button*5'''
class Buttonx5(Base):
	_addrs = [0x68, 0x69, 0x6A, 0x6B]

	def value(self, naddr=0):
		'''十字按键返回 (上,下,左,右,中)/bool'''
		try:
			flag = self._i2c.read_device(self._addrs[naddr], 0x10)
			return  bool(flag >> 4 & 1), bool(flag >> 3 & 1), bool(flag >> 2 & 1), bool(flag >> 1 & 1), bool(flag & 1)
		except Exception as e:
			raise RuntimeError("Cannot find a Button sensor", e)

'''button*1'''
class Button(Base):
	_addrs = [0x54, 0x55, 0x56, 0x57]

	def value(self, naddr=0):
		'''触碰传感器返回 数值/bool'''
		try:
			return  bool(self._i2c.read_device(self._addrs[naddr], 0x10))
		except Exception as e:
			raise RuntimeError("Cannot find a Touch sensor", e)

'''Infrared sensor'''
class Infrared(Base):
	_addrs = [0x6C, 0x6D, 0x6E, 0x6F]

	def value(self, naddr=0):
		'''红外接近返回 数值0~100%'''
		try:
			return  self._i2c.read_device(self._addrs[naddr], 0x10)
		except Exception as e:
			raise RuntimeError("Cannot find a Infrared sensor", e)

'''ultrasonic sensor'''
class Sonar(Base):
	_addrs = [0x24, 0x25, 0x26, 0x27]
	_state = 0x00
	def value(self, naddr=0):
		'''超声波测距返回 距离数值cm'''
		try:
			value = self._i2c.read_device(self._addrs[naddr], 0x10, 2)
			return  value[0] << 8 | value[1]
		except Exception as e:
			raise RuntimeError("Cannot find a Ultrasonic sensor", e)

	def led(self, naddr=0, num=0, value=0):
		'''超声波指示灯参数 num:序号0~3,value:0灭,1亮,-1反转 '''
		try:
			if value > 0:
				self._state |= 1 << num 
			elif value < 0:
				self._state ^= 1 << num
			else:
				 self._state &= ~ (1 << num)
			self._i2c.write_device(self._addrs[naddr], 0xA0, bytearray([self._state & 0xff, 0x00]))
		except Exception as e:
			raise RuntimeError("Cannot find a Ultrasonic sensor", e)

'''Potentiometer'''
class Dimmer(Base):
	_addrs = [0x2C, 0x2D, 0x2E, 0x2F]

	def value(self, naddr=0):
		'''旋钮传感器返回 数值0~100%'''
		try:
			return  self._i2c.read_device(self._addrs[naddr], 0x10)
		except Exception as e:
			raise RuntimeError("Cannot find a Potentiometer", e)

'''Color sensor'''
class Color_ID(Base):
	_id = ('Black', 'Violet', 'Unknown', 'Blue', 'Cyan', 'Green', 'Unknown', 'Yellow', 'Unknown', 'Red', 'White', 'Unknown')
	_addrs = [0x20, 0x21, 0x22, 0x23]

	def recognition(self, naddr=0):
		'''颜色识别返回 (颜色名,(R,G,B),环境亮度0~100,反射亮度0~100)'''
		try:
			color = self._i2c.read_device(self._addrs[naddr], 0x10, 6)
			return  self._id[min(color[0],11)], (color[1],color[2],color[3]), color[4], color[5]
		except Exception as e:
			raise RuntimeError("Cannot find a Color sensor", e)

'''Laser Sensor'''
class TOF(Base):
	_addrs = [0x5C, 0x5D, 0x5E, 0x5F]

	def value(self, naddr=0):
		'''激光测距传感器返回 数值cm'''
		try:
			flag = self._i2c.read_device(self._addrs[naddr], 0x10, 2)
			return (flag[0] << 8 | flag[1]) / 100
		except Exception as e:
			raise RuntimeError("Cannot find a Laser Sensor", e)

	def enable(self, naddr=0, en=True):
		'''激光测距传感器 en:0关闭,1打开'''
		try:
			self._i2c.write_device(self._addrs[naddr], 0xA0, int(en) & 0x01)
		except Exception as e:
			raise RuntimeError("Cannot find a Laser Sensor", e)

'''Servo Motor'''
class Motor_servo(Base):
	_addrs = [0x60, 0x61, 0x62, 0x63]
	_mstop = [0, 0, 0, 0]

	def stop_mode(self, naddr=0, mode=0):
		'''电机停止模式 mode:0,保持位置 1,惯性滑行 2,阻力制动'''
		self._mstop[naddr] = mode

	def _write(self, naddr=0, mode=0, value=0, direction=0, angle=0, origin=0, keep=0, select=0):
		'''寄存器参数设置'''
		try:
			_bytes1 = direction<<6 | mode<<5 | select<<4 | origin<<3 | keep<<2 | self._mstop[naddr] 
			_bytes2 = max(min(value, 100), 0)
			_bytes3 = angle & 0xFF
			_bytes4 = angle>>8 & 0xFF
			_bytes5 = angle>>16 & 0xFF
			self._i2c.write_device(self._addrs[naddr], 0xA0, bytearray([_bytes1, _bytes2, _bytes3, _bytes4, _bytes5])) 
		except Exception as e:
			raise RuntimeError("Cannot find a Servo Motor", e)
			
	def absolute_run(self, naddr=0, mode=0, value=50, direction=0, angle=0):
		'''	绝对角度运行模式（类舵机）
			运行模式mode        0:速度模式，1:功率模式
			模式数值value		0~100%
			转向设置direction	0:顺时针，1:最短路径，2:逆时针
			旋转角度angle		0~360°
		'''
		self._write(naddr=naddr, mode=mode, value=value, direction=direction, angle=angle, select=0)

	def relative_run(self, naddr=0, mode=0, value=50, angle=0):
		'''	相对角度运行模式（类编码电机）
			运行模式mode        0:速度模式，1:功率模式
			模式数值value		0~100%
			旋转角度angle		-8388607~8388607°
		'''
		self._write(naddr=naddr, mode=mode, value=value, angle=angle, select=1) 

	def relative_origin(self, naddr=0):
		'''当前位置设置为原点'''
		self._write(naddr=naddr, origin=1, select=1)

	def relative_continue(self, naddr=0, mode=0, value=50, direction=0):
		'''	相对角度运行模式（类普通电机）
			运行模式mode        0:速度模式，1:功率模式
			模式数值value		0~100%
			转向设置direction	0:顺时针，2:逆时针
		'''
		self._write(naddr=naddr, mode=mode, value=value, direction=direction, keep=1, select=1)

	def stop(self, naddr=0):
		'''电机停止'''
		self._write(naddr=naddr, keep=1)
	
	def state(self,naddr=0):
		'''运行状态返回 (功率, 速度, 绝对角度, 相对角度, 是否堵住, 是否转完) '''
		try:        
			_buf = self._i2c.read_device(self._addrs[naddr], 0x10, 7)
			return _u2s(_buf[0]), _u2s(_buf[1]), (_buf[2] & 0x01)<<8 | _buf[3], _u2s((_buf[4]<<16 | _buf[5]<<8 | _buf[6]),24), bool(_buf[2] & 0x40), bool(_buf[2] & 0x80)
		except Exception as e:
			raise RuntimeError("Cannot find a Servo Motor", e)
