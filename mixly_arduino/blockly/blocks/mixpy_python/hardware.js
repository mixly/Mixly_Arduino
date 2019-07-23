'use strict';

goog.provide('Blockly.Blocks.hardware');

goog.require('Blockly.Blocks');

Blockly.Blocks.hardware.HUE = 40

Blockly.Blocks.hardware_arduino_start = {
    init: function () {
        this.setColour(Blockly.Blocks.hardware.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_HARDWARE)
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_HARDWARE_START)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(Blockly.Blocks.hardware.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH, "HIGH"], [Blockly.MIXLY_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};

Blockly.Blocks.hardware_arduino_digital_write = {
  init: function() {
    this.setColour(Blockly.Blocks.hardware.HUE);
    this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.MIXLY_Digital_PINMODEOUT)
        .appendField(Blockly.MIXLY_PIN)
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

Blockly.Blocks.hardware_arduino_digital_read = {
  init: function() {
    this.setColour(Blockly.Blocks.hardware.HUE);
    this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_Digital_PINMODEIN)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
    this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
  }
};

Blockly.Blocks.hardware_arduino_analog_write = {
  init: function() {
    this.setColour(Blockly.Blocks.hardware.HUE);
    this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.MIXLY_Analog_PINMODEOUT)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_VALUE2)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
  }
};

Blockly.Blocks.hardware_arduino_analog_read = {
  init: function() {
    this.setColour(Blockly.Blocks.hardware.HUE);
    this.appendValueInput('SUB')
        .appendField(Blockly.MIXLY_HARDWARE)
        .setCheck("var");
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_Analog_PINMODEIN)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
    this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
  }
};