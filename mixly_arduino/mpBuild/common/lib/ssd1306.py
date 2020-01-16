from micropython import const
from machine import *
import sys
import framebuf
import time
import esp
import ustruct

_DISPLAY_BLINK_CMD = 0x80
_DISPLAY_BLINK_DISPLAYON = 0x01
_DISPLAY_CMD_BRIGHTNESS = 0xE0
_DISPLAY_OSCILATOR_ON = 0x21

SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_NORM_INV        = const(0xa6)
SET_DISP            = const(0xae)
SET_MEM_ADDR        = const(0x20)
SET_COL_ADDR        = const(0x21)
SET_PAGE_ADDR       = const(0x22)
SET_DISP_START_LINE = const(0x40)
SET_SEG_REMAP       = const(0xa0)
SET_MUX_RATIO       = const(0xa8)
SET_COM_OUT_DIR     = const(0xc0)
SET_DISP_OFFSET     = const(0xd3)
SET_COM_PIN_CFG     = const(0xda)
SET_DISP_CLK_DIV    = const(0xd5)
SET_PRECHARGE       = const(0xd9)
SET_VCOM_DESEL      = const(0xdb)
SET_CHARGE_PUMP     = const(0x8d)

currentBoard=""
if(sys.platform=="esp8266"):
  currentBoard="esp8266"
elif(sys.platform=="esp32"):
  currentBoard="esp32"
elif(sys.platform=="pyboard"):
  currentBoard="pyboard"


class SSD1306:
  def __init__(self, width, height, external_vcc):
    self.width = width
    self.height = height
    self.external_vcc = external_vcc
    self.pages = self.height // 8
    self.buffer = bytearray(self.pages * self.width)
    self.framebuf = framebuf.FrameBuffer(self.buffer, self.width, self.height, framebuf.MVLSB)
    self.poweron()
    self.init_display()

  def init_display(self):
    for cmd in (
      SET_DISP | 0x00, # off
      SET_MEM_ADDR, 0x00, # horizontal
      SET_DISP_START_LINE | 0x00,
      SET_SEG_REMAP | 0x01,
      SET_MUX_RATIO, self.height - 1,
      SET_COM_OUT_DIR | 0x08,
      SET_DISP_OFFSET, 0x00,
      SET_COM_PIN_CFG, 0x02 if self.height == 32 else 0x12,
      SET_DISP_CLK_DIV, 0x80,
      SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,
      SET_VCOM_DESEL, 0x30, # 0.83*Vcc
      SET_CONTRAST, 0xff,
      SET_ENTIRE_ON,
      SET_NORM_INV,
      SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,
      SET_DISP | 0x01):
      self.write_cmd(cmd)
    self.fill(0)
    self.show()

  def poweroff(self):
    self.write_cmd(SET_DISP | 0x00)

  def contrast(self, contrast):
    self.write_cmd(SET_CONTRAST)
    self.write_cmd(contrast)

  def invert(self, invert):
    self.write_cmd(SET_NORM_INV | (invert & 1))

  def show(self):
    x0 = 0
    x1 = self.width - 1
    if self.width == 64:
      x0 += 32
      x1 += 32
    self.write_cmd(SET_COL_ADDR)
    self.write_cmd(x0)
    self.write_cmd(x1)
    self.write_cmd(SET_PAGE_ADDR)
    self.write_cmd(0)
    self.write_cmd(self.pages - 1)
    self.write_data(self.buffer)

  def fill(self, col):
    self.framebuf.fill(col)

  def pixel(self, x, y, col):
    self.framebuf.pixel(x, y, col)

  def scroll(self, dx, dy):
    self.framebuf.scroll(dx, dy)

  def text(self, string, x, y, col=1):
    self.framebuf.text(string, x, y, col)

  def hline(self, x, y, w, col):
    self.framebuf.hline(x, y, w, col)

  def vline(self, x, y, h, col):
    self.framebuf.vline(x, y, h, col)

  def line(self, x1, y1, x2, y2, col):
    self.framebuf.line(x1, y1, x2, y2, col)

  def rect(self, x, y, w, h, col):
    self.framebuf.rect(x, y, w, h, col)

  def fill_rect(self, x, y, w, h, col):
    self.framebuf.fill_rect(x, y, w, h, col)

  def blit(self, fbuf, x, y):
    self.framebuf.blit(fbuf, x, y)

class SSD1306_I2C_MID(SSD1306):
  def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False):
    self.i2c = i2c
    self.addr = addr
    self.temp = bytearray(2)
    super().__init__(width, height, external_vcc)

  def write_cmd(self, cmd):
    self.temp[0] = 0x80 # Co=1, D/C#=0
    self.temp[1] = cmd
    global currentBoard
    if currentBoard=="esp8266" or currentBoard=="esp32":
      self.i2c.writeto(self.addr, self.temp)
    elif currentBoard=="pyboard":
      self.i2c.send(self.temp,self.addr)

  def write_data(self, buf):
    self.temp[0] = self.addr << 1
    self.temp[1] = 0x40 # Co=0, D/C#=1
    global currentBoard
    if currentBoard=="esp8266" or currentBoard=="esp32":
      self.i2c.start()
      self.i2c.write(self.temp)
      self.i2c.write(buf)
      self.i2c.stop()
    elif currentBoard=="pyboard":
     self.i2c.mem_write(buf,self.addr,0x40)

  def poweron(self):
    pass

  def show_str(self,s1,s2,s3,s4):
    self.text(s1, 0 , 0)
    self.text(s2, 0 , 16)
    self.text(s3, 0 , 32)
    self.text(s4, 0 , 48)
    self.show()

  def show_rect(self,x,y,w,h,b):
    self.rect(x,y,w,h,b)
    self.show()  

  def show_fill_rect(self,x,y,w,h,b):
    self.fill_rect(x,y,w,h,b)
    self.show() 

  def show_vline(self,x,y,h,b):
    self.vline(x,y,h,b)
    self.show()     

  def show_hline(self,x,y,w,b):
    self.hline(x,y,w,b)
    self.show()

  def show_line(self,x,y,x2,y2,b):
    self.line(x,y,x2,y2,b)
    self.show()

class Font(object):
    def __init__(self, font_address=0x200000):
        self.font_address = font_address
        buffer = bytearray(18)
        esp.flash_read(self.font_address, buffer)
        self.header, \
            self.height, \
            self.width, \
            self.baseline, \
            self.x_height, \
            self.Y_height, \
            self.first_char,\
            self.last_char = ustruct.unpack('4sHHHHHHH', buffer)
        self.first_char_info_address = self.font_address + 18

    def GetCharacterData(self, c):
        uni = ord(c)
        if uni not in range(self.first_char, self.last_char):
            return None
        char_info_address = self.first_char_info_address + \
            (uni - self.first_char) * 6
        buffer = bytearray(6)
        esp.flash_read(char_info_address, buffer)
        ptr_char_data, len = ustruct.unpack('IH', buffer)   
        if (ptr_char_data) == 0 or (len == 0):
            return None
        buffer = bytearray(len)
        esp.flash_read(ptr_char_data + self.font_address, buffer)
        return buffer

class TextMode():
    normal = 1
    rev = 2
    trans = 3
    xor = 4

class SSD1306_I2C(SSD1306_I2C_MID):
    """ 128x64 oled display """
    def __init__(self,w,h,i):
        super().__init__(w,h,i)
        self.f = Font()
        if self.f is None:
            raise Exception('font load failed')

    def DispChar(self, s, x, y, mode=TextMode.normal):
        if self.f is None:
            return
        for c in s:
            data = self.f.GetCharacterData(c)
            if data is None:
                x = x + self.width
                continue
            width, bytes_per_line = ustruct.unpack('HH', data[:4])
            # print('character [%d]: width = %d, bytes_per_line = %d' % (ord(c)
            # , width, bytes_per_line))
            for h in range(0, self.f.height):
                w = 0
                i = 0
                while w < width:
                    mask = data[4 + h * bytes_per_line + i]
                    if (width - w) >= 8:
                        n = 8
                    else:
                        n = width - w
                    py = y + h
                    page = py >> 3
                    bit = 0x80 >> (py % 8)
                    for p in range(0, n):
                        px = x + w + p
                        c = 0
                        if (mask & 0x80) != 0:
                            if mode == TextMode.normal or \
                               mode == TextMode.trans:
                                c = 1
                            if mode == TextMode.rev:
                                c = 0
                            if mode == TextMode.xor:                               
                                c = self.buffer[page * 128 + px] & bit
                                if c != 0:
                                    c = 0
                                else:
                                    c = 1
                                print("px = %d, py = %d, c = %d" % (px, py, c))
                            super().pixel(px, py, c)
                        else:
                            if mode == TextMode.normal:
                                c = 0
                                super().pixel(px, py, c)
                            if mode == TextMode.rev:
                                c = 1
                                super().pixel(px, py, c)
                        mask = mask << 1
                    w = w + 8
                    i = i + 1
            x = x + width + 1

    def circle(self, x0, y0, radius, c):
            # Circle drawing function.  Will draw a single pixel wide circle with
            # center at x0, y0 and the specified radius.
            f = 1 - radius
            ddF_x = 1
            ddF_y = -2 * radius
            x = 0
            y = radius
            super().pixel(x0, y0 + radius, c)
            super().pixel(x0, y0 - radius, c)
            super().pixel(x0 + radius, y0, c)
            super().pixel(x0 - radius, y0, c)
            while x < y:
                if f >= 0:
                    y -= 1
                    ddF_y += 2
                    f += ddF_y
                x += 1
                ddF_x += 2
                f += ddF_x
                super().pixel(x0 + x, y0 + y, c)
                super().pixel(x0 - x, y0 + y, c)
                super().pixel(x0 + x, y0 - y, c)
                super().pixel(x0 - x, y0 - y, c)
                super().pixel(x0 + y, y0 + x, c)
                super().pixel(x0 - y, y0 + x, c)
                super().pixel(x0 + y, y0 - x, c)
                super().pixel(x0 - y, y0 - x, c)


    def fill_circle(self, x0, y0, radius, c):
        # Filled circle drawing function.  Will draw a filled circule with
        # center at x0, y0 and the specified radius.
        super().vline(x0, y0 - radius, 2*radius + 1, c)
        f = 1 - radius
        ddF_x = 1
        ddF_y = -2 * radius
        x = 0
        y = radius
        while x < y:
            if f >= 0:
                y -= 1
                ddF_y += 2
                f += ddF_y
            x += 1
            ddF_x += 2
            f += ddF_x
            super().vline(x0 + x, y0 - y, 2*y + 1, c)
            super().vline(x0 + y, y0 - x, 2*x + 1, c)
            super().vline(x0 - x, y0 - y, 2*y + 1, c)
            super().vline(x0 - y, y0 - x, 2*x + 1, c)
            

    def triangle(self, x0, y0, x1, y1, x2, y2, c):
            # Triangle drawing function.  Will draw a single pixel wide triangle
            # around the points (x0, y0), (x1, y1), and (x2, y2).
            super().line(x0, y0, x1, y1, c)
            super().line(x1, y1, x2, y2, c)
            super().line(x2, y2, x0, y0, c)


    def fill_triangle(self, x0, y0, x1, y1, x2, y2, c):
        # Filled triangle drawing function.  Will draw a filled triangle around
        # the points (x0, y0), (x1, y1), and (x2, y2).
        if y0 > y1:
            y0, y1 = y1, y0
            x0, x1 = x1, x0
        if y1 > y2:
            y2, y1 = y1, y2
            x2, x1 = x1, x2
        if y0 > y1:
            y0, y1 = y1, y0
            x0, x1 = x1, x0
        a = 0
        b = 0
        y = 0
        last = 0
        if y0 == y2:
            a = x0
            b = x0
            if x1 < a:
                a = x1
            elif x1 > b:
                b = x1
            if x2 < a:
                a = x2
            elif x2 > b:
                b = x2
            super().hline(a, y0, b-a+1, c)
            return
        dx01 = x1 - x0
        dy01 = y1 - y0
        dx02 = x2 - x0
        dy02 = y2 - y0
        dx12 = x2 - x1
        dy12 = y2 - y1
        if dy01 == 0:
            dy01 = 1
        if dy02 == 0:
            dy02 = 1
        if dy12 == 0:
            dy12 = 1
        sa = 0
        sb = 0
        if y1 == y2:
            last = y1
        else:
            last = y1-1
        for y in range(y0, last+1):
            a = x0 + sa // dy01
            b = x0 + sb // dy02
            sa += dx01
            sb += dx02
            if a > b:
                a, b = b, a
            super().hline(a, y, b-a+1, c)
        sa = dx12 * (y - y1)
        sb = dx02 * (y - y0)
        while y <= y2:
            a = x1 + sa // dy12
            b = x0 + sb // dy02
            sa += dx12
            sb += dx02
            if a > b:
                a, b = b, a
            super().hline(a, y, b-a+1, c)
            y += 1
            

    def Bitmap(self, x, y, bitmap, w, h,c):
        byteWidth = int((w + 7) / 8)
        for j in range(h):
            for i in range(w):
                if bitmap[int(j * byteWidth + i / 8)] & (128 >> (i & 7)):
                    super().pixel(x+i, y+j, c)


    def drawCircleHelper(self, x0, y0, r, cornername, c):
            f = 1 - r
            ddF_x = 1
            ddF_y = -2 * r 
            x = 0
            y = r
            
            tf = f
            while x < y:
            
                if (f >= 0):
                    # y--   y -= 1 below
                    y -= 1
                    ddF_y += 2
                    f += ddF_y      
            #   x++ 
                ddF_x += 2
                f += ddF_x
                
                if (cornername & 0x4):
                    super().pixel(x0 + x, y0 + y, c)
                    super().pixel(x0 + y, y0 + x, c)
                
                if (cornername & 0x2):
                    super().pixel(x0 + x, y0 - y, c)
                    super().pixel(x0 + y, y0 - x, c)
            
                if (cornername & 0x8):
                    super().pixel(x0 - y, y0 + x, c)
                    super().pixel(x0 - x, y0 + y, c)
                
                if (cornername & 0x1):
                    super().pixel(x0 - y, y0 - x, c)
                    super().pixel(x0 - x, y0 - y, c)
                x += 1

    
    def RoundRect( self, x, y, w, h, r, c):
        self.hline(x + r , y , w - 2 * r , c)
        self.hline(x + r , y + h - 1, w - 2 * r , c)
        self.vline(x, y + r, h - 2 * r , c)
        self.vline(x + w - 1, y + r , h - 2 * r , c)
        
        self.drawCircleHelper(x + r  , y + r , r , 1, c)
        self.drawCircleHelper(x + w - r - 1, y + r  , r , 2, c)
        self.drawCircleHelper(x + w - r - 1, y + h - r - 1, r , 4, c)
        self.drawCircleHelper(x + r  , y + h - r - 1, r , 8, c)

    def show_str(self, s1, s2, s3, s4):
        self.DispChar(s1,0,0)
        self.DispChar(s2,0,16)
        self.DispChar(s3,0,32)
        self.DispChar(s4,0,48)
        self.show()

    def show_rect(self, x, y, w, h, c):
        self.rect(x, y, w, h, c)
        self.show()

    def show_fill_rect(self, x, y, w, h, c):
        self.fill_rect(x, y, w, h, c)
        self.show()

    def show_hline(self, x, y, l, c):
        self.hline(x, y, l, c)
        self.show()

    def show_vline(self, x, y, l, c):
        self.vline(x, y, l, c)
        self.show()

    def show_line(self, x1, y1, x2, y2, c):
        self.line(x1, y1, x2, y2, c)
        self.show() 

    def show_circle(self, x0, y0, radius, c):
        self.circle(x0, y0, radius, c)
        self.show()

    def show_fill_circle(self, x0, y0, radius, c):
        self.fill_circle(x0, y0, radius, c)
        self.show()

    def show_triangle(self, x0, y0, x1, y1, x2, y2, c):
        self.triangle(x0, y0, x1, y1, x2, y2, c)
        self.show()

    def show_fill_triangle(self, x0, y0, x1, y1, x2, y2, c):   
        self.fill_triangle(x0, y0, x1, y1, x2, y2, c)
        self.show()
    
    def show_fill(self, flag): 
        self.fill(flag)
        self.show()

    def show_pixel(self, x, y, c=1):
        self.pixel(x, y, c)
        self.show()

    def show_bitmap(self, x, y, bitmap, w, h, c=1):
        self.Bitmap(x, y, bitmap, w, h, c)
        self.show()