/*
GP2Y1010AU0F.cpp - Library for GP2Y1010AU0F air quality detecting.
Created by fantasymaker, Jan 10, 2016.
*/

#include "GP2Y1010AU0F.h"
#include "Arduino.h" //此句声明了Arduino的标准常量和变量，必须要

/* 定义时间 */
const int DELAY_BEFORE_SAMPLING = 280; //采样前等待时间
const int DELAY_AFTER_SAMPLING = 40; //采样后等待时间
const int DELAY_LED_OFF = 9680; //间隔时间

int _ledPin;
int _outputPin;

/**
   初始化
*/
GP2Y1010AU0F::GP2Y1010AU0F(int ledPin, int outputPin){
	pinMode(ledPin, OUTPUT);
	pinMode(outputPin, INPUT);
	_ledPin = ledPin;
	_outputPin = outputPin;
}

/**
   读取输出电压
*/
double GP2Y1010AU0F::getOutputV() {
  digitalWrite(_ledPin, LOW);
  delayMicroseconds(DELAY_BEFORE_SAMPLING);
  double analogOutput = analogRead(_outputPin);
  delayMicroseconds(DELAY_AFTER_SAMPLING);
  digitalWrite(_ledPin, HIGH);
  delayMicroseconds(DELAY_LED_OFF);
  //Arduino模拟量读取值的范围为0~1023,以下换算为0~5v
  double outputV = analogOutput / 1024 * 5;
  return outputV;
}

/**
   根据输出电压计算灰尘密度
*/
double GP2Y1010AU0F::getDustDensity(double outputV) {
  //去除非线性的部分, 只取0.9~3.4v的线性范围, 对应0~500ug/m3
  if(outputV < 0.9){
  	outputV = 0.9;
  }else if(outputV > 3.4){
  	outputV = 3.4;
  }
  //输出电压和灰尘密度换算公式: ug/m3 = (V - 0.9) / 5 * 1000
  double ugm3 = (outputV - 0.9) / 5 * 1000;
  return ugm3;
}

/**
   根据灰尘密度计算AQI
   环境空气质量指数（AQI）技术规定（试行）](http://kjs.mep.gov.cn/hjbhbz/bzwb/dqhjbh/jcgfffbz/201203/t20120302_224166.htm
*/
double GP2Y1010AU0F::getAQI(double ugm3) {
  double aqiL = 0;
  double aqiH = 0;
  double bpL = 0;
  double bpH = 0;
  double aqi = 0;
  //根据pm2.5和aqi对应关系分别计算aqi
  if (ugm3 >= 0 && ugm3 <= 35) {
    aqiL = 0;
    aqiH = 50;
    bpL = 0;
    bpH = 35;
  } else if (ugm3 > 35 && ugm3 <= 75) {
    aqiL = 50;
    aqiH = 100;
    bpL = 35;
    bpH = 75;
  } else if (ugm3 > 75 && ugm3 <= 115) {
    aqiL = 100;
    aqiH = 150;
    bpL = 75;
    bpH = 115;
  } else if (ugm3 > 115 && ugm3 <= 150) {
    aqiL = 150;
    aqiH = 200;
    bpL = 115;
    bpH = 150;
  } else if (ugm3 > 150 && ugm3 <= 250) {
    aqiL = 200;
    aqiH = 300;
    bpL = 150;
    bpH = 250;
  } else if (ugm3 > 250 && ugm3 <= 350) {
    aqiL = 300;
    aqiH = 400;
    bpL = 250;
    bpH = 350;
  } else if (ugm3 > 350) {
    aqiL = 400;
    aqiH = 500;
    bpL = 350;
    bpH = 500;
  }
  //公式aqi = (aqiH - aqiL) / (bpH - bpL) * (desity - bpL) + aqiL;
  aqi = (aqiH - aqiL) / (bpH - bpL) * (ugm3 - bpL) + aqiL;
  return aqi;
}

/**
   根据aqi获取级别描述
*/
int GP2Y1010AU0F::getGradeInfo(double aqi) {
  int gradeInfo;
  if (aqi >= 0 && aqi <= 50) {
    gradeInfo = GRADE_PERFECT;
  } else if (aqi > 50 && aqi <= 100) {
    gradeInfo = GRADE_GOOD;
  } else if (aqi > 100 && aqi <= 150) {
    gradeInfo = GRADE_POLLUTED_MILD;
  } else if (aqi > 150 && aqi <= 200) {
    gradeInfo = GRADE_POLLUTED_MEDIUM;
  } else if (aqi > 200 && aqi <= 300) {
    gradeInfo = GRADE_POLLUTED_HEAVY;
  } else if (aqi > 300 && aqi <= 500) {
    gradeInfo = GRADE_POLLUTED_SEVERE;
  }
  return gradeInfo;
}
