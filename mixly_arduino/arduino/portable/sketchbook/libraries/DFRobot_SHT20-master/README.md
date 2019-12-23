# DFRobot_SHT20 Library for Arduino
Provides an Arduino library for SHT20 Humidity And Temperature Sensor
## Table of Contents

* [Summary](#summary)
* [Methods](#methods)
* [History](#history)
* [Credits](#credits)
<snippet>
<content>

## Summary

The library is used to Use the SHT20 Sensor to obtain humidity and temperature.

## Methods

```C++

/*
 * @brief Init SHT20 Sensor
 */
void initSHT20(void);

/*
 * @brief Check SHT20 Sensor
 */
void checkSHT20(void);

/*
 * @brief Read humidity
 *
 * @return The value of humidity
 */
float readHumidity(void);

/*
 * @breif Read Temperature
 *
 * @return The value of temperature
 */
float readTemperature(void);

```

## History

- data 2017-9-12
- version V1.0

## Credits

- author [Zhangjiawei  <jiawei.zhang@dfrobot.com>]