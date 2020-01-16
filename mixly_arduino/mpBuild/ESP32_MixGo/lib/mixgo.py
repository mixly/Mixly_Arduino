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

def get_brightness(pin = 39):
    return ADCSensor(pin).read()

def get_soundlevel(pin = 35):
    return ADCSensor(pin).read()
  
# Button
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

    def is_pressed(self, flag = 0):
        return self.pin.value() == flag

    def was_pressed(self, flag = 0):
        last_state = self.pin.value()
        if flag:
            if not last_state:
                return False
            else:
                while self.pin.value():
                    time.sleep_ms(10)
                return True
        else:
            if last_state:
                return False
            else:
                while not self.pin.value():
                    time.sleep_ms(10)
                return True

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

class Infrared(MyPin):
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
    def __init__(self, pin, flag=1):
        self.val = flag
        self.pin = pin
        self.flag = flag
    def setbrightness(self,val):
        self.val = val
        if self.flag:
            PWM(Pin(self.pin)).duty(self.val)
        else:
            PWM(Pin(self.pin)).duty(1023 - self.val)
    def setonoff(self,val):
        if(val == -1):
            Pin(self.pin,Pin.OUT).value(1 - Pin(self.pin).value())
        elif(val == 1):
            Pin(self.pin,Pin.OUT).value(self.flag)
        elif(val == 0):
            Pin(self.pin,Pin.OUT).value(1 - self.flag)
    def getonoff(self):
        if self.flag:
            return Pin(self.pin).value()
        else:
            return 1 - Pin(self.pin).value()

class ADCSensor:
    def __init__(self,pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
    def read(self):
        return self.adc.read()

class RGB:
    def __init__(self, pin, num):
        self = NeoPixel(Pin(pin), num)
    def write(self,n,r,g,b):
        self[n] = (r, g, b)
        self.write()
           
i2c = I2C(scl = Pin(22), sda = Pin(21), freq = 100000)
buf = bytearray(1)
rtc = RTC()
tim = Timer(-1)

try:
    i2c.readfrom_mem_into(0x68, 0X75, buf)
except:
    pass
else:
    if buf[0] == 0x71:
        from mpu9250 import *

        mpu = MPU9250(i2c)
        compass = Compass(mpu)

        button_a = Button(17)
        button_b = Button(16)
        led1 = led(pin = 0, flag = 0)
        led2 = led(pin = 5, flag = 0)
        infrared_left = Infrared(34)
        infrared_right = Infrared(36)
        touch1 = MyPin(32)
        touch2 = MyPin(33)
        touch3 = MyPin(25)
        touch4 = MyPin(26)

        rgb = NeoPixel(Pin(2), 2)