'use strict';

goog.provide('Blockly.Arduino.factory');
goog.require('Blockly.Arduino');

Blockly.Arduino.factory_include = function() {
	var INCLUDE = this.getTitleValue('INCLUDE');
	Blockly.Arduino.definitions_['define_'+INCLUDE] = '#include <'+INCLUDE+'.h>';
	return '';
};

Blockly.Arduino.factory_function_noreturn = function() {
	var NAME = this.getTitleValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return NAME+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_function_return = function() {
	var NAME = this.getTitleValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [NAME+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_declare = function() {
	var TYPE = this.getTitleValue('TYPE');
	var NAME = this.getTitleValue('NAME');
	Blockly.Arduino.definitions_['var_'+TYPE+'_'+NAME] = TYPE+' '+NAME+';';
	return '';
};

Blockly.Arduino.factory_static_method_noreturn = function() {
	var TYPE = this.getTitleValue('TYPE');
	var NAME = this.getTitleValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return TYPE+'::'+NAME+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_static_method_return = function() {
	var TYPE = this.getTitleValue('TYPE');
	var NAME = this.getTitleValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [TYPE+'::'+NAME+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_callMethod_noreturn = function() {
	var NAME = this.getTitleValue('NAME');
	var METHOD = this.getTitleValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return NAME+'.'+METHOD+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_callMethod_return = function() {
	var NAME = this.getTitleValue('NAME');
	var METHOD = this.getTitleValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [NAME+'.'+METHOD+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_block = function() {
	var VALUE = this.getTitleValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.Arduino.factory_block_return = function() {
	var VALUE = this.getTitleValue('VALUE');
	return [VALUE,Blockly.Arduino.ORDER_ATOMIC];
};