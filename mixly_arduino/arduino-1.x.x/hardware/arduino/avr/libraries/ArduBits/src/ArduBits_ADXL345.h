
#ifndef _ArduBits_ADXL345_H_
#define _ArduBits_ADXL345_H_

#include "I2Cdev.h"

#define ADXL345_ADDRESS_ALT_LOW     0x53 // alt address pin low (GND)
#define ADXL345_ADDRESS_ALT_HIGH    0x1D // alt address pin high (VCC)
#define ADXL345_DEFAULT_ADDRESS     ADXL345_ADDRESS_ALT_LOW
#define ADXL345_RA_POWER_CTL        0x2D
#define ADXL345_PCTL_AUTOSLEEP_BIT  4
#define ADXL345_PCTL_MEASURE_BIT    3

#define ADXL345_RA_DATAX0           0x32
#define ADXL345_RA_DATAX1           0x33
#define ADXL345_RA_DATAY0           0x34
#define ADXL345_RA_DATAY1           0x35
#define ADXL345_RA_DATAZ0           0x36
#define ADXL345_RA_DATAZ1           0x37

class ADXL345 {
    public:
        ADXL345();
        void init_ADXL345(void);
        void getAcceleration(int16_t* x, int16_t* y, int16_t* z);
        int16_t getAccelerationX();
        int16_t getAccelerationY();
        int16_t getAccelerationZ();
        int16_t X_angle(void);
        int16_t Y_angle(void);
     

    private:
        uint8_t devAddr;
        uint8_t buffer[6];
        int16_t get_X_angle;
        int16_t get_Y_angle;
        void setAutoSleepEnabled(bool enabled);
        void setMeasureEnabled(bool enabled);
        void read_ADXL345(void);
};

#endif /* _ADXL345_H_ */
