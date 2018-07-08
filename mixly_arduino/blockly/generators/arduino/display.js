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
  //var str3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  //var str4 = Blockly.Arduino.valueToCode(this, 'TEXT4', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
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
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.setCursor('+column+'-1, '+row+'-1);\n'
  code+=varName+'.print('+str+');\n';
  return code;
};

Blockly.Arduino.group_lcd_power = function() {
  var varName = this.getFieldValue('VAR');
  var dropdown_stat = this.getFieldValue('STAT');
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
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
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '(' + value_ledcount + ');';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Arduino.display_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
   Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
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
Blockly.Arduino.display_TM1637_init = function () {
    var CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var DIO = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_TM1637'] = '#include <TM1637.h>';
    Blockly.Arduino.definitions_['var_tm1637'] = 'TM1637 tm1637(' + CLK + ',' + DIO + ');';
    Blockly.Arduino.setups_['setup_tm1637_init'] = 'tm1637.init();\n  tm1637.set();\n';
    return '';
};

Blockly.Arduino.display_TM1637_displayString = function () {
    //var Speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
    var VALUE = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'tm1637.display(' + VALUE + ');' + '\n';
    return code;
};

Blockly.Arduino.display_TM1637_displayTime = function () {
    var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
    var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'tm1637.displayTime(' + hour + ',' + minute +');\n';
    return code;
};

Blockly.Arduino.display_TM1637_Stopwatch = function () {
    var STAT = this.getFieldValue('STAT');
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.definitions_['include_timerone'] = '#include <TimerOne.h>';
    Blockly.Arduino.definitions_['include_pgmspace'] = '#include <avr/pgmspace.h>';
    Blockly.Arduino.definitions_['define_ON'] = '#define ON 1\n'
    Blockly.Arduino.definitions_['define_OFF'] = '#define OFF 0\n';

    Blockly.Arduino.definitions_['definitions_TimeDisp'] = 'int8_t TimeDisp[] = {0x00,0x00,0x00,0x00};\nunsigned char ClockPoint = 1;\nunsigned char Update;\nunsigned char microsecond_10 = 0;\nunsigned char second;\nunsigned char _microsecond_10 = 0;\nunsigned char _second;\nunsigned int eepromaddr;\nboolean Flag_ReadTime;\n';
    
    Blockly.Arduino.definitions_['void_TimingISR2'] = 'void TimingISR2(){\n   microsecond_10 ++;\n   Update = ON;\n   if(microsecond_10 == 100){\n      second ++;\n      if(second == 60)\n         second = 0;\n      microsecond_10 = 0;\n   }\n   ClockPoint =(~ClockPoint) & 0x01;\n   if(Flag_ReadTime == 0){\n      _microsecond_10 = microsecond_10;\n      _second = second;\n   }\n}\n';

    Blockly.Arduino.definitions_['void_TimeUpdate2'] = 'void TimeUpdate2(void){\n   if(ClockPoint)\n      tm1637.point(POINT_ON);\n   else\n      tm1637.point(POINT_OFF);\n   TimeDisp[2] = _microsecond_10 / 10;\n   TimeDisp[3] = _microsecond_10 % 10;\n   TimeDisp[0] = _second / 10;\n   TimeDisp[1]= _second % 10;\n   Update = OFF;\n}\n';

    Blockly.Arduino.definitions_['void_stopwatchStart'] = 'void stopwatchStart(){\n   Flag_ReadTime = 0;\n   TCCR1B |=Timer1.clockSelectBits; \n}\n';
    Blockly.Arduino.definitions_['void_stopwatchPause'] = 'void stopwatchPause(){\n   TCCR1B &= ~(_BV(CS10) | _BV(CS11) | _BV(CS12));\n}\n';

    Blockly.Arduino.definitions_['void_stopwatchReset'] = 'void stopwatchReset(){\n   stopwatchPause();\n   Flag_ReadTime = 0;\n   _microsecond_10 = 0;\n   _second = 0;\n   microsecond_10 = 0;\n   second = 0;\n   Update = ON;\n}\n';
    Blockly.Arduino.definitions_['void_saveTime'] = 'void saveTime(){\n   EEPROM.write(eepromaddr ++,microsecond_10);\n   EEPROM.write(eepromaddr ++,second);\n}\n';

    Blockly.Arduino.definitions_['void_readTime'] = 'void readTime(){\n   Flag_ReadTime = 1;\n   if(eepromaddr == 0){\n      Serial.println("The time had been read");\n      _microsecond_10 = 0;\n      _second = 0;\n   } else{\n      _second = EEPROM.read(-- eepromaddr);\n      _microsecond_10 = EEPROM.read(-- eepromaddr);\n      Serial.println("List the time");\n   }\n   Update = ON;\n}';

    Blockly.Arduino.setups_['setup_tm1637_stopwatch'] = 'Timer1.initialize(10000);\n  Timer1.attachInterrupt(TimingISR2);\n ';

    var code = STAT + '();\n';
    code += 'if(Update == ON){\n   TimeUpdate2();\n   tm1637.display(TimeDisp);\n}';
    return code;
};

Blockly.Arduino.display_TM1637_Brightness = function () {
    var BRIGHTNESS = this.getFieldValue('BRIGHTNESS');
    var code = 'tm1637.set(' + BRIGHTNESS + ');\n';
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
  code+='  for(int j=7; j>=0; j--)\n'
  code+='  {\n'
  code+='    if((LEDArray[i]&0x01)>0)\n';
  code+='    '+ matrixName +'.drawPixel(j, i,1);\n';
  code+='    LEDArray[i] = LEDArray[i]>>1;\n';
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