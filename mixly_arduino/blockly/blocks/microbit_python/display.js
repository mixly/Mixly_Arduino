'use strict';

goog.provide('Blockly.Blocks.display');
goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180;

Blockly.FieldColour.COLOURS = ['#f00', '#e00', '#d00', '#c00', '#b00', '#a00',
    '#800', '#600', '#400', '#000'];
Blockly.FieldColour.COLUMNS = 5;

var IMG = [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]];

Blockly.Blocks['microbit_display_clear'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.clear",
      "tooltip" : "Clear the display - set the brightness of all LEDs to 0 (off).",
      "message0" : Blockly.MIXLY_MICROBIT_Clear_display
    });
  }
};

Blockly.Blocks.monitor_get_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_NOVA_GET_STAT)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS)
		    .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);

	this.setInputsInline(true);
	this.setOutput(true, Boolean);
  }
};

Blockly.Blocks.monitor_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SET_BRIGHTNESS)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);

      this.appendValueInput('brightness')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('data')
        .setCheck(String)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_scroll_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck(String)
    .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setInputsInline(true);
  }
};

Blockly.Blocks.microbit_display_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('PIN',String)
        // .setCheck(String)
        .appendField(Blockly.MIXLY_MICROBIT_Show_image);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};



Blockly.Blocks['microbit_display_show_default_image'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "InputsInline": true,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
      "tooltip" : "Show the referenced image on the display.",
      "message0" : Blockly.MIXLY_MICROBIT_Show_image,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]],
          "type" : "field_dropdown"
        }
      ]
    });
  }
};


Blockly.Blocks['microbit_display_show_animation'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "inputsInline": true,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
      "tooltip" : "Display the list of images as an animation with a certain delay between each frame. Indicate if you need to wait before continuing, continuously loop the animation and clear the display when finished.",
      "message0" : Blockly.MIXLY_MICROBIT_Animate_images,
      "args0" : [{
          "check" : "List",
          "type" : "input_value",
          "name" : "images"
        }, {
          "type" : "input_value",
          "name" : "delay"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : true,
          "type" : "field_checkbox",
          "name" : "wait"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox",
          "name" : "loop"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox",
          "name" : "clear"
        }
      ]
    });
  }
};

Blockly.Blocks['microbit_display_scroll'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.scroll",
      "tooltip" : "Scroll the referenced text across the display.",
      "message0" : Blockly.MIXLY_MICROBIT_Scroll_message,
      "args0" : [{
          "check" : "String",
          "type" : "input_value",
          "name" : "message"
        }
      ]
    });
  }
};

Blockly.Blocks['microbit_display_on'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.on",
      "tooltip" : "Turns on the display.",
      "message0" : Blockly.MIXLY_MICROBIT_Turn_on_display
    });
  }
};

Blockly.Blocks['microbit_display_off'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.off",
      "tooltip" : "Turn off the display.",
      "message0" : Blockly.MIXLY_MICROBIT_Turn_off_display
    });
  }
};

Blockly.Blocks['microbit_display_is_on'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "output" : "Boolean",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.is_on",
      "tooltip" : "Return True if the display is on, otherwise return False.",
      "message0" : Blockly.MIXLY_MICROBIT_Display_is_on
    });
  }
};

Blockly.Blocks['microbit_image_builtins'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]],
          "type" : "field_dropdown"
        }
      ],
      "output" : ["microbit_image", "List"],
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
      "tooltip" : "Specify one of the built-in images.",
      "message0" : Blockly.MIXLY_MICROBIT_Built_in_image
    });
  }
};

Blockly.Blocks['microbit_image_copy'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "check" : ["microbit_image", "List", String],
          "type" : "input_value",
          "name" : "image"
        }
      ],
      "output" : "microbit_image",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image.copy",
      "tooltip" : "Create an exact copy of the referenced image.",
      "message0" : Blockly.MIXLY_MICROBIT_Copy_image
    });
  }
};

Blockly.Blocks['microbit_image_invert'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "check" : ["microbit_image", "List", String],
          "type" : "input_value",
          "name" : "image"
        }
      ],
      "output" : "microbit_image",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image.invert",
      "tooltip" : "Create a new image by inverting the brightness of the pixels in the referenced image.",
      "message0" : Blockly.MIXLY_MICROBIT_Invert_image
    });
  }
};

Blockly.Blocks['microbit_image_create'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "00"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "01"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "02"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "03"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "04"
        }, {
          "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "10"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "11"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "12"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "13"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "14"
        }, {
          "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "20"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "21"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "22"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "23"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "24"
        }, {
          "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "30"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "31"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "32"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "33"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "34"
        }, {
          "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "40"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "41"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "42"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "43"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "44"
        }
      ],
      "output" : "microbit_image",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image",
      "tooltip" : "Create a new image.",
      "message0" : Blockly.MIXLY_MICROBIT_Create_image
    });
  }
};

//RGB
Blockly.Blocks.display_rgb_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

Blockly.Blocks.display_rgb = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
Blockly.Blocks.display_rgb2 = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendDummyInput("")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks['image_shift'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_MICROBIT_up, 'up'],
         [Blockly.MIXLY_MICROBIT_down, 'down'],
         [Blockly.MIXLY_MICROBIT_left, 'left'],
         [Blockly.MIXLY_MICROBIT_right, 'right'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.appendValueInput('img')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
        .setCheck(["microbit_image","List",String]);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('val')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
  }
};

Blockly.Blocks['image_arithmetic'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MICROBIT_DISPLAY_UNION, '+'],
         [Blockly.MICROBIT_DISPLAY_MINUS, '-']];
    //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setOutput(true, "microbit_image");
    this.appendValueInput('A')
        // .setCheck(["microbit_image", "List", String])
        .appendField(Blockly.MICROBIT_DISPLAY_MERGE_SHAPE);
    this.appendValueInput('B')
        // .setCheck(["microbit_image", "List", String])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
  }
};