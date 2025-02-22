"""
Weather_Solo

Micropython library for the Weather_Solo(WIND & RAIN)
=======================================================

#Preliminary composition      				   20231207

@dahanzimin From the Mixly Team
"""
import time
import math
from machine import Pin, ADC

class Weather_WS:

	def __init__(self, pin, leaf=0.09, pulse=2):
		Pin(pin, Pin.IN).irq(handler=self._ws_func, trigger=Pin.IRQ_FALLING)
		self._wtime = time.ticks_ms()
		self._distance = 2 * math.pi * leaf / pulse
		self._pulse = 0

	def _ws_func(self, pin):
		if pin.value() == 0:
			self._pulse += self._distance

	def _grade(self, speed):
		if speed <= 0.2:
			grade=0
		elif speed <=1.5:
			grade=1
		elif speed <=3.3:
			grade=2
		elif speed <=5.4:
			grade=3
		elif speed <=7.9:
			grade=4
		elif speed <=10.7:
			grade=5			
		elif speed <=13.8:
			grade=6								
		elif speed <=17.1:
			grade=7
		elif speed <=20.7:
			grade=8
		elif speed <=24.4:
			grade=9			
		elif speed <=28.4:
			grade=10
		elif speed <=32.6:
			grade=11
		else:
			grade=12
		return grade

	def wind_speed(self):
		time.sleep_ms(100)
		speed = self._pulse / time.ticks_diff(time.ticks_ms(), self._wtime) * 1000 if self._pulse > 0 else 0
		self._wtime = time.ticks_ms()
		self._pulse = 0
		return round(speed, 2), self._grade(speed) 

class Weather_WD:

	_DS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
	_DA = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5]

	def __init__(self, pin):
		self.adc = ADC(Pin(pin), atten=ADC.ATTN_11DB)
		
	def wind_direction(self):
		values = []
		for _ in range(20):
			values.append(self.adc.read_uv()/1000000)
			time.sleep_ms(1)		
		ain = sum(values) / 20

		if ain <=0.083:
			dir=12
		elif ain <=0.135:
			dir=14
		elif ain <=0.184:
			dir=13
		elif ain <=0.253:
			dir=0
		elif ain <=0.349:
			dir=15
		elif ain <=0.421:
			dir=10
		elif ain <=0.568:
			dir=11
		elif ain <=0.761:
			dir=2
		elif ain <=1.004:
			dir=1
		elif ain <=1.273:
			dir=8
		elif ain <=1.501:
			dir=9
		elif ain <=1.826:
			dir=6
		elif ain <=2.137:
			dir=7
		elif ain <=2.308:
			dir=4
		elif ain <=2.429:
			dir=3
		else:
			dir=5		
		return self._DS[dir], self._DA[dir]

class Weather_Rain:

	def __init__(self, pin, capacity=0.2794):
		Pin(pin, Pin.IN).irq(handler=self._rain_func, trigger=Pin.IRQ_FALLING)
		self._rtime = time.ticks_ms()
		self._load = capacity
		self._mean = 0
		self._count = 0

	def _rain_func(self, pin):
		if pin.value() == 0:
			self._count += self._load

	def rain_count(self, time_s=3600):
		if time.ticks_diff(time.ticks_ms(), self._rtime) // 1000 >= time_s:
			self._mean = self._count / time.ticks_diff(time.ticks_ms(), self._rtime) * time_s * 1000 if self._count > 0 else 0
			self._rtime = time.ticks_ms()
			self._count = 0
		return round(self._count, 2), round(self._mean, 4)

#integration
class Weather_Solo(Weather_WD, Weather_WS, Weather_Rain):

	def __init__(self, pin_wd, pin_ws, pin_rain):
		Weather_WD.__init__(self, pin_wd)
		Weather_WS.__init__(self, pin_ws)
		Weather_Rain.__init__(self, pin_rain)
