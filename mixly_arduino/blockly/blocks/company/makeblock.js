'use strict';

goog.provide('Blockly.Blocks.makeblock');

goog.require('Blockly.Blocks');


Blockly.Blocks.makeblock.HUE = 120;

var MAKEBLOCK_PORTS =[["PORT_1", "PORT_1"],["PORT_2", "PORT_2"],["PORT_3", "PORT_3"],["PORT_4", "PORT_4"],["PORT_5", "PORT_5"],["PORT_6", "PORT_6"],["PORT_7", "PORT_7"],["PORT_8", "PORT_8"]];
var MAKEBLOCK_MS=[["M1", "M1"],["M2", "M2"]];
var MAKEBLOCK_SLOTS=[["SLOT1", "SLOT1"],["SLOT2", "SLOT2"]];
var MAKEBLOCK_UNIT=[["cm", "Cm"],["inch", "Inch"]];

Blockly.Blocks.mb_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_SERVO)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_servo.png", 39, 32))
        .appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_SLOTS), "PIN2");
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DELAY+'('+Blockly.LKL_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_bluetooth_readString = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_bluetooth.png", 45, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendTitle(Blockly.LKL_BLUETOOTH_READ_STR);
    this.setOutput(true, String);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_bluetooth_available = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_BLUETOOTH)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_bluetooth.png", 45, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendTitle(Blockly.LKL_AVAILABLE);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_display = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_7S_DISPLAY)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_display.png", 40, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
	this.appendValueInput('num')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_NUMBER);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_motor = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_MB_LIGHT_MOTOR)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_motor.png", 40, 32))
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_MS), "PIN");
	this.appendValueInput('speed')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_MB_LIGHT_MOTOR_SPEED);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mb_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_SOUND)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_sound.png", 48, 32))
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_TEMPERATURE)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_temperature.png", 59, 32))
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_SLOTS), "PIN2");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_joystick = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_JOYSTICK)
		.appendTitle(new Blockly.FieldDropdown([["x", "X"], ["y", "Y"]]), "STAT")
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_joystick.png", 38, 32))
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.mb_potentiometer = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_POTENTIOMETER)
		.appendField(new Blockly.FieldImage("../../media/makeblock/mb_potentiometer.png", 40, 32))
		.appendTitle("#")
        .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_pyroelectric_infrared = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_MB_PYROELECTRIC_INFRARED)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_pir_motion.png", 42, 32))
		  .appendTitle("#")
	      .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mb_chaoshengbo = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_MB_CHAOSHENGBO)
		  .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_UNIT), "PIN2")
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_ultrasonic.png", 37, 32))
		  .appendTitle("#")
	      .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_light_grayscale = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_MB_LIGHT_GRAYSCALE)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_light_grayscale.png", 35, 32))
		  .appendTitle("#")
	      .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mb_light_grayscale_led = {
  init: function() {
    this.setColour(Blockly.Blocks.makeblock.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_MB_LIGHT_GRAYSCALE)
		  .appendField(new Blockly.FieldImage("../../media/makeblock/mb_light_grayscale.png", 35, 32))
		  .appendTitle("#")
	      .appendTitle(new Blockly.FieldDropdown(MAKEBLOCK_PORTS), "PIN")
		  .appendTitle(Blockly.LKL_MB_LIGHT_GRAYSCALE_LED)
		  .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "lightOn"], [Blockly.LKL_OFF, "lightOff"]]), "STAT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
