# Proof-of-concept of a REPL over BLE UART.
# Set the EoL characters to \r\n.

import io
import os
from machine import Timer
from micropython import schedule
from ble_uart_peripheral import BLEUART

_MP_STREAM_POLL = const(3)
_MP_STREAM_POLL_RD = const(0x0001)

# Batch writes into 50ms intervals.
Define_timer = Timer(2)

def schedule_in(handler, delay_ms):
    def _wrap(_arg):
        handler()
    if Define_timer:
        Define_timer.init(mode=Timer.ONE_SHOT, period=delay_ms, callback=_wrap)
    else:
        schedule(_wrap, None)

# Simple buffering stream to support the dupterm requirements.
class BLEUARTStream(io.IOBase):
    def __init__(self, name="mpy-repl"):
        self._uart = BLEUART(name)
        self._tx_buf = bytearray()
        self._uart.irq(self._on_rx)

    def _on_rx(self):
        if hasattr(os, "dupterm_notify"):
            os.dupterm_notify(None)

    def read(self, sz=None):
        return self._uart.read(sz)

    def readinto(self, buf):
        avail = self._uart.read(len(buf))
        if not avail:
            return None
        for i in range(len(avail)):
            buf[i] = avail[i]
        return len(avail)

    def ioctl(self, op, arg):
        if op == _MP_STREAM_POLL:
            if self._uart.any():
                return _MP_STREAM_POLL_RD
        return 0

    def _flush(self):
        data = self._tx_buf[0:100]
        self._tx_buf = self._tx_buf[100:]
        self._uart.write(data)
        if self._tx_buf:
            schedule_in(self._flush, 50)

    def write(self, buf):
        empty = not self._tx_buf
        self._tx_buf += buf
        if empty:
            schedule_in(self._flush, 50)

def start(ble_name="mpy-repl"):
    stream = BLEUARTStream(name=ble_name)
    os.dupterm(stream)
