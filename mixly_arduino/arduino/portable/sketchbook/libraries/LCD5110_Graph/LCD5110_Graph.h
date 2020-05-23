/*
  LCD5110_Graph.h - Arduino/chipKit library support for Nokia 5110 compatible LCDs
  Copyright (C)2015 Rinky-Dink Electronics, Henning Karlsen. All right reserved
  
  Basic functionality of this library are based on the demo-code provided by
  ITead studio. You can find the latest version of the library at
  http://www.RinkyDinkElectronics.com/

  This library has been made to make it easy to use the Nokia 5110 LCD module 
  as a graphics display on an Arduino or a chipKit.

  This library is free software; you can redistribute it and/or
  modify it under the terms of the CC BY-NC-SA 3.0 license.
  Please see the included documents for further information.

  Commercial use of this library requires you to buy a license that
  will allow commercial use. This includes using the library,
  modified or not, as a tool to sell products.

  The license applies to all part of the library including the 
  examples and tools supplied with the library.
*/

#ifndef LCD5110_Graph_h
#define LCD5110_Graph_h

#define LEFT 0
#define RIGHT 9999
#define CENTER 9998

#define LCD_COMMAND 0
#define LCD_DATA 1

// PCD8544 Commandset
// ------------------
// General commands
#define PCD8544_POWERDOWN			0x04
#define PCD8544_ENTRYMODE			0x02
#define PCD8544_EXTENDEDINSTRUCTION	0x01
#define PCD8544_DISPLAYBLANK		0x00
#define PCD8544_DISPLAYNORMAL		0x04
#define PCD8544_DISPLAYALLON		0x01
#define PCD8544_DISPLAYINVERTED		0x05
// Normal instruction set
#define PCD8544_FUNCTIONSET			0x20
#define PCD8544_DISPLAYCONTROL		0x08
#define PCD8544_SETYADDR			0x40
#define PCD8544_SETXADDR			0x80
// Extended instruction set
#define PCD8544_SETTEMP				0x04
#define PCD8544_SETBIAS				0x10
#define PCD8544_SETVOP				0x80
// Display presets
#define LCD_BIAS					0x03	// Range: 0-7 (0x00-0x07)
#define LCD_TEMP					0x02	// Range: 0-3 (0x00-0x03)
#define LCD_CONTRAST				0x46	// Range: 0-127 (0x00-0x7F)

#if defined(__AVR__)
	#include "Arduino.h"
	#include "hardware/avr/HW_AVR_defines.h"
#elif defined(__PIC32MX__)
	#include "WProgram.h"
	#include "hardware/pic32/HW_PIC32_defines.h"
#elif defined(__arm__)
	#include "Arduino.h"
	#include "hardware/arm/HW_ARM_defines.h"
#endif

struct _current_font
{
	uint8_t* font;
	uint8_t x_size;
	uint8_t y_size;
	uint8_t offset;
	uint8_t numchars;
	uint8_t inverted;
};

class LCD5110
{
	public:
		LCD5110(int SCK, int MOSI, int DC, int RST, int CS);
		void InitLCD(int contrast=LCD_CONTRAST);
		void setContrast(int contrast);
		void enableSleep();
		void disableSleep();
		void update();
		void clrScr();
		void fillScr();
		void invert(bool mode);
		void setPixel(uint16_t x, uint16_t y);
		void clrPixel(uint16_t x, uint16_t y);
		void invPixel(uint16_t x, uint16_t y);
		void invertText(bool mode);
		void print(char *st, int x, int y);
		void print(String st, int x, int y);
		void printNumI(long num, int x, int y, int length=0, char filler=' ');
		void printNumF(double num, byte dec, int x, int y, char divider='.', int length=0, char filler=' ');
		void setFont(uint8_t* font);
		void drawBitmap(int x, int y, uint8_t* bitmap, int sx, int sy);
		void drawLine(int x1, int y1, int x2, int y2);
		void clrLine(int x1, int y1, int x2, int y2);
		void drawRect(int x1, int y1, int x2, int y2);
		void clrRect(int x1, int y1, int x2, int y2);
		void drawRoundRect(int x1, int y1, int x2, int y2);
		void clrRoundRect(int x1, int y1, int x2, int y2);
		void drawCircle(int x, int y, int radius);
		void clrCircle(int x, int y, int radius);

	protected:
		regtype			*P_SCK, *P_MOSI, *P_DC, *P_RST, *P_CS;
		regsize			B_SCK, B_MOSI, B_DC, B_RST, B_CS;
		uint8_t			SCK_Pin, RST_Pin;			// Needed for for faster MCUs
		_current_font	cfont;
		uint8_t			scrbuf[504];
		boolean			_sleep;
		int				_contrast;

		void _LCD_Write(unsigned char data, unsigned char mode);
		void _print_char(unsigned char c, int x, int row);
		void _convert_float(char *buf, double num, int width, byte prec);
		void drawHLine(int x, int y, int l);
		void clrHLine(int x, int y, int l);
		void drawVLine(int x, int y, int l);
		void clrVLine(int x, int y, int l);
};

#endif