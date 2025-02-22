"""
RC522

Micropython library for the RC522 RFID (I2C&SPI)
=======================================================
#Preliminary composition						20231204

dahanzimin From the Mixly Team
"""
import machine
from micropython import const

RC_OK          = True
RC_NOTAGERR    = None
RC_ERR         = False
RC_REQIDL      = const(0x26)
RC_REQALL      = const(0x52)
RC_AUTHENT1A   = const(0x60)
RC_AUTHENT1B   = const(0x61)
RC_Version     = const(0x37)

class RC522:
	def __init__(self, drive_bus,cs_pin=None,addr=0x28):
		self._device= drive_bus
		if type(drive_bus) in [machine.I2C,machine.SoftI2C]:
			self._type=True
			self._address = addr
		elif type(drive_bus) in [machine.SPI,machine.SoftSPI]:
			self._type=False
			self._cs = machine.Pin(cs_pin, machine.Pin.OUT)
		else:
			raise ValueError("RC522 only supports I2C and SPI")

		self.init()	
		self.add_list=[1,2,4,5,6,8,9,10,12,13,14,16,17,18,20,21,22,24,25,26,28,29,30,32,33,34,36,37,38,40,41,42,44,45,46,48,49,50,52,53,54,56,57,58,60,61,62]

	def _wreg(self, reg, val):
		'''Write memory address'''
		if self._type:
			self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))
		else:
			self._cs.value(0)
			self._device.write(b'%c' % int(0xff & ((reg << 1) & 0x7e)))
			self._device.write(b'%c' % int(0xff & val))
			self._cs.value(1)

	def _rreg(self, reg):
		'''Read memory address'''
		if self._type:
			return  self._device.readfrom_mem(self._address, reg, 1)[0]
		else:
			self._cs.value(0)
			self._device.write(b'%c' % int(0xff & (((reg << 1) & 0x7e) | 0x80)))
			val = self._device.read(1)
			self._cs.value(1)
			return val[0]

	def _sflags(self, reg, mask):
		self._wreg(reg, self._rreg(reg) | mask)

	def _cflags(self, reg, mask):
		self._wreg(reg, self._rreg(reg) & (~mask))

	def _tocard(self, cmd, send):
		recv = []
		bits = 0
		irq_en = 0
		wait_irq =0 
		n = 0
		stat = RC_ERR
		if cmd == 0x0E:
			irq_en = 0x12
			wait_irq = 0x10
		elif cmd == 0x0C:
			irq_en = 0x77
			wait_irq = 0x30
		self._wreg(0x02, irq_en)
		self._cflags(0x04, 0x80)
		self._sflags(0x0A, 0x80)
		self._wreg(0x01, 0x00)
		for c in send:
			self._wreg(0x09, c)
		self._wreg(0x01, cmd)

		if cmd == 0x0C:
			self._sflags(0x0D, 0x80)

		i = 100
		while True:
			n = self._rreg(0x04)
			i -= 1
			if  ~((i != 0) and ~(n & 0x01) and ~(n & wait_irq)):
				break
				
		self._cflags(0x0D, 0x80)
		if i:
			if (self._rreg(0x06) & 0x1B) == 0x00:
				stat = RC_OK

				if n & irq_en & 0x01:
					stat = RC_NOTAGERR
				elif cmd == 0x0C:
					n = self._rreg(0x0A)
					lbits = self._rreg(0x0C) & 0x07
					if lbits != 0:
						bits = (n - 1) * 8 + lbits
					else:
						bits = n * 8
					if n == 0:
						n = 1
					elif n > 16:
						n = 16
					for _ in range(n):
						recv.append(self._rreg(0x09))
			else:
				stat = RC_ERR
		return stat, recv, bits

	def _crc(self, data):
		self._cflags(0x05, 0x04)
		self._sflags(0x0A, 0x80)
		for c in data:
			self._wreg(0x09, c)
		self._wreg(0x01, 0x03)
		i = 0xFF
		while True:
			n = self._rreg(0x05)
			i -= 1
			if not ((i != 0) and not (n & 0x04)):
				break
		return [self._rreg(0x22), self._rreg(0x21)]

	def init(self):
		self.reset()
		self._wreg(0x2A, 0x8D)
		self._wreg(0x2B, 0x3E)
		self._wreg(0x2D, 30)
		self._wreg(0x2C, 0)
		self._wreg(0x15, 0x40)
		self._wreg(0x11, 0x3D)
		self._wreg(0x26, 0x68)
		#A32NQ32C3 Additional Register Configuration
		if self._rreg(RC_Version) == 0x82:
			self._wreg(0x12, 0x0)
			self._wreg(0x13, 0x0)
			self._wreg(0x14, 0x84)
			self._wreg(0x18, 0x33)
			self._wreg(0x0c, 0x10)
		self.antenna_on()

	def reset(self):
		self._wreg(0x01, 0x0F)

	def antenna_on(self, on=True):
		if on and ~(self._rreg(0x14) & 0x03):
			self._sflags(0x14, 0x03)
		else:
			self._cflags(0x14, 0x03)

	def request(self, mode):
		self._wreg(0x0D, 0x07)
		stat, recv, bits = self._tocard(0x0C, [mode])
		if (stat != RC_OK) | (bits != 0x10):
			stat = RC_ERR
		return stat, bits

	def anticoll(self):
		ser_chk = 0
		ser = [0x93, 0x20]
		self._wreg(0x0D, 0x00)
		(stat, recv, bits) = self._tocard(0x0C, ser)

		if stat == RC_OK:
			if len(recv) == 5:
				for i in range(4):
					ser_chk = ser_chk ^ recv[i]
				if ser_chk != recv[4]:
					stat = RC_ERR
			else:
				stat = RC_ERR
		return stat, recv

	def select_tag(self, ser):
		buf = [0x93, 0x70] + ser[:5]
		buf += self._crc(buf)
		(stat, recv, bits) = self._tocard(0x0C, buf)
		return RC_OK if (stat == RC_OK) and (bits == 0x18) else RC_ERR

	def auth(self, mode, addr, sect, ser):
		return self._tocard(0x0E, [mode, addr] + sect + ser[:4])[0]

	def stop_crypto1(self):
		self._cflags(0x08, 0x08)

	def read(self, addr):
		data = [0x30, addr]
		data += self._crc(data)
		(stat, recv, _) = self._tocard(0x0C, data)
		return recv if stat == RC_OK else None

	def write(self, addr, data):
		buf = [0xA0, addr]
		buf += self._crc(buf)
		(stat, recv, bits) = self._tocard(0x0C, buf)

		if not (stat == RC_OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
			stat = RC_ERR
		else:
			buf = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			for i in range(len(data)):
				buf[i]=data[i]
			buf += self._crc(buf)
			(stat, recv, bits) = self._tocard(0x0C, buf)
			if not (stat == RC_OK) or not (bits == 4) or not ((recv[0] & 0x0F) == 0x0A):
				stat = RC_ERR
		return stat

	def read_card(self,add,x='ALL'):#0:all,i:id,2:content
		if add>=47:
			raise AttributeError("Out of address range")
		stat, tag_type = self.request(RC_REQALL)
		if stat !=RC_OK:
			stat, tag_type = self.request(RC_REQALL)
		if stat == RC_OK:
			(stat, raw_uid) = self.anticoll()
			if stat == RC_OK:
				if self.select_tag(raw_uid) == RC_OK:
					key = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]
					if self.auth(RC_AUTHENT1A, self.add_list[add], key, raw_uid) == RC_OK:
						card = self.read(self.add_list[add])
						try:
							card = bytes(card).decode().replace("\x00", '') if card else None
						except:
							card = bytes(card) if card else None
						self.stop_crypto1()
						if x == "ALL":
							return int('{}{}{}{}'.format(raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3])), card
						elif x == "id":
							return int('{}{}{}{}'.format(raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3]))
						elif x == "content":
							return card
			
	def write_card(self, data,add):
		if add>=47:
			raise AttributeError("Out of address range")
		stat, tag_type = self.request(RC_REQALL)
		if stat !=RC_OK:
			stat, tag_type = self.request(RC_REQALL)
		if stat == RC_OK:
			(stat, raw_uid) = self.anticoll()
			if stat == RC_OK:
				if self.select_tag(raw_uid) == RC_OK:
					key = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]
					if self.auth(RC_AUTHENT1A, self.add_list[add], key, raw_uid) == RC_OK:
						try:
							data =list(data.encode())
						except:
							data =list(data)
						if len(data)>16:
							raise AttributeError("Input must be less than 16 bytes")
						stat = self.write(self.add_list[add], data)
						self.stop_crypto1()
						if stat == RC_OK:
							print('Data written to card')
							return RC_OK
						else:
							print('Failed to write data to card')
							return RC_ERR
					else:
						print('Authentication error')
						return RC_ERR
				else:
					print('Failed to select tag')
					return RC_ERR
		else:
			return RC_ERR

	def scan_card(self,stat=RC_REQIDL):
		return self.request(stat)[0]
