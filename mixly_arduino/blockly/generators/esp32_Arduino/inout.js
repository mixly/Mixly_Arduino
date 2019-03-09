'use strict';

goog.provide('Blockly.Arduino.base');

goog.require('Blockly.Arduino');

Blockly.Arduino.inout_digital_write = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ',' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_pin_pressed = function(){
    var pin = Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var code =  'touchRead('+pin+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.inout_pwm_analog_write= function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var FREQ = Blockly.Arduino.valueToCode(this, 'FREQ', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var channle = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
    Blockly.Arduino.definitions_['PWMC_CHANNEL_'+dropdown_pin] = '#define PWMC_CHANNEL_'+dropdown_pin+' '+channle;
    Blockly.Arduino.definitions_['PWM_PIN'+dropdown_pin] = '#define PWM_PIN'+dropdown_pin+' '+dropdown_pin;
    Blockly.Arduino.definitions_['PWMC_TIMER_13_BIT'] = '#define PWMC_TIMER_13_BIT  13';
    Blockly.Arduino.definitions_['PWMC_BASE_FREQ'+dropdown_pin] = '#define PWMC_BASE_FREQ'+dropdown_pin+'  '+FREQ;
    Blockly.Arduino.setups_['PWMcSetup'+dropdown_pin] = 'ledcSetup(PWMC_CHANNEL_'+dropdown_pin+', PWMC_BASE_FREQ'+dropdown_pin+', PWMC_TIMER_13_BIT);';
    Blockly.Arduino.setups_['ledcAttachPin'+dropdown_pin] = 'ledcAttachPin(PWM_PIN'+dropdown_pin+', PWMC_CHANNEL_'+dropdown_pin+');';
    var code2 = 'void ledcAnalogWrite(uint8_t channel, uint32_t value, uint32_t valueMax = 255) {\n';
    code2+='uint32_t duty = (8191 / valueMax) * min(value, valueMax);\n';
    code2+='ledcWrite(channel, duty);\n}\n';
    Blockly.Arduino.definitions_['ledcAnalogWrite'] = code2;
    var code="";
    var code = 'ledcAnalogWrite(PWMC_CHANNEL_' + dropdown_pin + ',' + value_num + ');\n';
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
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
    var code = '';
    var funcName = 'gotTouch'+dropdown_pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return code;
};
