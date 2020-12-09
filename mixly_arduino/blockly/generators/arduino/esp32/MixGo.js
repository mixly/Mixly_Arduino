'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');


//执行器_点阵屏显示_字符显示
Blockly.Arduino.HT16K33_TEXT = function() {
  Blockly.Arduino.definitions_['include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var string1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var code = 'MixGo_HT16K33.drawStr('+string1+');\n'
  return code;
};

//执行器_点阵屏显示_画点显示
Blockly.Arduino.HT16K33_POS = function() {
  Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = 'MixGo_HT16K33.drawPixel('+pos_x+'-1,'+pos_y+'-1,'+dropdown_type+');\n'
  code+= 'MixGo_HT16K33.writeDisplay();\n';
  return code;
};

//执行器_点阵屏显示_显示图案
Blockly.Arduino.HT16K33_DisplayChar = function() {
 Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
 Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
 Blockly.Arduino.definitions_['var_declare_Matrix1'] = 'uint16_t  MixGo_LedArray[8];';
 Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
 Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
 var dropdown_pin = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ASSIGNMENT);
//  var code='Matrix_'+SDA+'_'+SCL+'.clear();\n';
var code='';
code+='for(int i=0; i<8; i++)\n';
code+='{\n'
code+='  MixGo_LedArray[i]='+dropdown_pin+'[i];\n';
code+='  for(int j=15; j>=0; j--)\n'
code+='  {\n'
code+='    if((MixGo_LedArray[i]&0x01)>0)\n';
code+='      MixGo_HT16K33.drawPixel(j, i,LED_ON);\n';
code+='    MixGo_LedArray[i] = MixGo_LedArray[i]>>1;\n';
code+='  }  \n'
code+='}\n'
code+='MixGo_HT16K33.writeDisplay();\n'
return code;
};


//执行器_点阵屏显示_图案数组
Blockly.Arduino.HT16K33_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 17; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 17; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
  //  alert(tmp);
  if (tmp.length == 1) 
    tmp = "000" + tmp;
  else if (tmp.length == 2) 
   tmp = "00" + tmp;
 else if (tmp.length == 3) 
   tmp = "0" + tmp;
 code += '0x' + tmp + ((i != 8) ? ',' : '');
}
code += '};';
Blockly.Arduino.definitions_[varName] = "uint16_t " + varName + "[8]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_点阵屏_清除显示
Blockly.Arduino.HT16K33_Displayclear = function() {
 Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
 Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
 Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
 Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
 var code = '';
 code += 'MixGo_HT16K33.clear();\n';
 return code;
};

//辅助块_点阵屏_清除显示
Blockly.Arduino.HT16K33_brightness = function() {
  var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['2_include_HT16K33'] = '#include <ZT16K33.h>';
  Blockly.Arduino.definitions_['var_declare_HT16K33'] = 'HT16K33 MixGo_HT16K33;';
  Blockly.Arduino.setups_['setup_Matrix_1'] = 'MixGo_HT16K33.begin(0x70);';
  Blockly.Arduino.setups_['setup_Matrix_2'] = 'delay(100);';
  var code = '';
  code += 'MixGo_HT16K33.setBrightness('+BRIGHTNESS+');\n';
  return code;
};

Blockly.Arduino.HT16K33_show_image = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  
  for (var i = 0; i < 31; i += 4) {
    code += '0x' + dropdown_img_.substr(i, 4) + ((i != 28) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['matrix_img_' + dropdown_img_] = "byte " + 'matrix_img_' + dropdown_img_ + "[]=" + code;
  return ['matrix_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.sensor_mixgo_light= Blockly.Arduino.sensor_light;

Blockly.Arduino.sensor_mixgo_sound=Blockly.Arduino.sensor_sound; 

Blockly.Arduino.mixgo_touch_pin = function(){
  var touch_pin = this.getFieldValue('touch_pin');
  var code = 'touchRead('+touch_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_pin_near = function(){
  var direction = this.getFieldValue('direction');
  var code = 'digitalRead('+ direction +')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.mixGo_led= function() {
  var op = this.getFieldValue('STAT');
  var bright = Blockly.Arduino.valueToCode(this,'bright', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_pinmode'+op] = 'pinMode('+op+',OUTPUT);';
  var code = "digitalWrite("+op+",!"+bright+");\n";
  return code;
};

Blockly.Blocks.sensor_button_is_pressed=Blockly.Blocks.mixgo_button_is_pressed;
Blockly.Blocks.sensor_button_was_pressed=Blockly.Blocks.sensor_mixgo_button_was_pressed;
Blockly.Blocks.sensor_button_get_presses=Blockly.Blocks.sensor_mixgo_button_get_presses;
Blockly.Blocks.sensor_pin_pressed=Blockly.Blocks.sensor_mixgo_pin_pressed;
Blockly.Blocks.sensor_pin_near=Blockly.Blocks.sensor_mixgo_pin_near;
Blockly.Blocks.sensor_light=Blockly.Blocks.sensor_mixgo_light;
Blockly.Blocks.sensor_sound=Blockly.Blocks.sensor_mixgo_sound;


Blockly.Arduino.MixGo_rgb=function(){
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
  COLOR=COLOR.replace(/#/g,"0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
  var code = 'rgb_display_02.setPixelColor('+value_led+'-1,'+COLOR+');\n';
  return code;
};

Blockly.Arduino.MixGo_rgb2=function(){
 var COLOR1 = Blockly.Arduino.valueToCode(this, 'COLOR1');
 var COLOR2 = Blockly.Arduino.valueToCode(this, 'COLOR2');
 COLOR1=COLOR1.replace(/#/g,"0x");
 COLOR2=COLOR2.replace(/#/g,"0x");
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 Blockly.Arduino.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
 Blockly.Arduino.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
 var code = 'rgb_display_02.setPixelColor(0,'+COLOR1+');\n';
 code += 'rgb_display_02.setPixelColor(1,'+COLOR2+');\n';
 return code;
};

Blockly.Arduino.MixGo_rgb_Brightness=function(){
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
  var code='rgb_display_02.setBrightness('+Brightness+');\n';
  return code;
};

Blockly.Arduino.MixGo_rgb_rainbow1=function(){
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 Blockly.Arduino.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
 var wait_time=Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.setups_['setup_rgb_display_begin_02'] = 'rgb_display_02.begin();';
 var funcName2 = 'Wheel';
 var code2= 'uint32_t Wheel(byte WheelPos) {\n';
 code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_02.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
 code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_02.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
 code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_02.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
 code2 += '}\n';
 Blockly.Arduino.definitions_[funcName2] = code2;
 var funcName3 = 'rainbow';
 var code3= 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
 code3 += 'for(j=0; j<256; j++) {\n';
 code3 += 'for(i=0; i<rgb_display_02.numPixels(); i++)\n {\n';
 code3 += 'rgb_display_02.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
 code3 += 'rgb_display_02.show();\n';
 //code3 += 'rgb_display_02.show();\n';
 //code3 += 'delay(wait);\n';
 code3 += '\n}\n}\n';
 Blockly.Arduino.definitions_[funcName3] = code3;
 var code = 'rainbow('+ wait_time+');\n'
 return code;
};

Blockly.Arduino.MixGo_rgb_rainbow3=function(){
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display02'] = 'Adafruit_NeoPixel rgb_display_02= Adafruit_NeoPixel(2,2,NEO_GRB + NEO_KHZ800);';
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2= 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_02.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_02.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_02.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if(type=="normal")
    var code3= 'for (int i = 0; i < rgb_display_02.numPixels(); i++)\n{rgb_display_02.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\n';
  else 
    var code3= 'for (int i = 0; i < rgb_display_02.numPixels(); i++)\n {rgb_display_02.setPixelColor(i, Wheel(((i * 256 / rgb_display_02.numPixels()) + '+rainbow_color+') & 255));\n}\n';
  return code3;
};

Blockly.Arduino.MixGo_rgb_show = function () {
  var code = 'rgb_display_02.show();rgb_display_02.show();\ndelay(1);\n';
  return code;
};

Blockly.Arduino.OneButton = function () {
 Blockly.Arduino.definitions_['include_OneButton'] = '#include <OneButton.h>';
 var dropdown_pin = this.getFieldValue('PIN');
 var dropdown_mode = this.getFieldValue('mode');
 Blockly.Arduino.definitions_['var_declare_button'+dropdown_pin] = 'OneButton button'+dropdown_pin+'('+dropdown_pin+ ',false);';
 Blockly.Arduino.setups_['setup_onebutton_' + dropdown_pin+dropdown_mode] = 'button'+dropdown_pin+'.' + dropdown_mode + '('+dropdown_mode+dropdown_pin+');';
 var code = 'button' +dropdown_pin+ '.tick();';
 var funcName = dropdown_mode+dropdown_pin;
 var branch = Blockly.Arduino.statementToCode(this, 'DO');
 var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
 Blockly.Arduino.definitions_[funcName] = code2;
 return code;
};
Blockly.Arduino.mixgo_button_is_pressed = function(){
 var btn = this.getFieldValue('PIN');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code =  'digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};