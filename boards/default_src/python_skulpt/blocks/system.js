import * as Blockly from 'blockly/core';

const SYSTEM_HUE = 120;

export const base_delay = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput("DELAY_TIME", Number)
            .appendField(Blockly.Msg.MIXLY_DELAY + '(' + Blockly.Msg.MIXLY_MILLIS + ')')
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
};

export const controls_millis = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_time_time);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MILLIS);
    }
};

export const time_localtime = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_ALL, "all"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_YEAR, "0"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_MONTH, "1"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_DATE, "2"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_HOUR, "3"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_MINUTE, "4"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_SECOND, "5"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_INWEEK, "6"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_INYEAR, "7"],
                [Blockly.Msg.MIXLY_SYSTEM_TIME_LOCALTIME_DST, "8"]
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const Panic_with_status_code = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput("STATUS_CODE", Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Panic_with_status_code)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
};

export const reset = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_micro);
        this.setPreviousStatement(true);
        // this.setNextStatement(true);
    }
};

export const controls_mstimer2 = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput('TIME')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('MsTimer2')
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_EVERY);
        this.appendDummyInput()
            .appendField('ms');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const controls_mstimer2_start = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField('MsTimer2')
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_START);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const controls_mstimer2_stop = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField('MsTimer2')
            .appendField(Blockly.Msg.MIXLY_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const time_sleep = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendValueInput("DELAY_TIME", Number)
            .appendField(Blockly.Msg.MIXLY_DELAY)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SECOND)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
    }
};