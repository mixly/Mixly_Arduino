# art.py Test program for IR remote control decoder aremote.py
# Supports Pyboard and ESP8266

# Author: Peter Hinch
# Copyright Peter Hinch 2017 Released under the MIT license

# Run this to characterise a remote.

from sys import platform
import uasyncio as asyncio
ESP32 = platform == 'esp32' or platform == 'esp32_LoBo'

if platform == 'pyboard':
    from pyb import Pin
elif platform == 'esp8266' or ESP32:
    from machine import Pin, freq
else:
    print('Unsupported platform', platform)

from aremote import *

errors = {BADSTART : 'Invalid start pulse', BADBLOCK : 'Error: bad block',
          BADREP : 'Error: repeat', OVERRUN : 'Error: overrun',
          BADDATA : 'Error: invalid data', BADADDR : 'Error: invalid address'}

def resume(pin,c):
    print('Test for IR receiver. Assumes NEC protocol.')
    if platform == 'esp8266':
        freq(160000000)
    p = Pin(pin, Pin.IN)  #19
    ir = NEC_IR(p, c, True)  # Assume r/c uses extended addressing
    loop = asyncio.get_event_loop()
    loop.run_forever()

if __name__ == '__main__':
    def cb(data, addr):
        if data == REPEAT:
            print('Repeat')
        elif data >= 0:
            print(hex(data), hex(addr))
        else:
            print('{} Address: {}'.format(errors[data], hex(addr)))
    
    resume(19,cb)