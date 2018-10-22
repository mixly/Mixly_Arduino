'use strict';

goog.provide('Blockly.Blocks.network');

goog.require('Blockly.Blocks');

Blockly.Blocks['network_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_NETWORK_INIT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_NETWORK_MODE)
            .appendField(new Blockly.FieldDropdown([
                ['STA', "STA"],
                ['AP', "AP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};


Blockly.Blocks['network_open'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_NETWORK_WIFI_OPEN, "True"],
                [Blockly.MIXLY_NETWORK_WIFI_CLOSE, "False"]
            ]), "op");
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_FLAG)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_SCAN)
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_BELONG)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["ssid", "0"],
                ["bssid", "1"],
                ["channel", "2"],
                ["RSSI", "3"],
                ["authmode", "4"],
                ["hidden", "5"],
                [Blockly.MIXLY_NETWORK_WIFI_SCAN_ATTRIBUTE, "all"]
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_CONNECT);
        this.appendValueInput('id')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_NETWORK_ID);
        this.appendValueInput('password')
            .setCheck(String)
            .appendField(Blockly.MIXLY_ESP32_NETWORK_PASSWORD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_wifi_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_CONNECT);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SYMBOL_QUESTION);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_get_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_CONNECT);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_ESP32_NETWORK_IP, "0"],
                [Blockly.MIXLY_ESP32_NETWORK_MASK, "1"],
                [Blockly.MIXLY_ESP32_NETWORK_GATEWAY, "2"],
                ["DNS", "3"]
            ]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_stop'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_STOP_CONNECT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_get_wifi'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_WIFI);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_NETWORK_WIFI_ESSID, "essid"],
                [Blockly.MIXLY_NETWORK_WIFI_CHANNEL, "channel"]
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_ap_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET);
        this.appendValueInput('essid')
            .setCheck(String)
            .appendField(Blockly.MIXLY_NETWORK_WIFI_ESSID);
        this.appendValueInput('channel')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_NETWORK_WIFI_CHANNEL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['network_server'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_SERVER1);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_SERVER2);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};
