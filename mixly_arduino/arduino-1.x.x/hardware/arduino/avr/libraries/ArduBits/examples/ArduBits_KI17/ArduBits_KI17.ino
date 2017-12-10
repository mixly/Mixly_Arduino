#include "ArduBits.h"

// Hx711.DOUT: A1
// Hx711.SCK:  A0
Hx711 scale(A0, A1);

void HX711Init(void)
{
  Serial.println("System Init,Please Wait...");
  
  long offset= scale.getAverageValue(30);//计算偏移量(此时称必须保持水平且称上不能有东西！！！)
  scale.setOffset(offset);//设置偏移
  scale.setScale(450);//设置比例(此值需要根据不同的重量传感器自己设置！)
}

void setup() 
{
  Serial.begin(9600);
  HX711Init();

}

void loop() 
{
  Serial.print((int)scale.getWeight(10));
  Serial.println("g");

}


