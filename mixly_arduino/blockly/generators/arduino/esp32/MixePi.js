'use strict';

goog.provide('Blockly.Arduino.HandTFT');

goog.require('Blockly.Arduino');

function str2hex(str){
  if(str == ""){
    return "";
  }
  var arr = [];
  arr.push("0x");
  for(var i=0;i<str.length;i++){
    arr.push(str.charCodeAt(i).toString(16));
  }
  return arr.join('');
}

function RGB_RGB565(colour){
  colour=colour.substr(1);
  var R,G,B;
  R=colour.substr(0,2);
  G=colour.substr(2,2);
  B=colour.substr(4,2);
  colour=B+G+R;
  colour="0x"+colour;
  var RGB565_red= (colour & 0xf80000)>>8;
  var RGB565_green= (colour & 0xfc00)>>5;
  var RGB565_blue= (colour & 0xf8)>>3;
  var n565Color = RGB565_red+RGB565_green + RGB565_blue ;
  return n565Color;
}

Blockly.Arduino.mixepi_inout_touchRead = function(){
 var touch_pin = this.getFieldValue('touch_pin');
 var code ='touchRead('+touch_pin+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mixepi_button_is_pressed = function(){
 var btn = this.getFieldValue('btn');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code ='!digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mixePi_button_is_pressed = function(){
 var btn = this.getFieldValue('btn');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT_PULLUP);';
 var code ='!digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mixepi_light= function(){
  return ['analogRead(39)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mixepi_sound= function(){
  return ['analogRead(36)', Blockly.Arduino.ORDER_ATOMIC];
};

//传感器_重力感应块
Blockly.Arduino.mixepi_ADXL345_action = function() {
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
  Blockly.Arduino.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
  Blockly.Arduino.definitions_['var_declare_ADXL345'] = 'ADXL345 accel;\n';
  Blockly.Arduino.setups_['setup_accel.begin'] = 'accel.begin();';
  Blockly.Arduino.setups_['setup_Wire.begin'] = 'Wire.begin();';
  var dropdown_type = this.getFieldValue('MIXEPI_ADXL345_ACTION');
  var code = dropdown_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.RGB_color_seclet = function() {
  var colour = this.getFieldValue('COLOR');
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.RGB_color_rgb=function(){
  var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
  var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
  var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
//   if(parseInt(R).toString(16).length>1)
//     var colour = parseInt(R).toString(16);
//   else
//    var colour = 0+parseInt(R).toString(16);
//  if(parseInt(G).toString(16).length>1)
//   colour += parseInt(G).toString(16);
//  else
//   colour += 0+parseInt(G).toString(16);
// if(parseInt(B).toString(16).length>1)
//  colour += parseInt(B).toString(16);
// else
//   colour += 0+parseInt(B).toString(16);
// colour="#"+colour;
var colour=R+"*65536"+"+"+G+"*256"+"+"+B;
return [colour, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino.mixepi_rgb=function(){
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
  COLOR=COLOR.replace(/#/g,"0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var code = 'rgb_display_17.setPixelColor('+value_led+'-1,'+COLOR+');\n';
  code +='rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.mixepi_rgb2=function(){
 var COLOR1 = Blockly.Arduino.valueToCode(this, 'COLOR1');
 var COLOR2 = Blockly.Arduino.valueToCode(this, 'COLOR2');
 var COLOR3 = Blockly.Arduino.valueToCode(this, 'COLOR3');
 COLOR1=COLOR1.replace(/#/g,"0x");
 COLOR2=COLOR2.replace(/#/g,"0x");
 COLOR3=COLOR3.replace(/#/g,"0x");
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
 Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
 var code = 'rgb_display_17.setPixelColor(0,'+COLOR1+');\n';
 code += 'rgb_display_17.setPixelColor(1,'+COLOR2+');\n';
 code += 'rgb_display_17.setPixelColor(2,'+COLOR3+');\n';
 code+='rgb_display_17.show();\n';
 return code;
};

Blockly.Arduino.mixepi_rgb_Brightness=function(){
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
  var code='rgb_display_17.setBrightness('+Brightness+');\n';
  code +='rgb_display_17.show();\n';
  return code;
};

Blockly.Arduino.mixepi_rgb_rainbow1=function(){
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
 var wait_time=Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.setups_['setup_rgb_display_begin_17'] = 'rgb_display_17.begin();';
 var funcName2 = 'Wheel';
 var code2= 'uint32_t Wheel(byte WheelPos) {\n';
 code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
 code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
 code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
 code2 += '}\n';
 Blockly.Arduino.definitions_[funcName2] = code2;
 var funcName3 = 'rainbow';
 var code3= 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
 code3 += 'for(j=0; j<256; j++) {\n';
 code3 += 'for(i=0; i<rgb_display_17.numPixels(); i++)\n {\n';
 code3 += 'rgb_display_17.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
 code3 += 'rgb_display_17.show();\n';
 code3 += 'delay(wait);\n}\n}\n';
 Blockly.Arduino.definitions_[funcName3] = code3;
 var code = 'rainbow('+ wait_time+');\n'
 return code;
};

Blockly.Arduino.mixepi_rgb_rainbow3=function(){
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display17'] = 'Adafruit_NeoPixel rgb_display_17= Adafruit_NeoPixel(3,17,NEO_RGB + NEO_KHZ800);';
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2= 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_17.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_17.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_17.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if(type=="normal")
    var code3= 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n{rgb_display_17.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\n';
  else 
    var code3= 'for (int i = 0; i < rgb_display_17.numPixels(); i++)\n {rgb_display_17.setPixelColor(i, Wheel(((i * 256 / rgb_display_17.numPixels()) + '+rainbow_color+') & 255));\n}\n';
  return code3;
};

Blockly.Arduino.brightness_select = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.TFT_Brightness= function () {
  var Brightness = Blockly.Arduino.valueToCode(this, 'BRIGHTNESS',Blockly.Arduino.ORDER_ASSIGNMENT);
  //Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
  //Blockly.Arduino.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ';
  var code = 'dacWrite(26, '+Brightness+'*4+30);\n';
  return code;
};

Blockly.Arduino.tft_icons = function() {
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] ='U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
  Blockly.Arduino.setups_["setup_u8g2_for_adafruit_gfx"] ='u8g2_for_adafruit_gfx.begin(tft);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
 var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
 var ICON_SIZE = this.getFieldValue('ICON_SIZE');
 var ICON_IMAGE = this.getFieldValue('ICON_IMAGE');
 var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_open_iconic_all_"+ICON_SIZE+"x_t);\n"
 +"u8g2_for_adafruit_gfx.setForegroundColor("+colour+");\n"
 +"u8g2_for_adafruit_gfx.setFontMode(1);\n"
 +"u8g2_for_adafruit_gfx.drawGlyph("+POS_x+","+POS_y+"+"+ICON_SIZE+"*8,"+ICON_IMAGE+");\n";
 return code;
};
Blockly.Arduino.TFT_Rotation = function() {
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = 'tft.setRotation('+dropdown_type+');\n'
  return code;
};
Blockly.Arduino.tft_setFont = function() {
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] ='U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
  Blockly.Arduino.setups_["setup_u8g2_for_adafruit_gfx"] ='u8g2_for_adafruit_gfx.begin(tft);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';  
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var type = this.getFieldValue('TYPE');
 var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_"+type+");\nu8g2_for_adafruit_gfx.setFontMode(1);\n";
 return code;
};

Blockly.Arduino.tft_print = function() {
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
 var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
 var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT') || '0';
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 var code="";
 if ((!isNaN(POS_x) && POS_x < 129 && POS_x >= 0) || (isNaN(POS_x))) 
  code = 'u8g2_for_adafruit_gfx.setCursor(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 129 && POS_y >= 0) || (isNaN(POS_y))) 
  code += POS_y + "); \n";
 // code +='u8g2_for_adafruit_gfx.setFontMode(0);'
 code += 'u8g2_for_adafruit_gfx.setForegroundColor'+'('+colour+');\n';
 code += "u8g2_for_adafruit_gfx.print(" + TEXT + "); \n";
 return code;
};

Blockly.Arduino.TFT_color_seclet = function() {
  var colour = this.getFieldValue('COLOR');
  colour=RGB_RGB565(colour);
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.TFT_color_rgb=function(){
 var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
 var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
 var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
 var colour=B+"*256"+"+"+G+"*8"+"+"+R+"/8";
 return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.TFT_fillScreen=function(){
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 // 
 var code = 'tft.fillScreen'+'('+colour+');\n';
 return code;
};

Blockly.Arduino.tft_drawPixel = function() {
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
 var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
 var code = "";
 var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
 COLOR=COLOR.replace(/#/g,"0x");
 COLOR=RGB_RGB565(COLOR);
 code += 'tft.drawPixel(' + pos_x + ',';
 code += pos_y ;
 code+=','+COLOR+');\n';
 return code;
};

Blockly.Arduino.tft_drawLine = function() {
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
 var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
 var end_x = Blockly.Arduino.valueToCode(this, 'END_X') || '0';
 var end_y = Blockly.Arduino.valueToCode(this, 'END_Y') || '0';
 var code = "";
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = 'tft.drawLine(' + start_x + ',';
 code += start_y + ',';
 code += end_x + ',';
 code += end_y;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_drawFastLine = function() {
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var start_x = Blockly.Arduino.valueToCode(this, 'START_X') || '0';
 var start_y = Blockly.Arduino.valueToCode(this, 'START_Y') || '0';
 var length = Blockly.Arduino.valueToCode(this, 'LENGTH') || '0';
 var TYPE = this.getFieldValue('TYPE');
 var code = "";
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = "tft.drawFast" + TYPE + "Line(" + start_x + ',';
 code += start_y + ',';
 code += length ;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_Triangle = function() {
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
 var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
 var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X') || '0';
 var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y') || '0';
 var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X') || '0';
 var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y') || '0';
 var code = "";
 var type = this.getFieldValue('TYPE');
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = 'tft.'+type+'Triangle(' + D0_x + ',';
 code += D0_y + ',';
 code += D1_x + ',';
 code += D1_y + ',';
 code += D2_x + ',';
 code += D2_y;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_Rect = function() {
 Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
 Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
 Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
 Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
 Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
 Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
 var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
 var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
 var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
 var type = this.getFieldValue('TYPE');
 var code = "";
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = 'tft.'+type+'Rect(' + D0_x + ',';
 code += D0_y + ',';
 code += Width + ',';
 code += Height;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_RoundRect = function() {
 Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
 Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
 Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
 Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
 Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
 Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
  Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'dacWrite(26, 255);\n';
 var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
 var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
 var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
 var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
 var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
 var type = this.getFieldValue('TYPE');
 var code = "";
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = 'tft.'+type+'RoundRect(' + D0_x + ',';
 code += D0_y + ',';
 code += Width + ',';
 code += Height + ',';
 code += Rauius ;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_Circle = function() {
 Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
 Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
 Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
 Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
 Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
 Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
// Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
 // Blockly.Arduino.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ledcWrite(0, 255);\n';
 var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
 var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
 var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
 var type = this.getFieldValue('TYPE');
 var opt = this.getFieldValue('OPT');
 var code = "";
 var colour = Blockly.Arduino.valueToCode(this, 'COLOR');
 
 code = 'tft.'+type+'Circle(' + D0_x + ',';
 code += D0_y + ',';
 code += Rauius;
 code+=','+colour+');\n';
 return code;
};

Blockly.Arduino.tft_define_bitmap_data = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_declare' + varName] = 'const uint16_t ' + varName + '[] PROGMEM ={' + text + ' };\n';
  return '';
};

Blockly.Arduino.tft_showBitmap = function() {
 Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
 Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
 Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
 Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
 Blockly.Arduino.setups_["setup_tft.initR"] ='tft.initR(INITR_18GREENTAB);';
 Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
// Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
 // Blockly.Arduino.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ledcWrite(0, 255);\n';
 Blockly.Arduino.definitions_["var_declare_int_row_col_buffidx"] ='int row, col, buffidx=0;';
 var start_x = Blockly.Arduino.valueToCode(this, 'START_X')||'0';
 var start_y = Blockly.Arduino.valueToCode(this, 'START_Y')|| '0';
 var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT')|| '0';
 var WIDTH = Blockly.Arduino.valueToCode(this, 'WIDTH')|| '0';
 var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
 data_name = data_name.replace(/\"/g, ""); 
 var code = "tft.drawRGBBitmap("+start_x+", "+start_y+", "+data_name+", "+WIDTH+", "+Height+");";

 return code;
};

Blockly.Arduino.tft_set_EN_Font = function() {
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] ='U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
  Blockly.Arduino.setups_["setup_u8g2_for_adafruit_gfx"] ='u8g2_for_adafruit_gfx.begin(tft);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
 // Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
 // Blockly.Arduino.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ledcWrite(0, 255);\n';
 var FONT_NAME = this.getFieldValue('FONT_NAME');
 var FONT_SIZE = this.getFieldValue('FONT_SIZE');
 var FONT_STYLE = this.getFieldValue('FONT_STYLE');
 var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_"+FONT_NAME+FONT_STYLE+FONT_SIZE+"_tf);\n";
 return code;
};

Blockly.Arduino.tft_set_CN_Font = function() {
  Blockly.Arduino.definitions_["include_U8g2_for_Adafruit_GFX"] = '#include <U8g2_for_Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_GFX"] = '#include <Adafruit_GFX.h>';
  Blockly.Arduino.definitions_["include_Adafruit_ST7735"] = '#include <Adafruit_ST7735.h>';
  Blockly.Arduino.definitions_["include_SPI"] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_Adafruit_ST7735'] ='Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS, TFT_DC,-1);';
  Blockly.Arduino.definitions_['var_declare_U8G2_FOR_ADAFRUIT_GFX'] ='U8G2_FOR_ADAFRUIT_GFX u8g2_for_adafruit_gfx;';
  Blockly.Arduino.setups_["setup_u8g2_for_adafruit_gfx"] ='u8g2_for_adafruit_gfx.begin(tft);';
  Blockly.Arduino.setups_["setup_tft.initR"] =' tft.initR(INITR_18GREENTAB);';
  Blockly.Arduino.setups_["setup_tft.fillScreen(ST7735_BLACK)"] ='tft.fillScreen(ST7735_BLACK);';
 // Blockly.Arduino.setups_['ledcSetup_tft_brightness'] = 'ledcSetup(0,5000,8);\n';
 // Blockly.Arduino.setups_['ledcAttachPin_tft_brightness'] = 'ledcAttachPin(26,0);\n ledcWrite(0, 255);\n';
 var FONT_NAME = this.getFieldValue('FONT_NAME');
 var FONT_SIZE = this.getFieldValue('FONT_SIZE');
 var code = "u8g2_for_adafruit_gfx.setFont(u8g2_font_"+FONT_SIZE+FONT_NAME+");\n";
 return code;
};

