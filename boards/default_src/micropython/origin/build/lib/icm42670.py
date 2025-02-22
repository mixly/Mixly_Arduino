"""
ICM42670P

Micropython library for the ICM42670P(Accelerometer+Gyroscope)
=======================================================

#Preliminary composition	       		20220716

dahanzimin From the Mixly Team
"""
import time
from micropython import const

ICM42670_REG_DEVICE_ID		= const(0x00)
ICM42670_REG_RESET			= const(0x02)
ICM42670_REG_DATA			= const(0x09)
ICM42670_REG_PWR_MGMT0		= const(0x1F)
ICM42670_REG_GYRO_CONFIG0	= const(0x20)
ICM42670_REG_ACCEL_CONFIG0	= const(0x21)
ICM42670_REG_APEX_DATA0		= const(0x31)
ICM42670_REG_WHO_AM_I		= const(0x75)

AccRange_16g	= 0 
AccRange_8g		= 1 
AccRange_4g		= 2
AccRange_2g		= 3

GyrRange_2000dps	= 0
GyrRange_1000dps	= 1	
GyrRange_500dps 	= 2	
GyrRange_250dps 	= 3

Acc_Gyr_Odr_1600Hz	= 0x05   	
Acc_Gyr_Odr_800Hz	= 0x06
Acc_Gyr_Odr_400Hz 	= 0x07
Acc_Gyr_Odr_200Hz	= 0x08
Acc_Gyr_Odr_100Hz	= 0x09
Acc_Gyr_Odr_50Hz	= 0x0A
Acc_Gyr_Odr_25Hz	= 0x0B
Acc_Gyr_Odr_12_5Hz	= 0x0C

class ICM42670:
	def __init__(self, i2c_bus, addr=0x68, AccRange=AccRange_16g, GyrRange=GyrRange_2000dps, Acc_Gyr_Odr=Acc_Gyr_Odr_100Hz):
		self._device = i2c_bus
		self._address = addr
		if self._chip_id() != 0x67:
			raise AttributeError("Cannot find a ICM42670")

		self._wreg(ICM42670_REG_RESET,0x10)  #Software reset enabled
		time.sleep(0.1)
		self._wreg(ICM42670_REG_GYRO_CONFIG0,(GyrRange << 4) | Acc_Gyr_Odr)		#Gyr-500HZ/2000dps
		self._wreg(ICM42670_REG_ACCEL_CONFIG0,(AccRange << 4) | Acc_Gyr_Odr)	#ACC-100HZ/16G
		self._wreg(ICM42670_REG_PWR_MGMT0,0x1E)
		time.sleep(0.1)
		self.acc_lsb_div= 2 ** (11 + AccRange)
		self.gyr_lsb_div= 2 ** (14 + GyrRange)

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self):  
		return self._rreg(ICM42670_REG_WHO_AM_I)
	
	def u2s(self,n):
		return n if n < (1 << 15) else n - (1 << 16)	
	
	def getdata(self):
		_buffer=self._rreg(ICM42670_REG_DATA,14)
		tmp=  float(self.u2s(_buffer[0]<<8|_buffer[1]))/128+25
		acc_x=float(self.u2s(_buffer[2]<<8|_buffer[3]))/self.acc_lsb_div
		acc_y=float(self.u2s(_buffer[4]<<8|_buffer[5]))/self.acc_lsb_div
		acc_z=float(self.u2s(_buffer[6]<<8|_buffer[7]))/self.acc_lsb_div
		gyr_x=float(self.u2s(_buffer[8]<<8|_buffer[9]))/self.gyr_lsb_div
		gyr_y=float(self.u2s(_buffer[10]<<8|_buffer[11]))/self.gyr_lsb_div
		gyr_z=float(self.u2s(_buffer[12]<<8|_buffer[13]))/self.gyr_lsb_div
		return (acc_x,acc_y,acc_z),(gyr_x,gyr_y,gyr_z),round(tmp,2)

	def accelerometer(self):
		return self.getdata()[0]

	def strength(self): 
		from math import sqrt
		return sqrt(self.accelerometer()[0]**2+self.accelerometer()[1]**2+self.accelerometer()[2]**2)	

	def gyroscope(self):
		return self.getdata()[1]

	def temperature(self):
		return self.getdata()[2]
