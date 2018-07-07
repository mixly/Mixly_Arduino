'use strict';

goog.provide('Blockly.Python.base');

goog.require('Blockly.Python');

/***************
*   IN / OUT   *
***************/
// ok
Blockly.Python.inout_digital_write2 = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var dropdown_stat = Blockly.Python.valueToCode(this, 'STAT', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    // code += 'pins.digitalWritePin(' + dropdown_pin + ',' + dropdown_stat + ')\n'
    code += 'pin'+ dropdown_pin +'.write_digital('+ dropdown_stat +')\n'
    return code;
};

// ok
Blockly.Python.inout_digital_read2 = function () {
    Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
    var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var code = "";
    code = 'pin' + dropdown_pin + '.read_digital()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

/***************
*   CONTROL    *
***************/
Blockly.Python['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(parseInt(block.getFieldValue('TIMES'), 10));
  } else {
    // External number.
    var repeats = Blockly.Python.valueToCode(block, 'TIMES',
        Blockly.Python.ORDER_NONE) || '0';
  }
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = 'int(' + repeats + ')';
  }
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block.id) ||
      Blockly.Python.PASS;
  var loopVar = Blockly.Python.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var code = 'for ' + loopVar + ' in range(' + repeats + '):\n' + branch;
  return code;
};


/***************
*   MATH   *
***************/
Blockly.Python.math_random_seed = function () {
    // Random integer between [X] and [Y].
    Blockly.Python.definitions_.import_random = "import random";
    // Random integer between [X] and [Y].
    var argument0 = Blockly.Python.valueToCode(this, 'NUM',
        Blockly.Python.ORDER_NONE) || '0';
    var code = 'random.seed(' + argument0 +  ')'+'\n';
    return code;
};


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


Blockly.Python.math_random_float = function() {
  Blockly.Python.definitions_.import_random = "import random";
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Python.valueToCode(this, 'FROM',
      Blockly.Python.ORDER_NONE) || '0';
  var argument1 = Blockly.Python.valueToCode(this, 'TO',
      Blockly.Python.ORDER_NONE) || '0';
  var code = 'random.uniform(' + argument0 +  ', ' + argument1 + ')';

  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
};


Blockly.Python.math_random_boolean = function() {
  Blockly.Python.definitions_.import_random = "import random";
  var code = 'random.randint(0,1)';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
}


Blockly.Python.math_random_random = function() {
  Blockly.Python.definitions_.import_random = "import random";
  var code = 'random.random()';
  return [code, Blockly.Python.ORDER_UNARY_POSTFIX];
}


Blockly.Python.bin_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var bin = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  return [towhat + "(" +  bin  + ', 2)', Blockly.Python.ORDER_ATOMIC];
};


/***************
*   TEXT  *
***************/
Blockly.Python.text_char_at = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ATOMIC) || '0';
  return [str+'['+at+'-1]', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_substring = function() {
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var start = Blockly.Python.valueToCode(this, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
    var end = Blockly.Python.valueToCode(this, 'END', Blockly.Python.ORDER_ATOMIC) || '1';
    return ['str(' +str+')'+'[('+start+'-1): ' + end + ']', Blockly.Python.ORDER_ATOMIC];
};