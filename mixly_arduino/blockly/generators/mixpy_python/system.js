'use strict';

goog.provide('Blockly.Python.system');

goog.require('Blockly.Python');


Blockly.Python.controls_millis = function () {
    Blockly.Python.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.controls_end_program = function () {
    return 'exit()\n';
};