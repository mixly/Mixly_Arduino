// *** Hardwarespecific defines ***
#define cbi(reg, bitmask) (*(reg + 1)) = bitmask
#define sbi(reg, bitmask) (*(reg + 2)) = bitmask
#define pulseClock digitalWrite(SCK_Pin, LOW); digitalWrite(SCK_Pin, HIGH)
#define resetLCD sbi(P_DC, B_DC); sbi(P_MOSI, B_MOSI); sbi(P_SCK, B_SCK); sbi(P_CS, B_CS); cbi(P_RST, B_RST); delay(10); sbi(P_RST, B_RST)

#define fontbyte(x) cfont.font[x]  
#define bitmapbyte(x) bitmap[x]

#define PROGMEM
#define regtype volatile uint32_t
#define regsize volatile uint16_t
#define bitmapdatatype unsigned char*
