'use strict';

goog.provide('Blockly.Arduino.factory');
goog.require('Blockly.Arduino');

Blockly.Arduino.factory_include = function() {
	var INCLUDE = this.getFieldValue('INCLUDE');
	Blockly.Arduino.definitions_['include_'+INCLUDE] = '#include <'+INCLUDE+'.h>';
	return '';
};

Blockly.Arduino.factory_function_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return NAME+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_function_return = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [NAME+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_declare = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	Blockly.Arduino.definitions_['var_'+TYPE+'_'+NAME] = TYPE+' '+NAME+';';
	return '';
};
Blockly.Arduino.factory_define = function () {
    var TYPE = this.getFieldValue('TYPE');
    if (TYPE.substr(0,1)=='#')
    	TYPE = TYPE.substr(1);
    var NAME = this.getFieldValue('NAME');
    Blockly.Arduino.definitions_[TYPE + '_' + NAME] = '#'+TYPE + ' ' + NAME ;
    return '';
};
Blockly.Arduino.factory_static_method_noreturn = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return TYPE+'::'+NAME+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_static_method_return = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [TYPE+'::'+NAME+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_callMethod_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return NAME+'.'+METHOD+'('+code.join(', ')+');\n';
};

Blockly.Arduino.factory_callMethod_return = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
			Blockly.Arduino.ORDER_NONE) || 'NULL';
	}
	return [NAME+'.'+METHOD+'('+code.join(', ')+')',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_block = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.Arduino.factory_block_return = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.factory_block_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.Arduino.factory_block_return_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.Arduino.ORDER_ATOMIC];
};
