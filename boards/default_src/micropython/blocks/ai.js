import * as Blockly from 'blockly/core';

const AI_HUE = 205;

export const MICROPYTHON_AI_client = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipSpeech_asr, "ASR"],
                [Blockly.Msg.MIXLY_AI_UNIT, "UNIT"]
            ]), 'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('API_KEY')
            .appendField('API_KEY')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('SECRET_KEY')
            .appendField('SECRET_KEY')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const MICROPYTHON_AI_Speech_unit = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AI_UNIT)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ID')
            .appendField('ID')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.OLED_STRING)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const MICROPYTHON_AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.Msg.MIXPY_AI_AUDIO_TIME)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_LANGUAGE)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AI_LANGUAGE_CHINESE, "1537"],
                [Blockly.Msg.MIXLY_AI_LANGUAGE_ENGLISH, "1737"],
                [Blockly.Msg.MIXLY_AI_LANGUAGE_CANTONESE, "1637"]
            ]), 'LANGUAGE')
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

