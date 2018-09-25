from machine import Pin, I2C
import framebuf

_DISPLAY_BLINK_CMD = 0x80
_DISPLAY_BLINK_DISPLAYON = 0x01
_DISPLAY_CMD_BRIGHTNESS = 0xE0
_DISPLAY_OSCILATOR_ON = 0x21

class Image:
    def __init__(self,str=""):
        self.str=str

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
        print(img.str)
        #self.str = ":".join(l1)
        return img

    def __sub__(self,other):
        img = Image()
        l1 = self.str.split(':')
        l2 = other.str.split(':')
        l = []
        s = ""
        for i in range(8):
            for j in range(16):
                if l2[i][j]==1 and l1[i][j]==1:
                    s += '0'
                else:
                    s += l1[i][j]
            l.append(s)
            s = ""
        img.str = ":".join(l)
        print(img.str)
        #self.str = ":".join(l1)
        return img


class Display:
    """The base class for all Display-based backpacks and wings."""

    def __init__(self, i2c, address=0x70):
        self.i2c = i2c
        self.address = address
        self._temp = bytearray(1)
        self.buffer = bytearray(16+1)
        #self.buffer[0] = 0x00
        self.framebuf = framebuf.FrameBuffer(self.buffer, 16, 8, framebuf.MONO_HMSB)
        self.fill(0)
        self._write_cmd(_DISPLAY_OSCILATOR_ON)
        self.blink_rate(0)
        self.brightness(15)

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

    def _show(self):
        """Actually send all the changes to the device."""
        self.i2c.writeto(self.address, self.buffer)

    def fill(self, color):
        """Fill the display with given color."""
        fill = 0xff if color else 0x00
        for i in range(16):
            self.buffer[i + 1] = fill

    def text(self, string):
        self.framebuf.text(string,0,0,1)

    def show(self, img):
        self.fill(0)
        l = img.str.split(':')
        for i in range(8):
            for j in range(16):
                if l[i][j] == '1':
                    self._pixel(j, i, 1)
                else:
                    self._pixel(j, i, 0)
                #print(l[i][j])
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


i2c = I2C(scl=Pin(22), sda=Pin(21), freq=100000)
display = Display(i2c)