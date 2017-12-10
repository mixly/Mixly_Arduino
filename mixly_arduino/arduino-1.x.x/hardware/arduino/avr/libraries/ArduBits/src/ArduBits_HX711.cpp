#include "ArduBits_HX711.h"

#include "Arduino.h"

//int DOUT;//定义数据引脚
//int SCK;//定义时钟引脚

//float scale;//定义比例系数
//long offset;//定义补偿值
//int times;//定义采集次数

Hx711::Hx711(int IO_DOUT,int IO_SCK)//构造函数
{
	DOUT = IO_DOUT;
	SCK = IO_SCK;
	pinMode(SCK, OUTPUT);//设置IO口工作方式
	pinMode(DOUT, INPUT);

}

void Hx711::setScale(float IO_scale)//设置比例系数
{
	scale = IO_scale;
}

void Hx711::setOffset(long IO_offset)//设置补偿值
{
	offset = IO_offset;
}

long Hx711::getValue()//采集一次ADC值
{
	unsigned long Count;
	unsigned char i;
	digitalWrite(SCK,LOW);
	Count = 0;
	while(digitalRead(DOUT) == 1);//低电平时数据可以输出
	for(i=0;i<24;i++)//循环读取数据
	{
		digitalWrite(SCK,HIGH);
		Count = Count<<1;
		digitalWrite(SCK,LOW);
		if(digitalRead(DOUT) == 1) Count++;//最低位置1
	}
	digitalWrite(SCK,HIGH);
	Count = Count^0x800000;//最高位置0
	digitalWrite(SCK,LOW);//128增益
	return Count;
}

long Hx711::getAverageValue(char IO_times)//采集ADC平均值
{
	long sum=0;
	char i;
	for(i=0;i<IO_times;i++)
	{
		sum += getValue();
	}
	return sum/IO_times;

}

float Hx711::getWeight(char IO_times)//得出重量值
{
	long temp;
	temp = getAverageValue(IO_times) - offset;
	return (float)temp/scale;
}

