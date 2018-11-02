import time
import machine
import onewire
import ds18x20

def get_dstemp(pin):
	dat = machine.Pin(pin)
	ds = ds18x20.DS18X20((onewire.OneWire(dat)))
	roms = ds.scan()
	if roms:
		ds.convert_temp()
		time.sleep_ms(750)
		return ds.read_temp(roms[0]) 
	else:
		return float('nan')
		