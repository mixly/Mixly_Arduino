'use strict';

goog.provide('Blockly.Blocks.blockgroup');

goog.require('Blockly.Blocks');

//红外接收模块
Blockly.Blocks.ir_recv = {
  init: function() {
    this.setColour(255);
	this.appendDummyInput("")
	    .appendTitle(new Blockly.FieldTextInput('ir_item'), 'VAR')
	    .appendTitle(Blockly.LKL_IR_RECEIVE)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
	this.appendStatementInput('DO')
        .appendTitle(Blockly.LKL_IR_RECEIVE_YES);
	this.appendStatementInput('DO2')
        .appendTitle(Blockly.LKL_IR_RECEIVE_NO);
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
//超声波测距
Blockly.Blocks.chaoshengbo={
	init: function() {
    this.setColour(255);
	this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_CHAOSHENGBO)
	    .appendTitle('Trig#')
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN1")
		.appendTitle(' Echo#')
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN2");
	this.setOutput(true, Number);
  }
};

//I2C通信
Blockly.Blocks.i2c_master_writer = {
  init: function() {
    this.setColour(255);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_I2C_MASTER_WRITE);
	this.appendValueInput('value')
        .setCheck([Number,String])
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_I2C_VALUE);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.i2c_master_reader = {
  init: function() {
    this.setColour(255);
	this.appendValueInput('device')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_I2C_MASTER_READ);
	this.appendValueInput('bytes')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendTitle(Blockly.LKL_I2C_BYTES);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.i2c_master_reader2 = {
  init: function() {
    this.setColour(255);
	this.appendDummyInput()
        .appendTitle(Blockly.LKL_I2C_MASTER_READ2);
	this.setOutput(true, Number);
  }
};
Blockly.Blocks.i2c_available = {
  init: function() {
    this.setColour(255);
	this.appendDummyInput()
        .appendTitle(Blockly.LKL_I2C_AVAILABLE);
	this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(255);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_SERVO)
        .appendTitle(Blockly.LKL_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_DELAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('move between 0~180 degree');
  }
};

Blockly.Blocks.servo_read_degrees = {
  init: function() {
    this.setColour(255);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_SERVO)
        .appendTitle(Blockly.LKL_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendDummyInput("")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendTitle(Blockly.LKL_READ_DEGREES)
    this.setOutput(true, Number);
    this.setTooltip('return that degree with the last servo move.');
  }
};