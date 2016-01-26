'use strict';
goog.provide('Blockly.Arduino.luxerobot');
goog.require('Blockly.Arduino');

Blockly.Arduino.luxerobot_on_off = function() {
  var code = this.getTitleValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.luxerobot_led_select=Blockly.Arduino.luxerobot_on_off;
Blockly.Arduino.luxerobot_motor_select=Blockly.Arduino.luxerobot_on_off;
Blockly.Arduino.luxerobot_motor_dir=Blockly.Arduino.luxerobot_on_off;
Blockly.Arduino.luxerobot_notes=Blockly.Arduino.luxerobot_on_off;

Blockly.Arduino.luxerobot_led = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  var code = dropdown_pin+"."+dropdown_stat+"();\n";
  return code;
};

Blockly.Arduino.luxerobot_led_change = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = dropdown_pin+".change();\n";
  return code;
};

Blockly.Arduino.luxerobot_motor = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_pin+'.setSpeed('+value_num+');\n';
  return code;
};

Blockly.Arduino.luxerobot_motor2 = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  var code = dropdown_pin+'.setDirection('+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.luxerobot_motor_change_dir = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = dropdown_pin+'.changeDirection();\n'
  return code;
};

Blockly.Arduino.luxerobot_motor_stop = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var code = dropdown_pin+'.stop();\n'
  return code;
};

Blockly.Arduino.luxerobot_speaker_play = function() {
  var note = Blockly.Arduino.valueToCode(this, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'speaker.play('+note+');\n'
  return code;
};

Blockly.Arduino.luxerobot_speaker_play_duration = function() {
  var note = Blockly.Arduino.valueToCode(this, 'NOTE', Blockly.Arduino.ORDER_ATOMIC);
  var value_num = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'speaker.play('+note+','+value_num+');\n'
  return code;
};

Blockly.Arduino.luxerobot_speaker_nosound = function() {
  return 'speaker.noPlay();\n';
};