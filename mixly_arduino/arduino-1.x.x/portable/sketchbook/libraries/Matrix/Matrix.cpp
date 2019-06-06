#include "Matrix.h"

uint8_t const I2C_READ = 1;
uint8_t const I2C_WRITE = 0;
uint8_t const I2C_DELAY_USEC = 4;

Matrix::Matrix(uint8_t sda_port,uint8_t scl_port)
{
  SCL_pin = scl_port;
  SDA_pin = sda_port;
}

void Matrix::setBrightness(uint8_t b) {
  if (b > 15) b = 15;
  IICstart(i2c_addr | I2C_WRITE);
  IICwrite(0xE0 | b);
  IICstop();  
}

void Matrix::blinkRate(uint8_t b) {
  IICstart(i2c_addr | I2C_WRITE);
  if (b > 3) b = 0; // turn off if not sure
  
  IICwrite(HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (b << 1)); 
  IICstop();
}

void Matrix::begin(uint8_t _addr = 0x70) {
	IICbegin(SDA_pin,SCL_pin);  
  constructor(8, 8);
  i2c_addr = _addr;
  i2c_addr <<= 1;
  IICstart(i2c_addr | I2C_WRITE);
  IICwrite(0x21);  // turn on oscillator
  IICstop();
  blinkRate(HT16K33_BLINK_OFF);
  
  setBrightness(15); // max brightness
}

void Matrix::write(void) {
  IICstart(i2c_addr | I2C_WRITE);
  IICwrite((uint8_t)0x00); // start at address $00

  for (uint8_t i=0; i<8; i++) {
    IICwrite(displaybuffer[i] & 0xFF);    
    IICwrite(displaybuffer[i] >> 8);    
  }
  IICstop();  
}

void Matrix::clear(void) {
  for (uint8_t i=0; i<8; i++) {
    displaybuffer[i] = 0;
  }
}
void Matrix::fillScreen(uint16_t color){
    fillRect(0, 0, _width, _height, color);
}
void Matrix::drawPixel(int16_t x, int16_t y, uint16_t color) {
  if ((y < 0) || (y >= 8)) return;
  if ((x < 0) || (x >= 8)) return;

  switch (getRotation()) {
    case 1:
    matrix_swap(x, y);
    x = 8 - x - 1;
    break;
    case 2:
    x = 8 - x - 1;
    y = 8 - y - 1;
    break;
    case 3:
    matrix_swap(x, y);
    y = 8 - y - 1;
    break;
  }

  if (color) {
    displaybuffer[y] |= 1 << x;
  } else {
    displaybuffer[y] &= ~(1 << x) & ~(1 << (x+8));
  }
}

void Matrix::constructor(int16_t w, int16_t h) {
  _width = WIDTH = w;
  _height = HEIGHT = h;

  rotation = 0;    
  cursor_y = cursor_x = 0;
  textsize = 1;
  textcolor = textbgcolor = 0xFFFF;
  wrap = true;
}

// draw a circle outline
void Matrix::drawCircle(int16_t x0, int16_t y0, int16_t r, 
 uint16_t color) {
  int16_t f = 1 - r;
  int16_t ddF_x = 1;
  int16_t ddF_y = -2 * r;
  int16_t x = 0;
  int16_t y = r;

  drawPixel(x0, y0+r, color);
  drawPixel(x0, y0-r, color);
  drawPixel(x0+r, y0, color);
  drawPixel(x0-r, y0, color);

  while (x<y) {
    if (f >= 0) {
      y--;
      ddF_y += 2;
      f += ddF_y;
    }
    x++;
    ddF_x += 2;
    f += ddF_x;

    drawPixel(x0 + x, y0 + y, color);
    drawPixel(x0 - x, y0 + y, color);
    drawPixel(x0 + x, y0 - y, color);
    drawPixel(x0 - x, y0 - y, color);
    drawPixel(x0 + y, y0 + x, color);
    drawPixel(x0 - y, y0 + x, color);
    drawPixel(x0 + y, y0 - x, color);
    drawPixel(x0 - y, y0 - x, color);
    
  }
}

void Matrix::drawCircleHelper( int16_t x0, int16_t y0,
 int16_t r, uint8_t cornername, uint16_t color) {
  int16_t f     = 1 - r;
  int16_t ddF_x = 1;
  int16_t ddF_y = -2 * r;
  int16_t x     = 0;
  int16_t y     = r;

  while (x<y) {
    if (f >= 0) {
      y--;
      ddF_y += 2;
      f     += ddF_y;
    }
    x++;
    ddF_x += 2;
    f     += ddF_x;
    if (cornername & 0x4) {
      drawPixel(x0 + x, y0 + y, color);
      drawPixel(x0 + y, y0 + x, color);
    } 
    if (cornername & 0x2) {
      drawPixel(x0 + x, y0 - y, color);
      drawPixel(x0 + y, y0 - x, color);
    }
    if (cornername & 0x8) {
      drawPixel(x0 - y, y0 + x, color);
      drawPixel(x0 - x, y0 + y, color);
    }
    if (cornername & 0x1) {
      drawPixel(x0 - y, y0 - x, color);
      drawPixel(x0 - x, y0 - y, color);
    }
  }
}

void Matrix::fillCircle(int16_t x0, int16_t y0, int16_t r, 
 uint16_t color) {
  drawFastVLine(x0, y0-r, 2*r+1, color);
  fillCircleHelper(x0, y0, r, 3, 0, color);
}

// used to do circles and roundrects!
void Matrix::fillCircleHelper(int16_t x0, int16_t y0, int16_t r,
  uint8_t cornername, int16_t delta, uint16_t color) {

  int16_t f     = 1 - r;
  int16_t ddF_x = 1;
  int16_t ddF_y = -2 * r;
  int16_t x     = 0;
  int16_t y     = r;

  while (x<y) {
    if (f >= 0) {
      y--;
      ddF_y += 2;
      f     += ddF_y;
    }
    x++;
    ddF_x += 2;
    f     += ddF_x;

    if (cornername & 0x1) {
      drawFastVLine(x0+x, y0-y, 2*y+1+delta, color);
      drawFastVLine(x0+y, y0-x, 2*x+1+delta, color);
    }
    if (cornername & 0x2) {
      drawFastVLine(x0-x, y0-y, 2*y+1+delta, color);
      drawFastVLine(x0-y, y0-x, 2*x+1+delta, color);
    }
  }
}

// bresenham's algorithm - thx wikpedia
void Matrix::drawLine(int16_t x0, int16_t y0, 
 int16_t x1, int16_t y1, 
 uint16_t color) {
  int16_t steep = abs(y1 - y0) > abs(x1 - x0);
  if (steep) {
    matrix_swap(x0, y0);
    matrix_swap(x1, y1);
  }

  if (x0 > x1) {
    matrix_swap(x0, x1);
    matrix_swap(y0, y1);
  }

  int16_t dx, dy;
  dx = x1 - x0;
  dy = abs(y1 - y0);

  int16_t err = dx / 2;
  int16_t ystep;

  if (y0 < y1) {
    ystep = 1;
  } else {
    ystep = -1;
  }

  for (; x0<=x1; x0++) {
    if (steep) {
      drawPixel(y0, x0, color);
    } else {
      drawPixel(x0, y0, color);
    }
    err -= dy;
    if (err < 0) {
      y0 += ystep;
      err += dx;
    }
  }
}

// draw a rectangle
void Matrix::drawRect(int16_t x, int16_t y, 
 int16_t w, int16_t h, 
 uint16_t color) {
  drawFastHLine(x, y, w, color);
  drawFastHLine(x, y+h-1, w, color);
  drawFastVLine(x, y, h, color);
  drawFastVLine(x+w-1, y, h, color);
}

void Matrix::drawFastVLine(int16_t x, int16_t y, 
 int16_t h, uint16_t color) {
  // stupidest version - update in subclasses if desired!
  drawLine(x, y, x, y+h-1, color);
}

void Matrix::drawFastHLine(int16_t x, int16_t y, 
 int16_t w, uint16_t color) {
  // stupidest version - update in subclasses if desired!
  drawLine(x, y, x+w-1, y, color);
}

void Matrix::fillRect(int16_t x, int16_t y, int16_t w, int16_t h, 
 uint16_t color) {
  // stupidest version - update in subclasses if desired!
  for (int16_t i=x; i<x+w; i++) {
    drawFastVLine(i, y, h, color); 
  }
}

void Matrix::write(uint16_t color) {
  fillRect(0, 0, _width, _height, color);
}

// draw a rounded rectangle!
void Matrix::drawRoundRect(int16_t x, int16_t y, int16_t w,
  int16_t h, int16_t r, uint16_t color) {
  // smarter version
  drawFastHLine(x+r  , y    , w-2*r, color); // Top
  drawFastHLine(x+r  , y+h-1, w-2*r, color); // Bottom
  drawFastVLine(  x    , y+r  , h-2*r, color); // Left
  drawFastVLine(  x+w-1, y+r  , h-2*r, color); // Right
  // draw four corners
  drawCircleHelper(x+r    , y+r    , r, 1, color);
  drawCircleHelper(x+w-r-1, y+r    , r, 2, color);
  drawCircleHelper(x+w-r-1, y+h-r-1, r, 4, color);
  drawCircleHelper(x+r    , y+h-r-1, r, 8, color);
}

// fill a rounded rectangle!
void Matrix::fillRoundRect(int16_t x, int16_t y, int16_t w,
 int16_t h, int16_t r, uint16_t color) {
  // smarter version
  fillRect(x+r, y, w-2*r, h, color);

  // draw four corners
  fillCircleHelper(x+w-r-1, y+r, r, 1, h-2*r-1, color);
  fillCircleHelper(x+r    , y+r, r, 2, h-2*r-1, color);
}

// draw a triangle!
void Matrix::drawTriangle(int16_t x0, int16_t y0,
  int16_t x1, int16_t y1, 
  int16_t x2, int16_t y2, uint16_t color) {
  drawLine(x0, y0, x1, y1, color);
  drawLine(x1, y1, x2, y2, color);
  drawLine(x2, y2, x0, y0, color);
}

// fill a triangle!
void Matrix::fillTriangle ( int16_t x0, int16_t y0,
  int16_t x1, int16_t y1, 
  int16_t x2, int16_t y2, uint16_t color) {

  int16_t a, b, y, last;

  // Sort coordinates by Y order (y2 >= y1 >= y0)
  if (y0 > y1) {
    matrix_swap(y0, y1); matrix_swap(x0, x1);
  }
  if (y1 > y2) {
    matrix_swap(y2, y1); matrix_swap(x2, x1);
  }
  if (y0 > y1) {
    matrix_swap(y0, y1); matrix_swap(x0, x1);
  }

  if(y0 == y2) { // Handle awkward all-on-same-line case as its own thing
    a = b = x0;
    if(x1 < a)      a = x1;
    else if(x1 > b) b = x1;
    if(x2 < a)      a = x2;
    else if(x2 > b) b = x2;
    drawFastHLine(a, y0, b-a+1, color);
    return;
  }

  int16_t
  dx01 = x1 - x0,
  dy01 = y1 - y0,
  dx02 = x2 - x0,
  dy02 = y2 - y0,
  dx12 = x2 - x1,
  dy12 = y2 - y1,
  sa   = 0,
  sb   = 0;

  // For upper part of triangle, find scanline crossings for segments
  // 0-1 and 0-2.  If y1=y2 (flat-bottomed triangle), the scanline y1
  // is included here (and second loop will be skipped, avoiding a /0
  // error there), otherwise scanline y1 is skipped here and handled
  // in the second loop...which also avoids a /0 error here if y0=y1
  // (flat-topped triangle).
  if(y1 == y2) last = y1;   // Include y1 scanline
  else         last = y1-1; // Skip it

  for(y=y0; y<=last; y++) {
    a   = x0 + sa / dy01;
    b   = x0 + sb / dy02;
    sa += dx01;
    sb += dx02;
    /* longhand:
    a = x0 + (x1 - x0) * (y - y0) / (y1 - y0);
    b = x0 + (x2 - x0) * (y - y0) / (y2 - y0);
    */
    if(a > b) matrix_swap(a,b);
    drawFastHLine(a, y, b-a+1, color);
  }

  // For lower part of triangle, find scanline crossings for segments
  // 0-2 and 1-2.  This loop is skipped if y1=y2.
  sa = dx12 * (y - y1);
  sb = dx02 * (y - y0);
  for(; y<=y2; y++) {
    a   = x1 + sa / dy12;
    b   = x0 + sb / dy02;
    sa += dx12;
    sb += dx02;
    /* longhand:
    a = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
    b = x0 + (x2 - x0) * (y - y0) / (y2 - y0);
    */
    if(a > b) matrix_swap(a,b);
    drawFastHLine(a, y, b-a+1, color);
  }
}
void Matrix::scrollMessage(String s,int displayScrollSpeed){
	int a = s.length();
  setTextSize(1);
	setTextWrap(false);  // we dont want text to wrap so it scrolls nicely
	setTextColor(MATRIX_LED_ON);
	for (int8_t x=7; x>=-a*6; x--) {
		clear();
		setCursor(x,0);
		print(s);
		write();
		delay(displayScrollSpeed);
  }
}

void Matrix::scrollMessage(int num,int displayScrollSpeed){
  String s = String("") + num;
  s += "";
  int a = s.length();
  setTextSize(1);
  setTextWrap(false);  // we dont want text to wrap so it scrolls nicely
  setTextColor(MATRIX_LED_ON);
  for (int8_t x=7; x>=-a*6; x--) {
    clear();
    setCursor(x,0);
    print(s);
    write();
    delay(displayScrollSpeed);
  }
}
void Matrix::scrollMessage(float num,int displayScrollSpeed){
  String s = String("") + num;
  s += "";
  int a = s.length();
  setTextSize(1);
  setTextWrap(false);  // we dont want text to wrap so it scrolls nicely
  setTextColor(MATRIX_LED_ON);

  for (int8_t x=7; x>=-a*6; x--) {
    clear();
    setCursor(x,0);
    print(s);
    write();
    delay(displayScrollSpeed);
  }
}
size_t Matrix::write(uint8_t c) {
  if (c == '\n') {
    cursor_y += textsize*8;
    cursor_x = 0;
  } else if (c == '\r') {
    // skip em
  } else {
    drawChar(cursor_x, cursor_y, c, textcolor, textbgcolor, textsize);
    cursor_x += textsize*6;
    if (wrap && (cursor_x > (_width - textsize*6))) {
      cursor_y += textsize*8;
      cursor_x = 0;
    }
  }
#if ARDUINO >= 100
  return 1;
#endif
}

// draw a character
void Matrix::drawChar(int16_t x, int16_t y, unsigned char c,
 uint16_t color, uint16_t bg, uint8_t size) {

  if((x >= _width)            || // Clip right
     (y >= _height)           || // Clip bottom
     ((x + 5 * size - 1) < 0) || // Clip left
     ((y + 8 * size - 1) < 0))   // Clip top
    return;

  for (int8_t i=0; i<6; i++ ) {
    uint8_t line;
    if (i == 5) 
      line = 0x0;
    else 
      line = pgm_read_byte(font+(c*5)+i);
    for (int8_t j = 7; j>=0; j--) {
      if (line & 0x1) {
        if (size == 1) // default size
          drawPixel(x+i, y+j, color);
        else {  // big size
          fillRect(x+(i*size), y+(j*size), size, size, color);
        } 
      } else if (bg != color) {
        if (size == 1) // default size
          drawPixel(x+i, y+j, bg);
        else {  // big size
          fillRect(x+i*size, y+j*size, size, size, bg);
        } 	
      }
      line >>= 1;
    }
  }
}

void Matrix::setCursor(int16_t x, int16_t y) {
  cursor_x = x;
  cursor_y = y;
}


void Matrix::setTextSize(uint8_t s) {
  textsize = (s > 0) ? s : 1;
}

void Matrix::setTextColor(uint16_t c) {
  textcolor = c;
  textbgcolor = c; 
  // for 'transparent' background, we'll set the bg 
  // to the same as fg instead of using a flag
}

void Matrix::setTextColor(uint16_t c, uint16_t b) {
 textcolor = c;
 textbgcolor = b; 
}

void Matrix::setTextWrap(boolean w) {
  wrap = w;
}

uint8_t Matrix::getRotation(void) {
  rotation %= 4;
  return rotation;
}

void Matrix::setRotation(uint8_t x) {
  x %= 4;  // cant be higher than 3
  rotation = x;
  switch (x) {
    case 0:
    case 2:
    _width = WIDTH;
    _height = HEIGHT;
    break;
    case 1:
    case 3:
    _width = HEIGHT;
    _height = WIDTH;
    break;
  }
}

void Matrix::invertDisplay(boolean i) {
  // do nothing, can be subclassed
}

// return the size of the display which depends on the rotation!
int16_t Matrix::width(void) { 
  return _width; 
}

int16_t Matrix::height(void) { 
  return _height; 
}


void Matrix::IICbegin(uint8_t sdapin,uint8_t sclpin)
{
	SDA_pin = sdapin;
	pinMode(SDA_pin,OUTPUT);
	digitalWrite(SDA_pin,HIGH);
	SCL_pin = sclpin;
	pinMode(SCL_pin,OUTPUT);
	digitalWrite(SCL_pin,HIGH);
}
bool Matrix::IICstart(uint8_t addr)
{
	digitalWrite(SDA_pin, LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SCL_pin, LOW);
	return IICwrite(addr);
}
bool Matrix::IICrestart(uint8_t addr)
{
	digitalWrite(SDA_pin, HIGH);
	digitalWrite(SCL_pin, HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	return IICstart(addr);
}
void Matrix::IICstop()
{
	digitalWrite(SDA_pin,LOW);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SCL_pin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
	digitalWrite(SDA_pin,HIGH);
	delayMicroseconds(I2C_DELAY_USEC);
}
uint8_t Matrix::IICread(uint8_t last) {
  uint8_t b = 0;
  // make sure pull-up enabled
  digitalWrite(SDA_pin, HIGH);
  pinMode(SDA_pin, INPUT);
  // read byte
  for (uint8_t i = 0; i < 8; i++) {
    // don't change this loop unless you verify the change with a scope
    b <<= 1;
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(SCL_pin, HIGH);
    if (digitalRead(SDA_pin)) {b |= 1;}
	//else b &= 0;
    digitalWrite(SCL_pin, LOW);
  }
  // send Ack or Nak
  pinMode(SDA_pin, OUTPUT);
  digitalWrite(SDA_pin, last);
  digitalWrite(SCL_pin, HIGH);
  delayMicroseconds(I2C_DELAY_USEC);
  digitalWrite(SCL_pin, LOW);
  digitalWrite(SDA_pin, LOW);
  return b;
}

//------------------------------------------------------------------------------
/**
 * Write a byte.
 *
 * \param[in] data The byte to send.
 *
 * \return The value true, 1, if the slave returned an Ack or false for Nak.
 */
bool Matrix::IICwrite(uint8_t data) {
  // write byte
  for (uint8_t m = 0X80; m != 0; m >>= 1) {
    // don't change this loop unless you verify the change with a scope
    digitalWrite(SDA_pin, m & data);
    digitalWrite(SCL_pin, HIGH);
    delayMicroseconds(I2C_DELAY_USEC);
    digitalWrite(SCL_pin, LOW);
  }
  // get Ack or Nak
  pinMode(SDA_pin, INPUT);
  // enable pullup
  digitalWrite(SDA_pin, HIGH);
  digitalWrite(SCL_pin, HIGH);
  uint8_t rtn = digitalRead(SDA_pin);
  digitalWrite(SCL_pin, LOW);
  pinMode(SDA_pin, OUTPUT);
  digitalWrite(SDA_pin, LOW);
  return rtn == 0;
}







