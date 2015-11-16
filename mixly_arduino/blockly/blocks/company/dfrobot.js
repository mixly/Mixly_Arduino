'use strict';

goog.provide('Blockly.Blocks.dfrobot');

goog.require('Blockly.Blocks');


Blockly.Blocks.dfrobot.HUE = 20;

var DF_MS=[["M1", "1"],["M2", "2"]];

Blockly.Blocks.df_romeo_motor={
init:function(){
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_ROMEO_MOTOR)
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(DF_MS), "PIN");
    this.appendValueInput('speed')
        .setCheck(Number)
        .appendTitle(Blockly.LKL_ROMEO_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.df_romeo_motor_stop={
init:function(){
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_ROMEO_MOTOR)
		.appendTitle("#")
	    .appendTitle(new Blockly.FieldDropdown(DF_MS), "PIN")
		.appendTitle(Blockly.LKL_STOP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.df_led = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_LED)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_led.png", 43, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.df_buzzer = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_buzzer.png", 39, 32));   	
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.appendDummyInput("")
		.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.df_buzzer2={
init:function(){
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_buzzer.png", 39, 32));   	
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_FREQUENCY);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.df_buzzer3={
init:function(){
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_buzzer.png", 39, 32));   	
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_FREQUENCY);
    this.appendValueInput('DURATION')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DURATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.df_btn = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_BTN)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_btn.png", 37, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_vibration = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_VIBRATION)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_vibration.png", 38, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_tilt = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_TILT)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_tilt.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_touch = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_TOUCH)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_touch.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_magnetic = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_MAGNETIC)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_magnetic.png", 36, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_pyroelectric_infrared = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_PYROELECTRIC_INFRARED)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_pyroelectric_infrared.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_joystick_d = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_JOYSTICK_D)
		  .appendField(new Blockly.FieldImage("../../media/dfrobot/df_joystick.png", 35, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.setOutput(true, Boolean);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_joystick_a = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_JOYSTICK_A)
		.appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"]]), "STAT")
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_joystick.png", 35, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_potentiometer = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_POTENTIOMETER)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_potentiometer.png", 42, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_ROTATION)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_rotation.png", 42, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_voltage = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_VOLTAGE)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_voltage.png", 39, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_piezo_disk_virbration = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_PIEZO_DISK_VIRBRATION)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_piezo_disk_virbration.png", 57, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};


Blockly.Blocks.df_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_SOUND)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_sound.png", 37, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_light = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_LIGHT)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_light.png", 40, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_grayscale = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_GRAYSCALE)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_grayscale.png", 46, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_flame = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_FLAME)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_flame.png", 41, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_TEMPERATURE)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_temperature.png", 47, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_accelerometer = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_ACCELEROMETER)
		.appendTitle(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"]]), "STAT")
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_accelerometer.png", 39, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_moisture = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_MOISTURE)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_moisture.png", 79, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_water = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_WATER)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_water.png", 51, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_co = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_CO)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_co.png", 37, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_Sharp_GP2Y0A21 = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_SHARP_GP2Y0A21)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_Sharp_GP2Y0A21.png", 38, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.df_relay = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_RELAY)
		.appendField(new Blockly.FieldImage("../../media/dfrobot/df_relay.png", 37, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.appendDummyInput("")	
      	.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.df_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_DF_LCD)
        .appendField(new Blockly.FieldImage("../../media/dfrobot/df_lcd.png", 70, 32));
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT2)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.df_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.dfrobot.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_DF_LCD)
        .appendField(new Blockly.FieldImage("../../media/dfrobot/df_lcd.png", 70, 32))
		.appendField(new Blockly.FieldDropdown([[Blockly.LKL_LCD_STAT_ON, "display"], [Blockly.LKL_LCD_STAT_OFF, "noDisplay"], [Blockly.LKL_LCD_STAT_CURSOR, "cursor"], [Blockly.LKL_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.LKL_LCD_STAT_BLINK, "blink"], [Blockly.LKL_LCD_STAT_NOBLINK, "noBlink"], [Blockly.LKL_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};