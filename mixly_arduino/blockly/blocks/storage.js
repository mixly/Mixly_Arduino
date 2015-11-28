'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0;

Blockly.Blocks.store_sd_write = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("FILE", String)
		.setCheck(String)
        .appendTitle(Blockly.LKL_WRITE_SD_FILE);
    this.appendValueInput("DATA", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_SD_DATA);
    this.appendValueInput("NEWLINE", Boolean)
        .setCheck(Boolean)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_SD_NEWLINE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.store_eeprom_write_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendTitle(Blockly.LKL_EEPROM_WRITE_LONG);
    this.appendValueInput("DATA", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.store_eeprom_read_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendTitle(Blockly.LKL_EEPROM_READ_LONG);
    this.setOutput(true, Number);
  }
};
