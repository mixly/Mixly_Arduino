'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

Blockly.Arduino.controls_runnig_core = function () {
    var core_priority1 = this.getFieldValue('core_priority1');
    var core_priority2 = this.getFieldValue('core_priority2');
    var branch1 = Blockly.Arduino.statementToCode(this, 'core1');
    branch1 = branch1.replace(/(^\s*)|(\s*$)/g, "");
    var branch2 = Blockly.Arduino.statementToCode(this, 'core2');
    branch2 = branch2.replace(/(^\s*)|(\s*$)/g, "");
    Blockly.Arduino.definitions_['Dual-core_multitasking'] ='TaskHandle_t Task1;\nTaskHandle_t Task2;\nvoid Task1code( void * pvParameters ){\nfor(;;){myTask1();}\n}\nvoid Task2code( void * pvParameters ){\nfor(;;){myTask2();}\n}\nvoid myTask1() {\n' + branch1 + '\n}\nvoid myTask2() {\n' + branch2 + '\n}\n';
    Blockly.Arduino.setups_['setups_Dual-core_multitasking'] ='xTaskCreatePinnedToCore(Task1code,"Task1",10000,NULL,'+ core_priority1+',&Task1,0);\n  delay(500);\n  xTaskCreatePinnedToCore(Task2code,"Task2",10000,NULL,'+ core_priority2+',&Task2,1);\n  delay(500);\n';
    return '';
};
Blockly.Arduino.control_core_delay = function() {
  var value_sleeplength = Blockly.Arduino.valueToCode(this, 'sleeplength',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'vTaskDelay('+value_sleeplength+');\n'
  return code;
};

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