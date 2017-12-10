#include "ArduBits_ADXL345.h"

ADXL345::ADXL345() {
    devAddr = ADXL345_DEFAULT_ADDRESS;
}

void ADXL345::init_ADXL345() {
    I2Cdev::writeByte(devAddr, ADXL345_RA_POWER_CTL, 0); // reset all power settings
    setAutoSleepEnabled(true);
    setMeasureEnabled(true);
}

void ADXL345::setAutoSleepEnabled(bool enabled) {
    I2Cdev::writeBit(devAddr, ADXL345_RA_POWER_CTL, ADXL345_PCTL_AUTOSLEEP_BIT, enabled);
}


void ADXL345::setMeasureEnabled(bool enabled) {
    I2Cdev::writeBit(devAddr, ADXL345_RA_POWER_CTL, ADXL345_PCTL_MEASURE_BIT, enabled);
}

void ADXL345::getAcceleration(int16_t* x, int16_t* y, int16_t* z) {
    I2Cdev::readBytes(devAddr, ADXL345_RA_DATAX0, 6, buffer);
    *x = (((int16_t)buffer[1]) << 8) | buffer[0];
    *y = (((int16_t)buffer[3]) << 8) | buffer[2];
    *z = (((int16_t)buffer[5]) << 8) | buffer[4];
}

int16_t ADXL345::getAccelerationX() {
    I2Cdev::readBytes(devAddr, ADXL345_RA_DATAX0, 2, buffer);
    return (((int16_t)buffer[1]) << 8) | buffer[0];
}

int16_t ADXL345::getAccelerationY() {
    I2Cdev::readBytes(devAddr, ADXL345_RA_DATAY0, 2, buffer);
    return (((int16_t)buffer[1]) << 8) | buffer[0];
}

int16_t ADXL345::getAccelerationZ() {
    I2Cdev::readBytes(devAddr, ADXL345_RA_DATAZ0, 2, buffer);
    return (((int16_t)buffer[1]) << 8) | buffer[0];
}

void ADXL345::read_ADXL345(void)
{
   float  Q=getAccelerationX()*3.9; 
   float  T=getAccelerationY()*3.9;
   float  K=getAccelerationZ()*3.9;
   Q=-Q;

   get_X_angle=(int)(((atan2(K,Q)*180)/3.14159265));  //X轴角度值 
   get_Y_angle=(int)(((atan2(K,T)*180)/3.14159265));  //Y轴角度值

}

int16_t ADXL345::X_angle(void)
{
  read_ADXL345();
  return get_X_angle;  

}
int16_t ADXL345::Y_angle(void)
{
  read_ADXL345();
  return get_Y_angle; 

}

