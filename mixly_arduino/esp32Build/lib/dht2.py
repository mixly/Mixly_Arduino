from machine import Pin
from machine import PWM

def pitch(freq,pin):
    id = int(str(pin)[4:-1])
    PWM(Pin(id),duty=512,freq=freq)

def stop(pin):
    id = int(str(pin)[4:-1])
    PWM(Pin(id),duty=512,freq=20000)

def measure(d):
    global _dht_time
    if(time.ticks_diff(time.ticks_ms(), _dht_time))>1000:
        d.measure()
        _dht_time = time.ticks_ms()
def getTemperature(d):
    measure(d)
    return d.temperature()
def getHumidity(d):
    measure(d)
    return d.humidity()
def getTempAndHum(d):
    measure(d)
    return d.temperature(),d.humidity()