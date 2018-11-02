from machine import *
from ESP32 import *
from display import *
import music

def tim_callback_func(t):
    mytup = rtc.datetime()

    display.scroll(str(mytup[6]))



rtc = RTC()
rtc.datetime((2018,11,2,5,18,7,45,0))
tim.init(period = 1000, mode = Timer.PERIODIC, callback = tim_callback_func)

music.stop(PWM(Pin(27)))
