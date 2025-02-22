import * as Blockly from 'blockly/core';
import { Profile } from 'mixly';

const SENSOR_HUE = 40;

//ESP32片内霍尔传感器值
export const ESP32_hallRead = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ESP32_HALL);
        this.setOutput(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip();
        this.setHelpUrl("");
    }
};

//ESP32片内温度传感器值
export const ESP32_temprature = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ESP32_TEMP);
        this.setOutput(true, null);
        this.setColour(SENSOR_HUE);
        this.setTooltip();
        this.setHelpUrl("");
    }
};

export const OneButton = {
    init: function () {
        this.setColour(SENSOR_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(Profile.default.button), 'PIN');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_BUTTON)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_CLICK, "attachClick"], [Blockly.Msg.MIXLY_DOUBLE_CLICK, "attachDoubleClick"], [Blockly.Msg.MIXLY_LONG_PRESS_START, "attachLongPressStart"], [Blockly.Msg.MIXLY_DURING_LONG_PRESS, "attachDuringLongPress"], [Blockly.Msg.MIXLY_LONG_PRESS_END, "attachLongPressStop"]]), "mode");
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
        this.setInputsInline(true);
        this.setHelpUrl();
    }
};

export const ESP_TCS34725_Get_RGB = {
    init: function () {
        const TCS34725_COLOR = [
            [Blockly.Msg.COLOUR_RGB_RED, "r"],
            [Blockly.Msg.COLOUR_RGB_GREEN, "g"],
            [Blockly.Msg.COLOUR_RGB_BLUE, "b"],
        ];
        this.setColour(SENSOR_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.TCS34725_Get_RGB)
            .appendField(new Blockly.FieldDropdown(TCS34725_COLOR), "TCS34725_COLOR");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};