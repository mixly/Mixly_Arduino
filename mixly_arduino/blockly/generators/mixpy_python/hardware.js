'use strict';

goog.provide('Blockly.Python.hardware');

goog.require('Blockly.Python');

Blockly.Python.hardware_arduino_start=function(){
  Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  // var code= v + '.start()\n';  
  var code = v + ' = s4alib.s4a_start("'+JSFuncs.getCom()+'")\n'; 
  return code;
};

Blockly.Python.inout_highlow = function () {
    // Boolean values HIGH and LOW.
    var code = (this.getFieldValue('BOOL') == 'HIGH') ? '1' : '0';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.hardware_arduino_digital_write = function () {
    Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code += ''+v+'.digital_write('+dropdown_pin+','+ dropdown_stat +')\n'
    return code;
};

Blockly.Python.hardware_arduino_digital_read = function () {
    Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code =''+v+'.digital_read('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.hardware_arduino_analog_read = function () {
    Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code =''+v+'.analog_read('+dropdown_pin+')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.hardware_arduino_analog_write = function () {
    Blockly.Python.definitions_['import_s4alib'] = 'import s4alib';
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code += ''+v+'.analog_write('+dropdown_pin+','+ value_num +')\n'
    return code;
};
