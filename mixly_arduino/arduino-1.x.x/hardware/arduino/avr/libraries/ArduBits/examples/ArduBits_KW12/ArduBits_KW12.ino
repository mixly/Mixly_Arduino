#include "ArduBits_SIM800C.h"
#include <SoftwareSerial.h>
GSM_SIM800C GSM;

SoftwareSerial dbgSerial( 3, 2 );   // 软串口，调试打印

void setup()
{
  dbgSerial.begin(115200);
  GSM.gsmint();
  GSM.gsmconfig();
  GSM.cloudconfig("20236008","iE46KThaxMinE=ckDb4mFNbxSl4=");//配置信息端口和APIKey
  pinMode(13, OUTPUT);//连接指示
  pinMode(8, OUTPUT);//KEY指示
  dbgSerial.println("setup_start");
  
  
}

void loop()
{
  GSM.recvdeal();                                             //下发解析
  GSM.sendint(NULL,"k",GSM.recvdata());                       //回传数据
  delay(3000); 
  digitalWrite(13,GSM.EDP_Connect());                        //云配置连接成功点亮
  if (GSM.recvname() == "key") {
    analogWrite(8,GSM.recvdata());

  }

}
