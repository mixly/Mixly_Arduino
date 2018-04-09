'use strict';

goog.provide('Blockly.Python.tuple');

goog.require('Blockly.Python');

Blockly.Python.tuple_create_with = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  if (this.itemCount_!=1){
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
  else {
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Python.setups_['setup_tuple'+varName] = code;
  return '';
};

Blockly.Python.tuple_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
    Blockly.Python.ORDER_ADDITIVE) || '1';
  if (argument0.match(/^\d+$/)) {
  // If the index is a naked number, decrement it right now.
  argument0 = parseInt(argument0, 10) - 1;
  } else {
  // If the index is dynamic, decrement it in code.
  argument0 += ' - 1';
  }
  var code=varName+'['+argument0+']';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_length = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_del = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var code='del ' + varName + '\n';
  return code;
};

Blockly.Python.tuple_join = function() {
  var varName1 = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR1'),
    Blockly.Variables.NAME_TYPE);
  var varName2 = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR2'),
    Blockly.Variables.NAME_TYPE);
  var code = varName1 + "+" + varName2;
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.tuple_create_with_lists = function(){
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
  var code=varName + '=tuple('  + argument + ')\n';
  return code;
};

Blockly.Python.tuple_max = function() {
  var varname = this.getFieldValue('TUR');
  var maxmin = this.getFieldValue('DIR');
  var code= maxmin + "("  +varname + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};