'use strict';

goog.provide('Blockly.Blocks.display');
goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180//'#cc6688' //180;

Blockly.Blocks.handbit_display_use_i2c_init = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput('I2CSUB')
            .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH+"I2C")
            .setCheck("var");
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE)
            .setCheck("var");
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

Blockly.Blocks.handbit_display_draw_4strings = {
    init: function() {
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

Blockly.Blocks.handbit_display_rect = {
    init: function () {
      var brightness_or_not =
        [[Blockly.LUXE_LED_ON, '1'],
         [Blockly.LUXE_LED_OFF, '0']
        ];
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RECT)   
            .appendField(new Blockly.FieldDropdown(brightness_or_not), 'OP')  
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

Blockly.Blocks.handbit_display_line = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
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

Blockly.Blocks.handbit_display_line_arbitrarily= {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROBIT_JS_OLED)
            .setCheck("var");
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
