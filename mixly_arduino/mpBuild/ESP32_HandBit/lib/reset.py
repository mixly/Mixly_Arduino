import machine

try:
        from display import *
        display.clear()
except:
        pass

try:
        import music
        music.stop(6)
except:
        pass

try:
        import neopixel
        rgb = neopixel.NeoPixel(machine.Pin(17), 3, timing = True)
        rgb[0] = (0, 0, 0)
        rgb[1] = (0, 0, 0)
        rgb.write()
except:
        pass

