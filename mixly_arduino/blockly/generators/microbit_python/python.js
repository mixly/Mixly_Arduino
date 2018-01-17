/*
Overrides for generic Python code generation.
*/
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');



Blockly.Python.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Python.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Python.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Python.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Python.ORDER_ADDITIVE = 4; // + -
Blockly.Python.ORDER_SHIFT = 5; // << >>
Blockly.Python.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Python.ORDER_EQUALITY = 7; // == != === !==
Blockly.Python.ORDER_BITWISE_AND = 8; // &
Blockly.Python.ORDER_BITWISE_XOR = 9; // ^
Blockly.Python.ORDER_BITWISE_OR = 10; // |
Blockly.Python.ORDER_LOGICAL_AND = 11; // &&
Blockly.Python.ORDER_LOGICAL_OR = 12; // ||
Blockly.Python.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Python.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Python.ORDER_NONE = 99; // (...)

Blockly.Python.init = function(workspace) {
  /**
    * Empty loops or conditionals are not allowed in Python.
    */
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);
  Blockly.Python.setups_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }
}


Blockly.Python.finish = function(code) {
    // Convert the definitions dictionary into a list.
    if(code !== "") {
        code = '    ' + code.replace(/\n/g, '\n    ');
        code = code.replace(/\n\s+$/, '\n');
    }
    var definitions = [];
    for (var name in Blockly.Python.definitions_) {
        definitions.push(Blockly.Python.definitions_[name]);
    }
    var setups = [];
  for (var name in Blockly.Python.setups_) {
    setups.push(Blockly.Python.setups_[name]);
  }
  if(setups.length !== 0)
      setups.push('\n\n');
    // Clean up temporary data.
    //delete Blockly.Python.definitions_;
    //delete Blockly.Python.functionNames_;
    //Blockly.Python.variableDB_.reset();
    if(code !== "") 
      return definitions.join('\n\n') + '\n\n\n' +  setups.join('\n') + 'while True:\n' + code;
    else
      return definitions.join('\n\n') + '\n\n\n' +  setups.join('\n') + code;

};
