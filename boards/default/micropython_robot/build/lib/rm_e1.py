"""
RM E1 -Onboard resources

MicroPython library for the RM E1 -Onboard resources
=======================================================

#Preliminary composition       				20220703

dahanzimin From the Mixly Team
"""

import time,gc
#import ble_handle
from machine import Pin,SoftI2C,ADC,PWM,RTC

'''Bluetooth-handle'''
#handle=ble_handle.Handle()

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(22), sda = Pin(21), freq = 400000)

'''RTC'''
rtc_clock=RTC()

'''ACC-Sensor'''
class ACC:
	def __init__(self,i2c_bus):
		self._device = i2c_bus
		self._address = 0x09
	
	def _rreg(self,nbytes):
		'''Read memory address'''
		return  self._device.readfrom(self._address, nbytes)
	
	def acceleration(self): 
		data_reg=self._rreg(3)
		return data_reg[0],data_reg[1],data_reg[2]	#返回x y轴数值(0~180)及晃动值

try :
	gyro=ACC(onboard_i2c)
except Exception as e:
	print("Warning: Failed to communicate with ACC or",e)

'''2RGB_WS2812'''	#color_chase(),rainbow_cycle()方法移至类里
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(12), 2, default=1, timing=(450, 900, 850, 500))

'''3-Button'''
class Button:
	def __init__(self, pin):
		self._pin = Pin(pin, Pin.IN)
		self._flag = True

	def get_presses(self, delay = 1):
		last_time,presses = time.time(), 0
		while time.time() < last_time + delay:
			time.sleep(0.05)
			if self.was_pressed():
				presses += 1
		return presses

	def is_pressed(self):
		return self._pin.value() == False

	def was_pressed(self):
		if self._pin.value() != self._flag:
			time.sleep(0.01)
			self._flag = self._pin.value()
			if self._flag:
				return False
			else:
				return True

	def irq(self, handler, trigger):
		self._pin.irq(handler = handler, trigger = trigger)

button_p   = Button(35)
button_cw  = Button(39)
button_ccw = Button(36)

'''3-ADCSensor'''
class ADCSensor:
	def __init__(self, pin):
		self._adc=ADC(Pin(pin))
		self._adc.atten(ADC.ATTN_11DB) 

	def read(self):
		return self._adc.read_u16()
	
	def voltage(self):
		return round(self._adc.read_uv()*4.6/1000000,2)	
	
adc1=ADCSensor(32)
adc2=ADCSensor(33)

'''ADC conflicts with WiFi'''
try:
	battery=ADCSensor(26)
except:
	class Clash:
		def voltage(self):
			print("Warning: battery power collection conflicts with WiFi")
			return None
	battery=Clash()

'''2-LED'''	 #Repair brightness adjustment range 0-100%	
class LED:
	def __init__(self, pin):
		self._pin =PWM(Pin(pin),freq=5000,duty_u16=0)
		self.setbrightness(0)

	def value(self, val):
		self.setonoff(val)
		
	def setbrightness(self,val):
		if not 0 <= val <= 100:
			raise ValueError("Brightness must be in the range: 0-100%")
		self._brightness=val
		self._pin.duty_u16(val*65535//100)

	def getbrightness(self):
		return self._brightness

	def setonoff(self,val):
		if(val == -1):
			self.setbrightness(100)  if self._brightness<50 else self.setbrightness(0) 
		elif(val == 1):
			self.setbrightness(100) 
		elif(val == 0):
			self.setbrightness(0) 
			
	def getonoff(self):
		return True if self._brightness>0 else False
		
rled = LED(2)
gled = LED(4)

'''3-Motor'''
class Motor:
	def __init__(self, apin,bpin):
		self._apin =PWM(Pin(apin),freq=5000,duty_u16=65535)
		self._bpin =PWM(Pin(bpin),freq=5000,duty_u16=65535)
		self.motion("P")
		
	def motion(self,action,speed=0):
		if action=="N":
			self._apin.duty_u16(0)
			self._bpin.duty_u16(0)
		elif action=="P":
			self._apin.duty_u16(65535)
			self._bpin.duty_u16(65535)
		elif action=="CW":
			if speed >=0:
				self._apin.duty_u16(speed*65535//100)
				self._bpin.duty_u16(0)
			else:
				self._apin.duty_u16(0)
				self._bpin.duty_u16(-speed*65535//100)				
		elif action=="CCW":
			if speed >=0:
				self._apin.duty_u16(0)
				self._bpin.duty_u16(speed*65535//100)
			else:
				self._apin.duty_u16(-speed*65535//100)
				self._bpin.duty_u16(0)			
		else:
			raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

motor1=Motor(23,27)
motor2=Motor(18,19)
motor3=Motor(13,14)

'''Reclaim memory'''
gc.collect()
