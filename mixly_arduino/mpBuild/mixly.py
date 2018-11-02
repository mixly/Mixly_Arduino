from machine import *
import time


pin16 = Pin(16, Pin.IN)
pin0 = Pin(0, Pin.OUT)
while True:
    pin0.value(0)
    if not pin16.value():
        while not pin16.value():
            time.sleep_ms(1)
