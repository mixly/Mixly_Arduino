/**
 * BlinkM_funcs_soft.h -- an extremely cut-down version of BlinkM_funcs.h 
 *                        for use with SoftI2CMaster library
 *                        
 *
 * 2010 Tod E. Kurt, http://todbot.com/blog/
 * 2014, by Testato: update library and examples for follow Wire’s API of Arduino IDE 1.x
 *
 */

int errcnt;

#include "SoftI2CMaster.h"

SoftI2CMaster i2c = SoftI2CMaster();


// set which arbitrary I/O pins will be "power" and "ground" for the BlinkM
static void BlinkM_setPowerPins(byte pwrpin, byte gndpin) 
{
    pinMode(pwrpin, OUTPUT);
    pinMode(gndpin, OUTPUT);
    digitalWrite(pwrpin, HIGH);
    digitalWrite(gndpin, LOW);
    delay(10); // wait for power to stabilize
}

// set which arbitrary I/O pins will be BlinkMs SCL and SDA
// note, this sets the internal pull-up resistors
static void BlinkM_begin( byte sclpin, byte sdapin )
{
    i2c.setPins( sclPin,sdaPin, true );
}

// start up a BlinkM with four arbitrary I/O pins
static void BlinkM_begin( byte sclpin, byte sdapin, byte pwrpin, byte gndpin)
{
    BlinkM_setPowerPins( pwrpin, gndpin );
    i2c.setPins( sclPin,sdaPin, true );
}

// -----------------------------------------------------------------------------
// many BlinkM commands are 3 arguments in length, here's a generalized form
static void BlinkM_sendCmd3( uint8_t addr, uint8_t c, uint8_t a1, uint8_t a2, uint8_t a3 )
{
    if( i2c.beginTransmission( addr ) == 0 ) {
        ++errcnt;
        //Serial.println( errcnt);  // FIXME
    }    
    i2c.write( c );
    i2c.write( a1 );
    i2c.write( a2 );
    i2c.write( a3 );
    i2c.endTransmission();
}

// other BlinkM commands have a single argument
static void BlinkM_sendCmd1( uint8_t addr, uint8_t c, uint8_t a1)
{
    if( i2c.beginTransmission( addr ) == 0 ) {
        ++errcnt;
        //Serial.println( errcnt); // FIXME
    }    
    i2c.write( c );
    i2c.write( a1 );
}

static void BlinkM_stopScript(uint8_t addr)
{
    i2c.beginTransmission( addr );
    i2c.write( 'o' );
    i2c.endTransmission();
}

static void BlinkM_setFadeSpeed( uint8_t addr, uint8_t f)
{
    BlinkM_sendCmd1( addr, 'f', f );
}

static void BlinkM_fadeToRGB( uint8_t addr, uint8_t r, uint8_t g, uint8_t b )
{
    BlinkM_sendCmd3( addr, 'c', r,g,b );
}

static void BlinkM_setRGB( uint8_t addr, uint8_t r, uint8_t g, uint8_t b )
{
    BlinkM_sendCmd3( addr, 'n', r,g,b );
}

static void BlinkM_off(uint8_t addr)
{
    BlinkM_stopScript( addr );
    BlinkM_setFadeSpeed(addr,10);
    BlinkM_setRGB(addr, 0,0,0 );
}

// Get the BlinkM firmware version
static int BlinkM_getVersion(byte addr)
{
    i2c.beginTransmission( addr );
    i2c.write( 'Z' );
    i2c.endTransmission();

    i2c.requestFrom( addr );  
    uint8_t major_ver = i2c.read();
    uint8_t minor_ver = i2c.readLast();
    i2c.endTransmission();
    return (major_ver<<8) + minor_ver;
}

//
static void BlinkM_getRGBColor(byte addr, byte* r, byte* g, byte* b)
{
    i2c.beginTransmission(addr);
    i2c.write('g');
    i2c.endTransmission();
    
    i2c.requestFrom( addr );
    *r = i2c.read();
    *g = i2c.read();
    *b = i2c.readLast();
    i2c.endTransmission();
}




