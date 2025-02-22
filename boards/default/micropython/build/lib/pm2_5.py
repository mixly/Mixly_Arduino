"""
PM2.5

Micropython library for the PM2.5(UART)
=======================================================
#Preliminary composition        20220908

dahanzimin From the Mixly Team 
"""
import time

class PM2_5:
    def __init__(self, uart):
        self._uart=uart
        self._uart.init(baudrate=9600)
        self._pm=(0,0)
        self._flag=False
        if not self._chip_id():
            raise AttributeError("Cannot find a PM2.5")
    
    def _rreg(self):
        '''Read data'''
        if self._uart.any():
            eec=0
            buf=self._uart.read(7)
            for i in buf[1:5]:
                eec+=i
            if (eec & 0xff) == buf[5] and buf[0] == 0xAA and buf[6] == 0xFF:
                self._pm=(buf[1] << 8 | buf[2] , buf[3] << 8 | buf[4] )
                return True

    def _chip_id(self):
        for _ in range(5):
            if self._rreg():
                return True
            time.sleep(1)
        return False

    def concentration(self):
        self._rreg()
        return  self._pm
