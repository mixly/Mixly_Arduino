'use strict';

goog.provide('Blockly.Arduino.SCoop');

goog.require('Blockly.Arduino');


Blockly.Arduino['SCoopTask']=function() {
	var _tasknum = this.getFieldValue('_tasknum');
	var statements_setup = Blockly.Arduino.statementToCode(this, 'setup');
	var statements_loop = Blockly.Arduino.statementToCode(this, 'loop');
	var taskcode='defineTask(scoopTask'+_tasknum+')\n'
	+'void scoopTask'+_tasknum+'::setup()\n'
	+'{\n'
	+ statements_setup
	+'}\n'
	+'void scoopTask'+_tasknum+'::loop()\n'
	+'{\n'
	+ statements_loop
	+'}\n';
	Blockly.Arduino.definitions_['include_Scoop'] = '#include \"SCoop.h\"';
	Blockly.Arduino.setups_['scoop_start'] = 'mySCoop.start();';
	Blockly.Arduino.definitions_['scoop_task'+_tasknum] = taskcode;
	var code="";
	return code;
};

Blockly.Arduino['SCoop_yield']=function() {
	var code = 'yield();\n';
	return code;
};
Blockly.Arduino['SCoop_sleep'] = function() {
  var value_sleeplength = Blockly.Arduino.valueToCode(this, 'sleeplength',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'sleep('+value_sleeplength+');\n'
  return code;
};
