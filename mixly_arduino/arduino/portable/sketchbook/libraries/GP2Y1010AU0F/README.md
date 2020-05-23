# 夏普GP2Y1010AU0F灰尘传感器Arduino库


## 安装库文件
1. 将库目录放到`Arduino安装目录/libraries/`下
2. 重启Arduino IDE即可


## 调用库

- 加载头文件

```
#include "GP2Y1010AU0F.h"
```

- 初始化库, 并设置引脚

```
#define PIN_LED 5      //定义LED供电引脚
#define PIN_OUTPUT A0  //定义模拟量输出引脚

GP2Y1010AU0F GP2Y1010AU0F(PIN_LED, PIN_OUTPUT);  //初始化
```

- 对空气采样并获取输出电压

```
  double outputV = GP2Y1010AU0F.getOutputV(); //采样获取输出电压
```

- 根据输入电压计算灰尘浓度(ug/m3)

```
  double ugm3 = GP2Y1010AU0F.getDustDensity(outputV); //计算灰尘浓度
```

- 根据灰尘浓度计算空气质量指数aqi(是将所有粒度的灰尘都按照PM2.5的指标计算的, 并不准确)

```
  double aqi = GP2Y1010AU0F.getAQI(ugm3); //计算aqi
```

- 根据空气质量指数计算空气质量级别
质量级别常量如下:
	- `GRADE_PERFECT`: 优
	- `GRADE_GOOD`: 良
	- `GRADE_POLLUTED_MILD`: 轻度污染
	- `GRADE_POLLUTED_MEDIUM`: 中度污染
	- `GRADE_POLLUTED_HEAVY`: 重度污染
	- `GRADE_POLLUTED_SEVERE`: 严重污染

```
  int gradeInfo = GP2Y1010AU0F.getGradeInfo(aqi); //计算级别
```