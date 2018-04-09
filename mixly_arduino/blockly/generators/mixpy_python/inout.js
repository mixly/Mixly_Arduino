'use strict';

goog.provide('Blockly.Python.base');

goog.require('Blockly.Python');
// ok


Blockly.Python.inout_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['input(' + str+')', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.inout_print = function() {
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "print("+content+")\n";
  return code;
};