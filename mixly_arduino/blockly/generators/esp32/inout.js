'use strict';

goog.provide('Blockly.Python.base');
goog.require('Blockly.Python');

// ok
Blockly.Python.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
// ok
Blockly.Python.inout_digital_write = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code += dropdown_pin +'.value('+ dropdown_stat +')\n'
    return code;
};
// ok
Blockly.Python.inout_digital_read = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = dropdown_pin + '.value()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.inout_pwm_analog_write = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.duty(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.write(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_set = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = dropdown_pin  + '.set_analog_'+ key +'(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};

Blockly.Python.inout_pwm_analog_write_set_freq = function () {
    //Blockly.Python.definitions_['import_machine_Pin'] = "from machine import Pin";
   // Blockly.Python.definitions_['import_machine_PWM'] = "from machine import PWM";
   Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin  + '.freq(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_read = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = dropdown_pin + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.inout_pin_pressed = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = pin +'.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_pin_attachInterrupt = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = Blockly.Python.valueToCode(this, 'DO', Blockly.Python.ORDER_ATOMIC);
    var code = 'machine.Pin(' + dropdown_pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    //var funcName = 'attachInterrupt_func_' + dropdown_pin;
    //var branch = Blockly.Python.statementToCode(this, 'DO') || Blockly.Python.PASS;
    //var code2 = 'def' + ' ' + funcName + '(p):\n' + branch + '\n';
    //Blockly.Python.setups_[funcName] = code2;
    return code;
};

Blockly.Python.inout_digital_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    var varName = (pin_obj == 'pin#') ? 'pin'+dropdown_pin : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code =  varName + ' = machine.Pin(' + dropdown_pin + ', '+ dropdown_mode +')\n';
    return code;
};

Blockly.Python.inout_pwm_analog_write_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pwm#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'pwm#') ? 'pwm'+dropdown_pin : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.PWM(machine.Pin(' + dropdown_pin + '))\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'dac#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'dac#') ? 'dac'+dropdown_pin : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.DAC(machine.Pin(' + dropdown_pin + '))\n';
    return code;
};
Blockly.Python.inout_analog_read_init = function () {
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'adc#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'adc#') ? 'adc'+dropdown_pin : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.ADC(machine.Pin(' + dropdown_pin + '))\n';
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

//ok
Blockly.Python.inout_pin_pressed_init = function(){
    Blockly.Python.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'tc#';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var varName = (pin_obj == 'tc#') ? 'tc'+dropdown_pin : Blockly.Python.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.TouchPad(machine.Pin(' + dropdown_pin + '))\n';
    return code;
};

