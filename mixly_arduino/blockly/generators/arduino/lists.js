'use strict';

goog.provide('Blockly.Arduino.lists');

goog.require('Blockly.Arduino');


Blockly.Arduino.lists_create_with = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
      Blockly.Arduino.ORDER_NONE) || '0';
  }
  Blockly.Arduino.definitions_['var_declare'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + code.join(', ') + '};\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Arduino.setups_['setup_lists'+varName] = code;
  return '';
};

Blockly.Arduino.lists_create_with_text = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text=this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_declare'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + text + '};\n';
  return '';
};

Blockly.Arduino.lists_create_with2 = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
      Blockly.Arduino.ORDER_NONE) || '0';
  }
  Blockly.Arduino.definitions_['var_declare'+varName] = dropdown_type+' '+varName+'[]'+'='+ '{' + code.join(', ') + '};\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.Arduino.setups_['setup_lists'+varName] = code;
  return '';
};

Blockly.Arduino.lists_create_with_text2 = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var size=window.parseFloat(this.getFieldValue('SIZE'))||'';
  var text=this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_declare'+varName] = dropdown_type+' '+varName+'['+size+']'+'='+ '{' + text + '};\n';
  return '';
};

Blockly.Arduino.lists_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'AT',
    Blockly.Arduino.ORDER_ADDITIVE) || '1';
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code=varName+'[(int)('+argument0+')]';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.lists_setIndex = function() {
  // Set element at index.
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'AT',
    Blockly.Arduino.ORDER_ADDITIVE) || '1';
  var argument2 = Blockly.Arduino.valueToCode(this, 'TO',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  return varName + '[(int)(' + argument0 + ')] = ' + argument2 + ';\n';
};

Blockly.Arduino.lists_length = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var code='sizeof('+varName+')/sizeof('+varName+'[0])';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

//创建二维数组
Blockly.Arduino.create_array2_with_text = function() {
 var TYPE= this.getFieldValue('TYPE');
 var line= Blockly.Arduino.valueToCode(this, 'line', Blockly.Arduino.ORDER_ATOMIC);
 var list= Blockly.Arduino.valueToCode(this, 'list', Blockly.Arduino.ORDER_ATOMIC);
 var name= Blockly.Arduino.valueToCode(this, 'name', Blockly.Arduino.ORDER_ATOMIC);
 var String= Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC);
 Blockly.Arduino.definitions_['var_declare_array'] = ''+ TYPE+' '+ name+'['+ line+']['+ list+']={'+ String+'};\n ';
 return '';
};

//二维数组赋值
Blockly.Arduino.array2_assignment = function() {
 var line= Blockly.Arduino.valueToCode(this, 'line', Blockly.Arduino.ORDER_ATOMIC);
 var list= Blockly.Arduino.valueToCode(this, 'list', Blockly.Arduino.ORDER_ATOMIC);
 var name= Blockly.Arduino.valueToCode(this, 'name', Blockly.Arduino.ORDER_ATOMIC);
 var assignment= Blockly.Arduino.valueToCode(this, 'assignment', Blockly.Arduino.ORDER_ATOMIC);
 var code= ''+ name+'['+ line+'-1]['+ list+'-1]='+ assignment+';\n'
 return code;
};

//获取二维数组值
Blockly.Arduino.get_array2_value = function() {
 var line= Blockly.Arduino.valueToCode(this, 'line', Blockly.Arduino.ORDER_ATOMIC);
 var list= Blockly.Arduino.valueToCode(this, 'list', Blockly.Arduino.ORDER_ATOMIC);
 var name= Blockly.Arduino.valueToCode(this, 'name', Blockly.Arduino.ORDER_ATOMIC);
 var code= ''+ name+'['+ line+'-1]['+ list+'-1]'
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};