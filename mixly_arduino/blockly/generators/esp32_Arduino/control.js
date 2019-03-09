'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

Blockly.Arduino.controls_hw_timer = function () {
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var TIMER_NUM = this.getFieldValue('TIMER_NUM');
     var mode = this.getFieldValue('mode');
    Blockly.Arduino.definitions_['hw_timer_t'+TIMER_NUM] = 'hw_timer_t * timer'+TIMER_NUM+' =NULL;';
    var funcName = 'IRAM_ATTR onTimer'+TIMER_NUM;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.setups_['setup_hw_timer' + funcName] ='timer'+TIMER_NUM+'=timerBegin('+TIMER_NUM+', 80, true);\n  timerAttachInterrupt(timer'+TIMER_NUM+', &onTimer'+TIMER_NUM+', true);\n  timerAlarmWrite(timer'+TIMER_NUM+', '+time*1000+', '+mode+');';
    Blockly.Arduino.definitions_[funcName] = code;
    return '';
};

Blockly.Arduino.controls_hw_timer_start = function () {
    var TIMER_NUM = this.getFieldValue('TIMER_NUM');
    return 'timerAlarmEnable(timer'+TIMER_NUM+');\n';
};

Blockly.Arduino.controls_hw_timer_stop = function () {
   var TIMER_NUM = this.getFieldValue('TIMER_NUM');
   return 'timerEnd(timer'+TIMER_NUM+');\n';
};

Blockly.Arduino.controls_end_program = function () {
    return 'while(true);\n';
};
Blockly.Arduino.controls_interrupts = function () {
    return 'interrupts();\n';
};

Blockly.Arduino.controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};
Blockly.Arduino.base_delay=Blockly.Arduino.controls_delay;