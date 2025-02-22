import * as Blockly from 'blockly/core';

const DISPLAY_HUE = 180; //'#cc6688' //180;

// Blockly.FieldColour.COLOURS = ['#f00', '#e00', '#d00', '#c00', '#b00', '#a00',
//     '#800', '#600', '#400', '#000'];
// Blockly.FieldColour.COLUMNS = 5;

// var IMG = [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]];

export const microbit_display_clear = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.clear",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Clear_display
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Clear_display);
    }
};

export const monitor_get_pixel = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_BRIGHTNESS1);
    }
};

export const monitor_bright_point = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SET_BRIGHTNESS)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
        this.appendValueInput('brightness')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_BRIGHTNESS2);
    }
};

export const monitor_show_image_or_string = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('data')
            .setCheck([String, "microbit_image"])
            .appendField(Blockly.Msg.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
    }
};

export const monitor_scroll_string = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const monitor_scroll_string_with_delay = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.appendValueInput('delay')
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_DELAY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

export const microbit_display_show_image = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('PIN', String)
            .setCheck("microbit_image")
            .appendField(Blockly.Msg.OLED_BITMAP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.OLED_BITMAP);
    }
};



export const microbit_display_show_default_image = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "InputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
            "tooltip": "Show the referenced image on the display.",
            "message0": Blockly.Msg.OLED_BITMAP,
            "args0": [{
                "name": "image",
                "options": [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]],
                "type": "field_dropdown"
            }
            ]
        });
    }
};


export const microbit_display_show_animation = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Animate_images_or_string,
            "args0": [{
                "check": [String, "List"],
                "type": "input_value",
                "name": "images"
            }, {
                "type": "input_value",
                "name": "delay"
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
            }, {
                "type": "input_dummy"
            }, {
                "checked": false,
                "type": "field_checkbox",
                "name": "clear"
            }
            ]
        });
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SHOW_delay + Blockly.Msg.MIXLY_MICROBIT_Animate_images1);
    }
};

export const microbit_display_scroll_string_animation = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "inputsInline": true,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
            "tooltip": "Display the list of images as an animation with a certain delay between each frame. Indicate if you need to wait before continuing, continuously loop the animation and clear the display when finished.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_SHOW_STRING,
            "args0": [{
                "check": String,
                "type": "input_value",
                "name": "images"
            }, {
                "type": "input_value",
                "name": "delay"
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
            }, {
                "type": "input_dummy"
            }, {
                "checked": false,
                "type": "field_checkbox",
                "name": "clear"
            }
            ]
        });
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
    }
};

export const microbit_display_scroll = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.scroll",
            "tooltip": "Scroll the referenced text across the display.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Scroll_message,
            "args0": [{
                "check": "String",
                "type": "input_value",
                "name": "message"
            }
            ]
        });
    }
};

export const microbit_display_on = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_MICROBIT_Turn_on_display, 'on'], [Blockly.Msg.MIXLY_MICROBIT_Turn_off_display, 'off']]), 'on_off')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_monitor);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('on_off');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_monitor;
            var TOOLTIPS = {
                'on': Blockly.Msg.MIXLY_MICROBIT_Turn_on_display,
                'off': Blockly.Msg.MIXLY_MICROBIT_Turn_off_display
            };
            return TOOLTIPS[mode] + mode0;
        });
    }
};

export const microbit_display_off = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "nextStatement": null,
            "previousStatement": null,
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.off",
            "tooltip": "Turn off the display.",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Turn_off_display
        });
    }
};

export const microbit_display_is_on = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "output": "Boolean",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.is_on",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Display_is_on
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Display_is_on1);
    }
};

export const microbit_image_builtins = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "args0": [{
                "name": "image",
                "options": [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]],
                "type": "field_dropdown"
            }
            ],
            "output": ["microbit_image", "List"],
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
            "tooltip": Blockly.Msg.MIXLY_MICROBIT_Built_in_image1,
            "message0": Blockly.Msg.MIXLY_MICROBIT_Built_in_image
        });
    }
};

export const microbit_image_copy = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "args0": [{
                "check": ["microbit_image", "List", String],
                "type": "input_value",
                "name": "image"
            }
            ],
            "output": "microbit_image",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image.copy",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Copy_image
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Copy_image1);
    }
};

export const microbit_image_invert = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "args0": [{
                "check": ["microbit_image", "List", String],
                "type": "input_value",
                "name": "image"
            }
            ],
            "output": "microbit_image",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image.invert",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Invert_image
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Invert_image1);
    }
};

export const microbit_image_create = {
    init: function () {
        this.jsonInit({
            "colour": DISPLAY_HUE,
            "args0": [{
                "type": "input_dummy"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "00"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "01"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "02"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "03"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "04"
            }, {
                "type": "input_dummy"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "10"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "11"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "12"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "13"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "14"
            }, {
                "type": "input_dummy"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "20"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "21"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "22"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "23"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "24"
            }, {
                "type": "input_dummy"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "30"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "31"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "32"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "33"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "34"
            }, {
                "type": "input_dummy"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "40"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "41"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "42"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "43"
            }, {
                "colour": "#000000",
                "type": "field_colour",
                "name": "44"
            }
            ],
            "output": "microbit_image",
            "helpUrl": "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image",
            "message0": Blockly.Msg.MIXLY_MICROBIT_Create_image
        });
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Create_image1);
    }
};


export const image_shift = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_UP, 'up'],
            [Blockly.Msg.MIXLY_DOWN, 'down'],
            [Blockly.Msg.MIXLY_LEFT, 'left'],
            [Blockly.Msg.MIXLY_RIGHT, 'right'],
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(DISPLAY_HUE);
        this.setOutput(true, "microbit_image");
        this.setInputsInline(true);
        this.appendValueInput('img')
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
            .setCheck(["microbit_image", "List", String]);
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

export const image_arithmetic = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MICROBIT_DISPLAY_UNION, '+'],
            [Blockly.Msg.MICROBIT_DISPLAY_MINUS, '-']
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(DISPLAY_HUE);
        this.setOutput(true, "microbit_image");
        this.appendValueInput('A')
            // .setCheck(["microbit_image", "List", String])
            .appendField(Blockly.Msg.MICROBIT_DISPLAY_MERGE_SHAPE);
        this.appendValueInput('B')
            // .setCheck(["microbit_image", "List", String])
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



// export const microbit_display_scroll_string = {
//   init : function () {
//     this.jsonInit({
//       "colour" : DISPLAY_HUE,
//       "inputsInline": true,
//       "nextStatement" : null,
//       "previousStatement" : null,
//       "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
//       "tooltip" : "Display the list of images as an animation with a certain delay between each frame. Indicate if you need to wait before continuing, continuously loop the animation and clear the display when finished.",
//       "message0" : Blockly.Msg.MIXLY_MICROBIT_Scroll_string,
//       "args0" : [{
//           "check" : String,
//           "type" : "input_value",
//           "name" : "images"
//         }, {
//           "type" : "input_value",
//           "name" : "delay"
//         }, {
//           "type" : "input_dummy"
//         }, {
//           "checked" : true,
//           "type" : "field_checkbox",
//           "name" : "wait"
//         }, {
//           "type" : "input_dummy"
//         }, {
//           "checked" : false,
//           "type" : "field_checkbox",
//           "name" : "loop"
//         }, {
//           "type" : "input_dummy"
//         }, {
//           "checked" : false,
//           "type" : "field_checkbox",
//           "name" : "clear"
//         }
//       ]
//     });
//   }
// };

export const group_lcd_print = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput("TEXT", String)
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DF_LCD)
            .appendField('mylcd')
            //.appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
            .appendField(Blockly.Msg.MIXLY_LCD_PRINT1);
        this.appendValueInput("TEXT2", String)
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_LCD_PRINT2);
        /*
        this.appendValueInput("TEXT3", String)
              .setCheck([String,Number])
              .setAlign(Blockly.inputs.Align.RIGHT)
              .appendField(Blockly.Msg.MIXLY_LCD_PRINT3);
        this.appendValueInput("TEXT4", String)
              .setCheck([String,Number])
              .setAlign(Blockly.inputs.Align.RIGHT)
              .appendField(Blockly.Msg.MIXLY_LCD_PRINT4);
              */
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_LCD_PRINT4_TOOLTIP);
    }
};

export const group_lcd_init = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('device')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(Blockly.Msg.MIXLY_DF_LCD)
            .appendField('1602')
            .appendField('mylcd')
            .appendField(Blockly.Msg.MIXLY_LCD_ADDRESS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SETUP + Blockly.Msg.MIXLY_DF_LCD + Blockly.Msg.MIXLY_LCD_ADDRESS);
    }
};

export const group_lcd_print2 = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput("row", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_DF_LCD)
            .appendField('mylcd')
            .appendField(Blockly.Msg.MIXLY_LCD_ROW);
        this.appendValueInput("column", Number)
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_LCD_COLUMN);
        this.appendValueInput("TEXT", String)
            .setCheck([String, Number])
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_LCD_PRINT);
        this.setPreviousStatement(true, null);
        this.setInputsInline(true);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_LCD_PRINT3_TOOLTIP);
    }
};

export const group_lcd_power = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DF_LCD)
            .appendField('mylcd')
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ON, "on()"], [Blockly.Msg.MIXLY_OFF, "off()"], [Blockly.Msg.MIXLY_LCD_STAT_CLEAR, "clear()"], [Blockly.Msg.MIXLY_LCD_NOBACKLIGHT, "backlight(False)"], [Blockly.Msg.MIXLY_LCD_BACKLIGHT, "backlight(True)"]]), "STAT");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('STAT');
            var mode0 = Blockly.Msg.LISTS_SET_INDEX_SET;
            var mode1 = Blockly.Msg.MIXLY_DF_LCD;
            var TOOLTIPS = {
                'on()': Blockly.Msg.MIXLY_ON,
                'off()': Blockly.Msg.MIXLY_OFF,
                'clear()': Blockly.Msg.MIXLY_LCD_STAT_CLEAR,
                'backlight(off)': Blockly.Msg.MIXLY_LCD_NOBACKLIGHT,
                'backlight(on)': Blockly.Msg.MIXLY_LCD_BACKLIGHT
            };
            return mode0 + mode1 + TOOLTIPS[mode];
        });
    }
};

export const lp2i_u8g_draw_4strings = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DF_LCD + " OLED   " + Blockly.Msg.OLEDDISPLAY);
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
        this.appendValueInput("Text_line1", 'String')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("(128*64)         " + Blockly.Msg.line1);
        this.appendValueInput("Text_line2", 'String')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.line2);
        this.appendValueInput("Text_line3", 'String')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.line3);
        this.appendValueInput("Text_line4", 'String')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.line4);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(DISPLAY_HUE);
        this.setTooltip(Blockly.Msg.MIXLY_DF_LCD + Blockly.Msg.OLEDDISPLAY + Blockly.Msg.MIXLY_MICROBIT_TYPE_STRING);
    }
};

export const display_image_size = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_HEIGHT, 'height'],
            [Blockly.Msg.MIXLY_WIDTH, 'width']
        ];
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_MICROBIT_IMAGE);
        this.appendValueInput('VAR')
            .setCheck("microbit_image")
        // .appendField(Blockly.Msg.blockpy_USE_LIST);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var mode0 = Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET;
            var mode1 = Blockly.Msg.MIXLY_MICROBIT_IMAGE
            var TOOLTIPS = {
                'height': Blockly.Msg.MIXLY_HEIGHT,
                'width': Blockly.Msg.MIXLY_WIDTH,
            };
            return mode0 + mode1 + TOOLTIPS[mode];
        });
    }
};

export const display_fill = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendValueInput('SUB');
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_LCD_STAT_CLEAR, "0"],
                [Blockly.Msg.MIXLY_HANDBIT_DISLPAY_OLED_FILL, "1"]
            ]), "key");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                '0': Blockly.Msg.MIXLY_LCD_STAT_CLEAR,
                '1': Blockly.Msg.MIXLY_HANDBIT_DISLPAY_OLED_FILL
            };
            return Blockly.Msg.MIXLY_DF_LCD + TOOLTIPS[mode];
        });
    }
};