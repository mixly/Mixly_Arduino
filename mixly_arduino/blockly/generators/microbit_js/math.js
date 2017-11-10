'use strict';

goog.provide('Blockly.JavaScript.math');

goog.require('Blockly.JavaScript');


Blockly.JavaScript.math_number = function() {
  // Numeric value.
  var code = (this.getFieldValue('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
      Blockly.JavaScript.ORDER_UNARY_PREFIX : Blockly.JavaScript.ORDER_ATOMIC;
  return [code, order];
};

Blockly.JavaScript.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getFieldValue('OP');
  var tuple = Blockly.JavaScript.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
  }
  if(operator==' % '){
    //取余必须是整数
    //argument0='(long) ('+argument0+')';
	//argument1='(long) ('+argument1+')';
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.JavaScript.math_bit = function() {
  var operator = this.getFieldValue('OP');;
  var order = Blockly.JavaScript.ORDER_ATOMIC;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code = '('+argument0 + operator + argument1+')';
  return [code, order];
};

Blockly.JavaScript.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.JavaScript.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.JavaScript.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.JavaScript.ORDER_MULTIPLICATIVE],
  QUYU: [' % ', Blockly.JavaScript.ORDER_MULTIPLICATIVE],//增加取余操作
  POWER: [null, Blockly.JavaScript.ORDER_NONE]  // Handle power separately.
};

Blockly.JavaScript.math_single = function() {
  // Math operators with single operand.
  var operator = this.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedents.
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_PREFIX) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in Dart.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.JavaScript.ORDER_UNARY_PREFIX];
  }
  if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_POSTFIX) || '0';
  } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses.
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10,' + arg + ')';
      break;
    case '++':
        code = '(' + arg + '++)';
      break;
    case '--':
        code = '(' + arg + '--)';
      break;

    case 'ROUND':
      code =  'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180.0 * 3.14159)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180.0 * 3.14159)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180.0 * 3.14159)';
      break;
  }
  if (code) {
    return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
  }
  // Second, handle cases which generate values that may need parentheses.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + arg + ') / log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / 3.14159 * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / 3.14159 * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / 3.14159 * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.JavaScript.ORDER_MULTIPLICATIVE];
};

Blockly.JavaScript.math_trig = Blockly.JavaScript.math_single;

Blockly.JavaScript.math_to_int = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A',Blockly.JavaScript.ORDER_NONE) || '0';
  var operator = this.getFieldValue('OP');
  var code = "";
  if(operator === "pow"){
      code= "Math." + operator+'('+argument0+', 2)';
  }else{
      code= "Math." + operator+'('+argument0+')';
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.math_max_min = function() {
  var a = Blockly.JavaScript.valueToCode(this, 'A',Blockly.JavaScript.ORDER_NONE) || '0';
  var b = Blockly.JavaScript.valueToCode(this, 'B',Blockly.JavaScript.ORDER_NONE) || '0';
  var operator = this.getFieldValue('OP');
  var code="Math." +operator+'('+a+', '+b+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.math_random_seed = function () {
    // Random integer between [X] and [Y].
    var code = 'randomSeed(micros());\n';
    return code;
};

Blockly.JavaScript.math_random_int = function() {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'Math.random(' + argument1 + '-' + argument0 +  ') + ' + argument0;
  return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
};

Blockly.JavaScript.math_random_boolean = function() {
    var code = 'Math.randomBoolean()';
    return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
}
Blockly.JavaScript.base_map = function() {
  var value_num = Blockly.JavaScript.valueToCode(this, 'NUM', Blockly.JavaScript.ORDER_NONE);
  var value_fl = Blockly.JavaScript.valueToCode(this, 'fromLow', Blockly.JavaScript.ORDER_ATOMIC);
  var value_fh = Blockly.JavaScript.valueToCode(this, 'fromHigh', Blockly.JavaScript.ORDER_ATOMIC);
  var value_tl = Blockly.JavaScript.valueToCode(this, 'toLow', Blockly.JavaScript.ORDER_ATOMIC);
  var value_th = Blockly.JavaScript.valueToCode(this, 'toHigh', Blockly.JavaScript.ORDER_ATOMIC);
  //var code = 'map('+value_num+', '+value_fl+', '+value_fh+', '+value_tl+', '+value_th+')';
    var code =  value_tl + ' + (' + value_th  + '-' +  value_tl + ') * (' + value_num + '-' +  value_fl + ') / (' + value_fh + '-' +  value_fl + ')'
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'LOW',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'HIGH',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'Math.min(Math.max(' + argument0 + ', ' +  argument1 + '), ' +  argument2 + ')';
  return [code, Blockly.JavaScript.ORDER_UNARY_POSTFIX];
};