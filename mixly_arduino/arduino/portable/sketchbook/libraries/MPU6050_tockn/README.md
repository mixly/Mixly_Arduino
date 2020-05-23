# MPU6050_tockn
Arduino library for easy communicating with the MPU6050
## Usage
You can see [example sketch.](https://github.com/Tockn/MPU6050_tockn/tree/master/examples)  
  
If you want to get data of MPU6050, you must execute `update()` method before get method.  
`update()` will get all data of MPU6050, and calculating angle by accelerometer, gyroscope and complementary filter.  

### Complementary filter
`update()` method calculate angle by accelerometer and gyroscope using complementary filter.  
Those two coefficients determined by constructor.  
Default coefficient of accelerometer is 0.02, gyroscope is 0.98.  
`filtered_angle = (0.02 * accel) + (0.98 * gyro)`  
#### example
If you want to set 0.1 to accelerometer coefficient and 0.9 to gyroscope coefficient, your code is  
```MPU6050 mpu6050(Wire, 0.1, 0.9);```  


### Auto calibration
If you use `calcGyroOffsets()` in `setup()`, it will calculate calibration of the gyroscope, and the value of the gyroscope will calibrated.  
⚠DO NOT MOVE MPU6050 during calculating.⚠  
```
#include <MPU6050_tockn>
#include <Wire.h>

MPU6050 mpu6050(Wire);

void setup(){
  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets();
}

```

If you use `calcGyroOffsets(true)` in `setup()`, you can see state of calculating calibration in serial monitor.  
```
#include <MPU6050_tockn>
#include <Wire.h>

MPU6050 mpu6050(Wire);

void setup(){
  Serial.begin(9600);
  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);
}
```
Serial monitor:
```
Calculate gyro offsets
DO NOT MOVE MPU6050.....
Done!
X : 1.45
Y : 1.23
Z : -1.32
Program will start after 3 seconds
```  
  
If you know offsets of gyroscope, you can set them by `setGyroOffsets()`, and you don't have to execute `calcGyroOffsets()`, so you can launch program quickly.
#### example
```
#include <MPU6050_tockn>
#include <Wire.h>

MPU6050 mpu6050(Wire);

void setup(){
  Serial.begin(9600);
  Wire.begin();
  mpu6050.begin();
  mpu6050.setGyroOffsets(1.45, 1.23, -1.32);
}
```
## Licence
MIT
## Author

[tockn](https://github.com/tockn)
