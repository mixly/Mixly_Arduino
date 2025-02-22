#ADXL345
import time
import ustruct
from micropython import const

DATA_FORMAT = const(0x31)
BW_RATE     = const(0x2c)
POWER_CTL   = const(0x2d)
INT_ENABLE  = const(0x2E)
OFSX        = const(0x1e)
OFSY        = const(0x1f)
OFSZ        = const(0x20)

class ADXL345:
    def __init__(self, i2c, address=0X53):
        self._device = i2c
        self._address = address
        if self._rreg(0x0) != 0xe5:
            raise AttributeError("Cannot find a ADXL345")
                
        self._wreg(DATA_FORMAT,0x2B)    #16g量程
        self._wreg(BW_RATE,0x0A)        #数据输出速度为100Hz
        self._wreg(INT_ENABLE,0x00)     #不使用中断

        self._wreg(OFSX,0x00)
        self._wreg(OFSY,0x00)
        self._wreg(OFSZ,0x00)
        self._wreg(POWER_CTL,0x08)      #链接使能,测量模式
        time.sleep(0.5)

    def readXYZ(self):
        x, = ustruct.unpack('<h', self._rreg(0x32,2))
        y, = ustruct.unpack('<h', self._rreg(0x34,2))
        z, = ustruct.unpack('<h', self._rreg(0x36,2))
        return (x/256,y/256,z/256)

    def readX(self):
        return self.readXYZ()[0]

    def readY(self):
        return self.readXYZ()[1]

    def readZ(self):
        return self.readXYZ()[2]

    def _wreg(self, reg, val):
        '''Write memory address'''
        self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

    def _rreg(self, reg,nbytes=1):
        '''Read memory address'''
        return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]
