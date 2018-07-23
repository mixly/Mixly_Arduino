'use strict';

goog.provide('Blockly.Blocks.system');

goog.require('Blockly.Blocks');


Blockly.Blocks.system.HUE = 120;

Blockly.Blocks.base_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.MIXLY_DELAY + '(' + Blockly.MIXLY_DELAY_MS + ')')
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};


Blockly.Blocks.controls_millis = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
	      .appendField(Blockly.MIXLY_RUNTIME + "(" + Blockly.MIXLY_DELAY_MS + ")");
    this.setOutput(true, Number);
	  this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MILLIS);
  }
};


Blockly.Blocks.Panic_with_status_code = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("STATUS_CODE", Number)
        .appendField(Blockly.MIXLY_MICROBIT_Panic_with_status_code)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Panic_with_status_code);
  }
};


Blockly.Blocks.reset = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Reset_micro);
    this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Reset_micro);
  }
};


Blockly.Blocks.controls_uname = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_CONTORL_UNAME);

    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.MIXLY_MICROBIT_PY_CONTORL_UNAME);
  }
};
