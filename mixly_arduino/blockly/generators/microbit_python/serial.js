'use strict';

goog.provide('Blockly.Python.serial');
goog.require('Blockly.Python');

Blockly.Python.serial_print = function() {
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeString(\'\' + '+content+');\n';
  return code;
};

Blockly.Python.serial_println = function() {
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeLine(\'\' +  '+content+');\n';
  return code;
};

Blockly.Python.serial_print_hex = function() {
  var content = Blockly.Python.valueToCode(this, 'CONTENT', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'serial.writeLine('+content+'.toString(16));\n';
  return code;
};

Blockly.Python.serial_receive_data_event = function() {
    var char_marker = Blockly.Python.valueToCode(this, 'char_marker', Blockly.Python.ORDER_ATOMIC) || ';';
    var branch = Blockly.Python.statementToCode(this, 'DO');

    Blockly.Python.definitions_['func_serial_receive_data_event_'  + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "};\n";
};

Blockly.Python.serial_readstr = function() {
   var code ="uart.read()";
   return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_readline = function() {
    var code ="uart.readline()";
    return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_readstr_until = function() {
    var char_marker = this.getFieldValue('char_marker');
   var code ="serial.readUntil("+char_marker + ")";
   return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.serial_softserial = function () {
  var dropdown_pin1 = Blockly.Python.valueToCode(this, 'RX',Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Python.valueToCode(this, 'TX',Blockly.Python.ORDER_ATOMIC);
  var baudrate = this.getFieldValue('baudrate');
  return "uart.init(rx=" + dropdown_pin1 + ", tx=" + dropdown_pin2 + ", baudrate=" + baudrate + ")\n";
};

