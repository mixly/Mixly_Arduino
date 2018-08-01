'use strict';

goog.provide('Blockly.Arduino.procedures');

goog.require('Blockly.Arduino');

Blockly.Arduino.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Arduino.statementToCode(this, 'STACK');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + this.id + '\'') + branch;
  }
  var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN',
      Blockly.Arduino.ORDER_NONE) || '';
  var type=this.getFieldValue('TYPE');
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? type : 'void';
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = this.argumentstype_[x]+ ' '+ Blockly.Arduino.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
  code = Blockly.Arduino.scrub_(this, code);
  Blockly.Arduino.definitions_[funcName] = code;
  return null;
};

Blockly.Arduino.procedures_defnoreturn = Blockly.Arduino.procedures_defreturn;

Blockly.Arduino.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

Blockly.Arduino.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Arduino.procedures_ifreturn = function() {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(this, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (this.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(this, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || '';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};

Blockly.Arduino.procedures_return = function() {
  // Conditionally return value from a procedure.
  var code=""
  if (this.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(this, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'None';
    code += 'return ' + value + ';\n';
  } else {
    code += 'return;\n';
  }
  code += '\n';
  return code;
};