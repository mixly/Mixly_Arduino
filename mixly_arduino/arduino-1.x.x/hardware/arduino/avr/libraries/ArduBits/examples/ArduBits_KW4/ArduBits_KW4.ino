#include "ArduBits.h"

BTSlave  BTSlave(2,3);
int NUM;

void setup()
{
  Serial.begin(9600);
  BTSlave.begin(38400);
  BTSlave.begin(38400);
  BTSlave.Slave_set("AT+NAMEArduBitsDWD");
//BTSlave.Slave_set("AT+NAME");
//BTSlave.Slave_set("AT+BAUD6");
//BTSlave.Slave_set("AT+BAUD");
//BTSlave.Slave_set("AT+PIN");
//BTSlave.Slave_set("AT+PIN8888");


}

void loop()
{
  delay(20);
  NUM = (NUM + 1)%50;
  BTSlave.Slave_TX_Data("P",NUM);
  Serial.print(BTSlave.Slave_RX_Schar());
  Serial.println(BTSlave.Slave_RX_Snum());
    
}
