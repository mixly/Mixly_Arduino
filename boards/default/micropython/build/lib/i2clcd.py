"""
LCD1602、LCD2004_I2C

Micropython library for the I2C(LCD1602、LCD2004)
=======================================================

#Preliminary composition                20221117

dahanzimin From the Mixly Team 
"""
from time import sleep_ms
from micropython import const

LCD_DAT     = const(0x01)               # Mode - Sending data
LCD_CMD     = const(0x00)               # Mode - Sending command
LCD_LINES   = (0x80, 0xC0, 0x94, 0xD4)

class LCD():
    def __init__(self, i2c_bus, i2c_addr=0x27, lcd_width=16):
        self._device = i2c_bus
        self._address = i2c_addr
        self._lcd_width = lcd_width
        self._backlight = True
        self._last_data = 0x00

        for i in [0x30, 0x30, 0x30,0x20]:
            self._i2c_write(i)
            sleep_ms(1)
        for i in [0x28, 0x0C, 0x06]:
            self.write_byte(i , LCD_CMD)
        self.clear()

    def _i2c_write(self, data , pulse_en=True):
        """write one byte to I2C bus"""
        self._last_data = data
        self._device.writeto(self._address,data.to_bytes(1, 'little'))
        sleep_ms(0)
        if pulse_en :
            self._device.writeto(self._address,(data | 0b00000100).to_bytes(1, 'little'))
            sleep_ms(0)
            self._device.writeto(self._address,(data & ~0b00000100).to_bytes(1, 'little'))
            sleep_ms(0)

    def write_byte(self, data, mode):
        """write one byte to LCD"""
        data_H = (data & 0xF0) | self._backlight * 0x08 | mode
        data_L = ((data << 4) & 0xF0) | self._backlight * 0x08 | mode
        self._i2c_write(data_H)
        self._i2c_write(data_L)

    def clear(self):
        """Clear the display and reset the cursor position"""
        self.write_byte(0x01, LCD_CMD)
        sleep_ms(1)

    def backlight(self, on_off):
        """ Set whether the LCD backlight is on or off"""
        self._backlight = on_off & 0x01
        i2c_data = (self._last_data & 0xF7) + self._backlight * 0x08
        self._i2c_write(i2c_data,pulse_en=False)

    def shows(self, text, line=0, column=0, center=False):
        '''Character display'''
        text = str(text).encode('ascii')
        column=(self._lcd_width-len(text))//2 if center else column
        self.write_byte(LCD_LINES[line] + column, LCD_CMD)
        for b in text:
            self.write_byte(0x0C+0*0x02+0*0x01, LCD_CMD)
            self.write_byte(b, LCD_DAT)

    def print(self, text, line=0, column=0, delay=500):
        '''Print Effect Character Display'''
        text = str(text).encode('ascii')
        self.write_byte(LCD_LINES[line] + column, LCD_CMD)
        for b in text:
            self.write_byte(0x0C+1*0x02+1*0x01, LCD_CMD)
            sleep_ms(delay)
            self.write_byte(b, LCD_DAT)
        sleep_ms(delay)
