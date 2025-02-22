from microbit import *


class QJ00X_MP3:
    def __init__(self, mp3_rx=pin2, mp3_tx=pin16, volume=0x16, mode=0x01):
        uart.init(rx=mp3_rx, tx=mp3_tx, baudrate=9600)
        self.set_eq(1)
        self.set_vol(volume)
        self.set_mode(mode)
        self.pause()

    def _send_cmd(self, length, cmd, data_high=None, data_low=None):
        uart.write(b"\x7E")
        uart.write(bytes([length]))
        uart.write(bytes([cmd]))
        if data_high != None:
            uart.write(bytes([data_high]))
        if data_low != None:
            uart.write(bytes([data_low]))
        uart.write(b"\xEF")
        sleep(200)

    # 下一曲
    def next_track(self):
        self._send_cmd(0x02, 0x03)

    # 上一曲
    def prev_track(self):
        self._send_cmd(0x02, 0x04)

    # 选择曲目
    def sel_track(self, track_index):
        self._send_cmd(0x03, track_index)

    # 音量+
    def inc_vol(self):
        self._send_cmd(0x02, 0x05)

    # 音量-
    def dec_vol(self):
        self._send_cmd(0x02, 0x06)

    # 设置音量
    def set_vol(self, volume):
        self._send_cmd(0x03, 0x31, data_high=volume)

    # 设置音效
    def set_eq(self, equalizer):
        self._send_cmd(0x03, 0x32, data_high=equalizer)

    # 设置播放设备
    def set_mode(self, mode):
        self._send_cmd(0x03, 0x35, data_high=mode)

    # 播放
    def play(self):
        self._send_cmd(0x02, 0x01)

    # 终止播放
    def pause(self):
        self._send_cmd(0x02, 0x02)

    # 设置文件夹播放
    def set_folder(self, folder_index, music_index):
        self._send_cmd(0x04, 0x42, data_high=folder_index, data_low=music_index)

    # 设置曲目播放
    def playFileByIndexNumber(self, music_index):
        self._send_cmd(0x04, 0x41, data_high=0x00, data_low=music_index)

    # 设置循环
    def set_loop(self, mode):
        self._send_cmd(0x03, 0x33, data_high=mode)
