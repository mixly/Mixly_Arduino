#include <LiquidCrystal_I2C.h>
#include <Wire.h>

LiquidCrystal_I2C mylcd(0x27,16,2);

void setup(){
  mylcd.init();
  mylcd.backlight();
}

void loop(){
  mylcd.setCursor(0, 0);
  mylcd.print("22");
  mylcd.setCursor(0, 1);
  mylcd.print("33");

}