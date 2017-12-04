/**************************************************************************
  Copyright (C), 2014- ,  申议科技
  File name:      TM1637.cpp
  Author:       Version: v1.0      Date: 2014.10.8
  Description: 基于TM1637的数码管驱动
		驱动使用：1、调用set()设置地址、数据、显示命令，因为数据、地址通常在display()中设置，所以这里般只需设置显示命令
				  2、调用init()，设定好时钟和数据引脚并清屏
				  3、调用display()显示数据，有两种方法显示数据：
				    a.把要显示的数据各个位放入一个4位数组，然后调用：display(int8_t DispData[])。
					  如果要显示小数点，在调用display(int8_t DispData[])前先调用point(boolean PointFlag)point(boolean PointFlag)。
					b.调用display(uint8_t BitAddr,int8_t DispData)，单独显示一个位，如果要显示小数点则调用此函数前调用。
				  3、需要的时候，调用clearDisplay(void)清屏。
				  4、			 
  Others:         
  Function List:  
    1. init() ：初始化
	2. display()
	3. point()
	
	4. writeByte()
	5. start(void)
	6 stop(void)
	7 clearDisplay()
	8 set()
	9 coding()
  History:  
                  
    1. Date: 2014.10.8       Author: jiangzhaohui
       Modification: 代码创建
    2. ...
****************************************************************************/
#include "TM1637.h"

const int8_t TubeTab[] = {0x3f,0x06,0x5b,0x4f,
                          0x66,0x6d,0x7d,0x07,
                          0x7f,0x6f,0x77,0x7c,
                          0x39,0x5e,0x79,0x71};//0~9,A,b,C,d,E,F                        
TM1637::TM1637()
{
}

void TM1637::init(uint8_t Clk, uint8_t Data)
{
  Clkpin = Clk;
  Datapin = Data;
  pinMode(Clkpin,OUTPUT);
  pinMode(Datapin,OUTPUT);
  clearDisplay();																																																																																																																																																																																																																																																														
}

/***************************************************************************
  Function:       writeByte()
  Description:    发送字节数据
  Calls:          
  Called By:      
  Input:      int8_t wr_data    
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::writeByte(int8_t wr_data)
{
  uint8_t i,count1;  
  /* 写一个字节，cklpin低电平时传输数据：clkpin拉低电平，然后datapin送0：低电平 或
     1：高电平，然后clkpin拉高，完成1bit传输 */
  for(i=0;i<8;i++)        //sent 8bit data
  {
    digitalWrite(Clkpin,LOW);      
    if(wr_data & 0x01)digitalWrite(Datapin,HIGH);//LSB first
    else digitalWrite(Datapin,LOW);
    wr_data >>= 1;      
    digitalWrite(Clkpin,HIGH);    
  }  
  /*应答阶段*/
  digitalWrite(Clkpin,LOW); //wait for the ACK
  digitalWrite(Datapin,HIGH);
  digitalWrite(Clkpin,HIGH);     
  pinMode(Datapin,INPUT);
  while(digitalRead(Datapin))    
  { 
    count1 +=1;
    if(count1 == 200)//
    {
     pinMode(Datapin,OUTPUT);
     digitalWrite(Datapin,LOW);
     count1 =0;
    }
    pinMode(Datapin,INPUT);
  }
  pinMode(Datapin,OUTPUT);
  
}

/***************************************************************************
  Function:       start(void)
  Description:    启动时序
				启动时序：clk拉高，data拉高，data拉低，clk拉低，
  Calls:          
  Called By:      
  Input:      
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::start(void)
{
  digitalWrite(Clkpin,HIGH);//send start signal to TM1637
  digitalWrite(Datapin,HIGH); 
  digitalWrite(Datapin,LOW); 
  digitalWrite(Clkpin,LOW); 
} 

/***************************************************************************
  Function:       stop(void)
  Description:    停止时序
				停止时序：clk拉低，data拉低，clk拉高，data拉高
  Calls:          
  Called By:      
  Input:      
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::stop(void)
{
  digitalWrite(Clkpin,LOW);
  digitalWrite(Datapin,LOW);
  digitalWrite(Clkpin,HIGH);
  digitalWrite(Datapin,HIGH); 
}

/***************************************************************************
  Function:       display()
  Description:    地址自动加1模式传显示数据，地址从0开始，送4个数据，对应4个数码管
			时序参阅：写SRAM 数据地址自动加1 模式
			说明：如果调用本函数显示小数点，硬件需保证只有一个小数点能显示。否则会点亮每位上的小数点。
  Calls:          
  Called By:      
  Input:   int8_t DispData[]：需要写入的数据数组   
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::display(int8_t DispData[])
{
  int8_t SegData[4];
  uint8_t i;
  for(i = 0;i < 4;i ++)
  {
    SegData[i] = DispData[i];
  }
  coding(SegData);  //把输入的数据转化成7段编码
  start();          //start signal sent to TM1637 from MCU
  writeByte(ADDR_AUTO);//
  stop();           //
  start();          //
  writeByte(Cmd_SetAddr);//
  for(i=0;i < 4;i ++)
  {
    writeByte(SegData[i]);        //
  }
  stop();           //
  start();          //
  writeByte(Cmd_DispCtrl);//
  stop();           //
}


/***************************************************************************
  Function:       display()
  Description:    对任意位数码管写数据
			时序参阅：写SRAM 数据固定地址模式
  Calls:          
  Called By:      
  Input:   int8_t DispData[]：需要写入的数据   
           uint8_t BitAddr：要写入的地址，地址可选值：0、1、2、3    
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::display(uint8_t BitAddr,int8_t DispData)
{
  int8_t SegData;
  SegData = coding(DispData);
  start();          //start signal sent to TM1637 from MCU
  writeByte(ADDR_FIXED);//数据命令设置：固定地址模式 ADDR_FIXED = B1000100
  stop();           //
  start();          //
  writeByte(BitAddr|0xc0);//地址命令设设置，设置地址
  writeByte(SegData);     //
  stop();                 //
  start();                //
  writeByte(Cmd_DispCtrl);//显示控制
  stop();           //
}

/***************************************************************************
  Function:       clearDisplay(void)
  Description:    清屏
			
  Calls:          
  Called By:      
  Input:  
                 
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::clearDisplay(void)
{
  display(0x00,0x7f);
  display(0x01,0x7f);
  display(0x02,0x7f);
  display(0x03,0x7f);  
}

/***************************************************************************
  Function:       set(uint8_t brightness,uint8_t SetData,uint8_t SetAddr)
  Description:    数据、地址、显示设置指令
  Calls:          
  Called By:      
  Input:     
              
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::set(uint8_t brightness,uint8_t SetData,uint8_t SetAddr)
{
  Cmd_SetData = SetData;
  Cmd_SetAddr = SetAddr;
  Cmd_DispCtrl = 0x88 + brightness;//Set the brightness and it takes effect the next time it displays.
}

/***************************************************************************
  Function:       point()
  Description:    是否显示时钟点
			时钟点显示信息保存在每个数据字节的bit8。
  Calls:          
  Called By:      
  Input:   boolean PointFlag ：0：不显示 1：显示  
              
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::point(boolean PointFlag)
{
  _PointFlag = PointFlag;
}

/***************************************************************************
  Function:       coding()
  Description:    对输入数据编码,适用只有一位能显示小数点的4位数码管
			
  Calls:          
  Called By:      
  Input:   int8_t DispData[] ：需要编码的数据数组
              
  Output:         
  Return:         
  Others:        
***************************************************************************/
void TM1637::coding(int8_t DispData[])
{
  uint8_t PointData;
  if(_PointFlag == POINT_ON)PointData = 0x80;
  else PointData = 0; 
  for(uint8_t i = 0;i < 4;i ++)
  {
    if(DispData[i] == 0x7f)DispData[i] = 0x00;
    else DispData[i] = TubeTab[DispData[i]] + PointData; //显示数据转化成代码段,
  }
}

/***************************************************************************
  Function:       coding()
  Description:    对输入数据编码，对需要显示小数点的位设小数点
			
  Calls:          
  Called By:      
  Input:   int8_t DispData ：需要编码的数据
              
  Output:         
  Return:         
  Others:        
***************************************************************************/
int8_t TM1637::coding(int8_t DispData)
{
  uint8_t PointData;
  if(_PointFlag == POINT_ON)PointData = 0x80;
  else PointData = 0; 
  if(DispData == 0x7f) DispData = 0x00 + PointData;//The bit digital tube off
  else DispData = TubeTab[DispData] + PointData; //显示数据转化成代码段
  return DispData;
}
