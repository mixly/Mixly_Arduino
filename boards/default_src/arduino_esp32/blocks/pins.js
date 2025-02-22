import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const PINS_HUE = 230;

export const pins_dac = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.dac), 'PIN');
        this.setOutput(true);
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
export const pins_sda = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.SDA), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tx = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.tx), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_scl = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.SCL), 'PIN');
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

export const serial_select = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), 'PIN');
        this.setOutput(true);
    }
};

export const serial_HardwareSelect = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_HardwareSelect), 'PIN');
        this.setOutput(true);
    }
};

export const brightness = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.brightness), 'PIN');
        this.setOutput(true);
    }
};


export const CHANNEL = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.CHANNEL), 'PIN');
        this.setOutput(true);
    }
};

export const PWM_RESOLUTION = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.PWM_RESOLUTION), 'PIN');
        this.setOutput(true);
    }
};

export const OCTAVE = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.OCTAVE), 'PIN');
        this.setOutput(true);
    }
};

export const TONE_NOTE = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.TONE_NOTE), 'PIN');
        this.setOutput(true);
    }
};

export const pins_digitalWrite = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.digitalWrite), 'PIN');
        this.setOutput(true, Number);
    }
};
