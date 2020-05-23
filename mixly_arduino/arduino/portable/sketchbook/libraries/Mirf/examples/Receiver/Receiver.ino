/*
nRF24L01 Arduino Receiver接收端

Ansifa
2015/3/7

引脚接法：
nRF24L01   Arduino UNO
VCC <-> 3.3V
GND <-> GND
CE  <-> D9
CSN <-> D10
MOSI<-> D11
MISO<-> D12
SCK <-> D13
IRQ <-> 不接
*/

#include <SPI.h>
#include <Mirf.h>
#include <nRF24L01.h>
#include <MirfHardwareSpiDriver.h>

    //定义一个变量adata存储最终结果,oldadata存储旧结果，防止相同结果刷屏。
    unsigned int adata = 0, oldadata = 0;

void setup()
{
    Serial.begin(9600);

    //---------初始化部分，不可随时修改---------
    Mirf.cePin = 9;     //设置CE引脚为D9
    Mirf.csnPin = 10;   //设置CE引脚为D10
    Mirf.spi = &MirfHardwareSpi;
    Mirf.init();  //初始化nRF24L01

    //---------配置部分，可以随时修改---------
    //设置接收标识符"Rev01"
    Mirf.setRADDR((byte *)"Rec01");
    //设置一次收发的字节数，这里发一个整数，
    //写sizeof(unsigned int)，实际等于2字节
    Mirf.payload = sizeof(unsigned int);
    //发送通道，可以填0~128，收发必须一致。
    Mirf.channel = 3;
    Mirf.config();

    //注意一个Arduino写Sender.ino，另一个写Receiver.ino。
    //这里用来辨别写入了Receiver.ino程序
    Serial.println("I'm Receiver...");
}

void loop()
{
    //定义一个暂存数组，大小为Mirf.payload。
    byte data[Mirf.payload];
    if(Mirf.dataReady())    //等待接收数据准备好
    {
        Mirf.getData(data);    //接收数据到data数组
        //data[1]<左移8位与data[0]并，重组数据。
        adata = (unsigned int)((data[1] << 8) | data[0]);

        //与上一次结果比较，避免相同结果刷屏,降低串口流量
        if(adata != oldadata)
        {
            oldadata = adata; //本次结果作为历史结果。
            //Serial.print输出数据
            Serial.print("A0=");
            Serial.println(adata);
            //也可以输出双字节数据
            //Serial.write(data[1]);
            //Serial.write(data[0]);
        }

    }
}
