'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  }
};

Blockly.Blocks.inout_digital_write = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DIGITALWRITE_PIN)
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Blocks.inout_digital_write2 = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_DIGITALWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendTitle(Blockly.LKL_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip('Write digital value to a specific Port');
  }
};

Blockly.Blocks.inout_digital_read = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DIGITALREAD_PIN)
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.inout_digital_read2 = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_DIGITALREAD_PIN)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
    this.setTooltip('');
  }
};

Blockly.Blocks.inout_analog_write = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_ANALOGWRITE_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.pwm), "PIN");
    this.appendValueInput("NUM", Number)
        .appendTitle(Blockly.LKL_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Write analog value between 0 and 255 to a specific Port');
  }
};

Blockly.Blocks.inout_analog_read = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_ANALOGREAD_PIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.analog), "PIN");
    this.setOutput(true, Number);
    this.setTooltip('Return value between 0 and 1024');
  }
};

Blockly.Blocks.inout_buildin_led = {
   init: function() {
     this.setColour(20);
     this.appendDummyInput("")
	       .appendTitle(Blockly.LKL_BUILDIN_LED)
	       .appendTitle(Blockly.LKL_STAT)
	       .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_ON, "HIGH"], [Blockly.LKL_OFF, "LOW"]]), "STAT");
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setTooltip('light or off the build-in LED');
   }
};

Blockly.Blocks.controls_attachInterrupt = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_ATTACHINTERRUPT_PIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.interrupt), "PIN")
      	.appendTitle(Blockly.LKL_MODE)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_RISING, "RISING"], [Blockly.LKL_FALLING, "FALLING"], [Blockly.LKL_CHANGE, "CHANGE"]]), "mode");
	this.appendStatementInput('DO')
        .appendTitle(Blockly.LKL_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  onchange: function() {
	  var dropdown_pin = this.getTitleValue('PIN');
	  var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
	  if(interrupt_pin=='NOT_AN_INTERRUPT'){
		  this.setWarningText(Blockly.LKL_WARNING_INTERRUPT);
	  }else{
		  this.setWarningText(null);
	  }
  }
};

Blockly.Blocks.controls_detachInterrupt = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(Blockly.LKL_DETACHINTERRUPT_PIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.interrupt), "PIN");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  },
  onchange: function() {
	  var dropdown_pin = this.getTitleValue('PIN');
	  var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
	  if(interrupt_pin=='NOT_AN_INTERRUPT'){
		  this.setWarningText(Blockly.LKL_WARNING_INTERRUPT);
	  }else{
		  this.setWarningText(null);
	  }
  }
};

Blockly.Blocks.inout_pulseIn = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_PULSEIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_PULSEIN_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.inout_pulseIn2 = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
	    .appendTitle(Blockly.LKL_PULSEIN)
	    .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
      	.appendTitle(Blockly.LKL_PULSEIN_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
	this.appendValueInput("TIMEOUT", Number)
        .appendTitle(Blockly.LKL_PULSEIN_TIMEOUT)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.inout_shiftout = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle("ShiftOut")
		.appendTitle(Blockly.LKL_DATAPIN)
        .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN1")
		.appendTitle(Blockly.LKL_CLOCKPIN)
		.appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN2")
		.appendTitle(Blockly.LKL_BITORDER)
		.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_MSBFIRST, "MSBFIRST"], [Blockly.LKL_LSBFIRST, "LSBFIRST"]]), "ORDER");
    this.appendValueInput("DATA", Number)
        .appendTitle(Blockly.LKL_DATA)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};