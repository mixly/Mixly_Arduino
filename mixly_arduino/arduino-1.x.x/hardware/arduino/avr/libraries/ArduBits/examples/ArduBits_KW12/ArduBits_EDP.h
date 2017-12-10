#ifndef ArduBits_EDP_H
#define ArduBits_EDP_H
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define CONNREQ             0x10
#define CONNRESP            0x20
#define PUSHDATA            0x30
#define SAVEDATA            0x80
#define SAVEACK             0x90
#define CMDREQ              0xA0
#define CMDRESP             0xB0
#define PINGREQ             0xC0
#define PINGRESP            0xD0
#define ENCRYPTREQ          0xE0
#define ENCRYPTRESP         0xF0

#define MAX_LEN				200
#define PROTOCOL_NAME       "EDP"
#define PROTOCOL_VERSION    1

typedef unsigned char   uint8;
typedef char            int8;
typedef unsigned int    uint16;
typedef int             int16;
typedef unsigned long   uint32;
typedef long            int32;
typedef struct
{
  uint8 data[MAX_LEN];
  int16 len;
  int16 read_p;
} edp_pkt;
/*
 * packetCreate
 * 创建一个EDP包缓存空间
 */
edp_pkt *packetCreate(void);
/*
 * writeRemainlen
 * 向EDP包中写入剩余长度字段
 * len_val: 剩余长度的值
 */
int8 writeRemainlen(edp_pkt* pkt, int16 len_val);
/*
 * writeByte
 * 向EDP包中写入一个字节
 */
int16 writeByte(edp_pkt* pkt, int8 byte);
/*
 * writeBytes
 * 向EDP包中写入多个字节
 */
int16 writeBytes(edp_pkt* pkt, const void* bytes, int16 count);
/*
 * writeStr
 * 向EDP包中写入字符串字段
 * 首先写入两个字节的长度，随后紧跟字符串内容
 */
int16 writeStr(edp_pkt* pkt, const int8* str);
/*
 * readUint8
 * 从EDP包中读出一个字节
 */
uint8 readUint8(edp_pkt* pkt);
/*
 * readUint16
 * 从EDP包中读出16bit的字段
 */
uint16 readUint16(edp_pkt* pkt);
/*
 * readUint32
 * 从EDP包中读出4个字节的字段
 */
uint32 readUint32(edp_pkt* pkt);

/*
 * readStr
 * 根据长度，从EDP包中读出字符串数据
 * len : 字符串的长度
 */
void readStr(edp_pkt* pkt, char* str, uint16 len);
/*
 * readRemainlen
 * 从EDP包中读出剩余长度
 */
int32 readRemainlen(edp_pkt* pkt);
/*
 * packetConnect：组EDP连接包
 * 首先创建EDP缓存空间，按照EDP协议组EDP连接包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * key：APIKey
 */
edp_pkt *packetConnect(const int8* devid, const int8* key);
/*
 * packetDataSaveTrans：组EDP数据存储转发包
 * 首先创建EDP缓存空间，按照EDP协议组EDP数据存储转发包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * streamId：数据流ID，即数据流名
 * val: 字符串形式的数据值
 */
edp_pkt *packetDataSaveTrans(const int8* destId, const int8* streamId, const int8 *val);

void packetClear(edp_pkt* pkt);
/*
 * isEdpPkt
 * 按照EDP数据格式，判断是否是完整数据包
 */
int16 isEdpPkt(edp_pkt* pkt);
/*
 * edpCommandReqParse
 * 按照EDP命令请求协议，解析数据
 */
int edpCommandReqParse(edp_pkt* pkt, char *id, char *cmd, int32 *rmlen, int32 *id_len, int32 *cmd_len);
/*
 * edpPushDataParse
 * 按照EDP透传数据格式，解析数据
 */
int edpPushDataParse(edp_pkt* pkt, char *srcId, char *data);


#endif // EDP_H


