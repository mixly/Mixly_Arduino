"use strict";
goog.provide("Blockly.Blocks.blynk");
goog.require("Blockly.Blocks");

//物联网-一键配网
Blockly.Blocks.blynk_smartconfig = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/smartconfig.png", 20, 20)).appendField(Blockly.blynk_smartconfig);
    this.appendValueInput("server_add").appendField(Blockly.blynk_SERVER_ADD).setCheck(String);
    this.appendValueInput("auth_key", String).appendField(Blockly.blynk_IOT_AUTH).setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl("https://gitee.com/hznupeter/Blynk_IOT/wikis/pages");
  }
};

//物联网-服务器信息
Blockly.Blocks.blynk_server = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20)).appendField(Blockly.blynk_SERVER_INFO);
    this.appendValueInput("server_add").appendField(Blockly.blynk_SERVER_ADD).setCheck(String);
    this.appendValueInput("wifi_ssid").appendField(Blockly.blynk_WIFI_SSID).setCheck(String);
    this.appendValueInput("wifi_pass").appendField(Blockly.blynk_WIFI_PASS).setCheck(String);
    this.appendValueInput("auth_key", String).appendField(Blockly.blynk_IOT_AUTH).setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl("https://gitee.com/hznupeter/Blynk_IOT/wikis/pages");
  }
};
