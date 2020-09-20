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
  Blockly.Arduino.definitions_['var_declare_'+(dropdown_i2c_type=='remap_I2C_1'?'Wire1':dropdown_i2c_type)] = 'TwoWire '+(dropdown_i2c_type=='remap_I2C_1'?'Wire1':dropdown_i2c_type)+'('+ dropdown_i2c_type.charAt(dropdown_i2c_type.length-1) +', I2C_FAST_MODE);';
  Blockly.Arduino.definitions_['var_declare_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C_STM32 '+varName+'('+device+','+TYPE+');';
  if(dropdown_i2c_type=='remap_I2C_1')
    Blockly.Arduino.setups_['setup_i2c_remap_I2C_1'] = 'afio_remap(AFIO_REMAP_I2C1);\n'
                                                    +'  gpio_set_mode(GPIOB, 9, GPIO_AF_OUTPUT_OD);\n'
                                                    +'  gpio_set_mode(GPIOB, 8, GPIO_AF_OUTPUT_OD);';
  Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init(&'+(dropdown_i2c_type=='remap_I2C_1'?'Wire1':dropdown_i2c_type)+');';
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
  Blockly.Arduino.definitions_['var_declare_'+(dropdown_arduino_oled_i2c_type=='remap_I2C_1'?'Wire1':dropdown_arduino_oled_i2c_type)] = 'TwoWire '+(dropdown_arduino_oled_i2c_type=='remap_I2C_1'?'Wire1':dropdown_arduino_oled_i2c_type)+'('+ dropdown_arduino_oled_i2c_type.charAt(dropdown_arduino_oled_i2c_type.length-1) +', I2C_FAST_MODE);';
  if(dropdown_arduino_oled_begin_type == '128x64')
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 64'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_arduino_oled_i2c_type=='remap_I2C_1'?'Wire1':dropdown_arduino_oled_i2c_type)+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  else if(dropdown_arduino_oled_begin_type == '128x32')
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 32'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_arduino_oled_i2c_type=='remap_I2C_1'?'Wire1':dropdown_arduino_oled_i2c_type)+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  else
  {
    
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  96'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 16'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_pin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_arduino_oled_i2c_type=='remap_I2C_1'?'Wire1':dropdown_arduino_oled_i2c_type)+', '+text_oled_begin_name+'_OLED_RESET);';
    
  }
  if(dropdown_arduino_oled_i2c_type=='remap_I2C_1')
    Blockly.Arduino.setups_['setup_i2c_remap_I2C_1'] = 'afio_remap(AFIO_REMAP_I2C1);\n'
                                                    +'  gpio_set_mode(GPIOB, 9, GPIO_AF_OUTPUT_OD);\n'
                                                    +'  gpio_set_mode(GPIOB, 8, GPIO_AF_OUTPUT_OD);';
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
  Blockly.Arduino.definitions_['var_declare_'+ (dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)] = 'SPIClass '+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+'('+ dropdown_spi_type.charAt(dropdown_spi_type.length-1) +');';
  if(dropdown_arduino_oled_begin_type == '128x64')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 64'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else if(dropdown_arduino_oled_begin_type == '128x32')
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH   128'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT  32'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC        '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS        '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET     '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  else
  {
    Blockly.Arduino.definitions_['var_declare_oled_begin_'+text_oled_begin_name] = '#define '+text_oled_begin_name+'_SCREEN_WIDTH  96'
                                                                                +'\n#define '+text_oled_begin_name+'_SCREEN_HEIGHT 16'
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_DC       '+value_oled_begin_dc
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_CS       '+value_oled_begin_cs
                                                                                +'\n#define '+text_oled_begin_name+'_OLED_RESET    '+value_oled_begin_reset
                                                                                +'\nAdafruit_SSD1306_STM32 '+text_oled_begin_name+'('+text_oled_begin_name+'_SCREEN_WIDTH, '+text_oled_begin_name+'_SCREEN_HEIGHT, &'+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+', '+text_oled_begin_name+'_OLED_DC, '+text_oled_begin_name+'_OLED_RESET, '+text_oled_begin_name+'_OLED_CS);';
  }
  if(dropdown_spi_type != 'remap_SPI_1')
  {
    Blockly.Arduino.setups_['setup_oled_begin_'+text_oled_begin_name] = text_oled_begin_name+'.begin(SSD1306_SWITCHCAPVCC);';
  }
  else
  {
    Blockly.Arduino.setups_['setup_spi_remap_SPI_1'] = 'afio_cfg_debug_ports(AFIO_DEBUG_SW_ONLY);\n'
                                                   + '  afio_remap(AFIO_REMAP_SPI1);\n'
                                                   + '  gpio_set_mode(GPIOB, 3, GPIO_AF_OUTPUT_PP);\n'
                                                   + '  gpio_set_mode(GPIOB, 4, GPIO_INPUT_FLOATING);\n'
                                                   + '  gpio_set_mode(GPIOB, 5, GPIO_AF_OUTPUT_PP);';
    Blockly.Arduino.setups_['setup_oled_begin_'+text_oled_begin_name] = text_oled_begin_name+'.begin(SSD1306_SWITCHCAPVCC);';
  }
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

Blockly.Arduino.arduino_oled_draw_CircleHelper = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_circle_x = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_y = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_cornername = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_cornername', Blockly.Arduino.ORDER_ATOMIC) || '0x00';
  var value_color = this.getFieldValue('oled_draw_color');
  var code = text_oled_name+'.drawCircleHelper('+value_oled_draw_circle_x+', '+value_oled_draw_circle_y+', '+value_oled_draw_circle_radius+', '+value_oled_draw_circle_cornername+', '+value_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_draw_CircleHelper_data = function() {
  var checkbox_LEFT_UP = this.getFieldValue('LEFT_UP') == 'TRUE';
  var checkbox_RIGHT_UP = this.getFieldValue('RIGHT_UP') == 'TRUE';
  var checkbox_LEFT_DOWN = this.getFieldValue('LEFT_DOWN') == 'TRUE';
  var checkbox_RIGHT_DOWN = this.getFieldValue('RIGHT_DOWN') == 'TRUE';
  var code = 'B0000'+(checkbox_LEFT_DOWN?'1':'0')+(checkbox_RIGHT_DOWN?'1':'0')+(checkbox_RIGHT_UP?'1':'0')+(checkbox_LEFT_UP?'1':'0');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.arduino_oled_fill_CircleHelper = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_circle_x = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_y = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_cornername = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_cornername', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_circle_delta = Blockly.Arduino.valueToCode(this, 'oled_draw_circle_delta', Blockly.Arduino.ORDER_ATOMIC);
  var value_color = this.getFieldValue('oled_draw_color');
  var code = text_oled_name+'.fillCircleHelper('+value_oled_draw_circle_x+', '+value_oled_draw_circle_y+', '+value_oled_draw_circle_radius+', '+value_oled_draw_circle_cornername+', '+value_oled_draw_circle_delta+', '+value_color+');\n';
  return code;
};

Blockly.Arduino.arduino_oled_fill_CircleHelper_data = function() {
  var checkbox_LEFT = this.getFieldValue('LEFT') == 'TRUE';
  var checkbox_RIGHT = this.getFieldValue('RIGHT') == 'TRUE';
  var code = 'B000000'+(checkbox_RIGHT?'1':'0')+(checkbox_LEFT?'1':'0');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.arduino_oled_draw_ellipse = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var dropdown_oled_draw_ellipse_type = this.getFieldValue('oled_draw_ellipse_type');
  var value_oled_draw_ellipse_x = Blockly.Arduino.valueToCode(this, 'oled_draw_ellipse_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_ellipse_y = Blockly.Arduino.valueToCode(this, 'oled_draw_ellipse_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_ellipse_x_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_ellipse_x_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_ellipse_y_radius = Blockly.Arduino.valueToCode(this, 'oled_draw_ellipse_y_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_ellipse_cornername = Blockly.Arduino.valueToCode(this, 'oled_draw_ellipse_cornername', Blockly.Arduino.ORDER_ATOMIC);
  var value_color = this.getFieldValue('oled_draw_color');
  Blockly.Arduino.definitions_['function_draw_ellipse_section'] = 'void draw_ellipse_section(Adafruit_GFX_STM32 *screen, int16_t x, int16_t y, int16_t x0, int16_t y0, uint8_t option, boolean fill, uint16_t color){\n'
                                                                + '  /* upper left */\n'
                                                                + '  if (option & 0x01){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0-x, y0-y, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 - x, y0 - y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* upper right */\n'
                                                                + '  if (option & 0x02){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0+x, y0-y, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 + x, y0 - y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* lower right */\n'
                                                                + '  if (option & 0x04){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0+x, y0, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 + x, y0 + y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* lower left */\n'
                                                                + '  if (option & 0x08){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0-x, y0, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 - x, y0 + y, color);\n'
                                                                + '  }\n'
                                                                + '}\n';
  Blockly.Arduino.definitions_['function_draw_ellipse'] = 'void draw_ellipse(Adafruit_GFX_STM32 *screen, int16_t x0, int16_t y0, int16_t rx, int16_t ry, uint8_t option, boolean fill, uint16_t color){\n'
                                                        + '  uint16_t x, y;\n'
                                                        + '  int32_t xchg, ychg;\n'
                                                        + '  int32_t err;\n'
                                                        + '  int32_t rxrx2;\n'
                                                        + '  int32_t ryry2;\n'
                                                        + '  int32_t stopx, stopy;\n'
                                                        + '\n'
                                                        + '  rxrx2 = rx;\n'
                                                        + '  rxrx2 *= rx;\n'
                                                        + '  rxrx2 *= 2;\n'
                                                        + '\n'
                                                        + '  ryry2 = ry;\n'
                                                        + '  ryry2 *= ry;\n'
                                                        + '  ryry2 *= 2;\n'
                                                        + '\n'
                                                        + '  x = rx;\n'
                                                        + '  y = 0;\n'
                                                        + '\n'
                                                        + '  xchg = 1;\n'
                                                        + '  xchg -= rx;\n'
                                                        + '  xchg -= rx;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '\n'
                                                        + '  ychg = rx;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '\n'
                                                        + '  err = 0;\n'
                                                        + '\n'
                                                        + '  stopx = ryry2;\n'
                                                        + '  stopx *= rx;\n'
                                                        + '  stopy = 0;\n'
                                                        + '\n'
                                                        + '  while( stopx >= stopy ){\n'
                                                        + '    draw_ellipse_section(screen, x, y, x0, y0, option, fill, color);\n'
                                                        + '    y++;\n'
                                                        + '    stopy += rxrx2;\n'
                                                        + '    err += ychg;\n'
                                                        + '    ychg += rxrx2;\n'
                                                        + '    if ( 2*err+xchg > 0 ){\n'
                                                        + '      x--;\n'
                                                        + '      stopx -= ryry2;\n'
                                                        + '      err += xchg;\n'
                                                        + '      xchg += ryry2;\n'
                                                        + '    }\n'
                                                        + '  }\n'
                                                        + '\n'
                                                        + '  x = 0;\n'
                                                        + '  y = ry;\n'
                                                        + '\n'
                                                        + '  xchg = ry;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '\n'
                                                        + '  ychg = 1;\n'
                                                        + '  ychg -= ry;\n'
                                                        + '  ychg -= ry;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '\n'
                                                        + '  err = 0;\n'
                                                        + '\n'
                                                        + '  stopx = 0;\n'
                                                        + '\n\n'
                                                        + '  stopy = rxrx2;\n'
                                                        + '  stopy *= ry;\n'
                                                        + '\n'
                                                        + '  while( stopx <= stopy ){\n'
                                                        + '    draw_ellipse_section(screen, x, y, x0, y0, option, fill, color);\n'
                                                        + '    x++;\n'
                                                        + '    stopx += ryry2;\n'
                                                        + '    err += xchg;\n'
                                                        + '    xchg += ryry2;\n'
                                                        + '    if ( 2*err+ychg > 0 ){\n'
                                                        + '      y--;\n'
                                                        + '      stopy -= rxrx2;\n'
                                                        + '      err += ychg;\n'
                                                        + '      ychg += rxrx2;\n'
                                                        + '    }\n'
                                                        + '  }\n'
                                                        + '}\n';
  var code = 'draw_ellipse(&'+text_oled_name+', '+value_oled_draw_ellipse_x+', '+value_oled_draw_ellipse_y+', '+value_oled_draw_ellipse_x_radius+', '+value_oled_draw_ellipse_y_radius+', '+value_oled_draw_ellipse_cornername+', '+dropdown_oled_draw_ellipse_type+', '+value_color+');\n';
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

Blockly.Arduino.arduino_st7735_begin_software = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_tab = this.getFieldValue('st7735_tab');
  var value_st7735_rst = Blockly.Arduino.valueToCode(this, 'st7735_rst', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_cs = Blockly.Arduino.valueToCode(this, 'st7735_cs', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_dc = Blockly.Arduino.valueToCode(this, 'st7735_dc', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_mosi = Blockly.Arduino.valueToCode(this, 'st7735_mosi', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_sclk = Blockly.Arduino.valueToCode(this, 'st7735_sclk', Blockly.Arduino.ORDER_ATOMIC);
  var st7789_select = dropdown_st7735_tab.indexOf(",") != -1 ? 'ST7789':'ST7735';
  st7789_select = dropdown_st7735_tab.indexOf("ST7796") != -1 ? 'ST7796':st7789_select;
  Blockly.Arduino.definitions_['include_Adafruit_GFX_STM32'] = '#include <Adafruit_GFX_STM32.h>';
  Blockly.Arduino.definitions_['include_Adafruit_'+st7789_select+'_STM32'] = '#include <Adafruit_'+st7789_select+'_STM32.h>';
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_tft_' + text_st7735_name] = 'Adafruit_'+st7789_select+'_STM32 '+text_st7735_name+' = Adafruit_'+st7789_select+'_STM32('+value_st7735_cs+', '+value_st7735_dc+', '+value_st7735_mosi+', '+value_st7735_sclk+', '+value_st7735_rst+');';
  Blockly.Arduino.setups_['setup_tft_' + text_st7735_name] = ''+text_st7735_name+'.init'+(st7789_select == 'ST7735'? 'R':'')+'('+(st7789_select == 'ST7796'? '':dropdown_st7735_tab)+');';
  var code = '';
  return code;
};

Blockly.Arduino.arduino_st7735_begin_hardware = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_tab = this.getFieldValue('st7735_tab');
  var value_st7735_rst = Blockly.Arduino.valueToCode(this, 'st7735_rst', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_cs = Blockly.Arduino.valueToCode(this, 'st7735_cs', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_dc = Blockly.Arduino.valueToCode(this, 'st7735_dc', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_spi_type = this.getFieldValue('spi_type');
  var st7789_select = dropdown_st7735_tab.indexOf(",") != -1 ? 'ST7789':'ST7735';
  st7789_select = dropdown_st7735_tab.indexOf("ST7796") != -1 ? 'ST7796':st7789_select;
  Blockly.Arduino.definitions_['include_Adafruit_GFX_STM32'] = '#include <Adafruit_GFX_STM32.h>';
  Blockly.Arduino.definitions_['include_Adafruit_'+st7789_select+'_STM32'] = '#include <Adafruit_'+st7789_select+'_STM32.h>';
  Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
  Blockly.Arduino.definitions_['var_declare_'+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)] = 'SPIClass '+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+'('+ dropdown_spi_type.charAt(dropdown_spi_type.length-1) +');';
  Blockly.Arduino.definitions_['var_declare_tft_' + text_st7735_name] = 'Adafruit_'+st7789_select+'_STM32 '+text_st7735_name+' = Adafruit_'+st7789_select+'_STM32(&'+(dropdown_spi_type=='remap_SPI_1'?'SPI_1':dropdown_spi_type)+', '+value_st7735_cs+', '+value_st7735_dc+', '+value_st7735_rst+');';
  if(dropdown_spi_type != 'remap_SPI_1')
  {
    Blockly.Arduino.setups_['setup_tft_' + text_st7735_name] = text_st7735_name+'.init'+(st7789_select == 'ST7735'? 'R':'')+'('+(st7789_select == 'ST7796'? '':dropdown_st7735_tab)+');';
  }
  else
  {
    Blockly.Arduino.setups_['setup_spi_remap_SPI_1'] = 'afio_cfg_debug_ports(AFIO_DEBUG_SW_ONLY);\n'
                                                   + '  afio_remap(AFIO_REMAP_SPI1);\n'
                                                   + '  gpio_set_mode(GPIOB, 3, GPIO_AF_OUTPUT_PP);\n'
                                                   + '  gpio_set_mode(GPIOB, 4, GPIO_INPUT_FLOATING);\n'
                                                   + '  gpio_set_mode(GPIOB, 5, GPIO_AF_OUTPUT_PP);';
    Blockly.Arduino.setups_['setup_ST7735_' + text_st7735_name] = text_st7735_name+'.init'+(st7789_select == 'ST7789'? '':'R')+'('+(st7789_select == 'ST7796'? '':dropdown_st7735_tab)+');';
  }
  var code = '';
  return code;
};

function string_Bin_to_Hex(outstr_select){
  switch (outstr_select)
  {
    case '0000':
    {
      outstr_select = '0';
      break;
    }
    case '0001':
    {
      outstr_select = '1';
      break;
    }
    case '0010':
    {
      outstr_select = '2';
      break;
    }
    case '0011':
    {
      outstr_select = '3';
      break;
    }
    case '0100':
    {
      outstr_select = '4';
      break;
    }
    case '0101':
    {
      outstr_select = '5';
      break;
    }
    case '0110':
    {
      outstr_select = '6';
      break;
    }
    case '0111':
    {
      outstr_select = '7';
      break;
    }
    case '1000':
    {
      outstr_select = '8';
      break;
    }
    case '1001':
    {
      outstr_select = '9';
      break;
    }
    case '1010':
    {
      outstr_select = 'A';
      break;
    }
    case '1011':
    {
      outstr_select = 'B';
      break;
    }
    case '1100':
    {
      outstr_select = 'C';
      break;
    }
    case '1101':
    {
      outstr_select = 'D';
      break;
    }
    case '1110':
    {
      outstr_select = 'E';
      break;
    }
    case '1111':
    {
      outstr_select = 'F';
      break;
    }
  }
  return outstr_select;
};

function string_Hex_to_Bin(outstr_select){
  switch (outstr_select)
  {
    case '0':
    {
      outstr_select = '0000';
      break;
    }
    case '1':
    {
      outstr_select = '0001';
      break;
    }
    case '2':
    {
      outstr_select = '0010';
      break;
    }
    case '3':
    {
      outstr_select = '0011';
      break;
    }
    case '4':
    {
      outstr_select = '0100';
      break;
    }
    case '5':
    {
      outstr_select = '0101';
      break;
    }
    case '6':
    {
      outstr_select = '0110';
      break;
    }
    case '7':
    {
      outstr_select = '0111';
      break;
    }
    case '8':
    {
      outstr_select = '1000';
      break;
    }
    case '9':
    {
      outstr_select = '1001';
      break;
    }
    case 'a':
    {
      outstr_select = '1010';
      break;
    }
    case 'b':
    {
      outstr_select = '1011';
      break;
    }
    case 'c':
    {
      outstr_select = '1100';
      break;
    }
    case 'd':
    {
      outstr_select = '1101';
      break;
    }
    case 'e':
    {
      outstr_select = '1110';
      break;
    }
    case 'f':
    {
      outstr_select = '1111';
      break;
    }
  }
  return outstr_select;
};

//屏幕背光初始化引脚
Blockly.Arduino.arduino_st7735_backlight = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_st7735_backlight_pin = Blockly.Arduino.valueToCode(this, 'st7735_backlight_pin', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_backlight_brightness = Blockly.Arduino.valueToCode(this, 'st7735_backlight_brightness', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogWrite('+value_st7735_backlight_pin+', '+value_st7735_backlight_brightness+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_set_rotation = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_set_rotation_data = this.getFieldValue('set_rotation_data');
  var code = ''+text_st7735_name+'.setRotation('+dropdown_set_rotation_data+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_set_cursor = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_set_cursor_x = Blockly.Arduino.valueToCode(this, 'set_cursor_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_cursor_y = Blockly.Arduino.valueToCode(this, 'set_cursor_y', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.setCursor('+value_set_cursor_x+', '+value_set_cursor_y+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_set_text_size = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_set_text_size_data = this.getFieldValue('set_text_size_data');
  var code = ''+text_st7735_name+'.setTextSize('+dropdown_set_text_size_data+');\n';
  return code;
};

//RGB颜色
Blockly.Arduino.arduino_st7735_color = function() {
  var colour_st7735_color_type = this.getFieldValue('st7735_color_type');
  var str_1 = colour_st7735_color_type.charAt(1);
  var str_2 = colour_st7735_color_type.charAt(2);
  var str_3 = colour_st7735_color_type.charAt(3);
  var str_4 = colour_st7735_color_type.charAt(4);
  var str_5 = colour_st7735_color_type.charAt(5);
  var str_6 = colour_st7735_color_type.charAt(6);

  str_1 = string_Hex_to_Bin(str_1);
  str_2 = string_Hex_to_Bin(str_2);
  str_3 = string_Hex_to_Bin(str_3);
  str_4 = string_Hex_to_Bin(str_4);
  str_5 = string_Hex_to_Bin(str_5);
  str_6 = string_Hex_to_Bin(str_6);

  str_2 = str_2.charAt(0);
  str_4 = str_4.substring(0,2);
  str_6 = str_6.charAt(0);

  var str = str_1 + str_2 + str_3 + str_4 + str_5 + str_6;
  var str1 = '';
  str1 = '0x' + string_Bin_to_Hex(str.substring(0,4)) + string_Bin_to_Hex(str.substring(4,8)) + string_Bin_to_Hex(str.substring(8,12)) + string_Bin_to_Hex(str.substring(12,16));
  var code = str1;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//BGR颜色
Blockly.Arduino.arduino_st7735_color_2020_07_20 = function() {
  var colour_st7735_color_type = this.getFieldValue('st7735_color_type');
  var str_5 = colour_st7735_color_type.charAt(1);
  var str_6 = colour_st7735_color_type.charAt(2);
  var str_3 = colour_st7735_color_type.charAt(3);
  var str_4 = colour_st7735_color_type.charAt(4);
  var str_1 = colour_st7735_color_type.charAt(5);
  var str_2 = colour_st7735_color_type.charAt(6);

  str_1 = string_Hex_to_Bin(str_1);
  str_2 = string_Hex_to_Bin(str_2);
  str_3 = string_Hex_to_Bin(str_3);
  str_4 = string_Hex_to_Bin(str_4);
  str_5 = string_Hex_to_Bin(str_5);
  str_6 = string_Hex_to_Bin(str_6);

  str_2 = str_2.charAt(0);
  str_4 = str_4.substring(0,2);
  str_6 = str_6.charAt(0);

  var str = str_1 + str_2 + str_3 + str_4 + str_5 + str_6;
  var str1 = '';
  str1 = string_Bin_to_Hex(str.substring(0,4)) + string_Bin_to_Hex(str.substring(4,8)) + string_Bin_to_Hex(str.substring(8,12)) + string_Bin_to_Hex(str.substring(12,16));
  str1 = parseInt(str1,16);
  var code = str1;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.arduino_st7735_set_text_screen_color = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_choose_type = this.getFieldValue('choose_type');
  var value_set_text_color_data = Blockly.Arduino.valueToCode(this, 'set_text_color_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.'+dropdown_choose_type+'('+value_set_text_color_data+');\n';
  return code;
};

//设置字体和字体背景颜色
Blockly.Arduino.arduino_st7735_set_text_background_color = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_set_text_color_data = Blockly.Arduino.valueToCode(this, 'set_text_color_data', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_text_color_background = Blockly.Arduino.valueToCode(this, 'set_text_color_background', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.setTextColor('+value_set_text_color_data+', '+value_set_text_color_background+');\n';
  return code;
};

//设置文本综合
Blockly.Arduino.arduino_st7735_set_text = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_set_text_x = Blockly.Arduino.valueToCode(this, 'set_text_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_text_y = Blockly.Arduino.valueToCode(this, 'set_text_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_text_color = Blockly.Arduino.valueToCode(this, 'set_text_color', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_background_color = Blockly.Arduino.valueToCode(this, 'set_background_color', Blockly.Arduino.ORDER_ATOMIC);
  var value_set_text_data = Blockly.Arduino.valueToCode(this, 'set_text_data', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_set_text_size = this.getFieldValue('set_text_size');
  var checkbox_set_text_linebreak = this.getFieldValue('set_text_linebreak') == 'TRUE';
  if(checkbox_set_text_linebreak)
  {
    checkbox_set_text_linebreak = 'println';
  }
  else
  {
    checkbox_set_text_linebreak = 'print';
  }
  var code = ''+text_st7735_name+'.setCursor('+value_set_text_x+', '+value_set_text_y+');\n'
              +''+text_st7735_name+'.setTextColor('+value_set_text_color+', '+value_set_background_color+');\n'
              +''+text_st7735_name+'.setTextSize('+dropdown_set_text_size+');\n'
              +''+text_st7735_name+'.'+checkbox_set_text_linebreak+'('+value_set_text_data+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_show_text = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_show_text_type = this.getFieldValue('show_text_type');
  var value_st7735_print_data = Blockly.Arduino.valueToCode(this, 'st7735_print_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.'+dropdown_show_text_type+'('+value_st7735_print_data+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_show_num = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_show_num_type = this.getFieldValue('show_num_type');
  var value_st7735_print_data = Blockly.Arduino.valueToCode(this, 'st7735_print_data', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_st7735_print_type = this.getFieldValue('st7735_print_type');
  var code = ''+text_st7735_name+'.'+dropdown_show_num_type+'('+value_st7735_print_data+', '+dropdown_st7735_print_type+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_pixel = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_st7735_draw_pixel_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.drawPixel('+value_st7735_draw_pixel_x+', '+value_st7735_draw_pixel_y+', '+value_st7735_draw_pixel_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_line = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_st7735_draw_pixel_start_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_start_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_start_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_start_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_end_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_end_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_end_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_end_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.drawLine('+value_st7735_draw_pixel_start_x+', '+value_st7735_draw_pixel_start_y+', '+value_st7735_draw_pixel_end_x+', '+value_st7735_draw_pixel_end_y+', '+value_st7735_draw_pixel_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_line1 = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_draw_line1_type = this.getFieldValue('st7735_draw_line1_type');
  var value_st7735_draw_pixel_start_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_start_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_start_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_start_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_length = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_length', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_pixel_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_pixel_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_st7735_name+'.'+dropdown_st7735_draw_line1_type+'('+value_st7735_draw_pixel_start_x+', '+value_st7735_draw_pixel_start_y+', '+value_st7735_draw_pixel_length+', '+value_st7735_draw_pixel_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_rect = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_draw_rect_type_1 = this.getFieldValue('st7735_draw_rect_type_1');
  var value_st7735_draw_rect_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_width = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_hight = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_hight', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name + '.' + dropdown_st7735_draw_rect_type_1 + 'Rect(' + value_st7735_draw_rect_x + ', ' + value_st7735_draw_rect_y + ', ' + value_st7735_draw_rect_width + ', ' + value_st7735_draw_rect_hight + ', ' + value_st7735_draw_rect_color + ');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_Roundrect = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_draw_rect_type_1 = this.getFieldValue('st7735_draw_rect_type_1');
  var value_st7735_draw_rect_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_width = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_hight = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_hight', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_rect_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_rect_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name + '.' + dropdown_st7735_draw_rect_type_1 + 'RoundRect(' + value_st7735_draw_rect_x + ', ' + value_st7735_draw_rect_y + ', ' + value_st7735_draw_rect_width + ', ' + value_st7735_draw_rect_hight + ', '+ value_st7735_draw_rect_radius + ', ' + value_st7735_draw_rect_color + ');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_circle = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_oled_draw_circle_type = this.getFieldValue('oled_draw_circle_type');
  var value_st7735_draw_circle_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name+'.'+dropdown_oled_draw_circle_type+'Circle('+value_st7735_draw_circle_x+', '+value_st7735_draw_circle_y+', '+value_st7735_draw_circle_radius+', '+value_st7735_draw_circle_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_CircleHelper = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_st7735_draw_circle_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_cornername = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_cornername', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name+'.startWrite('+');\n'
           + text_st7735_name+'.drawCircleHelper('+value_st7735_draw_circle_x+', '+value_st7735_draw_circle_y+', '+value_st7735_draw_circle_radius+', '+value_st7735_draw_circle_cornername+', '+value_st7735_draw_circle_color+');\n'
           + text_st7735_name+'.endWrite('+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_fill_CircleHelper = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var value_st7735_draw_circle_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_cornername = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_cornername', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_delta = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_delta', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_circle_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_circle_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name+'.startWrite('+');\n'
           + text_st7735_name+'.fillCircleHelper('+value_st7735_draw_circle_x+', '+value_st7735_draw_circle_y+', '+value_st7735_draw_circle_radius+', '+value_st7735_draw_circle_cornername+', '+value_st7735_draw_circle_delta+', '+value_st7735_draw_circle_color+');\n'
           + text_st7735_name+'.endWrite('+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_ellipse = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_draw_ellipse_type = this.getFieldValue('st7735_draw_ellipse_type');
  var value_st7735_draw_ellipse_x = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_ellipse_y = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_ellipse_x_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_x_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_ellipse_y_radius = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_y_radius', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_ellipse_cornername = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_cornername', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_ellipse_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_ellipse_color', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['function_draw_ellipse_section'] = 'void draw_ellipse_section(Adafruit_GFX_STM32 *screen, int16_t x, int16_t y, int16_t x0, int16_t y0, uint8_t option, boolean fill, uint16_t color){\n'
                                                                + '  /* upper left */\n'
                                                                + '  if (option & 0x01){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0-x, y0-y, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 - x, y0 - y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* upper right */\n'
                                                                + '  if (option & 0x02){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0+x, y0-y, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 + x, y0 - y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* lower right */\n'
                                                                + '  if (option & 0x04){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0+x, y0, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 + x, y0 + y, color);\n'
                                                                + '  }\n'
                                                                + '\n'
                                                                + '  /* lower left */\n'
                                                                + '  if (option & 0x08){\n'
                                                                + '    if(fill)\n'
                                                                + '      screen->drawFastVLine(x0-x, y0, y+1, color);\n'
                                                                + '    else\n'
                                                                + '      screen->drawPixel(x0 - x, y0 + y, color);\n'
                                                                + '  }\n'
                                                                + '}\n';
  Blockly.Arduino.definitions_['function_draw_ellipse'] = 'void draw_ellipse(Adafruit_GFX_STM32 *screen, int16_t x0, int16_t y0, int16_t rx, int16_t ry, uint8_t option, boolean fill, uint16_t color){\n'
                                                        + '  uint16_t x, y;\n'
                                                        + '  int32_t xchg, ychg;\n'
                                                        + '  int32_t err;\n'
                                                        + '  int32_t rxrx2;\n'
                                                        + '  int32_t ryry2;\n'
                                                        + '  int32_t stopx, stopy;\n'
                                                        + '\n'
                                                        + '  rxrx2 = rx;\n'
                                                        + '  rxrx2 *= rx;\n'
                                                        + '  rxrx2 *= 2;\n'
                                                        + '\n'
                                                        + '  ryry2 = ry;\n'
                                                        + '  ryry2 *= ry;\n'
                                                        + '  ryry2 *= 2;\n'
                                                        + '\n'
                                                        + '  x = rx;\n'
                                                        + '  y = 0;\n'
                                                        + '\n'
                                                        + '  xchg = 1;\n'
                                                        + '  xchg -= rx;\n'
                                                        + '  xchg -= rx;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '\n'
                                                        + '  ychg = rx;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '\n'
                                                        + '  err = 0;\n'
                                                        + '\n'
                                                        + '  stopx = ryry2;\n'
                                                        + '  stopx *= rx;\n'
                                                        + '  stopy = 0;\n'
                                                        + '\n'
                                                        + '  while( stopx >= stopy ){\n'
                                                        + '    draw_ellipse_section(screen, x, y, x0, y0, option, fill, color);\n'
                                                        + '    y++;\n'
                                                        + '    stopy += rxrx2;\n'
                                                        + '    err += ychg;\n'
                                                        + '    ychg += rxrx2;\n'
                                                        + '    if ( 2*err+xchg > 0 ){\n'
                                                        + '      x--;\n'
                                                        + '      stopx -= ryry2;\n'
                                                        + '      err += xchg;\n'
                                                        + '      xchg += ryry2;\n'
                                                        + '    }\n'
                                                        + '  }\n'
                                                        + '\n'
                                                        + '  x = 0;\n'
                                                        + '  y = ry;\n'
                                                        + '\n'
                                                        + '  xchg = ry;\n'
                                                        + '  xchg *= ry;\n'
                                                        + '\n'
                                                        + '  ychg = 1;\n'
                                                        + '  ychg -= ry;\n'
                                                        + '  ychg -= ry;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '  ychg *= rx;\n'
                                                        + '\n'
                                                        + '  err = 0;\n'
                                                        + '\n'
                                                        + '  stopx = 0;\n'
                                                        + '\n\n'
                                                        + '  stopy = rxrx2;\n'
                                                        + '  stopy *= ry;\n'
                                                        + '\n'
                                                        + '  while( stopx <= stopy ){\n'
                                                        + '    draw_ellipse_section(screen, x, y, x0, y0, option, fill, color);\n'
                                                        + '    x++;\n'
                                                        + '    stopx += ryry2;\n'
                                                        + '    err += xchg;\n'
                                                        + '    xchg += ryry2;\n'
                                                        + '    if ( 2*err+ychg > 0 ){\n'
                                                        + '      y--;\n'
                                                        + '      stopy -= rxrx2;\n'
                                                        + '      err += ychg;\n'
                                                        + '      ychg += rxrx2;\n'
                                                        + '    }\n'
                                                        + '  }\n'
                                                        + '}\n';
  var code = 'draw_ellipse(&'+text_st7735_name+', '+value_st7735_draw_ellipse_x+', '+value_st7735_draw_ellipse_y+', '+value_st7735_draw_ellipse_x_radius+', '+value_st7735_draw_ellipse_y_radius+', '+value_st7735_draw_ellipse_cornername+', '+dropdown_st7735_draw_ellipse_type+', '+value_st7735_draw_ellipse_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_triangle = function() {
  var text_st7735_name = this.getFieldValue('st7735_name');
  var dropdown_st7735_draw_triangle_type = this.getFieldValue('st7735_draw_triangle_type');
  var value_st7735_draw_triangle_x1 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_x1', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_y1 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_y1', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_x2 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_x2', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_y2 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_y2', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_x3 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_x3', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_y3 = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_y3', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_draw_triangle_color = Blockly.Arduino.valueToCode(this, 'st7735_draw_triangle_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_st7735_name+'.'+dropdown_st7735_draw_triangle_type+'Triangle('+value_st7735_draw_triangle_x1+', '+value_st7735_draw_triangle_y1+', '+value_st7735_draw_triangle_x2+', '+value_st7735_draw_triangle_y2+', '+value_st7735_draw_triangle_x3+', '+value_st7735_draw_triangle_y3+', '+value_st7735_draw_triangle_color+');\n';
  return code;
};

Blockly.Arduino.arduino_st7735_draw_bitmap = function() {
  var text_oled_name = this.getFieldValue('oled_name');
  var value_oled_draw_bitmap_x = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_x', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_y = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_y', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_data = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_data', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_width = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_width', Blockly.Arduino.ORDER_ATOMIC);
  var value_oled_draw_bitmap_height = Blockly.Arduino.valueToCode(this, 'oled_draw_bitmap_height', Blockly.Arduino.ORDER_ATOMIC);
  var value_st7735_color = Blockly.Arduino.valueToCode(this, 'st7735_color', Blockly.Arduino.ORDER_ATOMIC);
  var code = text_oled_name+'.drawBitmap('+value_oled_draw_bitmap_x+', '+value_oled_draw_bitmap_y+', '+value_oled_draw_bitmap_data+', '+value_oled_draw_bitmap_width+', '+value_oled_draw_bitmap_height+', '+value_st7735_color+');\n';
  return code;
};