# -*- coding: UTF-8 -*-
import time
from micropython import const

_ES_MODULE_ADC      = const(0x01) 
_ES_MODULE_DAC      = const(0x02) 
_ES_MODULE_ADC_DAC  = const(0x03) 
_ES_MODULE_LINE     = const(0x04) 
_BIT_LENGTH_16BITS  = const(0x03)
_FMT_I2S_NORMAL     = const(0x00)  
_I2S_MODE_SLAVE     = const(0x00)   
_ADC_INPUT_LINE     = const(0x01)  
_DAC_OUTPUT_ALL     = const(0x02)  
_LCLK_DIV           = const(256)  
_MCLK_DIV           = const(0x04)  

class ES8374:
    def __init__(self, i2c_bus=None, i2c_addr=0x10, gain=5, pga_en=1):
        self.i2c_bus = i2c_bus
        self.i2c_addr = i2c_addr
        self.stop()
        self.init_reg(_I2S_MODE_SLAVE, ((_BIT_LENGTH_16BITS << 4) | _FMT_I2S_NORMAL), _DAC_OUTPUT_ALL, _ADC_INPUT_LINE)
        self.mic_gain(gain)
        self.pga_enable(pga_en)
        self.configI2SFormat(_ES_MODULE_ADC_DAC, _FMT_I2S_NORMAL)

    def _readReg(self, regAddr):
        return  self.i2c_bus.readfrom_mem(self.i2c_addr, regAddr, 1)[0] 

    def _writeReg(self, regAddr, data):
        self.i2c_bus.writeto_mem(self.i2c_addr, regAddr, data.to_bytes(1, 'little'))

    def init_reg(self, ms_mode, fmt, out_channel, in_channel):
        self._writeReg(0x00, 0x3F)# IC Rst start
        self._writeReg(0x00, 0x03)# IC Rst stop
        self._writeReg(0x01, 0x7F)# IC clk on # M ORG 7F
        self._writeReg(0x0f, (self._readReg(0x0F) & 0x7f) | (ms_mode << 7))# CODEC IN I2S SLAVE MODE

        self._writeReg(0x6F, 0xA0)# pll set:mode enable
        self._writeReg(0x72, 0x41)# pll set:mode set
        self._writeReg(0x09, 0x01)# pll set:reset on ,set start
        self._writeReg(0x0C, 0x22)# pll set:k
        self._writeReg(0x0D, 0x2E)# pll set:k
        self._writeReg(0x0E, 0xC6)# pll set:k
        self._writeReg(0x0A, 0x3A)# pll set:
        self._writeReg(0x0B, 0x07)# pll set:n
        self._writeReg(0x09, 0x41)# pll set:reset off ,set stop
        self.i2sConfigClock()
        self._writeReg(0x24, 0x08)# adc set
        self._writeReg(0x36, 0x00)# dac set
        self._writeReg(0x12, 0x30)# timming set
        self._writeReg(0x13, 0x20)# timming set
        self.configI2SFormat(_ES_MODULE_ADC, fmt)
        self.configI2SFormat(_ES_MODULE_DAC, fmt)
        self._writeReg(0x21, 0x50)# adc set: SEL LIN1 CH+PGAGAIN=0DB
        self._writeReg(0x22, 0xFF)# adc set: PGA GAIN=0DB
        self._writeReg(0x21, 0x14)# adc set: SEL LIN1 CH+PGAGAIN=18DB
        self._writeReg(0x22, 0x55)# pga = +15db
        self._writeReg(0x08, 0x21)# set class d divider = 33, to avoid the high frequency tone on laudspeaker
        self._writeReg(0x00, 0x80)#  IC START
        time.sleep(0.05)
        self._writeReg(0x25, 0x00)#  ADCVOLUME on
        self._writeReg(0x38, 0x00)#  DACVOLUME on
        self._writeReg(0x14, 0x8A)#  IC START
        self._writeReg(0x15, 0x40)#  IC START
        self._writeReg(0x1A, 0xA0)#  monoout set
        self._writeReg(0x1B, 0x19)#  monoout set
        self._writeReg(0x1C, 0x90)#  spk set
        self._writeReg(0x1D, 0x01)#  spk set
        self._writeReg(0x1F, 0x00)#  spk set
        self._writeReg(0x1E, 0x20)#  spk on
        self._writeReg(0x28, 0x70)#  alc set 0x70
        #self._writeReg(0x26, 0x4E)#  alc set
        #self._writeReg(0x27, 0x10)#  alc set
        #self._writeReg(0x29, 0x00)#  alc set
        #self._writeReg(0x2B, 0x00)#  alc set
        self._writeReg(0x25, 0x00)#  ADCVOLUME on
        self._writeReg(0x38, 0x00)#  DACVOLUME on
        self._writeReg(0x37, 0x30)#  dac set
        self._writeReg(0x6D, 0x60)# SEL:GPIO1=DMIC CLK OUT+SEL:GPIO2=PLL CLK OUT
        self._writeReg(0x71, 0x05)# for automute setting
        self._writeReg(0x73, 0x70)
        self.configDACOutput(out_channel)# 0x3c Enable DAC and Enable Lout/Rout/1/2
        self.configADCInput(in_channel)# 0x00 LINSEL & RINSEL, LIN1/RIN1 as ADC Input DSSEL,use one DS Reg11 DSR, LINPUT1-RINPUT1
        self.voice_volume(95)
        self._writeReg(0x37, 0x00)#  dac set
        '''
        reg = self._readReg(0x1a) # disable lout
        reg |= 0x08
        self._writeReg(0x1a, reg)
        reg &= 0xdf
        self._writeReg(0x1a, reg)
        self._writeReg(0x1D, 0x12) #  mute speaker
        self._writeReg(0x1E, 0x20) #  disable class d
        reg = self._readReg(0x15)  # power up dac
        reg &= 0xdf
        self._writeReg(0x15, reg)
        reg = self._readReg(0x1a) # disable lout
        reg |= 0x20
        self._writeReg(0x1a, reg)
        reg &= 0xf7
        self._writeReg(0x1a, reg)
        self._writeReg(0x1D, 0x02) #  mute speaker
        self._writeReg(0x1E, 0xa0) #  disable class d
        self.voice_mute(0)
        '''
    def stop(self):
        self.voice_mute(1)
        self._writeReg(0x1a, self._readReg(0x1a)| 0x08)
        self._writeReg(0x1a, self._readReg(0x1a)& 0xdf)
        self._writeReg(0x1D, 0x12)# mute speaker
        self._writeReg(0x1E, 0x20)# disable class d
        self._writeReg(0x15, self._readReg(0x15)| 0x20)
        self._writeReg(0x10, self._readReg(0x10)| 0xc0)
        self._writeReg(0x21, self._readReg(0x21)| 0xc0)

    def i2sConfigClock(self):
        self._writeReg(0x0f, (self._readReg(0x0F) & 0xe0) | _MCLK_DIV)
        self._writeReg(0x06, _LCLK_DIV >> 8)# ADCFsMode,singel SPEED,RATIO=256
        self._writeReg(0x07, _LCLK_DIV & 0xFF)# ADCFsMode,singel SPEED,RATIO=256

    def configI2SFormat(self, mode, fmt):
        fmt_tmp = ((fmt & 0xf0) >> 4)
        fmt_i2s =  fmt & 0x0f
        if (mode == _ES_MODULE_ADC or mode == _ES_MODULE_ADC_DAC):
            reg = self._readReg(0x10)
            reg &= 0xfc
            self._writeReg(0x10, (reg|fmt_i2s))
            self.setBitsPerSample(mode, 3)

        if (mode == _ES_MODULE_DAC or mode == _ES_MODULE_ADC_DAC):
            reg = self._readReg(0x11)
            reg &= 0xfc
            self._writeReg(0x11, (reg|fmt_i2s))
            self.setBitsPerSample(mode, 3)

    # set Bits Per Sample
    def setBitsPerSample(self, mode, bit_per_smaple):
        bits = bit_per_smaple & 0x0f
        if (mode == _ES_MODULE_ADC or mode == _ES_MODULE_ADC_DAC):
            reg = self._readReg(0x10)
            reg &= 0xe3
            self._writeReg(0x10, (reg| (bits << 2)))

        if (mode == _ES_MODULE_DAC or mode == _ES_MODULE_ADC_DAC):
            reg = self._readReg(0x11)
            reg &= 0xe3
            self._writeReg(0x11, (reg| (bits << 2)))

    def configDACOutput(self, output):
        self._writeReg(0x1d, 0x02)
        reg = self._readReg(0x1c) # set spk mixer
        reg |= 0x80
        self._writeReg(0x1c, reg)
        self._writeReg(0x1D, 0x02) # spk set
        self._writeReg(0x1F, 0x00) # spk set
        self._writeReg(0x1E, 0xA0) # spk on

    def configADCInput(self, input):
        reg = self._readReg(0x21)
        reg = (reg & 0xcf) | 0x24
        self._writeReg( 0x21, reg)

    def mic_volume(self, volume=None):
        if volume is None:
            return round(100 - self._readReg(0x25) * 100 / 192)
        else:
            self._writeReg(0x25, (100 - volume) * 192 // 100)

    def voice_volume(self, volume=None):
        if volume is None:
            return round(100 - self._readReg(0x38) * 100 / 192)
        else:
            self._writeReg(0x38, (100 - volume)  * 192 // 100)

    def voice_mute(self, enable=None):
        if enable is None:
            return True if self._readReg(0x36) & 0x40 else False
        else:
            self._writeReg(0x36, (self._readReg(0x36)& 0xdf) | (enable << 5))

    def mic_gain(self, gain):
        gain_n = max(min(gain, 15), 0)
        self._writeReg(0x22, (gain_n | (gain_n<<4))) # MIC PGA -3.5db ~ 24db

    def pga_enable(self, enable): 
        self._writeReg(0x21, (self._readReg(0x21) & 0xfb) | (enable << 2)) # MIC PGA 0db or 15db
