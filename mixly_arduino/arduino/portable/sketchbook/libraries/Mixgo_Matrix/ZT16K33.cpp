#include <ZT16K33.h>
#include <Wire.h>

uint8_t const I2C_READ = 1;			/*IIC读*/
uint8_t const I2C_WRITE = 0;		/*IIC*/
uint8_t const I2C_DELAY_USEC = 4;	/*IIC延时微妙*/

/*
*函数名称：	 HT16K33(uint8_t sda_port,uint8_t scl_port)
*函数功能：	 类构造函数
*函数参数：	 sda_port scl_port --IIC接口
*函数返回值：void
*/
HT16K33::HT16K33()
{

}

/*
*函数名称：	 setBrightness(uint8_t b)
*函数功能：	 设置亮度
*函数参数：	 b--亮度值
*函数返回值：void
*/
void HT16K33::setBrightness(uint8_t b) {
  if (b > 15) b = 15;
  Wire.beginTransmission((uint8_t)i2c_addr);
  Wire.write(0xE0 | b);
  Wire.endTransmission();
}

/*
*函数名称：	 blinkRate(uint8_t b)
*函数功能：	 闪烁频率
*函数参数：	 b--速度值
*函数返回值：void
*/
void HT16K33::blinkRate(uint8_t b) {
  Wire.beginTransmission(i2c_addr);		
  if (b > 3) b = 0; // turn off if not sure
  
  Wire.write(HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (b << 1)); 
  Wire.endTransmission();
}

/*
*函数名称：	 begin(uint8_t _addr = 0x70)
*函数功能：	 地址初始化
*函数参数：	 _addr -- HT的地址
*函数返回值：void
*/
void HT16K33::begin(uint8_t _addr = 0x70) {
  Wire.begin();
  constructor(16, 8);							/*设置宽度和高度*/
  i2c_addr = _addr;
//  i2c_addr <<= 1;								/*左移一位，留给读写位*/
  Wire.beginTransmission(i2c_addr);				/*IIC发送第一个字节包含有地址信息和读写操作标志*/
  Wire.write(0x21);								/*turn on oscillator*/
  Wire.endTransmission();
  blinkRate(HT16K33_BLINK_OFF);					/*闪烁频率*/
  setBrightness(1);								/*max brightness 15*/
}

/*
*函数名称：	 writeDisplay(void)
*函数功能：	 将数据进行显示
*函数参数：	 无
*函数返回值：void
*/
void HT16K33::writeDisplay(void) {
  Wire.beginTransmission(i2c_addr);
  Wire.write((uint8_t)0x00); // start at address $00

  for (uint8_t i=0; i<8; i++) {
    Wire.write(displaybuffer[i] & 0xFF);    
    Wire.write(displaybuffer[i] >> 8);    
  }
  Wire.endTransmission();  
}

/*
*函数名称：	 clear(void)
*函数功能：	 清空显示
*函数参数：	 无
*函数返回值：void
*/
void HT16K33::clear(void) {
  for (uint8_t i=0; i<8; i++) {
    displaybuffer[i] = 0;
  }
}

/*
*函数名称：	 drawPixel(int16_t x, int16_t y, uint16_t color)
*函数功能：	 单点显示 16 X 8
*函数参数：	 无
*函数返回值：void
*/
void HT16K33::drawPixel(int16_t x, int16_t y, uint16_t color) {
  if ((y < 0) || (y >= 8)) return;
  if ((x < 0) || (x >= 16)) return;

  switch (2) {
  case 1:
    swap(x, y);
    x = 16 - x - 1;
    break;
  case 2:
//    x = 16 - x - 1;
    y = 8 - y - 1;
    break;
  case 3:
    swap(x, y);
    y = 8 - y - 1;
    break;
  }

  if (color) {
    displaybuffer[y] |= 1 << x;
  } else {
    displaybuffer[y] &= ~(1 << x) & ~(1 << (x+16));
  }
}

/*
*函数名称：	 constructor(int16_t w, int16_t h)
*函数功能：	 类内部变量初始化
*函数参数：	 int16_t w, int16_t h 宽度和高度
*函数返回值：void
*/
void HT16K33::constructor(int16_t w, int16_t h) {
  _width = WIDTH = w;
  _height = HEIGHT = h;

  rotation = 0;    
  cursor_y = cursor_x = 0;
  textsize = 1;
  textcolor = textbgcolor = 0xFFFF;
  wrap = true;
}

/*
*函数名称：	 drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color)
*函数功能：	 draw a circle outline
*函数参数：	 int16_t x0, int16_t y0, int16_t r, uint16_t color -- X,Y中心点 R半径
*函数返回值：void
*/
void HT16K33::drawCircle(int16_t x0, int16_t y0, int16_t r, 
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

/*
*函数名称：	 drawCircleHelper( int16_t x0, int16_t y0,int16_t r, uint8_t cornername, uint16_t color)
*函数功能：	 drawCircleHelper 选择画圆的四条边
*函数参数：	 cornername == 1 画第一条边 == 2 画第二条边 == 4画第三条边 == 8画第四条边 
*函数返回值：void
*/
void HT16K33::drawCircleHelper( int16_t x0, int16_t y0,
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

/*
*函数名称：	 fillCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color)
*函数功能：	 画一个满○
*函数参数：	 int16_t x0, int16_t y0, int16_t r, uint16_t color -- X,Y中心点 R半径
*函数返回值：void
*/
void HT16K33::fillCircle(int16_t x0, int16_t y0, int16_t r, 
			      uint16_t color) {
  drawFastVLine(x0, y0-r, 2*r+1, color);
  fillCircleHelper(x0, y0, r, 3, 0, color);
}

/*
*函数名称：	 fillCircle(int16_t x0, int16_t y0, int16_t r, uint8_t cornername,uint16_t color)
*函数功能：	 画一个满○ 
*函数参数：	 cornername ==1右半圆 == 2左半圆 delta 线长度
*函数返回值：void
*/
void HT16K33::fillCircleHelper(int16_t x0, int16_t y0, int16_t r,
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

/*
*函数名称：	 drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color)
*函数功能：	 划线 --两点确定一条直线
*函数参数：	 int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t colo 直线的两点 bresenham's algorithm - thx wikpedia
*函数返回值：void
*/
void HT16K33::drawLine(int16_t x0, int16_t y0, 
			    int16_t x1, int16_t y1, 
			    uint16_t color) {
  int16_t steep = abs(y1 - y0) > abs(x1 - x0);
  if (steep) {
    swap(x0, y0);
    swap(x1, y1);
  }

  if (x0 > x1) {
    swap(x0, x1);
    swap(y0, y1);
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

/*
*函数名称：	 drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color)
*函数功能：	 画一个矩形
*函数参数：	 矩形的起点-宽和高
*函数返回值：void
*/
void HT16K33::drawRect(int16_t x, int16_t y, 
			    int16_t w, int16_t h, 
			    uint16_t color) {
  drawFastHLine(x, y, w, color);
  drawFastHLine(x, y+h-1, w, color);
  drawFastVLine(x, y, h, color);
  drawFastVLine(x+w-1, y, h, color);
}

/*
*函数名称：	 drawFastVLine(int16_t x, int16_t y, int16_t h, uint16_t color)
*函数功能：	 快速垂直方向划线
*函数参数：	 x,y起始点h高度
*函数返回值：void
*/
void HT16K33::drawFastVLine(int16_t x, int16_t y, 
				 int16_t h, uint16_t color) {
  // stupidest version - update in subclasses if desired!
  drawLine(x, y, x, y+h-1, color);
}

/*
*函数名称：	 drawFastHLine(int16_t x, int16_t y, int16_t w, uint16_t color)
*函数功能：	 快速水平方向划线
*函数参数：	 x,y起始点w宽度
*函数返回值：void
*/
void HT16K33::drawFastHLine(int16_t x, int16_t y, 
				 int16_t w, uint16_t color) {
  // stupidest version - update in subclasses if desired!
  drawLine(x, y, x+w-1, y, color);
}

/*
*函数名称：	 illRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color)
*函数功能：	 画满矩形
*函数参数：	 x,y起始点w宽度h高度
*函数返回值：void
*/
void HT16K33::fillRect(int16_t x, int16_t y, int16_t w, int16_t h, 
			    uint16_t color) {
  // stupidest version - update in subclasses if desired!
  for (int16_t i=x; i<x+w; i++) {
    drawFastVLine(i, y, h, color);						/*X变化h高度固定*/
  }
}

/*
*函数名称：	 fillScreen(uint16_t color)
*函数功能：	 画屏填充
*函数参数：	 color 颜色
*函数返回值：void
*/
void HT16K33::fillScreen(uint16_t color) {
  fillRect(0, 0, _width, _height, color);
}


/*
*函数名称：	 fillScreen(uint16_t color)
*函数功能：	 画一个椭圆
*函数参数：	 color 颜色
*函数返回值：void
*/
void HT16K33::drawRoundRect(int16_t x, int16_t y, int16_t w,
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

/*
*函数名称：	 fillRoundRect(int16_t x, int16_t y, int16_t w,int16_t h, int16_t r, uint16_t color)
*函数功能：	 画一个满椭圆
*函数参数：	 color 颜色 r椭圆的弧度
*函数返回值：void
*/
void HT16K33::fillRoundRect(int16_t x, int16_t y, int16_t w,
				 int16_t h, int16_t r, uint16_t color) {
  // smarter version
  fillRect(x+r, y, w-2*r, h, color);

  // draw four corners
  fillCircleHelper(x+w-r-1, y+r, r, 1, h-2*r-1, color);
  fillCircleHelper(x+r    , y+r, r, 2, h-2*r-1, color);
}

/*
*函数名称：	 fillRoundRect(int16_t x, int16_t y, int16_t w,int16_t h, int16_t r, uint16_t color)
*函数功能：	 画一个三角形
*函数参数：	 三角形由三个点确定 画三条线
*函数返回值：void
*/
void HT16K33::drawTriangle(int16_t x0, int16_t y0,
				int16_t x1, int16_t y1, 
				int16_t x2, int16_t y2, uint16_t color) {
  drawLine(x0, y0, x1, y1, color);
  drawLine(x1, y1, x2, y2, color);
  drawLine(x2, y2, x0, y0, color);
}

/*
*函数名称：	 fillRoundRect(int16_t x, int16_t y, int16_t w,int16_t h, int16_t r, uint16_t color)
*函数功能：	 画一个满三角形
*函数参数：	 三角形由三个点确定
*函数返回值：void
*/
void HT16K33::fillTriangle ( int16_t x0, int16_t y0,
				  int16_t x1, int16_t y1, 
				  int16_t x2, int16_t y2, uint16_t color) {

  int16_t a, b, y, last;

  // Sort coordinates by Y order (y2 >= y1 >= y0)
  if (y0 > y1) {
    swap(y0, y1); swap(x0, x1);
  }
  if (y1 > y2) {
    swap(y2, y1); swap(x2, x1);
  }
  if (y0 > y1) {
    swap(y0, y1); swap(x0, x1);
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
    if(a > b) swap(a,b);
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
    if(a > b) swap(a,b);
    drawFastHLine(a, y, b-a+1, color);
  }
}

/*
*函数名称：	 drawStr(String s)
*函数功能：	 写一个字符串
*函数参数：	 S
*函数返回值：void
*/
void HT16K33::drawStr(String s){
	int a = s.length();
    setTextSize(1);
	setTextWrap(false);  // we dont want text to wrap so it scrolls nicely
	setTextColor(LED_ON);
	for (int8_t x=15; x>=-a*6; x--) {
		clear();
		setCursor(x,0);
		print(s);
		writeDisplay();
		delay(100);
    }
}

/*
*函数名称：	 write(uint8_t c)
*函数功能：	 写一个字节
*函数参数：	 C
*函数返回值：size_t
*/
size_t HT16K33::write(uint8_t c) {
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


/*
*函数名称：	 drawChar(int16_t x, int16_t y, unsigned char c,uint16_t color, uint16_t bg, uint8_t size)
*函数功能：	 draw a character
*函数参数：	 C
*函数返回值：void
*/
void HT16K33::drawChar(int16_t x, int16_t y, unsigned char c,
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

/*
*函数名称：	 setCursor(int16_t x, int16_t y)
*函数功能：	 设置
*函数参数：	 x,y
*函数返回值：void
*/
void HT16K33::setCursor(int16_t x, int16_t y) {
  cursor_x = x;
  cursor_y = y;
}


void HT16K33::setTextSize(uint8_t s) {
  textsize = (s > 0) ? s : 1;
}

void HT16K33::setTextColor(uint16_t c) {
  textcolor = c;
  textbgcolor = c; 
  // for 'transparent' background, we'll set the bg 
  // to the same as fg instead of using a flag
}

 void HT16K33::setTextColor(uint16_t c, uint16_t b) {
   textcolor = c;
   textbgcolor = b; 
 }

void HT16K33::setTextWrap(boolean w) {
  wrap = w;
}

uint8_t HT16K33::getRotation(void) {
  rotation %= 4;
  return rotation;
}

void HT16K33::setRotation(uint8_t x) {
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

void HT16K33::invertDisplay(boolean i) {
  // do nothing, can be subclassed
}

// return the size of the display which depends on the rotation!
int16_t HT16K33::width(void) { 
  return _width; 
}
 
int16_t HT16K33::height(void) { 
  return _height; 
}










