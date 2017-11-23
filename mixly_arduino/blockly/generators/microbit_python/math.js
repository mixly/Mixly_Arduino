'use strict';

goog.provide('Blockly.Python.math');

goog.require('Blockly.Python');


// Blockly.Python.math_number = function() {
//   // Numeric value.
//   var code = (this.getFieldValue('NUM'));
//   // -4.abs() returns -4 in Dart due to strange order of operation choices.
//   // -4 is actually an operator and a number.  Reflect this in the order.
//   var order = code < 0 ?
//       Blockly.Python.ORDER_UNARY_PREFIX : Blockly.Python.ORDER_ATOMIC;
//   return [code, order];
// };

Blockly.Python.math = {};
Blockly.Python.addReservedWords("math,random,Number");
Blockly.Python.math_number = function (a) {
  a = parseFloat(a.getFieldValue("NUM"));
  var b;
  Infinity == a ? (a = 'float("inf")', b = Blockly.Python.ORDER_FUNCTION_CALL) : -Infinity == a ? (a = '-float("inf")', b = Blockly.Python.ORDER_UNARY_SIGN) : b = 0 > a ? Blockly.Python.ORDER_UNARY_SIGN : Blockly.Python.ORDER_ATOMIC;
  return [a, b]
};
//ok
Blockly.Python.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getFieldValue('OP');
  var tuple = Blockly.Python.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
  }
  if(operator==' % '){
    //取余必须是整数
    //argument0='(long) ('+argument0+')';
	//argument1='(long) ('+argument1+')';
  }
  code = argument0 + operator + argument1;
  return [code, order];
};
//ok
Blockly.Python.math_bit = function() {
  var operator = this.getFieldValue('OP');;
  var order = Blockly.Python.ORDER_ATOMIC;
  var argument0 = Blockly.Python.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'B', order) || '0';
  var code = '('+argument0 + operator + argument1+')';
  return [code, order];
};

//ok
Blockly.Python.math_arithmetic = function (a) {
  var b = {
    ADD : [" + ", Blockly.Python.ORDER_ADDITIVE],
    MINUS : [" - ", Blockly.Python.ORDER_ADDITIVE],
    MULTIPLY : [" * ", Blockly.Python.ORDER_MULTIPLICATIVE],
    DIVIDE : [" / ", Blockly.Python.ORDER_MULTIPLICATIVE],
    QUYU: [' % ', Blockly.Python.ORDER_MULTIPLICATIVE],//增加取余操作
    POWER : [" ** ", Blockly.Python.ORDER_EXPONENTIATION]
  }
  [a.getFieldValue("OP")],
  c = b[0],
  b = b[1],
  d = Blockly.Python.valueToCode(a, "A", b) || "0";
  a = Blockly.Python.valueToCode(a, "B", b) || "0";
  return [d + c + a, b]
};


//ok
Blockly.Python.math_single = function (a) {
  var b = a.getFieldValue("OP"),
  c;
  if ("NEG" == b)
    return c = Blockly.Python.valueToCode(a, "NUM", Blockly.Python.ORDER_UNARY_SIGN) || "0", ["-" + c, Blockly.Python.ORDER_UNARY_SIGN];
  Blockly.Python.definitions_.import_math = "import math";
  a = "SIN" == b || "COS" == b || "TAN" == b ? Blockly.Python.valueToCode(a, "NUM", Blockly.Python.ORDER_MULTIPLICATIVE) || "0" : Blockly.Python.valueToCode(a, "NUM", Blockly.Python.ORDER_NONE) || "0";
  switch (b) {
  case "ABS":
    c = "math.fabs(" + a + ")";
    break;
  case "ROOT":
    c = "math.sqrt(" +
      a + ")";
    break;
  case "LN":
    c = "math.log(" + a + ")";
    break;
  case "LOG10":
    c = "math.log10(" + a + ")";
    break;
  case "EXP":
    c = "math.exp(" + a + ")";
    break;
  case "POW10":
    c = "math.pow(10," + a + ")";
    break;
  case "ROUND":
    c = "round(" + a + ")";
    break;
  case "ROUNDUP":
    c = "math.ceil(" + a + ")";
    break;
  case "ROUNDDOWN":
    c = "math.floor(" + a + ")";
    break;
  case "SIN":
    c = "math.sin(" + a + " / 180.0 * math.pi)";
    break;
  case "COS":
    c = "math.cos(" + a + " / 180.0 * math.pi)";
    break;
  case "TAN":
    c = "math.tan(" + a + " / 180.0 * math.pi)"
  }
  if (c)
    return [c, Blockly.Python.ORDER_FUNCTION_CALL];
  switch (b) {
  case "ASIN":
    c =
      "math.asin(" + a + ") / math.pi * 180";
    break;
  case "ACOS":
    c = "math.acos(" + a + ") / math.pi * 180";
    break;
  case "ATAN":
    c = "math.atan(" + a + ") / math.pi * 180";
    break;
  default:
    throw "Unknown math operator: " + b;
  }
  return [c, Blockly.Python.ORDER_MULTIPLICATIVE]
};


Blockly.Python.math_trig = Blockly.Python.math_single;
Blockly.Python.math_round = Blockly.Python.math_single;
//ok
Blockly.Python.math_to_int = function() {
  Blockly.Python.definitions_.import_math = "import math";
  var argument0 = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_NONE) || '0';
  var operator = this.getFieldValue('OP');
  var code = "";
  if(operator === "round"){
      code= operator+'('+argument0+')';
  }else{
      code= "math." + operator+'('+argument0+')';
  }
  return [code, Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.math_max_min = function() {
  var a = Blockly.Python.valueToCode(this, 'A',Blockly.Python.ORDER_NONE) || '0';
  var b = Blockly.Python.valueToCode(this, 'B',Blockly.Python.ORDER_NONE) || '0';
  var operator = this.getFieldValue('OP');
  var code=operator+'('+a+', '+b+')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.math_random_seed = function () {
    // Random integer between [X] and [Y].
    var code = 'randomSeed(micros());\n';
    return code;
};
//ok
Blockly.Python.math_random_int = function() {
  Blockly.Python.definitions_.import_random = "import random";
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Python.valueToCode(this, 'FROM',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'TO',
      Blockly.Python.ORDER_NONE) || '0';
  var code = 'random.randint(' + argument0 +  ', ' + argument1 + ')';

  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
};
//ok
Blockly.Python.math_random_boolean = function() {
  Blockly.Python.definitions_.import_random = "import random";
  var code = 'random.randint(0,1)';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
}
//ok, if a==b or c==d, ERROR!
Blockly.Python.base_map = function() {
  var value_num = Blockly.Python.valueToCode(this, 'NUM', Blockly.Python.ORDER_NONE);
  var value_fl = Blockly.Python.valueToCode(this, 'fromLow', Blockly.Python.ORDER_ATOMIC);
  var value_fh = Blockly.Python.valueToCode(this, 'fromHigh', Blockly.Python.ORDER_ATOMIC);
  var value_tl = Blockly.Python.valueToCode(this, 'toLow', Blockly.Python.ORDER_ATOMIC);
  var value_th = Blockly.Python.valueToCode(this, 'toHigh', Blockly.Python.ORDER_ATOMIC);
  //var code = 'map('+value_num+', '+value_fl+', '+value_fh+', '+value_tl+', '+value_th+')';
    var code =  value_tl + ' + (' + value_th  + '-' +  value_tl + ') * (' + value_num + '-' +  value_fl + ') / (' + value_fh + '-' +  value_fl + ')'
  return [code, Blockly.Python.ORDER_NONE];
};
//ok
Blockly.Python.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.Python.valueToCode(this, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'LOW',
      Blockly.Python.ORDER_NONE) || '0';
  var argument2 = Blockly.Python.valueToCode(this, 'HIGH',
      Blockly.Python.ORDER_NONE) || '0';
  var code = 'min(max(' + argument0 + ', ' +  argument1 + '), ' +  argument2 + ')';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
};