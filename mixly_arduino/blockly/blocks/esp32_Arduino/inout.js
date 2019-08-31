'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks.base.HUE = 20//'#ae3838';//40;

var CHANNEL_NOTES=[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"],["14", "14"],["15", "15"]];
Blockly.Blocks.channel_select = {
 init: function() {
  this.setColour(Blockly.Blocks.actuator.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(CHANNEL_NOTES), 'STAT');
  this.setOutput(true, Number);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_CHANNEL_NOTE);
}
};

var RESOLUTION=[["8", "8"],["9", "9"],["10", "10"],["11", "11"],["12", "12"],["13", "13"]];

Blockly.Blocks.inout_pwm_analog_write = {
  init: function(){
    this.setColour(Blockly.Blocks.base.HUE);
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
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_RESOLUTION);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(RESOLUTION), 'RESOLUTION');
    this.appendDummyInput()
    .appendField("bit");
    this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_VALUE2)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PWM_ANALOG_WRITE_SET_FREQ_TOOLTIP);
  }
};

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
        .appendField(new Blockly.FieldDropdown([["25","25"], ["26","26"]]), "pin")
        .appendField(Blockly.MIXLY_VALUE2);
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
 this.setTooltip(Blockly.inout_esp32_dac_HELP);
 this.setHelpUrl("");
  }
};