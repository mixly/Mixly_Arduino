'use strict';

goog.provide('Blockly.Python.serial');

goog.require('Blockly.Python');

Blockly.Python.serial_open=function(){
  Blockly.Python.definitions_['import_serial'] = 'import serial';
  var time = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('SER'),
    Blockly.Variables.NAME_TYPE);
  var bps = this.getFieldValue('BPS');
  // var code= v + '.start()\n';  
  var code = varName + ' = serial.Serial("' + JSFuncs.getCom() + '", ' + bps + ', timeout=' + time +')\n'; 
  return code;
};

Blockly.Python.serial_write=function(){
  Blockly.Python.definitions_['import_serial'] = 'import serial';
  var ser = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ADDITIVE) || 'ser';
  var str = (Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"');
  // var code= v + '.start()\n';  
  var code = ser + '.write(' + str +  ')\n'; 
  return code;
};

Blockly.Python.serial_read_b = function () {
    Blockly.Python.definitions_['import_serial'] = 'import serial';
    var ser = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ADDITIVE) || 'ser';
    var len = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
    var code = ser + '.read(' + len  + ')'; 
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.serial_close=function(){
  Blockly.Python.definitions_['import_serial'] = 'import serial';
  var ser = Blockly.Python.valueToCode(this, 'SER', Blockly.Python.ORDER_ADDITIVE) || 'ser';
  var code = ser + '.close()\n'; 
  return code;
};