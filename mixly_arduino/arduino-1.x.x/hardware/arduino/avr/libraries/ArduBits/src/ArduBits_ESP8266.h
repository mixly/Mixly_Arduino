#ifndef ArduBits_ESP8266_H
#define ArduBits_ESP8266_H
#include "ArduBits_EDP.h"
#include <Arduino.h>
using namespace std; 
  
class WiFi_ESP8266
{
public:

  void wifiint(void);
	void wificonfig(char *ssid,char *passwd);
  void cloudconfig(char *id, char *key);
	void sendint(char* destid, String sname, int data);
  bool EDP_Connect(void);
  void recvdeal(void);
  String recvname(void);
  long int recvdata(void);
 
private:
	bool DoCmdOk(char  *data,char *keyword);
	bool edp_connect=0;
  char *ID,*KEY;
  edp_pkt *edp;  //创建EDP对象
  bool readEdpPkt(edp_pkt *p);
  edp_pkt rcv_pkt;
	void packetSend(edp_pkt* pkt);
  String RXname;
  long int RXdata;
};
#endif
