//2004 I2C LCD DEMO
//BY KEYES 
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,20,4);  // set the LCD address to 0x27 for a 16 chars and 2 line display
void setup()
{
  lcd.init();   // initialize the lcd 
  lcd.init();
  lcd.backlight();
}
void loop()
{ 
  // Print a message to the LCD.
  lcd.setCursor(0,0);
  lcd.print("Hello, world!");
  lcd.setCursor(0,1);
  lcd.print("KEYES  Arduino!");
   lcd.setCursor(0,2);
  lcd.print("thanks");
  lcd.setCursor(0,3);
  lcd.print("This test is ok");
}
