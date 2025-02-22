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
            .appendField(Blockly.Msg.MIXLY_RUNTIME + "(" + Blockly.Msg.MIXLY_MILLIS + ")");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MILLIS);
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
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Panic_with_status_code);
    }
};


export const reset = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_Reset_micro);
        this.setPreviousStatement(true);
        // this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_Reset_micro);
    }
};


export const controls_uname = {
    init: function () {
        this.setColour(SYSTEM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_CONTORL_UNAME);

        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_MICROBIT_PY_CONTORL_UNAME);
    }
};
