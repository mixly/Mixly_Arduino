"""
MixGo-Onboard resources

Micropython    library for the MixGo-Onboard resources
=======================================================

#Instantiate mixgo onboard resources              20220622
#Repair brightness adjustment range 0-100%         20220623

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,RTC,TouchPad

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(22), sda = Pin(21), freq = 400000)

'''RTC'''
rtc_clock=RTC()

'''MPU9250'''
try :
    import mpu9250
    onboard_mpu = mpu9250.MPU9250(onboard_i2c)
    onboard_compass = mpu9250.Compass(onboard_mpu)    
except Exception as e:
    print("Warning: Failed to communicate with MPU9250 or",e)

'''Matrix16x8'''
try :
    import matrix16x8
    onboard_matrix = matrix16x8.Matrix(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with Matrix16x8 or",e)

'''2-RGB'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(2), 2)

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(27)

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

button_a = Button(17)
button_b = Button(16)

'''2-TouchPad'''
class Touch_Pad:
    def __init__(self, pin,value=220):
        self._pin = TouchPad(Pin(pin))
        self.value = value
        
    def is_touched(self):
        return self._pin.read() < self.value

    def raw_value(self):
        return self._pin.read()

touch1 = Touch_Pad(32)
touch2 = Touch_Pad(33)

'''4-ADCSensor'''
class ADCSensor:
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
            self._adc=ADC(Pin(pin))
            self._adc.atten(ADC.ATTN_11DB) 
            self._switch = Pin(15, Pin.OUT)

    def read(self):
        return self._adc.read_u16()
    
    def switch(self,val):
        self._switch.value(val)
        
def infrared_left():
    ADCSensor(34).switch(1)
    time.sleep(0.02)
    adc=ADCSensor(34).read()
    ADCSensor(34).switch(0)    
    return adc    

def infrared_right():
    ADCSensor(36).switch(1)
    time.sleep(0.02)
    adc=ADCSensor(36).read()
    ADCSensor(36).switch(0)    
    return adc        

def get_brightness():
    return ADCSensor(39).read() 

def get_soundlevel():  
    value_d= []
    for _ in range(5):
        values = []
        for _ in range(5):
            val = ADCSensor(35).read() 
            values.append(val)
        value_d.append(max(values) - min(values))
    return max(value_d)

'''2-LED'''     #Repair brightness adjustment range 0-100%    
class LED:
    def __init__(self, pin):
        self._pin =PWM(Pin(pin),freq=5000,duty_u16=65535)
        self.setbrightness(0)
        
    def setbrightness(self,val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self._brightness=val
        self._pin.duty_u16(65535-val*65535//100)

    def getbrightness(self):
        return self._brightness

    def setonoff(self,val):
        if(val == -1):
            self.setbrightness(100)  if self._brightness<50 else self.setbrightness(0) 
        elif(val == 1):
            self.setbrightness(100) 
        elif(val == 0):
            self.setbrightness(0) 
            
    def getonoff(self):
        return True if self._brightness>0 else False

led1 = LED(0)
led2 = LED(5)

'''Reclaim memory'''
gc.collect()
