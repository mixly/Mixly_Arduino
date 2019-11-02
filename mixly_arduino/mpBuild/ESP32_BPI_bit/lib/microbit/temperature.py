Tp = 273.15
T = Tp + 25 # Normal Temperature Parameters
_T = 1 / T
B = 3950

class Temperature:

    def __init__(self, adc):
        self.adc = adc

    def temperature(self):
        adc_val = self.adc.read()
        Vout = adc_val * 3.9 / 4095.0
        if 0 < Vout and Vout < 3.3: # -26.9 and 160.5
            Rt = ((3.3 / Vout) - 1) * 0.51  # Sampling Resistance is 5.1K ohm
            import math
            T1 = 1 / (_T + math.log(Rt) / B) - Tp
            return round(T1, 1)
        print('ADC Value Error!')
        return None

def unit_test():
    print('\n\
        from machine import ADC, Pin\n\
        from time import sleep\n\
        adc = ADC(Pin(34, Pin.IN))\n\
        adc.atten(ADC.ATTN_11DB)  # 0-3.9V\n\
        __temp = Temperature(adc)\n\
        temperature = __temp.temperature\n\
        while True:\n\
            print(temperature())\n\
            sleep(1)\n\
    ')
    from machine import ADC, Pin
    from time import sleep
    adc = ADC(Pin(34, Pin.IN))
    adc.atten(ADC.ATTN_11DB)  # 0-3.9V
    __temp = Temperature(adc)
    temperature = __temp.temperature
    while True:
        print(temperature())
        sleep(1)

if __name__ == '__main__':
    unit_test()
