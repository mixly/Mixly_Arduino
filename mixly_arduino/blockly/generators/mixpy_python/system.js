'use strict';

goog.provide('Blockly.Python.system');

goog.require('Blockly.Python');


//ok
Blockly.Python.base_delay = function () {
    var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'sleep(' + delay_time + ')\n';
    return code;
};
//ok
Blockly.Python.Panic_with_status_code = function () {
    var status_code = Blockly.Python.valueToCode(this, 'STATUS_CODE', Blockly.Python.ORDER_ATOMIC) || '1000'
    var code = 'panic(' + status_code + ')\n';
    return code;
};
//ok
Blockly.Python.controls_millis = function () {
    Blockly.Python.definitions_.import_time = "import time";
    var code = 'time.time()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.reset = function () {
    Blockly.Python.definitions_['import_microbit'] = 'from microbit import *'
    return 'reset()\n';
};
Blockly.Python.controls_interrupts = function () {
    return 'interrupts();\n';
};

Blockly.Python.controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};
//ok
Blockly.Python.controls_end_program = function () {
    return 'exit()';
};