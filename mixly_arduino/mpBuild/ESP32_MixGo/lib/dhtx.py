import dht
import machine

def get_temperature(sensetype,pin):
	if (sensetype=='dht11'):
		d = dht.DHT11(machine.Pin(pin))
	else:
		d = dht.DHT22(machine.Pin(pin))
	d.measure()
	time.sleep_ms(1)
	return d.temperature() # eg. 23 (°C)
def get_humidity(sensetype,pin):
	if (sensetype=='dht11'):
		d = dht.DHT11(machine.Pin(pin))
	else:
		d = dht.DHT22(machine.Pin(pin))
	d.measure()
	time.sleep_ms(1)
	return d.humidity()
def get_tempandhum(sensetype,pin):
	if (sensetype=='dht11'):
		d = dht.DHT11(machine.Pin(pin))
	else:
		d = dht.DHT22(machine.Pin(pin))
	d.measure()
	time.sleep_ms(1)
	return d.temperature(),d.humidity()