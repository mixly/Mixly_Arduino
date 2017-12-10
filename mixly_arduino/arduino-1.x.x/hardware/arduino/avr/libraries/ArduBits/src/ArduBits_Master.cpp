#include "ArduBits_Master.h"
#include <arduino.h>
//#include <stdio.h>

BTMaster::BTMaster(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{

}
/*---------蓝牙主机 软串口波特率设置---------*/
void BTMaster::begin(unsigned long baud)
{
    SetSerial::begin(baud);  
    BT_baud= baud;
}
/*---------蓝牙主机 硬串口波特率设置---------*/
void BTMaster::Serial_begin(unsigned long baud)
{
    Serial.begin(baud);  
}
/*---------蓝牙主机 软串口AT修改设置---------*/
void BTMaster:: Master_set(String BTSet)
{
     Serial.begin(BT_baud);
     delay(500);
     Serial.println("ArduBits_Bluetooth Settings:");
     delay(500);
     SetSerial::print(BTSet);
     delay(500);
     delay(500);
     if ( SetSerial::available() > 0)
     {
         Serial.println(SetSerial::readString());
      }
     else
      { 
        Serial.println("Set Error !!!");
        Serial.println("Please, Try Disconnect Bluetooth connection...");
        Serial.println("");
      } 
    delay(50); 
      
}
/*---------蓝牙主机 硬串口AT修改设置---------*/
void BTMaster:: Serial_Master_set(String BTSet)
{
     Serial.println("ArduBits_Bluetooth Settings:");
     delay(500);
     Serial.println(BTSet);
     delay(500);
     delay(500);
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
/*---------蓝牙主机 软串口接收数据处理---------*/
void BTMaster:: Master_RX_Data(void)
{
    if (SetSerial::available() > 0) 
    {
        _Master_RX_Schar = SetSerial::readStringUntil(':');
        _Master_RX_Snum  = String(SetSerial::readStringUntil('#')).toInt();
        SetSerial::flush(); 
        delay(10); 
    }
}
/*---------蓝牙主机 硬串口接收数据处理---------*/
void BTMaster:: Serial_Master_RX_Data(void)
{
    if (Serial.available() > 0) 
    {
        _Master_RX_Schar = Serial.readStringUntil(':');
        _Master_RX_Snum  = String(Serial.readStringUntil('#')).toInt();
        Serial.flush(); 
       delay(10); 
    }
}
/*---------蓝牙主机 软串口接收字符---------*/
String BTMaster:: Master_RX_Schar(void)
{
    Master_RX_Data();
    return  _Master_RX_Schar;       
}
/*---------蓝牙主机 软串口接收数据--------*/
int16_t BTMaster:: Master_RX_Snum(void)
{
    Master_RX_Data();
    return  _Master_RX_Snum;       
}
/*---------蓝牙主机 硬串口接收字符---------*/
String BTMaster:: Serial_Master_RX_Schar(void)
{
    Serial_Master_RX_Data();
    return  _Master_RX_Schar;       
}
/*---------蓝牙主机 硬串口接收数据---------*/
int16_t BTMaster:: Serial_Master_RX_Snum(void)
{
    Serial_Master_RX_Data();
    return  _Master_RX_Snum;       
}
/*---------蓝牙主机 软串口发送数据处理---------*/
void BTMaster:: Master_TX_Data(String TX_Schar, int16_t RX_Snum)
{

    if(_TX_Schar != TX_Schar || _RX_Snum != RX_Snum)
    {
        SetSerial::print(TX_Schar);
        SetSerial::print("*");
        SetSerial::print(RX_Snum);
        SetSerial::print("#");
        SetSerial::flush();
        delay(5);
     }
    _TX_Schar = TX_Schar;
    _RX_Snum = RX_Snum;
    
}
/*---------蓝牙主机 硬串口发送数据处理---------*/
void BTMaster:: Serial_Master_TX_Data(String TX_Schar, int16_t RX_Snum)
{

    if(_TX_Schar != TX_Schar || _RX_Snum != RX_Snum)
    {
        Serial.print(TX_Schar);
        Serial.print("*");
        Serial.print(RX_Snum);
        Serial.print("#");
        Serial.flush();
        delay(5);
     } 
    _TX_Schar = TX_Schar;
    _RX_Snum = RX_Snum;  
}


