'use strict';

goog.provide('Blockly.Python.display');
goog.require('Blockly.Python');

Blockly.Python['microbit_display_clear'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var code = 'display.clear()\n';
  return code;
};

Blockly.Python['monitor_get_pixel'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.get_pixel(int(' + value_x + '), int(' + value_y + '))';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_display_set_pixel'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.set_pixel(int(' + value_x + '), int(' + value_y + '), ' + value_value + ')\n';
  return code;
};
Blockly.Python.monitor_bright_point= function() {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ASSIGNMENT);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ASSIGNMENT);
    var brightness = Blockly.Python.valueToCode(this, 'brightness', Blockly.Python.ORDER_ASSIGNMENT);
    var code = 'display.set_pixel(int(' + x + '), int(' + y + '), '+ brightness + ")\n";
    return code;
}
Blockly.Python.monitor_show_string = function() {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "display.show("+ data +")\n";
    return code;
}

Blockly.Python.monitor_scroll_string = function() {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "display.scroll("+ data +")\n";
    return code;
} 

Blockly.Python.microbit_display_show_image = function() {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_image = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.show(' + value_image  + ')\n';
  return code;
}

Blockly.Python['microbit_display_show_default_image'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var dropdown_image = block.getFieldValue('image');
  var value_image = 'Image.' + dropdown_image;
  var code = 'display.show(' + value_image + ')\n';
  return code;
};

Blockly.Python['microbit_display_show_animation'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_images = Blockly.Python.valueToCode(block, 'images', Blockly.Python.ORDER_MEMBER);
  var number_delay = Blockly.Python.valueToCode(block, 'delay', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var checkbox_clear = block.getFieldValue('clear') == 'TRUE' ? 'True' : 'False';
  var code = 'display.show(' + value_images + ', delay=' + number_delay + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ', clear=' + checkbox_clear + ')\n';
  return code;
};
Blockly.Python['microbit_display_scroll'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_message = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);
  var code = 'display.scroll(' + value_message + ')\n';
  return code;
};
Blockly.Python['microbit_display_on'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var code = 'display.on()\n';
  return code;
};

Blockly.Python['microbit_display_off'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var code = 'display.off()\n';
  return code;
};
Blockly.Python['microbit_display_is_on'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var code = 'display.is_on()';
  return [code, Blockly.Python.ORDER_MEMBER];
};
Blockly.Python['microbit_image_builtins'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var dropdown_image = block.getFieldValue('image');
  var code = 'Image.' + dropdown_image;
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_copy'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_image = Blockly.Python.valueToCode(block, 'image', Blockly.Python.ORDER_MEMBER);
  var code = value_image + '.copy()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_invert'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var value_image = Blockly.Python.valueToCode(block, 'image', Blockly.Python.ORDER_MEMBER);
  var code = value_image + '.invert()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['microbit_image_create'] = function(block) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var colours = {
    "#000000": "0",
    "#440000": "1",
    "#660000": "2",
    "#880000": "3",
    "#aa0000": "4",
    "#bb0000": "5",
    "#cc0000": "6",
    "#dd0000": "7",
    "#ee0000": "8",
    "#ff0000": "9"
  }
  var colour_00 = colours[block.getFieldValue('00')];
  var colour_01 = colours[block.getFieldValue('01')];
  var colour_02 = colours[block.getFieldValue('02')];
  var colour_03 = colours[block.getFieldValue('03')];
  var colour_04 = colours[block.getFieldValue('04')];
  var colour_10 = colours[block.getFieldValue('10')];
  var colour_11 = colours[block.getFieldValue('11')];
  var colour_12 = colours[block.getFieldValue('12')];
  var colour_13 = colours[block.getFieldValue('13')];
  var colour_14 = colours[block.getFieldValue('14')];
  var colour_20 = colours[block.getFieldValue('20')];
  var colour_21 = colours[block.getFieldValue('21')];
  var colour_22 = colours[block.getFieldValue('22')];
  var colour_23 = colours[block.getFieldValue('23')];
  var colour_24 = colours[block.getFieldValue('24')];
  var colour_30 = colours[block.getFieldValue('30')];
  var colour_31 = colours[block.getFieldValue('31')];
  var colour_32 = colours[block.getFieldValue('32')];
  var colour_33 = colours[block.getFieldValue('33')];
  var colour_34 = colours[block.getFieldValue('34')];
  var colour_40 = colours[block.getFieldValue('40')];
  var colour_41 = colours[block.getFieldValue('41')];
  var colour_42 = colours[block.getFieldValue('42')];
  var colour_43 = colours[block.getFieldValue('43')];
  var colour_44 = colours[block.getFieldValue('44')];
  var code = 'Image("' + colour_00 + colour_01 + colour_02 + colour_03 + colour_04 + ':' + colour_10 + colour_11 + colour_12 + colour_13 + colour_14 + ':' + colour_20 + colour_21 + colour_22 + colour_23 + colour_24 + ':' + colour_30 + colour_31 + colour_32 + colour_33 + colour_34 + ':' + colour_40 + colour_41 + colour_42 + colour_43 + colour_44 + '")';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
    Blockly.Python.definitions_['define_neopixel'] = 'import neopixel';
    // Blockly.Python.definitions_['include_display'] = '#include "Mixly.h"';
    Blockly.Python.setups_['var_rgb_display' + dropdown_rgbpin] = 'np = neopixel.NeoPixel(pin' + dropdown_rgbpin +  ', ' + value_ledcount + ');';
    // Blockly.Python.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    // Blockly.Python.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Python.display_rgb=function(){

  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  Blockly.Python.definitions_['define_neopixel'] = 'import neopixel';
  
  var code = 'np['+value_led+'-1] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  code+='np.show()\n';
  return code;
};

Blockly.Python.display_rgb2=function(){

  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  Blockly.Python.definitions_['define_neopixel'] = 'import neopixel';

  var code = 'np['+value_led+'-1] = ('+color+')\n';
  code+='np.show()\n';
  return code;
};

Blockly.Python['image_shift'] = function(a) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
  var op = a.getFieldValue("OP");
  var image = Blockly.Python.valueToCode(a, 'img', Blockly.Python.ORDER_MEMBER);
  var value = Blockly.Python.valueToCode(a, 'val', Blockly.Python.ORDER_MEMBER);
  var code = image + '.shift_' + op + '(' + value + ')';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['image_arithmetic'] = function(a) {
  Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
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


