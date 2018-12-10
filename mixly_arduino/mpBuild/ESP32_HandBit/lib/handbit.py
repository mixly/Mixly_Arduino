from machine import *
import time
import esp
import ustruct
from neopixel import NeoPixel
import mpython
from ssd1106 import SSD1106_I2C

class Button:
    def __init__(self, pin):
        from machine import Pin
        self.pin = Pin(pin, Pin.IN)

    def get_presses(self, delay = 1):
        last_time, last_state, presses = time.time(), 0, 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 0 and self.pin.value() == 1:
                last_state = 1
            if last_state == 1 and self.pin.value() == 0:
                last_state, presses = 0, presses + 1
        return presses

    def is_pressed(self):
        return self.pin.value() == 0

    def was_pressed(self):
        last_state = self.pin.value()
        time.sleep_ms(15)
        if last_state == 1 and self.pin.value() == 0:
            return True
        return False

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)

class MyPin(Pin):
    def write_digital(self,val):
        self.init(Pin.OUT)
        self.value(val)

    def read_digital(self):
        self.init(Pin.IN)
        return self.value()

    def write_analog(self,val):
        id = int(str(self)[4:-1]) #unsafe!
        self = PWM(Pin(id),duty=val)

    def dac_write(self,val):
        id = int(str(self)[4:-1]) #unsafe!
        self = DAC(Pin(id)).write(val)    

    def read_analog(self):
        id = int(str(self)[4:-1]) #unsafe!
        self = ADC(Pin(id))
        return self.read()

    def set_frequency(self,val):
        id = int(str(self)[4:-1])
        self = PWM(Pin(id),freq=val)

    def is_touched(self):
        id = int(str(self)[4:-1]) #unsafe!
        if id in (0,2,4,12,13,14,15,27,32,33):
            # print(TouchPad(Pin(id)).read())
            return (TouchPad(Pin(id)).read() - 150 < 0)
        else:
            self.init(Pin.IN)
            return self.value() == 1

def mixgo_get_brightness():
    return ADCSensor(pin = 39).read()

def mixgo_get_soundlevel():
    return ADCSensor(pin = 36).read()

class Accelerometer():
    """  """
    def __init__(self):
        self.addr = 38
        self.i2c = i2c
        self.i2c.writeto(self.addr, b'\x0F\x08')    # set resolution = 10bit
        self.i2c.writeto(self.addr, b'\x11\x00')    # set power mode = normal

    def get_a_x(self):
        self.i2c.writeto(self.addr, b'\x02', False)
        buf = self.i2c.readfrom(self.addr, 2)
        x = ustruct.unpack('h', buf)[0]
        return x / 4 / 4096

    def get_a_y(self):
        self.i2c.writeto(self.addr, b'\x04', False)
        buf = self.i2c.readfrom(self.addr, 2)
        y = ustruct.unpack('h', buf)[0]
        return y / 4 / 4096

    def get_a_z(self):
        self.i2c.writeto(self.addr, b'\x06', False)
        buf = self.i2c.readfrom(self.addr, 2)
        z = ustruct.unpack('h', buf)[0]
        return z / 4 / 4096


class Font(object):
    def __init__(self, font_address=0x300000):
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


class OLED(SSD1106_I2C):
    """ 128x64 oled display """
    def __init__(self):
        super().__init__(128, 64, i2c)
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

i2c = I2C(scl=Pin(22), sda=Pin(23), freq=400000)

accelerometer = Accelerometer()

oled = OLED()

button_a = Button(0)
button_b = Button(2)

# 3 rgb leds
rgb = NeoPixel(Pin(17, Pin.OUT), 3, 3, 1)
rgb.write()

touch1 = MyPin(27)
touch2 = MyPin(14)
touch3 = MyPin(12)
touch4 = MyPin(13)
touch5 = MyPin(15)
touch6 = MyPin(14)