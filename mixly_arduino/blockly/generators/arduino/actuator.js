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

//执行器-蜂鸣器
Blockly.Arduino.controls_tone = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <NewTone.h>';
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewTone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
  return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.controls_notone = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewNoTone(" + dropdown_pin + ");\n";
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
/*
 @move RGB to actuator to be consistent with Micropython
 @author zyc
 @date 18-12-25
*/
/*
 @optimize RGB 
 @author blue
 @date 19-02-28
*/
Blockly.Arduino.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '(' + value_ledcount + ');';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Arduino.display_rgb_setBrightness=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.setups_['setup_rgb_display_setBrightness_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
    return '';
};
Blockly.Arduino.display_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
   Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  // code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
   if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  // code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb_show=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);

  var code ='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};