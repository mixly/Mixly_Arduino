#include "ArduBits_ESP8266.h"


void WiFi_ESP8266::wifiint(void) 
{
    Serial.begin(115200);
    Serial.setTimeout(3000); //设置find超时时间
}

bool WiFi_ESP8266::DoCmdOk(char *data, char *keyword)
{
    bool result = false;
    if (data != "") //对于tcp连接命令，直接等待第二次回复
        Serial.println(data); //发送AT指令
        
    if (data == "AT") //检查模块存在
        delay(2000);
    else
        while (!Serial.available()); // 等待模块回复
        
    delay(200);
    if (Serial.find(keyword)) //返回值判断
    {
        result = true;
    }
    else
    {
        result = false;
    }
    while (Serial.available()) Serial.read(); //清空串口接收缓存
    delay(500);          //指令时间间隔
    return result;
}

void WiFi_ESP8266::wificonfig(char *ssid, char *passwd)
{
    char temp[50] = {'\0'};
    while (!DoCmdOk("AT", "OK"));
    while (!DoCmdOk("AT+CWMODE=1", "OK")); //工作模式
    strcat(temp, "AT+CWJAP=\"");
    strcat(temp, ssid);
    strcat(temp, "\",\"");
    strcat(temp, passwd);
    strcat(temp, "\"");
    while (!DoCmdOk(temp, "OK"));
    while (!DoCmdOk("AT+CIPSTART=\"TCP\",\"183.230.40.39\",876", "CONNECT"));
    while (!DoCmdOk("AT+CIPMODE=1", "OK")); //透传模式
    while (!DoCmdOk("AT+CIPSEND", ">")); //开始发送
}
void WiFi_ESP8266::cloudconfig(char *id, char *key)
{
    //edu connect
    if (!edp_connect)
    {
        int tmp;
        ID = id;
        KEY = key;
        while (Serial.available()) Serial.read();                //清空串口接收缓存
        packetSend(packetConnect(ID, KEY)); //发送EPD连接包
        while (!Serial.available())
            ; //等待EDP连接应答
        if ((tmp = Serial.readBytes(rcv_pkt.data, sizeof(rcv_pkt.data))) > 0)
        {
            if (rcv_pkt.data[0] == 0x20 && rcv_pkt.data[2] == 0x00 && rcv_pkt.data[3] == 0x00)
                edp_connect = 1;
        }
        packetClear(&rcv_pkt);
    }
}


bool WiFi_ESP8266::EDP_Connect(void)
{
  return edp_connect;
}

void WiFi_ESP8266::sendint(char *destid, String sname, int data)
{
    //char *id = destid.c_str();
    const char *cname = sname.c_str();
    char int_str[10] = {'\0'};
    sprintf(int_str, "%d", data);
    if (edp_connect)
    {
        packetSend(packetDataSaveTrans(destid, cname, int_str)); //发送数据存储包
        delay(100);
    }
}

void WiFi_ESP8266::recvdeal(void)
{
    while (Serial.available())
    {
        readEdpPkt(&rcv_pkt);
        if (isEdpPkt(&rcv_pkt))
        {
            uint8 pkt_type;
            pkt_type = rcv_pkt.data[0];
            switch (pkt_type)
            {
            case CMDREQ:
                char edp_command[50];
                char edp_cmd_id[40];
                long id_len, cmd_len, rm_len;
                char datastr[20];
                char val[10];
                memset(edp_command, 0, sizeof(edp_command));
                memset(edp_cmd_id, 0, sizeof(edp_cmd_id));
                edpCommandReqParse(&rcv_pkt, edp_cmd_id, edp_command, &rm_len, &id_len, &cmd_len);
                sscanf(edp_command, "%[^:]:%s", datastr, val);//本例中格式为  datastream:[1/0]
                RXname = datastr;
                RXdata = atoi(val);
                //packetSend(packetDataSaveTrans(NULL, datastr,val)); //将新数据值上传至数据流
                break;
            default:
                break;
            }
        }
    }
    if (rcv_pkt.len > 0)
        packetClear(&rcv_pkt);
    delay(150);  
}

String WiFi_ESP8266::recvname(void)
{
  return  RXname;
}
long int WiFi_ESP8266::recvdata(void)
{
  return  RXdata;
}



/*
 * readEdpPkt
 * 从串口缓存中读数据到接收缓存
 */
bool WiFi_ESP8266::readEdpPkt(edp_pkt *p)
{
    int tmp;
    if ((tmp = Serial.readBytes(p->data + p->len, sizeof(p->data))) > 0)
    {
        p->len += tmp;
    }
    return true;
}

/*
 * packetSend
 * 将待发数据发送至串口，并释放到动态分配的内存
 */
void WiFi_ESP8266::packetSend(edp_pkt *pkt)
{
    if (pkt != NULL)
    {
        Serial.write(pkt->data, pkt->len); //串口发送
        Serial.flush();
        free(pkt); //回收内存
    }
}
