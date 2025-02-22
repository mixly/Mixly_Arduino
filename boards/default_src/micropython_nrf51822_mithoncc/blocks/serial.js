import * as Blockly from 'blockly/core';

const SERIAL_HUE = 65; //'#58a8de'//65;

export const serial_print = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

export const serial_println = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP + Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};
//打印16进制数
export const serial_print_hex = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", Number)
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_PRINT + "  (" + Blockly.Msg.MATH_HEX + ")")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
    }
};

export const serial_receive_data_event = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput('char_marker')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SERIAL_WHEN_CONTAIN_DATA)
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
    }
};

export const serial_readstr = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_READSTR);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
    }
};

export const serial_any = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_AVAILABLE);
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_SERIAL_AVAILABLE1);
    }
};

export const serial_readline = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SERIAL_READ_LINE);
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_SERIAL_READ_LINE1);
    }
};

export const serial_readstr_until = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_READSTR_UNTIL)
            .appendField(new Blockly.FieldDropdown([
                ["new line", "serial.delimiters(Delimiters.NewLine)"],
                [",", "serial.delimiters(Delimiters.Comma)"],
                ["$", "serial.delimiters(Delimiters.Dollar)"],
                [":", "serial.delimiters(Delimiters.Colon)"],
                [".", "serial.delimiters(Delimiters.Fullstop)"],
                ["#", "serial.delimiters(Delimiters.Hash)"]
            ]), "char_marker");

        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};

export const serial_softserial = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("RX", Number)
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField("RX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX", Number)
            .appendField("TX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN)
            .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['38400', '38400'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600']]), 'baudrate');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SERIAL_softserial);
    }
};

export const serial_begin = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_BEGIN)
            .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['38400', '38400'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600']]), 'baudrate');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.MIXLY_SERIAL_BEGIN);
    }
};

export const IO_input = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.blockpy_inout_raw_input)
            .setCheck(String);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
    }
}

export const IO_print = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.BLOCKPY_PRINT_TOOLTIP);
    }
};

export const IO_print_inline = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};