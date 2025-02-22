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

export const pins_input_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.input_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_output_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.output_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const espnow_channel = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.espnow_channel), 'PIN');
        this.setOutput(true, Number);
    }
};

export const haskylens_model = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.haskylens_model), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pwm_input = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.pwm_input), 'PIN');
        this.setOutput(true);
    }
};

export const analog_input = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog_input), 'PIN');
        this.setOutput(true);
    }
};

export const pwm_output = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.pwm_output), 'PIN');
        this.setOutput(true);
    }
};

export const analog_output = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.analog_output), 'PIN');
        this.setOutput(true);
    }
};

export const i2c_A_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.i2c_A_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const i2c_B_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.i2c_B_pin), 'PIN');
        this.setOutput(true, Number);
    }
};


export const spi_A_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.spi_A_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const spi_B_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.spi_B_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const spi_C_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.spi_C_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

export const spi_D_pin = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.spi_D_pin), 'PIN');
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

export const pins_buttonB = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.buttonB), 'PIN');
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

export const pins_builtinimg_extern = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.builtinimg_extern), 'PIN');
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

export const pins_playlist_extern = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.playlist_extern), 'PIN');
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

export const pins_tts_voice = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.tts_voice), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tts_builtin_music = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.tts_builtin_music), 'PIN');
        this.setOutput(true, Number);
    }
};

export const pins_tts_bgmusic = {
    init: function () {
        this.setColour(PINS_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.tts_bgmusic), 'PIN');
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