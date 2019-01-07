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
        .appendField(Blockly.MIXLY_CONTROL_SCoop_Init)
        .setCheck(null);
    this.appendStatementInput("loop")
        .appendField(Blockly.MIXLY_CONTROL_SCoop_loop)
        .setCheck(null);
    this.setColour(Blockly.Blocks.SCoop.HUE);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SCOOP);
  }
};

Blockly.Blocks['SCoop_yield'] = {
  init: function() {
      this.setColour(Blockly.Blocks.SCoop.HUE);
    this.appendDummyInput("")
		.appendField(Blockly.MIXLY_CONTROL_SCoop_yield);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SCOOP_YIELD);
  }
};
Blockly.Blocks['SCoop_sleep'] = {
  init: function() {
    this.setColour(Blockly.Blocks.SCoop.HUE);
    this.appendDummyInput("")
		    .appendField(Blockly.MIXLY_CONTROL_SCoop_sleep);
	this.appendValueInput("sleeplength", Number)
        .setCheck(Number);
	this.appendDummyInput("")
		    .appendField(Blockly.MIXLY_DELAY_MS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SCOOP_SLEEP);
  }
};