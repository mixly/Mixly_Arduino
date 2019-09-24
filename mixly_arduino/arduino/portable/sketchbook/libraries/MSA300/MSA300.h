/**************************************************************************/
/*!
    @file     MSA300.h
*/
/**************************************************************************/

#include "Arduino.h"

#include <Wire.h>

/*=========================================================================
    CONSTANTS
    -----------------------------------------------------------------------*/
    /** */
    #define GRAVITY             (9.80665F) ///< Gravity constant
/*=========================================================================*/


/*=========================================================================
    I2C ADDRESS/BITS
    -----------------------------------------------------------------------*/
    #define MSA300_I2C_ADDRESS                (0x26)    ///< I2C write address. Assumes SDO pulled to GND, otherwise 0x4E

/*=========================================================================*/

/*=========================================================================
    REGISTERS
    -----------------------------------------------------------------------*/
    /** MSA300 Registers */
    #define MSA_300_REG_SOFT_RESET          (0x00) ///< Soft reset (R)
    #define MSA300_REG_PARTID               (0x01) ///< Part ID (R)
    #define MSA300_REG_ACC_X_LSB            (0x02) ///< X-acceleration LSB (R)
    #define MSA300_REG_ACC_X_MSB            (0x03) ///< X-acceleration MSB (R)
    #define MSA300_REG_ACC_Y_LSB            (0x04) ///< Y-acceleration LSB (R)
    #define MSA300_REG_ACC_Y_MSB            (0x05) ///< Y-acceleration MSB (R)
    #define MSA300_REG_ACC_Z_LSB            (0x06) ///< Z-acceleration LSB (R)
    #define MSA300_REG_ACC_Z_MSB            (0x07) ///< Z-acceleration MSB (R)
    #define MSA300_REG_MOTION_INT           (0x09) ///< Motion interrupt (R)
    #define MSA300_REG_DATA_INT             (0x0A) ///< Data interrupt (R)
    #define MSA300_REG_TAP_ACTIVE_STATUS    (0x0B) ///< Tap status (R)
    #define MSA300_REG_ORIENT_STATUS        (0x0C) ///< Orientation status (R)
    #define MSA300_REG_RES_RANGE            (0x0F) ///< Resolution/Range (R/W)
    #define MSA300_REG_ODR                  (0x10) ///< Output Data Rate (R/W)
    #define MSA300_REG_PWR_MODE_BW          (0x11) ///< Power Mode/Bandwidth (R/W)
    #define MSA300_REG_SWAP_POLARITY        (0x12) ///< Swap Axis Polarity (R/W)
    #define MSA300_REG_INT_SET_0            (0x16) ///< Interrupt Set 0 (R/W)
    #define MSA300_REG_INT_SET_1            (0x17) ///< Interrupt Set 1 (R/W)
    #define MSA300_REG_INT_MAP_0            (0x19) ///< Interrupt Map 0 (R/W)
    #define MSA300_REG_INT_MAP_1            (0x1A) ///< Interrupt Map 1 (R/W)
    #define MSA300_REG_INT_MAP_2_1          (0x1B) ///< Interrupt Map 2_1 (R/W)
    #define MSA300_REG_INT_MAP_2_2          (0x20) ///< Interrupt Map 2_2 (R/W)
    #define MSA300_REG_INT_LATCH            (0x21) ///< Interrupt Latch (R/W)
    #define MSA300_REG_FREEFALL_DUR         (0x22) ///< Freefall Duration (R/W)
    #define MSA300_REG_FREEFALL_TH          (0x23) ///< Freefall Threshold (R/W)
    #define MSA300_REG_FREEFALL_HY          (0x24) ///< Freefall Hysteresis (R/W)
    #define MSA300_REG_ACTIVE_DUR           (0x27) ///< Active Duration (R/W)
    #define MSA300_REG_ACTIVE_TH            (0x28) ///< Active Threshold (R/W)
    #define MSA300_REG_TAP_DUR              (0x2A) ///< Tap Duration (R/W)
    #define MSA300_REG_TAP_TH               (0x2B) ///< Tap Threshold (R/W)
    #define MSA300_REG_ORIENT_HY            (0x2C) ///< Orientation Hysteresis (R/W)
    #define MSA300_REG_Z_BLOCK              (0x2D) ///< Z Blocking (R/W)
    #define MSA300_REG_OFFSET_COMP_X        (0x38) ///< X Offset Compensation (R/W)
    #define MSA300_REG_OFFSET_COMP_Y        (0x39) ///< Y Offset Compensation (R/W)
    #define MSA300_REG_OFFSET_COMP_Z        (0x3A) ///< Z Offset Compensation (R/W)
     
    
/*=========================================================================*/

/*=========================================================================
    REGISTERS
    -----------------------------------------------------------------------*/

    /* Value conversion multipliers */
    #define MSA300_MG2G_MULTIPLIER_16_G (0.00195)  ///< 1.95mg per lsb
    #define MSA300_MG2G_MULTIPLIER_8_G  (0.000976) ///< 0.976mg per lsb
    #define MSA300_MG2G_MULTIPLIER_4_G  (0.000488) ///< 0.488mg per lsb
    #define MSA300_MG2G_MULTIPLIER_2_G  (0.000244) ///< 0.244mg per lsb
    
    /* Tap interrupt threshold conversion multiplier */
    #define MSA300_MG2G_TAP_TH_16_G     (0.5)      ///< 500mg per lsb
    #define MSA300_MG2G_TAP_TH_8_G      (0.25)     ///< 250mg per lsb
    #define MSA300_MG2G_TAP_TH_4_G      (0.125)    ///< 125mg per lsb
    #define MSA300_MG2G_TAP_TH_2_G      (0.0625)   ///< 62.5mg per lsb

    /* Active interrupt threshold conversion multiplier */
    #define MSA300_MG2G_ACTIVE_TH_16_G     (0.03125)    ///< 31.25mg per lsb
    #define MSA300_MG2G_ACTIVE_TH_8_G      (0.015625)   ///< 15.625mg per lsb
    #define MSA300_MG2G_ACTIVE_TH_4_G      (0.00781)    ///< 7.81mg per lsb
    #define MSA300_MG2G_ACTIVE_TH_2_G      (0.00391)    ///< 3.91mg per lsb
/*=========================================================================*/

/** Datarate settings. Used with register 0x10 (MSA300_REG_ODR) to set datarate and with register 0x11 (MSA_REG_PWR_MODE_BW) to set Bandwidth */
typedef enum
{
  MSA300_DATARATE_1000_HZ     = 0b1111,   ///<  500Hz Bandwidth, not available in low power mode
  MSA300_DATARATE_500_HZ     = 0b1001,    ///<  250Hz Bandwidth, not available in low power mode
  MSA300_DATARATE_250_HZ     = 0b1000,    ///<  125Hz Bandwidth 
  MSA300_DATARATE_125_HZ     = 0b0111,    ///<   62.5Hz Bandwidth
  MSA300_DATARATE_62_5_HZ      = 0b0110,  ///<   31.25Hz Bandwidth 
  MSA300_DATARATE_31_25_HZ      = 0b0101, ///< 15.63Hz Bandwidth 
  MSA300_DATARATE_15_63_HZ    = 0b0100,   ///< 7.81Hz Bandwidth    
  MSA300_DATARATE_7_81_HZ     = 0b0011,   ///< 3.9Hz Bandwidth  
  MSA300_DATARATE_3_9_HZ    = 0b0010,     ///< 1.95Hz Bandwidth
  MSA300_DATARATE_1_95_HZ   = 0b0001,     ///< 0.975Hz Bandwidth, not available in normal mode
  MSA300_DATARATE_1_HZ      = 0b0000,     ///< 0.5Hz Bandwidth, not available in normal mode   
} dataRate_t;

/** Range settings. Used with register 0x0F (MSA300_REG_RES_RANGE) to set g range */
typedef enum
{
  MSA300_RANGE_16_G          = 0b11,   ///< +/- 16g
  MSA300_RANGE_8_G           = 0b10,   ///< +/- 8g
  MSA300_RANGE_4_G           = 0b01,   ///< +/- 4g
  MSA300_RANGE_2_G           = 0b00    ///< +/- 2g (default value)
} range_t;

/** Resolution settings. */
typedef enum
{
  MSA300_RES_14_BIT          = 0b00,    ///< 14 bit (default value)
  MSA300_RES_12_BIT          = 0b01,    ///< 12 bit
  MSA300_RES_8_BIT           = 0b11     ///< 8 bit
} res_t;

/** Power mode settings. */
typedef enum
{
  MSA300_MODE_NORMAL          = 0b00,   ///< Normal operation mode
  MSA300_MODE_LOW             = 0b01,   ///< Low power mode
  MSA300_MODE_SUSPEND         = 0b11    ///< Suspend/Shutdown mode
} pwrMode_t;

/** Interrupt latch settings. */
typedef enum
{
  MSA300_INT_NON_LATCHED      = 0b0000,   ///< Non Latched   
  MSA300_INT_LATCHED_250_MS   = 0b0001,   ///< 250ms Latched
  MSA300_INT_LATCHED_500_MS   = 0b0010,   ///< 500ms Latched
  MSA300_INT_LATCHED_1_S      = 0b0011,   ///< 1s Latched
  MSA300_INT_LATCHED_2_S      = 0b0100,   ///< 2s Latched
  MSA300_INT_LATCHED_4_S      = 0b0101,   ///< 4s Latched
  MSA300_INT_LATCHED_8_S      = 0b0110,   ///< 8s Latched
  MSA300_INT_LATCHED          = 0b0111,   ///< Permament Latched
  MSA300_INT_LATCHED_1_MS     = 0b1001,   ///< 1ms Latched
  MSA300_INT_LATCHED_2_MS     = 0b1011,   ///< 2ms Latched
  MSA300_INT_LATCHED_25_MS    = 0b1100,   ///< 25ms Latched
  MSA300_INT_LATCHED_50_MS    = 0b1101,   ///< 50ms Latched
  MSA300_INT_LATCHED_100_MS   = 0b1110    ///< 100ms Latched
} intMode_t;

/** Axes. */
typedef enum
{
  MSA300_AXIS_X               = 0b00,   ///< X axis
  MSA300_AXIS_Y               = 0b01,   ///< Y axis
  MSA300_AXIS_Z               = 0b10    ///< Z axis
} axis_t;

/** Tap duration settings. */
typedef enum
{
  MSA300_TAP_DUR_50_MS        = 0b000,    ///< 50ms tap 
  MSA300_TAP_DUR_100_MS       = 0b001,    ///< 100ms tap
  MSA300_TAP_DUR_150_MS       = 0b010,    ///< 150ms tap
  MSA300_TAP_DUR_200_MS       = 0b011,    ///< 200ms tap
  MSA300_TAP_DUR_250_MS       = 0b100,    ///< 250ms tap
  MSA300_TAP_DUR_375_MS       = 0b101,    ///< 375ms tap
  MSA300_TAP_DUR_500_MS       = 0b110,    ///< 500ms tap
  MSA300_TAP_DUR_700_MS       = 0b111     ///< 700ms tap
} tapDuration_t;

/** Acceleration container */
typedef struct
{
  float x;    ///< X acceleration
  float y;    ///< Y acceleration
  float z;    ///< Z acceleration
} acc_t;

/** Interrupt container. If active or tap interrupts are raised, populates intStatus with more info about interrupt. */
typedef struct
{
  bool orientInt = false;       ///< Orientation interrupt
  bool sTapInt = false;         ///< Single tap interrupt
  bool dTapInt = false;         ///< Double tap interrupt
  bool activeInt = false;       ///< Active interrupt
  bool freefallInt = false;     ///< Freefall interrupt
  bool newDataInt = false;      ///< New data interrupt

  /** Optional interrupt status container */
  union 
  {
    /** Interrupt status container */
    struct 
    {
      uint8_t tapSign;          ///< Tap interrupt sign
      uint8_t tapFirstX;        ///< Tap triggered by x axis
      uint8_t tapFirstY;        ///< Tap triggered by y axis
      uint8_t tapFirstZ;        ///< Tap triggered by z axis
      uint8_t activeSign;       ///< Active interrupt sign
      uint8_t activeFirstX;     ///< Active interrupt triggered by x axis
      uint8_t activeFirstY;     ///< Active interrupt triggered by y axis
      uint8_t activeFirstZ;     ///< Active interrupt triggered by z axis
    } intStatus;

  };

} interrupt_t;

/** Z orientation */
typedef enum 
{
  ORIENT_UPWARD_LOOKING       = 0b0,    ///< Upward looking orientation    
  ORIENT_DOWNWARD_LOOKING     = 0b1     ///< Downward looking orientation   
} zOrient_t;

/** XY orientation */
typedef enum 
{
  ORIENT_PORTRAIT_UPRIGHT     = 0b00,   ///< Portait upright orientation
  ORIENT_PORTRAIT_UPSIDEDOWN  = 0b01,   ///< Portait upsidedown orientation
  ORIENT_LANDSCAPE_LEFT       = 0b10,   ///< Landscape left orientation
  ORIENT_LANDSCAPE_RIGHT      = 0b11    ///< Landscape right orientation
} xyOrient_t;

/** Orientation container */
typedef struct
{
 zOrient_t z;       ///< Z orientation container 
 xyOrient_t xy;     ///< XY orientation container

} orient_t;

/** Polarity swap */
typedef enum 
{
  X_POLARITY                  = 3,    ///< X polarity
  Y_POLARITY                  = 2,    ///< Y polarity
  Z_POLARITY                  = 1,    ///< Z polarity
  X_Y_SWAP                    = 0     ///< XY polarity swap
} pol_t;
/** Orientation mode */
typedef enum
{
  MODE_SYMMETRICAL            = 0b00,   ///< Symmetrical mode
  MODE_HIGH_ASYMMETRICAL      = 0b01,   ///< High asymmetrical mode
  MODE_LOW_ASYMMETRICAL       = 0b10    ///< Low asymmetrical mode
} orientMode_t;

/** Orientation blocking */
typedef enum
{
  ORIENT_NO_BLOCKING          = 0b00,   ///< No blocking
  ORIENT_Z_BLOCKING           = 0b01,   ///< Z blocking
  ORIENT_Z_BLOCKING_0_2_G     = 0b10    ///< Z blocking or slope in any axis > 0.2g 
} orientBlockMode_t;

/** Class for MSA300 */
class MSA300{
 public:
  MSA300(int32_t sensorID = -1);

  bool        begin(void);
  void        setRange(range_t range);
  range_t     getRange(void);
  void        setResolution(res_t resolution);
  res_t       getResolution(void);
  void        setDataRate(dataRate_t dataRate);
  dataRate_t  getDataRate(void);
  void        setMode(pwrMode_t mode);
  pwrMode_t   getMode(void);
  void        setOffset(axis_t axis, float value);
  void        setTapThreshold(float value);
  void        setTapDuration(tapDuration_t duration, uint8_t quiet, uint8_t shock);
  void        setActiveThreshold(float value);
  void        setActiveDuration(uint8_t duration);
  void        setFreefallDuration(uint16_t duration);
  void        setFreefallThreshold(float value);
  void        setFreefallHysteresis(uint8_t mode, uint8_t value);
  void        swapPolarity(pol_t polarity);
  void        setOrientMode(orientMode_t mode);
  void        setOrientHysteresis(float value);
  void        setBlocking(orientBlockMode_t mode, float zBlockValue);

  void        resetInterrupt(void);
  void        clearInterrupts(void);
  interrupt_t checkInterrupts(void);
  void        setInterruptLatch(intMode_t mode);
  void        enableActiveInterrupt(axis_t axis, uint8_t interrupt);
  void        enableFreefallInterrupt(uint8_t interrupt);
  void        enableOrientationInterrupt(uint8_t interrupt);
  void        enableSingleTapInterrupt(uint8_t interrupt);
  void        enableDoubleTapInterrupt(uint8_t interrupt);
  void        enableNewDataInterrupt(uint8_t interrupt);
 
  acc_t       getAcceleration(void);
  orient_t    checkOrientation(void);

  uint8_t     getPartID(void);
  void        writeRegister(uint8_t reg, uint8_t value);
  uint8_t     readRegister(uint8_t reg);
  int16_t     read16(uint8_t reg);

  int16_t     getX(void), getY(void), getZ(void);
 private:


  int32_t _sensorID;
  range_t _range;
  float _multiplier;
  res_t _res;
  pwrMode_t _mode;
};

/*! 
    @brief  Generic function for clamping values.
    @tparam T
            Type of value to be clamped
    @tparam value
            Value to be clamped
    @tparam min
            Minimum limit value
    @tparam max
            Maximum limit value
    @return Value if value inside limits, else min or max
*/
template<typename T>
T clamp(T value, T min, T max)
{
  if(value > max) {
    value = max;
  } else if(value < min) {
    value = min;
  }

  return value;
}