"""
Bluetooth AT

Micropython library for the Bluetooth AT(WCH)
=======================================================

#Preliminary composition					20230106

dahanzimin From the Mixly Team
"""
from machine import Pin
from time import sleep_ms

class AT:
	def __init__(self, pin,times=5):
		self.at_pin = Pin(pin, Pin.OUT)
		self.at_pin.value(1)
		self._times = times
		self._flag = [0,0,0,0,0,0,0,0] #mac0,1 name2,3 power4,5 power6,7
		self._power = [0,1,2,3,-3,-8,-14,-20]
		sleep_ms(100)

	def _str_reverse(self,data):
		data=data.split(':')
		data.reverse()
		data=":".join(data)
		return data

	def ble_mac(self, mac=None):
		sleep_ms(200)
		if mac is None:
			if not (self._flag[0] >= self._times and self._times != 0):
				self._flag[0]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+MAC?\r\n')
				input()
				self.at_pin.value(1)
				print('BLE_MAC:',self._str_reverse(data))
				sleep_ms(100)
				return self._str_reverse(data)
			else:
				print('Please delete this command and upload other programs again')
		else:
			if not (self._flag[1] >= self._times and self._times != 0):
				self._flag[1]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+MAC={}\r\n'.format(self._str_reverse(mac)))
				print('\r\n')
				self.at_pin.value(1)
				print('BLE_MAC:',mac,data)
				sleep_ms(100)
				return True if data is "OK" else False
			else:
				print('Please delete this command and upload other programs again')

	def ble_name(self, name=None):
		sleep_ms(200)
		if name is None:
			if not (self._flag[2] >= self._times and self._times != 0):
				self._flag[2]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+NAME?\r\n')
				input()
				input()
				self.at_pin.value(1)
				print('BLE_NAME:',data)
				sleep_ms(100)
				return data
			else:
				print('Please delete this command and upload other programs again')
		else:
			if not (self._flag[3] >= self._times and self._times != 0):
				self._flag[3]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+NAME='+name+'\r\n')
				print('\r\n')
				self.at_pin.value(1)
				print('BLE_NAME:',name,data)
				sleep_ms(100)
				return True if data is "OK" else False
			else:
				print('Please delete this command and upload other programs again')

	def ble_power(self, power=None):
		sleep_ms(200)
		if power is None:
			if not (self._flag[4] >= self._times and self._times != 0):
				self._flag[4]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+TPL?\r\n')
				input()
				print('									\r\n')
				self.at_pin.value(1)
				data=self._power[int(data[4:])]
				print('BLE_Power: {}DB'.format(data))
				sleep_ms(100)
				return data
			else:
				print('Please delete this command and upload other programs again')
		else:
			if not (self._flag[5] >= self._times and self._times != 0):
				self._flag[5]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+TPL={}\r\n'.format(self._power.index(power)))
				print('\r\n')
				self.at_pin.value(1)
				print('BLE_Power:',str(power)+'DB',data)
				sleep_ms(100)
				return True if data is "OK" else False
			else:
				print('Please delete this command and upload other programs again')

	def ble_pname(self, name=None):
		sleep_ms(200)
		if name is None:
			if not (self._flag[6] >= self._times and self._times != 0):
				self._flag[6]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+PNAME?\r\n')
				input()
				input()
				self.at_pin.value(1)
				print('BLE_PNAME:',data)
				sleep_ms(100)
				return data
			else:
				print('Please delete this command and upload other programs again')
		else:
			if not (self._flag[7] >= self._times and self._times != 0):
				self._flag[7]+=1
				self.at_pin.value(0)
				sleep_ms(10)
				data=input('AT+PNAME='+name+'\r\n')
				print('\r\n')
				self.at_pin.value(1)
				print('BLE_PNAME:',name,data)
				sleep_ms(100)
				return True if data is "OK" else False
			else:
				print('Please delete this command and upload other programs again')
