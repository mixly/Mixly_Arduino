from machine import Pin
from machine import PWM

def pitch(freq,pwm):
	pwm.duty(512)
	pwm.freq(freq)
def stop(pwm):
	pwm.duty(512)
	pwm.freq(20000)
	pwm.deinit()