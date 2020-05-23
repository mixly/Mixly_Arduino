'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;
Blockly.Blocks.controls_tone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TONE);
        this.appendValueInput("PIN")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_FREQUENCY);
        this.appendValueInput('DELAY_TIME')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DELAY);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.controls_notone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_NOTONE);
        this.appendValueInput("PIN")
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};

Blockly.Blocks.onboard_tone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_TONE);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_FREQUENCY);
        this.appendValueInput('DELAY_TIME')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DELAY);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MILLIS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.onboard_notone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_NOTONE);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};

Blockly.Arduino.motor_id = function() {
  var code = this.getFieldValue('CHANNEL');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Blocks['motor_id'] = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([
           ["1","1"],["2","2"],["3","3"],["4","4"]
           ]), "CHANNEL");
        this.setOutput(true);
   // this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
}
};


Blockly.Blocks.HR8833_Motor_Setup= {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MOTOR_HR8833+Blockly.MIXLY_SETUP);
    this.appendValueInput('MOTOR_ID')
    .setCheck(Number)
    .appendField(Blockly.MOTOR_HR8833_TEAM_NO);
    this.appendValueInput("PIN1")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_PIN+"1");
    this.appendValueInput("PIN2")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_PIN+"2");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks.HR8833_Motor_Speed= {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MOTOR_HR8833+Blockly.MIXLY_SETTING);
    this.appendValueInput('MOTOR_ID')
    .setCheck(Number)
    .appendField(Blockly.MOTOR_HR8833_TEAM_NO);
    this.appendValueInput('SPEED')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

Blockly.Blocks.handbit_motor_move= {
  init: function() { 
  this.appendDummyInput()
      .appendField(Blockly.MIXLY_MOTOR)
      .appendField(new Blockly.FieldDropdown([["M1","0x01"],["M2","0x10"]]), "type");
  this.appendValueInput("speed")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.MIXLY_SPEED+"(-100~100)");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(100);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};