import machine

from utime import ticks_ms as running_time, sleep_ms as sleep

from microbit import pins
pin0 = pins.Pins(25)
pin1 = pins.Pins(32)
pin2 = pins.Pins(33)
pin3 = pins.Pins(13)
pin4 = pins.Pins(15)
pin5 = pins.Pins(35)
pin6 = pins.Pins(12)
pin7 = pins.Pins(14)
pin8 = pins.Pins(16)
pin9 = pins.Pins(17)
pin10 = pins.Pins(26)
pin11 = pins.Pins(27)
pin12 = pins.Pins(2)
pin13 = pins.Pins(18)
pin14 = pins.Pins(19)
pin15 = pins.Pins(23)
pin16 = pins.Pins(5)
pin19 = pins.Pins(22)
pin20 = pins.Pins(21)

def panic(flag=0):
    return machine.reset_cause()

reset = machine.reset

from microbit import display
Image = display.Image
display = display.Display()

from microbit import button
button_a = button.Button(35)
button_b = button.Button(27)

from microbit import temperature
__adc = machine.ADC(machine.Pin(34, machine.Pin.IN))
__adc.atten(machine.ADC.ATTN_11DB)
temperature = temperature.Temperature(__adc).temperature

try:
    from mpu9250 import MPU9250
    from mpu6500 import MPU6500
    __i2c = machine.I2C(scl=machine.Pin(22), sda=machine.Pin(21), freq=200000)
    __dev = __i2c.scan()
    # print("dev ", __dev)
    if 104 in __dev:
        print("1.4 version")
        __sensor = MPU9250(__i2c, MPU6500(__i2c, 0x68))
    if 105 in __dev:
        print("1.2 version No compass")
        __sensor = MPU9250(__i2c, MPU6500(__i2c, 0x69))
    import microbit.accelerometer
    accelerometer = microbit.accelerometer.Direction(__sensor)
    import microbit.compass
    compass = microbit.compass.Compass(__sensor)
except Exception as e:
    print("MPU9250 Error", e)
