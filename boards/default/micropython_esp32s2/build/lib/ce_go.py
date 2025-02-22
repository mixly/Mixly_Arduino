"""
CE GO -Onboard resources

MicroPython library for the CE GO (Smart Car base for MixGo CE)
MicroPython library for the CE GO (Smart Car base for MixGo CE)
=======================================================

#Preliminary composition                       20220830

dahanzimin From the Mixly Team
"""

import time, gc, math
from tm1931 import TM1931
from machine import Pin, SoftI2C, ADC

'''i2c-onboard'''
i2c = SoftI2C(scl = Pin(4, pull=Pin.PULL_UP), sda = Pin(5, pull=Pin.PULL_UP), freq = 400000)
i2c_scan = i2c.scan()

'''Version judgment'''
if 0x50 in i2c_scan:
    version = 1
else:
    version = 0

'''Judging the type of external motor'''
Mi2c = 0
for addr in i2c_scan:
    if addr in [0x30, 0x31, 0x32, 0x33]:
        Mi2c = addr
        break

'''i2c-motor'''
def  i2c_motor(speed):
    i2c.writeto(Mi2c, b'\x00\x00' + speed.to_bytes(1, 'little') + b'\x00')

'''TM1931-Expand'''    
class CAR(TM1931):
    '''Infrared line patrol obstacle avoidance mode'''
    CL=0                    #Turn off infrared to reduce power consumption
    OA=1                    #Obstacle avoidance mode only
    LP=2                    #Line patrol mode only
    LS=3                    #Light seeking mode only    
    AS=4                    #Automatic mode switching

    '''TM1931 port corresponding function definition'''
    OAOU=5                          #obstacle avoidance  
    LPOU=4                          #Line patrol control
    LSOU=3                          #Light control
    WLED=12                         #Headlamp port
    GLED=[17,8,6,15]                #Green LED port
    RLED=[16,7,9,18]                #Red LED port
    UCOU=[1,2]                      #Typec external port
    MOTO=[[13,14],[10,11],[1,2]]    #Motor port

    def __init__(self, i2c_bus):
        super().__init__(i2c_bus)
        self._mode = self.CL
        self.atten = 0.82 if version else 1
        self.adc0 = ADC(Pin(9), atten=ADC.ATTN_11DB)
        self.adc1 = ADC(Pin(10), atten=ADC.ATTN_11DB)
        self.adc2 = ADC(Pin(1), atten=ADC.ATTN_11DB)
        self.adc3 = ADC(Pin(2), atten=ADC.ATTN_11DB)

    def ir_mode(self, select=0):
        '''Infrared line patrol obstacle avoidance mode'''
        self._mode=select
        if select==self.CL:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,0)
            self.pwm(self.LSOU,0)
        if select==self.OA:
            self.pwm(self.OAOU,255)
            self.pwm(self.LPOU,0)
            self.pwm(self.LSOU,0)
        if select==self.LP:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,255)
            self.pwm(self.LSOU,0)
        if select==self.LS:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,0)
            self.pwm(self.LSOU,255)
        time.sleep_ms(2)
            
    def obstacle(self):
        '''Read the obstacle avoidance sensor'''
        if self._mode==self.AS:
            self.pwm(self.OAOU,255)
            self.pwm(self.LPOU,0)
            self.pwm(self.LSOU,0)
            time.sleep_ms(2)
        if self._mode==self.OA or self._mode==self.AS :
            return self.adc2.read_u16(),self.adc1.read_u16(),self.adc0.read_u16(),self.adc3.read_u16()
        else:
            raise ValueError('Mode selection error, obstacle avoidance data cannot be read')

    def patrol(self):
        '''Read the line patrol sensor'''
        if self._mode==self.AS:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,255)
            self.pwm(self.LSOU,0)
            time.sleep_ms(2)
        if self._mode==self.LP or self._mode==self.AS:
            return self.adc3.read_u16(),self.adc2.read_u16(),self.adc1.read_u16(),self.adc0.read_u16()    
        else:
            raise ValueError('Mode selection error, line patrol data cannot be read')

    def light(self):
        '''Read the light seeking sensor'''
        if self._mode==self.AS:
            self.pwm(self.OAOU,0)
            self.pwm(self.LPOU,0)
            self.pwm(self.LSOU,255)
            time.sleep_ms(2)
        if self._mode==self.LS or self._mode==self.AS:
            return self.adc3.read_u16(),self.adc2.read_u16(),self.adc1.read_u16(),self.adc0.read_u16()    
        else:
            raise ValueError('Mode selection error, light seeking data cannot be read')

    def motor(self, index, action, speed=0):
        speed = round(max(min(speed, 100), -100) * self.atten)
        if action=="N":
            if (index == [1, 2]) and Mi2c:
                i2c_motor(0)
            else:
                self.pwm(index[0], 255)
                self.pwm(index[1], 255)
        elif action=="P":
            if (index == [1, 2]) and Mi2c:
                i2c_motor(0)
            else:
                self.pwm(index[0], 0)
                self.pwm(index[1], 0)
        elif action=="CW":
            if (index == [1, 2]) and Mi2c:
                i2c_motor(speed)
            else:
                if speed >= 0:
                    self.pwm(index[0], speed * 255 // 100)
                    self.pwm(index[1], 0)
                else:
                    self.pwm(index[0], 0)
                    self.pwm(index[1], - speed * 255 // 100)
        elif action=="CCW":
            if (index == [1, 2]) and Mi2c:
                i2c_motor(- speed)
            else:
                if speed >= 0:
                    self.pwm(index[0], 0)
                    self.pwm(index[1], speed * 255 // 100)
                else:
                    self.pwm(index[0], - speed * 255 // 100)
                    self.pwm(index[1], 0)
        else:
            raise ValueError('Invalid input, valid are "N","P","CW","CCW"')
            
    def move(self,action,speed=100):
        if action=="N":
            self.motor(self.MOTO[0],"N")
            self.motor(self.MOTO[1],"N")
        elif action=="P":
            self.motor(self.MOTO[0],"P")
            self.motor(self.MOTO[1],"P")
        elif action=="F":
            self.motor(self.MOTO[0],"CCW",speed)
            self.motor(self.MOTO[1],"CW",speed)
        elif action=="B":
            self.motor(self.MOTO[0],"CW",speed)
            self.motor(self.MOTO[1],"CCW",speed)
        elif action=="L":
            self.motor(self.MOTO[0],"CW",speed)
            self.motor(self.MOTO[1],"CW",speed)
        elif action=="R":
            self.motor(self.MOTO[0],"CCW",speed)
            self.motor(self.MOTO[1],"CCW",speed)
        else:
            raise ValueError('Invalid input, valid are "N","P","F","B","L","R"')    

    def setbrightness(self,index,val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self.pwm(index,val)
        
    def getrightness(self,index):
        return self.duty(index)

    def setonoff(self,index,val):
        if(val == -1):
            if self.getrightness(index) < 50:
                self.setbrightness(index,100)
            else:
                self.setbrightness(index,0)
        elif(val == 1):
            self.setbrightness(index,100)
        elif(val == 0):
            self.setbrightness(index,0)
            
    def getonoff(self,index):
        return True if self.getrightness(index)>0 else False

try :
    car=CAR(i2c) #Including LED,motor,patrol,obstacle
except Exception as e:
    print("Warning: Failed to communicate with TM1931 (ME GO CAR) or", e)

'''2Hall_HEP'''
class HALL:

    _pulse_turns=1/480 if version else 1/400    #圈数= 1/(减速比*磁极)
    _pulse_distance=_pulse_turns*math.pi*4.4    #距离= 圈数*π*轮胎直径

    def __init__(self, pin):
        self.turns = 0 
        self.distance = 0   #cm
        self._speed = 0     #cm/s
        self._on_receive = None
        self._time = time.ticks_ms()
        Pin(pin, Pin.IN).irq(handler=self._receive_cb, trigger=(Pin.IRQ_RISING | Pin.IRQ_FALLING))

    def _receive_cb(self, event_source):
        self.turns += self._pulse_turns
        self.distance += self._pulse_distance
        self._speed += self._pulse_distance
        if self._on_receive:
            self._on_receive(round(self.turns, 2),round(self.distance, 2))

    def irq_cb(self, callback):
        self._on_receive = callback

    def initial(self, turns=None, distance=None):
        if not (turns is None):
            self.turns = turns
        if not (distance  is None):
            self.distance = distance

    @property
    def speed(self):   
        value=self._speed/time.ticks_diff(time.ticks_ms(), self._time)*1000 if self._speed>0 else 0
        self._time = time.ticks_ms()
        self._speed = 0
        return round(value, 2)

hall_A = HALL(6)
hall_B = HALL(7)

'''Reclaim memory'''
gc.collect()
