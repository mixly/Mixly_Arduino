'use strict';

goog.provide('Blockly.Python.base');

goog.require('Blockly.Python');
// ok


Blockly.Python.inout_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['input(' + str+')', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.inout_print = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+")\n";
  return code;
};

Blockly.Python.inout_print_inline = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end ="")\n';
  return code;
};

Blockly.Python.inout_type_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var type = this.getFieldValue('DIR');
  var num = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  if (type=='str') {var code = 'input(' + str +')'}
  	else if (type=='int') {var code = 'int(input(' + str +'))'}
  		else if (type=='float') {var code = 'float(input(' + str +'))'}
  //var code=varname+"." + type + "("   + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};