# DHT11/DHT22 driver for MicroPython
# MIT license; Copyright (c) 2016 Damien P. George

from time import sleep
try:
    from esp import dht_readinto
except:
    from machine import dht_readinto
from machine import Pin

class DHTBase:
    __species = {}
    __first_init = True
    def __new__(cls, pin, *args, **kwargs):
        if pin not in cls.__species.keys():
            cls.__first_init = True
            cls.__species[pin] = object.__new__(cls)
        return cls.__species[pin]

    def __init__(self, pin):
        if self.__first_init:
            self.__first_init = False
            self.pin = Pin(pin)
            self.buf = bytearray(5)
            self.err = 0

    def measure(self): 
        buf = bytearray(5)
        try:
            dht_readinto(self.pin, buf)
            if (buf[0] + buf[1] + buf[2] + buf[3]) & 0xFF == buf[4]:
                self.buf = buf 
                self.err = 0
        except:
            if self.err > 10:
                raise AttributeError("DHTx operation error")
            self.err += 1
            sleep(0.5)
            return

class DHT11(DHTBase):
    def humidity(self):
        self.measure()
        return self.buf[0]

    def temperature(self):
        self.measure()
        return self.buf[2]

class DHT22(DHTBase):
    def humidity(self):
        self.measure()
        return (self.buf[0] << 8 | self.buf[1]) * 0.1

    def temperature(self):
        self.measure()
        t = ((self.buf[2] & 0x7F) << 8 | self.buf[3]) * 0.1
        if self.buf[2] & 0x80:
            t = -t
        return t
