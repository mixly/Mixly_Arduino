from microbit import *


def initPCA9685():
    i2c.write(0x40, bytearray([0x00, 0x00]))
    setFreq(50)
    for idx in range(0, 16, 1):
        setPwm(idx, 0, 0)


def MotorRun(Motors, speed):
    speed = speed * 16
    if speed >= 4096:
        speed = 4095
    if speed <= -4096:
        speed = -4095
    if Motors <= 4 and Motors > 0:
        pp = (Motors - 1) * 2
        pn = (Motors - 1) * 2 + 1
        if speed >= 0:
            setPwm(pp, 0, speed)
            setPwm(pn, 0, 0)
        else:
            setPwm(pp, 0, 0)
            setPwm(pn, 0, -speed)


def Servo(Servos, degree):
    v_us = degree * 1800 / 180 + 600
    value = int(v_us * 4096 / 20000)
    setPwm(Servos + 7, 0, value)


def setFreq(freq):
    prescaleval = int(25000000 / (4096 * freq)) - 1
    i2c.write(0x40, bytearray([0x00]))
    oldmode = i2c.read(0x40, 1)
    newmode = (oldmode[0] & 0x7F) | 0x10
    i2c.write(0x40, bytearray([0x00, newmode]))
    i2c.write(0x40, bytearray([0xFE, prescaleval]))
    i2c.write(0x40, bytearray([0x00, oldmode[0]]))
    sleep(4)
    i2c.write(0x40, bytearray([0x00, oldmode[0] | 0xA1]))


def setPwm(channel, on, off):
    if channel >= 0 and channel <= 15:
        buf = bytearray(
            [
                0x06 + 4 * channel,
                on & 0xFF,
                (on >> 8) & 0xFF,
                off & 0xFF,
                (off >> 8) & 0xFF,
            ]
        )
        i2c.write(0x40, buf)


def setStepper(stpMotors, dir, speed):
    spd = speed
    setFreq(spd)
    if stpMotors == 1:
        if dir:
            setPwm(0, 2047, 4095)
            setPwm(1, 1, 2047)
            setPwm(2, 1023, 3071)
            setPwm(3, 3071, 1023)
        else:
            setPwm(3, 2047, 4095)
            setPwm(2, 1, 2047)
            setPwm(1, 1023, 3071)
            setPwm(0, 3071, 1023)
    elif stpMotors == 2:
        if dir:
            setPwm(4, 2047, 4095)
            setPwm(5, 1, 2047)
            setPwm(6, 1023, 3071)
            setPwm(7, 3071, 1023)
        else:
            setPwm(7, 2047, 4095)
            setPwm(6, 1, 2047)
            setPwm(4, 1023, 3071)
            setPwm(5, 3071, 1023)
