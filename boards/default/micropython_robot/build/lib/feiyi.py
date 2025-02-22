"""
MixGo CC -Onboard resources

MicroPython library for the MixGo CC -Onboard resources
=======================================================

#Preliminary composition                20221010

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC,PWM,Timer,RTC

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(6), sda = Pin(7), freq = 400000)

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

#PS The previous version cancelled this feature
# '''BPS-Sensor'''
# try :
#     import hp203x
#     onboard_hp203x = hp203x.HP203X(onboard_i2c)     
# except Exception as e:
#     print("Warning: Failed to communicate with HP203X (BPS) or",e)

# '''THS-Sensor'''
# try :
#     import ahtx0
#     onboard_ahtx0 = ahtx0.AHTx0(onboard_i2c)     
# except Exception as e:
#     print("Warning: Failed to communicate with AHTx0 (THS) or",e)

'''RFID-Sensor'''
try :
    import rc522
    onboard_rfid = rc522.RC522(onboard_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with RC522 (RFID) or",e)

'''ADC*7, Motor*2*2, Matrix12x12'''
try :
    import bot51
    onboard_bot51 = bot51.BOT51(onboard_i2c)
    onboard_matrix = onboard_bot51    
except Exception as e:
    print("Warning: Failed to communicate with Bot51 (Matrix Motor ALS ADC..) or",e)

'''MGS-Sensor'''
try :
    import mmc5603
    onboard_mgs = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
    print("Warning: Failed to communicate with MMC5603 (MGS) or",e)

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(8), 4)

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(10)

'''MIC_Sensor'''
class MICSensor:
    def __init__(self,pin):
        self.adc=ADC(Pin(pin))
        self.adc.atten(ADC.ATTN_11DB) 
        
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

onboard_sound = MICSensor(4)

'''2Button'''
class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN, Pin.PULL_UP)
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

button_a = Button(5)
button_b = Button(9)

'''Reclaim memory'''
gc.collect()
