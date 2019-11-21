'use strict';

goog.provide('Blockly.Arduino.Handbit');

goog.require('Blockly.Arduino');

Blockly.Arduino.oled_init = function () {
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['var_declare_U8G2'] = 'U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['setup_u8g2.begin'] = "u8g2.begin();";
  var code = '';
  return code;
};

Blockly.Arduino.oled_clear = function () {
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['var_declare_U8G2'] = 'U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  var code = "u8g2.clearDisplay();";
  return code;
};

Blockly.Arduino.oled_drawPixel = function () {
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['var_declare_U8G2'] = 'U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
  var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
  var code = "";
  code += 'u8g2.drawPixel(' + pos_x + ',';
  code += pos_y + ');\n';
  return code;
};

Blockly.Arduino.oled_page = function () {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  branch = branch.replace(/(^\s*)|(\s*$)/g, "");
  if (branch) {
    var code = "u8g2.firstPage();\ndo\n{\n" + branch + "\n}\nwhile (u8g2.nextPage());\n";
    return code;
  }
};

Blockly.Arduino.oled_showBitmap = function () {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
  var width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
  data_name = data_name.replace(/\"/g, "");
  var code = "";
  code = 'u8g2.drawXBM(' + start_x + ', ';
  code += start_y + ', ';
  code += width + ', ';
  code += height + ', ' + data_name + ');\n';
  return code;

};

Blockly.Arduino.oled_define_bitmap_data = function () {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_declare' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
  return '';
};

Blockly.Arduino.oled_drawLine = function () {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
  var end_x = Blockly.Arduino.valueToCode(this, 'END_X') || '0';
  var end_y = Blockly.Arduino.valueToCode(this, 'END_Y') || '0';
  var code = "";
  code = 'u8g2.drawLine(' + start_x + ',';
  code += start_y + ',';
  code += end_x + ',';
  code += end_y + ');\n';
  return code;
};

Blockly.Arduino.oled_draw_Str_Line = function () {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
  var length = Blockly.Arduino.valueToCode(this, 'LENGTH') || '0';
  var TYPE = this.getFieldValue('TYPE');
  var code = "";
  code = "u8g2.draw" + TYPE + "Line(" + start_x + ',';
  code += start_y + ',';
  code += length + ');\n';
  return code;
};

Blockly.Arduino.oled_drawTriangle = function () {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X') || '0';
  var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y') || '0';
  var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X') || '0';
  var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y') || '0';
  var code = "";
  code = 'u8g2.drawTriangle(' + D0_x + ',';
  code += D0_y + ',';
  code += D1_x + ',';
  code += D1_y + ',';
  code += D2_x + ',';
  code += D2_y + ');\n';
  return code;
};

Blockly.Arduino.oled_drawFrame = function () {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
  code = 'u8g2.' + type + '(' + D0_x + ',';
  code += D0_y + ',';
  code += Width + ',';
  code += Height + ');\n';
  return code;
};

Blockly.Arduino.oled_drawRFrame = function () {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
  code = 'u8g2.' + type + '(' + D0_x + ',';
  code += D0_y + ',';
  code += Width + ',';
  code += Height + ',';
  code += Rauius + ');\n';
  return code;
};

Blockly.Arduino.oled_drawCircle = function () {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
  code = 'u8g2.' + type + '(' + D0_x + ',';
  code += D0_y + ',';
  code += Rauius + "," + opt + "); \n";
  return code;
};

Blockly.Arduino.oled_drawEllipse = function () {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X') || '0';
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
  code = 'u8g2.' + type + '(' + D0_x + ',';
  code += D0_y + ',';
  code += Rauius_X + ",";
  code += Rauius_Y + "," + opt + "); \n";
  return code;
};

Blockly.Arduino.oled_print = function () {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT') || '0';
  Blockly.Arduino.setups_["setup_enableUTF8Print"] = 'u8g2.enableUTF8Print();\n';
  var code = "";
  code = 'u8g2.setCursor(' + POS_x + ',';
  code += POS_y + "); \n";
  code += "u8g2.print(" + TEXT + "); \n";
  return code;
};

Blockly.Arduino.oled_setFont = function () {
  var type = this.getFieldValue('TYPE');
  var code = "u8g2.setFont(u8g2_font_" + type + ");\nu8g2.setFontPosTop();\n";
  return code;
};

Blockly.Arduino.inout_touchRead = function () {
  var touch_pin = this.getFieldValue('touch_pin');
  var code = 'touchRead(' + touch_pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.handbit_button_is_pressed = function () {
  var btn = this.getFieldValue('btn');
  Blockly.Arduino.setups_['setup_btn' + btn] = 'pinMode(' + btn + ',INPUT);';
  var code = '!digitalRead(' + btn + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_light = function () {
  return ['analogRead(39)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_sound = function () {
  return ['analogRead(36)', Blockly.Arduino.ORDER_ATOMIC];
};

//传感器_重力感应块
Blockly.Arduino.handbit_MSA300 = function () {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_MSA300'] = '#include <MSA300.h>';
  Blockly.Arduino.definitions_['var_declare_MSA300'] = 'MSA300 msa;\n';
  Blockly.Arduino.setups_['setup_msa.begin'] = 'msa.begin();';
  Blockly.Arduino.setups_['setup_Wire.begin'] = 'Wire.begin();';
  var dropdown_type = this.getFieldValue('HANDBIT_MSA300_GETAB');
  var code = dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//传感器_重力感应块
Blockly.Arduino.handbit_MSA300_action = function () {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_MSA300'] = '#include <MSA300.h>';
  Blockly.Arduino.definitions_['var_declare_MSA300'] = 'MSA300 msa;\n';
  Blockly.Arduino.setups_['setup_msa.begin'] = 'msa.begin();';
  Blockly.Arduino.setups_['setup_Wire.begin'] = 'Wire.begin();';
  var dropdown_type = this.getFieldValue('HANDBIT_MSA300_ACTION');
  var code = dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.touchAttachInterrupt = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var threshold = Blockly.Arduino.valueToCode(this, 'threshold', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin + ',gotTouch' + dropdown_pin + ', ' + threshold + ');';
  //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
  var code = '';
  var funcName = 'gotTouch' + dropdown_pin;
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
Blockly.Arduino.inout_touchRead = function () {
  var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'touchRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


function RGB_RGB565(colour) {
  colour = colour.substr(1);
  var R, G, B;
  R = colour.substr(0, 2);
  G = colour.substr(2, 2);
  B = colour.substr(4, 2);
  colour = B + G + R;
  colour = "0x" + colour;
  var RGB565_red = (colour & 0xf80000) >> 8;
  var RGB565_green = (colour & 0xfc00) >> 5;
  var RGB565_blue = (colour & 0xf8) >> 3;
  var n565Color = RGB565_red + RGB565_green + RGB565_blue;
  return n565Color;
}

Blockly.Arduino.handbit_rgb = function () {
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
  COLOR = COLOR.replace(/#/g, "0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var code = 'rgb_display_17.setPixelColor(' + value_led + '-1,' + COLOR + ');\n';
  // code += 'rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.handbit_rgb2 = function () {
  var COLOR1 = Blockly.Arduino.valueToCode(this, 'COLOR1');
  var COLOR2 = Blockly.Arduino.valueToCode(this, 'COLOR2');
  var COLOR3 = Blockly.Arduino.valueToCode(this, 'COLOR3');
  COLOR1 = COLOR1.replace(/#/g, "0x");
  COLOR2 = COLOR2.replace(/#/g, "0x");
  COLOR3 = COLOR3.replace(/#/g, "0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var code = 'rgb_display_17.setPixelColor(0,' + COLOR1 + ');\n';
  code += 'rgb_display_17.setPixelColor(1,' + COLOR2 + ');\n';
  code += 'rgb_display_17.setPixelColor(2,' + COLOR3 + ');\n';
  //  code += 'rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.handbit_rgb_Brightness = function () {
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var code = 'rgb_display_17.setBrightness(' + Brightness + ');\n';
  // code += 'rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.handbit_rgb_show = function () {
  var code = 'rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.handbit_rgb_rainbow1 = function () {
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
  code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
  code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3 = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {\n';
  code3 += 'for(i=0; i<rgb_display_17.numPixels(); i++)\n {\n';
  code3 += 'rgb_display_17.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
  code3 += 'rgb_display_17.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var code = 'rainbow(' + wait_time + ');\n'
  return code;
};

Blockly.Arduino.handbit_rgb_rainbow3 = function () {
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_GRB + NEO_KHZ800);';
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if (type == "normal")
    var code3 = 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n{rgb_display_17.setPixelColor(i, Wheel(' + rainbow_color + ' & 255));\n}\n';
  else
    var code3 = 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n {rgb_display_17.setPixelColor(i, Wheel(((i * 256 / rgb_display_17.numPixels()) + ' + rainbow_color + ') & 255));\n}\n';
  return code3;
};
