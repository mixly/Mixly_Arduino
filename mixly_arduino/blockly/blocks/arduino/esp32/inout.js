'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks.base.HUE = 20//'#ae3838';//40;

Blockly.Blocks.ledcSetup = {
  init: function(){
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput('CHANNEL')
    .setCheck(Number)
    .appendField("ledc"+Blockly.MIXLY_SETUP+Blockly.MIXLY_CHANNEL);
    this.appendValueInput("FREQ", Number)
    .appendField(Blockly.MIXLY_FREQUENCY)
    .setCheck(Number);
    this.appendValueInput('PWM_RESOLUTION')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_RESOLUTION);
    this.appendDummyInput("")
    .appendField("bit");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};

Blockly.Blocks.ledcAttachPin = {
  init: function(){
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN", Number)
    .appendField("ledc"+Blockly.MIXLY_ATTATCH+Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendValueInput('CHANNEL')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_CHANNEL);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};
Blockly.Blocks.ledcDetachPin = {
  init: function(){
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN", Number)
    .appendField("ledc"+Blockly.MIXLY_DETACH+Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};
Blockly.Blocks.ledcWrite=Blockly.Blocks.inout_analog_write;

Blockly.Blocks.inout_touchRead = {
  init: function(){
   this.setColour(Blockly.Blocks.base.HUE);
   this.appendValueInput("PIN", Number)
   .appendField(Blockly.MIXLY_ESP32_TOUCH)
   .appendField(Blockly.MIXLY_PIN);
   this.appendDummyInput()
   .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
   this.setOutput(true, Number);
   this.setInputsInline(true);
   this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
 }
};

Blockly.Blocks.touchAttachInterrupt = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
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
Blockly.Blocks['inout_esp32_dac'] = {
  init: function() {
    this.appendValueInput("value")
    .setCheck(null)
    .appendField(Blockly.inout_esp32_dac)
    .appendField(new Blockly.FieldDropdown(profile.default.dac), "PIN")
    .appendField(Blockly.MIXLY_VALUE2);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip(Blockly.inout_esp32_dac_HELP);
    this.setHelpUrl("");
  }
};
