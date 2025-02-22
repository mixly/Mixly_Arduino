from microbit import *


class LCD1602:
    def __init__(self, lcd_i2c_addr):
        self.buf = bytearray(1)
        self.BK = 0x08
        self.RS = 0x00
        self.E = 0x04
        self.setcmd(0x33)
        sleep(5)
        self.send(0x30)
        sleep(5)
        self.send(0x20)
        sleep(5)
        self.setcmd(0x28)
        self.setcmd(0x0C)
        self.setcmd(0x06)
        self.setcmd(0x01)
        self.version = "1.0"
        self.lcd_i2c_addr = lcd_i2c_addr

    def setReg(self, dat):
        self.buf[0] = dat
        i2c.write(self.lcd_i2c_addr, self.buf)
        sleep(1)

    def send(self, dat):
        d = dat & 0xF0
        d |= self.BK
        d |= self.RS
        self.setReg(d)
        self.setReg(d | 0x04)
        self.setReg(d)

    def setcmd(self, cmd):
        self.RS = 0
        self.send(cmd)
        self.send(cmd << 4)

    def setdat(self, dat):
        self.RS = 1
        self.send(dat)
        self.send(dat << 4)

    def clear(self):
        self.setcmd(1)

    def backlight(self, on):
        if on:
            self.BK = 0x08
        else:
            self.BK = 0
        self.setdat(0)

    def on(self):
        self.setcmd(0x0C)

    def off(self):
        self.setcmd(0x08)

    def char(self, ch, x=-1, y=0):
        if x >= 0:
            a = 0x80
            if y > 0:
                a = 0xC0
            a += x
            self.setcmd(a)
        self.setdat(ch)

    def puts(self, s, x=0, y=0):
        if len(s) > 0:
            self.char(ord(s[0]), x, y)
            for i in range(1, len(s)):
                self.char(ord(s[i]))

    def mixly_puts(self, s, x=1, y=1):
        s = str(s)
        x = x - 1
        y = y - 1
        self.puts(self, s, x, y)

    def mixly_puts_two_lines(self, line1, line2):
        line1 = str(line1)
        line2 = str(line2)
        self.puts(self, line1, 0, 0)
        self.puts(self, line2, 0, 1)
