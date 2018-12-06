from machine import *
import time
from neopixel import NeoPixel
from mpu9250 import *
import mpython

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

    def was_pressed(self, delay = 1):
        last_time, last_state = time.time(), self.pin.value()
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 1 and self.pin.value() == 0:
                return True
        return False

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)

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

def mixgo_get_brightness():
    return ADCSensor(pin = 39).read()

def mixgo_get_soundlevel():
    return ADCSensor(pin = 36).read()

class Accelerometer():
    """  """
    def __init__(self):
        self.addr = 38
        self.i2c = i2c
        self.i2c.writeto(self.addr, b'\x0F\x08')    # set resolution = 10bit
        self.i2c.writeto(self.addr, b'\x11\x00')    # set power mode = normal

    def get_a_x(self):
        self.i2c.writeto(self.addr, b'\x02', False)
        buf = self.i2c.readfrom(self.addr, 2)
        x = ustruct.unpack('h', buf)[0]
        return x / 4 / 4096

    def get_a_y(self):
        self.i2c.writeto(self.addr, b'\x04', False)
        buf = self.i2c.readfrom(self.addr, 2)
        y = ustruct.unpack('h', buf)[0]
        return y / 4 / 4096

    def get_a_z(self):
        self.i2c.writeto(self.addr, b'\x06', False)
        buf = self.i2c.readfrom(self.addr, 2)
        z = ustruct.unpack('h', buf)[0]
        return z / 4 / 4096

i2c = I2C(scl=Pin(22), sda=Pin(23), freq=400000)

ac = Accelerometer()

button_a = Button(0)
button_b = Button(2)

# 3 rgb leds
rgb = NeoPixel(Pin(17, Pin.OUT), 3, 3, 1)
rgb.write()

touch1 = MyPin(27)
touch2 = MyPin(14)
touch3 = MyPin(12)
touch4 = MyPin(13)
touch5 = MyPin(15)
touch6 = MyPin(14)