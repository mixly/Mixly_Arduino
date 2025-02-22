import * as Blockly from 'blockly/core';

const TOOLS_HUE = "#555555";

export const esp8266_pin = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/ESP8266-NodeMCU.png'), 525, 346, "*"));
        this.setColour(TOOLS_HUE);
        this.setTooltip();
        this.setHelpUrl();
    }
};

export const wemos_d1_mini_pin = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/ESP8266-WeMos-D1-Mini.png'), 525, 264, "*"));
        this.setColour(TOOLS_HUE);
        this.setTooltip();
        this.setHelpUrl();
    }
};