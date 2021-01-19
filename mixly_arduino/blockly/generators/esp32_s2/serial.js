'use strict';

goog.provide('Blockly.Python.serial');
goog.require('Blockly.Python');

Blockly.Python.serial_print = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart"+dropdown_uart+".write(bytearray("+content+"))\n";
  return code;
};

Blockly.Python.serial_println = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = "uart"+dropdown_uart+".write(bytearray("+content+")+'\\r\\n')\n";
  return code;
};

Blockly.Python.serial_print_hex = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var dropdown_stat = this.getFieldValue('STAT');
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = "uart"+dropdown_uart+".write(bytearray("+dropdown_stat+"("+content+"))+'\\r\\n')\n";
  return code;
};

Blockly.Python.serial_any = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart"+dropdown_uart+".in_waiting";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_readstr = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart"+dropdown_uart+".read()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_readline = function() {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode');
  var code ="uart"+dropdown_uart+".readline()";
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_softserial = function () {
  Blockly.Python.definitions_['import_busio'] = 'import busio';
  Blockly.Python.definitions_['import_board_*'] = 'from board import *';
  var dropdown_uart = this.getFieldValue('mode')
  var baudrate = this.getFieldValue('baudrate');
  return "uart"+(dropdown_uart=="tx=IO37, rx=IO38"?1:2)+" = busio.UART("+dropdown_uart+", baudrate="+baudrate+")\n";
};

Blockly.Python.system_input = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['input(' + str+')', Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.system_print = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+")\n";
  return code;
};

Blockly.Python.system_print_inline = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end ="")\n';
  return code;
};

Blockly.Python.system_print_end = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var end = Blockly.Python.valueToCode(this, 'END', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = "print("+str+',end =' + end + ')\n';
  return code;
};

Blockly.Python.system_print_many = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var code = new Array(this.itemCount_);
  var default_value = '0';
  for (var n = 0; n < this.itemCount_; n++) {
  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }
  var code = 'print(' + code.join(', ') + ')\n';
  return code;
};