'use strict';

goog.provide('Blockly.Blocks.hardware');

goog.require('Blockly.Blocks');

Blockly.Blocks.hardware.HUE = 40


Blockly.Blocks['sensor_mixgo_button_is_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.hardware.HUE);
        this.appendValueInput('btn')
            .appendField(Blockly.MIXLY_BUTTON)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
    }
};
