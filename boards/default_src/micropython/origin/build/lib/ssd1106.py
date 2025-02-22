"""
SSD1106

library for the SSD1x06 OLED128x64
=======================================================
@dahanzimin From the Mixly Team
"""
import uframebuf
from micropython import const

SET_CONTRAST        = const(0x81)
SET_ENTIRE_ON       = const(0xa4)
SET_NORM_INV        = const(0xa6)
SET_DISP_OFF        = const(0xae)
SET_DISP_ON         = const(0xaf)
SET_MEM_ADDR        = const(0x20)
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
SET_COL_ADDR_L      = const(0x02)
SET_COL_ADDR_H      = const(0x10)
SET_PAGE_ADDR1      = const(0xb0)
SET_CONTRACT_CTRL   = const(0x81)

class SSD1106(uframebuf.FrameBuffer_Uincode):
    def __init__(self, width, height, external_vcc, l_offset=0, h_offset=0):
        self._external = external_vcc
        self._l_offset = l_offset
        self._h_offset = h_offset
        self._buffer = bytearray((width + 7) // 8 * height)
        super().__init__(self._buffer, width, height, uframebuf.MONO_VLSB)
        self.init_display()

    def init_display(self):
        for cmd in (
            SET_DISP_OFF, # display off
            SET_DISP_CLK_DIV, 0x80, # timing and driving scheme
            SET_MUX_RATIO, 0x3f,       #0xa8
            SET_DISP_OFFSET, 0x00,    #0xd3
            SET_DISP_START_LINE | 0x00, #start line
            SET_CHARGE_PUMP, 0x10 if self._external else 0x14,
            SET_MEM_ADDR, 0x00, # address setting
            SET_SEG_REMAP | 0x01, # column addr 127 mapped to SEG0
            SET_COM_OUT_DIR | 0x08, # scan from COM[N] to COM0
            SET_COM_PIN_CFG, 0x12,
            SET_CONTRACT_CTRL, 0xcf,
            SET_PRECHARGE, 0x22 if self._external else 0xf1,
            SET_VCOM_DESEL, 0x40, # 0.83*Vcc
            SET_ENTIRE_ON, # output follows RAM contents
            SET_NORM_INV,
            SET_DISP_ON): # on
            self.write_cmd(cmd)
        self.fill(0)
        self.show()

    def poweroff(self):
        self.write_cmd(SET_DISP_OFF)

    def poweron(self):
        self.write_cmd(SET_DISP_ON)

    def contrast(self, contrast):
        self.write_cmd(SET_CONTRAST)
        self.write_cmd(contrast)

    def invert(self, invert):
        self.write_cmd(SET_NORM_INV | (invert & 1))

    def show(self):
        for i in range(0, 8):
            self.write_cmd(SET_PAGE_ADDR1 + i)
            self.write_cmd(SET_COL_ADDR_L + self._l_offset)
            self.write_cmd(SET_COL_ADDR_H + self._h_offset)
            self.write_data(self._buffer[i * 128:(i + 1) * 128])   #send one page display data

class SSD1106_I2C(SSD1106):
    def __init__(self, width, height, i2c, addr=0x3c, external_vcc=False, l_offset=0, h_offset=0):
        self.i2c = i2c
        self.addr = addr
        self.temp = bytearray(2)
        super().__init__(width, height, external_vcc, l_offset, h_offset)

    def write_cmd(self, cmd):
        self.temp[0] = 0x80
        self.temp[1] = cmd
        self.i2c.writeto(self.addr, self.temp)

    def write_data(self, buf):
        tmp = bytearray([0x40])
        self.i2c.writeto(self.addr, tmp+buf)

class SSD1106_SPI(SSD1106):
    def __init__(self, width, height, spi, dc, cs, external_vcc=False, l_offset=0, h_offset=0):
        self.rate = 10 * 1024 * 1024
        dc.init(dc.OUT, value=0)
        cs.init(cs.OUT, value=1)
        self.spi = spi
        self.dc = dc
        self.cs = cs
        super().__init__(width, height, external_vcc, l_offset, h_offset)

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
