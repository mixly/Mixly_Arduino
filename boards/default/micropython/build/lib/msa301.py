"""
MSA301

Micropython library for the MSA301 Accelerometer
=======================================================
#Preliminary composition                          20220817

dahanzimin From the Mixly Team 
"""
import time
from micropython import const

MSA301_ADDRESS	     		= const(0x26)
MSA301_REG_DEVICE_ID	 	= const(0x01)
MSA301_REG_DATA	     		= const(0x02)
MSA301_REG_ODR 				= const(0x10)
MSA301_REG_POWERMODE 		= const(0x11)
MSA301_REG_RESRANGE 		= const(0x0F)

class MSA301:
	def __init__(self, i2c_bus, front=False):
		self._device = i2c_bus
		self._address = MSA301_ADDRESS
		self._front = front
		if self._chip_id() != 0x13:
			raise AttributeError("Cannot find a MSA301")
			
		self._wreg(MSA301_REG_ODR,0X09)  		#RATE_500_HZ
		self._wreg(MSA301_REG_POWERMODE,0X12)  	#NORMAL & WIDTH_250_HZ
		self._wreg(MSA301_REG_RESRANGE,0X02)  	#RESOLUTION_14_BIT & RANGE_8_G
	
	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]
		
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _chip_id(self):  
		return self._rreg(MSA301_REG_DEVICE_ID)
		
	def u2s(self,n):
		return n if n < (1 << 7) else n - (1 << 8)	

	def acceleration(self): 
		data_reg=self._rreg(MSA301_REG_DATA,6)
		x_acc=((self.u2s(data_reg[1])<<8|data_reg[0])>>2)/1024.0
		y_acc=((self.u2s(data_reg[3])<<8|data_reg[2])>>2)/1024.0
		z_acc=((self.u2s(data_reg[5])<<8|data_reg[4])>>2)/1024.0
		return (-y_acc,-x_acc,z_acc) if self._front else (y_acc,-x_acc,z_acc)

	def eulerangles(self,upright=False): 
		x,y,z=self.acceleration()
		pitch = degrees(atan(z / sqrt(x ** 2 + y ** 2))) if upright else degrees(atan(y / sqrt(x ** 2 + z ** 2)))
		roll =  degrees(atan(x / sqrt(y ** 2 + z ** 2)))
		return round(pitch,2),round(roll,2)
