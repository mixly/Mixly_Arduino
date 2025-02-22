"""
HuskyLens

MicroPython library for the HuskyLens-I2C(DF)
=======================================================

#Preliminary composition       								20220224
#base on https://github.com/HuskyLens/HUSKYLENSPython		20220623

dahanzimin From the Mixly Team
"""

import time
from ubinascii import unhexlify,hexlify

commandHeaderAndAddress = "55AA11"
algorthimsByteID = {
	"ALGORITHM_OBJECT_TRACKING": "0100",			#物体追踪
	"ALGORITHM_FACE_RECOGNITION": "0000",			#人脸识别
	"ALGORITHM_OBJECT_RECOGNITION": "0200",			#物体识别
	"ALGORITHM_LINE_TRACKING": "0300",				#巡线
	"ALGORITHM_COLOR_RECOGNITION": "0400",			#颜色识别
	"ALGORITHM_TAG_RECOGNITION": "0500",			#标签识别
	"ALGORITHM_OBJECT_CLASSIFICATION": "0600",		#物体分类
	"ALGORITHM_QR_CODE_RECOGNTITION" : "0700",		#二维码识别（教育版独有）
	"ALGORITHM_BARCODE_RECOGNTITION":"0800",		#条形码识别（教育版独有）
}

class Arrow:
	def __init__(self, xTail, yTail , xHead , yHead, ID):
		self.xTarget=xTail
		self.yTarget=yTail
		self.xOrigin=xHead
		self.yOrigin=yHead
		self.id=ID
		self.learned= True if ID > 0 else False
		self.type="arrows"

class Block:
	def __init__(self, x, y , width , height, ID):
		self.xCenter = x
		self.yCenter=y
		self.width=width
		self.height=height
		self.id=ID
		self.learned= True if ID > 0 else False
		self.type="blocks"

class HuskyLens:
	def __init__(self, i2c,address=0x32):
		self._address = address
		self.checkOnceAgain=True
		self._device = i2c
		self._buffer=[]
		self._learned_number=0
		if not self.knock():
			raise AttributeError("Cannot find a HuskyLens")

	def _write_cmd(self, cmd):
		'''Write memory address'''
		self._device.writeto(self._address, unhexlify(cmd))

	def _read_cmd(self, nbytes):
		'''Read memory address'''
		return self._device.readfrom(self._address, nbytes)

	def _checksum(self, hexStr):
		'''data checksums'''
		total = 0
		for i in range(0, len(hexStr), 2):
			total += int(hexStr[i:i+2], 16)
		hexStr = hex(total)[-2:]
		return hexStr

	def _read_data(self):
		'''Read data'''
		while True:
			time.sleep(0.01)
			buffer = self._read_cmd(5)
			if buffer[0] == 0x55:
				break
		buffer += self._read_cmd(int(buffer[3])+1)
		strs=hexlify(buffer).decode()

		headers = strs[0:4]
		address = strs[4:6]
		data_length = int(strs[6:8], 16)
		command = strs[8:10]
		if(data_length > 0):
			data = strs[10:10+data_length*2]
		else:
			data = ''
		checkSum = strs[2*(6+data_length-1):2*(6+data_length-1)+2]
		return [headers, address, data_length, command, data, checkSum]

	def getBlockOrArrowCommand(self):
		commandSplit = self._read_data()
		isBlock = True if commandSplit[3] == "2a" else False
		return (commandSplit[4],isBlock)

	def processReturnData(self):
		inProduction = True
		byteString=""
		if inProduction :
			commandSplit = self._read_data()

			if commandSplit[3] == "2e":
				return "Knock Recieved"
			else:
				returnData = []
				numberOfBlocksOrArrow = int(commandSplit[4][2:4]+commandSplit[4][0:2], 16)
				self._learned_number = int(commandSplit[4][6:8]+commandSplit[4][4:6], 16)

				for i in range(numberOfBlocksOrArrow):
					tmpObj=self.getBlockOrArrowCommand()
					isBlock=tmpObj[1]
					returnData.append(tmpObj[0])

				if returnData :
					finalData = []
					tmp = []
					for i in returnData:
						tmp = []
						for q in range(0, len(i), 4):
							low=int(i[q:q+2], 16)
							high=int(i[q+2:q+4], 16)
							if(high>0):
								val=low+255+high
							else:
								val=low
							tmp.append(val)
						finalData.append(tmp)
						tmp = []
					self.checkOnceAgain=True
					self._buffer=self.convert_to_class_object(finalData,isBlock)
					return "Data processing completed" 
				else:
					self._buffer=[]

	def convert_to_class_object(self,data,isBlock):
		tmp=[]
		for i in data:
			if(isBlock):
				obj = Block(i[0],i[1],i[2],i[3],i[4])
			else:
				obj = Arrow(i[0],i[1],i[2],i[3],i[4])
			tmp.append(obj)
		return tmp

	def knock(self):
		'''Send a simple knock to the HuskyLens to ensure that you are connected and can communicate.'''
		self._write_cmd(commandHeaderAndAddress+"002c3c")
		return self._read_data()[3] == "2e"

	def command_request_algorthim(self, alg):
		'''切换xx算法'''
		if alg in algorthimsByteID:
			cmd = commandHeaderAndAddress+"022d"+algorthimsByteID[alg]
			cmd += self._checksum(cmd)
			self._write_cmd(cmd)
			return self.processReturnData()
		else:
			print("INCORRECT ALGORITHIM NAME")

	def command_request(self):
		'''请求一次数据 存入结果'''
		self._write_cmd(commandHeaderAndAddress+"002030")
		self.processReturnData()

	def read_learned_id_count(self):
		'''从结果中获取 已学习ID总数'''
		return self._learned_number
	
	def is_appear_direct(self,shape):
		'''从结果中获取 方块或箭头 是否在画面中'''
		if len(self._buffer) > 0:
			return self._buffer[0].type == shape


	def read_block_center_parameter_direct(self,shape):
		'''从结果中获取靠近中心 方块或箭头 的信息'''
		if len(self._buffer) > 0:
			if self._buffer[0].type == shape :
				return self._buffer[0]
			else :
				return False

	def is_learned(self,get_id):
		'''从结果中获取获取IDx是否已学习'''
		if 0 <  get_id < self._learned_number:
			return True
		else:
			return False

	def is_appear(self,get_id,shape):
		'''从结果中获取获取IDx 方块或箭头 是否在画面中'''
		if len(self._buffer) > 0:
			for i in self._buffer :
				if i.id == get_id :
					return i.type == shape

	def read_blocks_arrows_parameter(self,get_id,number,shape):
		'''从结果中获取获取IDx 第number个方块或箭头 的信息'''
		if len(self._buffer) > 0:
			id_list=[]
			for i in self._buffer :
				if i.id == get_id and i.type == shape:
					id_list.append(i)
			if 	number is None:
				return id_list[0]
			else:
				return id_list[number-1]

	def read_count(self,get_id,shape):
		'''从结果中获取获取IDx 方块或箭头 的总数'''
		num=0
		if len(self._buffer) > 0:
			for i in self._buffer :
				if get_id is None and i.type == shape:
					num+=1
				if i.id == get_id and i.type == shape:
					num+=1
			return num

	def read_blocks_arrows_parameter_direct(self,number,shape):
		'''从结果中获取获取第x个 方块或箭头 的信息'''
		if len(self._buffer) >= number :
			print(len(self._buffer))
			if self._buffer[number-1].type == shape :
				return self._buffer[number-1]

	def command_request_learn_once(self,get_id):
		'''自动学习一次 IDx'''
		data = "{:04x}".format(get_id)
		part1=data[2:]
		part2=data[0:2]
		#reverse to correct endiness
		data=part1+part2
		dataLen = "{:02x}".format(len(data)//2)
		cmd = commandHeaderAndAddress+dataLen+"36"+data
		print("-----",cmd)
		cmd += self._checksum(cmd)
		self._write_cmd(cmd)

	def command_request_forget(self):
		'''遗忘当前算法的所有学习数据'''
		self._write_cmd(commandHeaderAndAddress+"003747")

	def command_request_customnames(self,name,get_id):
		'''设置当前算法 IDx 名字为 name'''
		nameDataSize = "{:02x}".format(len(name)+1)
		name = hexlify(name).decode()+"00"
		localId = "{:02x}".format(get_id)
		data = localId+nameDataSize+name
		dataLen = "{:02x}".format(len(data)//2)
		cmd = commandHeaderAndAddress+dataLen+"2f"+data
		cmd += self._checksum(cmd)
		self._write_cmd(cmd)

	def command_request_custom_text(self,name,x,y):
		'''屏幕叠加显示文字name 在 xy'''
		name=hexlify(name).decode()
		nameDataSize = "{:02x}".format(len(name)//2)
		if x>255:
			x="ff"+"{:02x}".format(x%255)
		else:
			x="00"+"{:02x}".format(x)
		y="{:02x}".format(y)
		data = nameDataSize+x+y+name
		dataLen = "{:02x}".format(len(data)//2)
		cmd = commandHeaderAndAddress+dataLen+"34"+data
		cmd += self._checksum(cmd)
		self._write_cmd(cmd)
	
	def command_request_clear_text(self):
		'''清除屏幕显示的文字'''
		self._write_cmd(commandHeaderAndAddress+"003545")

	def command_request_photo(self):
		'''触发拍照保存到SD卡'''
		self._write_cmd(commandHeaderAndAddress+"003040")
		time.sleep(0.5)
	
	def command_request_screenshot(self):
		'''触发截屏保存到SD卡'''
		self._write_cmd(commandHeaderAndAddress+"003949")
		time.sleep(0.5)

	def command_request_save_model_to_SD_card(self,idVal):
		'''保存当前算法数据位SD卡 (0~4) 号模型'''
		idVal = "{:04x}".format(idVal)
		idVal = idVal[2:]+idVal[0:2]
		cmd = commandHeaderAndAddress+"0232"+idVal
		cmd += self._checksum(cmd)
		self._write_cmd(cmd)
		time.sleep(0.5)

	def command_request_load_model_from_SD_card(self,idVal):
		'''加载当前算法数据位SD卡 (0~4) 号模型'''
		idVal = "{:04x}".format(idVal)
		idVal = idVal[2:]+idVal[0:2]
		cmd = commandHeaderAndAddress+"0233"+idVal
		cmd += self._checksum(cmd)
		self._write_cmd(cmd)
		time.sleep(0.5)
