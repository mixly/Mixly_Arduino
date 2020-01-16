import machine
from machine import I2C
from machine import Pin

i2c = I2C(scl = Pin(22), sda = Pin(21), freq = 100000)
buf = bytearray(1)
pins = [0,2,4,5,18,21,22,19,23,20,15,12,13,27,14,25,26,17,16,32,33]
for i in pins:
    Pin(i, Pin.OUT).value(0)    

try:
    i2c.readfrom_mem_into(0x68, 0X75, buf)
except:
    pass
else:
    if buf[0] == 0x71:
        Pin(0, Pin.OUT).value(1)
        Pin(5, Pin.OUT).value(1)
    else:
        Pin(0, Pin.OUT).value(0)
        Pin(5, Pin.OUT).value(0)

try:
    from matrix import display
    display.clear()
except:
    pass

try:
    import music
    music.stop(27)
except:
    pass

try:
    import neopixel
    rgb = neopixel.NeoPixel(machine.Pin(2), 2, timing = True)
    rgb[0] = (0, 0, 0)
    rgb[1] = (0, 0, 0)
    rgb.write()
except:
    pass

