import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';
import { inout_analog_write } from '@mixly/arduino-avr/blocks/inout';

const BASE_HUE = 20//'#ae3838';//40;

export const ledcSetup = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput('CHANNEL')
            .setCheck(Number)
            .appendField("ledc" + Blockly.Msg.MIXLY_SETUP + Blockly.Msg.MIXLY_CHANNEL);
        this.appendValueInput("FREQ", Number)
            .appendField(Blockly.Msg.MIXLY_FREQUENCY)
            .setCheck(Number);
        this.appendValueInput('PWM_RESOLUTION')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_RESOLUTION);
        this.appendDummyInput("")
            .appendField("bit");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};

export const ledcAttachPin = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField("ledc" + Blockly.Msg.MIXLY_ATTATCH + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('CHANNEL')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_CHANNEL);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};
export const ledcDetachPin = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField("ledc" + Blockly.Msg.MIXLY_DETACH + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
    }
};
export const ledcWrite = inout_analog_write;

export const inout_touchRead = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH)
            .appendField(Blockly.Msg.MIXLY_PIN);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};

export const touchAttachInterrupt = {
    init: function () {
        this.setColour(BASE_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_TOUCHATTACHINTERRUPT_PIN)
            .setCheck(Number);
        this.appendValueInput("threshold", Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_THRESHOLD)
            .setCheck(Number);
        this.appendDummyInput("");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};
export const inout_esp32_dac = {
    init: function () {
        this.appendValueInput("value")
            .setCheck(null)
            .appendField(Blockly.Msg.inout_esp32_dac)
            .appendField(new Blockly.FieldDropdown(Profile.default.dac), "PIN")
            .appendField(Blockly.Msg.MIXLY_VALUE2);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip(Blockly.Msg.inout_esp32_dac_HELP);
        this.setHelpUrl("");
    }
};

export const esp32_led_pwm = {
    init: function () {
        this.appendValueInput("PIN")
            .setCheck(null)
            .appendField(Blockly.Msg.MICROBIT_ACTUATOR_ticks)
            .appendField(new Blockly.FieldTextInput("8"), "resolution")
            .appendField(Blockly.Msg.MIXLY_FREQUENCY)
            .appendField(new Blockly.FieldTextInput("5000"), "freq")
            .appendField(Blockly.Msg.MIXLY_CHANNEL)
            .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"]]), "ledChannel")
            .appendField(Blockly.Msg.MIXLY_ANALOGWRITE_PIN);
        this.appendValueInput("val")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_VALUE2);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};