/* IRremoteESP32: IRsendDemo - demonstrates sending IR codes with IRsend.
 *
 * Version 1.0 June 2017
 * Based on Ken Shirriff's IrsendDemo Version 0.1 July, 2009,
 * Copyright 2009 Ken Shirriff, http://arcfn.com
 *
 * An IR LED with resistor and NPN transistor must be connected
 *
 * Suggested circuit:
 *     https://github.com/markszabo/IRremoteESP8266/wiki#ir-sending
 *
 * Common mistakes & tips:
 *   * Don't just connect the IR LED directly to the pin, it won't
 *     have enough current to drive the IR LED effectively.
 *   * Make sure you have the IR LED polarity correct.
 *     See: https://learn.sparkfun.com/tutorials/polarity/diode-and-led-polarity
 *   * Typical digital camera/phones can be used to see if the IR LED is flashed.
 *     Replace the IR LED with a normal LED if you don't have a digital camera
 *     when debugging.
 *   * Avoid using the following pins unless you really know what you are doing:
 *     * Pin 0/D3: Can interfere with the boot/program mode & support circuits.
 *     * Pin 1/TX/TXD0: Any serial transmissions from the ESP8266 will interfere.
 *     * Pin 3/RX/RXD0: Any serial transmissions to the ESP8266 will interfere.
 *  
 */

#include "IRsend.h"


#define ONEMARK 400    //Nr. of usecs for the led to be pulsed for a '1' bit.
#define ONESPACE 400   //Nr. of usecs for the led to be fully off for a '1' bit.
#define ZEROMARK 400   //Nr. of usecs for the led to be pulsed for a '0' bit.
#define ZEROSPACE 1200 //Nr. of usecs for the led to be fully off for a '0' bit.
#define IRLED 26

IRsend irsend(IRLED);  // an IR led is connected to the IRLED gpio

void setup() {
  irsend.begin();
  Serial.begin(115200);
}

void loop() {
  irsend.enableIROut(38000, 45);
  //send header
  irsend.mark(3200);
  irsend.space(1600);
  //send command
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xCF, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0x00, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xA0, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xC0, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xE0, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xC5, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xE6, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0xDF, 8, 1);
  irsend.sendData(ONEMARK, ONESPACE, ZEROMARK, ZEROSPACE, 0x7F, 8, 1);

  delay(2000);
}
