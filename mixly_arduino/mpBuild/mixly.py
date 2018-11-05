import machine
import mpu9250



i2c = machine.I2C(scl = machine.Pin(22), sda = machine.Pin(21), freq = 100000)
mpu = mpu9250.MPU9250(i2c)
while True:
    if mpu.mpu9250_is_gesture("shake"):
        print('Mixly')
