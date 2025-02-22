"""
MixGo CAR -Onboard resources

MicroPython library for the MixGo CAR (ESP32C3)
=======================================================

#Preliminary composition                       20220804

dahanzimin From the Mixly Team
"""
import time,gc,ms32006
from machine import Pin,SoftI2C,ADC,RTC

'''RTC'''
rtc_clock=RTC()

'''i2c-onboard'''
onboard_i2c=SoftI2C(scl = Pin(7), sda = Pin(6), freq = 400000)

'''4RGB_WS2812'''    #color_chase(),rainbow_cycle()方法移至类里
from ws2812 import NeoPixel
onboard_rgb = NeoPixel(Pin(8), 4, ORDER=(0, 1, 2, 3))

'''1Buzzer-Music'''
from music import MIDI
onboard_music =MIDI(5)

'''1KEY_Button'''
class Button:
    def __init__(self, pin):
        self.pin = Pin(pin, Pin.IN)
        self.flag = True
        
    def get_presses(self, delay = 1):
        last_time, last_state, presses = time.time(), 0, 0
        while time.time() < last_time + delay:
            time.sleep_ms(50)
            if last_state == 0 and self.pin.value() == 1:
                last_state = 1
            if last_state == 1 and self.pin.value() == 0:
                last_state, presses = 0, presses + 1
        return presses

    def is_pressed(self):
        return not self.pin.value()

    def was_pressed(self, flag = 0):
        if(self.pin.value() != self.flag):
            self.flag = self.pin.value()
            time.sleep(0.02)
            if self.flag:
                return False
            else:
                return True

    def irq(self, handler, trigger):
        self.pin.irq(handler = handler, trigger = trigger)
        
button = Button(9)

'''MS32006-Drive'''    
class CAR:
    MOTO_R      =1
    MOTO_R1     =0
    MOTO_R2     =7
    MOTO_L      =2
    MOTO_L1     =4
    MOTO_L2     =3

    def __init__(self, i2c_bus):
        self.motor_a=ms32006.MS32006(i2c_bus,ms32006.ADDRESS_A)
        self.motor_b=ms32006.MS32006(i2c_bus,ms32006.ADDRESS_B)
        self.motor_move("P")

    def motor(self,index,action,speed=0):
        if action=="N":
            if index==self.MOTO_R:
                self.motor_a.dc_motor(ms32006.MOT_N,speed)  
            if index==self.MOTO_L:
                self.motor_b.dc_motor(ms32006.MOT_N,speed) 
        elif action=="P":
            if index==self.MOTO_R:
                self.motor_a.dc_motor(ms32006.MOT_P,speed) 
            if index==self.MOTO_L:
                self.motor_b.dc_motor(ms32006.MOT_P,speed)
        elif action=="CW":
            if index==self.MOTO_R:
                self.motor_a.dc_motor(ms32006.MOT_CW,speed)
            if index==self.MOTO_L:
                self.motor_b.dc_motor(ms32006.MOT_CW,speed)
        elif action=="CCW":
            if index==self.MOTO_R:
                self.motor_a.dc_motor(ms32006.MOT_CCW,speed)
            if index==self.MOTO_L:
                self.motor_b.dc_motor(ms32006.MOT_CCW,speed)
        else:
            raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

    def stepper(self,index,action,mot_pps,mot_step):
        if action=="N":
            if index==self.MOTO_R1 or index==self.MOTO_L1:
                self.motor_a.close(index)  
            if index==self.MOTO_R2 or index==self.MOTO_L2:
                self.motor_b.close(index-3)  
        elif action=="P":
            if index==self.MOTO_R1 or index==self.MOTO_L1:
                self.motor_a.stop(index)  
            if index==self.MOTO_R2 or index==self.MOTO_L2:
                self.motor_b.stop(index-3)  
        elif action=="CW":
            if index==self.MOTO_R1 or index==self.MOTO_L1:
                self.motor_a.move(index,ms32006.MOT_CW,mot_pps,mot_step)  
            if index==self.MOTO_R2 or index==self.MOTO_L2:
                self.motor_b.move(index-3,ms32006.MOT_CW,mot_pps,mot_step)  
        elif action=="CCW":
            if index==self.MOTO_R1 or index==self.MOTO_L1:
                self.motor_a.move(index,ms32006.MOT_CCW,mot_pps,mot_step)  
            if index==self.MOTO_R2 or index==self.MOTO_L2:
                self.motor_b.move(index-3,ms32006.MOT_CCW,mot_pps,mot_step)  
        else:
            raise ValueError('Invalid input, valid are "N","P","CW","CCW"')

    def stepper_readwork(self,index):
        if index==self.MOTO_R1 or index==self.MOTO_L1:
            return self.motor_a.readwork(index)  
        if index==self.MOTO_R2 or index==self.MOTO_L2:
            return self.motor_b.readwork(index-3)  

    def stepper_move(self,action,mot_pps,mot_step):
        if action=="N":
            self.motor_a.close(self.MOTO_R1) 
            self.motor_a.close(self.MOTO_R2-3) 
            self.motor_b.close(self.MOTO_L1)
            self.motor_b.close(self.MOTO_L2-3)  
        elif action=="P":
            self.motor_a.stop(self.MOTO_R1) 
            self.motor_a.stop(self.MOTO_R2-3) 
            self.motor_b.stop(self.MOTO_L1)
            self.motor_b.stop(self.MOTO_L2-3)
        elif action=="F":
            self.motor_a.move(self.MOTO_R1,ms32006.MOT_CW,mot_pps,mot_step) 
            self.motor_a.move(self.MOTO_R2-3,ms32006.MOT_CCW,mot_pps,mot_step) 
            self.motor_b.move(self.MOTO_L1,ms32006.MOT_CW,mot_pps,mot_step)
            self.motor_b.move(self.MOTO_L2-3,ms32006.MOT_CCW,mot_pps,mot_step)  
        elif action=="B":
            self.motor_a.move(self.MOTO_R1,ms32006.MOT_CCW,mot_pps,mot_step) 
            self.motor_a.move(self.MOTO_R2-3,ms32006.MOT_CW,mot_pps,mot_step) 
            self.motor_b.move(self.MOTO_L1,ms32006.MOT_CCW,mot_pps,mot_step)
            self.motor_b.move(self.MOTO_L2-3,ms32006.MOT_CW,mot_pps,mot_step)  
        elif action=="L":
            self.motor_a.move(self.MOTO_R1,ms32006.MOT_CCW,mot_pps,mot_step) 
            self.motor_a.move(self.MOTO_R2-3,ms32006.MOT_CCW,mot_pps,mot_step) 
            self.motor_b.move(self.MOTO_L1,ms32006.MOT_CCW,mot_pps,mot_step)
            self.motor_b.move(self.MOTO_L2-3,ms32006.MOT_CCW,mot_pps,mot_step)  
        elif action=="R":
            self.motor_a.move(self.MOTO_R1,ms32006.MOT_CW,mot_pps,mot_step) 
            self.motor_a.move(self.MOTO_R2-3,ms32006.MOT_CW,mot_pps,mot_step) 
            self.motor_b.move(self.MOTO_L1,ms32006.MOT_CW,mot_pps,mot_step)
            self.motor_b.move(self.MOTO_L2-3,ms32006.MOT_CW,mot_pps,mot_step)  
        else:
            raise ValueError('Invalid input, valid are "N","P","F","B","L","R"') 

    def motor_move(self,action,speed=100):
        if action=="N":
            self.motor_a.dc_motor(ms32006.MOT_N,speed) 
            self.motor_b.dc_motor(ms32006.MOT_N,speed) 
        elif action=="P":
            self.motor_a.dc_motor(ms32006.MOT_P,speed) 
            self.motor_b.dc_motor(ms32006.MOT_P,speed) 
        elif action=="F":
            self.motor_a.dc_motor(ms32006.MOT_CCW,speed)
            self.motor_b.dc_motor(ms32006.MOT_CW,speed) 
        elif action=="B":
            self.motor_a.dc_motor(ms32006.MOT_CW,speed) 
            self.motor_b.dc_motor(ms32006.MOT_CCW,speed) 
        elif action=="L":
            self.motor_a.dc_motor(ms32006.MOT_CCW,speed) 
            self.motor_b.dc_motor(ms32006.MOT_CCW,speed) 
        elif action=="R":
            self.motor_a.dc_motor(ms32006.MOT_CW,speed) 
            self.motor_b.dc_motor(ms32006.MOT_CW,speed) 
        else:
            raise ValueError('Invalid input, valid are "N","P","F","B","L","R"') 

try :
    car=CAR(onboard_i2c) #Including LED,motor,patrol,obstacle
except Exception as e:
    print("Warning: Failed to communicate with MS32006 or",e)

'''IRtube-Drive''' 
class IRtube:

    OA=1                    #Obstacle avoidance mode only
    LP=2                    #Line patrol mode only
    AS=3                    #Automatic mode switching

    def __init__(self):
        #auto：是否手动切换模拟开关转换
        self.adc0 = ADC(Pin(0))
        self.adc1 = ADC(Pin(1))
        self.adc2 = ADC(Pin(3))
        self.adc3 = ADC(Pin(4))
        
        self.adc0.atten(ADC.ATTN_11DB)
        self.adc1.atten(ADC.ATTN_11DB)
        self.adc2.atten(ADC.ATTN_11DB)
        self.adc3.atten(ADC.ATTN_11DB)
        
        self.convert=Pin(2, Pin.OUT)
        self._mode=self.AS

    def read_bat(self):
        #读电池电量，返回电压值
        self.convert = ADC(Pin(2))
        self.convert.atten(ADC.ATTN_11DB)
        time.sleep_ms(5)
        bat_adc=self.convert.read()*0.0011
        time.sleep_ms(5)
        self.convert=Pin(2, Pin.OUT)
        return bat_adc
        
    def obstacle(self):
        #读避障传感器,返回前左、右，后左、右，ADC值
        if self._mode==self.AS:
            self.convert.value(0)
            time.sleep_ms(2)
        if self._mode==self.OA or self._mode==self.AS :
            return self.adc1.read_u16(),self.adc2.read_u16(),self.adc3.read_u16(),self.adc0.read_u16()
        else:
            raise ValueError('In line patrol mode, obstacle avoidance data cannot be read')
        
    def patrol(self):
        #读巡线传感器,返回左、中左、中右、右，ADC值
        if self._mode==self.AS:
            self.convert.value(1)
            time.sleep_ms(2)
        if self._mode==self.LP or self._mode==self.AS:
            return self.adc0.read_u16(),self.adc1.read_u16(),self.adc2.read_u16(),self.adc3.read_u16()
        else:
            raise ValueError('In obstacle avoidance mode, line patrol data cannot be read')      

    def ir_mode(self,select=0):
        #切换模式
        self._mode=select
        if select==self.OA:
            self.convert.value(0)
        if select==self.LP:
            self.convert.value(1)
        time.sleep_ms(2)

onboard_info = IRtube()

'''Reclaim memory'''
gc.collect()
