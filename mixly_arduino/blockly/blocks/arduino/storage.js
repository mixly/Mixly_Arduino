'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0;

Blockly.Blocks.store_sd_write = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
	this.appendDummyInput()
		.appendField(Blockly.MIXLY_WRITE_SD_FILE)
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'FILE')
        .appendField(this.newQuote_(false));
    this.appendValueInput("DATA", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_SD_DATA);
    this.appendValueInput("NEWLINE", Boolean)
        .setCheck(Boolean)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_SD_NEWLINE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_SDWRITE);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.store_eeprom_write_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendField(Blockly.MIXLY_EEPROM_WRITE_LONG);
    this.appendValueInput("DATA", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_WRITELONG);
  }
};

Blockly.Blocks.store_eeprom_read_long = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendField(Blockly.MIXLY_EEPROM_READ_LONG);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_READLONG);
  }
};


Blockly.Blocks.store_eeprom_write_byte = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendField(Blockly.MIXLY_EEPROM_WRITE_BYTE);
    this.appendValueInput("DATA", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_WRITEBYTE);
  }
};

Blockly.Blocks.store_eeprom_read_byte = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("ADDRESS", Number)
		.setCheck(Number)
        .appendField(Blockly.MIXLY_EEPROM_READ_BYTE);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STORE_EEPROM_READBYTE);
  }
};
