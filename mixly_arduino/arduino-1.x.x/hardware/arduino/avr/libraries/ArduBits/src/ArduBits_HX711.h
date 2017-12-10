#ifndef _ArduBits_HX711_h_
#define _ArduBits_HX711_h_
#include "Arduino.h"
#include "ArduBits.h"


class Hx711
{
private:
	int DOUT;//定义数据引脚
	int SCK;//定义时钟引脚

	float scale;//定义比例系数
	long offset;//定义补偿值
public:
	Hx711(int IO_DOUT,int IO_SCK);//构造函数
	void setScale(float IO_scale);//设置比例系数
	void setOffset(long IO_offset);//设置补偿值

	long getValue();//采集一次ADC值
	long getAverageValue(char IO_times);//采集ADC平均值
	float getWeight(char IO_times);//得出重量值
};

#endif