"""
WS_Lora Weather Station

Micropython library for Weather Station /Lora
=======================================================

#Preliminary composition      					 20220408

dahanzimin From the Mixly Team
"""
from json import dumps
from rfm98 import RFM98
from ubinascii import hexlify
from machine import I2C,SoftI2C,unique_id

names =(("编号","电量","风速","阵风","风向","雨量","温度","湿度","光照","紫外线指数","气压","信号强度"),
		("ID","Battery","Wind Speed","Gust","Wind Direction","Rainfall","Temperature","Humidity","Illumination","UVI","Atmospheric","RSSI"))

class Weather(RFM98):
	def __init__(self,spi,cs_pin,i2c=None):
		'''对继承初始化配置'''
		super().__init__(spi,cs_pin,frequency_mhz=433.92,signal_bandwidth=125E3,coding_rate=5,spreading_factor=11)
		self._data=(None,None,None,None,None,None,None,None,None,None,None,None,None)
		self._atmos=None
		self._labels=[]

		if type(i2c) in [I2C,SoftI2C]:
			if 0x76 in i2c.scan():
				import hp203x
				self._atmos = hp203x.HP203X(i2c)

	def	_data_deal(self,buffer):
		'''对解码数据进行处理'''
		if self._crc8(buffer[0:14]) == buffer[14]:
			Device_ID  =  (buffer[1]  & 0x0f) <<4 | buffer[2] >>4
			State_BAT  =  (buffer[2]  & 0x08) >>3
			AVG_Swind  =  (buffer[3]  | (buffer[2]  & 0x01)<<8)/10
			Gust_Swind =  (buffer[4]  | (buffer[2]  & 0x02)<<7)/10	
			DIR_wind   =   buffer[5]  | (buffer[2]  & 0x04)<<6
			SUM_Rain   =  (buffer[7]  |  buffer[6]  <<8		)/10
			Temp_F     = ((buffer[9]  | (buffer[8]  & 0x0F)<<8)-400)/10
			Temp_C     = round((Temp_F-32)/1.8,2)
			Humidity   =  buffer[10]
			Light_Lux  = (buffer[12]  | buffer[11]  <<8 | (buffer[8] & 0x30)<<12)/10
			UVI        =  buffer[13]  / 10
			Pa         =  self._atmos.pressure() if self._atmos else None	
			#待添加数据值(Temp_F,Humidity,Light_Lux,UVI)报错处理
			return Device_ID,1-State_BAT,AVG_Swind,Gust_Swind,DIR_wind,SUM_Rain,Temp_C,Humidity,Light_Lux,UVI,Pa,super().packet_rssi(),super().packet_snr() 
		else:
			return False

	def _crc8(self,buffer):
		'''对数据进行CRC校验'''
		crc = 0x00
		for byte in buffer:
			crc ^= byte
			for _ in range(8):
				if crc & 0x80:
					crc = (crc << 1) ^ 0x31
				else:
					crc = crc << 1
		return crc & 0xff # return the bottom 8 bits		

	def	label(self,*args):
		'''标记气象站标签如 (id,long,lat)''' 
		for arg in args:
			if len(arg) == 3:
				flag=True
				for label in self._labels:
					if label['ws_id'] == arg[0]:
						label.update({'long':arg[1],'lat':arg[2]})
						flag=False
				if flag:
					self._labels.append({'ws_id':arg[0],'long':arg[1],'lat':arg[2]})
			else:
				raise AttributeError('Invalid Input , format is (id,long,lat)')
		return self._labels

	def	any(self):
		'''判读是否有数据'''	
		buffer=super().recv()
		if buffer:
			if (len(buffer)>=15) & (buffer[0] == 0xD4):
				self._data=self._data_deal(buffer)
				return True

	def	data(self,chinese=True):
		'''获取气象数据'''	
		_name=names[0] if chinese else names[1]
		info_dict={_name[0]:self._data[0],	
			_name[1]:"Normal" if self._data[1]==1 else "Low",			
			_name[2]:str(self._data[2])+'m/s',
			_name[3]:str(self._data[3])+'m/s',
			_name[4]:str(self._data[4])+'°',
			_name[5]:str(self._data[5])+'mm',
			_name[6]:str(self._data[6])+'℃',
			_name[7]:str(self._data[7])+'%',
			_name[8]:str(self._data[8])+'lux',
			_name[9]:self._data[9],
			_name[10]:str(self._data[10])+'hPa',
			_name[11]:str(self._data[11])+'dBm'}

		for label in self._labels:
			if label['ws_id'] == self._data[0]:
				msg_list=[]
				for info in info_dict:
					msg_list.append({"label":info,"value":info_dict[info]})
				label_dict={"message":msg_list,'clientid':hexlify(unique_id())}
				label_dict.update(label)
				return self._data,dumps(info_dict),dumps(label_dict)
		return self._data,dumps(info_dict),'null'
				
	def uart_mixio(self,topic="station"):
		'''打包气象数据串口转发'''
		info_dict={topic+"-"+str(self._data[0]):
			{"电量":"正常" if self._data[1]==1 else "亏电",			
			"风速":self._data[2],
			"阵风":self._data[3],
			"风向":self._data[4],
			"雨量":self._data[5],
			"温度":self._data[6],
			"湿度":self._data[7],
			"光照":self._data[8],
			"紫外线":self._data[9],
			"大气压":self._data[10],
			"信号强度":self._data[11]}}

		print(dumps(info_dict))
		return	info_dict