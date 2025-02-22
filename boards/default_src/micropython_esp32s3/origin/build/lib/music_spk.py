"""
Music buzzer

Micropython library for the Music buzzer
=======================================================

#Based on Author: qiren123(MIDI Music) 	           	20220618
#Make changes to instantiation			 			20220622
#Increase level reversal selection					20220716

dahanzimin From the Mixly Team
"""

import time
import math
import array,struct

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
	def __init__(self, i2s_bus, rate=22050):
		self.reset()
		self._rate = rate
		self.i2s_bus = i2s_bus

	def _tone(self, frequency, run_ms=1000):
		# create a buffer containing the pure tone samples
		samples_per_cycle = self._rate // frequency
		sample_size_in_bytes = 16 // 8
		samples = bytearray(samples_per_cycle * sample_size_in_bytes)
		_range = 32768
		for i in range(samples_per_cycle):
			sample = _range + int((_range - 1) * math.sin(2 * math.pi * i / samples_per_cycle))
			struct.pack_into("<h", samples, i * sample_size_in_bytes, sample)
	   
		star = time.ticks_ms() 
		while time.ticks_diff(time.ticks_ms(), star) <= run_ms:
			self.i2s_bus.write(samples)

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
			freq = 20000
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
			self._tone(midi[0], midi[1])
			self._tone(20000, 1)
		time.sleep_ms(10)

	def pitch(self, freq):
		pass

	def pitch_time(self, freq, delay):
		self._tone(freq, delay) 
		time.sleep_ms(10)

	def stop(self):
		pass

	DADADADUM=['r4:2','g','g','g','eb:8','r:2','f','f','f','d:8']
	ENTERTAINER=['d4:1','d#','e','c5:2','e4:1','c5:2','e4:1','c5:3','c:1','d','d#','e','c','d','e:2','b4:1','d5:2','c:4']
	PRELUDE=['c4:1','e','g','c5','e','g4','c5','e','c4','e','g','c5','e','g4','c5','e','c4','d','g','d5','f','g4','d5','f','c4','d','g','d5','f','g4','d5','f','b3','d4','g','d5','f','g4','d5','f','b3','d4','g','d5','f','g4','d5','f','c4','e','g','c5','e','g4','c5','e','c4','e','g','c5','e','g4','c5','e']
	ODE=['e4','e','f','g','g','f','e','d','c','c','d','e','e:6','d:2','d:8','e:4','e','f','g','g','f','e','d','c','c','d','e','d:6','c:2','c:8']
	NYAN=['f#5:1','g#','c#:1','d#:2','b4:1','d5:1','c#','b4:2','b','c#5','d','d:1','c#','b4:1','c#5:1','d#','f#','g#','d#','f#','c#','d','b4','c#5','b4','d#5:2','f#','g#:1','d#','f#','c#','d#','b4','d5','d#','d','c#','b4','c#5','d:2','b4:1','c#5','d#','f#','c#','d','c#','b4','c#5:2','b4','c#5','b4','f#:1','g#','b:2','f#:1','g#','b','c#5','d#','b4','e5','d#','e','f#','b4:2','b','f#:1','g#','b','f#','e5','d#','c#','b4','f#','d#','e','f#','b:2','f#:1','g#','b:2','f#:1','g#','b','b','c#5','d#','b4','f#','g#','f#','b:2','b:1','a#','b','f#','g#','b','e5','d#','e','f#','b4:2','c#5']
	RINGTONE=['c4:1','d','e:2','g','d:1','e','f:2','a','e:1','f','g:2','b','c5:4']
	FUNK=['c2:2','c','d#','c:1','f:2','c:1','f:2','f#','g','c','c','g','c:1','f#:2','c:1','f#:2','f','d#']
	BLUES=['c2:2','e','g','a','a#','a','g','e','c2:2','e','g','a','a#','a','g','e','f','a','c3','d','d#','d','c','a2','c2:2','e','g','a','a#','a','g','e','g','b','d3','f','f2','a','c3','d#','c2:2','e','g','e','g','f','e','d']
	BIRTHDAY=['c4:4','c:1','d:4','c:4','f','e:8','c:3','c:1','d:4','c:4','g','f:8','c:3','c:1','c5:4','a4','f','e','d','a#:3','a#:1','a:4','f','g','f:8']
	WEDDING=['c4:4','f:3','f:1','f:8','c:4','g:3','e:1','f:8','c:4','f:3','a:1','c5:4','a4:3','f:1','f:4','e:3','f:1','g:8']
	FUNERAL=['c3:4','c:3','c:1','c:4','d#:3','d:1','d:3','c:1','c:3','b2:1','c3:4']
	PUNCHLINE=['c4:3','g3:1','f#','g','g#:3','g','r','b','c4']
	PYTHON=['d5:1','b4','r','b','b','a#','b','g5','r','d','d','r','b4','c5','r','c','c','r','d','e:5','c:1','a4','r','a','a','g#','a','f#5','r','e','e','r','c','b4','r','b','b','r','c5','d:5','d:1','b4','r','b','b','a#','b','b5','r','g','g','r','d','c#','r','a','a','r','a','a:5','g:1','f#:2','a:1','a','g#','a','e:2','a:1','a','g#','a','d','r','c#','d','r','c#','d:2','r:3']
	BADDY=['c3:3','r','d:2','d#','r','c','r','f#:8']
	CHASE=['a4:1','b','c5','b4','a:2','r','a:1','b','c5','b4','a:2','r','a:2','e5','d#','e','f','e','d#','e','b4:1','c5','d','c','b4:2','r','b:1','c5','d','c','b4:2','r','b:2','e5','d#','e','f','e','d#','e']
	BA_DING=['b5:1','e6:3']
	WAWAWAWAA=['e3:3','r:1','d#:3','r:1','d:4','r:1','c#:8']
	JUMP_UP=['c5:1','d','e','f','g']
	JUMP_DOWN=['g5:1','f','e','d','c']
	POWER_UP=['g4:1','c5','e4','g5:2','e5:1','g5:3']
	POWER_DOWN=['g5:1','d#','c','g4:2','b:1','c5:3']
