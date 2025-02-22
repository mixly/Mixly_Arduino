"""
mPython-Onboard resources

Micropython    library for the mPython-Onboard resources
=======================================================

#Preliminary composition                   20220716

dahanzimin From the Mixly Team
"""
import time,gc
from machine import Pin,SoftI2C,ADC,PWM,RTC,TouchPad

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(22), sda = Pin(23), freq = 400000)

'''RTC'''
rtc_clock=RTC()

'''OLED128X64'''
try :
    import oled128x64
    onboard_oled = oled128x64.OLED(onboard_i2c,font_address=0x700000)
except Exception as e:
    print("Warning: Failed to communicate with OLED128x64 or",e)

'''Magnetic'''
try :
    import mmc5603
    magnetic = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with MMC5603 or",e)

'''Motion'''    #Including temperature、accelerometer、gyroscope
try :
    import qmi8658
    motion = qmi8658.QMI8658(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with QMI8658 or",e)

'''2-RGB'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(17), 3)

'''1-Buzzer'''
from music import MIDI
onboard_music =MIDI(16, invert=1)

'''Port mapping'''
class PIN:
    P0=33
    P1=32
    P2=35
    P3=34
    P4=39
    P5=0
    P6=16
    P7=17
    P8=26
    P9=25
    P10=36
    P11=2
    P13=18
    P14=19
    P15=21
    P16=5
    P19=22
    P20=23
    P23=27
    P24=14
    P25=12
    P26=13
    P27=15
    P28=4

'''2-Button'''
class Button:
    def __init__(self, pin):
        self._pin = Pin(pin, Pin.IN)
        self._flag = True

    def get_presses(self, delay = 1):
        last_time,presses = time.time(), 0
        while time.time() < last_time + delay:
            time.sleep(0.05)
            if self.was_pressed():
                presses += 1
        return presses

    def is_pressed(self):
        return self._pin.value() == False

    def was_pressed(self):
        if self._pin.value() != self._flag:
            time.sleep(0.01)
            self._flag = self._pin.value()
            if self._flag:
                return False
            else:
                return True

    def irq(self, handler, trigger):
        self._pin.irq(handler = handler, trigger = trigger)

button_a = Button(0)
button_b = Button(2)

'''2-TouchPad'''
class Touch_Pad:
    def __init__(self, pin,value=220):
        self._pin = TouchPad(Pin(pin))
        self.value = value
        
    def is_touched(self):
        return self._pin.read() < self.value

    def raw_value(self):
        return self._pin.read()

touch_p = Touch_Pad(27)
touch_y = Touch_Pad(14)
touch_t = Touch_Pad(12)
touch_h = Touch_Pad(13)
touch_o = Touch_Pad(15)
touch_n = Touch_Pad(4)

'''2-ADCSensor'''
class ADCSensor:
    def __init__(self, pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 

    def brightness(self):
        return self.adc.read_u16()

    def soundlevel(self):
        value_d= []
        for _ in range(5):
            values = []
            for _ in range(10):
                val = self.adc.read_u16()
                values.append(val)
            value_d.append(max(values) - min(values))
        return max(value_d)

onboard_sound = ADCSensor(36)        
onboard_light = ADCSensor(39)

'''Microphone'''          #Later, it is used for recording and acquisition
microphone=ADC(Pin(38))
microphone.atten(ADC.ATTN_11DB) 

'''Reclaim memory'''
gc.collect()
