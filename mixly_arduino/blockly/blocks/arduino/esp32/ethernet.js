'use strict';
goog.provide('Blockly.Blocks.ethernet');
goog.require('Blockly.Blocks');

Blockly.Blocks.ethernet.HUE = 0;
//esp_now发送数据
Blockly.Blocks['esp_now_send'] = {
  init: function() {
  	 this.appendDummyInput()
        .appendField("ESP NOW发送");
    this.appendValueInput("mac")
        .setCheck(null)
        .appendField(Blockly.MIXLY_ETHERNET_MAC_ADDRESS);
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(Blockly.MIXLY_SD_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.ethernet.HUE);
 this.setTooltip("");
 this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
  }
};

//esp_now接收数据
Blockly.Blocks['esp_now_receive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP NOW"+Blockly.MQTT_subscribe2+Blockly.MIXLY_SD_DATA);
    this.appendStatementInput("receive_data")
        .setCheck(null);
    this.setColour(Blockly.Blocks.ethernet.HUE);
 this.setTooltip("");
 this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
  }
};

//Find MAC
Blockly.Blocks['mac_address'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SERIAL_PRINT+Blockly.MIXLY_ETHERNET_MAC_ADDRESS);
    this.setColour(Blockly.Blocks.ethernet.HUE);
 this.setTooltip("");
 this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
  }
};