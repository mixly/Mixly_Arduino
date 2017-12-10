#include "ArduBits.h"

WiFi_ESP8266 WiFi_ESP8266;

volatile long NUM;

void setup()
{
  WiFi_ESP8266.WiFi_ESP8266_INT(); 
  pinMode(13, OUTPUT);
  pinMode(5, OUTPUT);
  NUM = 0;
  WiFi_ESP8266.wificonfig("ArduBits","ArduBits2017");
  WiFi_ESP8266.cloudconfig("19991689","IgQApOFZ7gEtRM=xged5QKrq9zU=");
}

void loop()
{
  NUM = NUM + 1;
  WiFi_ESP8266.recvdeal();
  WiFi_ESP8266.sendint(NULL,"test",NUM);
  delay(2000);
  if(WiFi_ESP8266.EDP_Connect())
      digitalWrite(13,HIGH);
  else
      digitalWrite(13,LOW);
  if(WiFi_ESP8266.recvname()=="key")
   {
     digitalWrite(5,WiFi_ESP8266.recvdata());
     delay(100);
     digitalWrite(5,!WiFi_ESP8266.recvdata());
    }
     //WiFi_ESP8266.sendint(NULL,"key",WiFi_ESP8266.recvdata()); 
    
}
