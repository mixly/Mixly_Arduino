'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');


Blockly.Arduino.variables_get = function() {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.variables_declare = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var argument0;
  //TODO: settype to variable
  if(dropdown_type=='String'){
	argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',Blockly.Arduino.ORDER_ASSIGNMENT) || '""';
  }else{
    argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  }
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  if (dropdown_type != 'String')
      Blockly.Arduino.definitions_['var_declare' + varName] = 'volatile ' + dropdown_type + ' ' + varName + ';';
  else
      Blockly.Arduino.definitions_['var_declare' + varName] = dropdown_type + ' ' + varName + ';';
  Blockly.Arduino.setups_['setup_var'+varName] = varName + ' = ' + argument0 + ';';
  //Blockly.Arduino.variableTypes_[varName] = dropdown_type;//处理变量类型
  return '';
};

Blockly.Arduino.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
Blockly.Arduino.variables_change = function () {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = Blockly.Arduino.valueToCode(this, 'MYVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
    //修复强制类型转换不正确的bug
    var code = '((' + operator + ')(' + varName + '))';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};