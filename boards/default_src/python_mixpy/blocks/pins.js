import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const PINS_HUE = 230;

export const pins_digital_write = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital_write), 'PIN');
        this.setOutput(true);
    }
};

export const pins_digital_read = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital_read), 'PIN');
        this.setOutput(true);
    }
};

export const pins_analog_write = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog_write), 'PIN');
        this.setOutput(true);
    }
};

export const pins_analog_read = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog_read), 'PIN');
        this.setOutput(true);
    }
};