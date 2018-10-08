# MicroPython SSD1106 OLED driver, I2C and SPI interfaces

from micropython import const
import framebuf


# register definitions
SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_ENTIRE_ON1      = const(0xaf)
SET_NORM_INV        = const(0xa6)
SET_DISP_OFF        = const(0xae)
SET_DISP_ON         = const(0xaf)
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
SET_CHARGE_PUMP1    = const(0xad)
SET_COL_ADDR_L      = const(0x02)
SET_COL_ADDR_H      = const(0x10)
SET_PAGE_ADDR1      = const(0xb0)
SET_CONTRACT_CTRL   = const(0x81)
SET_DUTY            = const(0x3f)
SET_VCC_SOURCE      = const(0x8b)
SET_VPP             = const(0x33)

# Subclassing FrameBuffer provides support for graphics primitives
# http://docs.micropython.org/en/latest/pyboard/library/framebuf.html
class SSD1106(framebuf.FrameBuffer):
    def __init__(self, width, height, external_vcc):
        self.width = width
        self.height = height
        self.external_vcc = external_vcc
        self.pages = self.height // 8
        self.buffer = bytearray(self.pages * self.width)
        super().__init__(self.buffer, self.width, self.height, framebuf.MONO_VLSB)
        self.init_display()

    def init_display(self):
        for cmd in (
        	SET_DISP_OFF, # display off
			SET_DISP_CLK_DIV, 0x80, # timing and driving scheme
			SET_MUX_RATIO, 0x3f,       #0xa8
			SET_DISP_OFFSET, 0x00,    #0xd3
			SET_DISP_START_LINE | 0x00, #start line
			SET_CHARGE_PUMP, 0x10 if self.external_vcc else 0x14,
			SET_MEM_ADDR, 0x00, # address setting
			SET_SEG_REMAP | 0x01, # column addr 127 mapped to SEG0
			SET_COM_OUT_DIR | 0x08, # scan from COM[N] to COM0
			SET_COM_PIN_CFG, 0x12,
			SET_CONTRACT_CTRL, 0xcf,
			SET_PRECHARGE, 0x22 if self.external_vcc else 0xf1,
			SET_VCOM_DESEL, 0x40, # 0.83*Vcc
			SET_ENTIRE_ON, # output follows RAM contents
			SET_NORM_INV,
			SET_DISP_ON): # on
			self.write_cmd(cmd)
        self.fill(0)
        self.show()

    def poweroff(self):
        self.write_cmd(SET_DISP | 0x00)

    def poweron(self):
        self.write_cmd(SET_DISP | 0x01)

    def contrast(self, contrast):
        self.write_cmd(SET_CONTRAST)
        self.write_cmd(contrast)

    def invert(self, invert):
        self.write_cmd(SET_NORM_INV | (invert & 1))

    def show(self):
        for i in range(0, 8):
            self.write_cmd(SET_PAGE_ADDR1 + i);
            self.write_cmd(SET_COL_ADDR_L + 0);     # offset 2 pixels for 128x64 panel
            self.write_cmd(SET_COL_ADDR_H + 0);
            self.write_data(self.buffer[i*128:(i+1)*128])   # send one page display data



class SSD1106_I2C(SSD1106):
    def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False):
        self.i2c = i2c
        self.addr = addr
        self.temp = bytearray(2)
        super().__init__(width, height, external_vcc)

    def write_cmd(self, cmd):
        self.temp[0] = 0x80 # Co=1, D/C#=0
        self.temp[1] = cmd
        self.i2c.writeto(self.addr, self.temp)

    def write_data(self, buf):
        self.temp[0] = self.addr << 1
        self.temp[1] = 0x40 # Co=0, D/C#=1
        self.i2c.start()
        self.i2c.write(self.temp)
        self.i2c.write(buf)
        self.i2c.stop()


class SSD1106_SPI(SSD1106):
    def __init__(self, width, height, spi, dc, res, cs, external_vcc=False):
        self.rate = 10 * 1024 * 1024
        dc.init(dc.OUT, value=0)
        res.init(res.OUT, value=0)
        cs.init(cs.OUT, value=1)
        self.spi = spi
        self.dc = dc
        self.res = res
        self.cs = cs
        import time
        self.res(1)
        time.sleep_ms(1)
        self.res(0)
        time.sleep_ms(10)
        self.res(1)
        super().__init__(width, height, external_vcc)

    def write_cmd(self, cmd):
        self.spi.init(baudrate=self.rate, polarity=0, phase=0)
        self.cs(1)
        self.dc(0)
        self.cs(0)
        self.spi.write(bytearray([cmd]))
        self.cs(1)

    def write_data(self, buf):
        self.spi.init(baudrate=self.rate, polarity=0, phase=0)
        self.cs(1)
        self.dc(1)
        self.cs(0)
        self.spi.write(buf)
        self.cs(1)
