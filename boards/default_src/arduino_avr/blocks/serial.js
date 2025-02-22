import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const SERIAL_HUE = 65;

export const serial_begin = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", Number)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIAL_BEGIN);
    }
};

export const serial_write = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_WRITE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_WRITE_TOOLTIP);
    }
};

export const serial_print = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PRINT_INLINE, "print"], [Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP, "println"]]), "new_line");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

export const serial_println = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP, "println"], [Blockly.Msg.MIXLY_PRINT_INLINE, "print"]]), "new_line");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};


export const serial_print_num = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PRINT_INLINE, "print"], [Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP, "println"]]), "new_line")
            .appendField(Blockly.Msg.MIXLY_NUMBER);
        this.appendValueInput("CONTENT", Number)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MATH_HEX, "HEX"], [Blockly.Msg.MATH_BIN, "BIN"], [Blockly.Msg.MATH_OCT, "OCT"], [Blockly.Msg.MATH_DEC, "DEC"]]), "STAT")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
    }
};

export const serial_print_hex = serial_print_num;

export const serial_available = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
    }
};

export const serial_readstr = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_READSTR);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
    }
};

export const serial_readstr_until = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", Number)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_READSTR_UNTIL)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIAL_READSTRUNITL.replace('%1', Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC)));
    }
};

export const serial_parseInt_Float = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            //.appendField(Blockly.Msg.MIXLY_SERIAL_READ)
            .appendField(new Blockly.FieldDropdown([["read", "read"], ["peek", "peek"], ["parseInt", "parseInt"], ["parseFloat", "parseFloat"]]), "STAT");
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('STAT');
            var TOOLTIPS = {
                'parseInt': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_INT,
                'parseFloat': Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_FLOAT
            };
            return TOOLTIPS[op];
        });
    }
};

export const serial_flush = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_FLUSH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIAL_FLUSH);
    }
};
export const serial_softserial = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select");
        this.appendValueInput("RX", Number)
            .setCheck(Number)
            .appendField("RX#")
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX", Number)
            .appendField("TX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SOFTSERIAL.replace('%1', Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC))
            .replace('%2', Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC)));
    }
};

export const serial_event = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Profile.default.serial_select), "serial_select")
            .appendField(Blockly.Msg.MIXLY_SERIAL_EVENT);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SERIALEVENT);
    }
};