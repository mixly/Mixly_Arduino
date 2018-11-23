'use strict';

goog.provide('Blockly.Grader.serial');
goog.require('Blockly.Grader');

Blockly.Grader.IO_input = function () {
    var str = Blockly.Grader.valueToCode(this, 'VAR', Blockly.Grader.ORDER_ATOMIC) || '\"\"';
    return ['input_serial(' + str + ')', Blockly.Grader.ORDER_ATOMIC];
};


Blockly.Grader.IO_print_inline = function () {
    var str = Blockly.Grader.valueToCode(this, 'VAR', Blockly.Grader.ORDER_ATOMIC) || '\"\"';
    var code = "print_nonewline(" + str + ')\n';
    return code;
};

Blockly.Grader.serial_print = function() {
    var content = Blockly.Grader.valueToCode(this, 'CONTENT', Blockly.Grader.ORDER_ATOMIC) || '\"\"'
    var code = "print_nonewline(str("+content+"), end='')\n";
    return code;
};

Blockly.Grader.serial_println = function() {
    var content = Blockly.Grader.valueToCode(this, 'CONTENT', Blockly.Grader.ORDER_ATOMIC) || '\"\"'
    var code = "print(str("+content+"))\n";
    return code;
};

Blockly.Grader.serial_print_hex = function() {
    var content = Blockly.Grader.valueToCode(this, 'CONTENT', Blockly.Grader.ORDER_ATOMIC) || '0';
    var code = "print(str(hex("+content+")))\n";
    return code;
};