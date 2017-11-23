'use strict';

goog.provide('Blockly.Blocks.colour');
goog.require('Blockly.Blocks');
goog.require('Blockly.constants');

Blockly.FieldColour.COLOURS = ['#f00', '#e00', '#d00', '#c00', '#b00', '#a00',
    '#800', '#600', '#400', '#000'];
Blockly.FieldColour.COLUMNS = 5;
Blockly.Blocks['microbit_pin_touched'] = {
    init : function () {
        this.jsonInit({
            "colour" : 256,
            "args0" : [{
                "name" : "pin",
                "options" : [["0", "0"], ["1", "1"], ["2", "2"]],
                "type" : "field_dropdown"
            }
            ],
            "output" : "Boolean",
            "helpUrl" : "https://microbit_python-micropython.readthedocs.io/en/latest/pin.html#microbit_python.MicroBitTouchPin.is_touched",
            "tooltip" : "Return True if the referenced pin is touched.",
            "message0" : Blockly.MIXLY_MICROBIT_Pin_touched
        });
    }
};