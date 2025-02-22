"""
_SPL06-001

MicroPython library for the _SPL06-001(Air pressure sensor)
=======================================================
@dahanzimin From the Mixly Team 
"""
import time
from micropython import const

_SPL06_ADDRESS      = const(0x77)
_SPL06_REG_PSR      = const(0x00)
_SPL06_REG_TMP      = const(0x03)
_SPL06_PSR_CFG      = const(0x06)   
_SPL06_TMP_CFG      = const(0x07)   
_SPL06_MEAS_CFG     = const(0x08)
_SPL06_CFG_REG      = const(0x09)
_SPL06_REG_RST      = const(0x0C)   
_SPL06_REG_ID       = const(0x0D)
_SPL06_REG_COEF     = const(0x10)

#Parameter selection(sample/sec, times, kT/kP) 
_SPL06_PSR_TMP_1    = (0<<4, 0, 524288)
_SPL06_PSR_TMP_2    = (1<<4, 1, 1572864)
_SPL06_PSR_TMP_4    = (2<<4, 2, 3670016)
_SPL06_PSR_TMP_8    = (3<<4, 3, 7864320)
_SPL06_PSR_TMP_16   = (4<<4, 4, 253952)
_SPL06_PSR_TMP_32   = (5<<4, 5, 516096)
_SPL06_PSR_TMP_64   = (6<<4, 6, 1040384)
_SPL06_PSR_TMP_128  = (7<<4, 7, 2088960)

class SPL06:
	def __init__(self, i2c_bus, addr=_SPL06_ADDRESS, rate=_SPL06_PSR_TMP_32):
		self._device = i2c_bus
		self._address = addr
		self._rate = rate
		self._psr = 0
		self._tmp = 0
		self._alt = 0
		if self._rreg(_SPL06_REG_ID) != 0x10:
			raise AttributeError("Cannot find a SPL06-001")
		self._init()

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _u2s(self, value, n=8):
		return value if value < (1 << (n-1)) else value - (1 << n)	

	def _status(self):
		'''数据转换状态'''
		status = self._rreg(_SPL06_MEAS_CFG)
		return status & 0x80, status & 0x40, (status >> 4 & 0x01) & (status >> 5 & 0x01) #COEF_RDY,SENSOR_RDY,TMP_RDY+PRS_RDY

	def _init(self):
		'''软复位'''
		self._wreg(_SPL06_REG_RST, 0x89)
		time.sleep_ms(50)
		'''判断校准数据是否就绪，并读取'''
		while not self._status()[0]:
			time.sleep_ms(1)
		buf = self._rreg(_SPL06_REG_COEF, 18)
		self._c0 = self._u2s(buf[0] << 4 | buf[1] >> 4, 12)
		self._c1 = self._u2s((buf[1] & 0x0F) << 8 |  buf[2], 12)             
		self._c00 = self._u2s(buf[3] << 12 | buf[4] << 4 | buf[5] >> 4, 20)
		self._c10 = self._u2s((buf[5] & 0x0F) << 16 | buf[6] << 8 | buf[7], 20)
		self._c01 = self._u2s(buf[8] << 8 | buf[9], 16)
		self._c11 = self._u2s(buf[10] << 8 | buf[11], 16)
		self._c20 = self._u2s(buf[12] << 8 | buf[13], 16)
		self._c21 = self._u2s(buf[14] << 8 | buf[15], 16)       
		self._c30 = self._u2s(buf[16] << 8 | buf[17], 16)

		'''判断传感器是否就绪，并设置''' 
		while not self._status()[1]:
			time.sleep_ms(1)
		self._wreg(_SPL06_MEAS_CFG, 0x07)                           		#Continuous pressure and temperature
		self._wreg(_SPL06_PSR_CFG, self._rate[0] | self._rate[1])   		#Configuration of pressure measurement.
		self._wreg(_SPL06_TMP_CFG, self._rate[0] | self._rate[1] | 0x80)	#Configuration of temperature measurement.  
		self._rreg(_SPL06_REG_PSR, 6)      

		if self._rate[1] > 3:
		   self._wreg(_SPL06_CFG_REG, self._rreg(_SPL06_CFG_REG) | 0x0C)	#when the oversampling rate is >8 times.

		''''判断数据是否就绪，并读取'''
		#while not self._status()[2]:
			#time.sleep_ms(1)			#数据就绪需要耗时1s左右

	@property   
	def getdata(self):
		'''处理获取数据'''
		if self._status()[2]:            
			buf = self._rreg(_SPL06_REG_PSR, 6)
			praw = self._u2s(buf[0] << 16 | buf[1] << 8 | buf[2], 24) / self._rate[2]
			traw = self._u2s(buf[3] << 16 | buf[4] << 8 | buf[5], 24) / self._rate[2]
			try:
				self._psr = self._c00 + praw * (self._c10 + praw *(self._c20 + praw * self._c30)) + traw * self._c01 + traw * praw * (self._c11 + praw * self._c21)
			except:
				self._psr = 0
			self._tmp =  self._c0 * 0.5 + self._c1 * traw 
			self._alt = (1 - (self._psr / 101325) ** (1/5.255)) * 44330
		return round(self._psr/100, 2), round(self._tmp, 2), round(self._alt,2)

	def pressure(self): 
		return self.getdata[0]

	def temperature(self): 
		return self.getdata[1]

	def altitude(self): 
		return self.getdata[2]
