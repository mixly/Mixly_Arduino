"""
Servo

MicroPython library for the Servo(0~180°)
=======================================================

#Preliminary composition				20220803

dahanzimin From the Mixly Team
"""
from machine import Pin,PWM

class Servo:
	__species = {}
	__first_init = True
	
	def __new__(cls, pin, *args, **kwargs):
		if pin not in cls.__species.keys():
			cls.__first_init = True
			cls.__species[pin]=object.__new__(cls)
		return cls.__species[pin]	
		
	def __init__(self,pin):
		if self.__first_init:
			self.__first_init = False
			self._pulse=None
			self.pwm = PWM(Pin(pin), duty=0, freq=50)

	def servo_write(self,pulse):
		self._pulse=pulse
		self.pwm.duty_u16(int(1638.375 + 6553.5 * pulse))

	def servo_read(self):
		return self._pulse

#-------Method usage of class--------

def  servo180_angle(pin,angle=None):
	if angle is None:
		return int(Servo(pin).servo_read()*180)
	else:
		if not 0<= angle <= 180:
			raise ValueError("The effective range of the servo(180) angle is 0~180°")
		Servo(pin).servo_write(angle/180)


def  servo360_speed(pin,speed=None):
	if speed is None:
		return int(Servo(pin).servo_read()*200-100)
	else:
		if not -100<= speed <= 100:
			raise ValueError("The effective range of the servo(360) speed is -100~100%")
		Servo(pin).servo_write((speed+100)/200)
