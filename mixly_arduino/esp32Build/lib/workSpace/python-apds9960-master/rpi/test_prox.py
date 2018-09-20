from apds9960.const import *
from apds9960 import APDS9960
import RPi.GPIO as GPIO
import smbus
from time import sleep

port = 1
bus = smbus.SMBus(port)

apds = APDS9960(bus)

def intH(channel):
    print("INTERRUPT")

GPIO.setmode(GPIO.BOARD)
GPIO.setup(7, GPIO.IN)
try:
    # Interrupt-Event hinzufuegen, steigende Flanke
    GPIO.add_event_detect(7, GPIO.FALLING, callback = intH)

    apds.setProximityIntLowThreshold(50)

    print("Proximity Sensor Test")
    print("=====================")
    apds.enableProximitySensor()
    oval = -1
    while True:
        sleep(0.25)
        val = apds.readProximity()
        if val != oval:
            print("proximity={}".format(val))
            oval = val

finally:
    GPIO.cleanup()
    print "Bye"
