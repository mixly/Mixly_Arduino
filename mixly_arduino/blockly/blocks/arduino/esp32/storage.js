'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0;
//初始化SPIFFS
Blockly.Blocks['initialize_spiffs'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_SETUP+"SPIFFS");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
var OPEN_MODE =[
[Blockly.MIXLY_READONLY, 'FILE_READ'],
[Blockly.Msg.TEXT_WRITE_TEXT, 'FILE_WRITE'],
[Blockly.Msg.TEXT_APPEND_APPENDTEXT, 'FILE_APPEND']]

//打开文件并向其中写入数据
Blockly.Blocks['spiffs_open_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_FILE_PATH);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("/fileName.txt"), "file_path");
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MODE);
		this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(OPEN_MODE), 'MODE');
		this.setInputsInline(true);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//打开文件并向其中写入数据
Blockly.Blocks['spiffs_close_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setInputsInline(true);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
//将数据追加到文件
Blockly.Blocks['spiffs_write_data'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_WRITE);
		this.appendValueInput("data")
		.setCheck(null);
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
//文件可读
Blockly.Blocks['spiffs_read_available'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.HTML_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_AVAILABLE);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setTooltip("");
		this.setHelpUrl("");
	}
}; 

//读取文件内容
Blockly.Blocks['spiffs_read_data'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.OLED_STRING);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//检查文件大小
Blockly.Blocks['spiffs_file_size'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.Msg.HTML_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("myFile"), "file_var");
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_SIZE);
		this.setOutput(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};

//删除文件
Blockly.Blocks['spiffs_delete_file'] = {
	init: function() {
		this.appendDummyInput()
		.appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
		this.appendDummyInput() 
		.appendField(new Blockly.FieldTextInput("/fileName.txt"), "file_path");
		this.appendDummyInput();
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setInputsInline(true);
		this.setColour(Blockly.Blocks.storage.HUE);
		this.setTooltip("");
		this.setHelpUrl("");
	}
};
