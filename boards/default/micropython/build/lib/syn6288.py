"""
SYN6288

Micropython library for the SYN6288(speech synthesis)
=======================================================
#Preliminary composition        20220805

dahanzimin From the Mixly Team 
"""
import time
from micropython import const

REG_PLAY_SST        = const(0x01)
#REG_BAUD_SST        = const(0x31)
#REG_STOP_SST        = const(0x02)
#REG_PAUSE_SST       = const(0x03)
#REG_RESUME_SST      = const(0x04)
#EG_QUERY_SST        = const(0x21)
#EG_DOWN_SST         = const(0x88)

class SYN6288:
    def __init__(self, uart):
        self._uart=uart
        self._uart.init(baudrate=9600)
        self._state=False
        self._volume="[v10]"
    
    def _wreg(self, reg, val5=0,val3=None, data=None):
        '''Write memory address'''
        buffer=[0xFD,0x00,0x00,reg]
        eec=0

        if not val5 is None and not val3 is None :
            buffer.append((val3 & 0x07) | (val5 << 3))
            if not data is None:
                for char in data:
                    buffer.append(ord(char) >> 8)
                    buffer.append(ord(char) & 0xFF)
                    
        buffer[2]= len(buffer)-2
        for i in range(len(buffer)):
            eec^=int(buffer[i])
        buffer.append(eec)
      
        self._uart.write(bytes(buffer))

    def volume(self,vol=None):
        if vol is None:
            return int(self._volume[2:-1])
        if not 0 <= vol <= 16:
            raise ValueError("The effective range of volume value is 0~16")
        else:
            self._volume="[v{}]".format(vol)

    def synthesis(self, data, music=0, blocking=True):
        """Support uincode coded speech synthesis"""
        self._wreg(REG_PLAY_SST,music,3,self._volume+str(data))
        time.sleep(0.1)
        while blocking :
            if not self.status():
                break
        
    def status(self):
        """Playback status (true is playing)"""
        if self._uart.any():
            state= self._uart.read()
            if state==b'A':
                self._state = True
            if state==b'O':
                self._state = False
        return self._state 
       
    def hint_tones(self,number, blocking=True):
        """Play built-in prompt tone"""
        if number <25:
            tones="sound"+chr(ord("a")+number)
        elif number <33:
            tones="msg"+chr(ord("a")+number-25)
        elif number <48:
            tones="ring"+chr(ord("a")+number-33)
        else:
            raise ValueError("Input out of range")
        self.synthesis(tones,blocking=blocking)
