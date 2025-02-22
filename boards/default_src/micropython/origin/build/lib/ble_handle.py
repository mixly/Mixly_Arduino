"""
Bluetooth remote control handle

Micropython library for the Bluetooth remote control handle
=======================================================
#Preliminary composition	       202200704

dahanzimin From the Mixly Team 
"""

from ble_peripheral import BLESimplePeripheral

class Handle(BLESimplePeripheral):
	def __init__(self):
		super().__init__(name="TUDAO_MASTER")
		self._buffer=bytearray(14)

	def _receive_cb(self, data):
			if self._on_receive:
				if data !=self._buffer:
					self._buffer=data
					key=self._deal(self._buffer)
					self._on_receive(key[0],key[1],key[2],key[3])	
	
	def recv(self,callback):
		self._on_receive = callback
		if callback:
			super().recv(self._receive_cb)

	def _u2s(self,n):
		return n if n < (1 << 7) else n - (1 << 8)	

	def _deal(self,data):
		if data[0]== 0xff and data[1]== 0xfe and data[12]== 0xfd and data[13]== 0xfc:
			return self._u2s(data[5]),self._u2s(data[6]),self._u2s(data[7]),self._u2s(data[8])
		else:
			return None,None,None,None