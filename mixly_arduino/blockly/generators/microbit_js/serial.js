'use strict';

goog.provide('Blockly.JavaScript.serial');

goog.require('Blockly.JavaScript');
Blockly.JavaScript.serial_print = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeString(\'\' + '+content+');\n';
  return code;
};

Blockly.JavaScript.serial_println = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"'
  var code = 'serial.writeLine(\'\' +  '+content+');\n';
  return code;
};

Blockly.JavaScript.serial_print_hex = function() {
  var content = Blockly.JavaScript.valueToCode(this, 'CONTENT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var code = 'serial.writeLine('+content+'.toString(16));\n';
  return code;
};

Blockly.JavaScript.serial_receive_data_event = function() {
    var char_marker = Blockly.JavaScript.valueToCode(this, 'char_marker', Blockly.JavaScript.ORDER_ATOMIC) || ';';
    var branch = Blockly.JavaScript.statementToCode(this, 'DO');

    Blockly.JavaScript.definitions_['func_serial_receive_data_event_'  + char_marker.charCodeAt(1)] = "serial.onDataReceived(" + char_marker + ", () => {\n" + branch + "};\n";
};

Blockly.JavaScript.serial_readstr = function() {
   var code ="serial.readString()";
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_readline = function() {
    var code ="serial.readLine()";
    return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_readstr_until = function() {
    var char_marker = this.getFieldValue('char_marker');
   var code ="serial.readUntil("+char_marker + ")";
   return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.serial_softserial = function () {
  var dropdown_pin1 = Blockly.JavaScript.valueToCode(this, 'RX',Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.JavaScript.valueToCode(this, 'TX',Blockly.JavaScript.ORDER_ATOMIC);
  var baudrate = this.getFieldValue('baudrate');
  return "serial.redirect(" + dropdown_pin1 + ", " + dropdown_pin2 + ", BaudRate.BaudRate" + baudrate + ");\n";
};


