'use strict';

goog.provide('Blockly.Blocks.base');
goog.require('Blockly.Blocks');

Blockly.Blocks.base.HUE = 20//'#ae3838';//40;

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH, "HIGH"], [Blockly.MIXLY_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};

Blockly.Blocks.inout_digital_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_DIGITALWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_digital_read = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_DIGITALREAD_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
  }
};

Blockly.Blocks.inout_analog_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_ANALOGWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE_PY);
  }
};

Blockly.Blocks.inout_analog_write_set = {
    init: function(){
        this.setColour(Blockly.Blocks.base.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.appendDummyInput()
           .appendField(Blockly.MIXLY_MICROBIT_JS_PERIOD_MIL)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_mSecond, "period"],
                [Blockly.MIXLY_uSecond, "period_microseconds"]
            ]), "key");
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.MIXLY_STAT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE_SET);
    }
};

Blockly.Blocks.inout_analog_read = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_ANALOGREAD_PIN)
        .setCheck(Number);
	this.setInputsInline(true);
	this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
  }
};

Blockly.Blocks['sensor_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.base.HUE);
        this.appendValueInput('pin')
            .appendField(Blockly.MIXLY_PIN);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

Blockly.Blocks.inout_digital_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.MIXLY_DIGITALWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};