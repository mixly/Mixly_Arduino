'use strict';

goog.provide('Blockly.JavaScript.factory');
goog.require('Blockly.JavaScript');

Blockly.JavaScript.factory_include = function() {
	var INCLUDE = this.getFieldValue('INCLUDE');
	Blockly.JavaScript.definitions_['define_'+INCLUDE] = '#include <'+INCLUDE+'.h>';
	return '';
};

Blockly.JavaScript.factory_function_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'null';
	}
	return NAME+'('+code.join(', ')+');\n';
};

Blockly.JavaScript.factory_function_return = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'null';
	}
	return [NAME+'('+code.join(', ')+')',Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.factory_declare = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	Blockly.JavaScript.definitions_['var_'+TYPE+'_'+NAME] = 'let '+NAME+':' + TYPE + ';';
	return '';
};
Blockly.JavaScript.factory_define = function () {
    var TYPE = this.getFieldValue('TYPE');
    var NAME = this.getFieldValue('NAME');
    Blockly.JavaScript.definitions_['var_' + TYPE + '_' + NAME] = TYPE + ' ' + NAME + ';';
    return '';
};
Blockly.JavaScript.factory_static_method_noreturn = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'NULL';
	}
	return TYPE+'::'+NAME+'('+code.join(', ')+');\n';
};

Blockly.JavaScript.factory_static_method_return = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'NULL';
	}
	return [TYPE+'::'+NAME+'('+code.join(', ')+')',Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.factory_callMethod_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'null';
	}
	return NAME+'.'+METHOD+'('+code.join(', ')+');\n';
};

Blockly.JavaScript.factory_callMethod_return = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
			Blockly.JavaScript.ORDER_NONE) || 'null';
	}
	return [NAME+'.'+METHOD+'('+code.join(', ')+')',Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.factory_block = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.JavaScript.factory_block_return = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.factory_block_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.JavaScript.factory_block_return_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.JavaScript.ORDER_ATOMIC];
};
