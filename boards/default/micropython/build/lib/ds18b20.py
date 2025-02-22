# DS18x20 temperature sensor driver for MicroPython.
# MIT license; Copyright (c) 2016 Damien P. George

import onewire
from machine import Pin
from micropython import const

_CONVERT    = const(0x44)
_RD_SCRATCH = const(0xBE)
_WR_SCRATCH = const(0x4E)

class DS18X20:
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
            self._ow = onewire.OneWire(Pin(pin, pull=Pin.PULL_UP))
            self._buf = bytearray(9)
            self._roms =  self.scan()
            if len(self._roms) == 0:
                raise AttributeError("Cannot find a DS18X20")

    def scan(self):
        return [rom for rom in self._ow.scan() if rom[0] in (0x10, 0x22, 0x28)]

    def convert_temp(self):
        self._ow.reset(True)
        self._ow.writebyte(self._ow.SKIP_ROM)
        self._ow.writebyte(_CONVERT)

    def read_scratch(self, rom):
        self._ow.reset(True)
        self._ow.select_rom(rom)
        self._ow.writebyte(_RD_SCRATCH)
        self._ow.readinto(self._buf)
        if self._ow.crc8(self._buf):
            raise Exception("CRC error")
        return self._buf

    def read_temp(self, rom):
        buf = self.read_scratch(rom)
        if rom[0] == 0x10:
            if buf[1]:
                t = buf[0] >> 1 | 0x80
                t = -((~t + 1) & 0xFF)
            else:
                t = buf[0] >> 1
            return t - 0.25 + (buf[7] - buf[6]) / buf[7]
        else:
            t = buf[1] << 8 | buf[0]
            if t & 0x8000:  # sign bit set
                t = -((t ^ 0xFFFF) + 1)
            return t / 16

    def temperature(self):
        temp = []
        self.convert_temp()
        for rom in self._roms:
            temp.append(round(self.read_temp(rom), 2))
        return temp [0] if len(temp) == 1 else tuple(temp)
