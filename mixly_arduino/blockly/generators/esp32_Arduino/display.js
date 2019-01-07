'use strict';

goog.provide('Blockly.Arduino.display');

goog.require('Blockly.Arduino');



Blockly.Arduino.group_lcd_init = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C '+varName+'('+device+','+TYPE+');';
  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
  Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';  
  return '';
};

Blockly.Arduino.group_lcd_init2 = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_SoftI2CMaster'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_SoftI2C'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
  Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';    
  return '';
};

Blockly.Arduino.group_lcd_init3 = function () {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin5 = Blockly.Arduino.valueToCode(this, 'PIN5', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin6 = Blockly.Arduino.valueToCode(this, 'PIN6', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['include_LiquidCrystal'] = '#include <LiquidCrystal.h>';
    Blockly.Arduino.definitions_['var_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ',' + dropdown_pin5 + ',' + dropdown_pin6 + ');';
    Blockly.Arduino.setups_['setup_lcd_begin_' + varName] = varName + '.begin('+TYPE+');';
   
    return '';
};

Blockly.Arduino.group_lcd_print = function() {
  var varName = this.getFieldValue('VAR');
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';

  var code = varName+'.setCursor(0, 0);\n'
  code+=varName+'.print('+str1+');\n';
  code+=varName+'.setCursor(0, 1);\n';
  code+=varName+'.print('+str2+');\n';  
  //code+=varName+'.setCursor(0, 2);\n';
  //code+=varName+'.print('+str3+');\n';
  //code+=varName+'.setCursor(0, 3);\n';
  //code+=varName+'.print('+str4+');\n';
  return code;
};

Blockly.Arduino.group_lcd_print2 = function() {
  var varName = this.getFieldValue('VAR');
  var str = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var row = Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var column = Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = varName+'.setCursor('+column+'-1, '+row+'-1);\n'
  code+=varName+'.print('+str+');\n';
  return code;
};

Blockly.Arduino.group_lcd_power = function() {
  var varName = this.getFieldValue('VAR');
  var dropdown_stat = this.getFieldValue('STAT');
  var code = varName+'.'+dropdown_stat+'();\n'
  return code;
};

Blockly.Arduino.lp2i_u8g_draw_4strings = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    + 'do {\n'
    + '    u8g.setPrintPos(0,14);\n'
    + '    u8g.print(' + value_text_line1 + ');\n'
    + '    u8g.setPrintPos(0,30);\n'
    + '    u8g.print(' + value_text_line2 + ');\n'
    + '    u8g.setPrintPos(0,46);\n'
    + '    u8g.print(' + value_text_line3 + ');\n'
    + '    u8g.setPrintPos(0,62);\n'
    + '    u8g.print(' + value_text_line4 + ');\n'
    + '}\n'
    +'while( u8g.nextPage() );\n';
    return code;
};

Blockly.Arduino.lp2i_u8g_print = function () {
    var value_n = Blockly.Arduino.valueToCode(this, 'N', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
      'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code =
      'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.setPrintPos(' + x + ', ' + y + ');\n'
    code += '       u8g.print(' + value_n + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.lp2i_u8g_4draw_print = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_n1 = Blockly.Arduino.valueToCode(this, 'N1', Blockly.Arduino.ORDER_ATOMIC);
    var value_n2 = Blockly.Arduino.valueToCode(this, 'N2', Blockly.Arduino.ORDER_ATOMIC);
    var value_n3 = Blockly.Arduino.valueToCode(this, 'N3', Blockly.Arduino.ORDER_ATOMIC);
    var value_n4 = Blockly.Arduino.valueToCode(this, 'N4', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["include_U8glib"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '   do {\n'
      + '       u8g.setFont(u8g_font_unifont);\n'
      + '       u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '   } while( u8g.nextPage());\n'
      + '   delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
    code += '       u8g.setPrintPos(100, 12 );\n'
    code += '       u8g.print(' + value_n1 + ');\n'
    code += '       u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
    code += '       u8g.setPrintPos(100, 28 );\n'
    code += '       u8g.print(' + value_n2 + ');\n'
    code += '       u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
    code += '       u8g.setPrintPos(100, 44 );\n'
    code += '       u8g.print(' + value_n3 + ');\n'
    code += '       u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
    code += '       u8g.setPrintPos(100, 60 );\n'
    code += '       u8g.print(' + value_n4 + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
  };
  Blockly.Arduino.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\nrgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
    return '';
  };
  Blockly.Arduino.display_rgb=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
    var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    }
    var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+'rgb_display_' + dropdown_rgbpin+'.Color('+value_rvalue+','+value_gvalue+','+value_bvalue+'));\n';
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    return code;
  };

  Blockly.Arduino.display_rgb2=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
    var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
    var color = goog.color.hexToRgb(colour_rgb_led_color);
    
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
    }
    var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
    code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
    return code;
  };
  //RGBç¯å¸¦å½©è™¹æ•ˆæžœï¼Œä¸ƒå½©å˜æ�?
  Blockly.Arduino.display_rgb_rainbow1=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
    var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
 //   var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
 if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
  Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
}
var funcName2 = 'Wheel';
var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
code2 += '}\n';
Blockly.Arduino.definitions_[funcName2] = code2;
var funcName3 = 'rainbow';
var code3  = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
code3 += 'for(j=0; j<256; j++) {\n';
code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n {\n';
code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
code3 += 'delay(wait);\n}\n}\n';
Blockly.Arduino.definitions_[funcName3] = code3;
var code = 'rainbow('+ wait_time+');\n'
return code;
};
//RGBç¯å¸¦å¾ªçŽ¯ä¸ƒå½©å˜æ¢
Blockly.Arduino.display_rgb_rainbow2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  //var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {               \n';
  code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n{\n';
  code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
  code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var funcName4 = 'rainbowCycle';
  var code4  = 'void rainbowCycle(uint8_t wait) \n{\nuint16_t i, j;\n';
  code4 += 'for(j=0; j<256*5; j++) {\n';
  code4 += 'for(i=0; i< rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) \n{\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel(((i * 256 / rgb_display_'+dropdown_rgbpin+'.numPixels()) + j) & 255));}\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code4 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName4] = code4;
  var code = 'rainbowCycle('+ wait_time+');\n'
  return code;
};
//RGBç¯å¸¦å½©è™�?
Blockly.Arduino.display_rgb_rainbow3=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  //var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(4,'+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  }
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if(type=="normal")
   var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
 else 
   var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + '+rainbow_color+') & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
 
 return code3;
};

Blockly.Arduino.display_4digitdisplay_power=function(){
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.'+stat+'();\n';
}
Blockly.Arduino.display_4digitdisplay_displayString=function(){
	var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.displayString('+value+');\n';
}
Blockly.Arduino.display_4digitdisplay_showDot=function(){
	var no=this.getFieldValue("NO");
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.setDot('+no+','+stat+');\n';
}
var tm1637_DIO;
var tm1637_CLK;

Blockly.Arduino.display_TM1637_init = function () {
 tm1637_CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  tm1637_DIO= Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_SevenSegmentTM1637'] = '#include <SevenSegmentTM1637.h>';
  
  Blockly.Arduino.definitions_['var_SevenSegmentTM1637'] = 'SevenSegmentTM1637  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
  Blockly.Arduino.setups_['setup_ display.begin()'] = ' display.begin();\n';
  return '';
};

Blockly.Arduino.display_TM1637_displyPrint = function () {
    //var Speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
    var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.print(' + VALUE + ');' + '\n';
    return code;
  };

  Blockly.Arduino.display_TM1637_displayTime = function () {
    Blockly.Arduino.definitions_['include_SevenSegmentExtended'] = '#include <SevenSegmentExtended.h>';
    Blockly.Arduino.definitions_['var_SevenSegmentTM1637'] = 'SevenSegmentExtended  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
    var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.printTime(' + hour + ',' + minute +',true);\n';
    return code;
  };
   Blockly.Arduino.display_TM1637_clearDisplay = function () {
    var code = 'display.clear();\n';
    return code;
  };


  Blockly.Arduino.display_TM1637_Brightness = function () {
    var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.setBacklight(' + BRIGHTNESS + ');\n';
    return code;
  };
Blockly.Arduino.display_Matrix_Init = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var matrixName = this.getFieldValue('matrixName');
  Blockly.Arduino.definitions_['include_Matrix'] = '#include <Matrix.h>';
  Blockly.Arduino.definitions_[matrixName] = 'Matrix '+ matrixName +'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_' + matrixName] = matrixName + '.begin(0x70); \n';
  var code= matrixName+'.clear();\n';
  return code;
};
Blockly.Arduino.display_Matrix_POS = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = matrixName + '.drawPixel('+pos_x+'-1,'+pos_y+'-1,'+dropdown_type+');\n'
      code+= matrixName + '.writeDisplay();\n';
  return code;
};
Blockly.Arduino.display_Matrix_Rotation = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = matrixName + '.setRotation('+dropdown_type+');\n'
  return code;
};
Blockly.Arduino.display_Matrix_TEXT = function() {
  var matrixName = this.getFieldValue('matrixName');
  var textString = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var code = matrixName + '.drawStr('+textString+');\n'
  return code;
};
//执行器_点阵屏显示_显示图案
Blockly.Arduino.display_Matrix_DisplayChar = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'LEDArray', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['LEDArray'] = 'uint8_t  LEDArray[8];';
//  var code='Matrix_'+SDA+'_'+SCL+'.clear()dotMatrix;\n';
  var code='';
  code+='for(int i=0; i<8; i++)\n';
  code+='{\n'
  code+='  LEDArray[i]='+dotMatrixArray+'[i];\n';
  code+='  for(int j=0; j<8; j++)\n'
  //code+='  for(int j=7; j>=0; j--)\n'
  code+='  {\n'
  code+='    if((LEDArray[i]&0x01)>0)\n';
  code+='    	'+	matrixName +'.drawPixel(j, i,1);\n';
  code+='    	LEDArray[i] = LEDArray[i]>>1;\n';
  code+='  }  \n'
  code+='}\n'
  code+= matrixName+'.writeDisplay();\n'
  return code;
};
//执行器_点阵屏显示_点阵数组
Blockly.Arduino.display_Matrix_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};';
  //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
  Blockly.Arduino.definitions_[varName] = "uint8_t " + varName + "[8]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.display_Matrix_CLEAR = function() {
  var matrixName = this.getFieldValue('matrixName');
  var code = matrixName + '.clear();\n'
  code += matrixName +'.writeDisplay();\n';
  return code;
};

//显示-MAX7219-初始�?
Blockly.Arduino.MAX7219_init = function() {
  var pin_din = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var pin_cs = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var pin_clk = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
// var lc_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
var lc_num = 1;
var Intensity = Blockly.Arduino.valueToCode(this, 'Intensity', Blockly.Arduino.ORDER_ATOMIC);
Blockly.Arduino.definitions_['define0_MaxMatrix'] = '#include <MaxMatrix.h>';
Blockly.Arduino.definitions_['define1_MaxMatrix'] = '#include <avr/pgmspace.h>';
Blockly.Arduino.definitions_['define_LIST'] = 'PROGMEM const unsigned char LIST[]{\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000000,B00000000,B00000000,B00000000,B00000000,//space\n';
Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01011111,B00000000,B00000000,B00000000,B00000000,//!\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000011,B00000000,B00000011,B00000000,B00000000,// \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00010100,B00111110,B00010100,B00111110,B00010100,//# \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100100,B01101010,B00101011,B00010010,B00000000,//$ \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010011,B00001000,B01100100,B01100011,//% \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00110110,B01001001,B01010110,B00100000,B01010000,//& \n';
Blockly.Arduino.definitions_['define_LIST'] += '1,8,B00000011,B00000000,B00000000,B00000000,B00000000,//\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00011100,B00100010,B01000001,B00000000,B00000000,//( \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00100010,B00011100,B00000000,B00000000,//) \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00101000,B00011000,B00001110,B00011000,B00101000,//* \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001000,B00001000,B00111110,B00001000,B00001000,//+ \n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10110000,B01110000,B00000000,B00000000,B00000000,//, \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00001000,B00001000,B00001000,B00000000,//- \n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01100000,B01100000,B00000000,B00000000,B00000000,//. \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100000,B00011000,B00000110,B00000001,B00000000,/// \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//0\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000010,B01111111,B01000000,B00000000,B00000000,//1\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100010,B01010001,B01001001,B01000110,B00000000,//2\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100010,B01000001,B01001001,B00110110,B00000000,//3\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00010100,B00010010,B01111111,B00000000,//4\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100111,B01000101,B01000101,B00111001,B00000000,//5\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01001001,B01001001,B00110000,B00000000,//6\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B00010001,B00001001,B00000111,B00000000,//7\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110110,B01001001,B01001001,B00110110,B00000000,//8\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000110,B01001001,B01001001,B00111110,B00000000,//9\n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01010000,B00000000,B00000000,B00000000,B00000000,//: \n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B10000000,B01010000,B00000000,B00000000,B00000000,//; \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010000,B00101000,B01000100,B00000000,B00000000,//< \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00010100,B00010100,B00010100,B00000000,B00000000,//= \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B00101000,B00010000,B00000000,B00000000,//> \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000010,B01011001,B00001001,B00000110,B00000000,//? \n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111110,B01001001,B01010101,B01011101,B00001110,//@ \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111110,B00010001,B00010001,B01111110,B00000000,//A\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B00110110,B00000000,//B\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00100010,B00000000,//C\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000001,B01000001,B00111110,B00000000,//D\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01001001,B01001001,B01000001,B00000000,//E\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000001,B00000000,//F\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01001001,B01111010,B00000000,//G\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00001000,B01111111,B00000000,//H\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000001,B00000000,B00000000,//I\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00110000,B01000000,B01000001,B00111111,B00000000,//J\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001000,B00010100,B01100011,B00000000,//K\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000000,B01000000,B01000000,B00000000,//L\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000010,B00001100,B00000010,B01111111,//M\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111111,B00000100,B00001000,B00010000,B01111111,//N\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B00111110,B00000000,//O\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B00000110,B00000000,//P\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111110,B01000001,B01000001,B10111110,B00000000,//Q\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00001001,B00001001,B01110110,B00000000,//R\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000110,B01001001,B01001001,B00110010,B00000000,//S\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000001,B00000001,B01111111,B00000001,B00000001,//T\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111111,B01000000,B01000000,B00111111,B00000000,//U\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00001111,B00110000,B01000000,B00110000,B00001111,//V\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111111,B01000000,B00111000,B01000000,B00111111,//W\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01100011,B00010100,B00001000,B00010100,B01100011,//X\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00000111,B00001000,B01110000,B00001000,B00000111,//Y\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01100001,B01010001,B01001001,B01000111,B00000000,//Z\n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01111111,B01000001,B00000000,B00000000,B00000000,//[ \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00000001,B00000110,B00011000,B01100000,B00000000,//\backslash\n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B01000001,B01111111,B00000000,B00000000,B00000000,//] \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000010,B00000001,B00000010,B00000000,B00000000,//hat\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B01000000,B01000000,B01000000,B00000000,//_ \n';
Blockly.Arduino.definitions_['define_LIST'] += '2,8,B00000001,B00000010,B00000000,B00000000,B00000000,//` \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00100000,B01010100,B01010100,B01111000,B00000000,//a\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B01000100,B01000100,B00111000,B00000000,//b\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00101000,B00000000,//c\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B01111111,B00000000,//d\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01010100,B01010100,B00011000,B00000000,//e\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B01111110,B00000101,B00000000,B00000000,//f\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011000,B10100100,B10100100,B01111000,B00000000,//g\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00000100,B00000100,B01111000,B00000000,//h\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000100,B01111101,B01000000,B00000000,B00000000,//i\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01000000,B10000000,B10000100,B01111101,B00000000,//j\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111111,B00010000,B00101000,B01000100,B00000000,//k\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B01111111,B01000000,B00000000,B00000000,//l\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01111100,B00000100,B01111100,B00000100,B01111000,//m\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00000100,B00000100,B01111000,B00000000,//n\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111000,B01000100,B01000100,B00111000,B00000000,//o\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B11111100,B00100100,B00100100,B00011000,B00000000,//p\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00011000,B00100100,B00100100,B11111100,B00000000,//q\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01111100,B00001000,B00000100,B00000100,B00000000,//r\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B01001000,B01010100,B01010100,B00100100,B00000000,//s\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00000100,B00111111,B01000100,B00000000,B00000000,//t\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00111100,B01000000,B01000000,B01111100,B00000000,//u\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00011100,B00100000,B01000000,B00100000,B00011100,//v\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B00111100,B01000000,B00111100,B01000000,B00111100,//w\n';
Blockly.Arduino.definitions_['define_LIST'] += '5,8,B01000100,B00101000,B00010000,B00101000,B01000100,//x\n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B10011100,B10100000,B10100000,B01111100,B00000000,//y\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01100100,B01010100,B01001100,B00000000,B00000000,//z\n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B00001000,B00110110,B01000001,B00000000,B00000000,//{ \n';
Blockly.Arduino.definitions_['define_LIST'] += '1,8,B01111111,B00000000,B00000000,B00000000,B00000000,//| \n';
Blockly.Arduino.definitions_['define_LIST'] += '3,8,B01000001,B00110110,B00001000,B00000000,B00000000,//} \n';
Blockly.Arduino.definitions_['define_LIST'] += '4,8,B00001000,B00000100,B00001000,B00000100,B00000000,//~ \n';
Blockly.Arduino.definitions_['define_LIST'] += '};'
Blockly.Arduino.definitions_['define2_MaxMatrix'] = 'MaxMatrix m(' + pin_din + ',' + pin_cs + ',' + pin_clk + ',' + lc_num + ');\nbyte buffer[100];';
Blockly.Arduino.setups_['setup_init'] = 'm.init(); ';
Blockly.Arduino.setups_['setup_Intensity'] = 'm.setIntensity(' + Intensity + ');';
var code = '';
return code;
};

//显示-MAX7219-显示字符�?
Blockly.Arduino.MAX7219_putString = function() {
  var str = Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (str.charAt(0) == '"') {
    Blockly.Arduino.definitions_['define_message'] = 'char message[] = ' + str + ';';
  } else {
    Blockly.Arduino.definitions_['define_message'] = 'char message[100];';
    code = str + '.toCharArray(message,100);\n';
  }
  Blockly.Arduino.definitions_['define_putChar'] = 'void putChar(char c, int scrollspeed)\n{\n	if (c < 32 || c > 127) \n	return;\n	c -= 32;\n	memcpy_P(buffer, LIST + 7*c, 7);\n	m.writeSprite(64, 0, buffer);\n	m.setColumn(64 + buffer[0], 0);\n	for (int i=0; i<buffer[0]+1; i++)\n	{\n		delay(scrollspeed);\n		m.shiftLeft(false, false);\n	}\n}';
  Blockly.Arduino.definitions_['define_putString'] = 'void putString(char* s, int scrollspeed)\n{\n	while (*s != 0)\n	{\n		putChar(*s, scrollspeed);\n		s++;\n	}\n}';
  code += 'putString(message, ' + speed + ');\n';
  return code;
};

//显示-max7219-显示图案 
Blockly.Arduino.MAX7219_DisplayChar = function() {
	var code;
	var lc_chars = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ATOMIC);
	code = 'for (int i = 0; i < 8; i++)\n';
	code += '	m.setColumn(i, ' + lc_chars + '[i]);\n';
	return code;
};


//显示-max7219点阵选择数组
Blockly.Arduino.LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};\n';

	Blockly.Arduino.definitions_[varName] = "byte " + varName + "[]=" + code;

	return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//显示-max7219-选择图案
Blockly.Arduino.Matrix_img = function() {
  var dropdown_img_ = this.getFieldValue('img_');
  var code = '"' + dropdown_img_ + '"';
  code = '{';
  for (var i = 0; i < 15; i += 2) {
    code += '0x' + dropdown_img_.substr(i, 2) + ((i != 14) ? ',' : '');
  }
  code += '};\n';
  Blockly.Arduino.definitions_['matrix_img_' + dropdown_img_] = "byte " + 'matrix_img_' + dropdown_img_ + "[]=" + code;
  return ['matrix_img_' + dropdown_img_, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.oled_init = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8glib'] = '#include <U8glib.h>';
  Blockly.Arduino.definitions_['define_u8g'] = ' U8GLIB_SSD1306_128X64 u8g(' + CLK + ',' + DIN + ',' + CS1 + ',' + DC + ');';
  var oled_setup = " if ( u8g.getMode() == U8G_MODE_R3G3B2 )\nu8g.setColorIndex(255);\n";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_GRAY2BIT )\n";
  oled_setup += " u8g.setColorIndex(3);\n ";
  oled_setup += " else if ( u8g.getMode() == U8G_MODE_BW )\n";
  oled_setup += " u8g.setColorIndex(1);\n";
  Blockly.Arduino.setups_['setup_setup'] = oled_setup;
  var code = '';
  return code;
};

//显示-OLED-oled初始�?(iic)
Blockly.Arduino.oled_init2 = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['define_u8g2'] = ' U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['define_u8gspi'] ='#include <Wire.h>\n'; 
  var oled_setup = "u8g2.begin();\n\n";
  Blockly.Arduino.setups_['setup_setup'] = oled_setup;
  var code = '';
  return code;
};
//显示-OLED-oled清屏
Blockly.Arduino.oled_clear = function() {
 var code="u8g2.clearDisplay();";
  return code;
};
//显示-OLED-oled获取高度/宽度
Blockly.Arduino.oled_getHeight_or_Width = function() {
  var what = this.getFieldValue('WHAT');
  var funcName = 'u8g2.get' + what + '()';
  return [funcName, Blockly.Arduino.ORDER_ATOMIC];
};

//OLED显示多行文本
Blockly.Arduino.oled_draw4Str = function() {
  var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
  var code = 'u8g2.drawStr(0, 12, ' + value_text_line1 + ');\n'
  code += 'u8g2.drawStr(0, 24, ' + value_text_line2 + ');\n'
  code += 'u8g2.drawStr(0, 36, ' + value_text_line3 + ');\n'
  code += 'u8g2.drawStr(0, 48, ' + value_text_line4 + ');\n'
  return code;
};

//显示-OLED-oled画点
Blockly.Arduino.oled_drawPixe = function() {
  var pos_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var pos_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(pos_x) && pos_x < 128 && pos_x >= 0) || (isNaN(pos_x))) {
  code += 'u8g2.drawPixel(' + pos_x + ',';
}
if ((!isNaN(pos_y) && pos_y < 64 && pos_y >= 0) || (isNaN(pos_y))) {
  code += pos_y + ');\n';
}
if (code.split(",").length == 2 && code.split(")").length == 2) return code;
else return "";
};

//oled新建页面
Blockly.Arduino.oled_page = function() {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
branch = branch.replace(/(^\s*)|(\s*$)/g, ""); //去除两端空格
if (branch) {
  var code = "  u8g2.firstPage();\n do {\n" + branch + "\n} \nwhile (u8g2.nextPage());\n";
  return code;
}
};

//显示-OLED-显示汉字/图案
Blockly.Arduino.oled_showBitmap = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Height = this.getFieldValue('HEIGHT');
  var WIDTH = this.getFieldValue('WIDTH');
  var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
data_name = data_name.replace(/\"/g, ""); //过滤引号
var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  code = 'u8g2.drawXBM(' + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  code += start_y + ',' + parseInt(WIDTH) + ' ,' + parseInt(Height) + ', ' + data_name + ');\n';
}
if (code.split(",").length == 5 && code.split(")").length == 2) 
  return code;
else return "";
};

//显示-oled-定义字模名称和数�?
Blockly.Arduino.oled_define_bitmap_data = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'static unsigned char ' + varName + '[]={' + text + ' };\n';
  return '';
};

//显示-OLED-oled画线
Blockly.Arduino.oled_drawLine = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var end_x = Blockly.Arduino.valueToCode(this, 'END_X', Blockly.Arduino.ORDER_ATOMIC);
  var end_y = Blockly.Arduino.valueToCode(this, 'END_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
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

//显示-OLED-oled画水�?垂直直线
Blockly.Arduino.oled_draw_Str_Line = function() {
  var start_x = Blockly.Arduino.valueToCode(this, 'START_X', Blockly.Arduino.ORDER_ATOMIC);
  var start_y = Blockly.Arduino.valueToCode(this, 'START_Y', Blockly.Arduino.ORDER_ATOMIC);
  var length = Blockly.Arduino.valueToCode(this, 'LENGTH', Blockly.Arduino.ORDER_ATOMIC);
  var TYPE = this.getFieldValue('TYPE');
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(start_x) && start_x < 128 && start_x >= 0) || (isNaN(start_x))) {
  code = "u8g2.draw" + TYPE + "Line(" + start_x + ',';
}
if ((!isNaN(start_y) && start_y < 64 && start_y >= 0) || (isNaN(start_y))) {
  code += start_y + ',';
}
if ((!isNaN(length) && length < 129 && length > 0) || (isNaN(length))) {
  code += length + ');\n';
}
if (code.split(",").length == 3 && code.split(")").length == 2) return code;
else return "";

};

//显示-OLED-oled画三角形
Blockly.Arduino.oled_drawTriangle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X', Blockly.Arduino.ORDER_ATOMIC);
  var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y', Blockly.Arduino.ORDER_ATOMIC);
  var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X', Blockly.Arduino.ORDER_ATOMIC);
  var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) {
  code = 'u8g2.drawTriangle(' + D0_x + ',';
}
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) {
  code += D0_y + ',';
}
if ((!isNaN(D1_x) && D1_x < 128 && D1_x >= 0) || (isNaN(D1_x))) {
  code += D1_x + ',';
}
if ((!isNaN(D1_y) && D1_y < 64 && D1_y >= 0) || (isNaN(D1_y))) {
  code += D1_y + ',';
}
if ((!isNaN(D2_x) && D2_x < 128 && D2_x >= 0) || (isNaN(D2_x))) {
  code += D2_x + ',';
}
if ((!isNaN(D2_y) && D2_y < 64 && D2_y >= 0) || (isNaN(D2_y))) {
  code += D2_y + ');\n';
}
if (code.split(",").length == 6 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画矩形（实心、空心）
Blockly.Arduino.oled_drawFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
  code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
  code += Height + ');\n';
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画圆角矩形（实心、空心）
Blockly.Arduino.oled_drawRFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Width) && Width < 128 && Width >= 0) || (isNaN(Width))) 
  code += Width + ',';
if ((!isNaN(Height) && Height < 64 && Height >= 0) || (isNaN(Height))) 
  code += Height + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
  code += Rauius + ');\n';
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画圆（实心、空心）
Blockly.Arduino.oled_drawCircle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
  code += Rauius + "," + opt + "); \n";
if (code.split(",").length == 4 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled画椭圆（实心、空心）
Blockly.Arduino.oled_drawEllipse = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X', Blockly.Arduino.ORDER_ATOMIC);
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X', Blockly.Arduino.ORDER_ATOMIC);
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
  code = 'u8g2.'+type+'(' + D0_x + ',';
if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
  code += D0_y + ',';
if ((!isNaN(Rauius_X) && Rauius_X < 64 && Rauius_X >= 0) || (isNaN(Rauius_X))) 
  code += Rauius_X + "," ;
if ((!isNaN(Rauius_Y) && Rauius_Y < 64 && Rauius_Y >= 0) || (isNaN(Rauius_Y))) 
  code += Rauius_Y + "," + opt + "); \n";
if (code.split(",").length == 5 && code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-oled显示字符�?
Blockly.Arduino.oled_drawStr = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
  code = 'u8g2.drawStr(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
  code += POS_y + ','+ TEXT + "); \n";
if (code.split(",").length == 3&& code.split(")").length == 2) return code;
else return "";
};

//显示-OLED-显示变量（字符串，整型）
Blockly.Arduino.oled_print = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X', Blockly.Arduino.ORDER_ATOMIC);
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
//x和y可以是变量也可以是数字，对此做判�?
if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
  code = 'u8g2.setCursor(' + POS_x + ',';
if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
  code += POS_y + "); \n";
code += "u8g2.print(" + TEXT + "); \n";
return code;
};

//显示-OLED-oled设置字体
Blockly.Arduino.oled_setFont = function() {
  var type = this.getFieldValue('TYPE');
  var code = "u8g2.setFont(u8g2_font_"+type+");\nu8g2.setFontPosTop();\n";
  return code;
};
