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
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2);
}
};

Blockly.Blocks.controls_runnig_core = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP32")
        .appendField("Task")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"]]), "task");
    this.appendStatementInput("setup")
        .setCheck(null)
        .appendField(Blockly.MIXLY_SETUP);
    this.appendStatementInput("loop")
        .setCheck(null)
        .appendField(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
    this.setColour(Blockly.Blocks.loops.HUE);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks.control_core_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_CONTROL_CORE_DELAY);
    this.appendValueInput("sleeplength", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MILLIS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SCOOP_SLEEP);
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
    .appendField(Blockly.MIXLY_STOP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2_STOP);
}
};
