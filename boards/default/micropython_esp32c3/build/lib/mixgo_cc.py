"""
MixGo CC -Onboard resources

MicroPython library for the MixGo CC -Onboard resources
=======================================================

#Preliminary composition                20221010

dahanzimin From the Mixly Team
"""
import time, gc
from machine import Pin, SoftI2C, ADC, PWM, RTC

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)
onboard_i2c_scan = onboard_i2c.scan()

'''Version judgment'''
if 0x73 in onboard_i2c_scan:
    version=1
elif 0x72 in onboard_i2c_scan:
    version=0
else:
    print("Warning: Mixgo CC board is not detected, which may cause usage errors")

'''RTC'''
rtc_clock=RTC()

'''ACC-Sensor'''
try :
    import mxc6655xa
    onboard_acc = mxc6655xa.MXC6655XA(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with MXC6655XA (ACC) or",e)

'''ALS_PS-Sensor'''
try :
    import ltr553als
    onboard_als = ltr553als.LTR_553ALS(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with TR_553ALS (ALS&PS) or",e)

'''BPS_Sensor'''
if 0x76 in onboard_i2c_scan:
    try :
        import hp203x
        onboard_bps = hp203x.HP203X(onboard_i2c)     
    except Exception as e:
        print("Warning: Failed to communicate with HP203X (BPS) or",e)
if 0x77 in onboard_i2c_scan:
    try :
        import spl06_001
        onboard_bps = spl06_001.SPL06(onboard_i2c)     
    except Exception as e:
        print("Warning: Failed to communicate with SPL06-001 (BPS) or",e)

'''T&H_Sensor'''
if 0x38 in onboard_i2c_scan:
    try :
        import ahtx0
        onboard_ths = ahtx0.AHTx0(onboard_i2c)     
    except Exception as e:
        print("Warning: Failed to communicate with AHTx0 (THS) or",e)
if 0x70 in onboard_i2c_scan:
    try :
        import shtc3
        onboard_ths = shtc3.SHTC3(onboard_i2c)     
    except Exception as e:
        print("Warning: Failed to communicate with GXHTC3 (THS) or",e)

'''RFID_Sensor'''
try :
    import rc522
    onboard_rfid = rc522.RC522(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with RC522 (RFID) or",e)

'''matrix32x12'''
try :
    import matrix32x12
    onboard_matrix = matrix32x12.Matrix(onboard_i2c, address=0x73 if version else 0x72)     
except Exception as e:
    print("Warning: Failed to communicate with Matrix32X12 or",e)

'''Magnetic'''
try :
    import mmc5603
    onboard_mgs = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with MMC5603 (MGS) or",e)

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(8), 4, ORDER=(0, 1, 2, 3))

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(10)

'''MIC_Sensor'''
class MICSensor:
    def __init__(self,pin):
        self.adc=ADC(Pin(pin), atten=ADC.ATTN_11DB)

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

onboard_sound = MICSensor(pin=4 if version else 3)

'''4,5KEY_Sensor'''
class KEYSensor:
    def __init__(self, pin, range):
        self.adc = ADC(Pin(pin), atten=ADC.ATTN_11DB)
        self.pin = pin
        self.range = range
        self.flag = True
    
    def _value(self):
        values = []
        for _ in range(50):
            values.append(self.adc.read())
            time.sleep_us(2)
        return (self.range - 300) < min(sorted(values)[25:]) < (self.range + 300)
    
    def get_presses(self, delay = 1):
        last_time,presses = time.time(), 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if self.was_pressed():
                presses += 1
        return presses

    def is_pressed(self):
        return self._value()

    def was_pressed(self):
        if(self._value() != self.flag):
            self.flag = self._value()
            if self.flag :
                return True
            else:
                return False

    def irq(self, handler, trigger):
        Pin(self.pin, Pin.IN).irq(handler = handler, trigger = trigger)

'''2,1KEY_Button'''
class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN)
        self.flag = True

    def get_presses(self, delay = 1):
        last_time,presses = time.time(), 0
        while time.time() < last_time + delay:
            time.sleep(0.05)
            if self.was_pressed():
                presses += 1
        return presses

    def is_pressed(self):
        return not self.pin.value()

    def was_pressed(self, flag = 0):
        if(self.pin.value() != self.flag):
            self.flag = self.pin.value()
            time.sleep(0.02)
            if self.flag:
                return False
            else:
                return True

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)

if version==0:
    B1key = Button(9)
    B2key = Button(4)
    A1key = KEYSensor(2,20)
    A2key = KEYSensor(2,1170)
    A3key = KEYSensor(2,2400)
    A4key = KEYSensor(2,3610)    

else:
    B1key = Button(9)
    B2key = KEYSensor(5,20)
    A1key = KEYSensor(5,800)
    A2key = KEYSensor(5,1600)
    A3key = KEYSensor(5,2500)
    A4key = KEYSensor(5,3500)

'''2-LED'''     #Modify indexing method    
class LED:
    def __init__(self, pins=[]):
        self._pins = pins
        self._flag = [True] * len(pins)
        self._brightness = [0] * len(pins)

    def setbrightness(self, index, val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        if len(self._pins) == 0:
            print("Warning: Old version, without this function")
        else:
            if self._flag[index-1]:
                self._pins[index-1] = PWM(Pin(self._pins[index-1]), duty_u16=65535)
                self._flag[index-1] = False
            self._brightness[index - 1] = val
            self._pins[index - 1].duty_u16(65535 - val * 65535 // 100)

    def getbrightness(self, index):
        if len(self._pins) == 0:
            print("Warning: Old version, without this function")
        else:
            return self._brightness[index - 1]

    def setonoff(self, index, val):
        if len(self._pins) == 0:
            print("Warning: Old version, without this function")
        else:
            if val == -1:
                self.setbrightness(index, 100)  if self.getbrightness(index) < 50 else self.setbrightness(index, 0) 
            elif val == 1:
                self.setbrightness(index, 100) 
            elif val == 0:
                self.setbrightness(index, 0) 

    def getonoff(self, index):
        if len(self._pins) == 0:
            print("Warning: Old version, without this function")
        else:
            return True if self.getbrightness(index) > 50 else False

#LED with function call / L1(IO20),L2(IO21)
onboard_led = LED() if version == 0 else LED(pins=[20, 21])

'''Reclaim memory'''
gc.collect()
