import * as Blockly from 'blockly/core';

const ETHERNET_HUE = 0;

//esp_now
export const esp_now_send = {
    init: function () {
        this.appendDummyInput()
            .appendField("ESP NOW" + Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND);
        this.appendValueInput("mac")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_MAC_ADDRESS);
        this.appendValueInput("data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendStatementInput("success")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND + Blockly.Msg.MIXLY_SUCCESS);
        this.appendStatementInput("failure")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND + Blockly.Msg.MIXLY_FAILED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
        this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
    }
};

//esp_now
export const esp_now_receive = {
    init: function () {
        this.appendDummyInput()
            .appendField("ESP NOW" + Blockly.Msg.MQTT_subscribe2 + Blockly.Msg.MIXLY_SD_DATA);
        this.appendStatementInput("receive_data")
            .setCheck(null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
        this.setHelpUrl("https://randomnerdtutorials.com/esp-now-esp32-arduino-ide/");
    }
};

export const esp32_wifi_connection_event = {
    init: function () {
        this.appendDummyInput()
            .appendField("WiFi连接事件")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ESP32_WIFI_CONNECTION_EVENT1, "1"], [Blockly.Msg.MIXLY_ESP32_WIFI_CONNECTION_EVENT2, "2"], [Blockly.Msg.MIXLY_ESP32_WIFI_CONNECTION_EVENT3, "3"]]), "type");
        this.appendStatementInput("event")
            .setCheck(null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};