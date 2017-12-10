#include "ArduBits.h"

ADXL345 accel;

void setup() {
    Wire.begin();
    Serial.begin(38400);
    accel.init_ADXL345();


}

void loop() {

   Serial.print("accel:\t");
    Serial.print(accel.X_angle()); Serial.print("\t");
    Serial.print(accel.Y_angle()); Serial.print("\t");
    Serial.println();

}
