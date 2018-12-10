from machine import Pin
from machine import PWM
from machine import ADC
from machine import DAC
from machine import I2C
from machine import Timer
from machine import RTC
from machine import TouchPad
import time
from neopixel import NeoPixel
from mpu9250 import *


# Button

# def btn_a(p):
#     button_a.val = 1

# def btn_b(p):
#     button_b.val = 1

def mixgo_get_brightness():
    return ADCSensor(pin = 39).read()

def mixgo_get_soundlevel():
    return ADCSensor(pin = 35).read()
    
class Button:
    def __init__(self, pin):
        from machine import Pin
        self.pin = Pin(pin, Pin.IN)

    def get_presses(self, delay = 1):
        last_time, last_state, presses = time.time(), 0, 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 0 and self.pin.value() == 1:
                last_state = 1
            if last_state == 1 and self.pin.value() == 0:
                last_state, presses = 0, presses + 1
        return presses

    def is_pressed(self):
        return self.pin.value() == 0

    def was_pressed(self):
        last_state = self.pin.value()
        time.sleep_ms(15)
        if last_state == 1 and self.pin.value() == 0:
            return True
        return False

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)

# Pin

class MyPin(Pin):
    def write_digital(self,val):
        self.init(Pin.OUT)
        self.value(val)

    def read_digital(self):
        self.init(Pin.IN)
        return self.value()

    def write_analog(self,val):
        id = int(str(self)[4:-1]) #unsafe!
        self = PWM(Pin(id),duty=val)

    def dac_write(self,val):
        id = int(str(self)[4:-1]) #unsafe!
        self = DAC(Pin(id)).write(val)    

    def read_analog(self):
        id = int(str(self)[4:-1]) #unsafe!
        self = ADC(Pin(id))
        return self.read()

    def set_frequency(self,val):
        id = int(str(self)[4:-1])
        self = PWM(Pin(id),freq=val)

    def is_touched(self):
        id = int(str(self)[4:-1]) #unsafe!
        if id in (0,2,4,12,13,14,15,27,32,33):
            # print(TouchPad(Pin(id)).read())
            return (TouchPad(Pin(id)).read() - 150 < 0)
        else:
            self.init(Pin.IN)
            return self.value() == 1

    def near(self): 
        id = int(str(self)[4:-1]) #unsafe!
        pin15=Pin(15,Pin.OUT)
        pin15.value(1)
        adc=ADC(Pin(id))
        adc.atten(ADC.ATTN_11DB)
        approximate =adc.read()
        pin15.value(0)
        return approximate


# Servo
class Servo:
    def __init__(self,pin):
        self.pin=pin

    def write_angle(self,angle):
        id = int(str(self.pin)[4:-1])
        PWM(Pin(id),freq=50,duty=int(40 + 75 * angle / 180))

# Sonar
class Sonar:
    def __init__(self, trig, echo):
        self.trig=Pin(trig, Pin.OUT)
        self.echo=Pin(echo, Pin.IN)

    def checkdist(self):
        #trig, echo = Pin(trig, Pin.OUT), Pin(echo, Pin.IN)
        self.trig.value(0)
        self.echo.value(0)
        self.trig.value(1)
        time.sleep_us(10)
        self.trig.value(0)
        while(self.echo.value()==0):
            pass
        t1 = time.ticks_us()
        while(self.echo.value()==1):
            pass
        t2 = time.ticks_us()
        return round(time.ticks_diff(t2, t1) / 10000 * 340 / 2, 2)   

class led:
    def __init__(self, pin):
        self.val = 1
        self.pin = pin
    def on(self):
        self.val = 0
        Pin(self.pin).value(0)
    def off(self):
        self.val = 1
        Pin(self.pin).value(1)
    def toggle(self):
        self.val = 1-self.val
        Pin(self.pin).value(self.val)
    def value(self,val):
        self.val = val
        PWM(Pin(self.pin)).duty(1023-self.val)
    def setbrightness(n,val):
        if n in (1,2):
            n = 5 * (n - 1)
            PWM(Pin(n)).duty(1023 - val)
    def setonoff(n,val):
        if n in (1,2):
            n = 5 * (n - 1)
            if(val==-1):
                Pin(n).value(1 - Pin(n).value())
            else:
                Pin(n).value(1-val)
    def getonoff(n):
        if n in (1,2):
            n = 5 * (n - 1)
            return 1 - Pin(n).value()


class ADCSensor:
    def __init__(self,pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
    def read(self):
        return self.adc.read()

class RGB:
    def __init__(self, pin, num):
        # self.pin = Pin(pin)
        # self.num = num
        self = NeoPixel(Pin(pin), num)
    def write(self,n,r,g,b):
        self[n] = (r, g, b)
        self.write()
           
# pin16 = MyPin(16)
# pin17 = MyPin(17)
# pin17.read_digital()
# pin16.read_digital()
# pin17.irq(handler = btn_a, trigger = Pin.IRQ_FALLING)
# pin16.irq(handler = btn_b, trigger = Pin.IRQ_FALLING)
button_a = Button(17)
button_b = Button(16)
# buttonA = MyPin(17)
# buttonB = MyPin(16)
Pin(0, Pin.OUT).value(1)
Pin(5, Pin.OUT).value(1)
led1 = led(pin = 0)
led2 = led(pin = 5)
Infrared_left = MyPin(34)
Infrared_right = MyPin(36)
touch1 = MyPin(32)
touch2 = MyPin(33)
touch3 = MyPin(25)
touch4 = MyPin(26)
#music = music(pin=27)

i2c = I2C(scl = Pin(22), sda = Pin(21), freq = 100000)
rgb = NeoPixel(Pin(2), 2)
tim = Timer(-1)
rtc = RTC()
mpu = MPU9250(i2c)