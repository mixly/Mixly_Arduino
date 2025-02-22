"""
Music buzzer(BOT)

Micropython library for the Music buzzer(Coprocessor I2C communication)
=======================================================
@dahanzimin From the Mixly Team
"""
from time import sleep_ms

normal_tone = {
	'A1': 55, 'B1': 62, 'C1': 33, 'D1': 37, 'E1': 41, 'F1': 44, 'G1': 49,
	'A2': 110, 'B2': 123, 'C2': 65, 'D2': 73, 'E2': 82, 'F2': 87, 'G2': 98,
	'A3': 220, 'B3': 247, 'C3': 131, 'D3': 147, 'E3': 165, 'F3': 175, 'G3': 196,
	'A4': 440, 'B4': 494, 'C4': 262, 'D4': 294, 'E4': 330, 'F4': 349, 'G4': 392,
	'A5': 880, 'B5': 988, 'C5': 523, 'D5': 587, 'E5': 659, 'F5': 698, 'G5': 784,
	'A6': 1760, 'B6': 1976, 'C6': 1047, 'D6': 1175, 'E6': 1319, 'F6': 1397, 'G6': 1568,
	'A7': 3520, 'B7': 3951, 'C7': 2093, 'D7': 2349, 'E7': 2637, 'F7': 2794, 'G7': 3135,
	'A8': 7040, 'B8': 7902, 'C8': 4186, 'D8': 4699, 'E8': 5274, 'F8': 5588, 'G8': 6271,
	'A9': 14080, 'B9': 15804 }

Letter = 'ABCDEFG#R'

class MIDI():
	def __init__(self, bus, volume=100):
		self.reset()
		self._bus = bus
		self._volume = volume // 5

	def set_volume(self, volume):
		self._volume = max(min(volume, 100), 0) // 5

	def set_tempo(self, ticks=4, bpm=120):
		self.ticks = ticks
		self.bpm = bpm
		self.beat = 60000 / self.bpm / self.ticks

	def set_octave(self, octave=4):
		self.octave = octave

	def set_duration(self, duration=4):
		self.duration = duration

	def get_tempo(self):
		return (self.ticks, self.bpm)

	def get_octave(self):
		return self.octave

	def get_duration(self):
		return self.duration

	def reset(self):
		self.set_duration()
		self.set_octave()
		self.set_tempo()

	def parse(self, tone, dict):
		time = self.beat * self.duration
		pos = tone.find(':')
		if pos != -1:
			time = self.beat * int(tone[(pos + 1):])
			tone = tone[:pos]
		freq, tone_size = 1, len(tone)
		if 'R' in tone:
			freq = 400000
		elif tone_size == 1:
			freq = dict[tone[0] + str(self.octave)]
		elif tone_size == 2:
			freq = dict[tone]
			self.set_octave(tone[1:])
		return int(freq), int(time)

	def midi(self, tone):
		pos = tone.find('#')
		if pos != -1:
			return self.parse(tone.replace('#', ''), normal_tone)
		pos = tone.find('B')
		if pos != -1 and pos != 0:
			return self.parse(tone.replace('B', ''), normal_tone)
		return self.parse(tone, normal_tone)

	def set_default(self, tone):
		pos = tone.find(':')
		if pos != -1:
			self.set_duration(int(tone[(pos + 1):]))
			tone = tone[:pos]

	def play(self, tune, duration=None):
		if duration is None:
			self.set_default(tune[0])
		else:
			self.set_duration(duration)
		for tone in tune:
			tone = tone.upper() 
			if tone[0] not in Letter:
				continue
			midi = self.midi(tone)
			self._bus.buzzer(self._volume, midi[0])
			sleep_ms(midi[1])
			self._bus.buzzer(0)
			sleep_ms(1)
		sleep_ms(10)

	def pitch(self, freq):
		self._bus.buzzer(self._volume, int(freq))

	def pitch_time(self, freq, delay):
		self._bus.buzzer(self._volume, int(freq))
		sleep_ms(delay)
		self._bus.buzzer(0)
		sleep_ms(10)
		
	def stop(self):
		self._bus.buzzer(0)
		sleep_ms(10)

	BA_DING=('b5:1','e6:3')
	JUMP_UP=('c5:1','d','e','f','g')
	JUMP_DOWN=('g5:1','f','e','d','c')
	POWER_UP=('g4:1','c5','e4','g5:2','e5:1','g5:3')
	POWER_DOWN=('g5:1','d#','c','g4:2','b:1','c5:3')
	DADADADUM=('r4:2','g','g','g','eb:8','r:2','f','f','f','d:8')
	BIRTHDAY=('c4:4','c:1','d:4','c:4','f','e:8','c:3','c:1','d:4','c:4','g','f:8','c:3','c:1','c5:4','a4','f','e','d','a#:3','a#:1','a:4','f','g','f:8')
