"""
SANT G2 -MixGo SANT EXT G2

MicroPython library for the SANT G2 (Expansion board for MixGo SANT)
=======================================================
@dahanzimin From the Mixly Team
"""

import gc
from machine import Pin, SoftI2C

'''i2c-extboard'''
ext_i2c = SoftI2C(scl=Pin(5), sda=Pin(6), freq=400000)

'''RFID_Sensor'''
try :
    import rc522
    ext_rfid = rc522.RC522(ext_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with SI522A (RFID) or",e)

'''RADAR_Sensor'''
try :
    import cbr817
    ext_mmw = cbr817.CBR817(ext_i2c)     
except Exception as e:
    print("Warning: Failed to communicate with CBR817 (RADAR) or",e)

'''Reclaim memory'''
gc.collect()
