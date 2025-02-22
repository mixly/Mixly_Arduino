"""
AP3216C

MicroPython library for the AP3216C(ALS,PS,IRS)
=======================================================
#Preliminary composition       			20240630

@dahanzimin From the Mixly Team
"""
import time
from micropython import const

AP3216_ADD		= const(0x1E)
AP_SYS_CMD		= const(0x00)
AP_DAT			= const(0x0A)
AP_ALS_CMD		= const(0x10)
AP_PS_CMD		= const(0x20)
AP_PS_LED		= const(0x21)
Resolution 		= 0.35

class AP3216C:
	def __init__(self, i2c_bus, addr=AP3216_ADD):
		self._device = i2c_bus
		self._address = addr
		self._wreg(AP_SYS_CMD, 0x04)	# SW reset
		time.sleep_ms(100)
		self._wreg(AP_SYS_CMD, 0x03)	# 011: ALS and PS+IR functions active		
		self._wreg(AP_ALS_CMD, 0x00)	# Range 1: 0 ~ 20661 Lux. Resolution = 0.35 lux/count.
		self._wreg(AP_PS_CMD, 0x09)		# PS gain:10
		self._wreg(AP_PS_LED, 0x23)		# PS LED pulse:10

	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))
	
	def _rreg(self, reg, nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]
	
	@property	
	def getdata(self):
		'''处理获取数据'''
		#buf = self._rreg(AP_DAT, 6)
		ir = (self._rreg(AP_DAT + 0) & 0x03) | self._rreg(AP_DAT + 1) << 2
		als= (self._rreg(AP_DAT + 2) | self._rreg(AP_DAT + 3) << 8) * Resolution
		ps = (self._rreg(AP_DAT + 4) & 0x0F) | (self._rreg(AP_DAT + 5) & 0x3F) << 4
		return round(als, 2), ir, ps

	def als_vis(self):	
		'''可见光Lux'''
		return self.getdata[0]
		
	def als_ir(self):	
		'''红外Lux'''
		return self.getdata[1]		
		
	def ps_nl(self):	
		'''接近距离'''
		return self.getdata[2]	
