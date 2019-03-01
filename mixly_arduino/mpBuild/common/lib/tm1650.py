from machine import I2C, Pin

COMMAND_I2C_ADDRESS = 0x24
DISPLAY_I2C_ADDRESS = 0x34

buf = (0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F,0x77,0x7C,0x39,0x5E,0x79,0x71)

class TM1650():
    def __init__(self, i2c):
        self._intensity = 3
        self.dbuf = [0, 0, 0, 0]
        self.tbuf = bytearray(1)
        self.i2c = i2c
        self.on()

    def intensity(self, dat = -1):
        if dat < 0 or dat > 8:
            return self._intensity
        if dat == 0:
            self.off()
        else:
            self._intensity = dat
            self.cmd((dat<<4)|0x01)

    def cmd(self, c):
        self.tbuf[0] = c
        self.i2c.writeto(COMMAND_I2C_ADDRESS, self.tbuf)

    def dat(self, bit, d):
        self.tbuf[0] = d
        self.i2c.writeto(DISPLAY_I2C_ADDRESS + (bit%4), self.tbuf)

    def showbit(self, num, bit = 0):
        self.dbuf[bit%4] = buf[num%16]
        self.dat(bit, buf[num%16])

    def on(self):
        self.cmd((self._intensity<<4)|0x01)

    def off(self):
        self._intensity = 0
        self.cmd(0)

    def tm1650_on(self):
        self.cmd((self._intensity<<4)|0x01)

    def tm1650_off(self):
        self._intensity = 0
        self.cmd(0)

    def tm1650_show_num(self, num):
        if num < 0:
            self.dat(0, 0x40)   # '-'
            num = -num
        else:
            self.showbit((num // 1000) % 10)
        self.showbit(num % 10, 3)
        self.showbit((num // 10) % 10, 2)
        self.showbit((num // 100) % 10, 1)

    def tm1650_show_hex(self, num):
        if num < 0:
            self.dat(0, 0x40)   # '-'
            num = -num
        else:
            self.showbit((num >> 12) % 16)
        self.showbit(num % 16, 3)
        self.showbit((num >> 4) % 16, 2)
        self.showbit((num >> 8) % 16, 1)
        
    def tm1650_show_dot(self, bit = 1, show = True):
        if show:
            self.dat(bit, self.dbuf[bit] | 0x80)
        else:
            self.dat(bit, self.dbuf[bit] & 0x7F)

    def tm1650_clear(self):
        for i in range(4):
            self.dat(i, 0)
        self.dbuf = [0, 0, 0, 0]

# _TubeTab = [
#     0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 
#     0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71, 0x00, 0x40]

# class TM1650(object):
#     def __init__(self,i2c):
#         self.i2c = i2c
#         self.i2c.write(0x24, bytearray([0x01]))

#     # def tm1650Init(self):
#     #     self.i2c.write(0x24, bytearray([0x01]))

#     def tm1650_show_uint(self,x):
#         charTemp = [0, 0, 0, 0]
#         x = (x if x < 10000 else 9999)
#         charTemp[3] = x%10
#         charTemp[2] = (x//10)%10
#         charTemp[1] = (x//100)%10
#         charTemp[0] = (x//1000)%10
#         if x < 10:
#             charTemp[2] = 0x10
#         elif x < 100:
#             charTemp[1] = 0x10
#         elif x < 1000:
#             charTemp[0] = 0x10
#         for i in range(0, 4):
#             self.i2c.write(0x34+i, bytearray([_TubeTab[charTemp[i]]]))

#     def tm1650_show_number(self,x):
#         x = round(x)
#         if x >= 0:
#             tm1650_show_uint(x)
#         else:
#             temp = (x if x > -999 else -999)
#             temp = abs(temp)
#             tm1650_show_uint(temp)
#             if temp < 10:
#                 self.i2c.write(0x36, bytearray([_TubeTab[0x11]]))
#             elif temp < 100:
#                 self.i2c.write(0x35, bytearray([_TubeTab[0x11]]))
#             elif temp < 1000:
#                 self.i2c.write(0x34, bytearray([_TubeTab[0x11]]))

#     def tm1650_clear(self):
#         for i in range(0, 4):
#             self.i2c.write(0x34+i, bytearray([_TubeTab[0x10]]))