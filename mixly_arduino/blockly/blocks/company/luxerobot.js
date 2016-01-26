'use strict';
goog.provide('Blockly.Blocks.luxerobot');
goog.require('Blockly.Blocks');
Blockly.Blocks.luxerobot.HUE = 40;

Blockly.Blocks.luxerobot_on_off = {
   init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LUXE_LED_ON,"HIGH"],[Blockly.LUXE_LED_OFF,"LOW"]]), 'STAT');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.luxerobot_led_select = {
   init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["ledLeft","12"],["ledRight","13"]]), 'STAT');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.luxerobot_motor_select = {
   init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([["motorLeft","5"],["motorRight","6"]]), 'STAT');
    this.setOutput(true, Number);
  }
};


Blockly.Blocks.luxerobot_motor_dir = {
   init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LUXE_MOTOR_FORWARD,"LOW"],[Blockly.LUXE_MOTOR_REVERSE,"HIGH"]]), 'STAT');
    this.setOutput(true, Number);
  }
};

var NOTES=[["NOTE_C3", "NOTE_C3"],["NOTE_D3", "NOTE_D3"],["NOTE_E3", "NOTE_E3"],["NOTE_F3", "NOTE_F3"],["NOTE_G3", "NOTE_G3"],["NOTE_A3", "NOTE_A3"],["NOTE_B3", "NOTE_B3"],
           ["NOTE_C4", "NOTE_C4"],["NOTE_D4", "NOTE_D4"],["NOTE_E4", "NOTE_E4"],["NOTE_F4", "NOTE_F4"],["NOTE_G4", "NOTE_G4"],["NOTE_A4", "NOTE_A4"],["NOTE_B4", "NOTE_B4"],
           ["NOTE_C5", "NOTE_C5"],["NOTE_D5", "NOTE_D5"],["NOTE_E5", "NOTE_E5"],["NOTE_F5", "NOTE_F5"],["NOTE_G5", "NOTE_G5"],["NOTE_A5", "NOTE_A5"],["NOTE_B5", "NOTE_B5"]];


Blockly.Blocks.luxerobot_notes = {
   init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown(NOTES), 'STAT');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.luxerobot_led = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_LED)
        .appendTitle(new Blockly.FieldDropdown([["ledLeft","ledLeft"],["ledRight","ledRight"]]), 'PIN')
		.appendTitle(Blockly.LUXE_STAT)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LUXE_LED_ON,"on"],[Blockly.LUXE_LED_OFF,"off"]]), 'STAT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_led_change = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_LED)
        .appendTitle(new Blockly.FieldDropdown([["ledLeft","ledLeft"],["ledRight","ledRight"]]), 'PIN')
		.appendTitle(Blockly.LUXE_LED_CHANGE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_motor = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_MOTOR)
        .appendTitle(new Blockly.FieldDropdown([["motorLeft","motorLeft"],["motorRight","motorRight"]]), 'PIN');
	this.appendValueInput("STAT", Number)
        .appendTitle(Blockly.LUXE_SPEED)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_motor2 = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_MOTOR)
        .appendTitle(new Blockly.FieldDropdown([["motorLeft","motorLeft"],["motorRight","motorRight"]]), 'PIN')
		.appendTitle(Blockly.LUXE_DIR)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LUXE_MOTOR_REVERSE,"COUNTERCLOCKWISE"],[Blockly.LUXE_MOTOR_FORWARD,"CLOCKWISE"]]), 'STAT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_motor_change_dir = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_MOTOR)
        .appendTitle(new Blockly.FieldDropdown([["motorLeft","motorLeft"],["motorRight","motorRight"]]), 'PIN')
		.appendTitle(Blockly.LUXE_MOTOR_CHANGE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_motor_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_MOTOR)
        .appendTitle(new Blockly.FieldDropdown([["motorLeft","motorLeft"],["motorRight","motorRight"]]), 'PIN')
		.appendTitle(Blockly.LUXE_MOTOR_STOP);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_speaker_play = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendValueInput("NOTE", Number)
		.appendTitle(Blockly.LUXE_SPEAKER_PLAYSOUND)
		.appendTitle(Blockly.LUXE_SPEAKER_FREQUENCY)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_speaker_play_duration = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendValueInput("NOTE", Number)
		.appendTitle(Blockly.LUXE_SPEAKER_PLAYSOUND)
		.appendTitle(Blockly.LUXE_SPEAKER_FREQUENCY)
        .setCheck(Number)
	this.appendValueInput("DURATION", Number)
        .appendTitle(Blockly.LUXE_SPEAKER_DURATION)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.luxerobot_speaker_nosound = {
  init: function() {
    this.setColour(Blockly.Blocks.luxerobot.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LUXE_SPEANER_NOSOUND);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};