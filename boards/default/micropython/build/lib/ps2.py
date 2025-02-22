"""
PS2Controller

MicroPython library for the PS2Controller
=======================================================

#Perform upgrade repair           				20220819

dahanzimin From the Mixly Team
"""

import time
from machine import Pin
from micropython import const

PSB_SELECT		= const(0x0001)
PSB_L3			= const(0x0002)
PSB_R3			= const(0x0004)
PSB_START		= const(0x0008)
PSB_PAD_UP		= const(0x0010)
PSB_PAD_RIGHT	= const(0x0020)
PSB_PAD_DOWN	= const(0x0040)
PSB_PAD_LEFT	= const(0x0080)
PSB_L2			= const(0x0100)
PSB_R2			= const(0x0200)
PSB_L1			= const(0x0400)
PSB_R1			= const(0x0800)
PSB_GREEN		= const(0x1000)
PSB_RED			= const(0x2000)
PSB_BLUE		= const(0x4000)
PSB_PINK		= const(0x8000)
PSB_TRIANGLE	= const(0x1000)
PSB_CIRCLE		= const(0x2000)
PSB_CROSS		= const(0x4000)
PSB_SQUARE		= const(0x8000)

PSS_RX			= const(0)				
PSS_RY			= const(1)
PSS_LX			= const(2)
PSS_LY			= const(3)

class PS2Controller:
	def __init__(self,clk_pin,do_pin,di_pin,cs_pin,mode=1,timeout=1000):  #mode: 0 red; 1 green
		self.di =Pin(di_pin,Pin.IN)
		self.do =Pin(do_pin,Pin.OUT)
		self.cs =Pin(cs_pin,Pin.OUT)
		self.clk=Pin(clk_pin,Pin.OUT)
	
		self.buttons=0
		self.last_buttons=0
		self.rods=(128,128,128,128)
		self.motor1=0
		self.motor2=0

		timestamp = time.ticks_ms()
		while not (self._cmds([0x01,0x42])[1] in [0x41,0x73,0x79,0xF3]):
			if time.ticks_diff(time.ticks_ms(), timestamp) > timeout:
				raise AttributeError("Cannot find a PS2Controller",self._cmds([0x01,0x42])[1])

		self._cmds([0x01,0x43,0x00,0x01,0x00])							# 进入配置模式
		time.sleep_ms(10)
		self._cmds([0x01,0x44,0x00,mode,0x03,0x00,0x00,0x00,0x00])		# “红绿灯”配置模式
		time.sleep_ms(10)
		self._cmds([0x01,0x4D,0x00,0x00,0x01])							# 开启震动模式
		time.sleep_ms(10)
		self._cmds([0x01,0x43,0x00,0x00,0x5A,0x5A,0x5A,0x5A,0x5A])		# 完成并保存配置
		time.sleep_ms(10)

	def _cmd(self,cmd):
		'''Single byte command sending and receiving'''
		ret = 0
		for i in range(8):
			if cmd & 1 << i:
				self.do.value(1)
			else:
				self.do.value(0)
			self.clk.value(0)
			time.sleep_us(10)
			if self.di.value():
				ret |= 1 << i
			self.clk.value(1)
		self.do.value(1)
		time.sleep_us(10)
		return ret

	def _cmds(self,cmds):
		'''Multi byte command sending and receiving'''
		self.cs.value(0)
		buffer=bytearray(9)
		for i, cmd  in enumerate(cmds):
			buffer[i]=self._cmd(cmd)
		self.cs.value(1)
		time.sleep_ms(10)
		return buffer

	def keydata(self):
		"""Read the value of the key"""
		_buffer=self._cmds([0X01, 0X42, 0X00, self.motor1, self.motor2, 0X00, 0X00, 0X00, 0X00])
		if _buffer[2]==0x5A:
			handkey=(_buffer[4]<<8)| _buffer[3]
			self.buttons=-handkey-1 & 0xffff
			self.rods=(_buffer[5],_buffer[6],_buffer[7],_buffer[8])
		return self.buttons,self.rods

	def vibration(self,motor1=0,motor2=0):
		"""Vibration settings"""
		self.motor1=motor1                                          #motor1：小电机，只有震和不振
		self.motor2=0 if motor2<1 else motor2*0xBF//100+0X40        #motor2：大电机，范围0x40-0xff，映射0-100
		self._cmds([0X01, 0X42, 0X00, self.motor1, self.motor2, 0X00, 0X00, 0X00, 0X00])

	def button(self,psb):
		return (self.keydata()[0] & psb) > 0

	def analog(self,pss):
		return self.keydata()[1][pss]
