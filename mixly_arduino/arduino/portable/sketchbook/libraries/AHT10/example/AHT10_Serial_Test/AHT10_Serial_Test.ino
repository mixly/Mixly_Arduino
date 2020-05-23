#include <Wire.h>
#include <Thinary_AHT10.h>

AHT10Class AHT10;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Wire.begin();
  if(AHT10.begin(eAHT10Address_Low))
    Serial.println("Init AHT10 Sucess.");
  else
    Serial.println("Init AHT10 Failure.");
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("//Thinary Eletronic AHT10 Module//");
  Serial.println("https://thinaryelectronic.aliexpress.com");
  Serial.println(String("")+"Humidity(%RH):\t\t"+AHT10.GetHumidity()+"%");
  Serial.println(String("")+"Temperature(℃):\t"+AHT10.GetTemperature()+"℃");
  Serial.println(String("")+"Dewpoint(℃):\t\t"+AHT10.GetDewPoint()+"℃");
  delay(500);
}
