#include "ArduBits_RFID.h"
#include <arduino.h>
#include <stdio.h>

RFID::RFID(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{

}
void RFID::begin(unsigned long baud)
{
    SetSerial::begin(baud);  
}

void RFID::read_ID(void)
{
    for(int i=0;(SetSerial::available()>0);i++)// 串口空闲
   {
      Code[i]=SetSerial::read();
      delay(3);
      if(i==5) 
         RX_Flag=1;//第13位为结束码，收到数据，标志置1
      else 
         RX_Flag=0;
    }  
}

unsigned long  RFID::get_RFID_num(void)
{
  read_ID();
 if(RX_Flag==1)
  {
    if((Code[4]^Code[3]^Code[2]^Code[1]^Code[0])==Code[5])
    {
      RFID_NUM=Code[4] + Code[3]* 256 + Code[2]*65536+ Code[1]*4294967296;
    }  
    RX_Flag=0;
   return RFID_NUM; 
   } 
else
   return 0;
}



