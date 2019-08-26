'use strict';

goog.provide('Blockly.Arduino.Handbit');

goog.require('Blockly.Arduino');

Blockly.Arduino.oled_init = function() {
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['setup_u8g2.begin'] = "u8g2.begin();";
  var code = '';
  return code;
};

Blockly.Arduino.oled_clear = function() {
 Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
 Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 var code="u8g2.clearDisplay();";
 return code;
};

Blockly.Arduino.oled_draw4Str = function() {
 Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
 Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
 var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
 var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
 var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
 var code ='u8g2.setFontPosTop();\n'
 +'u8g2.setCursor(0,0);\n'
 +'u8g2.print(' + value_text_line1 + ');\n'
 +'u8g2.setCursor(0,15);\n'
 +'u8g2.print(' + value_text_line2 + ');\n' 
 +'u8g2.setCursor(0,29);\n'
 +'u8g2.print(' + value_text_line3 + ');\n'
 +'u8g2.setCursor(0,43);\n'
 +'u8g2.print(' + value_text_line4 + ');\n'
 return code;
};

Blockly.Arduino.oled_drawPixe = function() {
 Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
 Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
 var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
 var code = "";
 if ((!isNaN(pos_x) && pos_x < 128 && pos_x >= 0) || (isNaN(pos_x))) {
  code += 'u8g2.drawPixel(' + pos_x + ',';
}
if ((!isNaN(pos_y) && pos_y < 64 && pos_y >= 0) || (isNaN(pos_y))) {
  code += pos_y + ');\n';
}
if (code.split(",").length == 2 && code.split(")").length == 2) return code;
else return "";
};

Blockly.Arduino.oled_page = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  branch = branch.replace(/(^\s*)|(\s*$)/g, ""); 
  if (branch) {
    var code = "u8g2.firstPage();\ndo\n{\n" + branch + "\n}\nwhile (u8g2.nextPage());\n";
    return code;
  }
};

Blockly.Arduino.oled_showBitmap = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X')||'0';
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y')|| '0';
  var width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
  data_name = data_name.replace(/\"/g, ""); 
  var code = "";
  // if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  //   code = 'u8g2.drawXBM(' + start_x + ',';
  // }
  // if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  //   code += start_y + ', ';
  // }
  // if ((!isNaN(width) && width <= 128 && width >= 0) || (isNaN(width))) {
  //   code += width + ', ';
  // }
  // if ((!isNaN(height) && height <= 64 && height >= 0) || (isNaN(height))) {
  //   code += height + ', ' + data_name + ');\n';
  // }
  // if (code.split(",").length == 5 && code.split(")").length == 2) 
  //   return code;
  // else return "";
  code = 'u8g2.drawXBM(' + start_x + ', ';
  code += start_y + ', ';
  code += width + ', ';
  code += height + ', ' + data_name + ');\n';
  return code;
  
};

Blockly.Arduino.oled_define_bitmap_data = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_declare' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
  return '';
};

Blockly.Arduino.oled_drawLine = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
  var end_x = Blockly.Arduino.valueToCode(this, 'END_X') || '0';
  var end_y = Blockly.Arduino.valueToCode(this, 'END_Y') || '0';
  var code = "";
  if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
    code = 'u8g2.drawLine(' + start_x + ',';
  }
  if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
    code += start_y + ',';
  }
  if ((!isNaN(end_x) && end_x < 128 && end_x >= 0) || (isNaN(end_x))) {
    code += end_x + ',';
  }
  if ((!isNaN(end_y) && end_y < 64 && end_y >= 0) || (isNaN(end_y))) {
    code += end_y + ');\n';
  }
  if (code.split(",").length == 4 && code.split(")").length == 2) return code;
  else return "";
};

Blockly.Arduino.oled_draw_Str_Line = function() {
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

Blockly.Arduino.oled_drawTriangle = function() {
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

Blockly.Arduino.oled_drawFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
  code = 'u8g2.'+type+'(' + D0_x + ',';
  code += D0_y + ',';
  code += Width + ',';
  code += Height + ');\n';
  return code;
};

Blockly.Arduino.oled_drawRFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
  code = 'u8g2.'+type+'(' + D0_x + ',';
  code += D0_y + ',';
  code += Width + ',';
  code += Height + ',';
  code += Rauius + ');\n';
  return code;
};

Blockly.Arduino.oled_drawCircle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
  code = 'u8g2.'+type+'(' + D0_x + ',';
  code += D0_y + ',';
  code += Rauius + "," + opt + "); \n";
  return code;
};

Blockly.Arduino.oled_drawEllipse = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X') || '0';
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
  code = 'u8g2.'+type+'(' + D0_x + ',';
  code += D0_y + ',';
  code += Rauius_X + "," ;
  code += Rauius_Y + "," + opt + "); \n";
  return code;
};

Blockly.Arduino.oled_print = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT') || '0';
  Blockly.Arduino.setups_["setup_enableUTF8Print"] ='u8g2.enableUTF8Print();\n';
  var code = "";
  code = 'u8g2.setCursor(' + POS_x + ',';
  code += POS_y + "); \n";
  code += "u8g2.print(" + TEXT + "); \n";
  return code;
};

Blockly.Arduino.oled_setFont = function() {
  var type = this.getFieldValue('TYPE');
  var code = "u8g2.setFont(u8g2_font_"+type+");\nu8g2.setFontPosTop();\n";
  return code;
};

Blockly.Arduino.lp2i_u8g_draw_4strings = function () {
  var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  Blockly.Arduino.definitions_["include_U8g2lib"] = '#include <U8g2lib.h>\n';
  Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_1_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_["setup_u8g2"] =' u8g2.begin();\n';
  var code = 'u8g2.firstPage();\n'
  +'do {\n'
  +'u8g2.setFont(u8g2_font_timR14_tr);\n'
  +'u8g2.setFontPosTop();\n'
  +'u8g2.setCursor(0,0);\n'
  +'u8g2.print(' + value_text_line1 + ');\n'
  +'u8g2.setCursor(0,15);\n'
  +'u8g2.print(' + value_text_line2 + ');\n' 
  +'u8g2.setCursor(0,29);\n'
  +'u8g2.print(' + value_text_line3 + ');\n'
  +'u8g2.setCursor(0,43);\n'
  +'u8g2.print(' + value_text_line4 + ');\n'
  +'}\n'
  +'while(u8g2.nextPage() );\n';
  return code;
};

Blockly.Arduino.inout_touchRead = function(){
 var touch_pin = this.getFieldValue('touch_pin');
 var code =  'touchRead('+touch_pin+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.handbit_button_is_pressed = function(){
 var btn = this.getFieldValue('btn');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code =  '!digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_light= function(){
  return ['analogRead(39)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_sound= function(){
  return ['analogRead(36)', Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.handbit_rgb=function(){
  var dropdown_rgbpin =17;
  var value_ledcount =3;
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+'rgb_display_' + dropdown_rgbpin+'.Color('+value_rvalue+','+value_gvalue+','+value_bvalue+'));\n';
  code+='rgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');\n';
  code +='rgb_display_'+dropdown_rgbpin+'.show();\n';
  code+='delay(10);';
  return code;
};

Blockly.Arduino.handbit_rgb2=function(){
  var dropdown_rgbpin = 17;
  var value_ledcount= 3;
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  code+='rgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  code+='delay(10);';
  return code;
};

//传感器_重力感应块
Blockly.Arduino.handbit_MSA300 = function() {
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
Blockly.Arduino.handbit_MSA300_action = function() {
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
  Blockly.Arduino.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin +',gotTouch'+dropdown_pin+', '+threshold+');';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = '';
    var funcName = 'gotTouch'+dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
  };
  Blockly.Arduino.inout_touchRead = function(){
   var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
   var code =  'touchRead('+pin+')';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
 };

 Blockly.Arduino.controls_tone=function(){
  Blockly.Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
  var dropdown_pin =16;
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var duration = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var channle = Blockly.Arduino.valueToCode(this, 'CHANNEL',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code += "tone("+dropdown_pin+","+fre+","+duration+","+channle+");\n";
  return code;
};
Blockly.Arduino.controls_notone=function(){
 var dropdown_pin = 16;
 var channle = Blockly.Arduino.valueToCode(this, 'CHANNEL',
  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
 var code='';
 code += "noTone("+dropdown_pin+");\n";
 return code;
};
