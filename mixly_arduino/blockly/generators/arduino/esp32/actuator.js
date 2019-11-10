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

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
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

Blockly.Arduino.controls_tone=function(){
   var TONE_NOTE = Blockly.Arduino.valueToCode(this, 'TONE_NOTE',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var OCTAVE = Blockly.Arduino.valueToCode(this, 'OCTAVE',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = "ledcWriteNote("+channel+","+TONE_NOTE+","+OCTAVE+");\n";
  return code;
};

Blockly.Arduino.controls_notone=function(){
   var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = "ledcWrite("+channel+",0);\n";
   return code;
};

//执行器-电机转动
Blockly.Arduino.Mixly_motor = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['include_analogWrite'] = '#include <analogWrite.h>';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName= 'setMotor';
  var code2 =' void '+funcName+'(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  } \n else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, speed);  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
