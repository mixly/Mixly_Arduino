'use strict';

goog.provide('Blockly.Python.base');
goog.require('Blockly.Python');

Blockly.Python.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//数字输入和输出
Blockly.Python.inout_digital_init = function() {
    Blockly.Python.definitions_['import_digitalio'] = 'import digitalio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var value_PIN = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var text_PINOBJ = this.getFieldValue('PIN_OBJ') || 'pin#';;
    text_PINOBJ = (text_PINOBJ == 'pin#') ? 'pin'+value_PIN.replace("IO", "") : Blockly.Python.variableDB_.getName(text_PINOBJ, Blockly.Variables.NAME_TYPE);
    var code = text_PINOBJ+' = digitalio.DigitalInOut('+value_PIN+')\n';
    return code;
};

Blockly.Python.inout_digitalinout_mode = function() {
    Blockly.Python.definitions_['import_digitalio'] = 'import digitalio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var value_PIN = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_TYPE = this.getFieldValue('TYPE');
    var output = dropdown_TYPE.indexOf("PUSH_PULL") != -1 || dropdown_TYPE.indexOf("OPEN_DRAIN") != -1;
    if(dropdown_TYPE == 'None')
    {
        var code = value_PIN+'.switch_to_input()\n';
    }
    var code = value_PIN+'.switch_to_'+(output?'output':'input')+'('+(output?'drive_mode':'pull')+'=digitalio.'+(output?'DriveMode.':'Pull.')+dropdown_TYPE+')\n';
    return code;
};

Blockly.Python.inout_digital_write = function () {
    Blockly.Python.definitions_['import_digitalio'] = 'import digitalio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code += dropdown_pin +'.value = '+dropdown_stat+'\n'
    return code;
};

Blockly.Python.inout_digital_read = function () {
    Blockly.Python.definitions_['import_digitalio'] = 'import digitalio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = dropdown_pin + '.value';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//模拟输出
Blockly.Python.inout_analog_write_init = function () {
    Blockly.Python.definitions_['import_analogio'] = 'import analogio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'dac#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'dac#') ? 'dac'+dropdown_pin.replace("IO", "") : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = analogio.AnalogOut(' + dropdown_pin + ')\n';
    return code;
};

Blockly.Python.inout_analog_write = function () {
    Blockly.Python.definitions_['import_analogio'] = 'import analogio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin + '.value = ' + value_num + '\n';
    return code;
};

Blockly.Python.inout_analog_write_set = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = dropdown_pin  + '.set_analog_'+ key +'(' + value_num + ')\n';
    return code;
};

Blockly.Python.inout_analog_atten = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_atten = this.getFieldValue('atten')
    var code = dropdown_pin + '.atten(' + value_atten + ')\n';
    return code;
};

//模拟输入
Blockly.Python.inout_analog_read_init = function () {
    Blockly.Python.definitions_['import_analogio'] = 'import analogio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'adc#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'adc#') ? 'adc'+dropdown_pin.replace("IO", "") : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = analogio.AnalogIn(' + dropdown_pin + ')\n';
    return code;
};

Blockly.Python.inout_analog_read = function () {
    Blockly.Python.definitions_['import_analogio'] = 'import analogio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin + '.value';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//pwm输出
Blockly.Python.inout_pwm_analog_write_init = function () {
    Blockly.Python.definitions_['import_analogio'] = 'import pwmio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pwm#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'pwm#') ? 'pwm'+dropdown_pin.replace("IO", "") : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = pwmio.PWMOut(' + dropdown_pin + ', variable_frequency=True)\n';
    return code;
};

Blockly.Python.inout_pwm_analog_write = function () {
    Blockly.Python.definitions_['import_pwmio'] = 'import pwmio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin + '.duty_cycle = ' + value_num + '\n';
    return code;
};

Blockly.Python.inout_pwm_analog_write_set_freq = function () {
    Blockly.Python.definitions_['import_pwmio'] = 'import pwmio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin  + '.frequency = ' + value_num + '\n';
    return code;
};

//触摸输入
Blockly.Python.inout_pin_pressed_init = function(){
    Blockly.Python.definitions_['import_machine'] = 'import touchio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'tc#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'tc#') ? 'tc'+dropdown_pin.replace("IO", "") : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = touchio.TouchIn(' + dropdown_pin + ')\n';
    return code;
};

Blockly.Python.inout_pin_pressed = function(){
    Blockly.Python.definitions_['import_machine'] = 'import touchio';
    Blockly.Python.definitions_['import_board_*'] = 'from board import *';
    var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = pin +'.value';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_pin_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'machine.Pin(' + dropdown_pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    return code;
};
