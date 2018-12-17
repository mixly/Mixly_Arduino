from ustruct import unpack as unp
import utime
from machine import Pin,I2C
NORMAL=0
BMP280_TEMP_OS_SKIP=0
BMP280_TEMP_OS_1=1
BMP280_TEMP_OS_2=2
BMP280_TEMP_OS_4=3
BMP280_TEMP_OS_8=4
BMP280_TEMP_OS_16=5
BMP280_PRES_OS_SKIP=0
BMP280_PRES_OS_1=1
BMP280_PRES_OS_2=2
BMP280_PRES_OS_4=3
BMP280_PRES_OS_8=4
BMP280_PRES_OS_16=5
BMP280_REGISTER_DIG_T1=0x88
BMP280_REGISTER_DIG_T2=0x8A
BMP280_REGISTER_DIG_T3=0x8C
BMP280_REGISTER_DIG_P1=0x8E
BMP280_REGISTER_DIG_P2=0x90
BMP280_REGISTER_DIG_P3=0x92
BMP280_REGISTER_DIG_P4=0x94
BMP280_REGISTER_DIG_P5=0x96
BMP280_REGISTER_DIG_P6=0x98
BMP280_REGISTER_DIG_P7=0x9A
BMP280_REGISTER_DIG_P8=0x9C
BMP280_REGISTER_DIG_P9=0x9E
BMP280_REGISTER_ID=0xD0
BMP280_REGISTER_RESET=0xE0
BMP280_REGISTER_STATUS=0xF3
BMP280_REGISTER_CONTROL=0xF4
BMP280_REGISTER_CONFIG=0xF5
BMP280_REGISTER_DATA=0xF7
class BMP280:
 def __init__(self,i2c_bus,addr=0x77):
  self._bmp_i2c=i2c_bus
  self._i2c_addr=addr
  self._bmp_i2c.start()
  self.chip_id=self._read(BMP280_REGISTER_ID,2)
  self._T1=unp('<H',self._read(BMP280_REGISTER_DIG_T1,2))[0]
  self._T2=unp('<h',self._read(BMP280_REGISTER_DIG_T2,2))[0]
  self._T3=unp('<h',self._read(BMP280_REGISTER_DIG_T3,2))[0]
  self._P1=unp('<H',self._read(BMP280_REGISTER_DIG_P1,2))[0]
  self._P2=unp('<h',self._read(BMP280_REGISTER_DIG_P2,2))[0]
  self._P3=unp('<h',self._read(BMP280_REGISTER_DIG_P3,2))[0]
  self._P4=unp('<h',self._read(BMP280_REGISTER_DIG_P4,2))[0]
  self._P5=unp('<h',self._read(BMP280_REGISTER_DIG_P5,2))[0]
  self._P6=unp('<h',self._read(BMP280_REGISTER_DIG_P6,2))[0]
  self._P7=unp('<h',self._read(BMP280_REGISTER_DIG_P7,2))[0]
  self._P8=unp('<h',self._read(BMP280_REGISTER_DIG_P8,2))[0]
  self._P9=unp('<h',self._read(BMP280_REGISTER_DIG_P9,2))[0]
  self._t_os=BMP280_TEMP_OS_2
  self._p_os=BMP280_PRES_OS_16
  self._t_raw=0
  self._t_fine=0
  self._t=0
  self._p_raw=0
  self._p=0
  self._read_wait_ms=100
  self._new_read_ms=200
  self._last_read_ts=0
 def _read(self,addr,size=1):
  return self._bmp_i2c.readfrom_mem(self._i2c_addr,addr,size)
 def _write(self,addr,b_arr):
  if not type(b_arr)is bytearray:
   b_arr=bytearray([b_arr])
  return self._bmp_i2c.writeto_mem(self._i2c_addr,addr,b_arr)
 def _gauge(self):
  now=utime.ticks_ms()
  if utime.ticks_diff(now,self._last_read_ts)>self._new_read_ms:
   self._last_read_ts=now
   r=self._t_os+(self._p_os<<3)+(1<<6)
   self._write(BMP280_REGISTER_CONTROL,r)
   utime.sleep_ms(100)
   d=self._read(BMP280_REGISTER_DATA,6)
   self._p_raw=(d[0]<<12)+(d[1]<<4)+(d[2]>>4)
   self._t_raw=(d[3]<<12)+(d[4]<<4)+(d[5]>>4)
   self._t_fine=0
   self._t=0
   self._p=0
 def load_test_calibration(self):
  self._T1=27504
  self._T2=26435
  self._T3=-1000
  self._P1=36477
  self._P2=-10685
  self._P3=3024
  self._P4=2855
  self._P5=140
  self._P6=-7
  self._P7=15500
  self._P8=-14600
  self._P9=6000
 def load_test_data(self):
  self._t_raw=519888
  self._p_raw=415148
 def print_calibration(self):
  print("T1: {} {}".format(self._T1,type(self._T1)))
  print("T2: {} {}".format(self._T2,type(self._T2)))
  print("T3: {} {}".format(self._T3,type(self._T3)))
  print("P1: {} {}".format(self._P1,type(self._P1)))
  print("P2: {} {}".format(self._P2,type(self._P2)))
  print("P3: {} {}".format(self._P3,type(self._P3)))
  print("P4: {} {}".format(self._P4,type(self._P4)))
  print("P5: {} {}".format(self._P5,type(self._P5)))
  print("P6: {} {}".format(self._P6,type(self._P6)))
  print("P7: {} {}".format(self._P7,type(self._P7)))
  print("P8: {} {}".format(self._P8,type(self._P8)))
  print("P9: {} {}".format(self._P9,type(self._P9)))
 def _calc_t_fine(self):
  self._gauge()
  if self._t_fine==0:
   var1=(((self._t_raw>>3)-(self._T1<<1))*self._T2)>>11
   var2=(((((self._t_raw>>4)-self._T1)*((self._t_raw>>4)-self._T1))>>12)*self._T3)>>14
   self._t_fine=var1+var2
 def get_BMP_temperature(self):
  self._calc_t_fine()
  if self._t==0:
   self._t=((self._t_fine*5+128)>>8)/100.
  return self._t
 def get_BMP_pressure(self):
  self._calc_t_fine()
  if self._p==0:
   var1=self._t_fine-128000
   var2=var1*var1*self._P6
   var2=var2+((var1*self._P5)<<17)
   var2=var2+(self._P4<<35)
   var1=((var1*var1*self._P3)>>8)+((var1*self._P2)<<12)
   var1=(((1<<47)+var1)*self._P1)>>33
   if var1==0:
    return 0
   p=1048576-self._p_raw
   p=int((((p<<31)-var2)*3125)/var1)
   var1=(self._P9*(p>>13)*(p>>13))>>25
   var2=(self._P8*p)>>19
   p=((p+var1+var2)>>8)+(self._P7<<4)
   self._p=p/256.0
  return self._p
