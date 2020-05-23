/* FreqCount - Example with LCD output
 * http://www.pjrc.com/teensy/td_libs_FreqCount.html
 *
 * This example code is in the public domain.
 */
#include <FreqCount.h>
#include <LiquidCrystal.h>

LiquidCrystal lcd(5, 4, 3, 2, 1, 0);

void setup() {
  Serial.begin(57600);
  lcd.begin(8, 2);
  lcd.print("Freq:");
  FreqCount.begin(1000);
}

void loop() {
  if (FreqCount.available()) {
    unsigned long count = FreqCount.read();
    lcd.setCursor(0, 1);
    lcd.print(count);
    lcd.print("       ");
  }
}

