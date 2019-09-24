/**
  @file read9axis.ino
  @brief This is an Example for the FaBo 9Axis I2C Brick.

   http://fabo.io/202.html

   Released under APACHE LICENSE, VERSION 2.0

   http://www.apache.org/licenses/

  @author FaBo<info@fabo.io>
*/

#include <Wire.h>
#include <FaBo9Axis_MPU9250.h>

FaBo9Axis fabo_9axis;

void setup() {
  Serial.begin(115200);
  Serial.println("RESET");
  Serial.println();

  Serial.println("configuring device.");

  if (fabo_9axis.begin()) {
    Serial.println("configured FaBo 9Axis I2C Brick");
  } else {
    Serial.println("device error");
    while (1);
  }
}

void loop() {
  Serial.print("ax:");
  Serial.println(fabo_9axis.readAccelX());
  Serial.print("ay:");
  Serial.println(fabo_9axis.readAccelY());
  Serial.print("az:");
  Serial.println(fabo_9axis.readAccelZ());
  Serial.print("gx:");
  Serial.println(fabo_9axis.readGyroX());
  Serial.print("gy:");
  Serial.println(fabo_9axis.readGyroY());
  Serial.print("gz:");
  Serial.println(fabo_9axis.readGyroZ());
  Serial.print("mx:");
  Serial.println(fabo_9axis.readMagnetX());
  Serial.print("my:");
  Serial.println(fabo_9axis.readMagnetY());
  Serial.print("mz:");
  Serial.println(fabo_9axis.readMagnetZ());
  delay(1000);
}