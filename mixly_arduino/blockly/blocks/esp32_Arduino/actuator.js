'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;

Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_SERVO)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.appendValueInput("DELAY_TIME", Number)
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DELAY+'('+Blockly.MIXLY_DELAY_MS+')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
}
};

Blockly.Blocks.servo_read_degrees = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput("PIN", Number)
    .appendField(Blockly.MIXLY_SERVO)
    .appendField(Blockly.MIXLY_PIN)
    .setCheck(Number);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_READ_DEGREES)
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_READ);
}
};
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
var TONE_NOTES=[["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"],["NOTE_C6", "1047"],["NOTE_D6", "1175"],["NOTE_E6", "1319"],["NOTE_F6", "1397"],["NOTE_G6", "1568"],["NOTE_A6", "1760"],["NOTE_B6", "1976"],["NOTE_C7", "2093"],["NOTE_D7", "2349"],["NOTE_E7", "2637"],["NOTE_F7", "2794"],["NOTE_G7", "3136"],["NOTE_A7", "3520"],["NOTE_B7", "3951"]];
Blockly.Blocks.tone_notes = {
   init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_TONE_NOTE);
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

Blockly.Blocks.group_stepper_setup={
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_STEPPER_SETUP_STEPPER)
    .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
    this.appendValueInput("PIN1", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN1)
    .setCheck(Number);
    this.appendValueInput("PIN2", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN2)
    .setCheck(Number);
    this.appendValueInput('steps')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
    this.appendValueInput('speed')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_STEP);
}
}

Blockly.Blocks.group_stepper_setup2={
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_STEPPER_SETUP_STEPPER)
    .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
    this.appendValueInput("PIN1", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN1)
    .setCheck(Number);
    this.appendValueInput("PIN2", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN2)
    .setCheck(Number);
    this.appendValueInput("PIN3", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN3)
    .setCheck(Number);
    this.appendValueInput("PIN4", Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_PIN4)
    .setCheck(Number);
    this.appendValueInput('steps')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPSPERREVOLUTION);
    this.appendValueInput('speed')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_STEPPER_SET_SPEED);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_STEP2);
}
}

Blockly.Blocks.group_stepper_move={
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_STEPPER)
        .appendField(new Blockly.FieldTextInput('mystepper'), 'VAR');
        this.appendValueInput('step')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEPPER_STEP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_STEPPER_MOVE);
    }
}
