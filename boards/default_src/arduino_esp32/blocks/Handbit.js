import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const HANDBIT_HUE = 65;
const ACTUATOR_HUE = 100;

export const handbit_button_is_pressed = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_BUTTON);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.button), 'btn');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_IS_PRESSED);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SENOR_IS_PRESSED);
    }
};

export const handbit_light = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

export const handbit_sound = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};

export const inout_touchRead = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH + Blockly.Msg.MIXLY_PIN)
            .setCheck(Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};

export const touchAttachInterrupt = {
    init: function () {
        this.setColour(HANDBIT_HUE);
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

var HANDBIT_MSA300_GETAB = [
    [Blockly.Msg.MixGo_MPU9250_AX, "msa.getX()"],
    [Blockly.Msg.MixGo_MPU9250_AY, "msa.getY()"],
    [Blockly.Msg.MixGo_MPU9250_AZ, "msa.getZ()"],
];

var HANDBIT_MSA300_ACTION = [
    [Blockly.Msg.HANDBIT_FORWARD, "msa.getX()>1500&&msa.getX()<2000&&msa.getZ()>-1000&&msa.getZ()<0"],
    [Blockly.Msg.HANDBIT_BACKWARD, "msa.getX()>1500&&msa.getX()<2000&&msa.getZ()>0&&msa.getZ()<1500"],
    [Blockly.Msg.HANDBIT_LEFT, "msa.getY()<1000&&msa.getY()>0"],
    [Blockly.Msg.HANDBIT_RIGHT, "msa.getY()<0&&msa.getY()>-1000"],
    [Blockly.Msg.HANDBIT_UP, "msa.getX()>-400&&msa.getX()<400&&msa.getY()>-400&&msa.getY()<400&&msa.getZ()>-1800&&msa.getZ()<-1400"],
    [Blockly.Msg.HANDBIT_DOWN, "msa.getX()>-400&&msa.getX()<400&&msa.getY()>-400&&msa.getY()<400&&msa.getZ()>2000&&msa.getZ()<2400"],

];

//传感器_重力感应
export const handbit_MSA300 = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MixGo_MPU9250);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(HANDBIT_MSA300_GETAB), "HANDBIT_MSA300_GETAB");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
        this.setHelpUrl('');
    }
};

export const handbit_MSA300_action = {
    init: function () {
        this.setColour(HANDBIT_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.Handbit);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(HANDBIT_MSA300_ACTION), "HANDBIT_MSA300_ACTION");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
        this.setHelpUrl('');
    }
};

export const handbit_rgb_rainbow1 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendValueInput("WAIT")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGBdisplay_rgb_rainbow1);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

var DISPLAY_RAINBOW_TYPE = [
    [Blockly.Msg.MIXLY_RGB_DISPLAY_RAINBOW_TYPE_1, "normal"],
    [Blockly.Msg.MIXLY_RGB_DISPLAY_RAINBOW_TYPE_2, "change"]
];

export const handbit_rgb_rainbow3 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
        this.appendValueInput("rainbow_color")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_display_rgb_rainbow3);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const handbit_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
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

export const handbit_rgb2 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_NUM + "1" + Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR1", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_NUM + "2" + Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR2", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_NUM + "3" + Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR3", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const handbit_rgb_Brightness = {
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

export const handbit_rgb_show = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB_SHOW)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const handbit_motor_move = {
    init: function () {
        this.appendDummyInput()
            .appendField("掌控宝" + Blockly.Msg.MIXLY_MOTOR)
            .appendField(new Blockly.FieldDropdown([["M1", "0x01"], ["M2", "0x10"]]), "type");
        this.appendValueInput("speed")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_SPEED + "(-100~100)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ACTUATOR_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const handbit_RGB_color_HSV = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_NUM);
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