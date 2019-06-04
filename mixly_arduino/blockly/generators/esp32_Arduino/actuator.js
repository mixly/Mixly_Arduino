'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');



Blockly.Arduino.servo_move = function() {
 var dropdown_pin = this.getFieldValue('PIN');
 var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
 var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0' 
 Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
 Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
 Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+',500,2500);';
 
 var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
 return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.channel_select = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone=function(){
  Blockly.Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var duration = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var channle = Blockly.Arduino.valueToCode(this, 'CHANNEL',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code += "tone("+dropdown_pin+","+fre+","+duration+","+channle+");\n";
  return code;
};
Blockly.Arduino.controls_notone=function(){
 var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
 var channle = Blockly.Arduino.valueToCode(this, 'CHANNEL',
  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
 var code='';
 code += "noTone("+dropdown_pin+");\n";
 return code;
};
