"""
MXC6655XA

Micropython library for the MXC6655XA Accelerometer
=======================================================
#Changed from circuitpython to micropython       20220224
#Format unified								     20220623

dahanzimin From the Mixly Team 
"""
import time
from math import atan,sqrt,degrees
from micropython import const

MXC6655XA_ADDRESS	     = const(0x15)
MXC6655XA_REG_DATA	     = const(0x03)
MXC6655XA_REG_CTRL	     = const(0x0D)
MXC6655XA_REG_DEVICE_ID	 = const(0x0E)
MXC6655XA_CMD_8G_POWER_ON  = const(0x40)
MXC6655XA_CMD_4G_POWER_ON  = const(0x20)
MXC6655XA_CMD_2G_POWER_ON  = const(0x00)

_Range = (
	MXC6655XA_CMD_2G_POWER_ON,  # 2g
	MXC6655XA_CMD_4G_POWER_ON,  # 4g
	MXC6655XA_CMD_8G_POWER_ON,  # 8g
)

_Range_X = (
	1024,   # 2g
	512,    # 4g
	256,    # 8g
)

MXC6655XA_T_ZERO          =25
MXC6655XA_T_SENSITIVITY	  =0.586

class MXC6655XA:

	def __init__(self,i2c_bus,set_range=2, front=False):
		self._device = i2c_bus
		self._address = MXC6655XA_ADDRESS
		self._range = set_range     #default 8g range
		self._front = front

		if self._chip_id() != 0x02:
			raise AttributeError("Cannot find a MXC6655XA")
		self._Enable()              #star
		#time.sleep(0.3)
		
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self):  
		return self._rreg(MXC6655XA_REG_DEVICE_ID)
		
	def _Enable(self): 
		self._wreg(MXC6655XA_REG_CTRL,_Range[self._range])
		
	def u2s(self,n):
		return n if n < (1 << 7) else n - (1 << 8)	

	@property
	def getdata(self): 
		data_reg=self._rreg(MXC6655XA_REG_DATA,7)
		x_acc=float((self.u2s(data_reg[0])<<8|data_reg[1])>>4)/_Range_X[self._range]
		y_acc=float((self.u2s(data_reg[2])<<8|data_reg[3])>>4)/_Range_X[self._range]
		z_acc=float((self.u2s(data_reg[4])<<8|data_reg[5])>>4)/_Range_X[self._range]
		t_acc=float(self.u2s(data_reg[6]))*MXC6655XA_T_SENSITIVITY + MXC6655XA_T_ZERO
		return (-y_acc,-x_acc,z_acc,round(t_acc,1)) if self._front else (y_acc,-x_acc,z_acc,round(t_acc,1))

	def acceleration(self): 
		return self.getdata[0:3]

	def strength(self): 
		from math import sqrt
		return sqrt(self.getdata[0]**2+self.getdata[1]**2+self.getdata[2]**2)

	def temperature(self): 
		return self.getdata[3]

	def eulerangles(self,upright=False): 
		x,y,z=self.acceleration()
		pitch = degrees(atan(z / sqrt(x ** 2 + y ** 2))) if upright else degrees(atan(y / sqrt(x ** 2 + z ** 2)))
		roll =  degrees(atan(x / sqrt(y ** 2 + z ** 2)))
		return round(pitch,2),round(roll,2)
