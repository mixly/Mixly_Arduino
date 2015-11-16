'use strict';

goog.provide('Blockly.Blocks.sense');

goog.require('Blockly.Blocks');

Blockly.Blocks.sense.HUE = 160;


Blockly.Blocks.sense_motor_speed = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendValueInput('speed')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_SENSE_MOTOR);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_motor_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_SENSE_MOTOR_STOP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_servo = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendValueInput('angle')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_SENSE_SERVO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_led_digital_display = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendValueInput('value')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_SENSE_DIGITAL_DISPLAY);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_led_digital_display_close = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_SENSE_DIGITAL_DISPLAY_CLOSE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_rgbled = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendValueInput('R')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_SENSE_RGBLED+'R');
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

var sense_direction=[[Blockly.LKL_EAST, "EAST"],[Blockly.LKL_SOUTH, "SOUTH"],[Blockly.LKL_WEST, "WEST"],[Blockly.LKL_NORTH, "NORTH"]];

Blockly.Blocks.sense_traffic_led = {
   init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput("")
		.appendTitle(Blockly.LKL_TRAFFIC_LED)
		.appendTitle(new Blockly.FieldDropdown(sense_direction), 'direction')
		.appendTitle('R')
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), 'stat_r')
		.appendTitle('Y')
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), 'stat_y')
		.appendTitle('G')
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), 'stat_g');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.sense_buzzer = {
   init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput("")
		.appendTitle(Blockly.LKL_SENSE_BUZZER)
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "1"], [Blockly.LKL_OFF, "0"]]), 'stat');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.sense_ledmatrix = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendValueInput('value')
		.setCheck(Number)
		.appendTitle(Blockly.LKL_SENSE_LED_MATRIX);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_ledmatrix_close = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_LED_MATRIX_CLOSE);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.sense_ultrasonic = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_ULTRASONIC);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_SOUND);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_light = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_LIGHT);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_TEMPERATURE);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_humidity = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_HUMIDITY);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_sliding = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_SLIDING);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.sense_weight = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_WEIGHT);
    this.setOutput(true, Number);
  }
};

//红外接收模块
Blockly.Blocks.sense_ir = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_SENSE_IR)
	    .appendTitle(new Blockly.FieldTextInput('sense_value'), 'VAR');
	this.appendStatementInput('DO')
        .appendTitle('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks.sense_motion = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_SENSE_PYROELECTRIC_INFRARED);
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.sense_button = {
  init: function() {
    this.setColour(Blockly.Blocks.sense.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_BUTTON)
		.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_UP, "UP"], [Blockly.LKL_DOWN, "DOWN"], [Blockly.LKL_LEFT, "LEFT"], [Blockly.LKL_RIGHT, "RIGHT"], [Blockly.LKL_MID, "MID"]]), 'stat')
		.appendTitle(Blockly.LKL_IS_PRESSED);
    this.setOutput(true, Boolean);
  }
};