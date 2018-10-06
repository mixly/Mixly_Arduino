from machine import Pin
from machine import PWM

def write_angle(pwm,angle):
	pwm.duty(int(40 + 75 * angle / 180))
	pwm.freq(50)