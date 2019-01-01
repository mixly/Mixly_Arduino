'use strict';

goog.provide('Blockly.Python.factory');
goog.require('Blockly.Python');

Blockly.Python.factory_from_import = function() {
	var path = this.getFieldValue('path');
	var module = this.getFieldValue('module');
	Blockly.Python.definitions_['import_'+path+'_'+module] = 'from '+path+' import ' + module;	
	return '';
};

Blockly.Python.factory_import = function() {
	var module = this.getFieldValue('module');
	Blockly.Python.definitions_['import_'+module] = 'import ' + module;
	return '';
};

Blockly.Python.factory_function_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || '';
	}
	return NAME+'('+code.join(', ')+')\n';
};

Blockly.Python.factory_function_return = function() {
	var NAME = this.getFieldValue('NAME');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || '';
	}
	return [NAME+'('+code.join(', ')+')',Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.factory_declare = function() {
	var TYPE = this.getFieldValue('TYPE');
	var NAME = this.getFieldValue('NAME');
	return NAME+' = ' + TYPE + '()\n';

};

Blockly.Python.factory_callMethod_noreturn = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || '';
	}
	return NAME+'.'+METHOD+'('+code.join(', ')+')\n';
};

Blockly.Python.factory_callMethod_return = function() {
	var NAME = this.getFieldValue('NAME');
	var METHOD = this.getFieldValue('METHOD');
	var code = new Array(this.itemCount_);
	for (var n = 0; n < this.itemCount_; n++) {
		code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
			Blockly.Python.ORDER_NONE) || '';
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

Blockly.Python.factory_block_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	//if(!(VALUE.charAt(VALUE.length-1)==";")){
		//VALUE=VALUE+';';
	//}
	return VALUE+'\n';
};

Blockly.Python.factory_block_return_with_textarea = function() {
	var VALUE = this.getFieldValue('VALUE');
	return [VALUE,Blockly.Python.ORDER_ATOMIC];
};
