// DS1302_Serial_Hard (C)2010 Henning Karlsen
// web: http://www.henningkarlsen.com/electronics
//
// A quick demo of how to use my DS1302-library to 
// retrieve time- and date-date for you to manipulate.
//
// I assume you know how to connect the DS1302.
// DS1302:  CE pin    -> Arduino Digital 2
//          I/O pin   -> Arduino Digital 3
//          SCLK pin  -> Arduino Digital 4

#include <DS1302.h>

// Init the DS1302
DS1302 rtc(2, 3, 4);

// Init a Time-data structure
Time t;

void setup()
{
  // Set the clock to run-mode, and disable the write protection
  rtc.halt(false);
  rtc.writeProtect(false);
  
  // Setup Serial connection
  Serial.begin(9600);

  // The following lines can be commented out to use the values already stored in the DS1302
  rtc.setDOW(FRIDAY);        // Set Day-of-Week to FRIDAY
  rtc.setTime(12, 0, 0);     // Set the time to 12:00:00 (24hr format)
  rtc.setDate(6, 8, 2010);   // Set the date to August 6th, 2010
}

void loop()
{
  // Get data from the DS1302
  t = rtc.getTime();
  
  // Send date over serial connection
  Serial.print("Today is the ");
  Serial.print(t.date, DEC);
  Serial.print(". day of ");
  Serial.print(rtc.getMonthStr());
  Serial.print(" in the year ");
  Serial.print(t.year, DEC);
  Serial.println(".");
  
  // Send Day-of-Week and time
  Serial.print("It is the ");
  Serial.print(t.dow, DEC);
  Serial.print(". day of the week (counting monday as the 1th), and it has passed ");
  Serial.print(t.hour, DEC);
  Serial.print(" hour(s), ");
  Serial.print(t.min, DEC);
  Serial.print(" minute(s) and ");
  Serial.print(t.sec, DEC);
  Serial.println(" second(s) since midnight.");

  // Send a divider for readability
  Serial.println("  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -");
  
  // Wait one second before repeating :)
  delay (1000);
}
