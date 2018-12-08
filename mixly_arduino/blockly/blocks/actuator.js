'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;

Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DELAY+'('+Blockly.MIXLY_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
  }
};

Blockly.Blocks.servo_writeMicroseconds = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_SERVO_WRITEMICROSECONDS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SERVO_WRITEMICROSECONDS);
  }
};

Blockly.Blocks.servo_read_degrees = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_READ_DEGREES)
    this.setOutput(true, Number);
	this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_READ);
  }
};


var TONE_NOTES=[["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
           ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
           ["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]];


Blockly.Blocks.tone_notes = {
   init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_TONE_NOTE);
  }
};

Blockly.Blocks.controls_tone={
init:function(){
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_TONE_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_FREQUENCY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
  }
};

Blockly.Blocks.controls_tone2={
init:function(){
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_TONE_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('DURATION')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DURATION);
	this.appendDummyInput("")
		.appendField(Blockly.MIXLY_DELAY_MS);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
  }
};

Blockly.Blocks.controls_notone={
init:function(){
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_NOTONE_PIN)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
  }
};

Blockly.Blocks.group_stepper_setup={
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
		.appendField(Blockly.MIXLY_STEPPER_SETUP_STEPPER)
        .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
	this.appendValueInput("PIN1", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN1)
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN2)
        .setCheck(Number);
    this.appendValueInput('steps')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
	this.appendValueInput('speed')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_STEP);
  }
}

Blockly.Blocks.group_stepper_setup2={
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
		.appendField(Blockly.MIXLY_STEPPER_SETUP_STEPPER)
        .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
	this.appendValueInput("PIN1", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN1)
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN2)
        .setCheck(Number);
	this.appendValueInput("PIN3", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN3)
        .setCheck(Number);
	this.appendValueInput("PIN4", Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_PIN4)
        .setCheck(Number);
    this.appendValueInput('steps')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
	this.appendValueInput('speed')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_STEP2);
  }
}

Blockly.Blocks.group_stepper_move={
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_STEPPER)
            .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
        this.appendValueInput('step')
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_STEPPER_STEP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_MOVE);
    }
}
