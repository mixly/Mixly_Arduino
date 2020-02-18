'use strict';

goog.provide('Blockly.Blocks.communicate');

goog.require('Blockly.Blocks');

profile["default"] = profile["arduino_esp32"];
Blockly.Blocks.communicate.HUE = 140;


Blockly.Blocks['serialBT_Init'] = {
  init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendValueInput("CONTENT", String)
    .appendField(Blockly.MIXLY_SERIALBT_INIT)
    .setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIAL_BEGIN);
  }
};
Blockly.Blocks['serialBT_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SERIALBT_AVAILABLE);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
  }
};

Blockly.Blocks['serialBT_read'] = {
  init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SERIALBT_READ);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
    
  }
};
Blockly.Blocks['serialBT_write'] = {
  init: function () {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendValueInput("CONTENT", String)
    .appendField(Blockly.MIXLY_SERIALBT_WRITE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_WRITE_TOOLTIP);
  }
};

