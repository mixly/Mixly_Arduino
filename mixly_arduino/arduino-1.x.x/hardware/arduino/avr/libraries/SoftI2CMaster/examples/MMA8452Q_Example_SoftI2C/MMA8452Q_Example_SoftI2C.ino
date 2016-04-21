/* MMA8452Q Example Code
   by: Jim Lindblom
   SparkFun Electronics
   date: October 13, 2011
   license: Creative Commons Share-Alike v3.0 (CC BY-SA 3.0)
   
   This code should provide example usage for most features of
   the MMA8452Q 3-axis, I2C accelerometer. In the loop function
   the accelerometer interrupt outputs will be polled, and either
   the x/y/z accel data will be output, or single/double-taps,
   portrait/landscape changes will be announced.
   
   The skeleton is here, feel free to cut/paste what code you need.
   Play around with the settings in initMMA8452Q. Try running the
   code without printing the accel values, to really appreciate
   the single/double-tap and portrait landscape functions. The
   P/L stuff is really neat, something not many accelerometers have.
   
   Hardware setup:
   MMA8452 Breakout ------------ Arduino
       3.3V --------------------- 3.3V
       SDA ----------------------- A4
       SCL ----------------------- A5
       INT2 ---------------------- D3
       INT1 ---------------------- D2
       GND ---------------------- GND
   
   SDA and SCL should have external pull-up resistors (to 3.3V).
   10k resistors worked for me. They should be on the breakout
   board.
   
   Note: The MMA8452 is an I2C sensor, however this code does
   not make use of the Arduino Wire library. Because the sensor
   is not 5V tolerant, we can't use the internal pull-ups used
   by the Wire library. Instead use the included i2c.h file.
*/

//#include "i2c.h"  // not the wire library, can't use pull-ups
#include "SoftI2CMaster.h"

//const int sdaPin = A4;
//const int sclPin = A5;
const int sdaPin = 4;
const int sclPin = 5;
SoftI2CMaster i2c = SoftI2CMaster( sclPin, sdaPin, 0 );

#define SA0 1  // Breakout board defaults to 1, set to 0 if SA0 jumper is set
#if SA0
  #define MMA8452_ADDRESS 0x1D  // SA0 is high, 0x1C if low
#else
  #define MMA8452_ADDRESS 0x1C
#endif

/* Set the scale below either 2, 4 or 8*/
const byte scale = 2;  // Sets full-scale range to +/-2, 4, or 8g. Used to calc real g values.
/* Set the output data rate below. Value should be between 0 and 7*/
const byte dataRate = 0;  // 0=800Hz, 1=400, 2=200, 3=100, 4=50, 5=12.5, 6=6.25, 7=1.56

/* Pin definitions */
int int1Pin = 2;  // These can be changed, 2 and 3 are the Arduinos ext int pins
int int2Pin = 3;

byte data[6];  // x/y/z accel register data store here
int accelCount[3];  // Stores the 12-bit signed value
float accel[3];  // Stores the real accel value in g's
  
void setup()
{
  byte c;
  
  Serial.begin(115200);
  
  /* Set up the interrupt pins, they're set as active high, push-pull */
  pinMode(int1Pin, INPUT);
  digitalWrite(int1Pin, LOW);
  pinMode(int2Pin, INPUT);
  digitalWrite(int2Pin, LOW);
  
  /* Read the WHO_AM_I register, this is a good test of communication */
  c = readRegister(0x0D);  // Read WHO_AM_I register
  if (c == 0x2A) // WHO_AM_I should always be 0x2A
  {  
    initMMA8452(scale, dataRate);  // init the accelerometer if communication is good
    Serial.println(F("MMA8452Q is online..."));
  }
  else
  {
    Serial.print(F("Could not connect to MMA8452Q: 0x"));
    Serial.println(c, HEX);
    while (1)  // Loop forever if communication doesn't happen
      ;
  }
}

void loop()
{  
  static byte source;
  
  /* If int1 goes high, all data registers have new data */
 
  if (digitalRead(int1Pin))  // Interrupt pin, should probably attach to interrupt function
  //if (readRegister(0x00)&0x7) // Polling, you can use this instead of the interrupt pins
  {
      readRegisters(0x01, 6, &data[0]);  // Read the six data registers into data array
    
      // For loop to calculate 12-bit ADC and g value for each axis 
    for (int i=0; i<6; i+=2)
    {
      accelCount[i/2] = ((data[i] << 8) | data[i+1]) >> 4;  // Turn the MSB and LSB into a 12-bit value
      if (data[i] > 0x7F)
      {  // If the number is negative, we have to make it so manually (no 12-bit data type)
        accelCount[i/2] = ~accelCount[i/2] + 1;
        accelCount[i/2] *= -1;  // Transform into negative 2's complement #
      }
      accel[i/2] = (float) accelCount[i/2]/((1<<12)/(2*scale));  // get actual g value, this depends on scale being set
    }
    
    // For loop to print out values 

    for (int i=0; i<3; i++)
    {
      Serial.print(accel[i], 4);  // Print g values
      //Serial.print(accelCount[i], DEC);  // Print adc count values, feel free to uncomment this line
      Serial.print("\t\t");
    }
    Serial.println();

  }


  /* If int2 goes high, either p/l has changed or there's been a single/double tap */
  if (digitalRead(int2Pin))
  {
    source = readRegister(0x0C);  // Read the interrupt source reg.
    if ((source & 0x10)==0x10)  // If the p/l bit is set, go check those registers
      portraitLandscapeHandler();
    else if ((source & 0x08)==0x08)  // Otherwise, if tap register is set go check that
      tapHandler();
    delay(100);  // Delay here for a little printing visibility, make it longer, or delete it
  }
  delay(20);
}

/* This function will read the status of the tap source register.
   And print if there's been a single or double tap, and on what
   axis. */
void tapHandler()
{
  byte source = readRegister(0x22);  // Reads the PULSE_SRC register
  
  if ((source & 0x10)==0x10)  // If AxX bit is set
  {
    if ((source & 0x08)==0x08)  // If DPE (double puls) bit is set
      Serial.print("    2 X");
    else
      Serial.print("1 X");
      
    if ((source & 0x01)==0x01)  // If PoIX is set
      Serial.println(" +");
    else
      Serial.println(" -");
  }
  if ((source & 0x20)==0x20)  // If AxY bit is set
  {
    if ((source & 0x08)==0x08)  // If DPE (double puls) bit is set
      Serial.print("    2 Y");
    else
      Serial.print("1 Y");
      
    if ((source & 0x02)==0x02)  // If PoIY is set
      Serial.println(" +");
    else
      Serial.println(" -");
  }
  if ((source & 0x40)==0x40)  // If AxZ bit is set
  {
    if ((source & 0x08)==0x08)  // If DPE (double puls) bit is set
      Serial.print("    2 Z");
    else
      Serial.print("1 Z");
    if ((source & 0x04)==0x04)  // If PoIZ is set
      Serial.println(" +");
    else
      Serial.println(" -");
  }
}

/* This function will read the p/l source register and
   print what direction the sensor is now facing */
void portraitLandscapeHandler()
{
  byte pl = readRegister(0x10);  // Reads the PL_STATUS register
  switch((pl&0x06)>>1)  // Check on the LAPO[1:0] bits
  {
    case 0:
      Serial.print(F("Portrait up, "));
      break;
    case 1:
      Serial.print(F("Portrait Down, "));
      break;
    case 2:
      Serial.print(F("Landscape Right, "));
      break;
    case 3:
      Serial.print(F("Landscape Left, "));
      break;
  }
  if (pl&0x01)  // Check the BAFRO bit
    Serial.print(F("Back"));
  else
    Serial.print(F("Front"));
  if (pl&0x40)  // Check the LO bit
    Serial.print(F(", Z-tilt!"));
  Serial.println();
}

/* Initialize the MMA8452 registers 
   See the many application notes for more info on setting 
   all of these registers:
   http://www.freescale.com/webapp/sps/site/prod_summary.jsp?code=MMA8452Q
   
   Feel free to modify any values, these are settings that work well for me.
*/
void initMMA8452(byte fsr, byte dataRate)
{
  MMA8452Standby();  // Must be in standby to change registers
  
  /* Set up the full scale range to 2, 4, or 8g. */
  if ((fsr==2)||(fsr==4)||(fsr==8))
    writeRegister(0x0E, fsr >> 2);  
  else
    writeRegister(0x0E, 0);
  /* Setup the 3 data rate bits, from 0 to 7 */
  writeRegister(0x2A, readRegister(0x2A) & ~(0x38));
  if (dataRate <= 7)
    writeRegister(0x2A, readRegister(0x2A) | (dataRate << 3));  
  /* Set up portrait/landscap registers */
  writeRegister(0x11, 0x40);  // Enable P/L
  writeRegister(0x13, 0x14);  // 29deg z-lock, 
  writeRegister(0x14, 0x84);  // 45deg thresh, 14deg hyst
  writeRegister(0x12, 0x05);  // debounce counter at 100ms 
  /* Set up single and double tap */
  writeRegister(0x21, 0x7F);  // enable single/double taps on all axes
  writeRegister(0x23, 0x20);  // x thresh at 2g
  writeRegister(0x24, 0x20);  // y thresh at 2g
  writeRegister(0x25, 0x8);  // z thresh at .5g
  writeRegister(0x26, 0x30);  // 60ms time limit, the min/max here is very dependent on output data rate
  writeRegister(0x27, 0x28);  // 200ms between taps min
  writeRegister(0x28, 0xFF);  // 1.275s (max value) between taps max
  /* Set up interrupt 1 and 2 */
  writeRegister(0x2C, 0x02);  // Active high, push-pull
  writeRegister(0x2D, 0x19);  // DRDY int enabled, P/L enabled
  writeRegister(0x2E, 0x01);  // DRDY on INT1, P/L on INT2
  
  MMA8452Active();  // Set to active to start reading
}

/* Sets the MMA8452 to standby mode.
   It must be in standby to change most register settings */
void MMA8452Standby()
{
  byte c = readRegister(0x2A);
  writeRegister(0x2A, c & ~(0x01));
}

/* Sets the MMA8452 to active mode.
   Needs to be in this mode to output data */
void MMA8452Active()
{
  byte c = readRegister(0x2A);
  writeRegister(0x2A, c | 0x01);
}

/* Read i registers sequentially, starting at address 
   into the dest byte arra */
void readRegisters(byte address, int i, byte * dest) 
{
    i2c.beginTransmission( MMA8452_ADDRESS );
    i2c.write( address );
    i2c.endTransmission();

    i2c.requestFrom( MMA8452_ADDRESS );
    int j;
    for( j=0; j<i-1; j++) {
        dest[j] = i2c.read();
    }
    dest[j+1] = i2c.readLast();
    i2c.endTransmission();

}

 // read a single byte from address and return it as a byte 
byte readRegister(uint8_t address)
{
    byte data;
  
    i2c.beginTransmission( MMA8452_ADDRESS );
    i2c.write( address );
    i2c.endTransmission();

    i2c.requestFrom( MMA8452_ADDRESS );
    data = i2c.readLast();
    i2c.endTransmission();

    return data;
}


// Writes a single byte (data) into address 
void writeRegister(unsigned char address, unsigned char data)
{
    i2c.beginTransmission( MMA8452_ADDRESS );
    i2c.write( address );
    i2c.write( data );
    i2c.endTransmission();
}

