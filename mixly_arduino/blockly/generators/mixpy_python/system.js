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

Blockly.Python.time_localtime= function() {
    Blockly.Python.definitions_.import_time = "import time";    
    var op=this.getFieldValue('op');
    var code="time.localtime()["+op+"]";
    switch (op) {    
    case "all":
       var code1 = "time.localtime()";
       return [code1, Blockly.Python.ORDER_ASSIGNMENT];
       break;
    default:
    	return [code, Blockly.Python.ORDER_ASSIGNMENT];
    	break;       
  }
}