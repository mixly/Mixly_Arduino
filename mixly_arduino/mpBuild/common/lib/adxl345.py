from machine import Pin
from machine import I2C
import time
import ustruct

DATA_FORMAT = 0x31
BW_RATE  = 0x2c
POWER_CTL = 0x2d
INT_ENABLE  = 0x2E
OFSX = 0x1e
OFSY =0x1f
OFSZ =0x20

class ADXL345:
    def __init__(self, i2c, cs = Pin(33, Pin.OUT)):
        self.cs = cs
        cs.value(1)
        time.sleep(1)
        self.i2c = i2c
        slv = self.i2c.scan()
        print(slv)
        for s in slv:
            buf = self.i2c.readfrom_mem(s, 0, 1)
            print(buf)
            if(buf[0] == 0xe5):
                self.slvAddr = s
                print('adxl345 found')
                break
        #self.writeByte(POWER_CTL,0x00)  #sleep
        #time.sleep(0.001)
        #低电平中断输出,13位全分辨率,输出数据右对齐,16g量程
        self.writeByte(DATA_FORMAT,0x2B)
        #数据输出速度为100Hz
        self.writeByte(BW_RATE,0x0A)
        #不使用中断
        self.writeByte(INT_ENABLE,0x00)

        self.writeByte(OFSX,0x00)
        self.writeByte(OFSY,0x00)
        self.writeByte(OFSZ,0x00)
        #链接使能,测量模式
        self.writeByte(POWER_CTL,0x28)
        time.sleep(1)

    def readXYZ(self):
        fmt = '<h' #little-endian
        buf1 = self.readByte(0x32)
        buf2 = self.readByte(0x33)
        buf = bytearray([buf1[0], buf2[0]])
        x, = ustruct.unpack(fmt, buf)
        x = x*3.9
        #print('x:',x)

        buf1 = self.readByte(0x34)
        buf2 = self.readByte(0x35)
        buf = bytearray([buf1[0], buf2[0]])
        y, = ustruct.unpack(fmt, buf)
        y = y*3.9
        #print('y:',y)

        buf1 = self.readByte(0x36)
        buf2 = self.readByte(0x37)
        buf = bytearray([buf1[0], buf2[0]])
        z, = ustruct.unpack(fmt, buf)
        z = z*3.9
        #print('z:',z)
        #print('************************')
        #time.sleep(0.5)
        return (x,y,z)

    def readX(self):
        return self.readXYZ()[0]

    def readY(self):
        return self.readXYZ()[1]

    def readZ(self):
        return self.readXYZ()[2]

    def writeByte(self, addr, data):
        d = bytearray([data])
        self.i2c.writeto_mem(self.slvAddr, addr, d)
    def readByte(self, addr):
        return self.i2c.readfrom_mem(self.slvAddr, addr, 1)

if __name__ == '__main__':
	#初始化
	sensor = ADXL345(i2c)

	#getXYZ
	x,y,z = sensor.readXYZ()

	#getX/Y/Z
	x0 = sensor.readX()
	y0 = sensor.readY()
	z0 = sensor.readZ()