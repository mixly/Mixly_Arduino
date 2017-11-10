'use strict';

goog.provide('Blockly.JavaScript.lists');

goog.require('Blockly.JavaScript');


Blockly.JavaScript.lists_create_with = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
        Blockly.JavaScript.ORDER_NONE) || '0';
  }
  Blockly.JavaScript.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + code.join(', ') + '};\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.JavaScript.setups_['setup_lists'+varName] = code;
  return '';
};

Blockly.JavaScript.lists_create_with_text = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  Blockly.JavaScript.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + text + '};\n';
  return '';
};

Blockly.JavaScript.lists_create_with2 = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';
  if (dropdown_type === 'Array<number>')
    default_value = '0';
  else if (dropdown_type === 'Array<string>')
        default_value = '\'\'';
  else if (dropdown_type === 'Array<boolean>')
      default_value = 'true';

  for (var n = 0; n < this.itemCount_; n++) {

    code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
        Blockly.JavaScript.ORDER_NONE) || default_value;
  }
  Blockly.JavaScript.definitions_['var_declare'+varName] = 'let '+varName+':'+dropdown_type + ' = '+ '[' + code.join(', ') + '];\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.JavaScript.setups_['setup_lists'+varName] = code;
  return '';
};

Blockly.JavaScript.lists_create_with_text2 = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  Blockly.JavaScript.definitions_['var_declare'+varName] = 'let '+varName+':'+ dropdown_type + ' = '+ '[' + text + '];\n';
  return '';
};

Blockly.JavaScript.lists_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_ADDITIVE) || '1';
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code=varName+'['+argument0+']';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_setIndex = function() {
  // Set element at index.
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_ADDITIVE) || '1';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  return varName + '[' + argument0 + '] = ' + argument2 + ';\n';
};

Blockly.JavaScript.lists_length = function() {
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var code=varName + '.length';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.lists_push = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var code=varName + '.push('  + argument + ');\n';
    return code;
}
Blockly.JavaScript.lists_get_remove_last = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code=varName + '.pop()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.lists_insert_value = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var at = Blockly.JavaScript.valueToCode(this, 'AT', Blockly.JavaScript.ORDER_ADDITIVE) || '0';
    var to = Blockly.JavaScript.valueToCode(this, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    at = at - 1;
    var code=varName + '.insertAt('  + at + ', ' + to + ');\n';
    return code;
}
Blockly.JavaScript.lists_reverse = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code=varName + '.reverse();\n';
    return code;
}
Blockly.JavaScript.lists_get_remove_first = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code=varName + '.shift()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.lists_insert_at_beginning = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var code=varName + '.unshift('  + argument + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.lists_find = function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var code=varName + '.indexOf('  + argument + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript.lists_remove_at= function(){
    var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.JavaScript.valueToCode(this, 'AT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    argument = argument  - 1;
    var code=varName + '.removeAt('  + argument + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
