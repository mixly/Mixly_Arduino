from microbit import *
import neopixel

np = neopixel.NeoPixel(pin12, 4)


def mixly_rgb_show_all(r, g, b):
    for led in range(4):
        np[led] = (r, g, b)
    np.show()


def mixly_rgb_show(led, r, g, b):
    np[led] = (r, g, b)
    np.show()
