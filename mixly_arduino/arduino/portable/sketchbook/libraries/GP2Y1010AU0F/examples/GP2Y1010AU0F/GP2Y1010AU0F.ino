/*
  夏普GP2Y1010AU0F空气质量检测器
  Created by fantasymaker <http://blog.fantasymaker.cn>, Jan 10, 2016.
*/

#include "GP2Y1010AU0F.h"

#define PIN_LED 5
#define PIN_OUTPUT A0

GP2Y1010AU0F GP2Y1010AU0F(PIN_LED, PIN_OUTPUT);

void setup() {
  Serial.begin(115200);
}

void loop() {
  double outputV = GP2Y1010AU0F.getOutputV(); //采样获取输出电压
  double ugm3 = GP2Y1010AU0F.getDustDensity(outputV); //计算灰尘浓度
  double aqi = GP2Y1010AU0F.getAQI(ugm3); //计算aqi
  int gradeInfo = GP2Y1010AU0F.getGradeInfo(aqi); //计算级别
  String grade;
  switch (gradeInfo) {
    case GRADE_PERFECT:
      grade = String("GRADE_PERFECT");
      break;
    case GRADE_GOOD:
      grade = String("GRADE_GOOD");
      break;
    case GRADE_POLLUTED_MILD:
      grade = String("GRADE_POLLUTED_MILD");
      break;
    case GRADE_POLLUTED_MEDIUM:
      grade = String("GRADE_POLLUTED_MEDIUM");
      break;
    case GRADE_POLLUTED_HEAVY:
      grade = String("GRADE_POLLUTED_HEAVY");
      break;
    case GRADE_POLLUTED_SEVERE:
      grade = String("GRADE_POLLUTED_SEVERE");
      break;
  }
  //打印到串口
  Serial.println(String("outputV=") + outputV + "\tug/m3=" + ugm3 + "\tAQI=" + aqi + "\tgrade=" + grade);

  //间隔
  delay(1000);
}