"""
LTR-308ALS

Micropython library for the LTR-308ALS  
=======================================================

#Changed from circuitpython to micropython       20220211

dahanzimin From the Mixly Team 
"""
import time
from micropython import const

LTR_308ALS_ADDRESS	       = const(0x53)

LTR_308ALS_REG_CTRL	       = const(0x00)  
LTR_308ALS_REG_GAIN	       = const(0x05)   #设置增益
LTR_308ALS_REG_DEVICE_ID   = const(0x06)
LTR_308ALS_REG_DATA        = const(0x0D)

#设置增益范围
LTR_308ALS_CMD_ALS_Enable  = const(0x02) 
LTR_308ALS_CMD_X1GAIN  =const(0x00)
LTR_308ALS_CMD_X3GAIN  =const(0x01)
LTR_308ALS_CMD_X6GAIN  =const(0x02)
LTR_308ALS_CMD_X9GAIN  =const(0x03)
LTR_308ALS_CMD_X18GAIN  =const(0x04)

_GAINS = (
    LTR_308ALS_CMD_X1GAIN,  # 1x
    LTR_308ALS_CMD_X3GAIN,  # 3x
    LTR_308ALS_CMD_X6GAIN,  # 6x
    LTR_308ALS_CMD_X9GAIN,  # 9x
    LTR_308ALS_CMD_X18GAIN  # 18x
)

_GAINS_X = (
    1,  # 1x
    3,  # 3x
    6,  # 6x
    9,  # 9x
    18  # 18x
)
	
class LTR_308ALS:
	def __init__(self, i2c_bus,gain=1):
		self._device = i2c_bus
		self._address = LTR_308ALS_ADDRESS
		self._gain = gain
		
		if self._chip_id() != 0xB1:
			raise AttributeError("Cannot find a LTR_308ALS")
		self._Enable()  #star
		time.sleep(0.2)
		self._wreg(LTR_308ALS_REG_GAIN,_GAINS[self._gain])	
		
	#Write memory address
	def _wreg(self, reg, val):
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	#Read memory address
	def _rreg(self, reg,nbytes=1):
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self):  
		return self._rreg(LTR_308ALS_REG_DEVICE_ID)
		
	def _Enable(self): 
		self._wreg(LTR_308ALS_REG_CTRL,LTR_308ALS_CMD_ALS_Enable)
		
	def getdata(self): 
		buffer=self._rreg(LTR_308ALS_REG_DATA,3)
		als_data= buffer[2]<<16 | buffer[1]<<8| buffer[0]
		als_lux=float(0.6*als_data/_GAINS_X[self._gain])
		return als_lux

