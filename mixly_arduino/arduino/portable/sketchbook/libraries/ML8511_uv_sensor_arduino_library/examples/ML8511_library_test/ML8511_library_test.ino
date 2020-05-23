/*
  ML8511_library_test.ino
  Emanuele Signoretta, 2017
*/
#include <ML8511.h>

#define UVOUT  A0 // define the pin attached to the ML8511 output
#define REF_3V3  A1 //define the 3.3 reference pin

double uvIntensity;
double outputVoltage;


ML8511 uv(UVOUT, REF_3V3); //create the ML8511's uv object

void setup() {
  Serial.begin(115200); // begin the serial communication
  Serial.print("ML8511 uv sensor library test. \n \n");
  Serial.print("Emanuele Signoretta. 2017 \n \n");
  Serial.print("Starting sensor. ");

  while (!uv.begin()) { //wait until the sensor is ready
    Serial.print(".");
    delay(500);
  }
  Serial.println("Sensor started!");
}

void loop() {
  outputVoltage = uv.getoutputVoltage(); // get the output voltage from the sensor
  uvIntensity = uv.getuvIntensity(); // get the UV intensity from the sensor


  //print the data on the serial port
  Serial.print("Output voltage: ");
  Serial.print(outputVoltage);
  Serial.print(" v ");
  Serial.print("UV intensity: ");
  Serial.print(uvIntensity);
  Serial.println(" mW/cm^2.");
  delay (1000);
}
