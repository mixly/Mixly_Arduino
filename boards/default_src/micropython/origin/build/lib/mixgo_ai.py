"""
AI COM 

MicroPython library for the AI COM ( for MixGo AI)
=======================================================

#Preliminary composition                       20220905

dahanzimin From the Mixly Team
"""

import time,gc


class INFO:
	def __init__(self, info1,info2,rect):
		self.info1=info1
		self.info2=info2
		self.rect=rect
		self.x=None
		self.y=None
		self.w=None
		self.h=None
		self.xc=None
		self.yc=None
		if type(rect) in [tuple,list]:
			self.x=rect[0]
			self.y=rect[1]
			self.w=rect[2]
			self.h=rect[3]
			self.xc=rect[0]+rect[2]//2
			self.yc=rect[1]+rect[3]//2
		self.type="info"

class AI:
	def __init__(self, uart, quick=False):
		self._uart=uart
		self._uart.init(baudrate=115200, timeout=500)
		self._info=[] 
		self._sdata=[]
		self._removal=quick
		if not self._chip_id():
			raise AttributeError("Cannot find a MixGo AI")

	def send(self,data):
		eec=0
		buffer=str(data).encode()
		for i in range(len(buffer)):
			eec^=int(buffer[i])
		eec=0 if eec==10 else eec 
		self._uart.write(buffer+chr(eec)+b'\n')

	def recv(self,timeout=500,warn=True):
		t_star=time.ticks_ms()
		while not self._uart.any():
			if time.ticks_diff(time.ticks_ms(), t_star) >timeout:
				if warn:
					print("Warning: MixGo AI timeout not responding")
				return False  
		buffer = self._uart.readline()
		if buffer:
			eec=0
			if len(buffer)>=3: 
				for i in range(len(buffer)-2):
					eec^=int(buffer[i])
				if eec==buffer[-2] or buffer[-2]==0:
					try:
						return eval(buffer[:-2].decode())
					except:
						return None                
	def _chip_id(self):
		for _ in range(10): 
			self.send(["ok",[[],'']])
			if self.recv(1000,False):
				return True

	def request(self,func='', para=[], name=None, timeout=1000):
		if self._sdata != para:
			self._sdata=para if self._removal else None
			self.send([func,[para,name]])
		else:
			self.send([func,[[],name]])

		#print(func)
		if func in ['ailr','ailt','play','record','asr']:	#不需要警告提醒
			data=self.recv(timeout,False)
		else:
			data=self.recv(timeout,True)

		self._info=[] 
		if data:
			#报错处理
			if "err" in data[0] and type(data[1])==list:
				if type(data[1][0]) == IndexError or  "Missing parameter" == data[1][0]:
					self.send(["ok",[[],name]])	#恢复出厂
					self.send([func,[para,name]])	#在发送参数
				else:
					raise RuntimeError("Error from MixGo AI",data[1][0])
			else:
				_len=max(len(data[0]),len(data[1]))
				for i in range(_len):
					if type(data[0][i]) == list:
						info1=data[0][i][0]
						info2=data[0][i][1]
					else:
						info1=data[0][i]
						info2=None

					if data[1]:
						rect=data[1][i]
					else:
						rect=None
					self._info.append(INFO(info1,info2,rect))
		return self._info

	def info_len(self):
		return len(self._info)

	def info_number(self,number):
		if self.info_len() > number:
			return self._info[number]

	def configure(self, tx_pin, rx_pin, restart=False):
		info=self.request('start',para=[["uart",tx_pin,rx_pin],restart])
		return info[0].info1 if info else False

	def find_qrcode(self):
		info=self.request('qr')
		return (info[0].info1,info[0].rect) if info else (None,None)

	def find_barcode(self):
		info=self.request('bar')
		return (info[0].info1,info[0].rect) if info else (None,None)

	def find_apriltag(self):
		info=self.request('tag')
		return (info[0].info1,info[0].rect) if info else (None,None)

	def find_qrcodes(self):
		return self.request('qr')

	def find_barcodes(self):
		return self.request('bar')

	def find_apriltags(self):
		return self.request('tag')

	def find_lines(self, threshold=2500, theta_margin=25, rho_margin=25):
		return self.request('line', para=[threshold, theta_margin, rho_margin])

	def find_circles(self, threshold=2500, r_min=2, r_max=100):
		return self.request('circle', para=[threshold, r_min, r_max])

	def find_rects(self, threshold=2500):
		return self.request('rect', para=[threshold])

	def find_colors(self, scale=2):
		info=self.request('color', para=[scale])
		if info:
			return info[0].info1,info[0].info2
		else:
			return None,None

	def color_track(self, lab=[0, 100, 0, 100, 0, 0], pixels_threshold=10, margin=1):
		return self.request('ctrace', para=[lab, pixels_threshold, margin])

	def ailocal_train(self, lsit_names, path="mixgo", number=5, disname='自模型训练'):
		info= self.request('ailt', para=[lsit_names, path, number], name=disname)
		return info[0].info1 if info else False

	def ailocal_class(self, lsit_names, path="mixgo", disname='自模型识别'):
		return self.request('ailr', para=[lsit_names, path], name=disname)

	def yolo_recognize(self, anchor, path, disname='物品识别'):
		return self.request('aild', para=[anchor, path], name=disname)

	def led_rgb(self, rgb1=(0,0,0), rgb2=(0,0,0)):
		info= self.request('rgb', para=[rgb1, rgb2])
		return info[0].info1 if info else False

	def audio_play(self, bck_pin=12, ws_pin=13, dat_pin=14, path="mixgo.wav", volume=80):
		info= self.request('play', para=[[bck_pin, ws_pin, dat_pin], path, volume])
		return info[0].info1 if info else False

	def audio_record(self, sample_rate=16000, path="mixgo.wav", times=5):
		info= self.request('record', para=[sample_rate, path, times])
		return info[0].info1 if info else False

	def asr_recognize(self, corpus,threshold=0.1):
		clist=[]
		for cor in corpus:
			clist.append([cor,threshold])
		info=self.request('asr', para=[dict(clist)])
		if info:
			return info[0].info1,info[0].info2
		else:
			return None,None

	def find_licenseplate(self):
		return self.request('alpr')

	def find_20object(self):
		return self.request('voc20')

	def face_detect(self):
		return self.request('face_d')
