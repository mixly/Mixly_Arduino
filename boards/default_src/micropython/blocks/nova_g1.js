import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';

const NOVAG1_HUE = 100;

export const get_potential_num = {
    init: function () {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_nova") { var name = 'Nova G1' }
        this.setColour(NOVAG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField(Blockly.Msg.MIXLY_MIXGO_NOVA_POTENTIAL_NUM);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

export const nova_g1_motor = {
    init: function () {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_nova") { var name = 'Nova G1' }
        this.setColour(NOVAG1_HUE);
        this.appendValueInput('PIN')
            .appendField(name)
            .appendField(Blockly.Msg.MOTOR_DC)
            .appendField(Blockly.Msg.LCD_NUMBERING)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Direction)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.CLOCKWISE, "CW"],
                [Blockly.Msg.ANTI_CLOCKWISE, "CCW"],
                [Blockly.Msg.MOTOR_P, "P"],
                [Blockly.Msg.MOTOR_N, "N"]
            ]), "direction");
        this.appendValueInput('speed')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEPPER_SET_SPEED);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const nova_g1_usb = {
    init: function () {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_nova") { var name = 'Nova G1' }
        this.setColour(NOVAG1_HUE);
        this.appendValueInput('PIN')
            .appendField(name)
            .appendField(Blockly.Msg.SET_USB);
        this.appendValueInput('percent')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_POWER_SUPPLY);
        this.appendDummyInput("")
            .appendField("%")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

export const nova_g1_spk_en = {
    init: function () {
        var version = Mixly.Boards.getSelectedBoardKey().split(':')[2]
        if (version == "mixgo_nova") { var name = 'Nova G1' }
        this.setColour(NOVAG1_HUE);
        this.appendDummyInput()
            .appendField(name)
            .appendField(Blockly.Msg.MIXLY_SPK_STATE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ON, "True"],
                [Blockly.Msg.MIXLY_OFF, "False"]
            ]), "state");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}