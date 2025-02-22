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

export const pins_button = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.button), 'PIN');
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

export const pins_serial = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_builtinimg = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.builtinimg), 'PIN');
        this.setOutput(true, "microbit_image");
    }
};

export const pins_imglist = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.imglist), 'PIN');
        this.setOutput(true);
    }
};

export const pins_axis = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.axis), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_brightness = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.brightness), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tone_notes = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.tone_notes), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_radio_power = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.radio_power), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_radio_datarate = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.radio_datarate), 'PIN');
        this.setOutput(true, Number);
    }
};