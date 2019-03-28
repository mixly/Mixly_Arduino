/**
 @file FaBo9Axis_MPU9250.h
 @brief This is a library for the FaBo 9Axis I2C Brick.

   http://fabo.io/202.html

   Released under APACHE LICENSE, VERSION 2.0

   http://www.apache.org/licenses/

 @author FaBo<info@fabo.io>
*/

#ifndef FABO9AXIS_MPU9250_H
#define FABO9AXIS_MPU9250_H

#include <Arduino.h>
#include <Wire.h>


#define MPU9250_SLAVE_ADDRESS 0x68 ///< MPU9250 Default I2C slave address
#define AK8963_SLAVE_ADDRESS 0x0C ///< AK8963 I2C slave address

/// @name MPU-9250 Register Addresses
/// @{
#define MPU9250_SELF_TEST_X_GYRO 0x00
#define MPU9250_SELF_TEST_Y_GYRO 0x01
#define MPU9250_SELF_TEST_Z_GYRO 0x02
#define MPU9250_SELF_TEST_X_ACCEL 0x0D
#define MPU9250_SELF_TEST_Y_ACCEL 0x0E
#define MPU9250_SELF_TEST_Z_ACCEL 0x0F
#define MPU9250_XG_OFFSET_H 0x13
#define MPU9250_XG_OFFSET_L 0x14
#define MPU9250_YG_OFFSET_H 0x15
#define MPU9250_YG_OFFSET_L 0x16
#define MPU9250_ZG_OFFSET_H 0x17
#define MPU9250_ZG_OFFSET_L 0x18
#define MPU9250_SMPLRT_DIV 0x19
#define MPU9250_CONFIG 0x1A
#define MPU9250_GYRO_CONFIG 0x1B
#define MPU9250_ACCEL_CONFIG 0x1C
#define MPU9250_ACCEL_CONFIG_2 0x1D
#define MPU9250_LP_ACCEL_ODR 0x1E
#define MPU9250_WOM_THR 0x1F
#define MPU9250_FIFO_EN 0x23
#define MPU9250_I2C_MST_CTRL 0x24
#define MPU9250_I2C_SLV0_ADDR 0x25
#define MPU9250_I2C_SLV0_REG 0x26
#define MPU9250_I2C_SLV0_CTRL 0x27
#define MPU9250_I2C_SLV1_ADDR 0x28
#define MPU9250_I2C_SLV1_REG 0x29
#define MPU9250_I2C_SLV1_CTRL 0x2A
#define MPU9250_I2C_SLV2_ADDR 0x2B
#define MPU9250_I2C_SLV2_REG 0x2C
#define MPU9250_I2C_SLV2_CTRL 0x2D
#define MPU9250_I2C_SLV3_ADDR 0x2E
#define MPU9250_I2C_SLV3_REG 0x2F
#define MPU9250_I2C_SLV3_CTRL 0x30
#define MPU9250_I2C_SLV4_ADDR 0x31
#define MPU9250_I2C_SLV4_REG 0x32
#define MPU9250_I2C_SLV4_DO 0x33
#define MPU9250_I2C_SLV4_CTRL 0x34
#define MPU9250_I2C_SLV4_DI 0x35
#define MPU9250_I2C_MST_STATUS 0x36
#define MPU9250_INT_PIN_CFG 0x37
#define MPU9250_INT_ENABLE 0x38
#define MPU9250_INT_STATUS 0x3A
#define MPU9250_ACCEL_XOUT_H 0x3B
#define MPU9250_ACCEL_XOUT_L 0x3C
#define MPU9250_ACCEL_YOUT_H 0x3D
#define MPU9250_ACCEL_YOUT_L 0x3E
#define MPU9250_ACCEL_ZOUT_H 0x3F
#define MPU9250_ACCEL_ZOUT_L 0x40
#define MPU9250_TEMP_OUT_H 0x41
#define MPU9250_TEMP_OUT_L 0x42
#define MPU9250_GYRO_XOUT_H 0x43
#define MPU9250_GYRO_XOUT_L 0x44
#define MPU9250_GYRO_YOUT_H 0x45
#define MPU9250_GYRO_YOUT_L 0x46
#define MPU9250_GYRO_ZOUT_H 0x47
#define MPU9250_GYRO_ZOUT_L 0x48
#define MPU9250_EXT_SENS_DATA_00 0x49
#define MPU9250_EXT_SENS_DATA_01 0x4A
#define MPU9250_EXT_SENS_DATA_02 0x4B
#define MPU9250_EXT_SENS_DATA_03 0x4C
#define MPU9250_EXT_SENS_DATA_04 0x4D
#define MPU9250_EXT_SENS_DATA_05 0x4E
#define MPU9250_EXT_SENS_DATA_06 0x4F
#define MPU9250_EXT_SENS_DATA_07 0x50
#define MPU9250_EXT_SENS_DATA_08 0x51
#define MPU9250_EXT_SENS_DATA_09 0x52
#define MPU9250_EXT_SENS_DATA_10 0x53
#define MPU9250_EXT_SENS_DATA_11 0x54
#define MPU9250_EXT_SENS_DATA_12 0x55
#define MPU9250_EXT_SENS_DATA_13 0x56
#define MPU9250_EXT_SENS_DATA_14 0x57
#define MPU9250_EXT_SENS_DATA_15 0x58
#define MPU9250_EXT_SENS_DATA_16 0x59
#define MPU9250_EXT_SENS_DATA_17 0x5A
#define MPU9250_EXT_SENS_DATA_18 0x5B
#define MPU9250_EXT_SENS_DATA_19 0x5C
#define MPU9250_EXT_SENS_DATA_20 0x5D
#define MPU9250_EXT_SENS_DATA_21 0x5E
#define MPU9250_EXT_SENS_DATA_22 0x5F
#define MPU9250_EXT_SENS_DATA_23 0x60
#define MPU9250_I2C_SLV0_DO 0x63
#define MPU9250_I2C_SLV1_DO 0x64
#define MPU9250_I2C_SLV2_DO 0x65
#define MPU9250_I2C_SLV3_DO 0x66
#define MPU9250_I2C_MST_DELAY_CTRL 0x67
#define MPU9250_SIGNAL_PATH_RESET 0x68
#define MPU9250_MOT_DETECT_CTRL 0x69
#define MPU9250_USER_CTRL 0x6A
#define MPU9250_PWR_MGMT_1 0x6B
#define MPU9250_PWR_MGMT_2 0x6C
#define MPU9250_FIFO_COUNTH 0x72
#define MPU9250_FIFO_COUNTL 0x73
#define MPU9250_FIFO_R_W 0x74
#define MPU9250_WHO_AM_I 0x75
#define MPU9250_XA_OFFSET_H 0x77
#define MPU9250_XA_OFFSET_L 0x78
#define MPU9250_YA_OFFSET_H 0x7A
#define MPU9250_YA_OFFSET_L 0x7B
#define MPU9250_ZA_OFFSET_H 0x7D
#define MPU9250_ZA_OFFSET_L 0x7E
/// @}

/// @name Gyro Full Scale Select
/// @{
#define MPU9250_GFS_250  0x0 ///< +250dps
#define MPU9250_GFS_500  0x1 ///< +500dps
#define MPU9250_GFS_1000 0x2 ///< +1000dps
#define MPU9250_GFS_2000 0x3 ///< +2000dps
/// @}

/// @name Accel Full Scale Select
/// @{
#define MPU9250_AFS_2G  0x0 ///< 2g
#define MPU9250_AFS_4G  0x1 ///< 4g
#define MPU9250_AFS_8G  0x2 ///< 8g
#define MPU9250_AFS_16G 0x3 ///< 16g
/// @}


/// @name AK8963 Register Addresses
/// @{
#define AK8963_WIA 0x00
#define AK8963_INFO 0x01
#define AK8963_ST1 0x02
#define AK8963_HXL 0x03
#define AK8963_HXH 0x04
#define AK8963_HYL 0x05
#define AK8963_HYH 0x06
#define AK8963_HZL 0x07
#define AK8963_HZH 0x08
#define AK8963_ST2 0x09
#define AK8963_CNTL1 0x0A
#define AK8963_CNTL2 0x0B
#define AK8963_ASTC 0x0C
#define AK8963_TS1 0x0D
#define AK8963_TS2 0x0E
#define AK8963_I2CDIS 0x0F
#define AK8963_ASAX 0x10
#define AK8963_ASAY 0x11
#define AK8963_ASAZ 0x12
#define AK8963_RSV 0x13
/// @}


/// @name CNTL1 Mode select
/// @{
#define AK8963_MODE_DOWN 0x00 ///< Power down mode
#define AK8963_MODE_ONE 0x01 ///< One shot data output
#define AK8963_MODE_C8HZ 0x02 ///< Continous data output 8Hz
#define AK8963_MODE_C100HZ 0x06 ///< Continous data output 100Hz
#define AK8963_MODE_TRIG 0x04 ///< External trigger data output
#define AK8963_MODE_TEST 0x08 ///< Self test
#define AK8963_MODE_FUSE 0x0F ///< Fuse ROM access
/// @}

/// @name Magneto Scale Select
/// @{
#define AK8963_BIT_14 0x0 ///< 14bit output
#define AK8963_BIT_16 0x1 ///< 16bit output
/// @}


/**
 * @class FaBo9Axis
 * @brief FaBo 9Axis I2C Controll class
 */
class FaBo9Axis {
public:
  FaBo9Axis(uint8_t addr = MPU9250_SLAVE_ADDRESS);
  bool begin(void);
  bool searchDevice(void);
  void configMPU9250(uint8_t gfs = MPU9250_GFS_250, uint8_t afs = MPU9250_AFS_2G);
  void configAK8963(uint8_t mode = AK8963_MODE_C8HZ, uint8_t mfs = AK8963_BIT_16);
  bool checkDataReady();
  void readAccelXYZ(float * ax, float * ay, float * az);
  float readAccelX();
  float readAccelY();
  float readAccelZ();
  void readGyroXYZ(float * gx, float * gy, float * gz);
  float readGyroX();
  float readGyroY();
  float readGyroZ();
  void readMagnetXYZ(float * mx, float * my, float * mz);
  float readMagnetX();
  float readMagnetY();
  float readMagnetZ();
  void readTemperature(float * temperature);
  void dumpConfig(void);
private:
  uint8_t _mpu9250addr;
  float _gres, _ares, _mres;
  float _magXcoef, _magYcoef, _magZcoef;
  void writeI2c(byte address, uint8_t register_addr, uint8_t data);
  void readI2c(uint8_t address, uint8_t register_addr, uint8_t num, uint8_t * buffer);
};

#endif // FABO9AXIS_MPU9250_H
