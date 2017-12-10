#include "ArduBits_SIM800C.h"


void GSM_SIM800C::gsmint(void) 
{
    Serial.begin(115200);
    Serial.setTimeout(4000); //设置find超时时间
}

//来电提示
bool GSM_SIM800C::Caller_ID(void)
{
  bool result = false;
  if(Serial.available())     //如果串口数据检测
  {
    if (Serial.find("RING")) //返回值判断,如果返回值有铃声
    {   
        result = true;
    }
    else
    {
        result = false;
    }  
  }
  return result; 
}

void GSM_SIM800C::SendMessage(char *number,char *message)
{
  /*要发送的收信人的号码*/
  char send_buf[100] = {0};
  memset(send_buf, 0, 100);                   //清空
  strcpy(send_buf, "AT+CMGS=");               //收信
  strcat(send_buf, "\"");
  strcat(send_buf, number);
  strcat(send_buf, "\"");
  while (!DoCmdOk(send_buf,">"));

  /*要发送的信息*/
  delay(200);
  Serial.print(message);
  delay(500); 

  /*发送结束符*/
  Serial.write(26);
  delay(1000); 
  
}

bool GSM_SIM800C::DoCmdOk(char *data, char *keyword)
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

void GSM_SIM800C::gsmconfig(void)
{
      while (!DoCmdOk("AT", "OK"));
      while (!DoCmdOk("AT+CGCLASS=\"B\"", "OK"));           //设置SIM800C
      while (!DoCmdOk("AT+CGDCONT=1,\"IP\",\"CMNET\"", "OK"));
      while (!DoCmdOk("AT+CGATT=1", "OK"));
      while (!DoCmdOk("AT+CIPCSGP=1,\"CMNET\"", "OK"));
      while (!DoCmdOk("AT+CLPORT=\"TCP\",\"2000\"", "OK"));
      while (!DoCmdOk("AT+CIPMODE=1", "OK"));              //透传模式
      while (!DoCmdOk("AT+CIPSTART=\"TCP\",\"183.230.40.39\",\"876\"", "OK"));
      while (!DoCmdOk("", "CONNECT"));
}


void GSM_SIM800C::cloudconfig(char *id, char *key)
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

        if (rcv_pkt.len > 0)
        packetClear(&rcv_pkt);
    delay(150);  
}


bool GSM_SIM800C::EDP_Connect(void)
{
  return edp_connect;
}

void GSM_SIM800C::sendint(char *destid, String sname, int data)
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

void GSM_SIM800C::recvdeal(void)
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

String GSM_SIM800C::recvname(void)
{
  return  RXname;
}
long int GSM_SIM800C::recvdata(void)
{
  return  RXdata;
}



/*
 * readEdpPkt
 * 从串口缓存中读数据到接收缓存
 */
bool GSM_SIM800C::readEdpPkt(edp_pkt *p)
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
void GSM_SIM800C::packetSend(edp_pkt *pkt)
{
    if (pkt != NULL)
    {
        Serial.write(pkt->data, pkt->len); //串口发送
        Serial.flush();
        free(pkt); //回收内存
    }
}
