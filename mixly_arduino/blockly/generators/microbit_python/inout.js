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
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    code += 'pin'+ dropdown_pin +'.write_digital('+ dropdown_stat +')\n'
    return code;
};
// ok
Blockly.Python.inout_digital_read = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.read_digital()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.inout_analog_write = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //var dropdown_stat = this.getFieldValue('STAT');
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
    var code = 'pin' + dropdown_pin + '.write_analog(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_write_set = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var key = this.getFieldValue('key');
    var code = 'pin' + dropdown_pin  + '.set_analog_'+ key +'(' + value_num + ')\n';
    //var code = 'pin' + dropdown_pin  + '.set_analog_period(' + value_num + ')\n';
    return code;
};
//ok
Blockly.Python.inout_analog_read = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    //Blockly.Python.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
    var code = 'pin' + dropdown_pin + '.read_analog()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.sensor_pin_pressed = function(){
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var pin = Blockly.Python.valueToCode(this, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = 'pin'+ pin + '.is_touched()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};