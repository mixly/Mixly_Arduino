'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');


Blockly.Blocks.loops.HUE = 120;

Blockly.Blocks.controls_hw_timer = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_HW_TIMER)
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"],["2", "2"], ["3", "3"]]), "TIMER_NUM");
    this.appendValueInput('TIME')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_MSTIMER2_EVERY);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MILLIS)
    .appendField(Blockly.MIXLY_MODE)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_PYTHON_ONE_SHOT, "false"], [Blockly.MIXLY_PYTHON_PERIODIC, "true"]]), "mode");

    this.appendStatementInput('DO')
    .appendField(Blockly.MIXLY_MSTIMER2_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2);
  }
};

Blockly.Blocks.controls_hw_timer_start = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_HW_TIMER)
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"],["2", "2"], ["3", "3"]]), "TIMER_NUM")
    .appendField(Blockly.MIXLY_MSTIMER2_START);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2_START);
  }
};

Blockly.Blocks.controls_hw_timer_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_HW_TIMER)
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"],["2", "2"], ["3", "3"]]), "TIMER_NUM")
    .appendField(Blockly.MIXLY_MSTIMER2_STOP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2_STOP);
  }
};
