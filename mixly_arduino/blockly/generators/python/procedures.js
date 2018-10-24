'use strict';

goog.provide('Blockly.Python.procedures');

goog.require('Blockly.Python');

Blockly.Python.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Python.statementToCode(this, 'STACK');
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
  var code = 'def ' + funcName + '(' + args.join(', ') + '):\n' +
      branch + returnValue + '\n';
  code = Blockly.Python.scrub_(this, code);
  Blockly.Python.setups_[funcName] = code;
  return null;
};

Blockly.Python.procedures_defnoreturn = Blockly.Python.procedures_defreturn;

Blockly.Python.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Python.valueToCode(this, 'ARG' + x,
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
};

Blockly.Python.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.Python.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Python.valueToCode(this, 'ARG' + x,
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')\n';
  return code;
};

Blockly.Python.procedures_ifreturn = function() {
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

Blockly.Python.procedures_return = function() {
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