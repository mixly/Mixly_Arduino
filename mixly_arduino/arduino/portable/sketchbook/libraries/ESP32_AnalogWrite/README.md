# About
This library provides an analogWrite function polyfill for ESP32 Arduino framework by wrapping the [ledc](https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-ledc.c) library.

Licensed under the MIT license.

# Usage
The library will do all the timer setup and channel selection work behind the scene so you don't have to worry about that.

## Fade Example
```cpp
#include <Arduino.h>
#include <analogWrite.h>

int step = 1;
int brightness = 0;

void setup() {
}

void loop() {
  brightness += brightStep;
  analogWrite(LED_BUILTIN, brightness);

  if ( brightness == 0 || brightness == 255 ) {
    brightStep = -brightStep;
  }
  
  delay(10);
}
```

## Default Value Range
Call the `analogWrite` function like in standard arduino framework:
```cpp
analogWrite(LED_BUILTIN, 255); // value range 0-255 so 255 = 100%
```

## Custom Value Range
You can also set the maximum value as third parameter:
```cpp
analogWrite(LED_BUILTIN, 255, 1023); // value range 0-1023 so 255 = 25%
```

## Timer Resolution
The default timer resolution is set to 13 bits in all the 16 channels, if you want to change that, use the `analogWriteResolution` function:
```cpp
analogWriteResolution(10); // set resolution to 10 bits for all pins
analogWriteResolution(LED_BUILTIN, 10); // set resolution to 10 bits for LED pin
```

## PWM Frequency
The default PWM frequency is set to 5000 Hz in all the 16 channels, if you want to change that, use the `analogWriteFrequency` function:
```cpp
analogWriteFrequency(10000); // set frequency to 10 KHz for all pins
analogWriteFrequency(LED_BUILTIN, 10000); // set frequency to 10 KHz for LED pin
```

Please note that both timer resolution and PWM frequency should be calculated to get the expected results, if frequency is not set correctly, the output PWM signal wont be as expected, read more about [Supported Range of Frequency and Duty Resolution](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/peripherals/ledc.html#ledc-api-supported-range-frequency-duty-resolution) in the official Espressif documentation website.
