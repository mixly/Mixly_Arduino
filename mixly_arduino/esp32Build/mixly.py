from ESP32 import *
from ssd1306 import *

lcd = SSD1306_I2C(128,64,I2C(scl=Pin(22), sda=Pin(21), freq=100000))
lcd.show_str('Example1','Example2','Example3','Example4')
