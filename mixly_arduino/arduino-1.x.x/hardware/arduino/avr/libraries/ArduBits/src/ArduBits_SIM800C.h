#ifndef ArduBits_SIM800C_H
#define ArduBits_SIM800C_H
#include "ArduBits_EDP.h"
#include <Arduino.h>
using namespace std; 
  
class GSM_SIM800C
{
public:

  void gsmint(void);                                  //GSM初始化实际是串口初始化
	void gsmconfig(void);                               //GSM_SIM800C模块AT指令配置
  void cloudconfig(char *id, char *key);              //中移动物联云平台连接配置
	void sendint(char* destid, String sname, int data);//发送数据
  bool EDP_Connect(void);                             //确认连接
  void recvdeal(void);                                //下发解析
  String recvname(void);                              //下发的名称
  long int recvdata(void);                            //下发的数据
  bool DoCmdOk(char  *data,char *keyword);            //发送AT指令
  bool Caller_ID(void);                               //来电显示
  void SendMessage(char *number,char *message);       //短信发送信息
  void Swop(char *number);                            //交换函数
  void SendMessage_PDU(const unsigned int number,char *centre,char *addressee,char *message);//PDU模式发送信息
  String Rx_meg(void);                                //接收短信控制
  void Rx_meg_int(void);                              //接收短信控制初始化
  String recvmeg(void);
  String GSM_SIM800C::Recv_number(void);            //获取号码
  String RX_meg = "";                                 //解析的信息
  String RX_number = "";                                 //解析的信息

private:
	bool edp_connect=0;                                //连接标志
  char *ID,*KEY;                                      //连接云端设备的ID和KEY
  edp_pkt *edp;                                       //创建EDP对象,edp包
  bool readEdpPkt(edp_pkt *p);                        //读取EDP包
  edp_pkt rcv_pkt;                                    //要发送的数据包
	void packetSend(edp_pkt* pkt);                      //发送数据包
  String RXname;                                      //解析的内容
  long int RXdata;
  
 
};
#endif
