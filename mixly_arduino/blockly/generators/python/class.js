'use strict';

goog.provide('Blockly.Python.class_test');

goog.require('Blockly.Python');

Blockly.Python.class_make = function() {
  var text_name = this.getFieldValue('VAR') || 'None';
  var statements_data = Blockly.Python.statementToCode(this, 'data');
  var code = 'class '+text_name+':\n'+statements_data;
  return code;
};

Blockly.Python.class_make_with_base = function() {
  var text_name = this.getFieldValue('VAR') || 'None';
  var name = Blockly.Python.valueToCode(this, 'NAME',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  var statements_data = Blockly.Python.statementToCode(this, 'data');
  var code = '';
  if(name == 'None')
    code = 'class '+text_name+':\n'+statements_data;
  else
    code = 'class '+text_name+'('+name+'):\n'+statements_data;
  return code;
};

Blockly.Python.class_get = function() {
  var code = this.getFieldValue('VAR') || 'None';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.property_set = function() {
  var argument0 = Blockly.Python.valueToCode(this, 'VALUE',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  var argument1 = Blockly.Python.valueToCode(this, 'DATA',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  var varName = this.getFieldValue('VAR') || 'None';
  return argument0 + '.'+varName+' = ' + argument1 + '\n';
};

Blockly.Python.property_get = function() {
  var argument0 = Blockly.Python.valueToCode(this, 'VALUE',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  var code = this.getFieldValue('VAR') || 'None';
  return [argument0+'.'+code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.object_set = function() {
  var text_name = this.getFieldValue('VAR10') || 'None';
  var text_new_name = this.getFieldValue('VAR11') || 'None';
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,Blockly.Python.ORDER_NONE) || 'None';
  }
  var code = text_new_name+' = '+text_name+'('+code.join(',')+')\n';
  return code;
};

Blockly.Python.object_get = function() {
  var code = this.getFieldValue('VAR') || 'None';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.method_procedures_defreturn = function() {
  // Define a procedure with a return value.
  //var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
  //    Blockly.Class_Test.NAME_TYPE);
  var funcName = this.getFieldValue('NAME') || 'None';
  var branch = Blockly.Python.statementToCode(this, 'STACK')|| '    pass\n';
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.Python.valueToCode(this, 'RETURN',
      Blockly.Python.ORDER_NONE) || '';
  //var type=this.getFieldValue('TYPE');
  if (returnValue) {
    returnValue = '    return ' + returnValue + '\n';
  }
  //var returnType = returnValue ? type : 'void';
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
      var varName = Blockly.Python.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
    args[x] = varName;
  }
  var code = '';
  //if(this.arguments_.length)
    code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
        branch + returnValue + '\n';
  //code = Blockly.Python.scrub_(this, code);
  //Blockly.Python.setups_[funcName] = code;
  return code;
};

Blockly.Python.method_procedures_defnoreturn = Blockly.Python.method_procedures_defreturn;

Blockly.Python.method_procedures_callreturn = function() {
  var argument1 = Blockly.Python.valueToCode(this, 'DATA',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  // Call a procedure with a return value.
  //var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
  //    Blockly.Class_Test.NAME_TYPE);
  var funcName = this.getFieldValue('NAME');
  var args = [];
  for (var x = 0; x < this.arguments_.length-1; x++) {
    args[x] = Blockly.Python.valueToCode(this, 'ARG' + (x+1),
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = argument1+'.'+funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
};

Blockly.Python.method_procedures_callnoreturn = function() {
  var argument1 = Blockly.Python.valueToCode(this, 'DATA',Blockly.Python.ORDER_ASSIGNMENT) || 'None';
  // Call a procedure with no return value.
  //var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
  //    Blockly.Class_Test.NAME_TYPE);
  var funcName = this.getFieldValue('NAME');
  var args = [];
  for (var x = 0; x < this.arguments_.length-1; x++) {
    args[x] = Blockly.Python.valueToCode(this, 'ARG' + (x+1),
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = argument1+'.'+funcName + '(' + args.join(', ') + ')\n';
  return code;
};

Blockly.Python.method_procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.Python.valueToCode(this, 'CONDITION',
      Blockly.Python.ORDER_NONE) || 'False';
  var code = 'if (' + condition + ') :\n';
  if (this.hasReturnValue_) {
    var value = Blockly.Python.valueToCode(this, 'VALUE',
        Blockly.Python.ORDER_NONE) || 'None';
    code += '    return ' + value;
  } else {
    code += '    return None';
  }
  code += '\n';
  return code;
};

Blockly.Python.method_procedures_return = function() {
  // Conditionally return value from a procedure.
  var code=""
  if (this.hasReturnValue_) {
    var value = Blockly.Python.valueToCode(this, 'VALUE',
        Blockly.Python.ORDER_NONE) || 'None';
    code += 'return ' + value;
  } else {
    code += 'return None';
  }
  code += '\n';
  return code;
};