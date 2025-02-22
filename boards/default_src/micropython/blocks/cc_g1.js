import * as Blockly from 'blockly/core';

const CCG1_HUE = 40;

export const cc_g1_init = {
    init: function () {
        this.setColour(CCG1_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP + " CC_G1");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('key');
            var TOOLTIPS = {
                "temperature": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_temperature_TOOLTIP,
                "relative_humidity": Blockly.Msg.MIXLY_MICROBIT_SENSOR_SHT_HUM_TOOLTIP
            };
            return TOOLTIPS[mode]
        });
    }
};

export const cc_g1_read_bat = {
    init: function () {
        this.setColour(CCG1_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET_BATTERY);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const cc_g1_read_joystick = {
    init: function () {
        this.setColour(CCG1_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_JOYSTICK)
            .appendField(new Blockly.FieldDropdown([
                ["x", "[0]"],
                ["y", "[1]"],
                ["(x,y)", ""]
            ]), "VAR");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_DATA);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const cc_g1_read_key = {
    init: function () {
        this.setColour(CCG1_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(new Blockly.FieldDropdown([
                ["A", "0"],
                ["B", "1"],
                ["C", "2"],
                ["D", "3"],
                ["POWER", "4"],
                ["SELECT", "5"]
            ]), "VAR");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.WHETHER_IS_PRESSED);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

export const cc_g1_turnoff = {
    init: function () {
        this.setColour(CCG1_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_HANDLE_SHUTDOWN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};
