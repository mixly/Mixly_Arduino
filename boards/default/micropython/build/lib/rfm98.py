"""
RFM98

Micropython library for the RFM98 LoRa
=======================================================
#Preliminary composition       		20220406
#Rebuild and optimize execution    	20220412
#Repair receive mode		    	20220428

dahanzimin From the Mixly Team
"""
import gc
import time
from machine import Pin
from micropython import const

_REG_FIFO 					= const(0x00)
_REG_OP_MODE 				= const(0x01)
_REG_FRF_MSB 				= const(0x06)
_REG_FRF_MID 				= const(0x07)
_REG_FRF_LSB 				= const(0x08)
_REG_PA_CONFIG 				= const(0x09)
_REG_LNA 					= const(0x0C)
_REG_FIFO_ADDR_PTR 			= const(0x0D)
_REG_FIFO_TX_BASE_ADDR 		= const(0x0E)
_REG_FIFO_RX_BASE_ADDR 		= const(0x0F)
_REG_FIFO_RX_CURRENT_ADDR 	= const(0x10)
_REG_IRQ_FLAGS 				= const(0x12)
_REG_RX_NB_BYTES 			= const(0x13)
_REG_PKT_SNR_VALUE 			= const(0x19)
_REG_PKT_RSSI_VALUE 		= const(0x1A)
_REG_MODEM_CONFIG1 			= const(0x1D)
_REG_MODEM_CONFIG2 			= const(0x1E)
_REG_PREAMBLE_MSB 			= const(0x20)
_REG_PREAMBLE_LSB 			= const(0x21)
_REG_PAYLOAD_LENGTH 		= const(0x22)
_REG_MODEM_CONFIG3 			= const(0x26)
_REG_DIO_MAPPING1 			= const(0x40)
_REG_DIO_MAPPING2 			= const(0x41)
_REG_VERSION 				= const(0x42)
_REG_PA_DAC 				= const(0x4D)
_DETECTION_OPTIMIZE 		= const(0x31)
_DETECTION_THRESHOLD 		= const(0x37)

_MODE_LONG_RANGE_MODE 		= const(0x88)  
_MODE_SLEEP 				= const(0x00)
_MODE_STDBY 				= const(0x01)
_MODE_TX 					= const(0x03)
_MODE_RX 					= const(0x05)

class RFM98:
	def __init__(self,spi,cs_pin,frequency_mhz=433.0,signal_bandwidth=125E3,coding_rate=5,spreading_factor=7,**kw):					
		self._spi = spi
		self._pin_ss = Pin(cs_pin, Pin.OUT)
		self._frequency_mhz=frequency_mhz
		self._signal_bandwidth=signal_bandwidth
		self._coding_rate=coding_rate
		self._spreading_factor=spreading_factor
		self._kw=kw
		self.init()

	def init(self):
		for i in range(6):
			if self._read_u8(_REG_VERSION) == 18:				# No device type check!
				break
			if i >=5:
				raise AttributeError("Cannot find a RFM9x")
			time.sleep(1)	
		
		self.sleep()
		time.sleep(0.01)
		if self._read_u8(_REG_OP_MODE) != (_MODE_LONG_RANGE_MODE | _MODE_SLEEP):
			raise RuntimeError("Failed to configure radio for LoRa mode, check wiring!")
		self._write_u8(_REG_FIFO_TX_BASE_ADDR, 0x00)				# Setup entire 256 byte FIFO
		self._write_u8(_REG_FIFO_RX_BASE_ADDR, 0x00)
		
		self.idle()
		self.coding_rate(self._coding_rate)							# CR: 5...8
		self.frequency_mhz(self._frequency_mhz)						# Set frequency_mhz 433±10.00
		self.signal_bandwidth(self._signal_bandwidth) 				# BW: 7.8...500 kHz 
		self.spreading_factor(self._spreading_factor)				# SF: 6..12
		self.enable_crc(self._kw.get('enable_crc', True))			# Set enable_crc
		self.preamble_length(self._kw.get('preamble_length', 6))	
		self.tx_power(self._kw.get('tx_power', 16),self._kw.get('high_power', True))
		
		self._write_u8(_REG_MODEM_CONFIG3, 0x04)  					#set AGC - True
		if 1000 /(self._signal_bandwidth / 2**self._spreading_factor) > 16:
			self._write_u8(_REG_MODEM_CONFIG3, self._read_u8(_REG_MODEM_CONFIG3) | 0x08)		
		
	def transfer(self, address, value = 0x00):
		response = bytearray(1)
		self._pin_ss.value(0)
		self._spi.write(bytes([address]))
		self._spi.write_readinto(bytes([value]), response)
		self._pin_ss.value(1)
		return response

	def _read_u8(self, address):
		response = self.transfer(address & 0x7f)
		return int.from_bytes(response, 'big')

	def _write_u8(self, address, value):
		self.transfer(address | 0x80, value)

	def idle(self):
		self._write_u8(_REG_OP_MODE, _MODE_LONG_RANGE_MODE | _MODE_STDBY)

	def sleep(self):
		self._write_u8(_REG_OP_MODE, _MODE_LONG_RANGE_MODE | _MODE_SLEEP)

	def listen(self):
		self._write_u8(_REG_OP_MODE, _MODE_LONG_RANGE_MODE | _MODE_RX)
		self._write_u8(_REG_DIO_MAPPING1, 0x00)
		self._write_u8(_REG_DIO_MAPPING2, 0x40)

	def transmit(self):
		self._write_u8(_REG_OP_MODE, _MODE_LONG_RANGE_MODE | _MODE_TX)
		self._write_u8(_REG_DIO_MAPPING1, 0x01)
		self._write_u8(_REG_DIO_MAPPING2, 0x00)
		
	def preamble_length(self, val):
		self._write_u8(_REG_PREAMBLE_MSB, (val >> 8) & 0xFF)
		self._write_u8(_REG_PREAMBLE_LSB, val & 0xFF)
		
	def frequency_mhz(self, val):
		if val < 410 or val > 525:
			raise RuntimeError("frequency_mhz must be between 410 and 525")
		frf = int((val * 1000000.0) /(32000000.0 / 524288)) & 0xFFFFFF
		self._write_u8(_REG_FRF_MSB, frf >> 16)
		self._write_u8(_REG_FRF_MID, (frf >> 8) & 0xFF)
		self._write_u8(_REG_FRF_LSB, frf & 0xFF)
		
	def tx_power(self, val,high_power=True):
		if high_power:
			assert 5 <= val <= 23
			if val > 20:
				self._write_u8(_REG_PA_DAC, 0x07)
				val -= 3
			else:
				self._write_u8(_REG_PA_DAC, 0x04)
			self._write_u8(_REG_PA_CONFIG, 0x80 | (val - 5))
		else:	
			assert -1 <= val <= 14
			self._write_u8(_REG_PA_CONFIG, 0x70 | (val +1))
			
	def packet_rssi(self):     	#last RSSI reading
		return self._read_u8(_REG_PKT_RSSI_VALUE)-157

	def packet_snr(self):		#last SNR reading
		snr_byte = self._read_u8(_REG_PKT_SNR_VALUE)
		return snr_byte/4 if snr_byte<=127 else (snr_byte -256 )/4
		
	def signal_bandwidth(self, val):
		bw_bins = (7800, 10400, 15600, 20800, 31250, 41700, 62500, 125000, 250000)
		for bw_id, cutoff in enumerate(bw_bins):
			if val <= cutoff:
				break
		else:
			bw_id = 9
		self._write_u8(_REG_MODEM_CONFIG1,(self._read_u8(_REG_MODEM_CONFIG1) & 0x0F) | (bw_id << 4))
		if val >= 500000:
			self._write_u8(_DETECTION_OPTIMIZE,(self._read_u8(_DETECTION_OPTIMIZE) | 0x80))
			self._write_u8(0x36, 0x02)
			self._write_u8(0x3A, 0x7F)
		else:
			self._write_u8(_DETECTION_OPTIMIZE,(self._read_u8(_DETECTION_OPTIMIZE) & 0x7F))
			self._write_u8(0x36, 0x03)
			if val == 7800:
				self._write_u8(0x2F, 0x48)
			elif val >= 62500:
				self._write_u8(0x2F, 0x40)
			else:
				self._write_u8(0x2F, 0x44)
			self._write_u8(0x30, 0)
			
	def coding_rate(self, val):		
		denominator = min(max(val, 5), 8)
		cr_id = denominator - 4
		self._write_u8(_REG_MODEM_CONFIG1,(self._read_u8(_REG_MODEM_CONFIG1) & 0xF1) | (cr_id << 1))

	def spreading_factor(self, val):
		val = min(max(val, 6), 12)
		self._write_u8(_DETECTION_OPTIMIZE,self._read_u8(_DETECTION_OPTIMIZE)|0x05 if val == 6 else self._read_u8(_DETECTION_OPTIMIZE)|0x03)
		self._write_u8(_DETECTION_THRESHOLD, 0x0C if val == 6 else 0x0A)
		self._write_u8(_REG_MODEM_CONFIG2,((self._read_u8(_REG_MODEM_CONFIG2) & 0x0F)| ((val << 4) & 0xF0)))

	def enable_crc(self, val):	
		if val:
			self._write_u8(_REG_MODEM_CONFIG2,self._read_u8(_REG_MODEM_CONFIG2) | 0x04)
		else:
			self._write_u8(_REG_MODEM_CONFIG2,self._read_u8(_REG_MODEM_CONFIG2) & 0xFB)

	def irq_done(self):								#irq status
		return self._read_u8(_REG_IRQ_FLAGS)

	def send(self,msg,timeout=2):
		self.idle()  								# Stop receiving to clear FIFO and keep it clear.
		self._write_u8(_REG_FIFO_ADDR_PTR, 0x00)  	# FIFO starts at 0.
		if isinstance(msg, str):
			msg = msg.encode()
		size = min(len(msg), 255)	
		for i in range(size):						# write data
			self._write_u8(_REG_FIFO, msg[i])		# Write payload.
		self._write_u8(_REG_PAYLOAD_LENGTH, size)	# Write payload and header length.
		self.transmit()								# Turn on transmit mode to send out the packet.

		timed_out = False
		start = time.ticks_ms()
		while not timed_out and not((self._read_u8(_REG_IRQ_FLAGS) & 0x8) >> 3):
			if time.ticks_diff(time.ticks_ms(), start) >= timeout * 1000:
				timed_out = True		
				
		self.idle()									# Enter idle mode to stop receiving other packets.
		gc.collect()
		self._write_u8(_REG_IRQ_FLAGS, 0xFF)		# Clear interrupt.
		return not timed_out

	def recv(self):
		if self._read_u8(_REG_OP_MODE) != (_MODE_LONG_RANGE_MODE | _MODE_RX):
			self.listen()											# Enter receive mode
	
		flags=self.irq_done()	
		if flags & 0x40:
			self.idle() 											# Enter idle mode to stop receiving other packets.
			fifo_length = self._read_u8(_REG_RX_NB_BYTES)			# Read the length of the FIFO.
			if fifo_length > 0:  									# Read the data from the FIFO.
				self._write_u8(_REG_FIFO_ADDR_PTR, self._read_u8(_REG_FIFO_RX_CURRENT_ADDR))	
				packet = bytearray()
				for i in range(fifo_length):
					packet.append(self._read_u8(_REG_FIFO))			# Read the packet.
			self._write_u8(_REG_IRQ_FLAGS, 0xFF)					# Clear interrupt.
			gc.collect()
			try :
				return bytes(packet).decode()
			except:
				return bytes(packet)
		elif flags== 0x15:
			print("Timeout not handled , overflow error，will restart！")
			self.init()		