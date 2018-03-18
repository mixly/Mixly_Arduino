'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');



Blockly.Arduino.servo_move = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = ""; 
   if(window.isNaN(dropdown_pin)){
      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "tone("+dropdown_pin+","+fre+");\n";
   return code;
};

Blockly.Arduino.controls_tone2=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = ""; 
   if(window.isNaN(dropdown_pin)){
      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "tone("+dropdown_pin+","+fre+","+dur+");\n";
   return code;
};

Blockly.Arduino.controls_notone=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var code='';
   if(window.isNaN(dropdown_pin)){
     code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
     Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "noTone("+dropdown_pin+");\n";
   return code;
};


Blockly.Arduino.group_stepper_setup = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_setup2 = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+','+dropdown_pin3+','+dropdown_pin4+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_move = function () {
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var step = Blockly.Arduino.valueToCode(this, 'step', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
    return varName + '.step(' + step + ');\n';
};
