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
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    code += dropdown_pin +'.value('+ dropdown_stat +')\n'
    return code;
};
// ok
Blockly.Python.inout_digital_read = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = dropdown_pin + '.value()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.inout_pwm_analog_write = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.duty(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = dropdown_pin + '.write(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_set = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = dropdown_pin  + '.set_analog_'+ key +'(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};

Blockly.Python.inout_analog_write_set_freq = function () {
    //Blockly.Python.definitions_['import_machine_Pin'] = "from machine import Pin";
   // Blockly.Python.definitions_['import_machine_PWM'] = "from machine import PWM";
   Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = dropdown_pin  + '.freq(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_read = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = dropdown_pin + '.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.pin_pressed = function(){
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = pin +'.read()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.inout_pinMode = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_mode = this.getFieldValue('MODE');
    var code =  'pin'+ dropdown_pin +' = Pin(' + dropdown_pin + ', '+ dropdown_mode +')\n';
    return code;
};

Blockly.Python.controls_pin_attachInterrupt = function () {
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_mode = this.getFieldValue('mode');
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // Blockly.Python.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    //var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
   
    //var code = 'p' + dropdown_pin + '.irq' + '(handler = ' + 'attachInterrupt_func_' + dropdown_pin + ', trigger = ' + dropdown_mode + ')\n'
	var code = 'Pin(' + dropdown_pin + ').irq' + '(handler = ' + 'attachInterrupt_func_' + dropdown_pin + ', trigger = ' + dropdown_mode + ')\n'
    var funcName = 'attachInterrupt_func_' + dropdown_pin;
    var branch = Blockly.Python.statementToCode(this, 'DO') || Blockly.Python.PASS;
    var code2 = 'def' + ' ' + funcName + '(p):\n' + branch + '\n';
    Blockly.Python.setups_[funcName] = code2;
    return code;
};

Blockly.Python.inout_pwm_analog_write_init = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = this.getFieldValue('PIN');
    var code = 'pwm' + dropdown_pin + ' = PWM(Pin(' + dropdown_pin + '))\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_init = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = this.getFieldValue('PIN');
    var code = 'dac' + dropdown_pin + ' = DAC(Pin(' + dropdown_pin + '))\n';
    return code;
};
Blockly.Python.inout_analog_read_init = function () {
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = this.getFieldValue('PIN');
    var code = 'adc' + dropdown_pin + ' = ADC(Pin(' + dropdown_pin + '))\n';
    return code;
};
//ok
Blockly.Python.pin_pressed_init = function(){
    Blockly.Python.definitions_['import_machine_*'] = 'from machine import *';
    // var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = this.getFieldValue('PIN');
    var code = 'tc' + dropdown_pin + ' = TouchPad(Pin(' + dropdown_pin + '))\n';
    return code;
};

