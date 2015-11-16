'use strict';
goog.provide('Blockly.Blocks.labplusrobot');
goog.require('Blockly.Blocks');

Blockly.Blocks.labplusrobot.HUE = 330;

Blockly.Blocks.labplusrobot_movement = {
  init: function() {
    this.setColour(Blockly.Blocks.labplusrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_LABPLUS_ROBOT_MOVEMENT)
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_LABPLUS_ROBOT_MOVEMENT_GO_FORWARD, "move"], [Blockly.LKL_LABPLUS_ROBOT_MOVEMENT_STOP, "stop"],[Blockly.LKL_LABPLUS_ROBOT_MOVEMENT_GO_BACK, "back"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.labplusrobot_turn = {
  init: function() {
    this.setColour(Blockly.Blocks.labplusrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_LABPLUS_ROBOT)
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_LABPLUS_ROBOT_TURN_LEFT, "left"], [Blockly.LKL_LABPLUS_ROBOT_TURN_RIGHT, "right"]]), "STAT");
	this.appendValueInput('degree')
		.setCheck(Number);
	this.appendDummyInput("")
	    .appendTitle('°');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.labplusrobot_display = {
  init: function() {
    this.setColour(Blockly.Blocks.labplusrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_LABPLUS_ROBOT_DISPLAY)
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_SMILE, "smile"], [Blockly.LKL_LABPLUS_ROBOT_DISPLAY_NOSMILE, "nosmile"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_CLOSE_EYE, "close_eye"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_LEFT, "left_bmp"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_RIGHT, "right_bmp"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_TIAOWEN, "tiaowen_bmp"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_ZEBRA, "zebra_bmp"],[Blockly.LKL_LABPLUS_ROBOT_DISPLAY_NOTHING, "nothing"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.labplusrobot_led_top = {
  init: function() {
    this.setColour(Blockly.Blocks.labplusrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_LABPLUS_ROBOT_LED_TOP)
	    .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "on"], [Blockly.LKL_OFF, "off"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.labplusrobot_led_side = {
  init: function() {
    this.setColour(Blockly.Blocks.labplusrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_LABPLUS_ROBOT_LED_SIDE);
	this.appendValueInput('R')
		.setCheck(Number)
		.appendTitle('R');
	this.appendValueInput('G')
		.setCheck(Number)
		.appendTitle('G');
	this.appendValueInput('B')
		.setCheck(Number)
		.appendTitle('B');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};