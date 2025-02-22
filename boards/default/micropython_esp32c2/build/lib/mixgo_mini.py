"""
mixgo_mini onboard resources

Micropython library for the mixgo_mini onboard resources
=======================================================
@dahanzimin From the Mixly Team
"""
import time, gc 
from esp32 import mcu_temperature
from machine import Pin, ADC, RTC, SoftI2C

'''Reclaim memory'''
gc.collect()

'''RTC'''
rtc_clock = RTC()

'''I2C-onboard'''
onboard_i2c = SoftI2C(scl=Pin(10), sda=Pin(18), freq=400000)
#onboard_i2c_scan = onboard_i2c.scan()

'''ACC-Sensor'''
try :
	import sc7a20
	onboard_acc = sc7a20.SC7A20(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with SC7A20H (ACC) or",e)

'''ALS_PS-Sensor'''
try :
	import ap3216c
	onboard_als = ap3216c.AP3216C(onboard_i2c)     
except Exception as e:
	print("Warning: Failed to communicate with AP3216C (ALS&PS) or",e)

'''BOT035-Sensor'''
try :
	import mini_bot
	onboard_bot = mini_bot.BOT035(onboard_i2c)
	onboard_matrix = onboard_bot
except Exception as e:
	print("Warning: Failed to communicate with BOT035 (Coprocessor) or",e)

'''BPS-Sensor'''
# if 0x77 in onboard_i2c_scan:
# 	try :
# 		import spl06_001
# 		onboard_bps = spl06_001.SPL06(onboard_i2c)     
# 	except Exception as e:
# 		print("Warning: Failed to communicate with SPL06-001 (BPS) or",e)

'''THS-Sensor'''
# if 0x70 in onboard_i2c_scan:
# 	try :
# 		import shtc3
# 		onboard_ths = shtc3.SHTC3(onboard_i2c)     
# 	except Exception as e:
# 		print("Warning: Failed to communicate with GXHTC3 (THS) or",e)

'''MGS-Sensor'''
# if 0x30 in onboard_i2c_scan:
# 	try :
# 		import mmc5603
# 		onboard_mgs = mmc5603.MMC5603(onboard_i2c)
# 	except Exception as e:
# 		print("Warning: Failed to communicate with MMC5603 (MGS) or",e)

'''MCU_temperature'''
def onboard_temperature():
	return mcu_temperature()

'''2RGB_WS2812'''    
from ws2812x import NeoPixel
onboard_rgb = NeoPixel(Pin(9), 2)

'''1Buzzer-Music'''
from musicx import MIDI
onboard_music = MIDI(onboard_bot)

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

B1key = Button(9)
B2key = KEYSensor(0, 0)
A1key = KEYSensor(0, 2100)
A2key = KEYSensor(0, 1500)
A3key = KEYSensor(0, 800)
A4key = KEYSensor(0, 2700)

'''2LED-Multiplex RGB'''
class LED:
    def __init__(self, rgb, num=2, color=7):
        self._rgb = rgb
        self._col = [color] * num
        self._color = ((0, 0, 0), (1, 0, 0), (0, 1, 0), (0, 0, 1), (1, 1, 0), (0, 1, 1), (1, 0, 1), (1, 1, 1))

    def setbrightness(self, index, value):
        self._rgb[index - 1] = (value if self._color[self._col[index-1]][0] else 0,
                                value if self._color[self._col[index-1]][1] else 0,
                                value if self._color[self._col[index-1]][2] else 0)
        self._rgb.write()

    def getbrightness(self, index):
        color = self._rgb[index - 1]
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
        return True if self.getbrightness(index) >= 50 else False

    def setcolor(self, index, color, value=50):
        self._col[index-1] = color
        self.setbrightness(index, value)

onboard_led = LED(onboard_rgb)

'''Reclaim memory'''
gc.collect()
