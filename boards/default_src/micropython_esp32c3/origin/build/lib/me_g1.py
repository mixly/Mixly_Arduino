"""
ME G1 -MixGo ME EXT G1

MicroPython library for the ME G1 (Expansion board for MixGo ME)
=======================================================

#Preliminary composition                       20230110

dahanzimin From the Mixly Team
"""

import time,gc
from machine import Pin,SoftI2C,ADC

'''i2c-extboard'''
ext_i2c=SoftI2C(scl = Pin(0), sda = Pin(1), freq = 400000)
Pin(0,Pin.OUT)

'''Atmos_Sensor'''
try :
    import hp203x
    ext_hp203x = hp203x.HP203X(ext_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with HP203X or",e)

'''T&H_Sensor'''
try :
    import ahtx0
    ext_ahtx0 = ahtx0.AHTx0(ext_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with AHTx0 or",e)

'''RFID_Sensor'''
try :
    import rc522
    ext_rc522 = rc522.RC522(ext_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with RC522 or",e)

'''Knob_Sensor'''
def varistor():
    adc = ADC(Pin(0))
    adc.atten(ADC.ATTN_11DB)
    time.sleep_ms(1)
    values = []
    for _ in range(100):
        values.append(adc.read_u16())
        time.sleep_us(100)
    result = sum(sorted(values)[25:75])//50
    Pin(0,Pin.OUT)
    time.sleep_ms(1)
    return max((result-10100),0)*65535//55435

'''Reclaim memory'''
gc.collect()
