#ifndef _ArduBits_SoftI2C_h_
#define _ArduBits_SoftI2C_h_

#include <inttypes.h>

#define _SOFTI2CMASTER_VERSION 13  // software version of this library


class SoftI2C
{

private:
  // per object data
  uint8_t _sclPin;
  uint8_t _sdaPin;
  uint8_t _sclBitMask;
  uint8_t _sdaBitMask;
  volatile uint8_t *_sclPortReg;
  volatile uint8_t *_sdaPortReg;
  volatile uint8_t *_sclDirReg;
  volatile uint8_t *_sdaDirReg;

  uint8_t usePullups;
  
  // 'initialized' will be:
  //    255 on startup,
  //    0 if beginTransmission() was called and successful,
  //    any other value if there was an error during beginTransmission().
  uint8_t initialized;

  // private methods

  void i2c_writebit( uint8_t c );
  uint8_t i2c_readbit(void);
  void i2c_init(void);
  void i2c_start(void);
  void i2c_repstart(void);
  void i2c_stop(void);
  uint8_t i2c_write( uint8_t c );
  uint8_t i2c_read( uint8_t ack );
  
public:
  // public methods
  SoftI2C();
  SoftI2C(uint8_t sclPin, uint8_t sdaPin);
  SoftI2C(uint8_t sclPin, uint8_t sdaPin, uint8_t usePullups);

  void setPins(uint8_t sclPin, uint8_t sdaPin, uint8_t usePullups);

  uint8_t beginTransmission(uint8_t address);
  uint8_t beginTransmission(int address);
  uint8_t endTransmission(void);
  uint8_t write(uint8_t);
  void write(uint8_t*, uint8_t);
  void write(int);
  void write(char*);
  void begin(void) {return;};
  uint8_t requestFrom(int address);
  uint8_t requestFrom(uint8_t address);
  uint8_t requestFrom(int address, int quantity);
  uint8_t requestFrom(uint8_t address, uint8_t quantity);
  uint8_t read( uint8_t ack );
  uint8_t read();
  uint8_t readLast();

};

#endif
