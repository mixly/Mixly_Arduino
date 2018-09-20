from machine import Pin
from machine import PWM

def pitch(freq,pin):
    id = int(str(pin)[4:-1])
    PWM(Pin(id),duty=512,freq=freq)

def stop(pin):
    id = int(str(pin)[4:-1])
    PWM(Pin(id),duty=512,freq=20000)