// DS1302_LCD (C)2010 Henning Karlsen
// web: http://www.henningkarlsen.com/electronics
//
// A quick demo of how to use my DS1302-library to make a quick
// clock using a DS1302 and a 16x2 LCD.
//
// I assume you know how to connect the DS1302 and LCD.
// DS1302:  CE pin    -> Arduino Digital 2
//          I/O pin   -> Arduino Digital 3
//          SCLK pin  -> Arduino Digital 4
// LCD:     DB7       -> Arduino Digital 6
//          DB6       -> Arduino Digital 7
//          DB5       -> Arduino Digital 8
//          DB4       -> Arduino Digital 9
//          E         -> Arduino Digital 10
//          RS        -> Arduino Digital 11

#include <LiquidCrystal.h>
#include <DS1302.h>

// Init the DS1302
DS1302 rtc(2, 3, 4);

// Init the LCD
LiquidCrystal lcd(11, 10, 9, 8, 7, 6);

void setup()
{
  // Set the clock to run-mode, and disable the write protection
  rtc.halt(false);
  rtc.writeProtect(false);
  
  // Setup LCD to 16x2 characters
  lcd.begin(16, 2);

  // The following lines can be commented out to use the values already stored in the DS1302
  rtc.setDOW(FRIDAY);        // Set Day-of-Week to FRIDAY
  rtc.setTime(12, 0, 0);     // Set the time to 12:00:00 (24hr format)
  rtc.setDate(6, 8, 2010);   // Set the date to August 6th, 2010
}

void loop()
{
  // Display time centered on the upper line
  lcd.setCursor(4, 0);
  lcd.print(rtc.getTimeStr());
  
  // Display abbreviated Day-of-Week in the lower left corner
  lcd.setCursor(0, 1);
  lcd.print(rtc.getDOWStr(FORMAT_SHORT));
  
  // Display date in the lower right corner
  lcd.setCursor(6, 1);
  lcd.print(rtc.getDateStr());

  // Wait one second before repeating :)
  delay (1000);
}
