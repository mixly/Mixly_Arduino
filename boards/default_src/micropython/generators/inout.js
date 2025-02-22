import * as Blockly from 'blockly/core';

// ok
export const inout_highlow = function (_, generator) {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const inout_digital_write = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_stat = generator.valueToCode(this, 'STAT', generator.ORDER_ATOMIC);
    var code = "";
    code += dropdown_pin + '.value(' + dropdown_stat + ')\n'
    return code;
}

// ok
export const inout_digital_read = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var code = "";
    code = dropdown_pin + '.value()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const inout_pwm_analog_write = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    //generator.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.duty_u16(' + value_num + ')\n';
    return code;
}

// ok
export const inout_analog_write = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    //generator.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.write(' + value_num + ')\n';
    return code;
}

// ok
export const inout_analog_write_set = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = dropdown_pin + '.set_analog_' + key + '(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
}

export const inout_pwm_analog_write_set_freq = function (_, generator) {
    //generator.definitions_['import_machine_Pin'] = "from machine import Pin";
    // generator.definitions_['import_machine_PWM'] = "from machine import PWM";
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var value_num = generator.valueToCode(this, 'NUM', generator.ORDER_ATOMIC);
    var code = dropdown_pin + '.freq(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
}

// ok
export const inout_analog_read = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //generator.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = dropdown_pin + '.read_u16()';
    return [code, generator.ORDER_ATOMIC];
}

// ok
export const inout_pin_pressed = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin = generator.valueToCode(this, 'pin', generator.ORDER_ATOMIC);
    var code = pin + '.read()';
    return [code, generator.ORDER_ATOMIC];
}

export const inout_pin_attachInterrupt = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    var atta = generator.valueToCode(this, 'DO', generator.ORDER_ATOMIC);
    var code = 'machine.Pin(' + dropdown_pin + ').irq' + '(handler = ' + atta + ', trigger = ' + dropdown_mode + ')\n'
    //var funcName = 'attachInterrupt_func_' + dropdown_pin;
    //var branch = generator.statementToCode(this, 'DO') || generator.PASS;
    //var code2 = 'def' + ' ' + funcName + '(p):\n' + branch + '\n';
    //generator.setups_[funcName] = code2;
    return code;
}

export const inout_digital_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pin#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('MODE');
    var varName = (pin_obj == 'pin#') ? 'pin' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.Pin(' + dropdown_pin + ', ' + dropdown_mode + ')\n';
    return code;
}

export const inout_pwm_analog_write_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'pwm#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var varName = (pin_obj == 'pwm#') ? 'pwm' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.PWM(machine.Pin(' + dropdown_pin + '))\n';
    return code;
}

// ok
export const inout_analog_write_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'dac#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var varName = (pin_obj == 'dac#') ? 'dac' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.DAC(machine.Pin(' + dropdown_pin + '))\n';
    return code;
}

export const inout_analog_read_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'adc#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var varName = (pin_obj == 'adc#') ? 'adc' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.ADC(machine.Pin(' + dropdown_pin + '))\n';
    return code;
}

export const inout_analog_atten = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_atten = this.getFieldValue('atten')
    var code = dropdown_pin + '.atten(' + value_atten + ')\n';
    return code;
}

// ok
export const inout_pin_pressed_init = function (_, generator) {
    generator.definitions_['import_machine'] = 'import machine';
    var pin_obj = this.getFieldValue('PIN_OBJ') || 'tc#';
    var dropdown_pin = generator.valueToCode(this, 'PIN', generator.ORDER_ATOMIC);
    var varName = (pin_obj == 'tc#') ? 'tc' + dropdown_pin : generator.variableDB_.getName(pin_obj, Blockly.Variables.NAME_TYPE);
    var code = varName + ' = machine.TouchPad(machine.Pin(' + dropdown_pin + '))\n';
    return code;
}