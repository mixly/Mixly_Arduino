"""
CS100/HC-SR04

Micropython library for the CS100/HC-SR04(Ultrasonic ranging)
=======================================================
@dahanzimin From the Mixly Team 
"""
from time import sleep_us
from machine import Pin, time_pulse_us

class Sonar:
	__species = {}
	__first_init = True

	def __new__(cls, trig, echo, *args, **kwargs):
		if (trig, echo) not in cls.__species.keys():
			cls.__first_init = True
			cls.__species[(trig, echo) ] = object.__new__(cls)
		return cls.__species[(trig, echo)]

	def __init__(self, trig, echo, max_rang=400):
		if self.__first_init:
			self.__first_init = False
			self.trig = Pin(trig, Pin.OUT, value=0)
			self.echo = Pin(echo, Pin.IN)
			self.timeout_us = int(max_rang * 2 * 29.1)

	def checkdist(self):
		self.trig.value(0)
		sleep_us(5)
		self.trig.value(1)
		sleep_us(10)
		self.trig.value(0)
		try:
			pulse_time = time_pulse_us(self.echo, 1, self.timeout_us)
			pulse_time = pulse_time if pulse_time >= 0  else self.timeout_us 
			return round(pulse_time / 2 / 29.1, 2)	# 1cm each 29.1us
		except:
			return None
