"""
MixGo PE-Onboard resources

Micropython library for the MixGo PE-Onboard resources
=======================================================

#Preliminary composition                   20230126

dahanzimin From the Mixly Team
"""
import time,gc
from machine import Pin,RTC

'''RTC'''
rtc_clock=RTC()

'''Matrix8x5'''
try :
    import matrix8x5
    onboard_matrix = matrix8x5.Matrix(0,brightness=0.5)
except Exception as e:
    print("Warning: Failed to communicate with Matrix8x5 or",e)

'''4-TouchPad'''
class Touch_Pad:
    __species = {}
    __first_init = True
    def __new__(cls, pin, *args, **kwargs):
        if pin not in cls.__species.keys():
            cls.__first_init = True
            cls.__species[pin]=object.__new__(cls)
        return cls.__species[pin]   

    def __init__(self, pin):
        if self.__first_init:
            self.__first_init = False
            from machine import TouchPad
            self._pin = TouchPad(Pin(pin))
        
    def is_touched(self,value):
        return self._pin.read() < value

    def raw_value(self):
        return self._pin.read()

#Touch with function call
def touched(pin,value=350):
    return Touch_Pad(pin).is_touched(value)  if value  else Touch_Pad(pin).raw_value()

'''Reclaim memory'''
gc.collect()
