'use strict';

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');

Blockly.Python['microbit_display_clear'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var code = 'display.clear()\n';
  return code;
};

Blockly.Python['monitor_get_pixel'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.get_pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_display_set_pixel'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.set_pixel(int(' + value_x + '), int(' + value_y + '), ' + value_value + ')\n';
  return code;
};
Blockly.Python.monitor_bright_point= function() {
    Blockly.Python.definitions_['import_display_*'] = 'from display import *';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var flag = this.getFieldValue('flag');
    var code = 'display.set_pixel(int(' + x + '), int(' + y + '), '+ flag + ")\n";
    return code;
}
Blockly.Python.monitor_show_string = function() {
    Blockly.Python.definitions_['import_display_*'] = 'from display import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var mode = this.getFieldValue('MODE');
    var code = "display." + mode + "(" + data + ")\n";
    return code;
}

Blockly.Python.monitor_show_scroll_string = function() {
    Blockly.Python.definitions_['import_display_*'] = 'from display import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ASSIGNMENT);
    var mode = this.getFieldValue('MODE');
    if(time==120){
      var code = "display." + mode + "(" + data + ")\n";
    }else{
      var code = "display." + mode + "(" + data + ", " + time + ")\n";
    }
    return code;
}

// Blockly.Python.monitor_scroll_string = function() {
//     Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//     var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
//     var code = "display.scroll("+ data +")\n";
//     return code;
// }

Blockly.Python.microbit_display_show_image = function() {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_image = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.show(' + value_image  + ')\n';
  return code;
}

Blockly.Python['microbit_display_show_default_image'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from microbit import *';
  var dropdown_image = block.getFieldValue('image');
  var value_image = 'Image.' + dropdown_image;
  var code = 'display.show(' + value_image + ')\n';
  return code;
};

Blockly.Python['microbit_display_show_animation'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from microbit import *';
  var value_images = Blockly.Python.valueToCode(block, 'images', Blockly.Python.ORDER_MEMBER);
  var number_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
  var code = 'display.show(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
  return code;
};
Blockly.Python['microbit_display_scroll'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from microbit import *';
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.scroll(' + value_message + ')\n';
  return code;
};
Blockly.Python['microbit_display_on'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from microbit import *';
  var mode = block.getFieldValue('on_off');
  var code = 'display.' + mode + '()\n';
  return code;
};

// Blockly.Python['microbit_display_off'] = function(block) {
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   var code = 'display.off()\n';
//   return code;
// };
Blockly.Python['microbit_display_is_on'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var code = 'display.is_on()';
  return [code, Blockly.Python.ORDER_MEMBER];
};
Blockly.Python['microbit_image_builtins'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var dropdown_image = block.getFieldValue('image');
  var code = 'Image.' + dropdown_image;
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_copy'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_image = Blockly.Python.valueToCode(block, 'image', Blockly.Python.ORDER_MEMBER);
  var code = value_image + '.copy()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_invert'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_image = Blockly.Python.valueToCode(block, 'image', Blockly.Python.ORDER_MEMBER);
  var code = value_image + '.invert()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_create'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var colours = {
    "#000000": "0",
    //"#440000": "1",
    //"#660000": "2",
    //"#880000": "3",
    //"#aa0000": "4",
    //"#bb0000": "5",
    //"#cc0000": "6",
    //"#dd0000": "7",
    //"#ee0000": "8",
    "#ff0000": "1"
  }
var colour_00=colours[block.getFieldValue("00")];
var colour_01=colours[block.getFieldValue("01")];
var colour_02=colours[block.getFieldValue("02")];
var colour_03=colours[block.getFieldValue("03")];
var colour_04=colours[block.getFieldValue("04")];
var colour_05=colours[block.getFieldValue("05")];
var colour_06=colours[block.getFieldValue("06")];
var colour_07=colours[block.getFieldValue("07")];
var colour_08=colours[block.getFieldValue("08")];
var colour_09=colours[block.getFieldValue("09")];
var colour_0a=colours[block.getFieldValue("0a")];
var colour_0b=colours[block.getFieldValue("0b")];
var colour_0c=colours[block.getFieldValue("0c")];
var colour_0d=colours[block.getFieldValue("0d")];
var colour_0e=colours[block.getFieldValue("0e")];
var colour_0f=colours[block.getFieldValue("0f")];
var colour_10=colours[block.getFieldValue("10")];
var colour_11=colours[block.getFieldValue("11")];
var colour_12=colours[block.getFieldValue("12")];
var colour_13=colours[block.getFieldValue("13")];
var colour_14=colours[block.getFieldValue("14")];
var colour_15=colours[block.getFieldValue("15")];
var colour_16=colours[block.getFieldValue("16")];
var colour_17=colours[block.getFieldValue("17")];
var colour_18=colours[block.getFieldValue("18")];
var colour_19=colours[block.getFieldValue("19")];
var colour_1a=colours[block.getFieldValue("1a")];
var colour_1b=colours[block.getFieldValue("1b")];
var colour_1c=colours[block.getFieldValue("1c")];
var colour_1d=colours[block.getFieldValue("1d")];
var colour_1e=colours[block.getFieldValue("1e")];
var colour_1f=colours[block.getFieldValue("1f")];
var colour_20=colours[block.getFieldValue("20")];
var colour_21=colours[block.getFieldValue("21")];
var colour_22=colours[block.getFieldValue("22")];
var colour_23=colours[block.getFieldValue("23")];
var colour_24=colours[block.getFieldValue("24")];
var colour_25=colours[block.getFieldValue("25")];
var colour_26=colours[block.getFieldValue("26")];
var colour_27=colours[block.getFieldValue("27")];
var colour_28=colours[block.getFieldValue("28")];
var colour_29=colours[block.getFieldValue("29")];
var colour_2a=colours[block.getFieldValue("2a")];
var colour_2b=colours[block.getFieldValue("2b")];
var colour_2c=colours[block.getFieldValue("2c")];
var colour_2d=colours[block.getFieldValue("2d")];
var colour_2e=colours[block.getFieldValue("2e")];
var colour_2f=colours[block.getFieldValue("2f")];
var colour_30=colours[block.getFieldValue("30")];
var colour_31=colours[block.getFieldValue("31")];
var colour_32=colours[block.getFieldValue("32")];
var colour_33=colours[block.getFieldValue("33")];
var colour_34=colours[block.getFieldValue("34")];
var colour_35=colours[block.getFieldValue("35")];
var colour_36=colours[block.getFieldValue("36")];
var colour_37=colours[block.getFieldValue("37")];
var colour_38=colours[block.getFieldValue("38")];
var colour_39=colours[block.getFieldValue("39")];
var colour_3a=colours[block.getFieldValue("3a")];
var colour_3b=colours[block.getFieldValue("3b")];
var colour_3c=colours[block.getFieldValue("3c")];
var colour_3d=colours[block.getFieldValue("3d")];
var colour_3e=colours[block.getFieldValue("3e")];
var colour_3f=colours[block.getFieldValue("3f")];
var colour_40=colours[block.getFieldValue("40")];
var colour_41=colours[block.getFieldValue("41")];
var colour_42=colours[block.getFieldValue("42")];
var colour_43=colours[block.getFieldValue("43")];
var colour_44=colours[block.getFieldValue("44")];
var colour_45=colours[block.getFieldValue("45")];
var colour_46=colours[block.getFieldValue("46")];
var colour_47=colours[block.getFieldValue("47")];
var colour_48=colours[block.getFieldValue("48")];
var colour_49=colours[block.getFieldValue("49")];
var colour_4a=colours[block.getFieldValue("4a")];
var colour_4b=colours[block.getFieldValue("4b")];
var colour_4c=colours[block.getFieldValue("4c")];
var colour_4d=colours[block.getFieldValue("4d")];
var colour_4e=colours[block.getFieldValue("4e")];
var colour_4f=colours[block.getFieldValue("4f")];
var colour_50=colours[block.getFieldValue("50")];
var colour_51=colours[block.getFieldValue("51")];
var colour_52=colours[block.getFieldValue("52")];
var colour_53=colours[block.getFieldValue("53")];
var colour_54=colours[block.getFieldValue("54")];
var colour_55=colours[block.getFieldValue("55")];
var colour_56=colours[block.getFieldValue("56")];
var colour_57=colours[block.getFieldValue("57")];
var colour_58=colours[block.getFieldValue("58")];
var colour_59=colours[block.getFieldValue("59")];
var colour_5a=colours[block.getFieldValue("5a")];
var colour_5b=colours[block.getFieldValue("5b")];
var colour_5c=colours[block.getFieldValue("5c")];
var colour_5d=colours[block.getFieldValue("5d")];
var colour_5e=colours[block.getFieldValue("5e")];
var colour_5f=colours[block.getFieldValue("5f")];
var colour_60=colours[block.getFieldValue("60")];
var colour_61=colours[block.getFieldValue("61")];
var colour_62=colours[block.getFieldValue("62")];
var colour_63=colours[block.getFieldValue("63")];
var colour_64=colours[block.getFieldValue("64")];
var colour_65=colours[block.getFieldValue("65")];
var colour_66=colours[block.getFieldValue("66")];
var colour_67=colours[block.getFieldValue("67")];
var colour_68=colours[block.getFieldValue("68")];
var colour_69=colours[block.getFieldValue("69")];
var colour_6a=colours[block.getFieldValue("6a")];
var colour_6b=colours[block.getFieldValue("6b")];
var colour_6c=colours[block.getFieldValue("6c")];
var colour_6d=colours[block.getFieldValue("6d")];
var colour_6e=colours[block.getFieldValue("6e")];
var colour_6f=colours[block.getFieldValue("6f")];
var colour_70=colours[block.getFieldValue("70")];
var colour_71=colours[block.getFieldValue("71")];
var colour_72=colours[block.getFieldValue("72")];
var colour_73=colours[block.getFieldValue("73")];
var colour_74=colours[block.getFieldValue("74")];
var colour_75=colours[block.getFieldValue("75")];
var colour_76=colours[block.getFieldValue("76")];
var colour_77=colours[block.getFieldValue("77")];
var colour_78=colours[block.getFieldValue("78")];
var colour_79=colours[block.getFieldValue("79")];
var colour_7a=colours[block.getFieldValue("7a")];
var colour_7b=colours[block.getFieldValue("7b")];
var colour_7c=colours[block.getFieldValue("7c")];
var colour_7d=colours[block.getFieldValue("7d")];
var colour_7e=colours[block.getFieldValue("7e")];
var colour_7f=colours[block.getFieldValue("7f")];
var code = 'Image("'+ colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + colour_05 + colour_06 + colour_07 + colour_08 + colour_09 + colour_0a + colour_0b + colour_0c + colour_0d + colour_0e + colour_0f+':'+ colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + colour_15 + colour_16 + colour_17 + colour_18 + colour_19 + colour_1a + colour_1b + colour_1c + colour_1d + colour_1e + colour_1f+':'+ colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + colour_25 + colour_26 + colour_27 + colour_28 + colour_29 + colour_2a + colour_2b + colour_2c + colour_2d + colour_2e + colour_2f+':'+ colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + colour_35 + colour_36 + colour_37 + colour_38 + colour_39 + colour_3a + colour_3b + colour_3c + colour_3d + colour_3e + colour_3f+':'+ colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + colour_45 + colour_46 + colour_47 + colour_48 + colour_49 + colour_4a + colour_4b + colour_4c + colour_4d + colour_4e + colour_4f+':'+ colour_50 + colour_51 + colour_52 + colour_53 + colour_54 + colour_55 + colour_56 + colour_57 + colour_58 + colour_59 + colour_5a + colour_5b + colour_5c + colour_5d + colour_5e + colour_5f+':'+ colour_60 + colour_61 + colour_62 + colour_63 + colour_64 + colour_65 + colour_66 + colour_67 + colour_68 + colour_69 + colour_6a + colour_6b + colour_6c + colour_6d + colour_6e + colour_6f+':'+ colour_70 + colour_71 + colour_72 + colour_73 + colour_74 + colour_75 + colour_76 + colour_77 + colour_78 + colour_79 + colour_7a + colour_7b + colour_7c + colour_7d + colour_7e + colour_7f+'")';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
    Blockly.Python.definitions_['import_neopixel_*'] = 'from neopixel import *';
    // Blockly.Python.definitions_['include_display'] = '#include "Mixly.h"';
    var code = 'np = NeoPixel(Pin('+dropdown_rgbpin+'), '+value_ledcount+')\n';
    // Blockly.Python.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    // Blockly.Python.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return code;
};
Blockly.Python.display_rgb=function(){
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  Blockly.Python.definitions_['import_neopixel_*'] = 'from neopixel import *';
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  //Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
  //Blockly.Python.definitions_['import_neopixel_NeoPixel'] = 'from neopixel import NeoPixel';
  var code = 'np['+value_led+'-1] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  code+='np.write()\n';
  return code;
};

Blockly.Python.display_rgb2=function(){
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  Blockly.Python.definitions_['import_neopixel_*'] = 'from neopixel import *';
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  //Blockly.Python.definitions_['import_machine_Pin'] = 'from machine import Pin';
  //Blockly.Python.definitions_['import_neopixel_NeoPixel'] = 'from neopixel import NeoPixel';

  var code = 'np['+value_led+'-1] = ('+color+')\n';
  code+='np.write()\n';
  return code;
};

Blockly.Python['image_shift'] = function(a) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var op = a.getFieldValue("OP");
  var image = Blockly.Python.valueToCode(a, 'img', Blockly.Python.ORDER_MEMBER);
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_MEMBER);
  var code = image + '.shift_' + op + '(' + value + ')';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['image_arithmetic'] = function(a) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var op = a.getFieldValue("OP");
  var imga = Blockly.Python.valueToCode(a, 'A', Blockly.Python.ORDER_MEMBER);
  var imgb = Blockly.Python.valueToCode(a, 'B', Blockly.Python.ORDER_MEMBER);
  if (op=='INTERSECTION') {
    var code = imga + '-(' + imga + '-' + imgb +')';
  }
  else{
    var code = imga + op + imgb;
  }
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_display_show_string'] = function(block) {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var value_images = Blockly.Python.valueToCode(block, 'images', Blockly.Python.ORDER_MEMBER) || 'hello';
  var number_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
  var mode = block.getFieldValue('MODE');
  var code = 'display.'+mode+'(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
  return code;
};

// Blockly.Python['microbit_display_scroll_string'] = function(block) {
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   var value_images = Blockly.Python.valueToCode(block, 'images', Blockly.Python.ORDER_MEMBER) || 'hello';
//   var number_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
//   var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
//   var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
//   var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
//   var code = 'display.show(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
//   return code;
// };

Blockly.Python.group_lcd_print = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var str1 = Blockly.Python.valueToCode(this, 'TEXT', Blockly.Python.ORDER_ASSIGNMENT);
  var str2 = Blockly.Python.valueToCode(this, 'TEXT2', Blockly.Python.ORDER_ASSIGNMENT);
  Blockly.Python.setups_['class_LCD1602'] = Blockly.Python.CLASS_LCD1602_INIT;//python.js
  var code = 'mylcd.puts(str('+str1+'), 0, 0)\n' + 'mylcd.puts(str('+str2+'), 0, 1)\n';
  return code;
};

Blockly.Python.group_lcd_init = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var device = Blockly.Python.valueToCode(this, 'device', Blockly.Python.ORDER_ASSIGNMENT) || '0x27';
  Blockly.Python.setups_['class_LCD1602'] = Blockly.Python.CLASS_LCD1602_INIT;//python.js
  return 'LCD_I2C_ADDR = ' + device + '\n' + 'mylcd = LCD1602()\n';
};

Blockly.Python.group_lcd_print2 = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var str = Blockly.Python.valueToCode(this, 'TEXT', Blockly.Python.ORDER_ASSIGNMENT) || 'String(\"\")';
  var row = Blockly.Python.valueToCode(this, 'row', Blockly.Python.ORDER_ASSIGNMENT) || '1';
  var column = Blockly.Python.valueToCode(this, 'column', Blockly.Python.ORDER_ASSIGNMENT) || '1';
  Blockly.Python.setups_['class_LCD1602'] = Blockly.Python.CLASS_LCD1602_INIT;//python.js
  var code = 'mylcd.puts(str('+str+'), '+column+'-1, '+row+'-1)\n'
  return code;
};

Blockly.Python.group_lcd_power = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var dropdown_stat = this.getFieldValue('STAT');
  var code = 'mylcd.'+dropdown_stat+'\n';
  return code;
};

Blockly.Python.oled_init = function () {
  Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var freq = Blockly.Python.valueToCode(this, 'freq', Blockly.Python.ORDER_ATOMIC);
  var code = varName+" = SSD1306_I2C(128,64,I2C(scl=Pin(" + dropdown_pin2 + "), sda=Pin(" + dropdown_pin1 + "), freq=" + freq + "))\n";
  return code;  
};

Blockly.Python.lp2i_u8g_draw_4strings = function(){
   Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
   var value_text_line1 = Blockly.Python.valueToCode(this, 'Text_line1', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
   var value_text_line2 = Blockly.Python.valueToCode(this, 'Text_line2', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
   var value_text_line3 = Blockly.Python.valueToCode(this, 'Text_line3', Blockly.Python.ORDER_ASSIGNMENT) || '\'\'';
   var value_text_line4 = Blockly.Python.valueToCode(this, 'Text_line4', Blockly.Python.ORDER_ASSIGNMENT) || '\'\''; 
 //  Blockly.Python.setups_["class_SSD1306_I2C"] = Blockly.Python.CLASS_SSD1306oled_INIT;
   var code = varName + '.show_str(' + value_text_line1 +',' +value_text_line2 +','+ value_text_line3 +','+ value_text_line4 + ')\n'
   return code;
};

Blockly.Python['display_image_size'] = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  var data = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var size  = this.getFieldValue('OP');
  var code = "image."+size+"("+data+")\n";
  return code;
};

Blockly.Python.display_rect=function(){
   Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(this, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(this, 'height', Blockly.Python.ORDER_ATOMIC);
  var checkbox_fill = this.getFieldValue("fill") == 'TRUE' ? 'True' : 'False';
  var size  = this.getFieldValue('OP');
  //Blockly.Python.setups_["class_SSD1306_I2C"] = Blockly.Python.CLASS_SSD1306oled_INIT;
  switch (checkbox_fill) {
    case "True":
       var code = varName + '.show_fill_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
  
       return code;
       break;
    case "False":
       var code = varName +'.show_rect('+location_x+', '+location_y+', '+value_width+', '+value_height+','+ size+')\n';
 
       return code;
       break;
     }
};

Blockly.Python.display_line=function(){
   Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var location_x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
  var location_y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_length = Blockly.Python.valueToCode(this, 'length', Blockly.Python.ORDER_ATOMIC);
  var value_direction = this.getFieldValue("direction");
  //Blockly.Python.setups_["class_SSD1306_I2C"] = Blockly.Python.CLASS_SSD1306oled_INIT;
  var code = varName + '.show_'+value_direction+'('+location_x+', '+location_y+', '+value_length+', 1)\n';
  //code+='lcd.show()\n';
       return code;
};

Blockly.Python.display_line_Arbitrarily=function(){
   Blockly.Python.definitions_['import_ESP32_*'] = 'from ESP32 import *';
   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var location_x1 = Blockly.Python.valueToCode(this, 'x1', Blockly.Python.ORDER_ATOMIC);
  var location_y1= Blockly.Python.valueToCode(this, 'y1', Blockly.Python.ORDER_ATOMIC);
  var location_x2 = Blockly.Python.valueToCode(this, 'x2', Blockly.Python.ORDER_ATOMIC);
  var location_y2= Blockly.Python.valueToCode(this, 'y2', Blockly.Python.ORDER_ATOMIC);
  //Blockly.Python.setups_["class_SSD1306_I2C"] = Blockly.Python.CLASS_SSD1306oled_INIT;
  var code = varName + '.show_line('+location_x1+', '+location_y1+', '+location_x2+', '+location_y2+', 1)\n';
  //code+='lcd.show()\n';
       return code;
};

Blockly.Python['monitor_get_screen_pixel'] = function() {
  Blockly.Python.definitions_['import_display_*'] = 'from display import *';
  var code = 'display.get_brightness()';
  return [code, Blockly.Python.ORDER_MEMBER];
};


Blockly.Python.monitor_bright_screen= function() {
    Blockly.Python.definitions_['import_display_*'] = 'from display import *';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'display.set_brightness(' + x + ')\n';
    return code;
};

Blockly.Python.monitor_blink_rate= function() {
    Blockly.Python.definitions_['import_display_*'] = 'from display import *';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'display.blink_rate(' + x + ')\n';
    return code;
}