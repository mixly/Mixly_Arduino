'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');

Blockly.Arduino.mixgo_button_is_pressed = function(){
 var btn = this.getFieldValue('PIN');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code =  'digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_light= Blockly.Arduino.sensor_light;

Blockly.Arduino.sensor_mixgo_sound=Blockly.Arduino.sensor_sound; 

Blockly.Arduino.mixgo_touch_pin = function(){
  var touch_pin = this.getFieldValue('touch_pin');
  var code = 'touchRead('+touch_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_light = function(){
  var direction = this.getFieldValue('direction');
  var code = 'analogRead('+ direction +')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Blocks.sensor_button_is_pressed=Blockly.Blocks.mixgo_button_is_pressed;
Blockly.Blocks.sensor_button_was_pressed=Blockly.Blocks.sensor_mixgo_button_was_pressed;
Blockly.Blocks.sensor_button_get_presses=Blockly.Blocks.sensor_mixgo_button_get_presses;
Blockly.Blocks.sensor_pin_pressed=Blockly.Blocks.sensor_mixgo_pin_pressed;
Blockly.Blocks.sensor_pin_near=Blockly.Blocks.sensor_mixgo_pin_near;
Blockly.Blocks.sensor_light=Blockly.Blocks.sensor_mixgo_light;
Blockly.Blocks.sensor_sound=Blockly.Blocks.sensor_mixgo_sound;

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
Blockly.Arduino.NTC_TEMP = function () {
  var PIN = 34;
  var NominalResistance= 10000;
  var betaCoefficient= 3380;
  var seriesResistor= 10000;
  Blockly.Arduino.definitions_['include_thermistor'] = '#include <thermistor.h>';
  Blockly.Arduino.definitions_['var_declare_thermistor'+PIN] = 'THERMISTOR thermistor'+PIN+'(' + PIN + ',' + NominalResistance+","+betaCoefficient+","+seriesResistor+");";
  var code = 'thermistor'+PIN+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}