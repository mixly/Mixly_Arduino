import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';
import { sensor_mixgo_pin_near } from './MixGo';

const SENSOR_HUE = 40;
const ACTUATOR_HUE = 100;

export const mixgo_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_BUTTON);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.button), 'PIN');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const sensor_mixgo_sound = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};

export const mixgo_touch_pin = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.touch), 'touch_pin');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_TOUCHED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_sensor_pin_pressed);
    }
};

export const sensor_mixgo_light = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_LIGHT)
            .appendField(new Blockly.FieldDropdown([["A", "39"], ["B", "36"]]), "direction");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

//NTC电阻
export const NTC_TEMP = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("NTC")
            .appendField(Blockly.Msg.MIXLY_TEMP);

        this.setInputsInline(false);
        this.setOutput(true, Number);
        this.setTooltip();
    }
};

export const MPU9250_update = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("MPU9250" + Blockly.Msg.MIXLY_update_data);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};
export const Pocket_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);

        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};

export const Pocket_rgb2 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR1", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const Pocket_rgb_Brightness = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendValueInput("Brightness")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_BRIGHTNESS);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
    }
};
export const Pocket_rgb_show = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_SHOW)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};
export const pocket_RGB_color_HSV = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendValueInput("H")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_H);
        this.appendValueInput("S")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_S);
        this.appendValueInput("V")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.HSV_V);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('色调范围0-65536;饱和度范围0-255;明度范围0-255');
    }
};

export const sensor_button_is_pressed = mixgo_button_is_pressed;
export const sensor_pin_near = sensor_mixgo_pin_near;
export const sensor_light = sensor_mixgo_light;
export const sensor_sound = sensor_mixgo_sound;