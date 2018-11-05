from machine import Pin
from machine import PWM

def pitch(freq,pin):
	if (freq>1):
		pwm=PWM(Pin(pin))
		pwm.duty(512)
		pwm.freq(freq)
	else:
		pwm=PWM(Pin(pin))
		pwm.duty(0)
		pwm.freq(1)
	
def stop(pin):
	pwm=PWM(Pin(pin))
	pwm.duty(0)
	pwm.freq(1)