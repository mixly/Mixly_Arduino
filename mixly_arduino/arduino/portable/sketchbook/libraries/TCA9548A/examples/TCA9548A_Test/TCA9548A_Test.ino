#include <Wire.h>
#include "TCA9548A.h"

TCA9548A mux;

void setup() {
    mux.init();
    mux.disable();
}

void loop() {

    for (uint8_t i = 0; i < 8; i++) {
        mux.set_port(i);

        // i2c communication
    }
} 