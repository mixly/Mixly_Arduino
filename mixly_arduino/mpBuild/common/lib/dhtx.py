import dht
import machine
import time
def get_dht_temperature(sensetype,pin):
 if(sensetype=='dht11'):
  d=dht.DHT11(machine.Pin(pin))
 else:
  d=dht.DHT22(machine.Pin(pin))
 d.measure()
 time.sleep_ms(1)
 return d.temperature()
def get_dht_relative_humidity(sensetype,pin):
 if(sensetype=='dht11'):
  d=dht.DHT11(machine.Pin(pin))
 else:
  d=dht.DHT22(machine.Pin(pin))
 d.measure()
 time.sleep_ms(1)
 return d.humidity()
def get_dht_tempandhum(sensetype,pin):
 if(sensetype=='dht11'):
  d=dht.DHT11(machine.Pin(pin))
 else:
  d=dht.DHT22(machine.Pin(pin))
 d.measure()
 time.sleep_ms(1)
 return d.temperature(),d.humidity()
