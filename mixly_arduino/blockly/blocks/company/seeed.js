'use strict';

goog.provide('Blockly.Blocks.seeed');

goog.require('Blockly.Blocks');


Blockly.Blocks.seeed.HUE = 65;

Blockly.Blocks.seeed_servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
	this.appendValueInput("PIN", Number)
		.appendTitle(Blockly.LKL_SERVO)
		.appendTitle(new Blockly.FieldImage("../../media/seeed/seeed_servo.png", 30, 32))
		.appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
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

Blockly.Blocks.seeed_servo_read_degrees = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_SERVO)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_servo.png", 30, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_READ_DEGREES)
    this.setOutput(true, Number);
	this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_led = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_LED)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_led.jpg", 37, 32));
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

Blockly.Blocks.seeed_buzzer = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_BUZZER)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_buzzer.jpg", 30, 32));
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

Blockly.Blocks.seeed_relay = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_DF_RELAY)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_relay.jpg", 45, 32));
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

Blockly.Blocks.seeed_btn = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_BTN)
		  .appendField(new Blockly.FieldImage("../../media/seeed/seeed_btn.jpg", 38, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_tilt = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_TILT)
		  .appendField(new Blockly.FieldImage("../../media/seeed/seeed_tilt.jpg", 39, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_touch = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DF_TOUCH)
		  .appendField(new Blockly.FieldImage("../../media/seeed/seeed_touch.png", 32, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_rotation = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_ROTATION)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_rotation.jpg", 31, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_sound = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_SOUND)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_sound.jpg", 32, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_light = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_LIGHT)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_light.png", 31, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.seeed_temperature = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DF_TEMPERATURE)
		.appendField(new Blockly.FieldImage("../../media/seeed/seeed_temperature.png", 37, 32));
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};

Blockly.Blocks.grove_serial_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_LCD_RGB_BACKLIGHT)
        .appendField(new Blockly.FieldImage("../../media/seeed/seeed_lcd.png", 58, 32));
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

Blockly.Blocks.grove_serial_lcd_print2 = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_LCD_RGB_BACKLIGHT)
        .appendField(new Blockly.FieldImage("../../media/seeed/seeed_lcd.png", 58, 32));
	this.appendValueInput("row", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_ROW);
	this.appendValueInput("column", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_COLUMN);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LKL_LCD_PRINT);
    this.setPreviousStatement(true, null);
	this.setInputsInline(true);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.grove_serial_lcd_setrgb = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_LCD_RGB_BACKLIGHT)
        .appendField(new Blockly.FieldImage("../../media/seeed/seeed_lcd.png", 58, 32))
		.appendTitle(Blockly.LKL_LCD_SETCOLOR);
    this.appendValueInput("R", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("R");
    this.appendValueInput("G", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("G")
	this.appendValueInput("B", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("B")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks.grove_serial_lcd_power = {
  init: function() {
    this.setColour(Blockly.Blocks.seeed.HUE);
    this.appendDummyInput()
        .appendTitle(Blockly.LKL_LCD_RGB_BACKLIGHT)
        .appendField(new Blockly.FieldImage("../../media/seeed/seeed_lcd.png", 58, 32))
		.appendField(new Blockly.FieldDropdown([[Blockly.LKL_LCD_STAT_ON, "display"], [Blockly.LKL_LCD_STAT_OFF, "noDisplay"], [Blockly.LKL_LCD_STAT_CURSOR, "cursor"], [Blockly.LKL_LCD_STAT_NOCURSOR, "noCursor"], [Blockly.LKL_LCD_STAT_BLINK, "blink"], [Blockly.LKL_LCD_STAT_NOBLINK, "noBlink"], [Blockly.LKL_LCD_STAT_CLEAR, "clear"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};