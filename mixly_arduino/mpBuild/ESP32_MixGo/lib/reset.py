import machine
from machine import I2C
from machine import Pin

buf = bytearray(1)
i2c = I2C(scl = Pin(22), sda = Pin(21), freq = 100000)

try:
    i2c.readfrom_mem_into(0x68, 0X75, buf)
except:
    pass
else:
    if buf[0] == 0x71:
        for i in (0,5):
            Pin(i, Pin.OUT).value(1)    

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

