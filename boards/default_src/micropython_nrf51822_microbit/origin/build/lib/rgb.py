from microbit import *


def show(object, led, r, g, b):
    object[led] = (r, g, b)
    object.show()
