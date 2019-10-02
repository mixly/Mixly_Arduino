'use strict';

goog.provide('Blockly.Blocks.tools');
goog.require('Blockly.Blocks');
Blockly.Blocks.tools.HUE = 65;
Blockly.Blocks.factory_notes = {
  init: function() {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_CONTROL_NOTES)
    .appendField(new Blockly.FieldTextArea(''), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.folding_block = {
  init: function() {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(Blockly.FOLDING_BLOCK), "peien");
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setTooltip(Blockly.FOLDING_BLOCK_HELP);
  }
};


//IIC地址查找
Blockly.Blocks.IICSCAN = {
  init: function () {
    this.setColour(Blockly.Blocks.tools.HUE);
    this.appendDummyInput("")
      .appendField(Blockly.IICSCAN);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

