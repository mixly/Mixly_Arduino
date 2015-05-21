'use strict';

goog.provide('Blockly.Arduino.seeed');

goog.require('Blockly.Arduino');

Blockly.Arduino.seeed_led = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.seeed_buzzer = Blockly.Arduino.seeed_led;
Blockly.Arduino.seeed_relay = Blockly.Arduino.seeed_led;

Blockly.Arduino.seeed_btn = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.seeed_tilt = Blockly.Arduino.seeed_btn;

Blockly.Arduino.seeed_rotation = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.seeed_sound = Blockly.Arduino.seeed_rotation;