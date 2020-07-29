'use strict';

goog.provide('Blockly.Arduino.display');

goog.require('Blockly.Arduino');

Blockly.Arduino.group_lcd_init2 = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';  
  var dropdown_i2c_type = this.getFieldValue('i2c_type');
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_LiquidCrystal_I2C_STM32'] = '#include <LiquidCrystal_I2C_STM32.h>';
  Blockly.Arduino.definitions_['var_declare_'+dropdown_i2c_type] = 'TwoWire '+dropdown_i2c_type+'('+ (dropdown_i2c_type == 'Wire1'? 1:2) +', I2C_FAST_MODE);';
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C_STM32 '+varName+'('+device+','+TYPE+');';

  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init(&'+dropdown_i2c_type+');';
  Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';    
  return '';
};

Blockly.Arduino.group_lcd_init3 = function () {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var RS = this.getFieldValue('RS');
  var EN = this.getFieldValue('EN');
  var D4 = this.getFieldValue('D4');
  var D5 = this.getFieldValue('D5');
  var D6 = this.getFieldValue('D6');
  var D7 = this.getFieldValue('D7');
  Blockly.Arduino.definitions_['include_LiquidCrystal'] = '#include <LiquidCrystal.h>';
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + RS + ',' + EN + ',' + D4 + ',' + D5 + ',' + D6 + ',' + D7 + ');';
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

//LCD自定义图案显示
Blockly.Arduino.lcd_display_pattern = function() {
  var name = this.getFieldValue('name');
  var number = this.getFieldValue('number');
  var row= Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC);
  var column= Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC); 
  var pattern= Blockly.Arduino.valueToCode(this, 'pattern', Blockly.Arduino.ORDER_ATOMIC); 
  Blockly.Arduino.setups_["setup_lcd_display_pattern"+number] ='' +name+ '.createChar(' +number+ ', ' +pattern+ ');';
  var code = '' +name+ '.setCursor(' +column+ '-1, ' +row+ '-1);\n' +name+ '.write(' +number+ ');\n';
  return code;
};

Blockly.Arduino.lcd_pattern = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 6; j++) {
      a[i][6-j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{0B' +a[8][5]+ '' +a[8][4]+ '' +a[8][3]+ '' +a[8][2]+ '' +a[8][1]+ ',0B' +a[7][5]+ '' +a[7][4]+ '' +a[7][3]+ '' +a[7][2]+ '' +a[7][1]+ ',0B' +a[6][5]+ '' +a[6][4]+ '' +a[6][3]+ '' +a[6][2]+ '' +a[6][1]+ ',0B' +a[5][5]+ '' +a[5][4]+ '' +a[5][3]+ '' +a[5][2]+ '' +a[5][1]+ ',0B' +a[4][5]+ '' +a[4][4]+ '' +a[4][3]+ '' +a[4][2]+ '' +a[4][1]+ ',0B' +a[3][5]+ '' +a[3][4]+ '' +a[3][3]+ '' +a[3][2]+ '' +a[3][1]+ ',0B' +a[2][5]+ '' +a[2][4]+ '' +a[2][3]+ '' +a[2][2]+ '' +a[2][1]+ ',0B' +a[1][5]+ '' +a[1][4]+ '' +a[1][3]+ '' +a[1][2]+ '' +a[1][1]+ '};';
  Blockly.Arduino.definitions_[varName] = "byte " + varName + "[]=" + code;
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//初始化OLED（I2C）
Blockly.Arduino.arduino_oled_begin_i2c = function() {
  var value_oled_begin_pin_reset = Blockly.Arduino.valueToCode(this, 'oled_begin_pin_reset', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_arduino_oled_begin_type = this.getFieldValue('arduino_oled_begin_type');
  var text_oled_begin_name = this.getFieldValue('oled_begin_name');
  var value_oled_begin_address = Blockly.Arduino.valueToCode(this, 'oled_begin_address', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_arduino_oled_i2c_type = this.getFieldValue('arduino_oled_i2c_type');
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX_STM32.h>';
  Blockly.Arduino.definitions_['include_Adafruit_SSD1306'] = '#include <Adafruit_SSD1306_STM32.h>';
  Blockly.Arduino.definitions_['var_declare_'+dropdown_arduino_oled_i2c_type] = 'TwoWire '+dropdown_arduino_oled_i2c_type+'('+ (dropdown_arduino_oled_i2c_type == 'Wire1'? 1:2) +', I2C_FAST_MODE);';
  if(dropdown_arduino_oled_begin_type == '128x64')
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 64'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_arduino_oled_i2c_type+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  else if(dropdown_arduino_oled_begin_type == '128x32')
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 32'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_arduino_oled_i2c_type+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  else
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  96'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 16'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_arduino_oled_i2c_type+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  Blockly.Arduino.setups_['setup_oled_begin_'+text_oled_begin_name] = text_oled_begin_name+'.begin(SSD1306_SWITCHCAPVCC,'+value_oled_begin_address+');';
  var code = '';
  return code;
};

//初始化OLED（SPI）
Blockly.Arduino.arduino_oled_begin_spi_1 = function() {
  var dropdown_arduino_oled_begin_type = this.getFieldValue('arduino_oled_begin_type');
  var text_oled_begin_name = this.getFieldValue('oled_begin_name');
  var value_oled_begin_mosi = Blockly.Arduino.valueToCode(this, 'oled_begin_mosi', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_clk = Blockly.Arduino.valueToCode(this, 'oled_begin_clk', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_dc = Blockly.Arduino.valueToCode(this, 'oled_begin_dc', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_reset = Blockly.Arduino.valueToCode(this, 'oled_begin_reset', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_cs = Blockly.Arduino.valueToCode(this, 'oled_begin_cs', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX_STM32.h>';
  Blockly.Arduino.definitions_['include_Adafruit_SSD1306'] = '#include <Adafruit_SSD1306_STM32.h>';
  if(dropdown_arduino_oled_begin_type == '128x64')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 64'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_MOSI     '+value_oled_begin_mosi
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CLK      '+value_oled_begin_clk
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT,'+text_oled_begin_name+'_OLED_MOSI, '+text_oled_begin_name+'_OLED_CLK, '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else if(dropdown_arduino_oled_begin_type == '128x32')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 32'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_MOSI     '+value_oled_begin_mosi
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CLK      '+value_oled_begin_clk
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT,'+text_oled_begin_name+'_OLED_MOSI, '+text_oled_begin_name+'_OLED_CLK, '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  96'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 16'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_MOSI     '+value_oled_begin_mosi
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CLK      '+value_oled_begin_clk
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT,'+text_oled_begin_name+'_OLED_MOSI, '+text_oled_begin_name+'_OLED_CLK, '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  Blockly.Arduino.setups_['setup_oled_begin_'+text_oled_begin_name] = text_oled_begin_name+'.begin(SSD1306_SWITCHCAPVCC);';
  var code = '';
  return code;
};

//初始化OLED（SPI）
Blockly.Arduino.arduino_oled_begin_spi_2 = function() {
  var dropdown_arduino_oled_begin_type = this.getFieldValue('arduino_oled_begin_type');
  var text_oled_begin_name = this.getFieldValue('oled_begin_name');
  var value_oled_begin_dc = Blockly.Arduino.valueToCode(this, 'oled_begin_dc', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_reset = Blockly.Arduino.valueToCode(this, 'oled_begin_reset', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_begin_cs = Blockly.Arduino.valueToCode(this, 'oled_begin_cs', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_spi_type = this.getFieldValue('spi_type');
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['include_Adafruit_GFX'] = '#include <Adafruit_GFX_STM32.h>';
  Blockly.Arduino.definitions_['include_Adafruit_SSD1306'] = '#include <Adafruit_SSD1306_STM32.h>';
  Blockly.Arduino.definitions_['var_declare_'+dropdown_spi_type] = 'SPIClass '+dropdown_spi_type+'('+ (dropdown_spi_type == 'SPI_1'? 1:2) +');';
  if(dropdown_arduino_oled_begin_type == '128x64')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 64'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_spi_type+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else if(dropdown_arduino_oled_begin_type == '128x32')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH   128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT  32'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC        '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS        '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET     '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_spi_type+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  96'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 16'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+dropdown_spi_type+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  Blockly.Arduino.setups_['setup_oled_begin_'+text_oled_begin_name] = text_oled_begin_name+'.begin(SSD1306_SWITCHCAPVCC);';
  var code = '';
  return code;
};

//设置光标的位置，OLED将会从此位置开始，向后显示文本或数字
Blockly.Arduino.arduino_oled_set_cursor = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_set_cursor_x = Blockly.Arduino.valueToCode(this, 'set_cursor_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_cursor_y = Blockly.Arduino.valueToCode(this, 'set_cursor_y', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_oled_name+'.setCursor('+value_set_cursor_x+','+value_set_cursor_y+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_set_font = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_font_size = this.getFieldValue('font_size');
  var code = text_oled_name+'.setTextSize('+dropdown_font_size+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_set_font_color = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_font_color = this.getFieldValue('font_color');
  var code = text_oled_name+'.setTextColor('+dropdown_font_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_show_text = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_show_text_type = this.getFieldValue('show_text_type');
  var value_oled_show_text_auto_linefeed_data = Blockly.Arduino.valueToCode(this, 'oled_show_text_auto_linefeed_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_oled_name+'.'+dropdown_show_text_type+'('+value_oled_show_text_auto_linefeed_data+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_show_num = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_show_num_type = this.getFieldValue('show_num_type');
  var value_oled_show_num_auto_linefeed_data = Blockly.Arduino.valueToCode(this, 'oled_show_num_auto_linefeed_data', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_show_num_auto_linefeed_type = this.getFieldValue('oled_show_num_auto_linefeed_type');
  var code = text_oled_name+'.'+dropdown_show_num_type+'('+value_oled_show_num_auto_linefeed_data+', '+dropdown_oled_show_num_auto_linefeed_type+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_set_rotation = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_set_rotation_data = this.getFieldValue('oled_set_rotation_data');
  var code = ''+text_oled_name+'.setRotation('+dropdown_oled_set_rotation_data+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_clear_update_display = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_choose_type = this.getFieldValue('choose_type');
  var code = text_oled_name+'.'+dropdown_choose_type+'();\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_pixel = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_pixel_x = Blockly.Arduino.valueToCode(this, 'oled_draw_pixel_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_pixel_y = Blockly.Arduino.valueToCode(this, 'oled_draw_pixel_y', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_pixel_color = this.getFieldValue('oled_draw_pixel_color');
  var code = text_oled_name+'.drawPixel('+value_oled_draw_pixel_x+', '+value_oled_draw_pixel_y+', '+dropdown_oled_draw_pixel_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_line = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_line_start_x = Blockly.Arduino.valueToCode(this, 'oled_draw_line_start_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_line_start_y = Blockly.Arduino.valueToCode(this, 'oled_draw_line_start_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_line_end_x = Blockly.Arduino.valueToCode(this, 'oled_draw_line_end_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_line_end_y = Blockly.Arduino.valueToCode(this, 'oled_draw_line_end_y', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_line_color = this.getFieldValue('oled_draw_line_color');
  var code = text_oled_name+'.drawLine('+value_oled_draw_line_start_x+', '+value_oled_draw_line_start_y+', '+value_oled_draw_line_end_x+', '+value_oled_draw_line_end_y+', '+dropdown_oled_draw_line_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_line1 = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_line1_type = this.getFieldValue('oled_draw_line1_type');
  var value_oled_draw_line_start_x = Blockly.Arduino.valueToCode(this, 'oled_draw_line_start_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_line_start_y = Blockly.Arduino.valueToCode(this, 'oled_draw_line_start_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_line_length = Blockly.Arduino.valueToCode(this, 'oled_draw_line_length', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_line_color = this.getFieldValue('oled_draw_line_color');
  var code = ''+text_oled_name+'.'+dropdown_oled_draw_line1_type+'('+value_oled_draw_line_start_x+', '+value_oled_draw_line_start_y+', '+value_oled_draw_line_length+', '+dropdown_oled_draw_line_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_rect = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_rect_type_1 = this.getFieldValue('oled_draw_rect_type_1');
  var value_oled_draw_rect_x = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_y = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_width = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_height = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_height', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_rect_color = this.getFieldValue('oled_draw_rect_color');
  var code = text_oled_name + '.' + dropdown_oled_draw_rect_type_1 + 'Rect(' + value_oled_draw_rect_x + ', ' + value_oled_draw_rect_y + ', ' + value_oled_draw_rect_width + ', ' + value_oled_draw_rect_height + ', ' + dropdown_oled_draw_rect_color + ');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_RoundRect = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_rect_type_1 = this.getFieldValue('oled_draw_rect_type_1');
  var value_oled_draw_rect_x = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_y = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_width = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_height = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_height', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_rect_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_rect_radius', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_rect_color = this.getFieldValue('oled_draw_rect_color');
  var code = text_oled_name + '.' + dropdown_oled_draw_rect_type_1 + 'RoundRect(' + value_oled_draw_rect_x + ', ' + value_oled_draw_rect_y + ', ' + value_oled_draw_rect_width + ', ' + value_oled_draw_rect_height + ', ' + value_oled_draw_rect_radius + ', ' + dropdown_oled_draw_rect_color + ');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_circle = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_circle_type = this.getFieldValue('oled_draw_circle_type');
  var value_oled_draw_circle_x = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_y = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_circle_color = this.getFieldValue('oled_draw_circle_color');
  var code = text_oled_name+'.'+dropdown_oled_draw_circle_type+'Circle('+value_oled_draw_circle_x+', '+value_oled_draw_circle_y+', '+value_oled_draw_circle_radius+', '+dropdown_oled_draw_circle_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_triangle = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_triangle_type = this.getFieldValue('oled_draw_triangle_type');
  var value_oled_draw_triangle_x1 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_x1', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_triangle_y1 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_y1', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_triangle_x2 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_x2', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_triangle_y2 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_y2', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_triangle_x3 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_x3', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_triangle_y3 = Blockly.Arduino.valueToCode(this, 'oled_draw_triangle_y3', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_triangle_color = this.getFieldValue('oled_draw_triangle_color');
  var code = text_oled_name+'.'+dropdown_oled_draw_triangle_type+'Triangle('+value_oled_draw_triangle_x1+', '+value_oled_draw_triangle_y1+', '+value_oled_draw_triangle_x2+', '+value_oled_draw_triangle_y2+', '+value_oled_draw_triangle_x3+', '+value_oled_draw_triangle_y3+', '+dropdown_oled_draw_triangle_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_bitmap = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_bitmap_x = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_y = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_data = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_data', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_width = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_height = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_height', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_oled_draw_bitmap_color = this.getFieldValue('oled_draw_bitmap_color');
  var code = text_oled_name+'.drawBitmap('+value_oled_draw_bitmap_x+', '+value_oled_draw_bitmap_y+', '+value_oled_draw_bitmap_data+', '+value_oled_draw_bitmap_width+', '+value_oled_draw_bitmap_height+', '+dropdown_oled_draw_bitmap_color+');\n';
  return code;
};