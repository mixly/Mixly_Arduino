import machine

pin0 = machine.Pin(0, machine.Pin.OUT)
pin5 = machine.Pin(5, machine.Pin.OUT)
pin0.value(1)
pin5.value(1)
try:
	from display import *
	display.clear()
	import music
	music.stop(machine.PWM(machine.Pin(27)))
except:
	pass
