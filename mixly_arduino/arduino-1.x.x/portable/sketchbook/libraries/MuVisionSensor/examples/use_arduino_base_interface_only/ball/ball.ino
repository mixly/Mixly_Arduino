#include <Wire.h>

#define MU_ADDRESS    0x60
#define PROTOCOL_VER  0x03
#define VISION_ID     0x03      // ball

// register define
#define REG_PROTOCOL_VER  0x01
#define REG_LED1_CONF     0x06
#define REG_LED2_CONF     0x07
#define REG_LED_LEVEL     0x08
#define REG_CAMERA_CONF1  0x10
#define REG_FRAME_CNT     0x1F
#define REG_VISION_ID     0x20
#define REG_VISION_CONF1  0x21
#define REG_PARAM_VALUE5  0x29
#define RESULT_NUM        0x34
#define RESULT_DATA1      0x40
#define RESULT_DATA2      0x41
#define RESULT_DATA3      0x42
#define RESULT_DATA4      0x43
#define RESULT_DATA5      0x44
// color
#define MU_COLOR_BLACK                0x01U
#define MU_COLOR_WHITE                0x02U
#define MU_COLOR_RED                  0x03U
#define MU_COLOR_YELLOW               0x04U
#define MU_COLOR_GREEN                0x05U
#define MU_COLOR_CYAN                 0x06U
#define MU_COLOR_BLUE                 0x07U
#define MU_COLOR_PURPLE               0x08U

int i2c_read8(uint8_t reg) {
  Wire.beginTransmission(MU_ADDRESS);
  Wire.write(reg);
  Wire.endTransmission();

  Wire.requestFrom(MU_ADDRESS, 1);
  return Wire.read();
}
void i2c_write8(const uint8_t reg, const uint8_t value) {
  Wire.beginTransmission(MU_ADDRESS);
  Wire.write(reg);
  Wire.write(value);
  Wire.endTransmission();
}

uint8_t reg[][2] = {
    { REG_VISION_ID,      VISION_ID }, // set vision type = vision_detect
    { REG_VISION_CONF1,   0x21 }, // vision begin
};
uint8_t frame_count_last = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Wire.begin();
  delay(500);

  if (i2c_read8(REG_PROTOCOL_VER) == PROTOCOL_VER) {
    Serial.println("device initialized.");
  } else {
    Serial.println("fail to initialize device! Please check protocol version.");
  }
  for (uint32_t i = 0; i < sizeof(reg)/2; ++i) {
    i2c_write8(reg[i][0], reg[i][1]);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  long time_start = millis();
  int frame_count = 0;
  // waiting for update
  do {
    frame_count = i2c_read8(REG_FRAME_CNT);
  } while(frame_count == frame_count_last);
  frame_count_last = frame_count;

  i2c_write8(REG_VISION_ID, VISION_ID);
  // read result
  if (i2c_read8(RESULT_NUM) > 0) {
    Serial.println("ball detected:");
    Serial.print("x = ");
    Serial.println(i2c_read8(RESULT_DATA1));
    Serial.print("y = ");
    Serial.println(i2c_read8(RESULT_DATA2));
    Serial.print("width = ");
    Serial.println(i2c_read8(RESULT_DATA3));
    Serial.print("height = ");
    Serial.println(i2c_read8(RESULT_DATA4));
    Serial.print("label = ");
    switch(i2c_read8(RESULT_DATA5)) {
      case 1:
        Serial.println("Ping-Pong ball");
        break;
      case 2:
        Serial.println("Tennis");
        break;
      default:
        break;
    }
  } else {
    Serial.println("ball undetected.");
  }
  Serial.print("fps = ");
  Serial.println(1000/(millis()-time_start));
  Serial.println();
}





