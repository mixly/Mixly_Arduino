'use strict';

goog.provide('Blockly.JavaScript.procedures');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(this, 'STACK');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.JavaScript.valueToCode(this, 'RETURN',
      Blockly.JavaScript.ORDER_NONE) || '';
  //var type=this.getFieldValue('TYPE');
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  //var returnType = returnValue ? type : 'void';
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
      var varName = Blockly.JavaScript.variableDB_.getName(this.arguments_[x], Blockly.Variables.NAME_TYPE);
    args[x] = varName + ":" + this.argumentstype_[x];
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
  code = Blockly.JavaScript.scrub_(this, code);
  Blockly.JavaScript.definitions_[funcName] = code;
  return null;
};

Blockly.JavaScript.procedures_defnoreturn = Blockly.JavaScript.procedures_defreturn;

Blockly.JavaScript.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
};

Blockly.JavaScript.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.JavaScript.procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.JavaScript.valueToCode(this, 'CONDITION',
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (this.hasReturnValue_) {
    var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
        Blockly.JavaScript.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
