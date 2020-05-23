// *** Hardwarespecific defines ***
#define cbi(reg, bitmask) *reg &= ~bitmask
#define sbi(reg, bitmask) *reg |= bitmask
#define pulseClock cbi(P_SCK, B_SCK); asm ("nop"); sbi(P_SCK, B_SCK)
#define resetLCD sbi(P_DC, B_DC); sbi(P_MOSI, B_MOSI); sbi(P_SCK, B_SCK); sbi(P_CS, B_CS); digitalWrite(RST_Pin, LOW); digitalWrite(RST_Pin, HIGH)

#define fontbyte(x) cfont.font[x]  
#define bitmapbyte(x) bitmap[x]

#define regtype volatile uint32_t
#define regsize volatile uint32_t
#define bitmapdatatype unsigned char*
