"""
APDS9960`

MicroPython library for the APDS9960(Supports gesture, proximity, and color detection)
=======================================================

#Preliminary composition                                                    20220224
#base on https://github.com/adafruit/Adafruit_CircuitPython_BusDevice       20220623

dahanzimin From the Mixly Team
"""

import time
from micropython import const

_DEVICE_ID                  = const(0xAB)
_APDS9960_ENABLE            = const(0x80)
_APDS9960_ATIME             = const(0x81)
_APDS9960_PILT              = const(0x89)
_APDS9960_PIHT              = const(0x8B)
_APDS9960_PERS              = const(0x8C)
_APDS9960_CONTROL           = const(0x8F)
_APDS9960_ID                = const(0x92)
_APDS9960_STATUS            = const(0x93)
_APDS9960_CDATAL            = const(0x94)
_APDS9960_PDATA             = const(0x9C)
_APDS9960_GPENTH            = const(0xA0)
_APDS9960_GEXTH             = const(0xA1)
_APDS9960_GCONF1            = const(0xA2)
_APDS9960_GCONF2            = const(0xA3)
_APDS9960_GPULSE            = const(0xA6)
_APDS9960_GCONF4            = const(0xAB)
_APDS9960_GFLVL             = const(0xAE)
_APDS9960_GSTATUS           = const(0xAF)
_APDS9960_AICLEAR           = const(0xE7)
_APDS9960_GFIFO_U           = const(0xFC)
_BIT_MASK_ENABLE_EN         = const(0x01)
_BIT_MASK_ENABLE_COLOR      = const(0x02)
_BIT_MASK_ENABLE_PROX       = const(0x04)
_BIT_MASK_ENABLE_PROX_INT   = const(0x20)
_BIT_MASK_ENABLE_GESTURE    = const(0x40)
_BIT_MASK_STATUS_AVALID     = const(0x01)
_BIT_MASK_STATUS_GINT       = const(0x04)
_BIT_MASK_GSTATUS_GFOV      = const(0x02)
_BIT_MASK_GCONF4_GFIFO_CLR  = const(0x04)
_BIT_POS_PERS_PPERS         = const(4)
_BIT_MASK_PERS_PPERS        = const(0xF0)
_BIT_POS_CONTROL_AGAIN      = const(0)
_BIT_MASK_CONTROL_AGAIN     = const(3)
_BIT_POS_CONTROL_PGAIN      = const(2)
_BIT_MASK_CONTROL_PGAIN     = const(0x0C)
_BIT_POS_GCONF2_GGAIN       = const(5)
_BIT_MASK_GCONF2_GGAIN      = const(0x60)

class APDS9960:
    def __init__(self, i2c, address=0x39):
        self._device = i2c
        self._address = address 
        self._select = [True,True,True]

        if self._rreg(_APDS9960_ID) != _DEVICE_ID:
            raise AttributeError("Cannot find a APDS9960")

        self.enable(True)                   # Re-enable sensor and wait 10ms for the power on delay to finish
        time.sleep(0.010)
        self._wreg(_APDS9960_GPENTH, 0x05)  # Enter gesture engine at >= 5 proximity counts
        self._wreg(_APDS9960_GEXTH, 0x1E)   # Exit gesture engine if all counts drop below 30
        self._wreg(_APDS9960_GCONF1, 0x82)  # GEXPERS: 2 (4 cycles), GEXMSK: 0 (default) GFIFOTH: 2 (8 datasets)
        self._wreg(_APDS9960_GCONF2, 0x41)  # GGAIN: 2 (4x), GLDRIVE: 100 mA (default), GWTIME: 1 (2.8ms)
        self._wreg(_APDS9960_GPULSE, 0x85)  # GPULSE: 5 (6 pulses), GPLEN: 2 (16 us)
        self.color_integration_time(256)    # ATIME: 256 (712ms color integration time, max count of 65535)

    # method for reading and writing to I2C
    def _wreg(self, reg, val):
        '''Write memory address'''
        self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

    def _writecmdonly(self, val):
        """Writes a command and 0 bytes of data to the I2C device"""
        self._device.writeto(self._address,val.to_bytes(1, 'little'))

    def _rreg(self, reg,nbytes=1):
        '''Read memory address'''
        return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

    def _get_bit(self, reg, mask):
        """Gets a single bit value from the I2C device's register"""
        return bool(self._rreg(reg) & mask)

    def _set_bit(self, reg, mask, value):
        """Sets a single bit value in the I2C device's register"""
        buf=self._rreg(reg)
        buf= buf | mask if value else buf & ~mask
        self._wreg(reg,buf)

    def _set_bits(self, reg, pos, mask, value):
        """Sets a multi-bit value in the I2C device's register"""
        buf=self._rreg(reg)
        buf = (buf & ~mask) | (value << pos)
        self._wreg(reg,buf)

    def _color_data16(self, reg):
        """Sends a command and reads 2 bytes of data from the I2C device"""
        buf = self._rreg(reg,2)
        return buf[1] << 8 | buf[0]

    def enable(self, value):
        """sensor is enabled"""
        self._set_bit(_APDS9960_ENABLE, _BIT_MASK_ENABLE_EN, value)

    def enable_proximity(self, value):
        """sensor's proximity engine is enabled."""
        self._set_bit(_APDS9960_ENABLE, _BIT_MASK_ENABLE_PROX, value)

    def proximity_gain(self, value):
        """""Proximity sensor gain value"""
        #   proximity_gain" "Gain Multiplier"   "Note"
        #   0,              "1x",               "Power-on Default"
        #   1,              "2x",               ""
        #   2,              "4x",               ""
        #   3,              "8x",               ""     
        self._set_bits(_APDS9960_CONTROL, _BIT_POS_CONTROL_PGAIN, _BIT_MASK_CONTROL_PGAIN, value)

    def enable_gesture(self, value):
        """sensor's gesture engine is enabled"""
        self._set_bit(_APDS9960_ENABLE, _BIT_MASK_ENABLE_GESTURE, value)

    def gesture_gain(self, value):
        """Gesture mode gain value"""
        #   "gesture_gain"  "Gain Multiplier"   "Note"
        #   0,              "1x",               "Power-on Default"
        #   1,              "2x",               ""
        #   2,              "4x",               "Driver Default"
        #   3,              "8x",               ""         
        self._set_bits(_APDS9960_GCONF2, _BIT_POS_GCONF2_GGAIN, _BIT_MASK_GCONF2_GGAIN, value)

    def enable_color(self, value):
        """sensor's color/light engine is enabled"""  
        self._set_bit(_APDS9960_ENABLE, _BIT_MASK_ENABLE_COLOR, value)

    def color_gain(self, value):
        """Color/light sensor gain value"""
        #   "color_gain"   "Gain Multiplier"   "Note"
        #   0,             "1x",               "Power-on Default"
        #   1,             "4x",               "Driver Default"
        #   2,             "16x",              ""
        #   3,             "64x",              ""  
        self._set_bits(_APDS9960_CONTROL, _BIT_POS_CONTROL_AGAIN, _BIT_MASK_CONTROL_AGAIN, value)

    def color_integration_time(self, value):
        """Color/light sensor gain"""
        #   "color_integration_time"   "Time"       "Max Count"     "Note"
        #   1,                          "2.78 ms",  1025,           "Power-on Default"
        #   10,                         "27.8 ms",  10241,          ""
        #   37,                         "103 ms",   37889,          ""
        #   72,                         "200 ms",   65535,          ""
        #   256,                        "712 ms",   65535,          "Driver Default"
        self._wreg(_APDS9960_ATIME, 256 - value)

    ## PROXIMITY
    def proximity(self,gain=2):
        """Proximity sensor data"""
        if self._select[0]: 
            self._select=[False,True,True]
            self.enable_proximity(True)
            self.enable_gesture(False)
            self.enable_color(False)
            self.proximity_gain(gain)

        return self._rreg(_APDS9960_PDATA)

    ## GESTURE
    def gesture(self,gain=3):
        """Gesture sensor data"""
        # If FIFOs have overflowed we're already way too late, so clear those FIFOs and wait
        if self._select[1]: 
            self._select=[True,False,True]
            self.enable_proximity(True)
            self.enable_gesture(True)
            self.enable_color(False)
            self.gesture_gain(gain)

        if self._get_bit(_APDS9960_GSTATUS, _BIT_MASK_GSTATUS_GFOV):
            self._set_bit(_APDS9960_GCONF4, _BIT_MASK_GCONF4_GFIFO_CLR, True)
            wait_cycles = 0
            while ( not self._get_bit(_APDS9960_STATUS, _BIT_MASK_STATUS_GINT) and wait_cycles <= 30 ):
                time.sleep(0.003)
                wait_cycles += 1

        frame = []
        datasets_available = self._rreg(_APDS9960_GFLVL)
        if (self._get_bit(_APDS9960_STATUS, _BIT_MASK_STATUS_GINT) and datasets_available > 0 ):
   
            buffer = bytearray(128)
            buffer_dataset = bytearray(4)
            while True:
                dataset_count = self._rreg(_APDS9960_GFLVL)
                if dataset_count == 0:
                    break
                buffer=self._rreg(_APDS9960_GFIFO_U,min(128, 1 + (dataset_count * 4)))
                # Unpack data stream into more usable U/D/L/R datasets for analysis
                idx = 0
                for i in range(dataset_count):
                    idx = i * 4
                    buffer_dataset[0] = buffer[idx]
                    buffer_dataset[1] = buffer[idx + 1]
                    buffer_dataset[2] = buffer[idx + 2]
                    buffer_dataset[3] = buffer[idx + 3]

                    if ((not all(val == 255 for val in buffer_dataset))
                        and (not all(val == 0 for val in buffer_dataset))
                        and (all(val >= 30 for val in buffer_dataset))
                    ):
                        if len(frame) < 2:
                            frame.append(tuple(buffer_dataset))
                        else:
                            frame[1] = tuple(buffer_dataset)
                time.sleep(0.03)
        if len(frame) < 2:
            return None
        # Determine our up/down and left/right ratios along with our first/last deltas
        f_r_ud = ((frame[0][0] - frame[0][1]) * 100) // (frame[0][0] + frame[0][1])
        f_r_lr = ((frame[0][2] - frame[0][3]) * 100) // (frame[0][2] + frame[0][3])
        l_r_ud = ((frame[1][0] - frame[1][1]) * 100) // (frame[1][0] + frame[1][1])
        l_r_lr = ((frame[1][2] - frame[1][3]) * 100) // (frame[1][2] + frame[1][3])
        delta_ud = l_r_ud - f_r_ud
        delta_lr = l_r_lr - f_r_lr
        # Make our first guess at what gesture we saw, if any
        state_ud = 0
        state_lr = 0
        if delta_ud >= 30:
            state_ud = 1
        elif delta_ud <= -30:
            state_ud = -1

        if delta_lr >= 30:
            state_lr = 1
        elif delta_lr <= -30:
            state_lr = -1
        # Make our final decision based on our first guess and, if required, the delta data
        gesture_found = 0
        # Easy cases
        if state_ud == -1 and state_lr == 0:
            gesture_found = 1
        elif state_ud == 1 and state_lr == 0:
            gesture_found = 2
        elif state_ud == 0 and state_lr == -1:
            gesture_found = 3
        elif state_ud == 0 and state_lr == 1:
            gesture_found = 4
        # Not so easy cases
        if gesture_found == 0:
            if state_ud == -1 and state_lr == 1:
                if abs(delta_ud) > abs(delta_lr):
                    gesture_found = 1
                else:
                    gesture_found = 4
            elif state_ud == 1 and state_lr == -1:
                if abs(delta_ud) > abs(delta_lr):
                    gesture_found = 2
                else:
                    gesture_found = 3
            elif state_ud == -1 and state_lr == -1:
                if abs(delta_ud) > abs(delta_lr):
                    gesture_found = 1
                else:
                    gesture_found = 3
            elif state_ud == 1 and state_lr == 1:
                if abs(delta_ud) > abs(delta_lr):
                    gesture_found = 2
                else:
                    gesture_found = 3

        dir_lookup = [None,"left", "right", "down", "up"]
        return dir_lookup[gesture_found]

    ## COLOR
    def color(self,gain=1):
        """Tuple containing red, green, blue, and clear light intensity values"""
        if self._select[2]: 
            self._select=[True,True,False]
            self.enable_proximity(False)
            self.enable_gesture(False)
            self.enable_color(True)
            self.color_gain(gain)

        while not self._get_bit(_APDS9960_STATUS, _BIT_MASK_STATUS_AVALID): 
            time.sleep(0.005)       #"""Color data ready flag"""
        return (
                self._color_data16(_APDS9960_CDATAL + 2),
                self._color_data16(_APDS9960_CDATAL + 4),
                self._color_data16(_APDS9960_CDATAL + 6),
                self._color_data16(_APDS9960_CDATAL), 
                )
