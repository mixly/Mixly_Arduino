"""
Baidu ASR API

MicroPython library for Baidu ASR API
=======================================================

#Preliminary composition	  	    20230223
#https://ai.baidu.com/ai-doc/SPEECH/Ek39uxgre
#https://ai.baidu.com/unit/home#/home

@dahanzimin From the Mixly Team
"""

import json,gc
import urequests,array
from ubinascii import hexlify
from machine import Timer,unique_id

'''Set constant'''
_framerate=8000
_unique_id=hexlify(unique_id()).decode()

def urequests_api(method, url, **kw):
	'''Request data'''
	try:
		return json.loads(urequests.request(method, url, **kw).text)
	except Exception as e:
		raise RuntimeError("API request failed or WiFi is not connected",e)
		
def fetch_token(API_Key,Secret_Key):
	"""Get access_token"""
	url='http://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={}&client_secret={}'.format(API_Key,Secret_Key)
	results=urequests_api("GET",url)
	if "error_description" in results.keys():
		raise ValueError(results["error_description"])
	if "access_token" in results.keys():
		return results["access_token"]

class Recorder:
	def __init__(self, adc,timer=2):
		self._timer=Timer(timer)
		self._mic=adc

	def _timer_callback(self,timer):
		'''Timer callback read microphone'''
		try:
			_mic=self._mic.read_u16()-32768
			self._pcm_buffer.append(_mic &0xFF)
			self._pcm_buffer.append(_mic >>8)
			self._record_time-=1
		except:
			print("Warning: MemoryError!")
			self._pcm_buffer=bytearray()
			gc.collect()
			self._record_time=0
	
	def record(self,record_time=1):
		"""Call timer to record audio"""
		self._pcm_buffer=bytearray()
		gc.collect()	
		self._record_time=record_time*_framerate
		self._timer.init(freq =_framerate, mode = Timer.PERIODIC, callback = self._timer_callback)
		while True:
			if self._record_time <= 0:
				self._timer.deinit()
				gc.collect()
				return	self._pcm_buffer

class ASR(Recorder):
	def __init__(self, adc, API_Key, Secret_Key, timer=2):
		self._token=fetch_token(API_Key,Secret_Key)
		super().__init__(adc,timer)
		
	def	recognize(self,record_time=1,dev_pid=1537):
		"""Access API to get voice results"""
		pcm_buffer=self.record(record_time)
		if max(pcm_buffer)>=250:
			url='http://vop.baidu.com/server_api?dev_pid={}&cuid={}&token={}'.format(dev_pid,_unique_id,self._token)
			headers = {'Content-Type': 'audio/pcm; rate={}'.format(_framerate)}
			results=urequests_api("POST",url,data=pcm_buffer,headers=headers)
			if results["err_no"] != 0:
				raise ValueError(results["err_msg"],results["err_no"])
			elif results["err_msg"] == "success.":
				gc.collect()
				return results["result"][0]
		else:
			return ''

class UNIT:
	def __init__(self, API_Key, Secret_Key):
		self._token=fetch_token(API_Key,Secret_Key)
		self._session_id=""
		
	def chatbot(self,chatbot_id,query):
		"""Access API to intelligent dialog"""
		if len(query) > 0:
			url='https://aip.baidubce.com/rpc/2.0/unit/service/v3/chat?access_token={}'.format(self._token)	
			data={"log_id":"log"+_unique_id,
				   "version":"3.0",
				   "service_id":chatbot_id,
				   "session_id":self._session_id,
				   "request":{"query":query,"terminal_id":_unique_id}}
			headers = {"content-type": "application/json"}
			results=urequests_api("POST",url,data=json.dumps(data).encode(),headers=headers)
			if results["error_code"] != 0:
				raise ValueError(results["error_msg"],results["error_code"])
			elif results["error_msg"] == "success":
				self._session_id=results["result"]['session_id']
				gc.collect()
				return results["result"]['responses'][0]['actions'][0]['say']
		else:
			return ''
	
gc.collect()
