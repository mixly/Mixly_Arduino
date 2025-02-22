import * as Blockly from 'blockly/core';

const ACTUATOR_HUE = 100;

//Servo
export const servo_move = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_SERVO)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DEGREE_0_180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SERVO_MOVE);
    }
};

//LED
export const number = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"]
            ]), 'op')
        this.setOutput(true);
    }
};

export const ledswitch = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_ON, "1"],
                [Blockly.Msg.MIXLY_ESP32_OFF, "0"],
                [Blockly.Msg.MIXLY_ESP32_TOGGLE, "-1"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const actuator_extern_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.MIXLY_EXTERN_LED)
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_EXTERN_LED_SETONOFF);
    }
};

export const actuator_extern_get_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.Msg.MIXLY_EXTERN_LED)
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_EXTERN_LED_GETONOFF);
    }
};

export const actuator_extern_led_brightness = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING)
            .appendField(Blockly.Msg.MIXLY_EXTERN_LED)
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_EXTERN_LED_SETBRIGHT);
    }
};

export const actuator_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETONOFF);
    }
};

export const actuator_get_led_bright = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PULSEIN_STAT)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_GETONOFF);
    }
};

export const actuator_led_brightness = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETTING);
        this.appendValueInput('led')
            .appendField(Blockly.Msg.MIXLY_BUILDIN_LED)
        this.appendValueInput('bright')
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_LED_SETBRIGHT);
    }
};

//music
export const esp32_music_pitch = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

export const esp32_music_pitch_with_time = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

export const esp32_music_stop = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_NOTONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const esp32_music_set_tempo = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('TICKS')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SET_TEMPO)
            .appendField(Blockly.Msg.MICROBIT_ACTUATOR_ticks);
        this.appendValueInput('BPM')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_SET_TEMPO);
    }
}

export const esp32_music_get_tempo = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Get_current_tempo)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_GET_TEMPO);
    }
}

export const esp32_music_reset = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_music)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_RESET);
    }
}

export const esp32_onboard_music_pitch = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

export const esp32_onboard_music_pitch_with_time = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TONE);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

export const esp32_onboard_music_stop = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_NOTONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const esp32_onboard_music_play_list = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

export const esp32_music_play_list = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.appendValueInput('PIN')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

export const esp32_mixgo_music_play_list_show = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.appendValueInput('PIN')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_PIN);
        // this.appendValueInput('DISPLAY')
        //     .appendField(Blockly.Msg.MIXLY_ESP32_MIXGO_MUSIC_SHOW_IN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MIXGO_MUSIC_PLAY_TONE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_PLAYSHOW)
    }
}
//RGB
export const actuator_neopixel_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput("PIN", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_RGB_PIN_COUNT);
    }
};

export const actuator_neopixel_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput('SUB')
            .setCheck("var");
        // .appendField(Blockly.Msg.MIXLY_SETUP)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B);
    }
};

export const actuator_neopixel_write = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        // this.appendValueInput("PIN", Number)
        //    .setCheck(Number)
        //    .setAlign(Blockly.inputs.Align.RIGHT)
        //    .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_WRI);
    }
};

export const actuator_onboard_neopixel_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B);
    }
};

export const actuator_onboard_neopixel_rgb_all = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_RGB_NUM_R_G_B);
    }
};

export const actuator_onboard_neopixel_write = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_MUSIC_WRI);
    }
};


export const led_light = actuator_led_bright;
export const get_led_bright = actuator_get_led_bright;
export const led_brightness = actuator_led_brightness;
