'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;

Blockly.Blocks.MAKER17_motorA = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MOTORA);
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_SPEED_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_DIR_PIN);
    this.appendValueInput('speed').setCheck(Number).appendField(Blockly.MAKER17_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};
Blockly.Blocks.MAKER17_motorB = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("").appendField(Blockly.MAKER17_MOTORB);
    this.appendValueInput("PIN1").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_SPEED_PIN);
    this.appendValueInput("PIN2").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.MAKER17_MOTOR_DIR_PIN);
    this.appendValueInput('speed').setCheck(Number).appendField(Blockly.MAKER17_MOTOR_SPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
}
};

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
Blockly.Blocks.controls_tone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_TONE_PIN)
        .setCheck(Number);
        this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_FREQUENCY);
        this.appendValueInput('DURATION')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DELAY);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.controls_notone={
    init:function(){
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_NOTONE_PIN)
        .setCheck(Number);
        this.appendValueInput('CHANNEL')
        .setCheck(Number)
        //.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_NOTONE);
    }
};
