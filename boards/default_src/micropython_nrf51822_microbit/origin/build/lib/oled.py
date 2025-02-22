from microbit import *

class OLED12864_I2C():
    def __init__(self):
        cmd = [
            [0xAE],           # SSD1306_DISPLAYOFF
            [0xA4],           # SSD1306_DISPLAYALLON_RESUME
            [0xD5, 0xF0],     # SSD1306_SETDISPLAYCLOCKDIV
            [0xA8, 0x3F],     # SSD1306_SETMULTIPLEX
            [0xD3, 0x00],     # SSD1306_SETDISPLAYOFFSET
            [0 | 0x0],        # line #SSD1306_SETSTARTLINE
            [0x8D, 0x14],     # SSD1306_CHARGEPUMP
            [0x20, 0x00],     # SSD1306_MEMORYMODE
            [0x21, 0, 127],   # SSD1306_COLUMNADDR
            [0x22, 0, 63],    # SSD1306_PAGEADDR
            [0xa0 | 0x1],     # SSD1306_SEGREMAP
            [0xc8],           # SSD1306_COMSCANDEC
            [0xDA, 0x12],     # SSD1306_SETCOMPINS
            [0x81, 0xCF],     # SSD1306_SETCONTRAST
            [0xd9, 0xF1],     # SSD1306_SETPRECHARGE
            [0xDB, 0x40],     # SSD1306_SETVCOMDETECT
            [0xA6],           # SSD1306_NORMALDISPLAY
            [0xd6, 1],        # zoom on
            [0xaf]            # SSD1306_DISPLAYON
        ]

        for c in cmd:
            self.command(c)
        self._ZOOM = 1
        self.ADDR = 0x3C
        self.screen = bytearray(1025)    # send byte plus pixels
        self.screen[0] = 0x40
    
    def command(self, c):
        i2c.write(self.ADDR, b'\xb7' + bytearray(c))

    def set_pos(self, col=0, page=0):
        self.command([0xb0 | page])    # page number
        # take upper and lower value of col * 2
        c = col * (self._ZOOM+1)
        c1, c2 = c & 0x0F, c >> 4
        self.command([0x00 | c1])    # lower start column address
        self.command([0x10 | c2])    # upper start column address

    def pixel(self, x, y, color=1, draw=1):
        page, shift_page = divmod(y, 8)
        ind = x * (self._ZOOM+1) + page * 128 + 1
        b = self.screen[ind] | (1 << shift_page) if color else self.screen[ind] & ~ (1 << shift_page)
        self.screen[ind] = b
        self.set_pos(x, page)
        if self._ZOOM:
            self.screen[ind+1]=b
            i2c.write(0x3c, bytearray([0x40, b, b]))
        else:
            i2c.write(0x3c, bytearray([0x40, b]))

    def zoom(self, d=1):
        self._ZOOM = 1 if d else 0
        self.command([0xd6, self._ZOOM])

    def invert(self, v=1):
        n = 0xa7 if v else 0xa6
        self.command([n])

    def clear(self, c=0):
        for i in range(1, 1025):
            self.screen[i] = 0
        self.draw()

    def draw(self):
        self.set_pos()
        i2c.write(self.ADDR, self.screen)

    def text(self, x, y, s, draw=1):
        for i in range(0, min(len(s), 12 - x)):
            for c in range(0, 5):
                col = 0
                for r in range(1, 6):
                    p = Image(s[i]).get_pixel(c, r - 1)
                    col = col | (1 << r) if (p != 0) else col
                ind = (x + i) * 5 * (self._ZOOM+1) + y * 128 + c*(self._ZOOM+1) + 1
                self.screen[ind] = col
                if self._ZOOM:
                    self.screen[ind + 1] = col
        self.set_pos(x * 5, y)
        ind0 = x * 5 * (self._ZOOM+1) + y * 128 + 1
        i2c.write(self.ADDR, b'@' + self.screen[ind0:ind + 1])

    def hline(self, x, y, l,c=1):
        d = 1 if l>0 else -1
        for i in range(x, x+l, d):
            self.pixel(i,y,c)

    def vline(self, x, y, l,c=1):
        d = 1 if l>0 else -1
        for i in range(y, y+l,d):
            self.pixel(x,i,c,0)

    def rect(self, x1,y1,x2,y2,c=1):
        self.hline(x1,y1,x2-x1+1,c)
        self.hline(x1,y2,x2-x1+1,c)
        self.vline(x1,y1,y2-y1+1,c)
        self.vline(x2,y1,y2-y1+1,c)

oled = OLED12864_I2C()