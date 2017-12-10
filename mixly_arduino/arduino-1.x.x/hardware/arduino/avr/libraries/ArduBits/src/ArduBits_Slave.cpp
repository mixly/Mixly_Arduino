#include "ArduBits_Slave.h"
#include <arduino.h>

BTSlave::BTSlave(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{
  
}
/*---------蓝牙从机 软串口波特率设置---------*/
void BTSlave::begin(unsigned long baud)
{
    SetSerial::begin(baud); 
    BT_baud= baud;
}
/*---------蓝牙从机 硬串口波特率设置---------*/
void BTSlave::Serial_begin(unsigned long baud)
{

    Serial.begin(baud);  
}

/*---------蓝牙从机 软串口AT修改设置---------*/
void BTSlave:: Slave_set(String BTSet)
{
    
     Serial.begin(BT_baud);
     delay(50);
     Serial.println("ArduBits_Bluetooth Settings:");
     delay(50);
     SetSerial::println(BTSet);
     delay(50);
     SetSerial::println("AT+RESET");
     delay(50);
     if ( SetSerial::available() > 0)
     {
        Serial.println(SetSerial::readString());
      }
     else
      { 
        Serial.println("Set Error !!!");
        Serial.println("Please, Try Disconnect Bluetooth connection");
        Serial.println("");
      } 
    delay(50); 
      
}
/*---------蓝牙从机 硬串口AT修改设置---------*/
void BTSlave:: Serial_Slave_set(String BTSet)
{
     Serial.println("ArduBits_Bluetooth Settings:");
     delay(50);
     Serial.println(BTSet);
     delay(50);
     Serial.println("AT+RESET");
     delay(50);
     if ( Serial.available() > 0)
     {
        Serial.println(Serial.readString());
      }
     else
      { 
        Serial.println("Set Error !!!");
        Serial.println("Please, Try Disconnect Bluetooth connection");
        Serial.println("");
      } 
    delay(50); 
      
}
/*---------蓝牙从机 软串口接收数据处理---------*/
void BTSlave:: Slave_RX_Data(void)
{
    if (SetSerial::available() > 0) 
    {
        _Slave_RX_Schar = SetSerial::readStringUntil('*');
        _Slave_RX_Snum  = String(SetSerial::readStringUntil('#')).toInt();
        SetSerial::flush(); 
       delay(10); 
    }
}
/*---------蓝牙从机 硬串口接收数据处理---------*/
void BTSlave:: Serial_Slave_RX_Data(void)
{
    if (Serial.available() > 0) 
    {
        _Slave_RX_Schar = Serial.readStringUntil('*');
        _Slave_RX_Snum  = String(Serial.readStringUntil('#')).toInt();
        Serial.flush(); 
       delay(10); 
    }
}
/*---------蓝牙从机 软串口接收字符---------*/
String BTSlave:: Slave_RX_Schar(void)
{
    Slave_RX_Data();
    return  _Slave_RX_Schar;       
}
/*---------蓝牙从机 软串口接收数据--------*/
int16_t BTSlave:: Slave_RX_Snum(void)
{
    Slave_RX_Data();
    return  _Slave_RX_Snum;       
}
/*---------蓝牙从机 硬串口接收字符---------*/
String BTSlave:: Serial_Slave_RX_Schar(void)
{
    Serial_Slave_RX_Data();
    return  _Slave_RX_Schar;       
}
/*---------蓝牙从机 硬串口接收数据---------*/
int16_t BTSlave:: Serial_Slave_RX_Snum(void)
{
    Serial_Slave_RX_Data();
    return  _Slave_RX_Snum;       
}
/*---------蓝牙从机 软串口发送数据处理---------*/
void BTSlave:: Slave_TX_Data(String TX_Schar, int16_t RX_Snum)
{

    if(_TX_Schar != TX_Schar || _RX_Snum != RX_Snum)
    {
        SetSerial::print(TX_Schar);
        SetSerial::print(":");
        SetSerial::print(RX_Snum);
        SetSerial::print("#");
        SetSerial::flush();
        delay(5);
     }   
    _TX_Schar = TX_Schar;
    _RX_Snum = RX_Snum;  
}

/*---------蓝牙从机 硬串口发送数据处理---------*/
void BTSlave:: Serial_Slave_TX_Data(String TX_Schar, int16_t RX_Snum)
{

    if(_TX_Schar != TX_Schar || _RX_Snum != RX_Snum)
    {
        Serial.print(TX_Schar);
        Serial.print(":");
        Serial.print(RX_Snum);
        Serial.print("#");
        Serial.flush();
        delay(5);
     } 
    _TX_Schar = TX_Schar;
    _RX_Snum = RX_Snum;  
}
/*---------蓝牙从机 软串口接收按键---------*/
bool BTSlave::NA_Data(void)
{
    Slave_RX_Data();
    if(Slave_RX_Schar()=="na")
        NA=1;
    if(Slave_RX_Schar()=="xa")
        NA=0;  
    return  NA;     
}
bool BTSlave::NB_Data(void)
{
    Slave_RX_Data();  
    if(Slave_RX_Schar()=="nb")
        NB=1;  
    if(Slave_RX_Schar()=="xb")
        NB=0;  
    return  NB;     
}
bool BTSlave::NC_Data(void)
{
    Slave_RX_Data();  
    if(Slave_RX_Schar()=="nc")
        NC=1;  
    if(Slave_RX_Schar()=="xc")
        NC=0; 
    return  NC;     
}
bool BTSlave::ND_Data(void)
{
    Slave_RX_Data();  
    if(Slave_RX_Schar()=="nd")
        ND=1;
    if(Slave_RX_Schar()=="xd")
        ND=0;
    return  ND;     
}
bool BTSlave::NE_Data(void)
{
    Slave_RX_Data();  
    if(Slave_RX_Schar()=="ne")
        NE=1;
    if(Slave_RX_Schar()=="xe")
        NE=0;
    return  NE;     
}
bool BTSlave::NF_Data(void)
{
    Slave_RX_Data();  
    if(Slave_RX_Schar()=="nf")
        NF=1; 
    if(Slave_RX_Schar()=="xf")
        NF=0;    
    return  NF;     
}

/*---------蓝牙从机 硬串口接收按键---------*/
bool BTSlave::Serial_NA_Data(void)
{
    Serial_Slave_RX_Data();
    if(Slave_RX_Schar()=="na")
        NA=1;
    if(Slave_RX_Schar()=="xa")
        NA=0;  
    return  NA;     
}
bool BTSlave::Serial_NB_Data(void)
{
    Serial_Slave_RX_Data();  
    if(Slave_RX_Schar()=="nb")
        NB=1;  
    if(Slave_RX_Schar()=="xb")
        NB=0;  
    return  NB;     
}
bool BTSlave::Serial_NC_Data(void)
{
    Serial_Slave_RX_Data();  
    if(Slave_RX_Schar()=="nc")
        NC=1;  
    if(Slave_RX_Schar()=="xc")
        NC=0; 
    return  NC;     
}
bool BTSlave::Serial_ND_Data(void)
{
    Serial_Slave_RX_Data();  
    if(Slave_RX_Schar()=="nd")
        ND=1;
    if(Slave_RX_Schar()=="xd")
        ND=0;
    return  ND;     
}
bool BTSlave::Serial_NE_Data(void)
{
    Serial_Slave_RX_Data();  
    if(Slave_RX_Schar()=="ne")
        NE=1;
    if(Slave_RX_Schar()=="xe")
        NE=0;
    return  NE;     
}
bool BTSlave::Serial_NF_Data(void)
{
    Serial_Slave_RX_Data();  
    if(Slave_RX_Schar()=="nf")
        NF=1; 
    if(Slave_RX_Schar()=="xf")
        NF=0;    
    return  NF;     
}
















