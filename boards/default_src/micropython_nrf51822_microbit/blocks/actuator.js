import * as Blockly from 'blockly/core';

const ACTUATOR_HUE = 100//'#b574c2';

export const microbit_music_play_built_in = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "inputsInline": true,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#built-in-melodies",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Play_built_in_melody,
            "args0": [{
                "name": "melody",
                "options": [["DADADADUM", "DADADADUM"], ["ENTERTAINER", "ENTERTAINER"], ["PRELUDE", "PRELUDE"], ["ODE", "ODE"], ["NYAN", "NYAN"], ["RINGTONE", "RINGTONE"], ["FUNK", "FUNK"], ["BLUES", "BLUES"], ["BIRTHDAY", "BIRTHDAY"], ["WEDDING", "WEDDING"], ["FUNERAL", "FUNERAL"], ["PUNCHLINE", "PUNCHLINE"], ["PYTHON", "PYTHON"], ["BADDY", "BADDY"], ["CHASE", "CHASE"], ["BA_DING", "BA_DING"], ["WAWAWAWAA", "WAWAWAWAA"], ["JUMP_UP", "JUMP_UP"], ["JUMP_DOWN", "JUMP_DOWN"], ["POWER_UP", "POWER_UP"], ["POWER_DOWN", "POWER_DOWN"]],
                "type": "field_dropdown"
            }, {
                // "check" : "Number",
                "type": "input_value",
                "name": "PIN"
            }, {
                "type": "input_dummy"
            }, {
                "checked": true,
                "type": "field_checkbox",
                "name": "wait"
            }, {
                "type": "input_dummy"
            }, {
                "checked": false,
                "type": "field_checkbox",
                "name": "loop"
            }
            ]
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Play_built_in_melody1);
    }
};


export const microbit_music_play_built_in_easy = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "inputsInline": true,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#built-in-melodies",
            "tooltip": "Play one of the built-in melodies. Indicate if you need to wait before continuing or continuously loop the melody.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Play_built_in_melody_easy,
            "args0": [{
                "name": "melody",
                "options": [["DADADADUM", "DADADADUM"], ["ENTERTAINER", "ENTERTAINER"], ["PRELUDE", "PRELUDE"], ["ODE", "ODE"], ["NYAN", "NYAN"], ["RINGTONE", "RINGTONE"], ["FUNK", "FUNK"], ["BLUES", "BLUES"], ["BIRTHDAY", "BIRTHDAY"], ["WEDDING", "WEDDING"], ["FUNERAL", "FUNERAL"], ["PUNCHLINE", "PUNCHLINE"], ["PYTHON", "PYTHON"], ["BADDY", "BADDY"], ["CHASE", "CHASE"], ["BA_DING", "BA_DING"], ["WAWAWAWAA", "WAWAWAWAA"], ["JUMP_UP", "JUMP_UP"], ["JUMP_DOWN", "JUMP_DOWN"], ["POWER_UP", "POWER_UP"], ["POWER_DOWN", "POWER_DOWN"]],
                "type": "field_dropdown"
            }, {
                // "check" : "Number",
                "type": "input_value",
                "name": "PIN"
            }, {
                "type": "input_dummy"
            }
            ]
        });
    }
};

export const microbit_music_pitch_delay = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TONE)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('pitch')
            .setCheck(Number)
            //.setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY);
        this.appendValueInput('duration')
            .setCheck(Number)
            //.setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DURATION);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MILLIS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_WAIT);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldCheckbox(true), 'wait');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
    }
};

export const microbit_music_pitch = {
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

export const microbit_music_play_list_of_notes = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "inputsInline": true,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#musical-notation",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Play_notes,
            "args0": [{
                "check": "List",
                "type": "input_value",
                "name": "notes"
            }, {
                "type": "input_value",
                "name": "PIN"
            }, {
                "checked": true,
                "type": "field_checkbox",
                "name": "wait"
            }, {
                "type": "input_dummy"
            }, {
                "checked": false,
                "type": "field_checkbox",
                "name": "loop"
            }
            ]
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Play_notes1);
    }
};

export const microbit_music_play_list_of_notes_easy = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "inputsInline": true,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#musical-notation",
            "tooltip": "Play a list of notes expressed in the special music language. Indicate if you need to wait before continuing or continuously loop the melody.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Play_notes,
            "args0": [{
                "check": "List",
                "type": "input_value",
                "name": "notes"
            }, {
                "type": "input_value",
                "name": "PIN"
            }, {
                "type": "input_dummy"
            }, {
                "type": "input_dummy"
            }, {
                "type": "input_dummy"
            }
            ]
        });
    }
};

export const microbit_music_reset = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#music.reset",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Reset_music
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Reset_music);
    }
};

//


export const microbit_music_stop = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("PIN")
            .appendField(Blockly.Msg.MIXLY_NOTONE)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_NOTONE);
    }
};



export const microbit_music_get_tempo = {
    init: function () {
        this.jsonInit({
            "colour": ACTUATOR_HUE,
            "output": "Array",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/music.html#music.get_tempo",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Get_current_tempo
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Get_current_tempo);
    }
};

export const tone_set_tempo = {
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
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_SET_TEMPO1);
    }
}

export const speech_say = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SAY, 'say'], [Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SING, 'sing'], [Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_PRENOUNCE,
                'pronounce']]), "MODE");
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROBIT_SPEECH_pitch);
        this.appendValueInput('speed')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.appendValueInput('mouth')
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROBIT_SPEECH_mouth);
        this.appendValueInput('throat')
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROBIT_SPEECH_throat);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING
            var TOOLTIPS = {
                'say': Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SAY,
                'sing': Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SING,
                'pronounce': Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_PRENOUNCE
            };
            return mode0 + TOOLTIPS[mode] + mode1;
        });
    }
};

// export const speech_sing = {
//     init: function () {
//         this.setColour(ACTUATOR_HUE);
//         this.appendValueInput('VAR')
//           .setCheck(String)
//           .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SING);
//         this.appendValueInput('pitch')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_pitch);
//         this.appendValueInput('speed')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MIXLY_SPEED);
//         this.appendValueInput('mouth')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_mouth);
//         this.appendValueInput('throat')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_throat);
//         this.setPreviousStatement(true);
//         this.setNextStatement(true);
//         this.setInputsInline(true);
//     }
// };

// export const speech_prenounce = {
//     init: function () {
//         this.setColour(ACTUATOR_HUE);
//         this.appendValueInput('VAR')
//           .setCheck(String)
//           .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_PRENOUNCE);
//         this.appendValueInput('pitch')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_pitch);
//         this.appendValueInput('speed')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MIXLY_SPEED);
//         this.appendValueInput('mouth')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_mouth);
//         this.appendValueInput('throat')
//             .setCheck(Number)
//             .appendField(Blockly.Msg.MICROBIT_SPEECH_throat);
//         this.setPreviousStatement(true);
//         this.setNextStatement(true);
//         this.setInputsInline(true);
//     }
// };

export const speech_say_easy = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SAY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const speech_sing_easy = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_SING);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const speech_pronounce_easy = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_ACTUATOR_SPEECH_PRENOUNCE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

export const speech_translate = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.MICROBIT_SPEECH_translation);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING + Blockly.Msg.MICROBIT_SPEECH_translation);
    }
};

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
        // this.appendValueInput("DELAY_TIME", Number)
        //     .setCheck(Number)
        //     .setAlign(Blockly.inputs.Align.RIGHT)
        //     .appendField(Blockly.Msg.MIXLY_DELAY+'('+Blockly.Msg.MIXLY_MILLIS+')');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
    }
};


export const bit_motor_control = {
    init: function () {
        this.appendValueInput("speed")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown([["M1", "1"], ["M2", "2"], ["M3", "3"], ["M4", "4"]]), "Motor")
            .appendField(Blockly.Msg.MIXLY_SPEED);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["Forward", "1*"], ["Reverse", "-1*"]]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//RGB
export const display_rgb_init = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
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

export const display_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        // this.appendValueInput("PIN", Number)
        //    .setCheck(Number)
        //    .setAlign(Blockly.inputs.Align.RIGHT)
        //    .appendField(Blockly.Msg.MIXLY_PIN);
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
export const display_rgb2 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB)
        // this.appendValueInput("PIN", Number)
        //    .setCheck(Number)
        //    .setAlign(Blockly.inputs.Align.RIGHT)
        //    .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const display_rgb_show = {
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

export const MP3_INIT = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + ' ' + Blockly.Msg.QJ00X_MP3);
        this.appendValueInput("RX")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("TX#");
        this.appendValueInput("TX")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("RX#");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3播放控制
var MP3_CONTROL_TYPE = [
    [Blockly.Msg.MIXLY_MP3_PLAY, "play"],
    [Blockly.Msg.MIXLY_MP3_PAUSE, "pause"],
    [Blockly.Msg.MIXLY_MP3_NEXT, "next_track"],
    [Blockly.Msg.MIXLY_MP3_PREV, "prev_track"],
    [Blockly.Msg.MIXLY_MP3_VOL_UP, "inc_vol"],
    [Blockly.Msg.MIXLY_MP3_VOL_DOWN, "dec_vol"]
];

//MP3模块
export const MP3_CONTROL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(MP3_CONTROL_TYPE), "CONTROL_TYPE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3循环模式
var MP3_LOOP_MODE_OPTIONS = [
    [Blockly.Msg.MIXLY_MP3_LOOP_ALL, "0"],
    [Blockly.Msg.MIXLY_MP3_LOOP_FOLDER, "1"],
    [Blockly.Msg.MIXLY_MP3_LOOP_ONE, "2"],
    [Blockly.Msg.MIXLY_MP3_LOOP_RAM, "3"]
];

//MP3模块循环模式
export const MP3_LOOP_MODE = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_LOOP_MODE)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(MP3_LOOP_MODE_OPTIONS), "LOOP_MODE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3 设置EQ
var MP3_EQ_MODE_OPTIONS = [
    [Blockly.Msg.MIXLY_MP3_EQ_NORMAL, "0"],
    [Blockly.Msg.MIXLY_MP3_EQ_POP, "1"],
    [Blockly.Msg.MIXLY_MP3_EQ_ROCK, "2"],
    [Blockly.Msg.MIXLY_MP3_EQ_JAZZ, "3"],
    [Blockly.Msg.MIXLY_MP3_EQ_CLASSIC, "4"],
    [Blockly.Msg.MIXLY_MP3_EQ_BASS, "5"]
];

//MP3模块EQ模式
export const MP3_EQ_MODE = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_EQ_MODE)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .appendField(new Blockly.FieldDropdown(MP3_EQ_MODE_OPTIONS), "EQ_MODE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3模块设置音量
export const MP3_VOL = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MP3_VOL);
        this.appendValueInput("vol", Number)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//MP3模块播放第N首
export const MP3_PLAY_NUM = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY_NUM)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("首");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

export const MP3_PLAY_FOLDER = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.QJ00X_MP3);
        this.appendValueInput("FOLDER", Number)
            .appendField(Blockly.Msg.DFPLAYER_MINI_FOLDER)
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_MP3_PLAY_NUM)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("首");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};