"""
Bluetooth-uart-Peripheral

Micropython  library for the Bluetooth-uart-Peripheral
=======================================================
#Preliminary composition	       202200628
#https://github.com/micropython/micropython/tree/master/examples/bluetooth

dahanzimin From the Mixly Team 
"""

import bluetooth
from ble_advertising import advertising_payload
from micropython import const

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)

_FLAG_READ = const(0x0002)
_FLAG_WRITE_NO_RESPONSE = const(0x0004)
_FLAG_WRITE = const(0x0008)
_FLAG_NOTIFY = const(0x0010)

_UART_UUID = bluetooth.UUID("0000fff0-0000-1000-8000-00805f9b34fb")
_UART_TX = (bluetooth.UUID("0000fff1-0000-1000-8000-00805f9b34fb"),_FLAG_READ | _FLAG_NOTIFY,)
_UART_RX = (bluetooth.UUID("0000fff2-0000-1000-8000-00805f9b34fb"),_FLAG_WRITE | _FLAG_WRITE_NO_RESPONSE,)
_UART_SERVICE = (_UART_UUID,(_UART_TX, _UART_RX),)

class BLEUART:
	def __init__(self, name="mpy-uart", rxbuf=100):
		self._ble = bluetooth.BLE()
		self._ble.active(True)
		self._ble.irq(self._irq)
		((self._tx_handle, self._rx_handle),) = self._ble.gatts_register_services((_UART_SERVICE,))
		self._ble.gatts_set_buffer(self._rx_handle, rxbuf, True)
		self._connections = set()
		self._rx_buffer = bytearray()
		self._handler = None
		self._payload = advertising_payload(name=name, services=[_UART_UUID])
		self._advertise()

	def irq(self, handler):
		self._handler = handler

	def _irq(self, event, data):
		# Track connections so we can send notifications.
		if event == _IRQ_CENTRAL_CONNECT:
			conn_handle, _, _ = data
			print("Bluetooth connected")
			self._connections.add(conn_handle)
		elif event == _IRQ_CENTRAL_DISCONNECT:
			conn_handle, _, _ = data
			print("Bluetooth disconnected")
			if conn_handle in self._connections:
				self._connections.remove(conn_handle)
			# Start advertising again to allow a new connection.
			self._advertise()
		elif event == _IRQ_GATTS_WRITE:
			conn_handle, value_handle = data
			if conn_handle in self._connections and value_handle == self._rx_handle:
				self._rx_buffer += self._ble.gatts_read(self._rx_handle)
				if self._handler:
					self._handler()

	def any(self):
		return len(self._rx_buffer)

	def read(self, sz=None):
		if not sz:
			sz = len(self._rx_buffer)
		result = self._rx_buffer[0:sz]
		self._rx_buffer = self._rx_buffer[sz:]
		return result

	def write(self, data):
		for conn_handle in self._connections:
			self._ble.gatts_notify(conn_handle, self._tx_handle, data)

	def close(self):
		for conn_handle in self._connections:
			self._ble.gap_disconnect(conn_handle)
		self._connections.clear()

	def _advertise(self, interval_us=500000):
		self._ble.gap_advertise(interval_us, adv_data=self._payload)
