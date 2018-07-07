'use strict';

goog.provide('Blockly.Python.variables');

goog.require('Blockly.Python');


Blockly.Python.variables_get = function() {
  // Variable getter.
  var code = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Blockly.Python.variables_declare = function() {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var argument0;
//   //TODO: settype to variable
//   argument0 = Blockly.Python.valueToCode(this, 'VALUE',Blockly.Python.ORDER_ASSIGNMENT) ||  'None';
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
  
//   if (dropdown_type === 'number')
//       Blockly.Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = 0;';
//   else if(dropdown_type === 'string')
//       Blockly.Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = \'\';';
//   else if(dropdown_type === 'boolean')
//       Blockly.Python.definitions_['var_declare' + varName] = 'let ' + ' ' + varName + ' = true;';
//   else if(dropdown_type.startsWith('Array'))
//       Blockly.Python.definitions_['var_declare' + varName] = 'let ' + varName + ':' + dropdown_type + ' = [];';
  

//   if(Blockly.Python.setups_['var_declare' + varName] === undefined) {
//       Blockly.Python.setups_['var_declare' + varName] =  varName + ' = ' + argument0 + '\n';
//   }else {
//   }
//   return '';
// };

Blockly.Python.variables_set = function() {
  // Variable setter.
  if(this.getFieldValue('VAR')==""){
    return "  = None\n";
  }
  else{
    var argument0 = Blockly.Python.valueToCode(this, 'VALUE',
        Blockly.Python.ORDER_ASSIGNMENT) || 'None';
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

    return varName + ' = ' + argument0 + '\n';
  }

};
// Blockly.Python.variables_change = function () {
//     // Variable setter.
//     var operator = this.getFieldValue('OP');
//     var varName = Blockly.Python.valueToCode(this, 'MYVALUE', Blockly.Python.ORDER_ASSIGNMENT);
//     var code = '((' + operator + ')' + varName + ')';
//     return [code, Blockly.Python.ORDER_ATOMIC];
// };