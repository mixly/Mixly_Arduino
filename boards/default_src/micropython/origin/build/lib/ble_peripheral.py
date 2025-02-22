"""
Bluetooth-Peripheral

Micropython  library for the Bluetooth-Peripheral
=======================================================
#Preliminary composition	       				20221018
#https://github.com/micropython/micropython/tree/master/examples/bluetooth

dahanzimin From the Mixly Team 
"""

import bluetooth
from micropython import const
from ubinascii import hexlify
from ble_advertising import advertising_payload

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)

_FLAG_READ = const(0x0002)
_FLAG_WRITE_NO_RESPONSE = const(0x0004)
_FLAG_WRITE = const(0x0008)
_FLAG_NOTIFY = const(0x0010)

_UART_UUID = bluetooth.UUID(0x1101)
_UART_TX = (bluetooth.UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E"),_FLAG_READ | _FLAG_NOTIFY,)
_UART_RX = (bluetooth.UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E"),_FLAG_WRITE | _FLAG_WRITE_NO_RESPONSE,)
_UART_SERVICE = (_UART_UUID,(_UART_TX, _UART_RX),)

class BLESimplePeripheral:
	def __init__(self, name=None):
		self._ble = bluetooth.BLE()
		self._ble.active(True)
		self._ble.irq(self._irq)
		((self._handle_tx, self._handle_rx),) = self._ble.gatts_register_services((_UART_SERVICE,))
		self._connections = set()
		self._write_callback = None
		self._write_data = None
		if (name is '') or (name is None):
			name = "Mixgo_" + self.mac[-6:].upper()
			print("Bluetooth name:", name)
		self._payload = advertising_payload(name=name, services=[_UART_UUID])
		self._advertise()

	def _irq(self, event, data):
		# Track connections so we can send notifications.
		if event == _IRQ_CENTRAL_CONNECT:
			conn_handle, _, _ = data
			print("New connection", conn_handle)
			self._connections.add(conn_handle)
		elif event == _IRQ_CENTRAL_DISCONNECT:
			conn_handle, _, _ = data
			print("Disconnected", conn_handle)
			self._connections.remove(conn_handle)
			# Start advertising again to allow a new connection.
			self._advertise()
		elif event == _IRQ_GATTS_WRITE:
			conn_handle, value_handle = data
			value = self._ble.gatts_read(value_handle)
			if value_handle == self._handle_rx:
				try:
					self._write_data=value.decode().strip()
				except:
					self._write_data=value
				if self._write_callback:
						self._write_callback(self._write_data)

	def send(self, data):
		for conn_handle in self._connections:
			self._ble.gatts_notify(conn_handle, self._handle_tx, data)

	def is_connected(self):
		return len(self._connections) > 0

	def _advertise(self, interval_us=500000):
		print("Starting advertising")
		self._ble.gap_advertise(interval_us, adv_data=self._payload)

	def recv(self, callback= None):
		if callback:
			self._write_callback = callback
		else:
			write_data=self._write_data
			self._write_data=None
			return write_data

	@property 
	def mac(self):
		'''Get mac address'''
		return hexlify(self._ble.config('mac')[1]).decode()
