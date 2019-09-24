/*
 * Hx711.cpp
 *
 *  Created on: Oct 31, 2012
 *      Author: agu
 */

#include "Hx711.h"

Hx711::Hx711(int IO_DOUT,int IO_SCK)
{
	DOUT = IO_DOUT;
	SCK = IO_SCK;
	pinMode(SCK, OUTPUT);
	pinMode(DOUT, INPUT);
}

void Hx711::setScale(float IO_scale)
{
	scale = IO_scale;
}

void Hx711::setOffset(long IO_offset)
{
	offset = IO_offset;
}

long Hx711::getValue()
{
	unsigned long Count;
	unsigned char i;
	digitalWrite(SCK,LOW);
	Count = 0;
	while(digitalRead(DOUT) == 1);
	for(i=0;i<24;i++)
	{
		digitalWrite(SCK,HIGH);
		Count = Count<<1;
		digitalWrite(SCK,LOW);
		if(digitalRead(DOUT) == 1) Count++;
	}
	digitalWrite(SCK,HIGH);
	Count = Count^0x800000;
	digitalWrite(SCK,LOW);
	return Count;
}

long Hx711::getAverageValue(char IO_times)
{
	long sum=0;
	char i;
	for(i=0;i<IO_times;i++)
	{
		sum += getValue();
	}
	return sum/IO_times;
}

float Hx711::getWeight(char IO_times)
{
	long temp;
	temp = getAverageValue(IO_times) - offset;
	return (float)temp/scale;
}

