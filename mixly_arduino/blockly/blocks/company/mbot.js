'use strict';

goog.provide('Blockly.Blocks.mbot');

goog.require('Blockly.Blocks');

Blockly.Blocks.mbot.HUE = 210;

Blockly.Blocks['mbot_move'] = {
   init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_FORWARD, "1"], [Blockly.MIXLY_BACKWARD, "2"],[Blockly.MIXLY_TURNLEFT, "3"],[Blockly.MIXLY_TURNRIGHT, "4"]]), 'direction')
    this.appendValueInput('speed')
		.setCheck(Number)
		.appendField(Blockly.MIXLY_MBOT_SPEED);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_motor = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_MB_LIGHT_MOTOR)
		.appendField("#")
	    .appendField(new Blockly.FieldDropdown([["M1", "9"], ["M2", "10"]]), "PORT");
	this.appendValueInput('speed')
		.setCheck(Number)
		.appendField(Blockly.MIXLY_MB_LIGHT_MOTOR_SPEED);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SERVO)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN")
		.appendField("#")
        .appendField(new Blockly.FieldDropdown([["Slot1", "1"], ["Slot2", "2"]]), "PIN2");
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_led = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SET_LED)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LED_ON_BOARD, "7"],["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ALL, "0"],["1", "1"], ["2", "2"]]), "PIN2");
    this.appendValueInput("R", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("R");
	this.appendValueInput("G", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("G");
	this.appendValueInput("B", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("B");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_tone={
init:function(){
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_MBOT_TONE);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_FREQUENCY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mbot_notone={
init:function(){
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_MBOT_NOTONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mbot_display={
init:function(){
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	    .appendField(Blockly.MIXLY_MBOT_SET_DISPLAY)
		.appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN");
	this.appendValueInput('value')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_NUMBER);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.mbot_showface_text = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SHOW_FACE)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN");
    this.appendValueInput("x", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x:");
	this.appendValueInput("y", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y:");
	//this.appendValueInput("text", String)
      //  .setCheck(String)
        //.setAlign(Blockly.ALIGN_RIGHT)
        //.appendField(Blockly.MIXLY_SHOW_FACE_TEXT);
	this.appendDummyInput()
		.appendField(Blockly.MIXLY_SHOW_FACE_TEXT)
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'text')
        .appendField(this.newQuote_(false));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
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

Blockly.Blocks.mbot_showface_time = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_SHOW_FACE)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN");
    this.appendValueInput("h", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_SHOW_FACE_TIME);
	this.appendValueInput("m", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(":");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_set_light_senser_led = {
  init: function() {
	this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MBOT_SET_LIGHT)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port3", "3"],["Port4", "4"]]), "PIN")
		.appendField(Blockly.MIXLY_MBOT_SET_LIGHT_LED)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ON, "1"],[Blockly.MIXLY_OFF, "0"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_set_camera= {
  init: function() {
	this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MBOT_SET_CAMERA)
        .appendField("#")
        .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PIN")
		.appendField(Blockly.MIXLY_MBOT_SET_CAMERA_STAT)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MBOT_SET_CAMERA_PRESS, "0"],[Blockly.MIXLY_MBOT_SET_CAMERA_RELEASE, "1"],[Blockly.MIXLY_MBOT_SET_CAMERA_FOCUS_ON, "2"],[Blockly.MIXLY_MBOT_SET_CAMERA_FOCUS_OFF, "3"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.mbot_light_sensor = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_LIGHT_SENSOR)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LIGHT_SENSOR_ON_BOARD, "8"],["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_button = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_BUTTON)
	      .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MBOT_BUTTON_PRESSED, "0"],[Blockly.MIXLY_MBOT_BUTTON_RELEASED, "1"]]), "STAT");
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mbot_chaoshengbo = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MB_CHAOSHENGBO)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_line_follower = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_LINE_FOLLOWER)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_joystick = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_JOYSTICK)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Port3", "3"],["Port4", "4"]]), "PORT")
		  .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MBOT_JOYSTICK_X, "1"],[Blockly.MIXLY_MBOT_JOYSTICK_Y, "2"]]), "axis");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_potentiometer = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_POTENTIOMETER)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_sound_sensor = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_SOUND_SENSOR)
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_limit_switch = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_LIMIT_SWITCH)
		  .appendField("#")
		  .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PORT")
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Slot1", "1"],["Slot2", "2"]]), "SLOT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_temperature= {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_TEMPERATURE)
		  .appendField("#")
		  .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PORT")
		  .appendField("#")
	      .appendField(new Blockly.FieldDropdown([["Slot1", "1"],["Slot2", "2"]]), "SLOT")
		  .appendField("℃");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_pir_motion_sensor= {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_PIR_MOTION_SENSOR)
		  .appendField("#")
		  .appendField(new Blockly.FieldDropdown([["Port1", "1"], ["Port2", "2"],["Port3", "3"],["Port4", "4"]]), "PORT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.mbot_ir_remote= {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_IR_REMOTE)
		  .appendField(new Blockly.FieldDropdown([["A", "69"], ["B", "70"],["C", "71"],["D", "68"],["E", "67"], ["F", "13"],["↑", "64"],["↓", "25"],["←", "7"],["→", "9"],[Blockly.MIXLY_SETTING, "21"],["R0", "22"],["R1", "12"],["R2", "24"],["R3", "94"],["R4", "8"],["R5", "28"],["R6", "90"],["R7", "66"],["R8", "82"],["R9", "74"]]), "btn")
		  .appendField(Blockly.MIXLY_MBOT_IR_REMOTE_PRESSED);
    this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.mbot_send_message = {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
	this.appendValueInput("text", String)
        .setCheck(String)
        .appendField(Blockly.MIXLY_SEND_MBOT_MESSAGE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.mbot_message_received= {
  init: function() {
    this.setColour(Blockly.Blocks.mbot.HUE);
    this.appendDummyInput("")
	      .appendField(Blockly.MIXLY_MBOT_MESSAGE_RECEIVED);
    this.setOutput(true, String);
  }
};