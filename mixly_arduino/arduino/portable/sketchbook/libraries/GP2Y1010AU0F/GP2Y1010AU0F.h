/*
GP2Y1010AU0F.h - Library for GP2Y1010AU0F air quality detecting.
Created by fantasymaker, Jan 10, 2016.
*/

#ifndef GP2Y1010AU0F_h
#define GP2Y1010AU0F_h

#include "Arduino.h" //此句声明了Arduino的标准常量和变量，必须要

/* 定义污染级别 */
#define GRADE_PERFECT 0 //优
#define GRADE_GOOD 1 //良
#define GRADE_POLLUTED_MILD 2 //轻度污染
#define GRADE_POLLUTED_MEDIUM 3 //中度污染
#define GRADE_POLLUTED_HEAVY 4 //重度污染
#define GRADE_POLLUTED_SEVERE 5 //严重污染

class GP2Y1010AU0F{
	public:
		GP2Y1010AU0F(int ledPin, int outputPin);
		double getOutputV();
		double getDustDensity(double outputV);
		double getAQI(double ugm3);
		int getGradeInfo(double aqi);
	private:
		int _ledPin;
		int _outputPin;
};

#endif
