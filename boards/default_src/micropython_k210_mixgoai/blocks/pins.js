import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const PINS_HUE = 230;

export const pins_digital = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital), 'PIN');
        this.setOutput(true);
    }
};

export const pins_digital_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital_pin), 'PIN');
        this.setOutput(true, Number);
    }
};


export const pins_analog = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog), 'PIN');
        this.setOutput(true);
    }
};

export const pins_analog_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_dac = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.dac), 'PIN');
        this.setOutput(true);
    }
};

export const pins_dac_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.dac_pin), 'PIN');
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
        this.setOutput(true);
    }
};

export const pins_pwm_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.pwm_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_touch_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.touch_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_touch = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.touch), 'PIN');
        this.setOutput(true);
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
        this.setOutput(true, "esp32_image");
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

export const pins_playlist = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.playlist), 'PIN');
        this.setOutput(true);
    }
};

export const pins_exlcdh = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.exlcdh), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_exlcdv = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.exlcdv), 'PIN');
        this.setOutput(true, Number);
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

export const pins_one_more = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.one_more), 'PIN');
        this.setOutput(true);
    }
};

export const pins_digital_dot = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digital_dot), 'PIN');
        this.setOutput(true, Number);
    }
};