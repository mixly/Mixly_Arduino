"""
QMI8658

Micropython library for the QMI8658(Accelerometer+Gyroscope)
=======================================================

#Preliminary composition	       		20220716

dahanzimin From the Mixly Team
"""
import time
from micropython import const

QMI8658_REG_DEVICE_ID	 = const(0x00)

QMI8658_REG_Ctrl1	     = const(0x02)  #Serial Interface and Sensor Enable
QMI8658_REG_Ctrl2	     = const(0x03)  #Accelerometer Settings
QMI8658_REG_Ctrl3	     = const(0x04)  #Gyroscope Settings
QMI8658_REG_Ctrl5	     = const(0x06)  #Sensor Data Processing Settings
QMI8658_REG_Ctrl7	     = const(0x08)  #Sensor Data Processing Settings
QMI8658_REG_Ctrl9	     = const(0x0A)  #Host Commands
QMI8658_REG_StatusInt    = const(0x2D)  #Sensor Data Available and Lock Register Address
QMI8658_REG_DATA         = const(0x33)

Qmi8658AccRange_2g  = 0  		#/* +/- 2g range */
Qmi8658AccRange_4g  = 1  		#/* +/- 4g range */
Qmi8658AccRange_8g  = 2 		#/* +/- 8g range */
Qmi8658AccRange_16g = 3   		#/* +/- 16g range */

Qmi8658GyrRange_16dps 	= 0    	#/* +-16 degrees per second. */
Qmi8658GyrRange_32dps 	= 1    	#/* +-32 degrees per second. */
Qmi8658GyrRange_64dps 	= 2    	#/* +-64 degrees per second. */
Qmi8658GyrRange_128dps 	= 3   	#/* +-128 degrees per second. */
Qmi8658GyrRange_256dps 	= 4   	#/* +-256 degrees per second. */
Qmi8658GyrRange_512dps 	= 5   	#/* +-512 degrees per second. */
Qmi8658GyrRange_1024dps = 6  	#/* +-1024 degrees per second. */
Qmi8658GyrRange_2048dps = 7  	#/* +-2048 degrees per second. */

Qmi8658Acc_Gyr_Odr_8000Hz = 0x00    	#/* High resolution 8000Hz output rate. */
Qmi8658Acc_Gyr_Odr_4000Hz = 0x01    	#/* High resolution 4000Hz output rate. */
Qmi8658Acc_Gyr_Odr_2000Hz = 0x02    	#/* High resolution 2000Hz output rate. */
Qmi8658Acc_Gyr_Odr_1000Hz = 0x03    	#/* High resolution 1000Hz output rate. */
Qmi8658Acc_Gyr_Odr_500Hz  = 0x04     	#/* High resolution 500Hz output rate. */
Qmi8658Acc_Gyr_Odr_250Hz  = 0x05     	#/* High resolution 250Hz output rate. */
Qmi8658Acc_Gyr_Odr_125Hz  = 0x06     	#/* High resolution 125Hz output rate. */
Qmi8658Acc_Gyr_Odr_62_5Hz = 0x07    	#/* High resolution 62.5Hz output rate. */
Qmi8658Acc_Gyr_Odr_31_25Hz= 0x08   		#/* High resolution 31.25Hz output rate. */

class QMI8658:
	def __init__(self, i2c_bus,addr=0x6B,AccRange=Qmi8658AccRange_8g,GyrRange=Qmi8658GyrRange_2048dps,Acc_Gyr_Odr=Qmi8658Acc_Gyr_Odr_500Hz):
		self._device = i2c_bus
		self._address = addr
		if self._chip_id() != 0x05:
			raise AttributeError("Cannot find a QMI8658")
			
		self._wreg(QMI8658_REG_Ctrl9,0xA2)  #做selftest，提高精度
		time.sleep(1)
		self._wreg(QMI8658_REG_Ctrl1,0x60)
		self._wreg(QMI8658_REG_Ctrl7,0x03)  #启动
		self._wreg(QMI8658_REG_Ctrl2,(AccRange<< 4)|Acc_Gyr_Odr)  #ACC-500HZ/8G
		self._wreg(QMI8658_REG_Ctrl3,(GyrRange<< 4)|Acc_Gyr_Odr)  #Gyr-500HZ/2048dps
		self._wreg(QMI8658_REG_Ctrl5,0x75)  #Gyr-14%,ACC-5.32%
		self.gyr_lsb_div= 2**(11-GyrRange)
		self.acc_lsb_div= 1<<(14-AccRange)
		
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self):  
		return self._rreg(QMI8658_REG_DEVICE_ID)
		
	def status(self):  
		return self._rreg(QMI8658_REG_StatusInt)
		
	def u2s(self,n):
		return n if n < (1 << 15) else n - (1 << 16)	
		
	def getdata(self):
		while self.status() == 0x81:
			time.sleep(0.001)
		_buffer=self._rreg(QMI8658_REG_DATA,14)
		tmp=  float(self.u2s(_buffer[1]<<8|_buffer[0]))/256.0
		acc_x=float(self.u2s(_buffer[3]<<8|_buffer[2]))/self.acc_lsb_div
		acc_y=float(self.u2s(_buffer[5]<<8|_buffer[4]))/self.acc_lsb_div
		acc_z=float(self.u2s(_buffer[7]<<8|_buffer[6]))/self.acc_lsb_div
		gyr_x=float(self.u2s(_buffer[9]<<8|_buffer[8]))/self.gyr_lsb_div
		gyr_y=float(self.u2s(_buffer[11]<<8|_buffer[10]))/self.gyr_lsb_div
		gyr_z=float(self.u2s(_buffer[13]<<8|_buffer[12]))/self.gyr_lsb_div
		return (acc_x,acc_y,acc_z),(gyr_x,gyr_y,gyr_z),round(tmp,2)
	
	def accelerometer(self):
		return self.getdata()[0]

	def gyroscope(self):
		return self.getdata()[1]

	def temperature(self):
		return self.getdata()[2]
