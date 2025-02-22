"""
LTR-553ALS-XX

MicroPython library for the LTR-553ALS-XX(ALS,PS)
=======================================================

#Preliminary composition       			20220224
#Format unified							20220623

dahanzimin From the Mixly Team
"""

import time
from micropython import const

LTR_553ALS_ADDRESS					= const(0x23)
LTR_ALS_REG_CONTR					= const(0x80)
LTR_PS_REG_CONTR					= const(0x81)
LTR_PS_REG_LED						= const(0x82)
LTR_PS_REG_PULSES					= const(0x83)
LTR_PS_REG_RATE						= const(0x84)
LTR_ALS_REG_RATE					= const(0x85)
LTR_553ALS_REG_ID					= const(0x87)
LTR_ALS_REG_DATA1					= const(0x88)
LTR_553ALS_REG_ATATUS				= const(0x8C)
LTR_PS_REG_DATA1					= const(0x8D)

_ALS_GAIN={
	"X1":(1,0x01),		# For Gain X1
	"X2":(2,0x05),		# For Gain X2
	"X4":(4,0x09),		# For Gain X4
	"X8":(8,0x0D),		# For Gain X8
	"X48":(48,0x19),	# For Gain X48
	"X96":(96,0x1D),	# For Gain X96
}

class LTR_553ALS:

	def __init__(self, i2c_bus,addr=LTR_553ALS_ADDRESS,ALS_Gain="X1"):
		self._device  =  i2c_bus
		self._address = addr
		self.ALS_IR   = 0
		self.ALS_VIS  = 0
		self.PS       = 0
		self.ALS_gain = ALS_Gain
		
		if self._chip_id() != 0x05:
			raise AttributeError("Cannot find a LTR_553ALS")
			
		self._configure()
		#time.sleep(0.1)
	
	def _wreg(self, reg, val):
		'''Write memory address'''
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))
	
	def _rreg(self, reg,nbytes=1):
		'''Read memory address'''
		return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

	def _chip_id(self): 
		'''校对设备ID'''	
		return self._rreg(LTR_553ALS_REG_ID)
		
	def _configure(self):
		'''配置寄存器'''
		self._wreg(LTR_ALS_REG_CONTR,_ALS_GAIN[self.ALS_gain][1])	# ALS_CONTR: Active mode
		self._wreg(LTR_PS_REG_CONTR,0x03)							# PS_CONTR:  Active mode
		self._wreg(LTR_PS_REG_LED,0x5B)			#PS_LED: LED_pulse_period=50khz,DUTY = 100%,LED_pulsed_current_level = 50mA
		self._wreg(LTR_PS_REG_PULSES,0x0A)		#PS_N_Pulses: Number_of_pulses = 10
		self._wreg(LTR_PS_REG_RATE,0x08)		#PS_Measurement_Rate=10ms
		self._wreg(LTR_ALS_REG_RATE,0x12)		#ALS_Measurement_Rate=200ms,ALS_integration_time=200ms
	
	def _status(self):
		'''数据转换状态'''
		status=self._rreg(LTR_553ALS_REG_ATATUS)
		return status&0x84, status&0x01				#ALS,PS status

	@property	
	def getdata(self):
		'''处理获取数据'''
		if self._status()[0]:
			data_als=self._rreg(LTR_ALS_REG_DATA1,4)
			als_ch1=data_als[0] | data_als[1]<<8
			als_ch0=data_als[2] | data_als[3]<<8
			ratio=als_ch1/(als_ch1+als_ch0) if (als_ch1+als_ch0)>0 else 0
			self.ALS_IR =als_ch1*ratio/_ALS_GAIN[self.ALS_gain][0]
			self.ALS_VIS=als_ch0*ratio/_ALS_GAIN[self.ALS_gain][0]
			
		if self._status()[1]:
			data_ps=self._rreg(LTR_PS_REG_DATA1,2)
			self.PS =data_ps[0] | data_ps[1]<<8
			
		return round(self.ALS_VIS,2),round(self.ALS_IR,2),self.PS
		
	def als_vis(self):	
		'''可见光Lux'''
		return self.getdata[0]
		
	def als_ir(self):	
		'''红外Lux'''
		return self.getdata[1]		
		
	def ps_nl(self):	
		'''接近距离'''
		return self.getdata[2]	
