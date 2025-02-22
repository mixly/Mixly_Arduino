"""
MS32006

Micropython  library for the MS32006 step diever 
=======================================================
#Changed from circuitpython to micropython       20211206
#Fix register read / write bug 				     20211215
dahanzimin From the Mixly Team 
 
"""
import time
from micropython import const


MS32006_REG_RESET	     = const(0x00)  #复位
MS32006_FCLK             = const(25000000)  #芯片输入时钟选择，此参数与运动速度有关。 范围是：5-30MHZ

ADDRESS_A	= 0x10
ADDRESS_B	= 0x18
MOT_FULL  	= 0 
MOT_HALF  	= 1 
MOT_A		= 0
MOT_B       = 4
MOT_N		= 0
MOT_CW      = 1
MOT_CCW     = 2
MOT_P       = 3
class MS32006:

	_buffer = bytearray(2)

	def __init__(self, i2c_bus,addr=ADDRESS_A,mode=MOT_FULL):
		self._device = i2c_bus
		self._address = addr
		self.reset()
		self.mode=mode
	

	def _read_u8(self, reg):
		return  self._device.readfrom_mem(self._address, reg, 1)[0] 
		
	def _write_u8(self, reg, val):
		self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

	def reset(self): 
		self._write_u8(MS32006_REG_RESET,0x00)
		time.sleep(0.1)
		self._write_u8(MS32006_REG_RESET,0xC1)
		
	def move(self,moto,mot_dir,mot_pps,mot_step):
		readstate_0H = self._read_u8(0x00)
		readstate_9H = self._read_u8(0x09)  		
		speed_data=MS32006_FCLK//mot_pps//128  	  #设置速度 xx pps  128是固定参数
		
		if speed_data<32:				#限定转速				
			speed_data=32
		elif speed_data>16383:
			speed_data=16383  
			
		mot_speed_l=speed_data&0x00ff  #取低8位
		mot_speed_h=speed_data//0x100  #取高6位
		
		if self.mode==MOT_FULL:        #设置整步、半步驱动模式
			mot_speed_h|=0x80
		else:
			mot_speed_h&=0x7f
			
		if mot_step>2047:
			raise AttributeError("Reach the set upper limit, up to 2047 step")
			
		mot_step_l=mot_step&0x00ff
		mot_step_h=mot_step//0x100
		mot_step_h|=0x80
		
		if mot_dir==MOT_CW:
			mot_step_h&=0xBF
		else:
			mot_step_h|=0x40
		self._write_u8(0x01+moto,mot_speed_l)
		self._write_u8(0x02+moto,mot_speed_h)
		self._write_u8(0x03+moto,mot_step_l)
		self._write_u8(0x04+moto,mot_step_h)
		
		if moto==MOT_A:
			self._write_u8(0x00, readstate_0H&0xfb)
			self._write_u8(0x09, readstate_9H|0x80)
		else:
			self._write_u8(0x00, readstate_0H&0xfd)
			self._write_u8(0x09, readstate_9H|0x40)
				
	def close(self,moto):        	#停止并关闭输出
		if moto==MOT_A:
			self._write_u8(0x04,0x00)
		else:
			self._write_u8(0x08,0x00)

	def stop(self,moto):         	#此停止函数，强制让电机停止
		readstate = self._read_u8(0x00)        
		if moto==MOT_A:
			self._write_u8(0x00,readstate|0x04)
		else:
			self._write_u8(0x00,readstate|0x02)	
		
	def readstep(self,moto):        #读取电机运动步数
		if moto==MOT_A:
			rdb =self._read_u8(0x0b)
			rdc =self._read_u8(0x0c)
		else:
			rdb =self._read_u8(0x0d)
			rdc =self._read_u8(0x0e)
		return (rdb*0x100+rdc)&0xfff 

	def readbusy(self,moto):        #读取电机缓存是否有数据
		if moto==MOT_A:
			busy =(self._read_u8(0x0b)>>6)&1
		else:
			busy =(self._read_u8(0x0d)>>6)&1
		return bool(busy)
		
	def readwork(self,moto):        #读取电机是否在运行
		if moto==MOT_A:
			busy =(self._read_u8(0x0b)>>4)&1
		else:
			busy =(self._read_u8(0x0d)>>4)&1
		return bool(busy)
		
	def dc_motor(self,state,speed=100):   #直流电机驱动
		if (state==MOT_CW) | (state==MOT_CCW) :
			speed_st=speed*127//100 |0x80
			self._write_u8(0x0A,speed_st)
			
		readstate = self._read_u8(0x09) & 0xA0 
		state_st=(state<<2) | 0X03 | readstate
		self._write_u8(0x09,state_st)
		
	
	