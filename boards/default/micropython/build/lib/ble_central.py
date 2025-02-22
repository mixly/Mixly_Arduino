"""
Bluetooth-Central

Micropython  library for the Bluetooth-Central
=======================================================
#Preliminary composition	       20221018
#https://github.com/micropython/micropython/tree/master/examples/bluetooth

dahanzimin From the Mixly Team 
"""
import time,gc
import bluetooth
from micropython import const
from ubinascii import hexlify,unhexlify
from ble_advertising import decode_services, decode_name

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)
_IRQ_GATTS_READ_REQUEST = const(4)
_IRQ_SCAN_RESULT = const(5)
_IRQ_SCAN_DONE = const(6)
_IRQ_PERIPHERAL_CONNECT = const(7)
_IRQ_PERIPHERAL_DISCONNECT = const(8)
_IRQ_GATTC_SERVICE_RESULT = const(9)
_IRQ_GATTC_SERVICE_DONE = const(10)
_IRQ_GATTC_CHARACTERISTIC_RESULT = const(11)
_IRQ_GATTC_CHARACTERISTIC_DONE = const(12)
_IRQ_GATTC_DESCRIPTOR_RESULT = const(13)
_IRQ_GATTC_DESCRIPTOR_DONE = const(14)
_IRQ_GATTC_READ_RESULT = const(15)
_IRQ_GATTC_READ_DONE = const(16)
_IRQ_GATTC_WRITE_DONE = const(17)
_IRQ_GATTC_NOTIFY = const(18)
_IRQ_GATTC_INDICATE = const(19)

_ADV_IND = const(0x00)
_ADV_DIRECT_IND = const(0x01)
_ADV_SCAN_IND = const(0x02)
_ADV_NONCONN_IND = const(0x03)

_UART_SERVICE_UUID = bluetooth.UUID(0x1101)
_UART_RX_CHAR_UUID = bluetooth.UUID("6E400002-B5A3-F393-E0A9-E50E24DCCA9E")
_UART_TX_CHAR_UUID = bluetooth.UUID("6E400003-B5A3-F393-E0A9-E50E24DCCA9E")


class BLESimpleCentral:
	def __init__(self):
		self._ble = bluetooth.BLE()
		self._scan_flg = True
		self._ble.active(True)
		self._ble.irq(self._irq)
		self._reset()
		self.scan()

	def _reset(self):
		# Cached name and address from a successful scan.
		self._name = None
		self._addr_type = None
		self._addr = None

		# Callbacks for completion of various operations.
		# These reset back to None after being invoked.
		self._conn_callback = None
		self._read_callback = None

		# Persistent callback for when new data is notified from the device.
		self._notify_callback = None
		self._write_data=None

		# Connected device.
		self._conn_handle = None
		self._start_handle = None
		self._end_handle = None
		self._tx_handle = None
		self._rx_handle = None

	def _irq(self, event, data):
		if event == _IRQ_SCAN_RESULT:
			addr_type, addr, adv_type, rssi, adv_data = data
			
			if adv_type in (_ADV_IND, _ADV_DIRECT_IND) and _UART_SERVICE_UUID in decode_services(adv_data): 
				# Found a potential device, remember it and stop scanning.
				self._addr_type = addr_type
				self._addr = bytes(addr)  # Note: addr buffer is owned by caller so need to copy it.
				self._name = decode_name(adv_data) or "?"
				if self._addr in self._info[2]:
					self._ble.gap_scan(None)
				else:
					self._info[0].append(self._name)
					self._info[1].append(self._addr_type)
					self._info[2].append(self._addr)
					self._info[3].append(rssi)
		
		elif event == _IRQ_SCAN_DONE:
			self._scan_flg = False

		elif event == _IRQ_PERIPHERAL_CONNECT:
			# Connect successful.
			conn_handle, addr_type, addr = data
			if addr_type == self._addr_type and addr == self._addr:
				self._conn_handle = conn_handle
				self._ble.gattc_discover_services(self._conn_handle)

		elif event == _IRQ_PERIPHERAL_DISCONNECT:
			# Disconnect (either initiated by us or the remote end).
			conn_handle, _, _ = data
			if conn_handle == self._conn_handle:
				# If it was initiated by us, it'll already be reset.
				self._reset()

		elif event == _IRQ_GATTC_SERVICE_RESULT:
			# Connected device returned a service.
			conn_handle, start_handle, end_handle, uuid = data
			print("service", data)
			if conn_handle == self._conn_handle and uuid == _UART_SERVICE_UUID:
				self._start_handle, self._end_handle = start_handle, end_handle

		elif event == _IRQ_GATTC_SERVICE_DONE:
			# Service query complete.
			if self._start_handle and self._end_handle:
				self._ble.gattc_discover_characteristics(
					self._conn_handle, self._start_handle, self._end_handle
				)
			else:
				print("Failed to find uart service.")

		elif event == _IRQ_GATTC_CHARACTERISTIC_RESULT:
			# Connected device returned a characteristic.
			conn_handle, def_handle, value_handle, properties, uuid = data
			if conn_handle == self._conn_handle and uuid == _UART_RX_CHAR_UUID:
				self._rx_handle = value_handle
			if conn_handle == self._conn_handle and uuid == _UART_TX_CHAR_UUID:
				self._tx_handle = value_handle

		elif event == _IRQ_GATTC_CHARACTERISTIC_DONE:
			# Characteristic query complete.
			if self._tx_handle is not None and self._rx_handle is not None:
				# We've finished connecting and discovering device, fire the connect callback.
				if self._conn_callback:
					self._conn_callback()
			else:
				print("Failed to find uart rx characteristic.")

		elif event == _IRQ_GATTC_WRITE_DONE:
			conn_handle, value_handle, status = data
			print("TX complete")

		elif event == _IRQ_GATTC_NOTIFY:
			conn_handle, value_handle, notify_data = data
			if conn_handle == self._conn_handle and value_handle == self._tx_handle:
				try:
					self._write_data=bytes(notify_data).decode().strip()
				except:
					self._write_data=bytes(notify_data)				
				if self._notify_callback:
					self._notify_callback(self._write_data)

	# Returns true if we've successfully connected and discovered characteristics.
	def is_connected(self):
		return (self._conn_handle is not None and self._tx_handle is not None and self._rx_handle is not None)

	# Find a device advertising the environmental sensor service.
	def scan(self):
		self._info = [[],[],[],[]]
		self._ble.gap_scan(10000, 30000, 30000)
		while self._scan_flg:
			time.sleep_ms(10)
		self._scan_flg = True
		info=[]
		for i in range(len(self._info[0])):
			info.append([self._info[0][i],self._info[1][i],hexlify(self._info[2][i]).decode(),self._info[3][i]])
		return info

	# Connect to the specified device (otherwise use cached address from a scan).
	def connect(self, name=None,mac=None, callback=None):
		if mac and unhexlify(mac) in self._info[2]:
			index=self._info[2].index(unhexlify(mac))
			self._addr_type=self._info[1][index]
			self._addr=unhexlify(mac)
		elif name and name in self._info[0]:
			index=self._info[0].index(name)
			self._addr_type=self._info[1][index]
			self._addr=self._info[2][index]
		else:
			raise ValueError("The '{}' Bluetooth was not found, Please check device is working".format(mac if name is None else name))
		self._conn_callback = callback
		self._ble.gap_connect(self._addr_type, self._addr)
		return True

	# Disconnect from current device.
	def disconnect(self):
		if not self._conn_handle:
			return
		self._ble.gap_disconnect(self._conn_handle)
		self._reset()
		gc.collect()

	# Send data over the UART
	def send(self, v, response=False):
		if not self.is_connected():
			return
		self._ble.gattc_write(self._conn_handle, self._rx_handle, v, 1 if response else 0)

	# Set handler for when data is received over the UART.
	def recv(self, callback= None):
		if callback:
			self._notify_callback = callback
		else:
			write_data=self._write_data
			self._write_data=None
			return write_data		

	@property 
	def mac(self):
		'''Get mac address'''
		return hexlify(self._ble.config('mac')[1]).decode()
