from utime import sleep_ms as sleep
from machine import Pin, ADC, DAC

class Pins():

    def __init__(self, pin):
        self.pin = pin
        self.adc = None

    def write_digital(self, v):
        Pin(self.pin, Pin.OUT).value(v)

    def read_digital(self):
        return Pin(self.pin, Pin.IN).value()

    def read_analog(self, ATTN = ADC.ATTN_0DB):
        if self.pin not in range(32,40):
            # print("This pin feature is not supported")
            return None
        if self.adc is None:
            self.adc = ADC(Pin(self.pin, Pin.IN))
            self.adc.atten(ATTN)  
        return self.adc.read()

    def write_analog(self, value):
        if self.pin not in [25,26]:
            # print("This pin feature is not supported")
            return None
        DAC(Pin(self.pin)).write(value)

    def is_touched(self):
        return self.read_analog() > 3071

def unit_test():
    print('The unit test code is as follows')
    print('\n\
        pin13 = Pins(18)\n\
        pin1 = Pins(32)\n\
        pin21=Pins(34)\n\
        pin10=Pins(26)\n\
        pin5=Pins(35)\n\
        while True:\n\
        pin13.write_digital(1)\n\
        sleep(20)\n\
        pin13.write_digital(0)\n\
        sleep(480)\n\
        print(\'Please press P1\')\n\
        sleep(1000)\n\
        print(\'pin1(P1).is_touched()\', pin1.is_touched())\n\
        sleep(1000)\n\
        print(\'Please press A\')\n\
        sleep(1000)\n\
        print(\'pin5(P5).read_digital()\', pin5.read_digital())\n\
        print(\'the ADC converted values is \', pin21.read_analog(ADC.ATTN_11DB))\n\
        sleep(50)\n\
        for val in range(150,255,1):\n\
            pin10.write_analog(val)\n\
            sleep(10)\n\
        for val in range(255,150,-1):\n\
            pin10.write_analog(val)\n\
            sleep(10)\n\
    ')
    pin13 = Pins(18)
    pin1 = Pins(32)
    pin21=Pins(34)
    pin10=Pins(26)
    pin5=Pins(35)
    while True:
        pin13.write_digital(1)
        sleep(500)
        pin13.write_digital(0)
        sleep(500)
        print('Please press P1')
        sleep(1000)
        print('pin1(P1).is_touched()', pin1.is_touched())
        sleep(1000)
        print('Please press A')
        sleep(1000)
        print('pin5(P5).read_digital()', pin5.read_digital())
        print('the ADC converted values is ', pin21.read_analog(ADC.ATTN_11DB))
        sleep(50)
        for val in range(150,255,1):
            pin10.write_analog(val)
            sleep(10)
        for val in range(255,150,-1):
            pin10.write_analog(val)
            sleep(10)

        

if __name__ == '__main__':
    unit_test()
