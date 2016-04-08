'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(20);
    this.appendDummyInput("")
        .appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_HIGHLOW);
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
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
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
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_digital_read = {
  init: function() {
    this.setColour(20);
    this.appendDummyInput("")
	      .appendTitle(Blockly.LKL_DIGITALREAD_PIN)
	      .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_DIGITAL_READ);
  }
};

Blockly.Blocks.inout_digital_read2 = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_DIGITALREAD_PIN)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_DIGITAL_READ);
  }
};

Blockly.Blocks.inout_analog_write = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_ANALOGWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendTitle(Blockly.LKL_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_ANALOG_WRITE);
  }
};

Blockly.Blocks.inout_analog_read = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_ANALOGREAD_PIN)
        .setCheck(Number);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_ANALOG_READ);
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
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_ATTACHINTERRUPT_PIN)
        .setCheck(Number);
    this.appendDummyInput("")
      	.appendTitle(Blockly.LKL_MODE)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_RISING, "RISING"], [Blockly.LKL_FALLING, "FALLING"], [Blockly.LKL_CHANGE, "CHANGE"]]), "mode");
	this.appendStatementInput('DO')
        .appendTitle(Blockly.LKL_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_ATTACHINTERRUPT);
  }/*,
  onchange: function() {
	  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	  var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
	  if(interrupt_pin=='NOT_AN_INTERRUPT'){
		  this.setWarningText(Blockly.LKL_WARNING_INTERRUPT);
	  }else{
		  this.setWarningText(null);
	  }
  }*/
};

Blockly.Blocks.controls_detachInterrupt = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_DETACHINTERRUPT_PIN)
        .setCheck(Number);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_INOUT_DETACHINTERRUPT);
  }/*,
  onchange: function() {
	  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	  var interrupt_pin=digitalPinToInterrupt(dropdown_pin).toString();
	  if(interrupt_pin=='NOT_AN_INTERRUPT'){
		  this.setWarningText(Blockly.LKL_WARNING_INTERRUPT);
	  }else{
		  this.setWarningText(null);
	  }
  }*/
};

Blockly.Blocks.inout_pulseIn = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PULSEIN)
        .setCheck(Number);
    this.appendDummyInput("")
      	.appendTitle(Blockly.LKL_PULSEIN_STAT)
      	.appendTitle(new Blockly.FieldDropdown([[Blockly.LKL_HIGH, "HIGH"], [Blockly.LKL_LOW, "LOW"]]), "STAT");
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.inout_pulseIn2 = {
  init: function() {
    this.setColour(20);
	this.appendValueInput("PIN", Number)
        .appendTitle(Blockly.LKL_PULSEIN)
        .setCheck(Number);
    this.appendDummyInput("")
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
        .appendTitle("ShiftOut");
	this.appendValueInput("PIN1", Number)
        .appendTitle(Blockly.LKL_DATAPIN)
        .setCheck(Number);
	this.appendValueInput("PIN2", Number)
        .appendTitle(Blockly.LKL_CLOCKPIN)
        .setCheck(Number);
	this.appendDummyInput("")
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