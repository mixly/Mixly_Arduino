#include "ArduBits.h"

SR04 sr04(2,3);
long a;

void setup() {
   Serial.begin(9600);
}

void loop() {
  
  // a=sr04.Distance();
   a=sr04.DistanceAvg();
   Serial.print(a);
   Serial.println("cm");
}
