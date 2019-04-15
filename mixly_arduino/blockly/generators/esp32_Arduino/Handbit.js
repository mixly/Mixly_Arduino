'use strict';

goog.provide('Blockly.Arduino.Handbit');

goog.require('Blockly.Arduino');

Blockly.Arduino.oled_init = function() {
  var CLK = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
  var DIN = Blockly.Arduino.valueToCode(this, 'DIN', Blockly.Arduino.ORDER_ATOMIC);
  var DC = Blockly.Arduino.valueToCode(this, 'DC', Blockly.Arduino.ORDER_ATOMIC);
  var CS1 = Blockly.Arduino.valueToCode(this, 'CS1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_U8g2lib'] = '#include <U8g2lib.h>';
  Blockly.Arduino.definitions_['var_declare_U8G2'] ='U8G2_SH1106_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, SCL, SDA, U8X8_PIN_NONE);';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  var oled_setup = "u8g2.begin();";
  Blockly.Arduino.setups_['setup_setup'] = oled_setup;
  var code = '';
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
 var code =  'digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_light= function(){
  return ['analogRead(39)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.handbit_sound= function(){
  return ['analogRead(36)', Blockly.Arduino.ORDER_ATOMIC];
};