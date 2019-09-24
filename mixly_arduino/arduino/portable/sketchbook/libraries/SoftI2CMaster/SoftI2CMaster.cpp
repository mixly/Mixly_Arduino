/*
 * SoftI2CMaster.cpp -- Multi-instance software I2C Master library
 * 
 * 
 * 2010-12 Tod E. Kurt, http://todbot.com/blog/
 *
 * This code takes some tricks from:
 *  http://codinglab.blogspot.com/2008/10/i2c-on-avr-using-bit-banging.html
 *
 * 2014, by Testato: update library and examples for follow Wire’s API of Arduino IDE 1.x
 *
 */

#if (ARDUINO >= 100)
#include <Arduino.h>
#else
#include <WProgram.h>
#endif

#include "SoftI2CMaster.h"

#include <util/delay.h>
#include <string.h>

#define  i2cbitdelay 50

#define  I2C_ACK  1 
#define  I2C_NAK  0


#define i2c_scl_release()                 \
    *_sclDirReg     &=~ _sclBitMask
#define i2c_sda_release()                 \
    *_sdaDirReg     &=~ _sdaBitMask

// sets SCL low and drives output
#define i2c_scl_lo()                                 \
                     *_sclPortReg  &=~ _sclBitMask;  \
                     *_sclDirReg   |=  _sclBitMask; 

// sets SDA low and drives output
#define i2c_sda_lo()                                 \
                     *_sdaPortReg  &=~ _sdaBitMask;  \
                     *_sdaDirReg   |=  _sdaBitMask;  

// set SCL high and to input (releases pin) (i.e. change to input,turnon pullup)
#define i2c_scl_hi()                                 \
                     *_sclDirReg   &=~ _sclBitMask;  \
    if(usePullups) { *_sclPortReg  |=  _sclBitMask; } 

// set SDA high and to input (releases pin) (i.e. change to input,turnon pullup)
#define i2c_sda_hi()                                 \
                     *_sdaDirReg   &=~ _sdaBitMask;  \
    if(usePullups) { *_sdaPortReg  |=  _sdaBitMask; } 


//
// Constructor
//
SoftI2CMaster::SoftI2CMaster()
{
    // do nothing, use setPins() later
}
//
SoftI2CMaster::SoftI2CMaster(uint8_t sclPin, uint8_t sdaPin) 
{
    setPins(sclPin, sdaPin, true);
    i2c_init();
}

//
SoftI2CMaster::SoftI2CMaster(uint8_t sclPin, uint8_t sdaPin, uint8_t pullups)
{
    setPins(sclPin, sdaPin, pullups);
    i2c_init();
}

//
// Turn Arduino pin numbers into PORTx, DDRx, and PINx
//
void SoftI2CMaster::setPins(uint8_t sclPin, uint8_t sdaPin, uint8_t pullups)
{
    uint8_t port;
    
    usePullups = pullups;

    _sclPin = sclPin;
    _sdaPin = sdaPin;
    
    _sclBitMask = digitalPinToBitMask(sclPin);
    _sdaBitMask = digitalPinToBitMask(sdaPin);
    
    port = digitalPinToPort(sclPin);
    _sclPortReg  = portOutputRegister(port);
    _sclDirReg   = portModeRegister(port);

    port = digitalPinToPort(sdaPin);
    _sdaPortReg  = portOutputRegister(port);
    _sdaDirReg   = portModeRegister(port);
    
}

//
//
//
uint8_t SoftI2CMaster::beginTransmission(uint8_t address)
{
    i2c_start();
    uint8_t rc = i2c_write((address<<1) | 0); // clr read bit
    return rc;
}

//
uint8_t SoftI2CMaster::requestFrom(uint8_t address)
{
    i2c_start();
    uint8_t rc = i2c_write((address<<1) | 1); // set read bit
    return rc;
}
//
uint8_t SoftI2CMaster::requestFrom(int address)
{
    return requestFrom( (uint8_t) address);
}

//
uint8_t SoftI2CMaster::beginTransmission(int address)
{
    return beginTransmission((uint8_t)address);
}

//
//
//
uint8_t SoftI2CMaster::endTransmission(void)
{
    i2c_stop();
    //return ret;  // FIXME
    return 0;
}

// must be called in:
// slave tx event callback
// or after beginTransmission(address)
uint8_t SoftI2CMaster::write(uint8_t data)
{
    return i2c_write(data);
}

// must be called in:
// slave tx event callback
// or after beginTransmission(address)
void SoftI2CMaster::write(uint8_t* data, uint8_t quantity)
{
    for(uint8_t i = 0; i < quantity; ++i){
        write(data[i]);
    }
}

// must be called in:
// slave tx event callback
// or after beginTransmission(address)
void SoftI2CMaster::write(char* data)
{
    write((uint8_t*)data, strlen(data));
}

// must be called in:
// slave tx event callback
// or after beginTransmission(address)
void SoftI2CMaster::write(int data)
{
    write((uint8_t)data);
}

//--------------------------------------------------------------------


void SoftI2CMaster::i2c_writebit( uint8_t c )
{
    if ( c > 0 ) {
        i2c_sda_hi();
    } else {
        i2c_sda_lo();
    }

    i2c_scl_hi();
    _delay_us(i2cbitdelay);

    i2c_scl_lo();
    _delay_us(i2cbitdelay);

    if ( c > 0 ) {
        i2c_sda_lo();
    }
    _delay_us(i2cbitdelay);
}

//
uint8_t SoftI2CMaster::i2c_readbit(void)
{
    i2c_sda_hi();
    i2c_scl_hi();
    _delay_us(i2cbitdelay);

    uint8_t port = digitalPinToPort(_sdaPin);
    volatile uint8_t* pinReg = portInputRegister(port);
    uint8_t c = *pinReg;  // I2C_PIN;

    i2c_scl_lo();
    _delay_us(i2cbitdelay);

    return ( c & _sdaBitMask) ? 1 : 0;
}

// Inits bitbanging port, must be called before using the functions below
//
void SoftI2CMaster::i2c_init(void)
{
    //I2C_PORT &=~ (_BV( I2C_SDA ) | _BV( I2C_SCL ));
    //*_sclPortReg &=~ (_sdaBitMask | _sclBitMask);
    i2c_sda_hi();
    i2c_scl_hi();
    
    _delay_us(i2cbitdelay);
}

// Send a START Condition
//
void SoftI2CMaster::i2c_start(void)
{
    // set both to high at the same time
    //I2C_DDR &=~ (_BV( I2C_SDA ) | _BV( I2C_SCL ));
    //*_sclDirReg &=~ (_sdaBitMask | _sclBitMask);
    i2c_sda_hi();
    i2c_scl_hi();

    _delay_us(i2cbitdelay);
   
    i2c_sda_lo();
    _delay_us(i2cbitdelay);

    i2c_scl_lo();
    _delay_us(i2cbitdelay);
}

void SoftI2CMaster::i2c_repstart(void)
{
    // set both to high at the same time (releases drive on both lines)
    //I2C_DDR &=~ (_BV( I2C_SDA ) | _BV( I2C_SCL ));
    //*_sclDirReg &=~ (_sdaBitMask | _sclBitMask);
    i2c_sda_hi();
    i2c_scl_hi();

    i2c_scl_lo();                           // force SCL low
    _delay_us(i2cbitdelay);

    i2c_sda_release();                      // release SDA
    _delay_us(i2cbitdelay);

    i2c_scl_release();                      // release SCL
    _delay_us(i2cbitdelay);

    i2c_sda_lo();                           // force SDA low
    _delay_us(i2cbitdelay);
}

// Send a STOP Condition
//
void SoftI2CMaster::i2c_stop(void)
{
    i2c_scl_hi();
    _delay_us(i2cbitdelay);

    i2c_sda_hi();
    _delay_us(i2cbitdelay);
}

// write a byte to the I2C slave device
//
uint8_t SoftI2CMaster::i2c_write( uint8_t c )
{
    for ( uint8_t i=0;i<8;i++) {
        i2c_writebit( c & 128 );
        c<<=1;
    }

    return i2c_readbit();
}

// read a byte from the I2C slave device
//
uint8_t SoftI2CMaster::i2c_read( uint8_t ack )
{
    uint8_t res = 0;

    for ( uint8_t i=0;i<8;i++) {
        res <<= 1;
        res |= i2c_readbit();  
    }

    if ( ack )
        i2c_writebit( 0 );
    else
        i2c_writebit( 1 );

    _delay_us(i2cbitdelay);

    return res;
}

// FIXME: this isn't right, surely
uint8_t SoftI2CMaster::read( uint8_t ack )
{
  return i2c_read( ack );
}

//
uint8_t SoftI2CMaster::read()
{
    return i2c_read( I2C_ACK );
}

//
uint8_t SoftI2CMaster::readLast()
{
    return i2c_read( I2C_NAK );
}
