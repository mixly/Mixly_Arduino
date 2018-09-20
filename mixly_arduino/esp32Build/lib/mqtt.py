from simple import MQTTClient
from machine import Pin
import machine
import micropython

led = Pin(2, Pin.OUT, value=0)
SERVER = "183.230.40.39"
CLIENT_ID = "31444082"
TOPIC = b"XBCRobot"
username='141092'
password='61n63JySRowo13ZLDBKw6y896E0='

state = 0

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    ap_if = network.WLAN(network.AP_IF)
    if ap_if.active():
        ap_if.active(False)
    if not sta_if.isconnected():
        print('connecting to network...')
    sta_if.active(True)
    sta_if.connect('esptest', 'esp32test')
    while not sta_if.isconnected():
        pass
    print('network config:', sta_if.ifconfig())

def sub_cb(topic, msg):
    global state
    print((topic, msg))
    if msg == b"on":
        led.value(1)
        state = 1
        print("1")
    elif msg == b"off":
        led.value(0)
        state = 0
        print("0")
    elif msg == b"toggle":
        state = 1 - state
        led.value(state)
           

def main(server=SERVER):
    #6002
    do_connect()
    c = MQTTClient(CLIENT_ID, server,6002,username,password)
    c.set_callback(sub_cb)
    c.connect()
    c.subscribe(TOPIC)
    print("Connected to %s, subscribed to %s topic" % (server, TOPIC))
    try:
        while 1:
            c.wait_msg()
    finally:
        c.disconnect()
        
main()
