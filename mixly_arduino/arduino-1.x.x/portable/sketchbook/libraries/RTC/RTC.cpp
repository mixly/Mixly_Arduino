#include "RTC.h"
#include "string.h"

uint8_t const I2C_READ = 1;
uint8_t const I2C_WRITE = 0;
uint8_t const I2C_DELAY_USEC = 4;


uint8_t DS1307::decToBcd(uint8_t val)
{
	return ( (val/10*16) + (val%10) );
}

//Convert binary coded decimal to normal decimal numbers
uint8_t DS1307::bcdToDec(uint8_t val)
{
	return ( (val/16*10) + (val%16) );
}

DS1307::DS1307(uint8_t sdaport,uint8_t sclport)
{

      SCL_pin =  sclport;
      SDA_pin =  sdaport;


    IICbegin(SDA_pin, SCL_pin);
}

/*
 * Read 'count' bytes from the DS1307 starting at 'address'
 */
uint8_t DS1307::readDS1307(uint8_t address, uint8_t *buf, uint8_t count) {
  // issue a start condition, send device address and write direction bit
  if (!IICstart(DS1307ADDR | I2C_WRITE)) return false;

  // send the DS1307 address
  if (!IICwrite(address)) return false;

  // issue a repeated start condition, send device address and read direction bit
  if (!IICrestart(DS1307ADDR | I2C_READ))return false;

  // read data from the DS1307
  for (uint8_t i = 0; i < count; i++) {

    // send Ack until last byte then send Ack
    buf[i] = IICread(i == (count-1));
  }

  // issue a stop condition
  IICstop();
  return true;
}
//------------------------------------------------------------------------------
/*
 * write 'count' bytes to DS1307 starting at 'address'
 */
uint8_t DS1307::writeDS1307(uint8_t address, uint8_t *buf, uint8_t count) {
  // issue a start condition, send device address and write direction bit
  if (!IICstart(DS1307ADDR | I2C_WRITE)) return false;

  // send the DS1307 address
  if (!IICwrite(address)) return false;

  // send data to the DS1307
  for (uint8_t i = 0; i < count; i++) {
    if (!IICwrite(buf[i])) return false;
  }

  // issue a stop condition
  IICstop();
  return true;
}

/****************************************************************/
/*Function: Read time and date from RTC	*/
void DS1307::getTime()
{
    uint8_t r[8];
    
    if (!readDS1307(0, r, 7)) 
    {
        return;
    }
  
	second	   = bcdToDec(r[0] & 0x7f);
	minute	   = bcdToDec(r[1]);
	hour	   = bcdToDec(r[2] & 0x3f);// Need to change this if 12 hour am/pm
	week  	   = bcdToDec(r[3]);
	day        = bcdToDec(r[4]);
	month      = bcdToDec(r[5]);
	year	   = bcdToDec(r[6]);
}

/*******************************************************************/


void DS1307::setTime(uint8_t _hour, uint8_t _minute, uint8_t _second)
{
    uint8_t r[3];
	// assign variables
	r[2] = decToBcd(_hour);
	r[1] = decToBcd(_minute);
	r[0] = decToBcd(_second);
	  
    if (!writeDS1307(0, r, 3)) 
    {
        return;
    }
}

void DS1307::setDate(uint16_t _year, uint8_t _month, uint8_t _day)
{ 
 
    uint8_t r[3];
	// assign variables
	r[2] = decToBcd(_year-2000);
	r[1] = decToBcd(_month);
	r[0] = decToBcd(_day);
 
    if (!writeDS1307(4, r, 3)) 
    {
        return;
    }    
}

void DS1307::setDOW(uint16_t w_year, uint8_t w_month, uint8_t w_day)
{
    int m =w_month;
    int d = w_day;  // 根据月份对年份和月份进行调整
    if(m <= 2)
    {
        w_year -= 1;
        m += 12;
    }
    int c =w_year / 100; // 取得年份前两位
    int y =w_year % 100; // 取得年份后两位
    int w = (int)(c/4) - 2*c + y + (int)(y/4) + (int)(13*(m+1)/5) + d - 1;                   // 根据泰勒公式计算星期
    int week;
    uint8_t r[1];

    if((w%7)==0)
       week=7;
    else
      week=w%7;
    
	  r[0] = decToBcd(week);
	  
    if (!writeDS1307(3, r, 1)) 
    {
        return;
    } 
}

uint8_t DS1307::getSecond(void)
{
    getTime();
	return second;
}
uint8_t DS1307::getMinute(void)
{
    getTime();
	return minute;
}
uint8_t DS1307::getHour(void)
{
    getTime();
	return hour;
}
uint8_t DS1307::getDOW(void)
{
    getTime();
	return week;
}
uint8_t DS1307::getDay(void)
{
    getTime();
	return day;
}
uint8_t DS1307::getMonth(void)
{
    getTime();
	return month;
}
uint16_t DS1307::getYear(void)
{
    getTime();
	return year+2000;
}

void DS1307::IICbegin(uint8_t sdapin,uint8_t sclpin)
{
	SDA_pin = sdapin;
	pinMode(SDA_pin,OUTPUT);
	digitalWrite(SDA_pin,HIGH);
	SCL_pin = sclpin;
	pinMode(SCL_pin,OUTPUT);
	digitalWrite(SCL_pin,HIGH);
}
bool DS1307::IICstart(uint8_t addr)
{
	digitalWrite(SDA_pin, LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SCL_pin, LOW);
	return IICwrite(addr);
}
bool DS1307::IICrestart(uint8_t addr)
{
	digitalWrite(SDA_pin, HIGH);
	digitalWrite(SCL_pin, HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	return IICstart(addr);
}
void DS1307::IICstop()
{
	digitalWrite(SDA_pin,LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SCL_pin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SDA_pin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
}
uint8_t DS1307::IICread(uint8_t last) {
  uint8_t b = 0;
  // make sure pull-up enabled
  digitalWrite(SDA_pin, HIGH);
  pinMode(SDA_pin, INPUT);
  // read byte
  for (uint8_t i = 0; i < 8; i++) {
    // don't change this loop unless you verify the change with a scope
    b <<= 1;
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(SCL_pin, HIGH);
    if (digitalRead(SDA_pin)) {b |= 1;}
	//else b &= 0;
    digitalWrite(SCL_pin, LOW);
  }
  // send Ack or Nak
  pinMode(SDA_pin, OUTPUT);
  digitalWrite(SDA_pin, last);
  digitalWrite(SCL_pin, HIGH);
  delayMicroseconds(I2C_DELAY_USEC);
  digitalWrite(SCL_pin, LOW);
  digitalWrite(SDA_pin, LOW);
  return b;
}

//------------------------------------------------------------------------------
/**
 * Write a byte.
 *
 * \param[in] data The byte to send.
 *
 * \return The value true, 1, if the slave returned an Ack or false for Nak.
 */
bool DS1307::IICwrite(uint8_t data) {
  // write byte
  for (uint8_t m = 0X80; m != 0; m >>= 1) {
    // don't change this loop unless you verify the change with a scope
    digitalWrite(SDA_pin, m & data);
    digitalWrite(SCL_pin, HIGH);
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(SCL_pin, LOW);
  }
  // get Ack or Nak
  pinMode(SDA_pin, INPUT);
  // enable pullup
  digitalWrite(SDA_pin, HIGH);
  digitalWrite(SCL_pin, HIGH);
  uint8_t rtn = digitalRead(SDA_pin);
  digitalWrite(SCL_pin, LOW);
  pinMode(SDA_pin, OUTPUT);
  digitalWrite(SDA_pin, LOW);
  return rtn == 0;
}
