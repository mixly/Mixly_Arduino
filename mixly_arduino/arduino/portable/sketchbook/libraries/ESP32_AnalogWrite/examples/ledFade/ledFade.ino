#include <Arduino.h>
#include <analogWrite.h>

int brightStep = 1;
int brightness = 0;

void setup() {
  // Set resolution for a specific pin
  analogWriteResolution(LED_BUILTIN, 12);
}

void loop() {
  brightness += brightStep;
  if ( brightness == 0 || brightness == 255 ) {
    brightStep = -brightStep;
  }

  analogWrite(LED_BUILTIN, brightness);

  delay(10);
}