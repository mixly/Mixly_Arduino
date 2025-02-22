"""
MixGo CE-Onboard resources

Micropython    library for the MixGo CE-Onboard resources
=======================================================

#Preliminary composition                   20220901

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,RTC
from ws2812 import NeoPixel
from music import MIDI

'''RTC'''
rtc_clock=RTC()

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(41), sda = Pin(42), freq = 400000)
onboard_i2c_scan = onboard_i2c.scan()

'''Version judgment'''
if 0x15 in onboard_i2c_scan:
    version=1
elif 0x26 in onboard_i2c_scan:
    version=0
else:
    print("Warning: Mixgo CE board is not detected, which may cause usage errors")

'''Matrix16x8'''
try :
    import matrix16x8
    onboard_matrix = matrix16x8.Matrix(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with Matrix16x8 or",e)

'''6-Button'''
class Button:
    def __init__(self, pin):
        self._pin = Pin(pin, Pin.IN, Pin.PULL_UP)
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

A1key = Button(14)
A2key = Button(21)
A3key = Button(36)
A4key = Button(37)
B1key = Button(0)
B2key = Button(35)

'''4-TouchPad'''
class Touch_Pad:
    _pins = [4, 5, 6, 7]
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
            self._pin = TouchPad(Pin(self._pins[pin]))
        
    def is_touched(self,value):
        return self._pin.read() > value

    def raw_value(self):
        return self._pin.read()

#Touch with function call
def touched(pin,value=33000):
    return Touch_Pad(pin).is_touched(value)  if value  else Touch_Pad(pin).raw_value()

'''2-LED'''     #Modify indexing method    
class LED:
    def __init__(self, pins=[]):
        self._pins = [PWM(Pin(pin), duty_u16=65535) for pin in pins]
        self._brightness = [0 for _ in range(len(self._pins))]

    def setbrightness(self, index, val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self._brightness[index - 1] = val
        self._pins[index - 1].duty_u16(65535 - val * 65535 // 100)

    def getbrightness(self, index):
        return self._brightness[index - 1]

    def setonoff(self, index, val):
        if val == -1:
            self.setbrightness(index, 100)  if self.getbrightness(index) < 50 else self.setbrightness(index, 0) 
        elif val == 1:
            self.setbrightness(index, 100) 
        elif val == 0:
            self.setbrightness(index, 0) 

    def getonoff(self, index):
        return True if self.getbrightness(index) > 50 else False

onboard_led = LED(pins=[33, 34])

'''MIC_Sensor'''
class MICSensor:
    def __init__(self, pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
        
    def read(self):
        maxloudness = 0
        for i in range(5):
            loudness = self.sample()  
            if loudness > maxloudness:
                maxloudness = loudness
        return maxloudness  
        
    def sample(self):
        values = []
        for i in range(50):
            val = self.adc.read_u16()
            values.append(val)
        return max(values) - min(values)

onboard_sound = MICSensor(13)

'''3-ADCSensor'''
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
            self._switch = Pin(39, Pin.OUT)
 
    def read(self):
        return self._adc.read_u16()

    def switch(self,val):
        self._switch.value(val)

def get_brightness():
    return ADCSensor(15).read() 

'''Function definition of different versions'''
if version==0:
    '''ACC-Sensor'''
    try:
        import msa301
        onboard_acc = msa301.MSA301(onboard_i2c,front=True)
    except Exception as e:
        print("Warning: Failed to communicate with MSA301 or",e)

    '''4-RGB''' 
    if Pin(40, Pin.IN).value():
        onboard_rgb = NeoPixel(Pin(8), 4)
    else:
        onboard_rgb = NeoPixel(Pin(8), 4, ORDER=(0, 1, 2, 3))

    '''1Buzzer-Music'''
    Pin(40, Pin.OUT).value(1)
    onboard_music =MIDI(17)

    '''temperature'''
    def get_temperature():
        adc_val = ADCSensor(16).read() 
        return adc_val * 3.9 / 5900

    def infrared_left():   
        print("Warning: Old version, without this function")    

    def infrared_right():
        print("Warning: Old version, without this function")   

if version==1:
    '''ACC-Sensor'''
    try:
        import mxc6655xa
        onboard_acc = mxc6655xa.MXC6655XA(onboard_i2c,front=True) 

        '''temperature'''
        def get_temperature():
            return onboard_acc.temperature()

    except Exception as e:
        print("Warning: Failed to communicate with MXC6655XA or",e)

    '''4-RGB''' 
    onboard_rgb = NeoPixel(Pin(8), 4)

    '''1Buzzer-Music'''
    onboard_music =MIDI(40)

    def infrared_left():
        ADCSensor(3).switch(1)
        time.sleep(0.01)
        adc=ADCSensor(3).read()
        ADCSensor(3).switch(0)    
        return adc    

    def infrared_right():
        ADCSensor(16).switch(1)
        time.sleep(0.01)
        adc=ADCSensor(16).read()
        ADCSensor(16).switch(0)    
        return adc 

'''Reclaim memory'''
gc.collect()
