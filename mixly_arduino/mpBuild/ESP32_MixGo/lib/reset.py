from machine import *
from display import *
pin0 = Pin(0, Pin.OUT)
pin5 = Pin(5, Pin.OUT)
pin0.value(1)
pin5.value(1)
display.clear()
