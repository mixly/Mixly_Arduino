"""
NOVA_G1

Micropython	library for the NOVA_G1(PWM*6, IO*2, ADC*1)
=======================================================

#Preliminary composition				20240222

@dahanzimin From the Mixly Team
"""
from micropython import const
from mixgo_nova import onboard_i2c

_NOVA_G1_ADDRESS	= const(0x25)
_NOVA_G1_ID			= const(0x00)
_NOVA_G1_ADC		= const(0x01)
_NOVA_G1_IO			= const(0x03)
_NOVA_G1_PWM		= const(0x04)

class NOVA_G1:
	def __init__(self, i2c_bus, addr=_NOVA_G1_ADDRESS):
		self._i2c=i2c_bus
		self._addr = addr
		if self._rreg(_NOVA_G1_ID)!= 0x25:
			raise AttributeError("Cannot find a NOVA_G1")
		self.reset()

	def _wreg(self, reg, val):
		'''Write memory address'''
		try:
			self._i2c.writeto_mem(self._addr, reg, val.to_bytes(1, 'little'))
		except:
			return 0 

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		try:
			self._i2c.writeto(self._addr, reg.to_bytes(1, 'little'))
			return  self._i2c.readfrom(self._addr, nbytes)[0] if nbytes<=1 else self._i2c.readfrom(self._addr, nbytes)[0:nbytes]
		except:
			return 0

	def reset(self):
		"""Reset all registers to default state"""
		for reg in range(_NOVA_G1_PWM,_NOVA_G1_PWM + 6):
			self._wreg(reg,0x00)

	def varistor(self, ratio=100/1023):
		'''Read battery power'''
		_adc= self._rreg(_NOVA_G1_ADC) << 2 | self._rreg(_NOVA_G1_ADC+1) >> 6
		return round(_adc * ratio)
	
	def pwm(self, index, duty=None):
		"""Motor*2*2 & USB*2 PWM duty cycle data register"""
		if duty is None:
			return self._rreg(_NOVA_G1_PWM + index)
		else:
			duty = min(255, max(0, duty))
			self._wreg(_NOVA_G1_PWM + index, duty)

	def motor(self, index, action, speed=0):
		if not 0 <= index <= 1:
			raise ValueError("Motor port must be a number in the range: 0~1")
		speed = min(100, max(speed, -100))
		if action=="N":
			self.pwm(index * 2, 0)
			self.pwm(index * 2 + 1, 0)
		elif action=="P":
			self.pwm(index * 2, 255)
			self.pwm(index * 2 + 1, 255)
		elif action=="CW":
			if speed >= 0:
				self.pwm(index * 2, 0)
				self.pwm(index * 2 + 1, speed * 255 // 100)
			else:
				self.pwm(index * 2, 0)
				self.pwm(index * 2 + 1, - speed * 255 // 100)
		elif action=="CCW":
			if speed >= 0:
				self.pwm(index * 2, speed * 255 // 100)
				self.pwm(index * 2 + 1, 0)
			else:
				self.pwm(index * 2, - speed * 255 // 100)
				self.pwm(index * 2 + 1, 0)
		elif action=="NC":
			return round(self.pwm(index * 2) * 100 / 255), round(self.pwm(index * 2 + 1) * 100 / 255)
		else:
			raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

	def usb_pwm(self, index, duty=None):
		if not 0 <= index <= 1:
			raise ValueError("USB-2.0 port must be a number in the range: 0~1")
		if duty is None:
			return  round((self.pwm(index + 4) * 100 / 255))
		else:
			self.pwm(index + 4, duty * 255 // 100)

	def spk_en(self, onoff=True):
		if onoff: 
			self._wreg(_NOVA_G1_IO, (self._rreg(_NOVA_G1_IO)) | 0x02)
		else:
			self._wreg(_NOVA_G1_IO, (self._rreg(_NOVA_G1_IO)) & 0xFD)

	def ldo_en(self, onoff=True):
		if onoff: 
			self._wreg(_NOVA_G1_IO, (self._rreg(_NOVA_G1_IO)) | 0x01)
		else:
			self._wreg(_NOVA_G1_IO, (self._rreg(_NOVA_G1_IO)) & 0xFE)

#Constructor
ext_g1 = NOVA_G1(onboard_i2c)
