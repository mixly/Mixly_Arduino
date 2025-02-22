import * as Blockly from 'blockly/core';

const LOOPS_HUE = 120;

export const controls_hw_timer = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_HW_TIMER)
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "TIMER_NUM");
        this.appendValueInput('TIME')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_EVERY);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS)
            .appendField(Blockly.Msg.MIXLY_MODE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_PYTHON_ONE_SHOT, "false"], [Blockly.Msg.MIXLY_PYTHON_PERIODIC, "true"]]), "mode");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_DO);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2);
    }
};

export const controls_runnig_core = {
    init: function () {
        this.appendDummyInput()
            .appendField("ESP32")
            .appendField("Task")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]]), "task")
            .appendField("Core")
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "core");
        this.appendValueInput("length")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.SPACE_ALLOCATION);
        this.appendStatementInput("setup")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SETUP);
        this.appendStatementInput("loop")
            .setCheck(null)
            .appendField(Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
        this.setColour(LOOPS_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const control_core_delay = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CONTROL_CORE_DELAY);
        this.appendValueInput("sleeplength", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MILLIS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_SCOOP_SLEEP);
    }
};
export const controls_hw_timer_start = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_HW_TIMER)
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "TIMER_NUM")
            .appendField(Blockly.Msg.MIXLY_MSTIMER2_START);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2_START);
    }
};

export const controls_hw_timer_stop = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_HW_TIMER)
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "TIMER_NUM")
            .appendField(Blockly.Msg.MIXLY_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2_STOP);
    }
};

export const esp32_deep_sleep = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.DFPLAYER_MINI_SLEEP)
            .appendField(new Blockly.FieldTextInput("5"), "time")
            .appendField(Blockly.Msg.MIXLY_SECOND);
        this.setPreviousStatement(true, null);
        this.setColour(LOOPS_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};