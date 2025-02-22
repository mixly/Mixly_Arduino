"""
MMC5603

Micropython library for the MMC5603NJ（Magnetic）
=======================================================

#Preliminary composition                20221017

dahanzimin From the Mixly Team
"""
import time,math
from micropython import const

MMC5603_ADDRESS              = const(0x30)

MMC5603_REG_DATA             = const(0x00)
MMC5603_REG_TMP              = const(0x09)
MMC5603_REG_ODR              = const(0x1A)
MMC5603_REG_CTRL0            = const(0x1B)
MMC5603_REG_CTRL1            = const(0x1C)
MMC5603_REG_CTRL2            = const(0x1D)

MMC5603_REG_X_THD            = const(0x1E)
MMC5603_REG_Y_THD            = const(0x1F)
MMC5603_REG_Z_THD            = const(0x20)
MMC5603_REG_ST_X_VAL         = const(0x27)
MMC5603_REG_DEVICE_ID        = const(0x39)

class MMC5603:
    def __init__(self, i2c_bus):
        self._device = i2c_bus
        self._address = MMC5603_ADDRESS 
        self.raw_x = 0.0
        self.raw_y = 0.0
        self.raw_z = 0.0

        if self._chip_id() != 0x10:         #Check product ID
            raise AttributeError("Cannot find a MMC5603")
        try:                                #Read calibration file
            import magnetic_cal 
            self._offset_x = magnetic_cal._offset_x
            self._offset_y = magnetic_cal._offset_y
            self._offset_z = magnetic_cal._offset_z
        except:
            self._offset_x = 524288
            self._offset_y = 524288
            self._offset_z = 524288
        #print("offset:",self._offset_x ,self._offset_y,self._offset_z)

        self._auto_selftest()               #Auto self-test registers configuration
        self._set()
        self._continuous_mode(0x00, 50)     #Work mode setting
        time.sleep(0.05)
    
    def _wreg(self, reg, val):
        '''Write memory address'''
        self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

    def _rreg(self, reg,nbytes=1):
        '''Read memory address'''
        return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

    def _chip_id(self):  
        return self._rreg(MMC5603_REG_DEVICE_ID)
            
    def _auto_selftest(self):
        '''Auto self-test registers configuration'''
        st_thd_reg=[0,0,0]
        st_thr_data=[0,0,0]
        #/* Read trim data from reg 0x27-0x29 */
        _buffer=self._rreg(MMC5603_REG_ST_X_VAL,3)
        for i in range(0, 3, 1):
            st_thr_data[i]=(_buffer[i]-128)*32
            if st_thr_data[i] < 0:
                st_thr_data[i]=-st_thr_data[i]
            st_thd=(st_thr_data[i]-st_thr_data[i]//5)//8
            if st_thd > 255:
                st_thd_reg[i]=0xFF
            else:
                st_thd_reg[i]=st_thd
        #/* Write threshold into the reg 0x1E-0x20 */   
        self._wreg(MMC5603_REG_X_THD, st_thd_reg[0])    
        self._wreg(MMC5603_REG_Y_THD, st_thd_reg[1])    
        self._wreg(MMC5603_REG_Z_THD, st_thd_reg[2])
        
    def _set(self):
        '''Do SET operation'''
        self._wreg(MMC5603_REG_CTRL0, 0X08)
        time.sleep(0.005)

    def _continuous_mode(self,bandwith,sampling_rate):
        '''Work mode setting'''
        self._wreg(MMC5603_REG_CTRL1, bandwith)
        self._wreg(MMC5603_REG_ODR, sampling_rate)
        self._wreg(MMC5603_REG_CTRL0, 0X80|0X20)    
        self._wreg(MMC5603_REG_CTRL2, 0x10)
        
    def getdata(self): 
        _buf=self._rreg( MMC5603_REG_DATA,9)
        #/* Transform to unit Gauss */
        self.raw_x=(_buf[0] << 12) | (_buf[1] << 4) | (_buf[6] >> 4)
        self.raw_y=(_buf[2] << 12) | (_buf[3] << 4) | (_buf[7] >> 4)
        self.raw_z=(_buf[4] << 12) | (_buf[5] << 4) | (_buf[8] >> 4)
        return (-0.0625*(self.raw_x-self._offset_x), -0.0625*(self.raw_y-self._offset_y), -0.0625*(self.raw_z-self._offset_z))

    def calibrate(self):
        print("The magnetic field will be calibrated")
        print("Please pick up the board and rotate the '8' shape in the air")
        time.sleep(2)
        self.getdata()
        min_x = max_x = self.raw_x
        min_y = max_y = self.raw_y
        min_z = max_z = self.raw_z
        ticks_start = time.ticks_ms()
        while (time.ticks_diff(time.ticks_ms(), ticks_start) < 20000) :
            self.getdata()
            min_x = min(self.raw_x, min_x)
            max_x = max(self.raw_x, max_x)          
            min_y = min(self.raw_y, min_y)
            max_y = max(self.raw_y, max_y)
            min_z = min(self.raw_z, min_z)
            max_z = max(self.raw_z, max_z)
            time.sleep_ms(20)
            if time.ticks_diff(time.ticks_ms(), ticks_start) % 20 ==0:
                print("=",end ="")
        print(" 100%")
        self._offset_x = (max_x + min_x) / 2
        self._offset_y = (max_y + min_y) / 2
        self._offset_z = (max_z + min_z) / 2
        print("Save x_offset:{}, y_offset:{}, z_offset:{}".format(self._offset_x,self._offset_y,self._offset_z))
        s_f = open("magnetic_cal.py", "w+")
        s_f.write("_offset_x="+str(self._offset_x)+"\n")
        s_f.write("_offset_y="+str(self._offset_y)+"\n")
        s_f.write("_offset_z="+str(self._offset_z)+"\n")
        s_f.close()
        time.sleep(2)

    def getstrength(self):
        _x,_y,_z=self.getdata()
        return (math.sqrt(math.pow(_x, 2) + pow(_y, 2) + pow(_z, 2)))

    def getangle(self,upright=False):
        _x,_y,_z=self.getdata()
        if upright: #vertical 
            angle=math.atan2(_z, -_x)*(180 / math.pi) + 180 + 3
            return angle if angle<360 else angle-360
        else:       #horizontal
            angle=math.atan2(_y, -_x)*(180 / math.pi) + 180 + 3
            return angle if angle<360 else angle-360
