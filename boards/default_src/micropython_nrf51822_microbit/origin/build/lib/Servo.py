from microbit import *


def angle(pin, angle):
    pin.set_analog_period(round((1 / 50) * 1000))
    duty = 26 + (angle * 102) / 180
    pin.write_analog(duty)
