import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const DISPLAY_HUE = 180;
const SENSOR_HUE = 40;
const ACTUATOR_HUE = 100;

var MIXEPI_ADXL345_ACTION = [
    [Blockly.Msg.HANDBIT_FORWARD, "accel.getAcceleration().x>-4.7&&accel.getAcceleration().x<0&&accel.getAcceleration().y<1&&accel.getAcceleration().y>-1&&accel.getAcceleration().z<-8&&accel.getAcceleration().z>-9.8"],
    [Blockly.Msg.HANDBIT_BACKWARD, "accel.getAcceleration().x>0&&accel.getAcceleration().x<4.7&&accel.getAcceleration().y<1&&accel.getAcceleration().y>-1&&accel.getAcceleration().z<-8&&accel.getAcceleration().z>-9.8"],
    [Blockly.Msg.HANDBIT_LEFT, "accel.getAcceleration().y>0&&accel.getAcceleration().y<5.5&&accel.getAcceleration().z<-7.5&&accel.getAcceleration().z>-9.8"],
    [Blockly.Msg.HANDBIT_RIGHT, "accel.getAcceleration().y<0&&accel.getAcceleration().y>-4.7&&accel.getAcceleration().z<-7.5&&accel.getAcceleration().z>-9.8"],
    [Blockly.Msg.HANDBIT_UP, "accel.getAcceleration().z>-9.8&&accel.getAcceleration().z<-8"],
    [Blockly.Msg.HANDBIT_DOWN, "accel.getAcceleration().z>8&&accel.getAcceleration().z<9.8"]
];



var BRIGHTNESS_SELECT = [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"]];

export const brightness_select = {
    init: function () {
        this.setColour(DISPLAY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(BRIGHTNESS_SELECT), 'STAT');
        this.setOutput(true, Number);
    }
};

export const mixePi_button_is_pressed = {
    init: function () {
        this.setColour(SENSOR_HUE);
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

export const mixepi_light = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_LIGHT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
    }
};

export const mixepi_sound = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_SOUND);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
    }
};

export const mixepi_inout_touchRead = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_TOUCH)
            .appendField(Blockly.Msg.MIXLY_PIN)
            .appendField(new Blockly.FieldDropdown(Profile.default.touch), 'touch_pin');
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};


export const mixepi_ADXL345_action = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField("MIXEPI");
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(MIXEPI_ADXL345_ACTION), "MIXEPI_ADXL345_ACTION");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
        this.setHelpUrl('');
    }
};

export const mixepi_rgb_rainbow1 = {
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

export const mixepi_rgb_rainbow3 = {
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

export const RGB_color_seclet = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.OLED_DRAW_PIXE_TOOLTIP);
    }
};

export const RGB_color_rgb = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendValueInput("R")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_R);
        this.appendValueInput("G")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_G);
        this.appendValueInput("B")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('');
    }
};

export const mixepi_rgb = {
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

export const mixepi_rgb2 = {
    init: function () {
        this.setColour(ACTUATOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_RGB);
        this.appendDummyInput("")
            .appendField("1")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR1", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("2")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR2", Number)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("3")
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.appendValueInput("COLOR3", Number)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const mixepi_rgb_Brightness = {
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

