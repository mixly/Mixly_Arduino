'use strict';
goog.provide('Blockly.Blocks.pins');
goog.require('Blockly.Blocks');
Blockly.Blocks.pins.HUE = 230;

profile["default"] = profile["Arduino/Genuino Uno"] ;

Blockly.Blocks['pins_digital'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
  this.setOutput(true, Number);
}
};

Blockly.Blocks['pins_analog'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
  this.setOutput(true, Number);
}
};

Blockly.Blocks['pins_pwm'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'PIN');
  this.setOutput(true, Number);
}
};

Blockly.Blocks['pins_interrupt'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.interrupt), 'PIN');
  this.setOutput(true, Number);
}
};
Blockly.Blocks['pins_MOSI'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.MOSI), 'PIN');
  this.setOutput(true, Number);
}
};
Blockly.Blocks['pins_MISO'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.MISO), 'PIN');
  this.setOutput(true, Number);
}
};
Blockly.Blocks['pins_SCK'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.SCK), 'PIN');
  this.setOutput(true, Number);
}
};
Blockly.Blocks['pins_SCL'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.SCL), 'PIN');
  this.setOutput(true, Number);
}
};
Blockly.Blocks['pins_SDA'] = {
 init: function() {
  this.setColour(Blockly.Blocks.pins.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(profile.default.SDA), 'PIN');
  this.setOutput(true, Number);
}
};