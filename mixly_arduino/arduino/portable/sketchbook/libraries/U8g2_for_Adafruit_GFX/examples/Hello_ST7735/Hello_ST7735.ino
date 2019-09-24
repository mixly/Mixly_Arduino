#include <Adafruit_GFX.h>    // Core graphics library
#include <Adafruit_ST7735.h> // Hardware-specific library for ST7735
#include <SPI.h>
#include <U8g2_for_Adafruit_GFX.h>
#define TFT_MOSI P14 //SDA,GPIO19
#define TFT_SCLK P13 //SCL,GPIO18
#define TFT_CS   P16  //GPIO 5
#define TFT_DC   P15   //GPIO21
#define TFT_RST  -1  // 
Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC, TFT_MOSI,TFT_SCLK,TFT_RST);
U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;
void setup(void) {
  tft.initR(INITR_GREENTAB);      // Init ST7735S chip, black tab
  tft.setRotation(0);
  tft.fillScreen(ST77XX_WHITE);
  u8g2_for_adafruit_gfx.begin(tft);
}

void loop() {
  u8g2_for_adafruit_gfx.setFont(u8g2_font_8x13_m_symbols);  // select u8g2 font from here: https://github.com/olikraus/u8g2/wiki/fntlistall
  //u8g2_for_adafruit_gfx.setFontDirection(0);            // left to right (this is default)
  u8g2_for_adafruit_gfx.setForegroundColor(0x0000FF);      // apply Adafruit GFX color
  u8g2_for_adafruit_gfx.setFontMode(1);                 // use u8g2 none transparent mode
  u8g2_for_adafruit_gfx.setCursor(20, 20);               // start writing at this position
  u8g2_for_adafruit_gfx.print("AAAbb1222");
  // u8g2_for_adafruit_gfx.drawLine(1,1,15,20);
  delay(1000);
  tft.drawLine(0, 0, 60, tft.height() - 1, 0x00FF00);
}
