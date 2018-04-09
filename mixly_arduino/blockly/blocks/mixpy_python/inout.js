'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');



Blockly.Blocks['inout_input']={
init: function() {
    this.setColour(20);
    this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_raw_input)
        .setCheck(String);
    this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
  }
}

Blockly.Blocks['inout_print'] = {
  init: function() {
    this.setColour(20);
        this.appendValueInput("CONTENT", String)
        .appendField(Blockly.blockpy_inout_print);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};