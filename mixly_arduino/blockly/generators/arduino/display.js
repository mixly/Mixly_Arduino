'use strict';

goog.provide('Blockly.Arduino.display');

goog.require('Blockly.Arduino');



Blockly.Arduino.group_lcd_init = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_I2C'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C '+varName+'('+device+','+TYPE+');';
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
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
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
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ',' + dropdown_pin5 + ',' + dropdown_pin6 + ');';
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

Blockly.Arduino.display_4digitdisplay_power=function(){
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
	Blockly.Arduino.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.'+stat+'();\n';
}
Blockly.Arduino.display_4digitdisplay_displayString=function(){
	var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
  Blockly.Arduino.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
  Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
  Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
  return 'tm_4display.displayString('+value+');\n';
}
Blockly.Arduino.display_4digitdisplay_showDot=function(){
	var no=this.getFieldValue("NO");
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_TM1650'] = '#include <TM1650.h>';
  Blockly.Arduino.definitions_['var_declare_display_4display'] = 'TM1650 tm_4display;';
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
 Blockly.Arduino.definitions_['var_declare_SevenSegmentTM1637'] = 'SevenSegmentTM1637  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
 Blockly.Arduino.setups_['setup_ display.begin()'] = ' display.begin();';
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
    Blockly.Arduino.definitions_['var_declare_SevenSegmentTM1637'] = 'SevenSegmentExtended  display(' + tm1637_CLK + ',' + tm1637_DIO + ');';
    var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
    var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'display.printTime(' + hour + ',' + minute +','+dropdown_stat+');\n';
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
  //HT16K33点阵初始化
  Blockly.Arduino.HT16K33_Init = function() {
    var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var matrixName = this.getFieldValue('matrixName');
    Blockly.Arduino.definitions_['include_Matrix'] = '#include <Matrix.h>';
    Blockly.Arduino.definitions_['var_declare'+matrixName] = 'Matrix '+ matrixName +'('+SDA+','+SCL+');';
    Blockly.Arduino.setups_['setup_' + matrixName] = matrixName + '.begin(0x70); \n';
    var code= matrixName+'.clear();\n';
    return code;
  };

  //Max7219点阵初始化
  Blockly.Arduino.MAX7219_init = function() {
   var pin_cs = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
   var matrixName = this.getFieldValue('matrixName');
   var hDisplays = Blockly.Arduino.valueToCode(this, 'hDisplays', Blockly.Arduino.ORDER_ATOMIC);
   var vDisplays = Blockly.Arduino.valueToCode(this, 'vDisplays', Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
   Blockly.Arduino.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX.h>';
   Blockly.Arduino.definitions_['include_Max72xxPanel'] = '#include <Max72xxPanel.h>';
   Blockly.Arduino.definitions_['var_declare_Max72xxPanel'] = 'Max72xxPanel '+matrixName+' = Max72xxPanel('+pin_cs+','+hDisplays+','+ vDisplays+');';
   var code = '';
   return code;
 };

 //点阵屏画点
 Blockly.Arduino.display_Matrix_DrawPixel = function() {
  var matrixType = this.getFieldValue('TYPE');
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
  if(matrixType=="HT16K33")
  {
    var code = matrixName + '.drawPixel('+pos_x+',7-'+pos_y+','+dropdown_type+');\n'
  }
  else
  {
    var code =matrixName+ '.drawPixel('+pos_x+','+pos_y+','+dropdown_type+');\n'
  }
  code+= matrixName +'.write();\n';
  return code;
};

//点阵屏滚动显示文本
Blockly.Arduino.display_Matrix_TEXT = function() {
  var matrixType = this.getFieldValue('TYPE');
  var matrixName = this.getFieldValue('matrixName');
  var textString = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
  if(matrixType=="HT16K33")
  {
   var code = matrixName + '.scrollMessage('+textString+','+speed+');\n'
 }
 else
 {
  var code = matrixName + '.scrollMessage('+textString+','+speed+');\n'
}
return code;
};

//点阵屏显示_显示图案
Blockly.Arduino.display_Matrix_DisplayChar = function() {
  var matrixType = this.getFieldValue('TYPE');
  var matrixName = this.getFieldValue('matrixName');
  var NO = Blockly.Arduino.valueToCode(this, 'NO', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dotMatrixArray = Blockly.Arduino.valueToCode(this, 'LEDArray', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['var_declare_LEDArray'] = 'uint8_t  LEDArray[8];';
  var code='';
  code+='for(int i=0; i<8; i++)\n';
  code+='{\n'
  code+='  LEDArray[i]='+dotMatrixArray+'[i];\n';
  code+='  for(int j='+NO*8+'; j<'+ (NO*8+8)+'; j++)\n'
  //code+='  for(int j=7; j>=0; j--)\n'
  code+='  {\n'
  code+='    if((LEDArray[i]&0x01)>0)\n';
  if(matrixType=="HT16K33")
  {
   code+='      '+  matrixName +'.drawPixel(j, i,1);\n';
   code+='else\n'+  matrixName +'.drawPixel(j, i,0);\n';
 }
 else
 {
  code+='     '+  matrixName +'.drawPixel(j, 7-i,1);\n';
  code+='else\n'+  matrixName +'.drawPixel(j, 7-i,0);\n';
}
code+='    	LEDArray[i] = LEDArray[i]>>1;\n';
code+='  }  \n'
code+='}\n'
code+= matrixName+'.write();\n'
return code;
};

//点阵屏显示_点阵数组
Blockly.Arduino.display_Matrix_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][9-j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
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
  Blockly.Arduino.definitions_[varName] = "uint8_t " + varName + "[8]=" + code;
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//点阵设置亮度
Blockly.Arduino.display_Matrix_Brightness = function () {
 var matrixType = this.getFieldValue('TYPE');
 var matrixName = this.getFieldValue('matrixName');
 var BRIGHTNESS = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
 if(matrixType=="HT16K33")
 {
  var code = matrixName +'.setBrightness(' + BRIGHTNESS + ');\n';
}
else
{
  var code = matrixName +'.setIntensity(' + BRIGHTNESS + ');\n';
}
return code;
};

//点阵 全亮/全灭/关闭/开启
Blockly.Arduino.display_Matrix_fillScreen = function() {
  var matrixType = this.getFieldValue('TYPE');
  var matrixName = this.getFieldValue('matrixName');
  var FILLSCREEN_TYPE = this.getFieldValue('FILLSCREEN_TYPE');
  var code = matrixName+'.'+FILLSCREEN_TYPE+';\n'
  code+= matrixName+'.write();\n';
  return code;
};

//点阵屏旋转
Blockly.Arduino.display_Max7219_Rotation = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var NO = Blockly.Arduino.valueToCode(this, 'NO', Blockly.Arduino.ORDER_ATOMIC);
  var code = matrixName + '.setRotation('+NO+','+dropdown_type+');\n'
  return code;
};

//点阵屏旋转
Blockly.Arduino.display_Max7219_setPosition = function() {
  var matrixName = this.getFieldValue('matrixName');
  var NO = Blockly.Arduino.valueToCode(this, 'NO', Blockly.Arduino.ORDER_ATOMIC);
  var X = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
  var Y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
  var code = matrixName + '.setPosition('+NO+','+X+','+Y+');\n'
  return code;
};

//点阵屏旋转
Blockly.Arduino.display_HT16K33_Rotation = function() {
  var matrixName = this.getFieldValue('matrixName');
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = matrixName + '.setRotation(4-'+dropdown_type+');\n'
  return code;
};

//点阵屏 图案数组
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

//点阵屏预设图案
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

  var SDA = Blockly.Arduino.valueToCode(this, 'SDA',Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'SCL',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  var board_type=JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)))
    Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, '+SDA+', '+SCL+', U8X8_PIN_NONE);';
 else if(board_type.match(RegExp(/ESP32/)))
   Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, '+SDA+', '+SCL+', U8X8_PIN_NONE);';
 else
   Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_1_HW_I2C u8g2(U8G2_R0, '+SDA+', '+SCL+', U8X8_PIN_NONE);';
 Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
 var oled_setup = "u8g2.begin();";
 Blockly.Arduino.setups_['setup_u8g2begin()'] = oled_setup;
 var code = '';
 return code;
};

Blockly.Arduino.oled_clear = function() {
  var code="u8g2.clearDisplay();";
  return code;
};

Blockly.Arduino.oled_draw4Str = function() {
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
  var Height = this.getFieldValue('HEIGHT');
  var WIDTH = this.getFieldValue('WIDTH');
  var data_name = Blockly.Arduino.valueToCode(this, 'bitmap_name', Blockly.Arduino.ORDER_ATOMIC);
  data_name = data_name.replace(/\"/g, ""); 
  var code = "";
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

Blockly.Arduino.oled_drawTriangle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var D1_x = Blockly.Arduino.valueToCode(this, 'D1_X') || '0';
  var D1_y = Blockly.Arduino.valueToCode(this, 'D1_Y') || '0';
  var D2_x = Blockly.Arduino.valueToCode(this, 'D2_X') || '0';
  var D2_y = Blockly.Arduino.valueToCode(this, 'D2_Y') || '0';
  var code = "";

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

Blockly.Arduino.oled_drawFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
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

Blockly.Arduino.oled_drawRFrame = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Width = Blockly.Arduino.valueToCode(this, 'WIDTH') || '0';
  var Height = Blockly.Arduino.valueToCode(this, 'HEIGHT') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var code = "";
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

Blockly.Arduino.oled_drawCircle = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius = Blockly.Arduino.valueToCode(this, 'RADIUS') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
  if ((!isNaN(D0_x) && D0_x < 128 && D0_x >= 0) || (isNaN(D0_x))) 
    code = 'u8g2.'+type+'(' + D0_x + ',';
  if ((!isNaN(D0_y) && D0_y < 64 && D0_y >= 0) || (isNaN(D0_y))) 
    code += D0_y + ',';
  if ((!isNaN(Rauius) && Rauius < 64 && Rauius >= 0) || (isNaN(Rauius))) 
    code += Rauius + "," + opt + "); \n";
  if (code.split(",").length == 4 && code.split(")").length == 2) return code;
  else return "";
};

Blockly.Arduino.oled_drawEllipse = function() {
  var D0_x = Blockly.Arduino.valueToCode(this, 'D0_X') || '0';
  var D0_y = Blockly.Arduino.valueToCode(this, 'D0_Y') || '0';
  var Rauius_X = Blockly.Arduino.valueToCode(this, 'RADIUS_X') || '0';
  var Rauius_Y = Blockly.Arduino.valueToCode(this, 'RADIUS_Y') || '0';
  var type = this.getFieldValue('TYPE');
  var opt = this.getFieldValue('OPT');
  var code = "";
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

Blockly.Arduino.oled_print = function() {
  var POS_x = Blockly.Arduino.valueToCode(this, 'POS_X') || '0';
  var POS_y = Blockly.Arduino.valueToCode(this, 'POS_Y') || '0';
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT') || '0';
  Blockly.Arduino.setups_["setup_enableUTF8Print"] ='u8g2.enableUTF8Print();\n';
  var code = "";
  if ((!isNaN(POS_x) && POS_x < 128 && POS_x >= 0) || (isNaN(POS_x))) 
    code = 'u8g2.setCursor(' + POS_x + ',';
  if ((!isNaN(POS_y) && POS_y < 64 && POS_y >= 0) || (isNaN(POS_y))) 
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
  var board_type=JSFuncs.getPlatform();
  if(board_type.match(RegExp(/ESP8266/)))
   Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
 else if(board_type.match(RegExp(/ESP32/)))
   Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SSD1306_128X64_NONAME_F_SW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
 else
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
