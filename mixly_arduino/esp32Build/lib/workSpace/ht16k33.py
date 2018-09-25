from machine import Pin, I2C
import framebuf
from micropython import const

_HT16K33_BLINK_CMD = const(0x80)
_HT16K33_BLINK_DISPLAYON = const(0x01)
_HT16K33_CMD_BRIGHTNESS = const(0xE0)
_HT16K33_OSCILATOR_ON = const(0x21)

class HT16K33:
    """The base class for all displays. Contains common methods."""
    def __init__(self, i2c, address=0x70):
        self.i2c = i2c
        self.address = address
        self._temp = bytearray(1)
        self._buffer = bytearray(17)
        self.fill(0)
        self._write_cmd(_HT16K33_OSCILATOR_ON)
        self._blink_rate = None
        self._brightness = None
        self.blink_rate(0)
        self.brightness(15)

    def _write_cmd(self, byte):
        self._temp[0] = byte
        self.i2c.writeto(self.address, self._temp)

    def blink_rate(self, rate=None):
        """The blink rate. Range 0-3."""
        if rate is None:
            return self._blink_rate
        rate = rate & 0x03
        self._blink_rate = rate
        self._write_cmd(_HT16K33_BLINK_CMD |
                        _HT16K33_BLINK_DISPLAYON | rate << 1)
        return None

    def brightness(self, brightness):
        """The brightness. Range 0-15."""
        if brightness is None:
            return self._brightness
        brightness = brightness & 0x0F
        self._brightness = brightness
        self._write_cmd(_HT16K33_CMD_BRIGHTNESS | brightness)
        return None

    def show(self):
        """Refresh the display and show the changes."""
        self.i2c.writeto(self.address, self._buffer)

    def fill(self, color):
        """Fill the whole display with the given color."""
        fill = 0xff if color else 0x00
        for i in range(16):
            self._buffer[i+1] = fill

    def _pixel(self, x, y, color=None):
        mask = 1 << x
        if color is None:
            return bool((self._buffer[y + 1] | self._buffer[y + 2] << 8) & mask)
        if color:
            self._buffer[(y * 2) + 1] |= mask & 0xff
            self._buffer[(y * 2) + 2] |= mask >> 8
        else:
            self._buffer[(y * 2) + 1] &= ~(mask & 0xff)
            self._buffer[(y * 2) + 2] &= ~(mask >> 8)
        return None

    def _set_buffer(self, i, value):
        self._buffer[i+1] = value  # Offset by 1 to move past register address.

    def _get_buffer(self, i):
        return self._buffer[i+1]   # Offset by 1 to move past register address.

class Matrix16x8(HT16K33):
    """A double matrix or the matrix wing."""
    def pixel(self, x, y, color=None):
        """Get or set the color of a given pixel."""
        if not 0 <= x <= 15:
            return None
        if not 0 <= y <= 7:
            return None
        if x >= 8:
            x -= 8
            y += 8
        return super()._pixel(y, x, color)


class Matrix8x8(HT16K33):
    """A single matrix."""
    def pixel(self, x, y, color=None):
        """Get or set the color of a given pixel."""
        if not 0 <= x <= 7:
            return None
        if not 0 <= y <= 7:
            return None
        x = (x - 1) % 8
        return super()._pixel(x, y, color)


class Matrix8x8x2(HT16K33):
    """A bi-color matrix."""
    def pixel(self, x, y, color=None):
        """Get or set the color of a given pixel."""
        if not 0 <= x <= 7:
            return None
        if not 0 <= y <= 7:
            return None
        if color is not None:
            super()._pixel(y, x, (color & 0x01))
            super()._pixel(y + 8, x, (color >> 1) & 0x01)
        else:
            return super()._pixel(y, x) | super()._pixel(y + 8, x) << 1
        return None

    def fill(self, color):
        """Fill the whole display with the given color."""
        fill1 = 0xff if color & 0x01 else 0x00
        fill2 = 0xff if color & 0x02 else 0x00
        for i in range(8):
            self._set_buffer(i * 2, fill1)
            self._set_buffer(i * 2 + 1, fill2)

