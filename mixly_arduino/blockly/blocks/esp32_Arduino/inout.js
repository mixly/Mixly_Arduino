'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks.base.HUE = 20//'#ae3838';//40;


Blockly.Blocks['inout_pin_pressed'] = {
    init: function(){
        this.setColour(20);
        this.appendValueInput('pin')
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.MIXLY_ESP32_TOUCH)
            .appendField(Blockly.MIXLY_PIN);
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};
Blockly.Blocks.inout_analog_write = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_ANALOGWRITE_PIN)
    .setCheck(Number);
    this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_VALUE2)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE);
  }
};
Blockly.Blocks.inout_pwm_analog_write = {
  init: function(){
    this.setColour(20);
    this.appendValueInput("PIN", Number)
    .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendValueInput("FREQ", Number)
    .appendField(Blockly.MIXLY_FREQUENCY + Blockly.MIXLY_STAT)
    .setCheck(Number);
     this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
     this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_VALUE2)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PWM_ANALOG_WRITE_SET_FREQ_TOOLTIP);
  }
};

Blockly.Blocks.touchAttachInterrupt = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_TOUCHATTACHINTERRUPT_PIN)
    .setCheck(Number);
     this.appendValueInput("threshold", Number)
    .appendField(Blockly.MIXLY_ESP32_THRESHOLD)
    .setCheck(Number);
    this.appendDummyInput("");
    this.appendStatementInput('DO')
    .appendField(Blockly.MIXLY_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
  }
};
