#ifndef _RTC_h_
#define _RTC_h_
#include "Arduino.h"

#define DS1307ADDR 0XD0

class DS1307
{
public:
  DS1307(uint8_t sdaport,uint8_t sclport);
  uint8_t getSecond(void);
  uint8_t getMinute(void);
  uint8_t getHour(void);
  uint8_t getDOW(void);
  uint8_t getDay(void);
  uint8_t getMonth(void);
  uint16_t getYear(void);
  void setTime(uint8_t _hour, uint8_t _minute, uint8_t _second);
  void setDate(uint16_t _year, uint8_t _month, uint8_t _day);
  void setDOW(uint16_t w_year, uint8_t w_month, uint8_t w_day);
  
  
private:
	void IICbegin(uint8_t sdapin,uint8_t sclpin);
	bool IICstart(uint8_t addr);
	bool IICrestart(uint8_t addr);
	void IICstop();
	uint8_t IICread(uint8_t last);
	bool IICwrite(uint8_t data);
	void getTime(void);

	uint8_t decToBcd(uint8_t val);
	uint8_t bcdToDec(uint8_t val);
  uint8_t readDS1307(uint8_t address, uint8_t *buf, uint8_t count);
  uint8_t writeDS1307(uint8_t address, uint8_t *buf, uint8_t count);
	uint8_t second;
	uint8_t minute;
	uint8_t hour; 
	uint8_t week;// day of week, 1 = Monday
	uint8_t day;
	uint8_t month;
	uint16_t year;
	uint8_t SCL_pin,SDA_pin;

};
#endif
