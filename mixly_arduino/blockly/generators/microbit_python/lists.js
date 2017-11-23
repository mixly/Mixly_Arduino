'use strict';

goog.provide('Blockly.Python.lists');

goog.require('Blockly.Python');


// Blockly.Python.lists_create_with = function() {
//   // Create a list with any number of elements of any type.
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
//   var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var code = new Array(this.itemCount_);
//   for (var n = 0; n < this.itemCount_; n++) {
//     code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
//         Blockly.Python.ORDER_NONE) || '0';
//   }
//   Blockly.Python.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + code.join(', ') + '};\n';
//   //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
//   //Blockly.Python.setups_['setup_lists'+varName] = code;
//   return '';
// };

// Blockly.Python.lists_create_with_text = function() {
//   var dropdown_type = this.getFieldValue('TYPE');
//   var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
//   var size=window.parseFloat(this.getFieldValue('SIZE'));
//   var text=this.getFieldValue('TEXT');
//   Blockly.Python.definitions_['var_lists'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + text + '};\n';
//   return '';
// };
//ok, don't need to specify the data type in Python
Blockly.Python.lists_create_with2 = function() {
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
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '[' + code.join(', ') + ']\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Python.setups_['setup_lists'+varName] = code;
  return '';
};
//ok, don't need to specify the data type in Python
Blockly.Python.lists_create_with_text2 = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  Blockly.Python.definitions_['var_declare'+varName] = varName+'= '+ '[' + text + ']\n';
  return '';
};
//ok
Blockly.Python.lists_getIndex = function() {
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
//ok
Blockly.Python.lists_setIndex = function() {
  // Set element at index.
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Python.valueToCode(this, 'AT',
      Blockly.Python.ORDER_ADDITIVE) || '1';
  var argument2 = Blockly.Python.valueToCode(this, 'TO',
      Blockly.Python.ORDER_ASSIGNMENT) || '0';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  return varName + '[' + argument0 + '] = ' + argument2 + '\n';
};
//ok
Blockly.Python.lists_length = function() {
  var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var code='len(' +varName + ')';
  return [code,Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.lists_push = function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code=varName + '.append('  + argument + ');\n';
    return code;
};
//ok
Blockly.Python.lists_get_remove_last = function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code=varName + '.pop()';
    return [code, Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.lists_insert_value = function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ADDITIVE) || '0';
    var to = Blockly.Python.valueToCode(this, 'TO', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    at = at - 1;
    var code=varName + '.insert('  + at + ', ' + to + ');\n';
    return code;
};
//ok
Blockly.Python.lists_reverse = function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var code=varName + '.reverse();\n';
    return code;
}

// Blockly.Python.lists_get_remove_first = function(){
//     var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//     var code=varName + '.shift()';
//     return [code, Blockly.Python.ORDER_ATOMIC];
// }
// Blockly.Python.lists_insert_at_beginning = function(){
//     var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//     var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
//     var code=varName + '.unshift('  + argument + ')';
//     return [code, Blockly.Python.ORDER_ATOMIC];
// }

//ok
Blockly.Python.lists_find = function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    var code=varName + '.index('  + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
}
//ok
Blockly.Python.lists_remove_at= function(){
    var varName = Blockly.Python.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ASSIGNMENT) || '0';
    argument = argument  - 1;
    var code=varName + '.pop('  + argument + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
}
