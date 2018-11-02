from ESP32 import *
from display import *
import music
import math
from machine import *
import time

def playmusic():
    for i in range(0, len(musiclist), 1):
        display.show(str(musiclist[i]))
        music.pitch(round(round(tonelist[musiclist[i]])), PWM(Pin(27)))
        time.sleep_ms(round(500 * rhythmlist[i]))
        music.stop(PWM(Pin(27)))
        time.sleep_ms(10)



state = 1
tonelist= (-1,1046.5,1174.7,1318.5,1396.9,1568,1760,1975.5)
musiclist= (0,1,1,2,3,3,3,0,3,2,1,7,6,5,0,5,6,7,1,3,3,0,1,7,1,7,3,5,5,6,1,6,6,0,6,5,6,5,3,2,1,6,1,2,2,2,3,2,1,1,6,2)
rhythmlist= (0.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,1,0.5,1.5,0.5,0.5,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,1,0.5,1,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,2)
highlist= (0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,0,-1,0)

while True:
    if button_a.was_pressed():
        playmusic()
