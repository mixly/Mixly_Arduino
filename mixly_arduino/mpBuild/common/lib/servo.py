from machine import Pin
from machine import PWM

def servo_write_angle(pin,angle):
	pwm=PWM(Pin(pin))
	pwm.duty(int(40 + 75 * angle / 180))
	pwm.freq(50)