import machine, sdcard, os

from machine import SPI, Pin

#sd = sdcard.SDCard(SPI(-1, sck=Pin(14), mosi=Pin(13), miso=Pin(12)), Pin(15))
sd = sdcard.SDCard(SPI(2, sck=Pin(18), mosi=Pin(23), miso=Pin(19)), Pin(15))
os.mount(sd, '/sd')

os.listdir('/sd')