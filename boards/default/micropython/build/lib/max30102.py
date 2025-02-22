"""
MAX30102 

MicroPython library for the MAX30102(bmp_and_spo2)
=======================================================

#Preliminary composition                                    20220723
#base on https://github.com/doug-burrell/max30102.git       20220723

dahanzimin From the Mixly Team
"""

import time
from micropython import const

# Address of each register.
REG_INTR_STATUS_1       = const(0x00)   
REG_INTR_STATUS_2       = const(0x01)   
REG_INTR_ENABLE_1       = const(0x02)   
REG_INTR_ENABLE_2       = const(0x03)   
REG_FIFO_WR_PTR         = const(0x04)   
REG_OVF_COUNTER         = const(0x05)   
REG_FIFO_RD_PTR         = const(0x06)   
REG_FIFO_DATA           = const(0x07)   
REG_FIFO_CONFIG         = const(0x08)  
REG_MODE_CONFIG         = const(0x09)   
REG_SPO2_CONFIG         = const(0x0A)   
REG_LED1_PA             = const(0x0C)   
REG_LED2_PA             = const(0x0D)   
REG_PILOT_PA            = const(0x10)   
REG_MULTI_LED_CTRL1     = const(0x11)   
REG_MULTI_LED_CTRL2     = const(0x12)   
REG_TEMP_INTR           = const(0x1F)   
REG_TEMP_FRAC           = const(0x20)   
REG_TEMP_CONFIG         = const(0x21)   
REG_PART_ID             = const(0xFF)  

class MAX30102:
    def __init__(self, i2c, address=0x57):
        """Initiate MAX30102 class ond each function responsible for correct device start-up"""
        self._device = i2c
        self._address = address 

        if self._chip_id() != 0x15:
            raise AttributeError("Cannot find a MAX30102")

        self.reset()
        time.sleep(1)
        self.setup()

    def _wreg(self, reg, val):
        '''Write memory address'''
        self._device.writeto_mem(self._address,reg,val.to_bytes(1, 'little'))

    def _rreg(self, reg,nbytes=1):
        '''Read memory address'''
        return  self._device.readfrom_mem(self._address, reg, nbytes)[0] if nbytes<=1 else self._device.readfrom_mem(self._address, reg, nbytes)[0:nbytes]

    def _chip_id(self):  
        return self._rreg(REG_PART_ID)

    def reset(self):
        """Set default values of all registers"""
        self._wreg(REG_MODE_CONFIG, 0x40) 

    def shutdown(self):
        """Shutdown the device"""
        self._wreg(mode_config, 0x80)  # 0b10000000 = 0x80

    def setup(self,led_mode=0x03):
        """Set all registers needed to correct work of sensor"""
        self._wreg(REG_INTR_ENABLE_1, 0xC0)     # 0xc0 : A_FULL_EN and PPG_RDY_EN = Interrupt will be triggered when
        self._wreg(REG_INTR_ENABLE_2, 0x00)     # fifo almost full & new fifo data ready

        self._wreg(REG_FIFO_WR_PTR, 0x00)       # FIFO_WR_PTR[4:0]
        self._wreg(REG_OVF_COUNTER, 0x00)       # OVF_COUNTER[4:0]
        self._wreg(REG_FIFO_RD_PTR, 0x00)       # FIFO_RD_PTR[4:0]

        self._wreg(REG_FIFO_CONFIG, 0x4F)       # sample avg = 4, fifo rollover = false, fifo almost full = 17
        self._wreg(REG_MODE_CONFIG, led_mode)   # 0x02 for read-only, 0x03 for SpO2 mode, 0x07 multimode LED
        self._wreg(REG_SPO2_CONFIG, 0x27)       # SPO2_ADC range = 4096nA, SPO2 sample rate = 100Hz, LED pulse-width = 411uS

        self._wreg(REG_LED1_PA, 0x40)           # choose value for ~7mA for LED1
        self._wreg(REG_LED2_PA, 0x40)           # choose value for ~7mA for LED2
        self._wreg(REG_PILOT_PA, 0x7F)          # choose value fro ~25mA for Pilot LED

    def get_data_present(self):
        read_ptr  = self._rreg(REG_FIFO_RD_PTR)
        write_ptr = self._rreg(REG_FIFO_WR_PTR)
        if read_ptr == write_ptr:
            return 0
        else:
            num_samples = write_ptr - read_ptr  # account for pointer wrap around
            if num_samples < 0:
                num_samples += 32
            return num_samples

    def read_fifo(self):
        """This function will read the data register"""
        reg_INTR1 = self._rreg(REG_INTR_STATUS_1)
        reg_INTR2 = self._rreg(REG_INTR_STATUS_2)
        d = self._rreg(REG_FIFO_DATA, 6)

        red_led = (d[0] << 16 | d[1] << 8 | d[2]) & 0x03FFFF
        ir_led  = (d[3] << 16 | d[4] << 8 | d[5]) & 0x03FFFF
        return ir_led,red_led

    def read_sequential(self, amount=100):
        """This function will read the red-led and ir-led `amount` times"""
        red_buf = []
        ir_buf = []
        count = amount
        while count > 0:
            num_bytes = self.get_data_present()
            while num_bytes > 0:
                ir, red = self.read_fifo()
                red_buf.append(red)
                ir_buf.append(ir)
                num_bytes -= 1
                count -= 1
        return  ir_buf,red_buf

    def temperature(self):
        """Read temperature as sum of integer and fraction value """
        self._wreg(REG_TEMP_CONFIG, 0x01)  
        status = self._rreg(REG_INTR_STATUS_2)
        count = 1
        while status != 2 and count < 5:
            status = self._rreg(REG_INTR_STATUS_2)
            count += 1
        integer = self._rreg(REG_TEMP_INTR)
        fraction = self._rreg(REG_TEMP_FRAC)
        return round(integer + fraction * 0.0625,2)

    def heartrate(self,amount=5):
        bpms = []
        sop2 = []
        for _ in range(amount):
            ir_data, red_data=self.read_sequential()
            if get_mean(ir_data) < 50000 and get_mean(red_data) < 50000 :
                return 0,0
            raw_bpm, valid_bpm, raw_spo2, valid_spo2 = calc_hr_and_spo2(ir_data, red_data)
            if valid_bpm:
                bpms.append(raw_bpm) 
            if valid_spo2:
                sop2.append(raw_spo2) 
        bpms_len=len(bpms)
        sop2_len=len(sop2)  
        if bpms_len<=2 or sop2_len<=2:
             return 0,0
        else: 
            return sum(sorted(bpms)[1:bpms_len-1])//(bpms_len-2),round(sum(sorted(sop2)[1:sop2_len-1])/(sop2_len-2),2)

"""-----------以下心率算法-----------"""

SAMPLE_FREQ = 25    # 25 samples per second 
MA_SIZE = 4         
BUFFER_SIZE = 100   # sampling frequency * 4

def get_mean(ls):
    return sum(ls)/len(ls)

def calc_hr_and_spo2(ir_data, red_data):
    ir_mean = int(get_mean(ir_data))
    x = []
    for k in ir_data:
        x.append((k-ir_mean)*-1)
    for i in range(len(x) - MA_SIZE):
        x[i] = sum(x[i:i+MA_SIZE]) / MA_SIZE

    n_th = int(get_mean(x))
    n_th = 30 if n_th < 30 else n_th   # min allowed
    n_th = 60 if n_th > 60 else n_th   # max allowed

    ir_valley_locs, n_peaks = find_peaks(x, BUFFER_SIZE, n_th, 4, 15)
    peak_interval_sum = 0
    if n_peaks >= 2:
        for i in range(1, n_peaks):
            peak_interval_sum += (ir_valley_locs[i] - ir_valley_locs[i-1])
        peak_interval_sum = int(peak_interval_sum / (n_peaks - 1))
        hr = int(SAMPLE_FREQ * 60 / peak_interval_sum)
        hr_valid = True
    else:
        hr = -999  
        hr_valid = False

    exact_ir_valley_locs_count = n_peaks
    for i in range(exact_ir_valley_locs_count):
        if ir_valley_locs[i] > BUFFER_SIZE:
            spo2 = -999
            spo2_valid = False
            return hr, hr_valid, spo2, spo2_valid
    i_ratio_count = 0
    ratio = []
    # find max between two valley locations
    red_dc_max_index = -1
    ir_dc_max_index = -1
    for k in range(exact_ir_valley_locs_count-1):
        red_dc_max = -16777216
        ir_dc_max = -16777216
        if ir_valley_locs[k+1] - ir_valley_locs[k] > 3:
            for i in range(ir_valley_locs[k], ir_valley_locs[k+1]):
                if ir_data[i] > ir_dc_max:
                    ir_dc_max = ir_data[i]
                    ir_dc_max_index = i
                if red_data[i] > red_dc_max:
                    red_dc_max = red_data[i]
                    red_dc_max_index = i

            red_ac = int((red_data[ir_valley_locs[k+1]] - red_data[ir_valley_locs[k]]) * (red_dc_max_index - ir_valley_locs[k]))
            red_ac = red_data[ir_valley_locs[k]] + int(red_ac / (ir_valley_locs[k+1] - ir_valley_locs[k]))
            red_ac = red_data[red_dc_max_index] - red_ac  # subtract linear DC components from raw

            ir_ac = int((ir_data[ir_valley_locs[k+1]] - ir_data[ir_valley_locs[k]]) * (ir_dc_max_index - ir_valley_locs[k]))
            ir_ac = ir_data[ir_valley_locs[k]] + int(ir_ac / (ir_valley_locs[k+1] - ir_valley_locs[k]))
            ir_ac = ir_data[ir_dc_max_index] - ir_ac  # subtract linear DC components from raw

            nume = red_ac * ir_dc_max
            denom = ir_ac * red_dc_max
            if (denom > 0 and i_ratio_count < 5) and nume != 0:
                ratio.append(int(((nume * 100) & 0xffffffff) / denom))
                i_ratio_count += 1
    # choose median value since PPG signal may vary from beat to beat
    ratio = sorted(ratio)  # sort to ascending order
    mid_index = int(i_ratio_count / 2)

    ratio_ave = 0
    if mid_index > 1:
        ratio_ave = int((ratio[mid_index-1] + ratio[mid_index])/2)
    else:
        if len(ratio) != 0:
            ratio_ave = ratio[mid_index]

    if ratio_ave > 2 and ratio_ave < 184:
        # -45.060 * ratioAverage * ratioAverage / 10000 + 30.354 * ratioAverage / 100 + 94.845
        spo2 = -45.060 * (ratio_ave**2) / 10000.0 + 30.054 * ratio_ave / 100.0 + 94.845
        spo2_valid = True
    else:
        spo2 = -999
        spo2_valid = False

    return hr, hr_valid, spo2, spo2_valid

def find_peaks(x, size, min_height, min_dist, max_num):
    """ Find at most MAX_NUM peaks above MIN_HEIGHT separated by at least MIN_DISTANCE"""
    ir_valley_locs, n_peaks = find_peaks_above_min_height(x, size, min_height, max_num)
    ir_valley_locs, n_peaks = remove_close_peaks(n_peaks, ir_valley_locs, x, min_dist)
    n_peaks = min([n_peaks, max_num])
    return ir_valley_locs, n_peaks

def find_peaks_above_min_height(x, size, min_height, max_num):
    """Find all peaks above MIN_HEIGHT """
    i = 0
    n_peaks = 0
    ir_valley_locs = []  # [0 for i in range(max_num)]
    while i < size - 1:
        if x[i] > min_height and x[i] > x[i-1]:  # find the left edge of potential peaks
            n_width = 1
            while i + n_width < size - 1 and x[i] == x[i+n_width]:  # find flat peaks
                n_width += 1
            if x[i] > x[i+n_width] and n_peaks < max_num:  # find the right edge of peaks
                ir_valley_locs.append(i)
                n_peaks += 1  # original uses post increment
                i += n_width + 1
            else:
                i += n_width
        else:
            i += 1

    return ir_valley_locs, n_peaks

def remove_close_peaks(n_peaks, ir_valley_locs, x, min_dist):
    """ Remove peaks separated by less than MIN_DISTANCE"""
    sorted_indices = sorted(ir_valley_locs, key=lambda i: x[i])
    sorted_indices.reverse()

    i = -1
    while i < n_peaks:
        old_n_peaks = n_peaks
        n_peaks = i + 1
        j = i + 1
        while j < old_n_peaks:
            n_dist = (sorted_indices[j] - sorted_indices[i]) if i != -1 else (sorted_indices[j] + 1)  # lag-zero peak of autocorr is at index -1
            if n_dist > min_dist or n_dist < -1 * min_dist:
                sorted_indices[n_peaks] = sorted_indices[j]
                n_peaks += 1  # original uses post increment
            j += 1
        i += 1

    sorted_indices[:n_peaks] = sorted(sorted_indices[:n_peaks])
    return sorted_indices, n_peaks
