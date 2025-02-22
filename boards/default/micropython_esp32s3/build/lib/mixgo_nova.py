"""
mixgo_zero Zi Onboard resources

Micropython    library for the mixgo_zero Zi Onboard resources
=======================================================

#Preliminary composition                   20231020
#S3定时器ID(-1,0,1,2,3(led))

dahanzimin From the Mixly Team
"""

from machine import *
import time, gc, st7735, math

'''RTC'''
rtc_clock = RTC()

'''I2C-onboard'''
version = not Pin(13, Pin.IN, Pin.PULL_DOWN).value()
onboard_i2c = SoftI2C(scl=Pin(36), sda=Pin(37), freq=400000)
onboard_i2c_soft = SoftI2C(scl=Pin(36) if version else Pin(13), sda=Pin(15), freq=400000)
onboard_i2c_scan = onboard_i2c.scan()

'''SPI-onboard'''
try:
	import _boot 
	onboard_spi = _boot.onboard_spi
	onboard_spi.init(baudrate=50000000)
except:
	onboard_spi = SPI(1, baudrate=50000000, polarity=0, phase=0)

'''TFT/128*160'''
onboard_tft = st7735.ST7735(onboard_spi, 160, 128, dc_pin=18, cs_pin=45, bl_pin=14, font_address=0x700000)

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
	onboard_als_r = ltr553als.LTR_553ALS(onboard_i2c_soft)     
except Exception as e:
	print("Warning: Failed to communicate with TR_553ALS (ALS&PS) or",e)

'''BPS-Sensor'''
if 0x76 in onboard_i2c_scan:
	try :
		import hp203x
		onboard_bps = hp203x.HP203X(onboard_i2c_soft)     
	except Exception as e:
		print("Warning: Failed to communicate with HP203X (BPS) or",e)

'''THS-Sensor'''
if 0x38 in onboard_i2c_scan:
	try :
		import ahtx0
		onboard_ths = ahtx0.AHTx0(onboard_i2c)     
	except Exception as e:
		print("Warning: Failed to communicate with AHTx0 (THS) or",e)
if 0x70 in onboard_i2c_scan:
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

'''2RGB_WS2812'''    
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(38), 4)

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
B2key = KEYSensor(17,0)
A1key = KEYSensor(17,2900)
A2key = KEYSensor(17,2300)
A3key = KEYSensor(17,1650)
A4key = KEYSensor(17,850)

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

'''2LED-Tristate'''
class LED_T:
	def __init__(self, pin, timer_id=3):
		self._pin = pin
		self._pwm = 0 
		self._index_pwm = [0,0]
		Timer(timer_id, freq=2500, mode=Timer.PERIODIC, callback=self.tim_callback)

	def _cutonoff(self,val):
		if val == 0:
			Pin(self._pin, Pin.IN)
		elif val == 1:
			Pin(self._pin, Pin.OUT).value(1)
		elif val == -1:
			Pin(self._pin, Pin.OUT).value(0)

	def tim_callback(self,tim):
		if self._pwm <= 25:
			if self._pwm * 4 < self._index_pwm[0]: 
				self._cutonoff(1)
			else:
				self._cutonoff(0)
		else:
			if (self._pwm - 26) * 4 < self._index_pwm[1]: 
				self._cutonoff(-1)
			else:
				self._cutonoff(0)	
		self._pwm = self._pwm + 1 if self._pwm <= 51 else 0

	def setbrightness(self,index,val):
		if not 0 <= val <= 100:
			raise ValueError("Brightness must be in the range: 0~100%")
		self._index_pwm[index-1] = val
		
	def getbrightness(self,index):
		return self._index_pwm[index-1]

	def setonoff(self,index,val):
		if(val == -1):
			if self._index_pwm[index-1] < 50:
				self._index_pwm[index-1] = 100
			else:
				self._index_pwm[index-1] = 0
		elif(val == 1):
			self._index_pwm[index-1] = 100 
		elif(val == 0):
			self._index_pwm[index-1] = 0 

	def getonoff(self,index):
		return True if self._index_pwm[index-1] > 0 else False

'''2LED-Independent'''  
class LED_I:
    def __init__(self, pins=[]):
        self._pins = [PWM(Pin(pin), duty_u16=0) for pin in pins]
        self._brightness = [0 for _ in range(len(self._pins))]

    def setbrightness(self, index, val):
        if not 0 <= val <= 100:
            raise ValueError("Brightness must be in the range: 0-100%")
        self._brightness[index - 1] = val
        self._pins[index - 1].duty_u16(val * 65535 // 100)

    def getbrightness(self, index):
        return self._brightness[index - 1]

    def setonoff(self, index, val):
        if val == -1:
            self.setbrightness(index, 100)  if self.getbrightness(index) < 50 else self.setbrightness(index, 0) 
        elif val == 1:
            self.setbrightness(index, 100) 
        elif val == 0:
            self.setbrightness(index, 0) 

    def getonoff(self, index):
        return True if self.getbrightness(index) > 50 else False

onboard_led=LED_I(pins=[42, 13]) if version else LED_T(42, timer_id=3) 

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
        self.clear(0)

    def clear(self,color=0):  #清除
        self.drawHour(color)
        self.drawMin(color)
        self.drawSec(color)

'''Reclaim memory'''
gc.collect()
