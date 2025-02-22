import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const PINS_HUE = 230;

export const pins_digital = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_analog = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_pwm = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.pwm), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_interrupt = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.interrupt), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_MOSI = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.MOSI), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_MISO = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.MISO), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SCK = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.SCK), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SCL = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.SCL), 'PIN');
        this.setOutput(true, Number);
    }
};
export const pins_SDA = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.SDA), 'PIN');
        this.setOutput(true, Number);
    }
};