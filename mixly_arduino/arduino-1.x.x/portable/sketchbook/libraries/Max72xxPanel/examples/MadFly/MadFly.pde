#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Max72xxPanel.h>

int pinCS = 10; // Attach CS to this pin, DIN to MOSI and CLK to SCK (cf http://arduino.cc/en/Reference/SPI )
int numberOfHorizontalDisplays = 1;
int numberOfVerticalDisplays = 1;

Max72xxPanel matrix = Max72xxPanel(pinCS, numberOfHorizontalDisplays, numberOfVerticalDisplays);

int pinRandom = A0;

int wait = 20; // In milliseconds

void setup() {
  matrix.setIntensity(4); // Set brightness between 0 and 15

// Adjust to your own needs
//  matrix.setPosition(0, 0, 0); // The first display is at <0, 0>
//  matrix.setPosition(1, 1, 0); // The second display is at <1, 0>
//  matrix.setPosition(2, 2, 0); // The third display is at <2, 0>
//  matrix.setPosition(3, 3, 0); // And the last display is at <3, 0>
//  ...
//  matrix.setRotation(0, 2);    // The first display is position upside down
//  matrix.setRotation(3, 2);    // The same hold for the last display

  randomSeed(analogRead(pinRandom)); // Initialize random generator
}

int x = numberOfHorizontalDisplays * 8 / 2;
int y = numberOfVerticalDisplays * 8 / 2;
int xNext, yNext;

void loop() {

  matrix.drawPixel(x, y, HIGH);
  matrix.write(); // Send bitmap to display

  delay(wait);

  matrix.drawPixel(x, y, LOW); // Erase the old position of our dot

  do {
    switch ( random(4) ) {
      case 0: xNext = constrain(x + 1, 0, matrix.width() - 1); yNext = y; break;
      case 1: xNext = constrain(x - 1, 0, matrix.width() - 1); yNext = y; break;
      case 2: yNext = constrain(y + 1, 0, matrix.height() - 1); xNext = x; break;
      case 3: yNext = constrain(y - 1, 0, matrix.height() - 1); xNext = x; break;
    }
  }
  while ( x == xNext && y == yNext ); // Repeat until we find a new coordinate

  x = xNext;
  y = yNext;
}
