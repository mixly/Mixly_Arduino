'use strict';

goog.provide('Blockly.JavaScript.logic');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.logic_compare = function() {
  // Comparison operator.
  var mode = this.getFieldValue('OP');
  var operator = Blockly.JavaScript.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_compare.OPERATORS = {
  EQ: '===',
  NEQ: '!==',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.JavaScript.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_negate = function() {
  // Negation.
  var order = Blockly.JavaScript.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.logic_null = function() {
  var code = 'null';
  return [code ,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.logic_true_or_false = function() {
  var a = Blockly.JavaScript.valueToCode(this, 'A',Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var b = Blockly.JavaScript.valueToCode(this, 'B',Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var c = Blockly.JavaScript.valueToCode(this, 'C',Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var code=a+'?'+b+':'+c;
  return [code ,Blockly.JavaScript.ORDER_ATOMIC];
};

