'use strict';

goog.provide('Blockly.Arduino.base');

goog.require('Blockly.Arduino');

Blockly.Arduino.inout_touchRead = function(){
   var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
   var code =  'touchRead('+pin+')';
   return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.ledcSetup= function () {
    var FREQ = Blockly.Arduino.valueToCode(this, 'FREQ', Blockly.Arduino.ORDER_ATOMIC);
    var RESOLUTION = Blockly.Arduino.valueToCode(this, 'PWM_RESOLUTION', Blockly.Arduino.ORDER_ATOMIC)||'8';
    var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    Blockly.Arduino.setups_['ledcSetup' + channel+FREQ+RESOLUTION] = 'ledcSetup('+channel+', '+FREQ+', '+RESOLUTION+');\n';
    return "";
};

Blockly.Arduino.ledcAttachPin= function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    var code = 'ledcAttachPin('+dropdown_pin+', '+channel+');\n';
    return code;
};
Blockly.Arduino.ledcDetachPin= function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'ledcDetachPin('+dropdown_pin+');\n';
    return code;
};
Blockly.Arduino.ledcWrite= function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>';
    Blockly.Arduino.definitions_['include_analogWrite'] = '#include <analogWrite.h>';
    var code = 'analogWrite('+dropdown_pin+', '+value_num+');\n';
    return code;
};
Blockly.Arduino.inout_pwm_analog_write= function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var FREQ = Blockly.Arduino.valueToCode(this, 'FREQ', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var RESOLUTION =  this.getFieldValue('RESOLUTION');
    var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    Blockly.Arduino.setups_['ledcSetup' + channel+FREQ+RESOLUTION] = 'ledcSetup('+channel+', '+FREQ+', '+RESOLUTION+');\n';
    Blockly.Arduino.setups_['ledcAttachPin' + dropdown_pin+channel] = 'ledcAttachPin('+dropdown_pin+', '+channel+');\n   ';
    var code = 'ledcWrite('+channel+', '+value_num+');\n';
    return code;
};

Blockly.Arduino.controls_attachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Arduino.definitions_['pin_interrupt'] = '#include <Arduino.h>';
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT_PULLUP);';
    var code = 'attachInterrupt' + '(' + dropdown_pin + ',' + 'attachInterrupt_fun_' + dropdown_pin + ',' + dropdown_mode + ');\n'
    var funcName = 'attachInterrupt_fun_' + dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};

Blockly.Arduino.controls_detachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'detachInterrupt' + '(' + dropdown_pin + ');\n'
    return code;
};

Blockly.Arduino.touchAttachInterrupt = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var threshold = Blockly.Arduino.valueToCode(this, 'threshold', Blockly.Arduino.ORDER_ATOMIC);    
    Blockly.Arduino.setups_['touchAttachInterrupt' + dropdown_pin] = 'touchAttachInterrupt(' + dropdown_pin +',gotTouch'+dropdown_pin+', '+threshold+');';
    var code = '';
    var funcName = 'gotTouch'+dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};
Blockly.Arduino.inout_esp32_dac = function() {
    var PIN= this.getFieldValue('PIN');
    var value= Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
    var code='dacWrite('+PIN+', '+value+');\n';
    return code;
};
