'use strict';

goog.provide('Blockly.Blocks.display');
goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180//'#cc6688' //180;

//Blockly.FieldColour.COLOURS = ['#f00', '#e00', '#d00', '#c00', '#b00', '#a00',
   // '#800', '#600', '#400', '#000'];
Blockly.FieldColour.COLOURS = ['#f00', '#000'];
Blockly.FieldColour.COLUMNS = 2;

//var IMG = [["HEART", "HEART"], ["HEART_SMALL", "HEART_SMALL"], ["HAPPY", "HAPPY"], ["SMILE", "SMILE"], ["SAD", "SAD"], ["CONFUSED", "CONFUSED"], ["ANGRY", "ANGRY"], ["ASLEEP", "ASLEEP"], ["SURPRISED", "SURPRISED"], ["SILLY", "SILLY"], ["FABULOUS", "FABULOUS"], ["MEH", "MEH"], ["YES", "YES"], ["NO", "NO"], ["CLOCK12", "CLOCK12"], ["CLOCK11", "CLOCK11"], ["CLOCK10", "CLOCK10"], ["CLOCK9", "CLOCK9"], ["CLOCK8", "CLOCK8"], ["CLOCK7", "CLOCK7"], ["CLOCK6", "CLOCK6"], ["CLOCK5", "CLOCK5"], ["CLOCK4", "CLOCK4"], ["CLOCK3", "CLOCK3"], ["CLOCK2", "CLOCK2"], ["CLOCK1", "CLOCK1"], ["ARROW_N", "ARROW_N"], ["ARROW_NE", "ARROW_NE"], ["ARROW_E", "ARROW_E"], ["ARROW_SE", "ARROW_SE"], ["ARROW_S", "ARROW_S"], ["ARROW_SW", "ARROW_SW"], ["ARROW_W", "ARROW_W"], ["ARROW_NW", "ARROW_NW"], ["TRIANGLE", "TRIANGLE"], ["TRIANGLE_LEFT", "TRIANGLE_LEFT"], ["CHESSBOARD", "CHESSBOARD"], ["DIAMOND", "DIAMOND"], ["DIAMOND_SMALL", "DIAMOND_SMALL"], ["SQUARE", "SQUARE"], ["SQUARE_SMALL", "SQUARE_SMALL"], ["RABBIT", "RABBIT"], ["COW", "COW"], ["MUSIC_CROTCHET", "MUSIC_CROTCHET"], ["MUSIC_QUAVER", "MUSIC_QUAVER"], ["MUSIC_QUAVERS", "MUSIC_QUAVERS"], ["PITCHFORK", "PITCHFORK"], ["XMAS", "XMAS"], ["PACMAN", "PACMAN"], ["TARGET", "TARGET"], ["TSHIRT", "TSHIRT"], ["ROLLERSKATE", "ROLLERSKATE"], ["DUCK", "DUCK"], ["HOUSE", "HOUSE"], ["TORTOISE", "TORTOISE"], ["BUTTERFLY", "BUTTERFLY"], ["STICKFIGURE", "STICKFIGURE"], ["GHOST", "GHOST"], ["SWORD", "SWORD"], ["GIRAFFE", "GIRAFFE"], ["SKULL", "SKULL"], ["UMBRELLA", "UMBRELLA"], ["SNAKE", "SNAKE"], ["ALL_CLOCKS", "ALL_CLOCKS"], ["ALL_ARROWS", "ALL_ARROWS"]];
var IMG = [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"],["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]];

Blockly.Blocks['display_clear'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.clear",
      "message0" : Blockly.MIXLY_MICROBIT_Clear_display
    });
    this.setTooltip(Blockly.MIXLY_MICROBIT_Clear_display);
  }
};

Blockly.Blocks.display_get_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	  this.appendValueInput('x')
        .setCheck(Number)
		    .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
	  this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_POINT);
    this.setInputsInline(true);
	  this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_BRIGHTNESS);
  }
};

Blockly.Blocks.display_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  	this.appendValueInput('x')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BRIGHTNESS)
  		  .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
  	this.appendValueInput('y')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.appendValueInput("STAT")        
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  	this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_DISPLAY_SETPIXEL);
  }
};

Blockly.Blocks.monitor_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	  this.appendValueInput('data')
        .setCheck(String)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,'show'],[Blockly.MIXLY_ESP32_MONITOR_SCROLL,'scroll']]),"MODE")
		    .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	  this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING;
        var TOOLTIPS = {
        'show':Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,
        'scroll':Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING
      };
      return TOOLTIPS[mode]+mode0;
    });
  }
};

Blockly.Blocks.monitor_show_scroll_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('data')
        .setCheck(String)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,'show'],[Blockly.MIXLY_ESP32_MONITOR_SCROLL,'scroll']]),"MODE")
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING);
    this.appendValueInput("time")
        .setCheck(Number)
        // .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DELAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING;
        var TOOLTIPS = {
        'show':Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,
        'scroll':Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING
      };
      return TOOLTIPS[mode]+mode0;
    });
  }
};

Blockly.Blocks.display_scroll_string = {
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

Blockly.Blocks.display_show_static = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck(String)
    .appendField(Blockly.MIXLY_ESP32_MONITOR_SHOW_STATIC);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_SHOW_STATIC);
  }
};

Blockly.Blocks.microbit_display_show_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('PIN',String)
        .setCheck("esp32_image")
        .appendField(Blockly.MIXLY_MICROBIT_Show_image);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Show_image);
  }
};



Blockly.Blocks['esp32_display_show_default_image'] = {
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
          "options" : [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"],["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]],
          "type" : "field_dropdown"
        }
      ]
    });
  }
};


Blockly.Blocks['esp32_display_show_animation'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "inputsInline": true,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
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
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_delay+Blockly.MIXLY_MICROBIT_Animate_images1);
  }
};

Blockly.Blocks['esp32_display_scroll'] = {
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

Blockly.Blocks['esp32_display_on'] = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_Turn_on_display,'on'],[Blockly.MIXLY_MICROBIT_Turn_off_display,'off']]),'on_off')
      .appendField(Blockly.MIXLY_MICROBIT_monitor);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('on_off');
        var mode0 =Blockly.MIXLY_MICROBIT_monitor;
        var TOOLTIPS = {
        'on':Blockly.MIXLY_MICROBIT_Turn_on_display,
        'off':Blockly.MIXLY_MICROBIT_Turn_off_display
      };
      return TOOLTIPS[mode]+mode0;
    });
  }
};

Blockly.Blocks['esp32_display_off'] = {
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

Blockly.Blocks['esp32_display_is_on'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "output" : "Boolean",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.is_on",
      "message0" : Blockly.MIXLY_MICROBIT_Display_is_on
    });
    this.setTooltip(Blockly.MIXLY_MICROBIT_Display_is_on1);
  }
};

Blockly.Blocks['display_image_builtins'] = {
  init : function () {
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "args0" : [{
          "name" : "image",
          "options" : [["HEART", "HEART"],["HEART_SMALL", "HEART_SMALL"],["HAPPY", "HAPPY"],["SAD", "SAD"],["SMILE", "SMILE"],["SILLY", "SILLY"],["FABULOUS", "FABULOUS"],["SURPRISED", "SURPRISED"],["ASLEEP", "ASLEEP"],["ANGRY", "ANGRY"],["CONFUSED", "CONFUSED"],["NO", "NO"],["YES", "YES"],["LEFT_ARROW", "LEFT_ARROW"],["RIGHT_ARROW", "RIGHT_ARROW"],["DRESS", "DRESS"],["TRANSFORMERS", "TRANSFORMERS"],["SCISSORS", "SCISSORS"],["EXIT", "EXIT"],["TREE", "TREE"],["PACMAN", "PACMAN"],["TARGET", "TARGET"],["TSHIRT", "TSHIRT"],["ROLLERSKATE", "ROLLERSKATE"],["DUCK", "DUCK"],["HOUSE", "HOUSE"],["TORTOISE", "TORTOISE"],["BUTTERFLY", "BUTTERFLY"],["STICKFIGURE", "STICKFIGURE"],["GHOST", "GHOST"],["PITCHFORK", "PITCHFORK"],["MUSIC_QUAVERS", "MUSIC_QUAVERS"],["MUSIC_QUAVER", "MUSIC_QUAVER"],["MUSIC_CROTCHET", "MUSIC_CROTCHET"],["COW", "COW"],["RABBIT", "RABBIT"],["SQUARE_SMALL", "SQUARE_SMALL"],["SQUARE", "SQUARE"],["DIAMOND_SMALL", "DIAMOND_SMALL"],["DIAMOND", "DIAMOND"],["CHESSBOARD", "CHESSBOARD"],["TRIANGLE_LEFT", "TRIANGLE_LEFT"],["TRIANGLE", "TRIANGLE"],["SNAKE", "SNAKE"],["UMBRELLA", "UMBRELLA"],["SKULL", "SKULL"],["GIRAFFE", "GIRAFFE"],["SWORD", "SWORD"]],
          "type" : "field_dropdown"
        }
      ],
      "output" : ["esp32_image", "List"],
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#attributes",
      "tooltip" : Blockly.MIXLY_MICROBIT_Built_in_image1,
      "message0" : Blockly.MIXLY_MICROBIT_Built_in_image
    });
  }
};


Blockly.Blocks['display_image_create'] = {
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
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "05"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "06"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "07"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "08"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "09"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "0f"
        },{
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
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "15"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "16"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "17"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "18"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "19"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "1f"
        },{
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
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "25"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "26"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "27"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "28"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "29"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "2f"
        },{
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
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "35"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "36"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "37"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "38"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "39"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "3f"
        },{
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
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "45"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "46"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "47"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "48"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "49"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "4f"
        },{
        "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "50"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "51"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "52"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "53"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "54"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "55"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "56"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "57"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "58"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "59"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "5f"
        },{
        "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "60"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "61"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "62"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "63"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "64"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "65"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "66"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "67"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "68"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "69"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "6f"
        },{
        "type" : "input_dummy"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "70"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "71"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "72"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "73"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "74"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "75"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "76"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "77"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "78"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "79"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7a"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7b"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7c"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7d"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7e"
        }, {
          "colour" : "#000000",
          "type" : "field_colour",
          "name" : "7f"
        }
      ],
      "output" : "esp32_image",
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/image.html#microbit.Image",
      "message0" : Blockly.MIXLY_ESP32_Create_image
    });
    this.setTooltip(Blockly.MIXLY_MICROBIT_Create_image1);
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
    this.setOutput(true);
    this.setInputsInline(true);
    this.appendValueInput('img')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET)
        .setCheck(["esp32_image","List",String]);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.appendValueInput('val')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_SHIFT)
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.DISPLAY_IMAGE_UNIT)
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var mode0 = Blockly.Msg.DISPLAY_IMAGE_LET;
        var mode1 = Blockly.Msg.DISPLAY_IMAGE_LET2;
        var mode2 = Blockly.Msg.DISPLAY_IMAGE_LET3;
        var TOOLTIPS = {
        'up': Blockly.MIXLY_MICROBIT_up,
        'down':Blockly.MIXLY_MICROBIT_down,
        'left':Blockly.MIXLY_MICROBIT_left,
        'right':Blockly.MIXLY_MICROBIT_right
      };
      return mode0 + mode1 +TOOLTIPS[mode]+mode2;
    });
  }
};

Blockly.Blocks['image_arithmetic'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MICROBIT_DISPLAY_UNION, '+'],
         [Blockly.MICROBIT_DISPLAY_MINUS, '-']];
    //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.display.HUE);
    this.setOutput(true, "esp32_image");
    this.appendValueInput('A')
        // .setCheck(["esp32_image", "List", String])
        .appendField(Blockly.MICROBIT_DISPLAY_MERGE_SHAPE);
    this.appendValueInput('B')
        // .setCheck(["esp32_image", "List", String])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('OP');
        var TOOLTIPS = {
        '+':Blockly.MIXLY_MICROBIT_image_add,
        '-':Blockly.MIXLY_MICROBIT_image_reduce
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['esp32_display_show_string'] = {
  init : function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,'show'],[Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING,'scroll']]),"MODE");
    this.jsonInit({
      "colour" : Blockly.Blocks.display.HUE,
      "inputsInline": true,
      "nextStatement" : null,
      "previousStatement" : null,
      "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
      "tooltip" : "Display the list of images as an animation with a certain delay between each frame. Indicate if you need to wait before continuing, continuously loop the animation and clear the display when finished.",
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_STRING,
      "args0" : [{
          "check" : String,
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
    this.setInputsInline(true);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING;
        var mode1 = Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_delay;
        var TOOLTIPS = {
        'show':Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING_ONE_BY_ONE,
        'scroll':Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING
      };
      return mode1+TOOLTIPS[mode]+mode0;
    });
  }
};

// Blockly.Blocks['esp32_display_scroll_string'] = {
//   init : function () {
//     this.jsonInit({
//       "colour" : Blockly.Blocks.display.HUE,
//       "inputsInline": true,
//       "nextStatement" : null,
//       "previousStatement" : null,
//       "helpUrl" : "https://microbit-micropython.readthedocs.io/en/latest/display.html#microbit.display.show",
//       "tooltip" : "Display the list of images as an animation with a certain delay between each frame. Indicate if you need to wait before continuing, continuously loop the animation and clear the display when finished.",
//       "message0" : Blockly.MIXLY_MICROBIT_Scroll_string,
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

Blockly.Blocks.group_lcd_print = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DF_LCD)
        .appendField('mylcd')
        //.appendField(new Blockly.FieldTextInput('mylcd'), 'VAR')
        .appendField(Blockly.MIXLY_LCD_PRINT1);
    this.appendValueInput("TEXT2", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT2);
    /*
    this.appendValueInput("TEXT3", String)
          .setCheck([String,Number])
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_LCD_PRINT3);
    this.appendValueInput("TEXT4", String)
          .setCheck([String,Number])
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.MIXLY_LCD_PRINT4);
          */
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_LCD_PRINT4);
  }
};

Blockly.Blocks.group_lcd_init = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('device')
        .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_SETUP)
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField('1602')
    .appendField('mylcd')
    .appendField(Blockly.MIXLY_LCD_ADDRESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SETUP+Blockly.MIXLY_DF_LCD+Blockly.MIXLY_LCD_ADDRESS);
  }
};

Blockly.Blocks.group_lcd_print2 = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput("row", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DF_LCD)
        .appendField('mylcd')
        .appendField(Blockly.MIXLY_LCD_ROW);
    this.appendValueInput("column", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_COLUMN);
    this.appendValueInput("TEXT", String)
        .setCheck([String,Number])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_LCD_PRINT);
    this.setPreviousStatement(true, null);
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_LCD_PRINT3);
  }
};

Blockly.Blocks.group_lcd_power = {
  init: function() {
      this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_DF_LCD)
    .appendField('mylcd')
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LCD_STAT_ON, "on()"], [Blockly.MIXLY_LCD_STAT_OFF, "off()"],  [Blockly.MIXLY_LCD_STAT_CLEAR, "clear()"], [Blockly.MIXLY_LCD_NOBACKLIGHT, "backlight(off)"], [Blockly.MIXLY_LCD_BACKLIGHT, "backlight(on)"]]), "STAT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('STAT');
        var mode0 = Blockly.Msg.LISTS_SET_INDEX_SET;
        var mode1 = Blockly.MIXLY_DF_LCD;
        var TOOLTIPS = {
        'on()':Blockly.MIXLY_LCD_STAT_ON,
        'off()':Blockly.MIXLY_LCD_STAT_OFF,
        'clear()':Blockly.MIXLY_LCD_STAT_CLEAR,
        'backlight(off)':Blockly.MIXLY_LCD_NOBACKLIGHT,
        'backlight(on)':Blockly.MIXLY_LCD_BACKLIGHT
      };
      return mode0+mode1+TOOLTIPS[mode];
    });
  }
};

// Blockly.Blocks['oled_init'] = {
//   init: function() {
//    this.setColour(Blockly.Blocks.display.HUE);
//    this.appendValueInput('VAR')
//             .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
//             .setCheck("var");
//    this.appendValueInput("RX", Number)
//        //.appendField(Blockly.MIXLY_SETUP)
//        // .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
//        // .appendField(new Blockly.FieldTextInput('lcd'), 'VAR')  
//        .appendField(Blockly.MIXLY_SETUP)
//        .appendField("sda")
//        .setCheck(Number)
//        .setAlign(Blockly.ALIGN_RIGHT);
//    this.appendValueInput("TX", Number)
//        .appendField("scl")
//        .setCheck(Number)
//        .setAlign(Blockly.ALIGN_RIGHT);
//    this.appendValueInput('freq')
//        .setCheck(Number)
//        .appendField(Blockly.MIXLY_FREQUENCY)
//        .setAlign(Blockly.ALIGN_RIGHT);
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//    this.setInputsInline(true);
//    }
//   };

Blockly.Blocks.display_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE)
            .setCheck("var");
        // this.appendDummyInput("")
        //     .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + "OLED")
        //     .appendField(new Blockly.FieldDropdown([
        //         ["OLED 128¡Á64", "OLED 128¡Á64"]
        //         ]), "key");
        this.appendValueInput('row')
            .appendField(Blockly.MIXLY_SETUP + Blockly.Msg.LISTS_SET_INDEX_INPUT_TO + "OLED")
            .setCheck(Number);
        this.appendValueInput('column')
            .appendField("X")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};

Blockly.Blocks.display_draw_4strings = {
    init: function() {
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
        // this.appendDummyInput("")        
            // .appendField(new Blockly.FieldTextInput('lcd'), 'VAR')  
            // .appendField(Blockly.Msg.OLEDDISPLAY);  
        //.appendField(new Blockly.FieldImage(Blockly.pathToBlockly + 'blocks/display-oled-128x64-i2c/display-oled-128x64-i2c.jpg', Blockly.Arduino.imageSize, Blockly.Arduino.imageSize));
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
        this.appendValueInput("Text_line1" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.OLEDDISPLAY+Blockly.Msg.line1);    
        this.appendValueInput("Text_line2" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line2);      
        this.appendValueInput("Text_line3" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line3);      
        this.appendValueInput("Text_line4" , 'String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.line4);      
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.display.HUE);
        this.setTooltip(Blockly.MIXLY_DF_LCD+Blockly.Msg.OLEDDISPLAY+Blockly.MIXLY_MICROBIT_TYPE_STRING);
    }
};

Blockly.Blocks['display_image_size'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_MICROBIT_IMAGE_HEIGHT, 'height'],
         [Blockly.MIXLY_MICROBIT_IMAGE_WIDTH, 'width']
        ];
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET+Blockly.MIXLY_MICROBIT_IMAGE);
    this.appendValueInput('VAR')
        .setCheck("esp32_image")
        // .appendField(Blockly.blockpy_USE_LIST);   
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    this.setOutput(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_GET;
      var mode1 =Blockly.MIXLY_MICROBIT_IMAGE
      var TOOLTIPS = {
        'height': Blockly.MIXLY_MICROBIT_IMAGE_HEIGHT,
        'width': Blockly.MIXLY_MICROBIT_IMAGE_WIDTH,
      };
      return mode0+mode1+TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks.display_rect = {
    init: function () {
      var brightness_or_not =
        [[Blockly.LUXE_LED_ON, '1'],
         [Blockly.LUXE_LED_OFF, '0']
        ];
        this.setColour(Blockly.Blocks.display.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
         this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RECT)   
            .appendField(new Blockly.FieldDropdown(brightness_or_not), 'OP')  
            
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_RECT,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "width"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "height"
        }, {
          "type" : "input_dummy"
        }, {
          "checked" : false,
          "type" : "field_checkbox", 
          "name" : "fill"
          }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RECT);
    }
};

Blockly.Blocks.display_line = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
          this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
         this.appendDummyInput()
         .appendField(Blockly.MIXLY_DISPLAY_DRAW)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_DISPLAY_RLINE, "hline"], [Blockly.MIXLY_DISPLAY_VLINE, "vline"]]), "direction");
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_LINE,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "length"
        }
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.display_line_arbitrarily= {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)         
        //     .appendField(new Blockly.FieldTextInput('lcd'), 'VAR') 
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.jsonInit({
      "message0" : Blockly.MIXLY_MICROBIT_SHOW_LINE_ARBITRARILY,
      "args0" : [{
          "check" : Number,
          "type" : "input_value",
          "name" : "x1"
        }, {
          "check" : Number,
          "type" : "input_value",
          "name" : "y1"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "x2"
        },{
          "check" : Number,
          "type" : "input_value",
          "name" : "y2"
        },
        ]
      });
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
}

Blockly.Blocks.display_get_screen_pixel = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_GET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.display_get_screen_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MONITOR_GET_SCREEN_IMAGE);
    this.setInputsInline(true);
    this.setOutput(true, "esp32_image");
    this.setTooltip(Blockly.MIXLY_ESP32_MONITOR_GET_SCREEN_IMAGE_TOOLTIP);
  }
};

Blockly.Blocks.display_bright_screen = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.display_blink_rate = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('x')
      .setCheck(Number)
      .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE)
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE);
  }
};

Blockly.Blocks.display_rgb_color = {
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
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET+Blockly.MIXLY_MICROBIT_PY_STORAGE_AS)
            .appendField(new Blockly.FieldColour('#ff0000'), 'FIELDNAME');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RGB_NUM_R_G_B);
    }
};

Blockly.Blocks.display_show_image_or_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
  this.appendValueInput('data')
        .setCheck([String, "esp32_image"])
        .appendField(Blockly.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
  }
};

Blockly.Blocks.display_scroll_string = {
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

 Blockly.Blocks.display_show_image_or_string_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('data')
        .setCheck([String, "esp32_image"])
        .appendField(Blockly.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
    this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DELAY);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_SHOW_IMAGE_OR_STRING);
  }
};

Blockly.Blocks.display_scroll_string_delay = {
   init: function() {
     this.setColour(Blockly.Blocks.display.HUE);
     this.appendValueInput('data')
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_STRING);
     this.appendValueInput("time")
        .setCheck(Number)
        .appendField(Blockly.MIXLY_DELAY);    
     this.setPreviousStatement(true, null);
     this.setNextStatement(true, null);
     this.setInputsInline(true);
   }
 };

 Blockly.Blocks['display_onoff'] = {
   init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_ESP32_ON, "ON"], [Blockly.MIXLY_ESP32_OFF, "OFF"]]), 'ONOFF')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
  }
};