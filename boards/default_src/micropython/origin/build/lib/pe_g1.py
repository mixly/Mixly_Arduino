"""
PE_G1

Micropython	library for the PE_G1(Motor*5*2 & Servo*4)
=======================================================

#Preliminary composition	  	    			20230120

@dahanzimin From the Mixly Team
"""
from time import sleep_ms
from micropython import const

_PE_G1_ADDRESS			= const(0x25)
_PE_G1_ID   			= const(0x00)
_PE_G1_VBAT   			= const(0x01)
_PE_G1_MOTOR			= const(0x03)
_PE_G1_SERVO			= const(0x0D)
_PE_G1_OFF  			= const(0x16)

class PE_G1:
	def __init__(self, i2c_bus, addr=_PE_G1_ADDRESS):
		self._i2c=i2c_bus
		self._addr = addr
		sleep_ms(500)
		if self._rreg(_PE_G1_ID)!= 0x25:
			raise AttributeError("Cannot find a PE_G1")
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
		for reg in range(_PE_G1_MOTOR,_PE_G1_MOTOR+18):
			self._wreg(reg,0x00)

	def read_bat(self,ratio=0.0097):
		'''Read battery power'''
		vbat= self._rreg(_PE_G1_VBAT)<<2 | self._rreg(_PE_G1_VBAT+1)>>6
		return round(vbat*ratio,2)
	
	def m_pwm(self,index,duty=None):
		"""Motor*5*2 PWM duty cycle data register"""
		if not 0 <= index <= 9:
			raise ValueError("Motor port must be a number in the range: 0~9")
		if duty is None:
			return self._rreg(_PE_G1_MOTOR+index)
		else:
			if not 0 <= duty <= 255:
				raise ValueError("Duty must be a number in the range: 0~255")
			self._wreg(_PE_G1_MOTOR+index,duty)

	def s_pwm(self,index,duty=None):
		"""Servo*4 PWM duty cycle data register"""
		if not 0 <= index <= 3:
			raise ValueError("Servo port must be a number in the range: 0~3")
		if duty is None:
			return self._rreg(_PE_G1_SERVO+index*2)<<8 | self._rreg(_PE_G1_SERVO+index*2+1)
		else:
			if not 0 <= duty <= 4095:
				raise ValueError("Duty must be a number in the range: 0~4095")
			self._wreg(_PE_G1_SERVO+index*2,duty>>8)
			self._wreg(_PE_G1_SERVO+index*2+1,duty&0xff)

	def motor(self,index,action,speed=0):
		if not 0 <= speed <= 100:
			raise ValueError("Speed parameters must be a number in the range: 0~100")
		if action=="N":
			self.m_pwm(index*2,0)
			self.m_pwm(index*2+1,0)
		elif action=="P":
			self.m_pwm(index*2,255)
			self.m_pwm(index*2+1,255)
		elif action=="CW":
			self.m_pwm(index*2,0)
			self.m_pwm(index*2+1,speed*255//100)
		elif action=="CCW":
			self.m_pwm(index*2,speed*255//100)
			self.m_pwm(index*2+1,0)
		elif action=="NC":
			return round(self.m_pwm(index*2)*100/255),round(self.m_pwm(index*2+1)*100/255)
		else:
			raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

	def servo180(self,index,angle=None):
		if angle is None:
			return  round((self.s_pwm(index)-102.375)*180/409.5)
		else:
			if not 0 <= angle <= 180:
				raise ValueError("Servo(180) angle must be a number in the range: 0~180")
			self.s_pwm(index,round(102.375 + 409.5/180 * angle))

	def servo360(self,index,speed=None):
		if speed is None:
			return  round((self.s_pwm(index)-102.375)*200/409.5-100)
		else:
			if not  -100<= speed <= 100:
				raise ValueError("Servo(360) speed must be a number in the range: -100~100")
			self.s_pwm(index,round(102.375 + 409.5/200 * (speed+100)))
