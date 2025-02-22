import * as Blockly from 'blockly/core';

const BASE_HUE = 20//'#ae3838';//40;

export const inout_highlow = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_HIGH, "HIGH"], [Blockly.Msg.MIXLY_LOW, "LOW"]]), 'BOOL')
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

export const inout_digital_read = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DIGITALREAD_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, [Boolean, Number]);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
    }
};

export const inout_analog_write = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_VALUE2)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE_PY);
    }
};

export const inout_analog_write_set = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ANALOGWRITE_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_PERIOD_MIL)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_mSecond, "period"],
                [Blockly.Msg.MIXLY_uSecond, "period_microseconds"]
            ]), "key");
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_STAT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_WRITE_SET);
    }
};

export const inout_analog_read = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ANALOGREAD_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ANALOG_READ);
    }
};

export const sensor_pin_pressed = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput('pin')
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const inout_digital_write = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_DIGITALWRITE_PIN)
            .setCheck(Number);
        this.appendValueInput("STAT")
            .appendField(Blockly.Msg.MIXLY_STAT)
            .setCheck([Number, Boolean]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
    }
};