from machine import Pin, I2C
import framebuf
from micropython import const
import ustruct
import utime

_DISPLAY_BLINK_CMD = 0x80
_DISPLAY_BLINK_DISPLAYON = 0x01
_DISPLAY_CMD_BRIGHTNESS = 0xE0
_DISPLAY_OSCILATOR_ON = 0x21

class Image:
    def __init__(self,str=""):
        if str.find(',') != -1:
            rows = [] 
            for row in str.split(','):
                new_row = ['0'] * 16 
                for hex in row:
                    idx = int(hex, 16)
                    new_row[idx] = '1'
                rows.append(''.join(new_row))
            self.str = ':'.join(rows)
        else:
            self.str = str

    def __add__(self,other):
        img = Image()
        l1 = self.str.split(':')
        l2 = other.str.split(':')
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]>l1[i][j]:
                    s += l2[i][j]
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        #print(img.str)
        #self.str = ":".join(l1)
        return img

    def __sub__(self,other):
        img = Image()
        l1 = self.str.split(':')
        # print(l1)
        l2 = other.str.split(':')
        # print(l2)
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]=='1' and l1[i][j]=='1':
                    s += '0'
                    # print(1)
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        # print(img.str)
        #self.str = ":".join(l1)
        return img

    def height(self):
        start=-1
        check_start=0
        check_end=7
        end=-1
        l = self.str.split(':')
        while start==-1:
            for i in range(16):
                if l[check_start][i] == '1':
                    start=check_start
            check_start=check_start+1
            if check_start>7:
                return 0
                break
        while end==-1:
            for i in range(16):
                if l[check_end][i] == '1':
                    end=check_end
            check_end=check_end-1
        return end-start+1 

    def width(self):
        start=-1
        check_start=0
        check_end=15
        end=-1
        l = self.str.split(':')
        while start==-1:
            for i in range(8):
                if l[i][check_start] == '1':
                    start=check_start
            check_start=check_start+1
            if check_start>15:
                return 0
                break
        while end==-1:
            for i in range(8):
                if l[i][check_end] == '1':
                    end=check_end
            check_end=check_end-1
        return end-start+1      

    def copy(self):
        return self   

    def invert(self):
        l = self.str.split(':')
        a=''
        for i in range(8):
                for j in range(16):
                    if l[i][j] == '1':
                        a=a+'0'
                    else:
                        a=a+'1'
                if i<7:
                    a=a+':'

        return Image(a)    


        
    def shift_up(self, num):
        if num<0:
            return self.shift_down(-num)
        elif num>7:
            return Image(',,,,,,,')
        else:    
            l = self.str.split(':')
            a=''
            for i in range(8):
                if i<8-num:
                    a=a+l[i+num]
                else:
                    a=a+'0000000000000000'    
                if i<7:
                    a=a+':'    
            b=Image(a)          
            return b

    def shift_down(self, num):
        if num<0:
            return self.shift_up(-num)
        elif num>7:
            return Image(',,,,,,,')
        else:    
            l = self.str.split(':')
            a=''
            for i in range(8):
                if i<num:
                    a=a+'0000000000000000'
                else:
                    a=a+l[i-num]    
                if i<7:
                    a=a+':'    
            b=Image(a)          
            return b        

    def shift_left(self, num):
        if num<0:
            return self.shift_right(-num)
        elif num>15:
            return Image(',,,,,,,')
        else:    
            l = self.str.split(':')
            a=''
            for i in range(8):
                for j in range(16-num):
                    a=a+l[i][j+num]
                for j in range(num):
                    a=a+'0'                
                if i<7:
                    a=a+':'    
            b=Image(a)          
            return b

    def shift_right(self, num):
        if num<0:
            return self.shift_left(-num)
        elif num>15:
            return Image(',,,,,,,')
        else:    
            l = self.str.split(':')
            a=''
            for i in range(8):
                for j in range(num):
                    a=a+'0' 
                for j in range(num,16):
                    a=a+l[i][j-num]                               
                if i<7:
                    a=a+':'    
            b=Image(a)          
            return b        




class Display:
    """The base class for all Display-based backpacks and wings."""
    WIDTH = 16
    HEIGHT = 8
    FORMAT = framebuf.MONO_HMSB
    FB_BPP = 1

    def __init__(self, i2c, address=0x70):
        # self.i2c = i2c
        # self.address = address
        # self._temp = bytearray(1)
        # self.buffer = bytearray(17)
        # #self.buffer[0] = 0x00
        # self.framebuf = framebuf.FrameBuffer(self.buffer, 16, 8, framebuf.MONO_HMSB)
        # self.fill(0)
        # self._write_cmd(_DISPLAY_OSCILATOR_ON)
        # self.blink_rate(0)
        # self.brightness(15)
        self.i2c = i2c
        self.address = address
        self._temp = bytearray(1)
        self.buffer = bytearray(16)
        self.buffer2 = bytearray(17)
        self.buffer2[0] = 0x00
        self._write_cmd(_DISPLAY_OSCILATOR_ON)
        self.blink_rate(0)
        self.brightness(5)
        self._fb_buffer = bytearray(self.WIDTH*self.HEIGHT*self.FB_BPP // 8)
        self.framebuf = framebuf.FrameBuffer(self._fb_buffer, self.WIDTH, self.HEIGHT, self.FORMAT)
        self.framebuf.fill(0)
        self._pixel = self.framebuf.pixel
        self.fill = self.framebuf.fill

    def _write_cmd(self, byte):
        """Send a command."""
        self._temp[0] = byte
        self.i2c.writeto(self.address, self._temp)

    def blink_rate(self, rate=None):
        """Get or set the blink rate."""
        if rate is None:
            return self._blink_rate
        rate = rate & 0x02
        self._blink_rate = rate
        self._write_cmd(_DISPLAY_BLINK_CMD |
                        _DISPLAY_BLINK_DISPLAYON | rate << 1)

    def brightness(self, brightness):
        """Get or set the brightness."""
        if brightness is None:
            return self._brightness
        brightness = brightness & 0x0F
        self._brightness = brightness
        self._write_cmd(_DISPLAY_CMD_BRIGHTNESS | brightness)

    def _copy_buf(self):
        for y in range(16):
            self.buffer[y] = self._fb_buffer[y]
            # print("self.buffer[{}]: {}".format(y,self.buffer[y]))
        # for x in range(8):
        #     self.buffer[x] = self._fb_buffer[7-x]
    
    def _show(self):
        self._copy_buf()
        i2c.writeto_mem(self.address, 0x00, self.buffer)

    # def _show(self):
    #     """Actually send all the changes to the device."""
    #     self.i2c.writeto(self.address, self.buffer)
    def get_screenimage(self):
        a=''
        for i in range(8):
                for j in range(16):
                    if self._pixel(j, i) ==1:
                        a=a+'1'
                    else:
                        a=a+'0'
                if i<7:
                    a=a+':'
                    
        return Image(a)

    def fill(self, color):
        """Fill the display with given color."""
        fill = 0xff if color else 0x00
        for i in range(16):
            self.buffer[i + 1] = fill

    def text(self,string,x,y):
        self.framebuf.text(string,x,y,1)

    def show(self, data, delay=200, time=400):        
        self.fill(0)
        if type(data)==str or type(data)==int:
            DISPLAY_WIDTH  = 16      # Display width in pixels.
            DISPLAY_HEIGHT = 8       # Display height in pixels.
            # Initialize LED matrix.
            matrix = Display(i2c)
            #matrix.clear()
            # Initialize font renderer using a helper function to flip the Y axis
            # when rendering so the origin is in the upper left.
            def matrix_pixel(x, y):
                matrix._pixel(x, y, 1)
            with BitmapFont(DISPLAY_WIDTH, DISPLAY_HEIGHT, matrix_pixel) as bf:
                # Global state:
                for msg in data:
                    matrix.clear()
                    pos = DISPLAY_WIDTH                 # X position of the message start.
                    message_width = bf.width(msg)   # Message width in pixels.
                    bf.text(msg, 5, 0) #change X position
                    matrix._show()
                    if len(data)>1:
                        utime.sleep_ms(delay)    
        
        elif type(data)==list or type(data)==tuple:
            for i in data:
                if type(i)!=str and type(i)!=type(Image.HEART):
                    pass
            for i in data:
                self.show(i)
                utime.sleep_ms(delay)             
        elif type(data)==type(Image.HEART):
            l = data.str.split(':')
            for i in range(8):
                for j in range(16):
                    if l[i][j] == '1':
                        self._pixel(j, i, 1)
                    else:
                        self._pixel(j, i, 0)
            self._show()
    def showstatic(self, data):
        self.fill(0)
        if type(data)==str:
            if len(data)>3:
                data=data[0:3]
            DISPLAY_WIDTH  = 16      # Display width in pixels.
            DISPLAY_HEIGHT = 8       # Display height in pixels.
            # Initialize LED matrix.
            matrix = Display(i2c)
            #matrix.clear()
            # Initialize font renderer using a helper function to flip the Y axis
            # when rendering so the origin is in the upper left.
            def matrix_pixel(x, y):
                matrix._pixel(x, y, 1)
            with BitmapFont(DISPLAY_WIDTH, DISPLAY_HEIGHT, matrix_pixel) as bf:
                #matrix.clear()
                pos = DISPLAY_WIDTH                 # X position of the message start.
                message_width = bf.width(data)   # Message width in pixels.
                if len(data)==3:
                    bf.text(data, 0, 0) #change X position
                elif len(data)==2:
                    bf.text(data, 2, 0)
                elif len(data)==1:
                    bf.text(data, 5, 0)         
                matrix._show()
                
                        

    def show_old(self, data, time=400):#previous show string with the wide font
        self.fill(0)
        if type(data)==str:
            # print("str")
            for s in data:
                print(s)
                self.fill(0)
                self.text(s,4,0)
                self._show()
                sleep(time)
        elif type(data)==int:
            pass
        elif type(data)==type(Image.HEART):
            # print("Image")
            l = data.str.split(':')
            for i in range(8):
                for j in range(16):
                    if l[i][j] == '1':
                        self._pixel(j, i, 1)
                    else:
                        self._pixel(j, i, 0)
                    #print(l[i][j])
            self._show()        

    def scroll_old(self, data, time=50):
        num = -len(data)*8
        for i in range(15,num,-1):
            display.fill(0)
            display.text(data,i,0)
            sleep(time)
            display._show()

    def scroll(self, data, speed=120):
        DISPLAY_WIDTH  = 16      # Display width in pixels.
        DISPLAY_HEIGHT = 8       # Display height in pixels.
        # Initialize LED matrix.
        matrix = Display(i2c)
        matrix.clear()
        # Initialize font renderer using a helper function to flip the Y axis
        # when rendering so the origin is in the upper left.
        if type(data)==int:
            self.show(data)
        else:    
            def matrix_pixel(x, y):
                matrix._pixel(x, y, 1)
            with BitmapFont(DISPLAY_WIDTH, DISPLAY_HEIGHT, matrix_pixel) as bf:
                # Global state:
                pos = DISPLAY_WIDTH                 # X position of the message start.
                message_width = bf.width(data)   # Message width in pixels.
                last = utime.ticks_ms()             # Last frame millisecond tick time.
                speed_ms = 1200 / speed / 1000.0           # Scroll speed in pixels/ms.
                # Main loop:
                while True:
                    # Compute the time delta in milliseconds since the last frame.
                    current = utime.ticks_ms()
                    delta_ms = utime.ticks_diff(current, last)
                    last = current
                    # Compute position using speed and time delta.
                    pos -= speed_ms*delta_ms
                    if pos < -message_width:
                        pos = DISPLAY_WIDTH
                        return
                    # Clear the matrix and draw the text at the current position.
                    matrix.fill(0)
                    bf.text(data, int(pos), 0)
                    # Update the matrix LEDs.
                    matrix._show()
                    # Sleep a bit to give USB mass storage some processing time (quirk
                    # of SAMD21 firmware right now).
                    #utime.sleep_ms(200)        

    def rect(self, x, y, w, h, c):
        self.fill(0)
        self.framebuf.rect(x, y, w, h, c)
        self._show()

    def line(self,x1,x2,y1,y2,c):
        self.fill(0)
        self.framebuf.line(x1,x2,y1,y2,c)
        self._show()

    def _pixel(self, x, y, color=None):
        """Set a single pixel in the frame buffer to specified color."""
        mask = 1 << x
        if color is None:
            return bool((self.buffer[y + 1] | self.buffer[y + 2] << 8) & mask)
        if color:
            self.buffer[y * 2 + 1] |= mask & 0xff
            self.buffer[y * 2 + 2] |= mask >> 8
        else:
            self.buffer[y * 2 + 1] &= ~(mask & 0xff)
            self.buffer[y * 2 + 2] &= ~(mask >> 8)

    def set_pixel(self, x, y, flag):
       #print(x,y,z)
        self._pixel(x, y, flag)
        self._show()

    def get_pixel(self, x, y):
       #print(x,y,z)
        return self._pixel(x, y)
            
    def clear(self):
        self.fill(0)
        self._show()

    def set_brightness(self, brightness):
        self.brightness(brightness)
        self._show()
    
    def get_brightness(self):
        return self.brightness(None)

    def showsomething(self, MESSAGE):
        DISPLAY_WIDTH  = 16      # Display width in pixels.
        DISPLAY_HEIGHT = 8       # Display height in pixels.
        # Initialize LED matrix.
        matrix = Display(i2c)
        #matrix.clear()
        # Initialize font renderer using a helper function to flip the Y axis
        # when rendering so the origin is in the upper left.
        def matrix_pixel(x, y):
            matrix._pixel(x, y, 1)
        with BitmapFont(DISPLAY_WIDTH, DISPLAY_HEIGHT, matrix_pixel) as bf:
            # Global state:
            for msg in MESSAGE:
                matrix.clear()
                pos = DISPLAY_WIDTH                 # X position of the message start.
                message_width = bf.width(msg)   # Message width in pixels.
                bf.text(msg, 5, 0) #change X position
                matrix._show()
                utime.sleep_ms(400)    
        
class BitmapFont:
    def __init__(self, width, height, pixel):
        self._width = width
        self._height = height
        self._pixel = pixel
        self._font_code=[5, 8, 0, 0, 0, 0, 0, 62, 91, 79, 91, 62, 62, 107, 79, 107, 62, 28, 62, 124, 62, 28, 24, 60, 126, 60, 24, 28, 87, 125, 87, 28, 28, 94, 127, 94, 28, 0, 24, 60, 24, 0, 255, 231, 195, 231, 255, 0, 24, 36, 24, 0, 255, 231, 219, 231, 255, 48, 72, 58, 6, 14, 38, 41, 121, 41, 38, 64, 127, 5, 5, 7, 64, 127, 5, 37, 63, 90, 60, 231, 60, 90, 127, 62, 28, 28, 8, 8, 28, 28, 62, 127, 20, 34, 127, 34, 20, 95, 95, 0, 95, 95, 6, 9, 127, 1, 127, 0, 102, 137, 149, 106, 96, 96, 96, 96, 96, 148, 162, 255, 162, 148, 8, 4, 126, 4, 8, 16, 32, 126, 32, 16, 8, 8, 42, 28, 8, 8, 28, 42, 8, 8, 30, 16, 16, 16, 16, 12, 30, 12, 30, 12, 48, 56, 62, 56, 48, 6, 14, 62, 14, 6, 0, 0, 0, 0, 0, 0, 0, 95, 0, 0, 0, 7, 0, 7, 0, 20, 127, 20, 127, 20, 36, 42, 127, 42, 18, 35, 19, 8, 100, 98, 54, 73, 86, 32, 80, 0, 8, 7, 3, 0, 0, 28, 34, 65, 0, 0, 65, 34, 28, 0, 42, 28, 127, 28, 42, 8, 8, 62, 8, 8, 0, 128, 112, 48, 0, 8, 8, 8, 8, 8, 0, 0, 96, 96, 0, 32, 16, 8, 4, 2, 62, 81, 73, 69, 62, 0, 66, 127, 64, 0, 114, 73, 73, 73, 70, 33, 65, 73, 77, 51, 24, 20, 18, 127, 16, 39, 69, 69, 69, 57, 60, 74, 73, 73, 49, 65, 33, 17, 9, 7, 54, 73, 73, 73, 54, 70, 73, 73, 41, 30, 0, 0, 20, 0, 0, 0, 64, 52, 0, 0, 0, 8, 20, 34, 65, 20, 20, 20, 20, 20, 0, 65, 34, 20, 8, 2, 1, 89, 9, 6, 62, 65, 93, 89, 78, 124, 18, 17, 18, 124, 127, 73, 73, 73, 54, 62, 65, 65, 65, 34, 127, 65, 65, 65, 62, 127, 73, 73, 73, 65, 127, 9, 9, 9, 1, 62, 65, 65, 81, 115, 127, 8, 8, 8, 127, 0, 65, 127, 65, 0, 32, 64, 65, 63, 1, 127, 8, 20, 34, 65, 127, 64, 64, 64, 64, 127, 2, 28, 2, 127, 127, 4, 8, 16, 127, 62, 65, 65, 65, 62, 127, 9, 9, 9, 6, 62, 65, 81, 33, 94, 127, 9, 25, 41, 70, 38, 73, 73, 73, 50, 3, 1, 127, 1, 3, 63, 64, 64, 64, 63, 31, 32, 64, 32, 31, 63, 64, 56, 64, 63, 99, 20, 8, 20, 99, 3, 4, 120, 4, 3, 97, 89, 73, 77, 67, 0, 127, 65, 65, 65, 2, 4, 8, 16, 32, 0, 65, 65, 65, 127, 4, 2, 1, 2, 4, 64, 64, 64, 64, 64, 0, 3, 7, 8, 0, 32, 84, 84, 120, 64, 127, 40, 68, 68, 56, 56, 68, 68, 68, 40, 56, 68, 68, 40, 127, 56, 84, 84, 84, 24, 0, 8, 126, 9, 2, 24, 164, 164, 156, 120, 127, 8, 4, 4, 120, 0, 68, 125, 64, 0, 32, 64, 64, 61, 0, 127, 16, 40, 68, 0, 0, 65, 127, 64, 0, 124, 4, 120, 4, 120, 124, 8, 4, 4, 120, 56, 68, 68, 68, 56, 252, 24, 36, 36, 24, 24, 36, 36, 24, 252, 124, 8, 4, 4, 8, 72, 84, 84, 84, 36, 4, 4, 63, 68, 36, 60, 64, 64, 32, 124, 28, 32, 64, 32, 28, 60, 64, 48, 64, 60, 68, 40, 16, 40, 68, 76, 144, 144, 144, 124, 68, 100, 84, 76, 68, 0, 8, 54, 65, 0, 0, 0, 119, 0, 0, 0, 65, 54, 8, 0, 2, 1, 2, 4, 2, 60, 38, 35, 38, 60, 30, 161, 161, 97, 18, 58, 64, 64, 32, 122, 56, 84, 84, 85, 89, 33, 85, 85, 121, 65, 34, 84, 84, 120, 66, 33, 85, 84, 120, 64, 32, 84, 85, 121, 64, 12, 30, 82, 114, 18, 57, 85, 85, 85, 89, 57, 84, 84, 84, 89, 57, 85, 84, 84, 88, 0, 0, 69, 124, 65, 0, 2, 69, 125, 66, 0, 1, 69, 124, 64, 125, 18, 17, 18, 125, 240, 40, 37, 40, 240, 124, 84, 85, 69, 0, 32, 84, 84, 124, 84, 124, 10, 9, 127, 73, 50, 73, 73, 73, 50, 58, 68, 68, 68, 58, 50, 74, 72, 72, 48, 58, 65, 65, 33, 122, 58, 66, 64, 32, 120, 0, 157, 160, 160, 125, 61, 66, 66, 66, 61, 61, 64, 64, 64, 61, 60, 36, 255, 36, 36, 72, 126, 73, 67, 102, 43, 47, 252, 47, 43, 255, 9, 41, 246, 32, 192, 136, 126, 9, 3, 32, 84, 84, 121, 65, 0, 0, 68, 125, 65, 48, 72, 72, 74, 50, 56, 64, 64, 34, 122, 0, 122, 10, 10, 114, 125, 13, 25, 49, 125, 38, 41, 41, 47, 40, 38, 41, 41, 41, 38, 48, 72, 77, 64, 32, 56, 8, 8, 8, 8, 8, 8, 8, 8, 56, 47, 16, 200, 172, 186, 47, 16, 40, 52, 250, 0, 0, 123, 0, 0, 8, 20, 42, 20, 34, 34, 20, 42, 20, 8, 85, 0, 85, 0, 85, 170, 85, 170, 85, 170, 255, 85, 255, 85, 255, 0, 0, 0, 255, 0, 16, 16, 16, 255, 0, 20, 20, 20, 255, 0, 16, 16, 255, 0, 255, 16, 16, 240, 16, 240, 20, 20, 20, 252, 0, 20, 20, 247, 0, 255, 0, 0, 255, 0, 255, 20, 20, 244, 4, 252, 20, 20, 23, 16, 31, 16, 16, 31, 16, 31, 20, 20, 20, 31, 0, 16, 16, 16, 240, 0, 0, 0, 0, 31, 16, 16, 16, 16, 31, 16, 16, 16, 16, 240, 16, 0, 0, 0, 255, 16, 16, 16, 16, 16, 16, 16, 16, 16, 255, 16, 0, 0, 0, 255, 20, 0, 0, 255, 0, 255, 0, 0, 31, 16, 23, 0, 0, 252, 4, 244, 20, 20, 23, 16, 23, 20, 20, 244, 4, 244, 0, 0, 255, 0, 247, 20, 20, 20, 20, 20, 20, 20, 247, 0, 247, 20, 20, 20, 23, 20, 16, 16, 31, 16, 31, 20, 20, 20, 244, 20, 16, 16, 240, 16, 240, 0, 0, 31, 16, 31, 0, 0, 0, 31, 20, 0, 0, 0, 252, 20, 0, 0, 240, 16, 240, 16, 16, 255, 16, 255, 20, 20, 20, 255, 20, 16, 16, 16, 31, 0, 0, 0, 0, 240, 16, 255, 255, 255, 255, 255, 240, 240, 240, 240, 240, 255, 255, 255, 0, 0, 0, 0, 0, 255, 255, 15, 15, 15, 15, 15, 56, 68, 68, 56, 68, 252, 74, 74, 74, 52, 126, 2, 2, 6, 6, 2, 126, 2, 126, 2, 99, 85, 73, 65, 99, 56, 68, 68, 60, 4, 64, 126, 32, 30, 32, 6, 2, 126, 2, 2, 153, 165, 231, 165, 153, 28, 42, 73, 42, 28, 76, 114, 1, 114, 76, 48, 74, 77, 77, 48, 48, 72, 120, 72, 48, 188, 98, 90, 70, 61, 62, 73, 73, 73, 0, 126, 1, 1, 1, 126, 42, 42, 42, 42, 42, 68, 68, 95, 68, 68, 64, 81, 74, 68, 64, 64, 68, 74, 81, 64, 0, 0, 255, 1, 3, 224, 128, 255, 0, 0, 8, 8, 107, 107, 8, 54, 18, 54, 36, 54, 6, 15, 9, 15, 6, 0, 0, 24, 24, 0, 0, 0, 16, 16, 0, 48, 64, 255, 1, 1, 0, 31, 1, 1, 30, 0, 25, 29, 23, 18, 0, 60, 60, 60, 60, 0, 0, 0, 0, 0]
    
    def init(self):
        # Open the font file and grab the character width and height values.
        # Note that only fonts up to 8 pixels tall are currently supported.
        self._font_width, self._font_height = ustruct.unpack('BB', b'\x05\x08')

    def __enter__(self):
        self.init()
        return self

    def __exit__(self, exception_type, exception_value, traceback):
        pass

    def draw_char(self, ch, x, y, *args, **kwargs):
        # Don't draw the character if it will be clipped off the visible area.
        if x < -self._font_width or x >= self._width or \
           y < -self._font_height or y >= self._height:
            return
        # Go through each column of the character.
        for char_x in range(self._font_width):            
            # Grab the byte for the current column of font data.
            chcode=bytes([self._font_code[(2 + (ord(ch) * self._font_width) + char_x)]]) 
            line = ustruct.unpack('B', chcode)[0]
            # Go through each row in the column byte.
            for char_y in range(self._font_height):
                # Draw a pixel for each bit that's flipped on.
                if (line >> char_y) & 0x1:
                    self._pixel(x + char_x, y + char_y, *args, **kwargs)

    def text(self, text, x, y, *args, **kwargs):
        # Draw the specified text at the specified location.
        for i in range(len(text)):
            self.draw_char(text[i], x + (i * (self._font_width + 1)), y,
                           *args, **kwargs)

    def width(self, text):
        # Return the pixel width of the specified text message.
        return len(text) * (self._font_width + 1)

i2c = I2C(scl=Pin(22), sda=Pin(21), freq=100000)
display = Display(i2c)
display.clear()
Image.HEART=Image('59,45689a,3456789ab,3456789ab,456789a,56789,678,7')
Image.HEART_SMALL=Image(',59,45689a,456789a,56789,678,7,')
Image.HAPPY=Image(',,34bc,34bc,,5a,69,78')
Image.SAD=Image(',,345abc,2d,,78,69,5a')
Image.SMILE=Image(',34bc,25ad,,,5a,69,78')
Image.SILLY=Image(',34bc,25ad,34bc,,6789,69,78')
Image.FABULOUS=Image('345abc,269d,234569abcd,,,56789a,5a,6789')
Image.SURPRISED=Image(',7,7,7,7,7,,7')
Image.ASLEEP=Image(',,2345abcd,,,6789,5a,6789')
Image.ANGRY=Image('269d,35ac,4b,,78,69,5a,4b')
Image.CONFUSED=Image(',678,59,9,8,7,,7')
Image.NO=Image(',49,58,67,67,58,49,')
Image.YES=Image(',c,b,a,49,58,67,')
Image.LEFT_ARROW=Image(',5,4,3,2456789abcd,3,4,5')
Image.RIGHT_ARROW=Image(',a,b,c,23456789abd,c,b,a')
Image.DRESS=Image('59,456789a,5689,678,579,468a,3579b,456789a')
Image.TRANSFORMERS=Image(',7,5689,579,579,68,68,59')
Image.SCISSORS=Image('5b,56ab,679a,789,8,679a,579b,6a')
Image.EXIT=Image('ab,89a,79ab,69cd,8a,68b,8c,d')
Image.TREE=Image('7,678,56789,456789a,3456789ab,7,7,7')
Image.PACMAN=Image('456789,34a,2369,28,239,34a,456789,')
Image.TARGET=Image(',,789,6a,68a,6a,789,')
Image.TSHIRT=Image('5a,46789b,3c,45ab,5a,5a,5a,56789a')
Image.ROLLERSKATE=Image('4567,47,4789a,4b,456789ab,35ac,345abc,')
Image.DUCK=Image('567,478,38,23458,589abcde,5d,5c,56789ab')
Image.HOUSE=Image('23456789abcd,12de,01ef,256789ad,25ad,257ad,25ad,25ad')
Image.TORTOISE=Image('78,578a,56789a,56789a,56789a,6789,5a,')
Image.BUTTERFLY=Image(',56ab,479c,56789ab,789,68a,579b,56ab')
Image.STICKFIGURE=Image('7,68,7,678,579,7,68,59')
Image.GHOST=Image('56789,4579a,4579a,456789a,4579a,468a,456789ab,456789abc')
Image.PITCHFORK=Image('bcdef,a,a,0123456789abcdef,a,a,bcdef,')
Image.MUSIC_QUAVERS=Image(',,349af,234589abe,14567abcd,056bc,,')
Image.MUSIC_QUAVER=Image('1234567,08,0123456789ab,9abc,89abcd,89abcd,9abcd,abc')
Image.MUSIC_CROTCHET=Image(',0123456789ab,9abc,89abcd,89abcd,9abcd,abc,')
Image.COW=Image('3,1234,13456789a,123456789ab,123456789acd,459ae,459a,459a')
Image.RABBIT=Image('6789abcd,123456e,08ce,12345abce,08ce,123456e,6789abcd,')
Image.SQUARE_SMALL=Image(',,6789,69,69,6789,,')
Image.SQUARE=Image('456789ab,4b,4b,4b,4b,4b,4b,456789ab')
Image.DIAMOND_SMALL=Image(',,678,579,68,7,,')
Image.DIAMOND=Image('456789a,3468ab,2356789bc,34678ab,4579a,5689,678,7')
Image.CHESSBOARD=Image(',3456789abcd,3579bd,3456789abcd,3579bd,3456789abcd,3579bd,3456789abcd')
Image.TRIANGLE_LEFT=Image(',8,78,678,5678,678,78,8')
Image.TRIANGLE=Image(',78,6789,56789a,456789ab,3456789abc,23456789abcd,')
Image.SNAKE=Image('9ab,9b,9ab,456789,3456789,234,123,')
Image.UMBRELLA=Image('7,56789,456789a,3456789ab,7,7,79,789')
Image.SKULL=Image('56789,47a,37b,345689ab,456789a,59,579,678')
Image.GIRAFFE=Image('78,789,7,7,7,4567,47,47')
Image.SWORD=Image(',4,45,23456789abc,23456789abc,45,4,')