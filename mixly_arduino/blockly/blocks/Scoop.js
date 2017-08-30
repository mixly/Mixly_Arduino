'use strict';

goog.provide('Blockly.Blocks.SCoop');

goog.require('Blockly.Blocks');

Blockly.Blocks.SCoop.HUE = 120;
Blockly.Blocks['SCoopTask'] = {
  init: function() {
	var _tasknum = [["1", "1"], ["2", "2"], ["3", "3"],["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"],["8", "8"]];
    this.appendDummyInput()
        .appendField("Scoop Task")
	      .appendField(new Blockly.FieldDropdown(_tasknum), "_tasknum");
    this.appendStatementInput("setup")
        .appendField("初始化")
        .setCheck(null);
    this.appendStatementInput("loop")
        .appendField("循环")
        .setCheck(null);
    this.setColour(Blockly.Blocks.SCoop.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['SCoop_yield'] = {
  init: function() {
      this.setColour(Blockly.Blocks.SCoop.HUE);
    this.appendDummyInput("")
		.appendField("执行Scoop任务");
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
  }
};
Blockly.Blocks['SCoop_sleep'] = {
  init: function() {
    this.setColour(Blockly.Blocks.SCoop.HUE);
    this.appendDummyInput("")
		    .appendField("SCoop延时（仅用于SCoop）");
	this.appendValueInput("sleeplength", Number)
        .setCheck(Number);
	this.appendDummyInput("")
		    .appendField("毫秒");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};