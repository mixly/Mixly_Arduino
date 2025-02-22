"""
mixgo_zero Zi Voice Onboard resources

Micropython    library for the mixgo_zero Zi Onboard resources
=======================================================

#Preliminary composition                   20230818

dahanzimin From the Mixly Team
"""
import ustruct
import time
import music_spk
import es8374

from machine import Pin, I2S
from mixgo_nova import onboard_i2c

sample_rate = 22050
ob_code = es8374.ES8374(onboard_i2c)
time.sleep(0.2)

#ps 特殊改双全工i2s支持
ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=sample_rate, ibuf=20000)

spk_midi = music_spk.MIDI(ob_audio, sample_rate)

def u2s(n):
    return n if n < (1 << 15) else n - (1 << 16)  

def sound_level():
	buf = bytearray(100)
	values = []
	ob_audio.readinto(buf)
	for i in range(len(buf)//2):
		values.append(u2s(buf[i * 2] | buf[i * 2 + 1]<<8))
	return max(values) - min(values)

def play_audio(path):
	file = open(path, 'rb')
	header = file.read(44)
	if header[8:12] != b'WAVE':
		raise Error('not a WAVE file')
	_rate = ustruct.unpack('<I', header[24:28])[0]
	print("sample_rate", _rate)
	file.seek(44)
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=_rate, ibuf=20000)
	while True:
		block = file.read(1024)
		if not block:
			break
		ob_audio.write(block)
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=sample_rate, ibuf=20000)
	file.close()

def record_audio(path, seconds=5):
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=sample_rate*4, ibuf=20000)
	file_size = sample_rate * 16 * 1 * seconds // 8
	wav_header = bytearray(44)
	wav_header[0:4] = b'RIFF'
	ustruct.pack_into('<I', wav_header, 4, file_size + 36)
	wav_header[8:40] = b'WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00"V\x00\x00D\xac\x00\x00\x02\x00\x10\x00data'
	ustruct.pack_into('<I', wav_header, 40, file_size)

	buf = bytearray(512)
	file = open(path, 'wb')
	file.write(wav_header)
	for _ in range(file_size // 512):
		ob_audio.readinto(buf)
		file.write(buf)
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=sample_rate, ibuf=20000)
	file.close()

def play_audio_url(url):
	import urequests
	response = urequests.get(url, stream=True)
	header = response.raw.read(44)
	if header[8:12] != b'WAVE':
		raise Error('not a WAVE file')
	_rate = ustruct.unpack('<I', header[24:28])[0]
	#print("sample_rate", _rate)
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=_rate, ibuf=20000)
	while True:
		block = response.raw.read(1024)
		if not block:
			break
		ob_audio.write(block)
	ob_audio = I2S(0, sck=Pin(34), ws=Pin(47), dout=Pin(48), din=Pin(33),  mck=Pin(35), mode=I2S.RTX, bits=16, format=I2S.MONO, rate=sample_rate, ibuf=20000)
	response.close()
