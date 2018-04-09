'use strict';

goog.provide('Blockly.Python.factory');
goog.require('Blockly.Python');

Blockly.Python.factory_include = function() {
	var INCLUDE = this.getFieldValue('INCLUDE');
	Blockly.Python.definitions_['define_'+INCLUDE] = '#include <'+INCLUDE+'.h>';
	return '';
};

Blockly.Python.factory_function_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'null';
	}
	return NAME+'('+code.join(', ')+');\n';
};

Blockly.Python.factory_function_return = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'null';
	}
	return [NAME+'('+code.join(', ')+')',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.factory_declare = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	Blockly.Python.definitions_['var_'+TYPE+'_'+NAME] = 'let '+NAME+':' + TYPE + ';';
	return '';
};
Blockly.Python.factory_define = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    Blockly.Python.definitions_['var_' + TYPE + '_' + NAME] = TYPE + ' ' + NAME + ';';
    return '';
};
Blockly.Python.factory_static_method_noreturn = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'NULL';
	}
	return TYPE+'::'+NAME+'('+code.join(', ')+');\n';
};

Blockly.Python.factory_static_method_return = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'NULL';
	}
	return [TYPE+'::'+NAME+'('+code.join(', ')+')',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.factory_callMethod_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'null';
	}
	return NAME+'.'+METHOD+'('+code.join(', ')+');\n';
};

Blockly.Python.factory_callMethod_return = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || 'null';
	}
	return [NAME+'.'+METHOD+'('+code.join(', ')+')',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.factory_block = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.Python.factory_block_return = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.Python.ORDER_ATOMIC];
};