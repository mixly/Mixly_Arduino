'use strict';

goog.provide('Blockly.Blocks.network');

goog.require('Blockly.Blocks');

Blockly.Blocks.network.HUE=225

Blockly.Blocks['iot_wifi_connect'] = {
   init: function() {
    this.setColour(Blockly.Blocks.network.HUE);
    this.appendDummyInput()
    	.appendField(Blockly.MIXLY_ESP32_IOT_CONNECT_WIFI);
    this.appendValueInput('WIFINAME')
    	.setCheck(String)
    	.appendField(Blockly.Msg.HTML_NAME);
    this.appendValueInput('PASSWORD')
    	.setCheck(String)
    	.appendField(Blockly.Msg.HTML_PASSWORD);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_ESP32_IOT_WIFI_CONNECT_TOOLTIP);
}
};