import machine
import mixgo
import time


while True:
    print(mixgo.Infrared_left.near())
    time.sleep_ms(100)
