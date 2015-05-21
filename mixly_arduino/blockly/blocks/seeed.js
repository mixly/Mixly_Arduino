'use strict';

goog.provide('Blockly.Blocks.seeed');

goog.require('Blockly.Blocks');


Blockly.Blocks.seeed.HUE = 330;

Blockly.Blocks.seeed_led = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_LED)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_led.jpg", 37, 32))
		.appendTitle(Blockly.LKL_PIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.seeed_buzzer = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_buzzer.jpg", 30, 32))
		.appendTitle(Blockly.LKL_PIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.seeed_relay = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_RELAY)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_relay.jpg", 45, 32))
		.appendTitle(Blockly.LKL_PIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.seeed_btn = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_BTN)
		  .appendField(new Blockly.FieldImage("../../media/seeed/seeed_btn.jpg", 38, 32))
		  .appendTitle(Blockly.LKL_PIN)
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_tilt = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_TILT)
		  .appendField(new Blockly.FieldImage("../../media/seeed/seeed_tilt.jpg", 39, 32))
		  .appendTitle(Blockly.LKL_PIN)
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_ROTATION)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_rotation.jpg", 31, 32))
		.appendTitle(Blockly.LKL_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Blocks.seeed_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_SOUND)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_sound.jpg", 32, 32))
		.appendTitle(Blockly.LKL_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};