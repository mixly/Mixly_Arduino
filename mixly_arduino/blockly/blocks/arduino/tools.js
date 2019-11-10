'use strict';

goog.provide('Blockly.Blocks.tools');
goog.require('Blockly.Blocks');
Blockly.Blocks.tools.HUE = "#555555";
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
Blockly.Blocks['uno_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/uno.png", 525, 372, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['nano_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/nano.png", 525, 368, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['mega_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/mega.png", 525, 736, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['esp32_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP32.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['esp8266_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP8266-NodeMCU.png",525 ,346, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['wemos_d1_mini_pin'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/ESP8266-WeMos-D1-Mini.png", 525, 264, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};

Blockly.Blocks['handbit_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_A.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_B.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_pin_A'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_pin_A.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};
Blockly.Blocks['handbit_pin_B'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldImage("../../media/board_pin/handbit_pin_B.jpg", 525, 376, "*"));
    this.setColour(Blockly.Blocks.tools.HUE);
    this.setTooltip();
    this.setHelpUrl();
  }
};