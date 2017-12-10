#include "ArduBits.h"

BTMaster  BTMaster(2,3);
int NUM;

void setup()
{
  //Serial.begin(9600);
  BTMaster.begin(38400);
BTMaster.Master_set("AT+ROLE=S");
//BTMaster.Master_set("AT+ROLE=M");
BTMaster.Master_set("AT+NAMEAAAAA");
BTMaster.Master_set("AT+BAUD6");
 BTMaster.Master_set("AT+PIN8888");



}

void loop()
{
  NUM = NUM + 1;
//  BTMaster.Master_TX_Data("P",NUM);
// delay(200);
 //if (BTMaster.available() > 0) {
//  Serial.print(BTMaster.Master_RX_Schar());
// Serial.println(BTMaster.Master_RX_Snum());
    

 // }
}
