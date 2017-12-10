#include "ArduBits.h"
RFID RFID_2(2,3);

void setup() 
{
 RFID_2.begin(9600);
 Serial.begin(9600);
}

  
   
void loop()
{
   Serial.println(RFID_2.get_RFID_num());
   delay(1000);
}
