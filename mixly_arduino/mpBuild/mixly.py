import machine
import mixgo
import time


while True:
    print(mixgo.mixgo_get_brightness())
    print(mixgo.mixgo_get_soundlevel())
    time.sleep_ms(1000)
