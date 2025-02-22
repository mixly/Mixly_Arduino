"""
mixgo_zero Onboard resources

Micropython library for the mixgo_zero Onboard resources
=======================================================

#Preliminary composition                   20240110
#S3定时器ID(-1,0,1,2,3)

@dahanzimin From the Mixly Team
"""
from machine import *
import time, gc, st7789_bf, math

'''RTC'''
rtc_clock = RTC()

'''I2C-onboard'''
#onboard_i2c = I2C(0)
onboard_i2c = SoftI2C(scl=Pin(47), sda=Pin(48), freq=400000)
onboard_i2c_1 = SoftI2C(scl=Pin(47), sda=Pin(21), freq=400000)

'''SPI-onboard'''
try:
	import _boot 
	onboard_spi = _boot.onboard_spi
	onboard_spi.init(baudrate=50000000)
except:
	onboard_spi = SPI(1, baudrate=50000000, polarity=0, phase=0)

'''TFT/320*240'''
onboard_tft = st7789_bf.ST7789(onboard_spi, 320, 240, dc_pin=18, cs_pin=45, bl_pin=46, font_address=0xE00000)

'''ACC-Sensor'''
try :
	import mxc6655xa
	onboard_acc = mxc6655xa.MXC6655XA(onboard_i2c, front=True)     
except Exception as e:
	print("Warning: Failed to communicate with MXC6655XA (ACC) or",e)

'''ALS_PS-Sensor *2'''
try :
	import ltr553als
	onboard_als_l = ltr553als.LTR_553ALS(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with TR_553ALS (ALS&PS) or",e)

try :
	import ltr553als
	onboard_als_r = ltr553als.LTR_553ALS(onboard_i2c_1)     
except Exception as e:
	print("Warning: Failed to communicate with TR_553ALS (ALS&PS) or",e)

'''THS-Sensor'''
try :
	import shtc3
	onboard_ths = shtc3.SHTC3(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with GXHTC3 (THS) or",e)

'''RFID-Sensor'''
try :
	import rc522
	onboard_rfid = rc522.RC522(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with RC522 (RFID) or",e)

'''MGS-Sensor'''
try :
	import mmc5603
	onboard_mgs = mmc5603.MMC5603(onboard_i2c)
except Exception as e:
	print("Warning: Failed to communicate with MMC5603 (MGS) or",e)

'''BPS-Sensor'''
try :
	import spl06_001
	onboard_bps = spl06_001.SPL06(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with SPL06-001 (BPS) or",e)

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(0), 6, multiplex=True, leds=2)

'''5KEY_Sensor'''
class KEYSensor:
	def __init__(self, pin, range):
		self.pin = pin
		self.adc = ADC(Pin(pin), atten=ADC.ATTN_0DB)
		self.range = range
		self.flag = True
	
	def _value(self):
		values = []
		for _ in range(50):
			values.append(self.adc.read())
			time.sleep_us(2)
		return (self.range-200) < min(values) < (self.range+200)

	def get_presses(self, delay = 1):
		last_time,presses = time.time(), 0
		while time.time() < last_time + delay:
			time.sleep_ms(50)
			if self.was_pressed():
				presses += 1
		return presses

	def is_pressed(self):
		return self._value()

	def was_pressed(self):
		if(self._value() != self.flag):
			self.flag = self._value()
			if self.flag :
				return True
			else:
				return False

	def irq(self, handler, trigger):
		Pin(self.pin, Pin.IN).irq(handler = handler, trigger = trigger)

'''1KEY_Button'''
class Button(KEYSensor):
	def __init__(self, pin):
		self.pin = pin
		self.key = Pin(pin, Pin.IN)
		self.flag = True

	def _value(self):
		return not self.key.value()

B1key = Button(0)
B2key = KEYSensor(13,0)
A1key = KEYSensor(13,2900)
A2key = KEYSensor(13,2300)
A3key = KEYSensor(13,1650)
A4key = KEYSensor(13,850)

'''2-TouchPad'''
class Touch_Pad:
	__species = {}
	__first_init = True
	def __new__(cls, pin, *args, **kwargs):
		if pin not in cls.__species.keys():
			cls.__first_init = True
			cls.__species[pin]=object.__new__(cls)
		return cls.__species[pin]   

	def __init__(self, pin, default=30000):
		if self.__first_init:
			self.__first_init = False
			from machine import TouchPad
			self._pin = TouchPad(Pin(pin))
			self.raw = self._pin.read()
			if self.raw >= default * 1.5:
				self.raw = default

	def touch(self,value=None ):
		return self._pin.read() > value if value else  self._pin.read()

#Touch with function call
def touched(pin,value=60000):
	return Touch_Pad(pin).touch(value)

def touch_slide(pina, pinb):
	return ((Touch_Pad(pina).touch() - Touch_Pad(pina).raw) - (Touch_Pad(pinb).touch() - Touch_Pad(pinb).raw)) // 10

'''2LED-WS2812'''
class LED:
	def __init__(self, rgb, num=2, color=3):
		self._rgb = rgb
		self._col = [color] * num
		self._color = ((0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 0), (0, 1, 1), (1, 0, 1), (1, 1, 1))

	def setbrightness(self, index, value):
		self._rgb.led_set(index - 1, (value if self._color[self._col[index-1]][0] else 0,
									value if self._color[self._col[index-1]][1] else 0,
									value if self._color[self._col[index-1]][2] else 0))
		self._rgb.write()

	def getbrightness(self, index):
		color = self._rgb.led_get(index - 1)
		return color[0] | color[1] | color[2]

	def setonoff(self, index, value):
		if value == -1:
			if self.getbrightness(index) < 50:
				self.setbrightness(index, 100)
			else:
				self.setbrightness(index, 0)
		elif value == 1:
			self.setbrightness(index, 100)
		elif value == 0:
			self.setbrightness(index, 0)

	def getonoff(self, index):
		return True if self.getbrightness(index) > 50 else False

	def setcolor(self, index, color):
		self._col[index-1] = color

	def getcolor(self, index):
		return self._col[index-1]

onboard_led = LED(onboard_rgb)

class Clock:
    def __init__(self, x, y, radius, color, oled=onboard_tft):  #定义时钟中心点和半径
        self.display = oled
        self.xc = x
        self.yc = y
        self.r = radius
        self.color= color
        self.hour = 0
        self.min = 0
        self.sec = 0

    def set_time(self, h, m, s):  #设定时间
        self.hour = h
        self.min = m
        self.sec = s

    def set_rtctime(self):  #设定时间
        t = rtc_clock.datetime()
        self.hour = t[4]
        self.min = t[5]
        self.sec = t[6]

    def drawDial(self,color):  #画钟表刻度
        r_tic1 = self.r - 1
        r_tic2 = self.r - 2

        self.display.ellipse(self.xc, self.yc, self.r,self.r, self.color)
        self.display.ellipse(self.xc, self.yc, 2, 2, self.color,True)

        for h in range(12):
            at = math.pi * 2.0 * h / 12.0
            x1 = round(self.xc + r_tic1 * math.sin(at))
            x2 = round(self.xc + r_tic2 * math.sin(at))
            y1 = round(self.yc - r_tic1 * math.cos(at))
            y2 = round(self.yc - r_tic2 * math.cos(at))
            self.display.line(x1, y1, x2, y2, color)

    def drawHour(self,color):  #画时针

        r_hour = int(self.r / 10.0 * 5)
        ah = math.pi * 2.0 * ((self.hour % 12) + self.min / 60.0) / 12.0
        xh = int(self.xc + r_hour * math.sin(ah))
        yh = int(self.yc - r_hour * math.cos(ah))
        self.display.line(self.xc, self.yc, xh, yh, color)

    def drawMin(self,color):  #画分针

        r_min = int(self.r / 10.0 * 7)
        am = math.pi * 2.0 * self.min / 60.0

        xm = round(self.xc + r_min * math.sin(am))
        ym = round(self.yc - r_min * math.cos(am))
        self.display.line(self.xc, self.yc, xm, ym, color)

    def drawSec(self,color):  #画秒针

        r_sec = int(self.r / 10.0 * 9)
        asec = math.pi * 2.0 * self.sec / 60.0
        xs = round(self.xc + r_sec * math.sin(asec))
        ys = round(self.yc - r_sec * math.cos(asec))
        self.display.line(self.xc, self.yc, xs, ys, color)

    def draw_clock(self):  #画完整钟表
        self.drawDial(self.color)
        self.drawHour(self.color)
        self.drawMin(self.color)
        self.drawSec(self.color)
        self.display.show()

    def clear(self,color=0):  #清除
        self.drawHour(color)
        self.drawMin(color)
        self.drawSec(color)

'''Reclaim memory'''
gc.collect()
