import * as Blockly from 'blockly/core';
import { Boards, Profile } from 'mixly';

const DISPLAY_ONBOARD_HUE = '#569A98';

export const display_show_image = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck([String, "esp32_image", "List", 'Tuple'])
            .appendField(Blockly.Msg.MIXLY_ESP32_SHOW_IMAGE_OR_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var version = Boards.getSelectedBoardKey()
        if (version == 'micropython:esp32:mixbot') {
            this.setTooltip(Blockly.Msg.MIXLY_MIXBOT_SHOW_SCROLL_STRING_TOOLTIP);
        }
    }
};

export const display_show_image_or_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.OLED_DRAWSTR);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.Msg.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

    }
};

export const display_scroll_string = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const display_scroll_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

    }
};

export const display_show_frame_string = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_MONITOR_SHOW_FRAME);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const display_show_frame_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_MONITOR_SHOW_FRAME);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const display_image_create = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 12; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 32; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true);
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};

export const display_image_builtins = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [{
                "name": "image",
                "options": [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SAD", "SAD"], ["SMILE", "SMILE"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["SURPRISED", "SURPRISED"], ["ASLEEP", "ASLEEP"], ["ANGRY", "ANGRY"], ["CONFUSED", "CONFUSED"], ["NO", "NO"], ["YES", "YES"]
                    // ,["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]
                ],
                "type": "field_dropdown"
            }],
            "output": ["esp32_image", "List"],
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
            "tooltip": Blockly.Msg.MIXLY_MICROBIT_Built_in_image1,
            "message0": Blockly.Msg.MIXLY_MICROBIT_Built_in_image
        });
    }
};

export const display_image_builtins_all = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Built_in_image1)
            .appendField(new Blockly.FieldDropdown(Profile.default.builtinimg), 'image');
        this.setOutput(true, ["esp32_image", "List"]);
    }
};

export const image_arithmetic = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MICROBIT_DISPLAY_UNION, 'add'],
            [Blockly.Msg.MICROBIT_DISPLAY_MINUS, 'sub']
        ];
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setOutput(true, "esp32_image");
        this.appendValueInput('A')
            // .setCheck(["esp32_image", "List", String])
            .appendField(Blockly.Msg.MICROBIT_DISPLAY_MERGE_SHAPE);
        this.appendValueInput('B')
            // .setCheck(["esp32_image", "List", String])
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                '+': Blockly.Msg.MIXLY_MICROBIT_image_add,
                '-': Blockly.Msg.MIXLY_MICROBIT_image_reduce
            };
            return TOOLTIPS[mode];
        });
    }
};

export const image_invert = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('A')
            .setCheck("esp32_image")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Invert_image1);
        this.setInputsInline(true);
        this.setOutput(true, "esp32_image");
    }
};

export const display_shift = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_UP, 'shift_up'],
            [Blockly.Msg.MIXLY_DOWN, 'shift_down'],
            [Blockly.Msg.MIXLY_LEFT, 'shift_left'],
            [Blockly.Msg.MIXLY_RIGHT, 'shift_right'],
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(DISPLAY_ONBOARD_HUE);
        // this.setOutput(true);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendValueInput('val')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
            .setCheck(Number);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
            var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
            var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
            var TOOLTIPS = {
                'shift_up': Blockly.Msg.MIXLY_UP,
                'shift_down': Blockly.Msg.MIXLY_DOWN,
                'shift_left': Blockly.Msg.MIXLY_LEFT,
                'shift_right': Blockly.Msg.MIXLY_RIGHT
            };
            return mode0 + mode1 + TOOLTIPS[mode] + mode2;
        });
    }
};

export const display_get_pixel = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_POINT);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
    }
};

export const display_bright_point = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendValueInput("STAT")
            .setCheck([Number, Boolean]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_DISPLAY_SETPIXEL);
    }
};

export const display_get_screen_pixel = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    }
};

export const display_bright_screen = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
    }
};

export const display_clear = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Clear_display);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Clear_display);
    }
};







//mixgo_me onboard_matrix below:



export const mixgome_display_image_create = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 5; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 8; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true);
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};

export const mixgomini_display_image_create = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 8; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 12; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true);
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};

export const mixgo_display_image_create_new = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 8; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 16; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true, "esp32_image");
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};



export const mixgome_display_font = {
    init: function () {
        var OPERATORS = [
            ['4x5' + Blockly.Msg.MIXGO_ME_DISPLAY_HORIZONTAL, "'4x5'"],
            ['5x5' + Blockly.Msg.MIXGO_ME_DISPLAY_HORIZONTAL, "'5x5'"],
            ['5x8' + Blockly.Msg.MIXGO_ME_DISPLAY_VERTICAL, "'5x8'"]
        ];
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.OLED_SET_FONT)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

    }
};



//mpython

export const onboard_oled_show_image = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP_OR_STRING);
    }
};

export const onboard_oled_show_image_xy = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField('x');
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_NUMBER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP_OR_STRING);
    }
};

export const onboard_oled_show_string = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck([String, "esp32_image", "List", 'Tuple'])
            .appendField(Blockly.Msg.OLED_DRAWSTR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP_OR_STRING);
    }
};

export const onboard_oled_show_image_or_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.OLED_DRAWSTR);
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField('x');
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.Msg.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
    }
};

export const onboard_oled_scroll_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
    }
};


export const onboard_oled_show_frame_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_MONITOR_SHOW_FRAME);
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_oled_bright_point = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendValueInput("STAT")
            .setCheck([Number, Boolean]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_DISPLAY_SETPIXEL);
    }
};

export const mpython_display_shape_rect = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "state",
                    "options": [
                        [Blockly.Msg.MPYTHON_DISPLAY_MODE_1, '1'],
                        [Blockly.Msg.MPYTHON_DISPLAY_MODE_0, '0']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "name": "shape",
                    "options": [
                        [Blockly.Msg.MPYTHON_DISPLAY_HOLLOW, 'rect'],
                        [Blockly.Msg.MPYTHON_DISPLAY_SOLID, 'fill_rect']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "name": "x",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "w",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "h",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.MPYTHON_DISPLAY_SHAPE_RECT_TOOLTIP,
            "message0": Blockly.Msg.MPYTHON_DISPLAY_SHAPE_RECT_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const mpython_display_hvline = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "state",
                    "options": [
                        [Blockly.Msg.MPYTHON_DISPLAY_MODE_1, '1'],
                        [Blockly.Msg.MPYTHON_DISPLAY_MODE_0, '0']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "name": "dir_h_v",
                    "options": [
                        [Blockly.Msg.mpython_vertical, '0'],
                        [Blockly.Msg.mpython_horizontal, '1']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "name": "x",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "length",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.MPYTHON_DISPLAY_HVLINE_TOOLTIP,
            "message0": Blockly.Msg.MPYTHON_DISPLAY_HVLINE_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const mpython_display_line = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "state",
                    "options": [[Blockly.Msg.mpython_display_hline_1, '1'], [Blockly.Msg.mpython_display_hline_0, '0']],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                }, {
                    "name": "x1",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y1",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "x2",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y2",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.mpython_display_line_TOOLTIP,
            "message0": Blockly.Msg.mpython_display_line_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const mpython_pbm_image = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "type": "field_label",
                    "name": "size_image",
                    "text": Blockly.Msg.MIXLY_MICROBIT_Built_in_image1
                },

                {
                    "name": "path",
                    "options": [
                        ["Heart", "Heart"],
                        ["Angry", "Angry"],
                        ["Bored", "Bored"],
                        ["Confused", "Confused"],
                        ["Happy", "Happy"],
                        ["Paper", "Paper"],
                        ["Rock", "Rock"],
                        ["Sad", "Sad"],
                        ["Scissors", "Scissors"],
                        ["Silly", "Silly"],
                        ["Sleep", "Sleep"],
                        ["Small_heart", "Small_heart"],
                        ["Small_paper", "Small_paper"],
                        ["Small_rock", "Small_rock"],
                        ["Small_scissors", "Small_scissors"],
                        ["Smile", "Smile"],
                        ["Surprise", "Surprise"],
                        ["Wonderful", "Wonderful"],
                        ["Eyes_Angry", "Eyes_Angry"],
                        ["Awake", "Awake"],
                        ["Black_eye", "Black_eye"],
                        ["Bottom_left", "Bottom_left"],
                        ["Bottom_right", "Bottom_right"],
                        ["Crazy_1", "Crazy_1"],
                        ["Crazy_2", "Crazy_2"],
                        ["Disappointed", "Disappointed"],
                        ["Dizzy", "Dizzy"],
                        ["Down", "Down"],
                        ["Evil", "Evil"],
                        ["Hurt", "Hurt"],
                        ["Knocked_out", "Knocked_out"],
                        ["Love", "Love"],
                        ["Middle_left", "Middle_left"],
                        ["Middle_right", "Middle_right"],
                        ["Neutral", "Neutral"],
                        ["Nuclear", "Nuclear"],
                        ["Pinch_left", "Pinch_left"],
                        ["Pinch_middle", "Pinch_middle"],
                        ["Pinch_right", "Pinch_right"],
                        ["Tear", "Tear"],
                        ["Tired_left", "Tired_left"],
                        ["Tired_middle", "Tired_middle"],
                        ["Tired_right", "Tired_right"],
                        ["Toxic", "Toxic"],
                        ["Up", "Up"],
                        ["Winking", "Winking"],
                        ["Accept", "Accept"],
                        ["Backward", "Backward"],
                        ["Decline", "Decline"],
                        ["Forward", "Forward"],
                        ["Left", "Left"],
                        ["No_go", "No_go"],
                        ["Question_mark", "Question_mark"],
                        ["Right", "Right"],
                        ["Stop_1", "Stop_1"],
                        ["Stop_2", "Stop_2"],
                        ["Thumbs_down", "Thumbs_down"],
                        ["Thumbs_up", "Thumbs_up"],
                        ["Warning", "Warning"],
                        ["Bomb", "Bomb"],
                        ["Boom", "Boom"],
                        ["Fire", "Fire"],
                        ["Flowers", "Flowers"],
                        ["Forest", "Forest"],
                        ["Lightning", "Lightning"],
                        ["Light_off", "Light_off"],
                        ["Light_on", "Light_on"],
                        ["Night", "Night"],
                        ["Pirate", "Pirate"],
                        ["Snow", "Snow"],
                        ["Target", "Target"],
                        ["Bar_0", "Bar_0"],
                        ["Bar_1", "Bar_1"],
                        ["Bar_2", "Bar_2"],
                        ["Bar_3", "Bar_3"],
                        ["Bar_4", "Bar_4"],
                        ["Dial_0", "Dial_0"],
                        ["Dial_1", "Dial_1"],
                        ["Dial_2", "Dial_2"],
                        ["Dial_3", "Dial_3"],
                        ["Dial_4", "Dial_4"],
                        ["Dots_0", "Dots_0"],
                        ["Dots_1", "Dots_1"],
                        ["Dots_2", "Dots_2"],
                        ["Dots_3", "Dots_3"],
                        ["Hourglass_0", "Hourglass_0"],
                        ["Hourglass_1", "Hourglass_1"],
                        ["Hourglass_2", "Hourglass_2"],
                        ["Timer_0", "Timer_0"],
                        ["Timer_1", "Timer_1"],
                        ["Timer_2", "Timer_2"],
                        ["Timer_3", "Timer_3"],
                        ["Timer_4", "Timer_4"],
                        ["Water_level_0", "Water_level_0"],
                        ["Water_level_1", "Water_level_1"],
                        ["Water_level_2", "Water_level_2"],
                        ["Water_level_3", "Water_level_3"],


                    ],
                    "type": "field_dropdown"
                }
            ],
            "output": "String",
            "helpUrl": '',
            "tooltip": '',
            "message0": '%1 %2'
        });
    }
};

//mixbot onboard_matrix below:



export const mixbot_display_image_create = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 5; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 5; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true);
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};

export const mixbot_display_get_screen_pixel = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    }
};

export const mixbot_display_get_ambientbright = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_AMBIENTBRIGHT);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

export const mixbot_display_bright_screen = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
    }
};

export const mixbot_display_rotate = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.mixpy_PL_PIE_SHADOW_N, '0'],
            [Blockly.Msg.CLOCKWISE + '90' + Blockly.Msg.blockpy_setheading_degree, '1'],
            [Blockly.Msg.CLOCKWISE + '180' + Blockly.Msg.blockpy_setheading_degree, '2'],
            [Blockly.Msg.CLOCKWISE + '270' + Blockly.Msg.blockpy_setheading_degree, '3']
        ];
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXBOT_SCREEN_ROTATE)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);

    }
};

export const bitbot_display_image_create = {
    init: function () {
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE)
        for (let i = 0; i < 12; i++) {
            let dummyInputObj = this.appendDummyInput();
            for (let j = 0; j < 12; j++) {
                dummyInputObj.appendField(new Blockly.FieldColour('#000', null, {
                    colourOptions: ['#f00', '#000'],
                    columns: 2
                }), i + '-' + j);
            }
        }
        this.setOutput(true);
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};

//mixgo_nova onboard tft below:
export const onboard_tft_show_image = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP_OR_STRING);
    }
};

export const onboard_tft_show_image_xy = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField('x');
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_NUMBER);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP_OR_STRING);
    }
};

export const onboard_tft_show_image_or_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.OLED_DRAWSTR);
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField('x');
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TEXT_CENTER)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MICROPYTHON_DISPLAY_YES, "True"],
                [Blockly.Msg.MICROPYTHON_DISPLAY_NO, "False"]
            ]), 'center')
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_DELAY);
    }
};

export const onboard_tft_scroll_string = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_scroll_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("space")
            .setCheck(Number)
            .appendField(Blockly.Msg.MICROPYTHON_DISPLAY_FONT_SPACE);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_SCROLL_IMAGE_OR_STRING_DELAY);
    }
};

export const onboard_tft_show_frame_string = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_MONITOR_SHOW_FRAME);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_show_frame_string_delay = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_MONITOR_SHOW_FRAME);
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_TURTLE_WRITE_FONT_NUM);
        this.appendValueInput("time")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_display_shape_rect = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "shape",
                    "options": [
                        [Blockly.Msg.MPYTHON_DISPLAY_HOLLOW, 'rect'],
                        [Blockly.Msg.MPYTHON_DISPLAY_SOLID, 'fill_rect']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "name": "x",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "w",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "h",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "VAR",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.MPYTHON_DISPLAY_SHAPE_RECT_TOOLTIP,
            "message0": Blockly.Msg.ONBOARD_TFT_DISPLAY_SHAPE_RECT_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const onboard_tft_display_hvline = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "dir_h_v",
                    "options": [
                        [Blockly.Msg.mpython_vertical, '0'],
                        [Blockly.Msg.mpython_horizontal, '1']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "name": "x",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "length",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "VAR",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.MPYTHON_DISPLAY_HVLINE_TOOLTIP,
            "message0": Blockly.Msg.ONBOARD_TFT_DISPLAY_HVLINE_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const onboard_tft_display_line = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "type": "input_dummy"
                }, {
                    "name": "x1",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y1",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "x2",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y2",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "VAR",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "tooltip": Blockly.Msg.mpython_display_line_TOOLTIP,
            "message0": Blockly.Msg.mpython_display_line_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const onboard_tft_shift = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_UP, 'shift_up'],
            [Blockly.Msg.MIXLY_DOWN, 'shift_down'],
            [Blockly.Msg.MIXLY_LEFT, 'shift_left'],
            [Blockly.Msg.MIXLY_RIGHT, 'shift_right'],
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(DISPLAY_ONBOARD_HUE);
        // this.setOutput(true);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.appendValueInput('val')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
            .setCheck(Number);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
            var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
            var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
            var TOOLTIPS = {
                'up': Blockly.Msg.MIXLY_UP,
                'down': Blockly.Msg.MIXLY_DOWN,
                'left': Blockly.Msg.MIXLY_LEFT,
                'right': Blockly.Msg.MIXLY_RIGHT
            };
            return mode0 + mode1 + TOOLTIPS[mode] + mode2;
        });
    }
};

export const onboard_tft_get_pixel = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendDummyInput()
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
    }
};

export const onboard_tft_bright_point = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_LCD_SETCOLOR)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_DISPLAY_SETPIXEL);
    }
};



export const onboard_tft_clear = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Clear_display);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Clear_display);
    }
};

export const onboard_tft_get_screen_pixel = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    }
};

export const onboard_tft_bright_screen = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS + ' 0.0-1.0');
    }
};

export const onboard_tft_fill = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_SCREEN_FILL)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_clock_init = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_INIT_CLOCK);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CENTER_POS);
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField('x');
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField('y');
        this.appendValueInput("size")
            .setCheck(Number)
            .appendField(Blockly.Msg.OLED_CIRCLE_RADIUS);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_clock_get_rtctime = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.GET_RTCTIME);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_clock_set_time = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.SET_TIME);
        this.appendValueInput("h")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_HOUR);
        this.appendValueInput("m")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MINUTE);
        this.appendValueInput("s")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_SECOND);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_clock_draw = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.DRAW_CLOCK);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_clock_clear = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendValueInput('SUB')
        this.appendDummyInput()
            .appendField(Blockly.Msg.CLEAR_CLOCK);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_STM32_TFT_BACKGROUND_COLOR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const onboard_tft_display_shape_circle = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_ONBOARD_HUE,
            "args0": [
                {
                    "name": "shape",
                    "options": [
                        [Blockly.Msg.MPYTHON_DISPLAY_HOLLOW, 'False'],
                        [Blockly.Msg.MPYTHON_DISPLAY_SOLID, 'True']
                    ],
                    "type": "field_dropdown"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "name": "x",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "y",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "r",
                    "type": "input_value",
                    //"check": "Number"
                },
                {
                    "name": "VAR",
                    "type": "input_value",
                    //"check": "Number"
                }

            ],
            "inputsInline": true,
            "helpUrl": Blockly.Msg.mpython_HELPURL,
            "message0": Blockly.Msg.ONBOARD_TFT_DISPLAY_SHAPE_CIRCLE_MESSAGE0,
            "nextStatement": null,
            "previousStatement": null
        });
    }
};

export const draw_pointer = {
    init: function () {
        this.setColour(DISPLAY_ONBOARD_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DRAW_POINTER)
            .appendField(Blockly.Msg.DRAW_POINTER_ANGLE);
        this.appendValueInput('angle');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DRAW_POINTER_DU);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.DRAW_POINTER_TOOLTIP);
    }
};