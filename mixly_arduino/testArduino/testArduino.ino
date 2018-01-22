from microbit import *


while True:
    uart.write(str(str('hello')[(1-1): 4]))
    sleep(1000)
