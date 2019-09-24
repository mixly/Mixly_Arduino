/******************************************************************
 A library for controling a set of 8x8 LEDs with a MAX7219 or
 MAX7221 displays.
 This is a plugin for Adafruit's core graphics library, providing
 basic graphics primitives (points, lines, circles, etc.).
 You need to download and install Adafruit_GFX to use this library.

 Adafruit invests time and resources providing this open
 source code, please support Adafruit and open-source hardware
 by purchasing products from Adafruit!

 Written by Mark Ruys.
 BSD license, check license.txt for more information.
 All text above must be included in any redistribution.
 ******************************************************************/

 #include <Adafruit_GFX.h>
 #include "Max72xxPanel.h"
 #include <SPI.h>

// The opcodes for the MAX7221 and MAX7219
#define OP_NOOP         0
#define OP_DIGIT0       1
#define OP_DIGIT1       2
#define OP_DIGIT2       3
#define OP_DIGIT3       4
#define OP_DIGIT4       5
#define OP_DIGIT5       6
#define OP_DIGIT6       7
#define OP_DIGIT7       8
#define OP_DECODEMODE   9
#define OP_INTENSITY   10
#define OP_SCANLIMIT   11
#define OP_SHUTDOWN    12
#define OP_DISPLAYTEST 15

Max72xxPanel::Max72xxPanel(byte csPin, byte hDisplays, byte vDisplays) : Adafruit_GFX(hDisplays << 3, vDisplays << 3) {

	Max72xxPanel::SPI_CS = csPin;

	byte displays = hDisplays * vDisplays;
	Max72xxPanel::hDisplays = hDisplays;
	Max72xxPanel::bitmapSize = displays << 3;

	Max72xxPanel::bitmap = (byte*)malloc(bitmapSize);
	Max72xxPanel::matrixRotation = (byte*)malloc(displays);
	Max72xxPanel::matrixPosition = (byte*)malloc(displays);

	for ( byte display = 0; display < displays; display++ ) {
		matrixPosition[display] = display;
		matrixRotation[display] = 0;
	}

	SPI.begin();
//SPI.setBitOrder(MSBFIRST);
//SPI.setDataMode(SPI_MODE0);
pinMode(SPI_CS, OUTPUT);

  // Clear the screen
  fillScreen(0);

  // Make sure we are not in test mode
  spiTransfer(OP_DISPLAYTEST, 0);

  // We need the multiplexer to scan all segments
  spiTransfer(OP_SCANLIMIT, 7);

  // We don't want the multiplexer to decode segments for us
  spiTransfer(OP_DECODEMODE, 0);

  // Enable display
  shutdown(false);

  // Set the brightness to a medium value
  setIntensity(7);
}

void Max72xxPanel::setPosition(byte display, byte x, byte y) {
	matrixPosition[x + hDisplays * y] = display;
}

void Max72xxPanel::setRotation(byte display, byte rotation) {
	matrixRotation[display] = rotation;
}

void Max72xxPanel::setRotation(uint8_t rotation) {
	Adafruit_GFX::setRotation(rotation);
}

void Max72xxPanel::shutdown(boolean b) {
	spiTransfer(OP_SHUTDOWN, b ? 0 : 1);
}

void Max72xxPanel::setIntensity(byte intensity) {
	spiTransfer(OP_INTENSITY, intensity);
}

void Max72xxPanel::fillScreen(uint16_t color) {
	memset(bitmap, color ? 0xff : 0, bitmapSize);
}

void Max72xxPanel::drawPixel(int16_t xx, int16_t yy, uint16_t color) {
	// Operating in bytes is faster and takes less code to run. We don't
	// need values above 200, so switch from 16 bit ints to 8 bit unsigned
	// ints (bytes).
	// Keep xx as int16_t so fix 16 panel limit
	int16_t x = xx;
	byte y = yy;
	byte tmp;

	if ( rotation ) {
		// Implement Adafruit's rotation.
		if ( rotation >= 2 ) {										// rotation == 2 || rotation == 3
			x = _width - 1 - x;
		}

		if ( rotation == 1 || rotation == 2 ) {		// rotation == 1 || rotation == 2
			y = _height - 1 - y;
		}

		if ( rotation & 1 ) {     								// rotation == 1 || rotation == 3
			tmp = x; x = y; y = tmp;
		}
	}

	if ( x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT ) {
		// Ignore pixels outside the canvas.
		return;
	}

	// Translate the x, y coordinate according to the layout of the
	// displays. They can be ordered and rotated (0, 90, 180, 270).

	byte display = matrixPosition[(x >> 3) + hDisplays * (y >> 3)];
	x &= 0b111;
	y &= 0b111;

	byte r = matrixRotation[display];
	if ( r >= 2 ) {										   // 180 or 270 degrees
		x = 7 - x;
	}
	if ( r == 1 || r == 2 ) {				     // 90 or 180 degrees
		y = 7 - y;
	}
	if ( r & 1 ) {     								   // 90 or 270 degrees
		tmp = x; x = y; y = tmp;
	}

	byte d = display / hDisplays;
	x += (display - d * hDisplays) << 3; // x += (display % hDisplays) * 8
	y += d << 3;												 // y += (display / hDisplays) * 8

	// Update the color bit in our bitmap buffer.

	byte *ptr = bitmap + x + WIDTH * (y >> 3);
	byte val = 1 << (y & 0b111);

	if ( color ) {
		*ptr |= val;
	}
	else {
		*ptr &= ~val;
	}
}

void Max72xxPanel::write() {
	// Send the bitmap buffer to the displays.

	for ( byte row = OP_DIGIT7; row >= OP_DIGIT0; row-- ) {
		spiTransfer(row);
	}
}

void Max72xxPanel::spiTransfer(byte opcode, byte data) {
	// If opcode > OP_DIGIT7, send the opcode and data to all displays.
	// If opcode <= OP_DIGIT7, display the column with data in our buffer for all displays.
	// We do not support (nor need) to use the OP_NOOP opcode.

	// Enable the line
	digitalWrite(SPI_CS, LOW);

	// Now shift out the data, two bytes per display. The first byte is the opcode,
	// the second byte the data.
	byte end = opcode - OP_DIGIT0;
	byte start = bitmapSize + end;
	do {
		start -= 8;
		SPI.transfer(opcode);
		SPI.transfer(opcode <= OP_DIGIT7 ? bitmap[start] : data);
	}
	while ( start > end );

	// Latch the data onto the display(s)
	digitalWrite(SPI_CS, HIGH);
}
void Max72xxPanel::scrollMessage(String msg,int displayScrollSpeed) {//滚动显示文本
	msg += "";
	int refresh=1;
	for ( int i = 0 ; i < 6 * msg.length() + WIDTH- 2; i++ ) {
		if (refresh == 1)
		i = 0;
		refresh = 0;
		fillScreen(0);
		int letter = i / 6;	
		int x = (WIDTH - 1) - i % 6;
    int y = (HEIGHT- 8) / 2; // center the text vertically
    while ( x + 6 - 1 >= 0 && letter >= 0 ) {
    	if ( letter < msg.length() ) {
    		drawChar(x, y, msg[letter], HIGH, LOW, 1);
    	}
    	letter--;
    	x -= 6;
    }
    write();
    delay(displayScrollSpeed);
}
  //matrix.setCursor(0, 0);
}
void Max72xxPanel::scrollMessage(int num,int displayScrollSpeed) {//滚动显示文本
	String msg = String("") + num;
	msg += "";
	int refresh=1;
	for ( int i = 0 ; i < 6 * msg.length() + WIDTH- 2; i++ ) {
		if (refresh == 1)
		i = 0;
		refresh = 0;
		fillScreen(0);
		int letter = i / 6;	
		int x = (WIDTH - 1) - i % 6;
    int y = (HEIGHT- 8) / 2; // center the text vertically
    while ( x + 6 - 1 >= 0 && letter >= 0 ) {
    	if ( letter < msg.length() ) {
    		drawChar(x, y, msg[letter], HIGH, LOW, 1);
    	}
    	letter--;
    	x -= 6;
    }
 write();
    delay(displayScrollSpeed);
}
  //matrix.setCursor(0, 0);
}
void Max72xxPanel::scrollMessage(float num,int displayScrollSpeed) {//滚动显示文本
	String msg = String("") + num;
	msg += "";
	int refresh=1;
	for ( int i = 0 ; i < 6 * msg.length() + WIDTH- 2; i++ ) {
		if (refresh == 1)
		i = 0;
		refresh = 0;
		fillScreen(0);
		int letter = i / 6;	
		int x = (WIDTH - 1) - i % 6;
    int y = (HEIGHT- 8) / 2; // center the text vertically
    while ( x + 6 - 1 >= 0 && letter >= 0 ) {
    	if ( letter < msg.length() ) {
    		drawChar(x, y, msg[letter], HIGH, LOW, 1);
    	}
    	letter--;
    	x -= 6;
    }
 write();
    delay(displayScrollSpeed);
}
  //matrix.setCursor(0, 0);
}