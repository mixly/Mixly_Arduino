'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.require('Blockly.JavaScript');


Blockly.JavaScript.variables_get = function() {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.variables_declare = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var argument0;
  //TODO: settype to variable
  argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',Blockly.JavaScript.ORDER_ASSIGNMENT) ||  0;
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  /*
  if (dropdown_type === 'number')
      Blockly.JavaScript.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = 0;';
  else if(dropdown_type === 'string')
      Blockly.JavaScript.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = \'\';';
  else if(dropdown_type === 'boolean')
      Blockly.JavaScript.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = true;';
  else if(dropdown_type.startsWith('Array'))
      Blockly.JavaScript.definitions_['var_declare' + varName] = 'let ' + varName + ':' + dropdown_type + ' = [];';
  */

  if(Blockly.JavaScript.definitions_['var_declare' + varName] === undefined) {
      Blockly.JavaScript.definitions_['var_declare' + varName] = 'let ' + varName + ' = ' + argument0 + ';';
  }else {
  }
  return '';
};

Blockly.JavaScript.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

  return varName + ' = ' + argument0 + ';\n';

};
Blockly.JavaScript.variables_change = function () {
    // Variable setter.
    var operator = this.getFieldValue('OP');
    var varName = Blockly.JavaScript.valueToCode(this, 'MYVALUE', Blockly.JavaScript.ORDER_ASSIGNMENT);
    var code = '((' + operator + ')' + varName + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};