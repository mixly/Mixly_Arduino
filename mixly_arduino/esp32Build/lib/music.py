from machine import Pin
from machine import PWM

def pitch(freq,pwm):
	if (freq>1):
		pwm.duty(512)
		pwm.freq(freq)
	else:
		pwm.duty(0)
		pwm.freq(1)
	
def stop(pwm):
	pwm.duty(0)
	pwm.freq(1)