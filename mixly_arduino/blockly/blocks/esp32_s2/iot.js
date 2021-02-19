'use strict';

goog.provide('Blockly.Blocks.iot');
goog.require('Blockly.Blocks');

Blockly.Blocks.iot.HUE = 225
//'#2FAD7A';

Blockly.Blocks['IOT_EMQX_INIT'] = {
   init: function() {
    this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
    this.appendDummyInput()
        .appendField("MQTT")
	    .appendField(Blockly.MIXLY_EMQX_INIT_CLIENT);
    this.appendValueInput('SERVER')
	    .appendField(Blockly.MIXLY_EMQX_SERVER)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('PORT')
	    .appendField(Blockly.MIXLY_EMQX_PORT)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('USERNAME')
	    .appendField(Blockly.MIXLY_EMQX_USERNAME)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('PASSWORD')
	    .appendField(Blockly.MIXLY_EMQX_PASSWORD)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('CLIENT_ID')
	    .appendField(Blockly.MIXLY_EMQX_CLIENT_ID)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('IS_SSL')
	    .appendField(Blockly.MIXLY_EMQX_IS_SSL)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('SOCKET_POOL')
	    .appendField(Blockly.MIXLY_EMQX_SOCKET_POOL)
	    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('SSL_CONTEXT')
	    .appendField(Blockly.MIXLY_EMQX_SSL_CONTEXT)
	    .setAlign(Blockly.ALIGN_RIGHT);
    //this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_CONNECT_TOOLTIP);
}
};

Blockly.Blocks['IOT_EMQX_PUBLISH'] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.MIXLY_EMQX_PUBLISH)
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('MSG')
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_MSG);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_PUBLISH_DICT_TOOLTIP);
    }
};

Blockly.Blocks['IOT_EMQX_PUBLISH_MORE'] = {
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
             .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('TOPIC')
             .appendField(Blockly.MIXLY_EMQX_PUBLISH)
             .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC)
             .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('MSG')
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_MSG)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('RETAIN')
            .setCheck(Boolean)
            .appendField(Blockly.MIXLY_RETAIN)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('QOS')
            .appendField(Blockly.MIXLY_EMQX_QOS)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
     //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_PUBLISH_DICT_TOOLTIP);
 }
 };

Blockly.Blocks["IOT_EMQX_SUBSCRIBE"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.MIXLY_EMQX_SUBSCRIBE)
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


Blockly.Blocks["IOT_EMQX_SUBSCRIBE_MORE"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.MIXLY_EMQX_SUBSCRIBE)
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('QOS')
            .appendField(Blockly.MIXLY_EMQX_QOS);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks["IOT_EMQX_UNSUBSCRIBE"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.MIXLY_EMQX_UNSUBSCRIBE)
            .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['IOT_EMQX_RECONNECT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_RECONNECT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
    }
};

Blockly.Blocks["IOT_EMQX_LOOP"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        //this.setOutput(true, Boolean);
        this.appendValueInput('TIMEOUT')
            .appendField(Blockly.MIXLY_EMQX_LOOP)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_LOOPONE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks["IOT_EMQX_IS_CONNECT"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        //DummyInput
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_IS_CONNECT);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

Blockly.Blocks["IOT_EMQX_ENABLE_LOGGER"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_NABLE_LOGGER);
        this.appendValueInput('LEVEL')
            .appendField(Blockly.MIXLY_EMQX_NABLE_LOGGERONE)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks["IOT_EMQX_DISABLE_LOGGER"] = {
    init: function () {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_DISABLE_LOGGER);

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['IOT_EMQX_DEINIT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_EMQX_DEINIT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
    }
};

Blockly.Blocks['IOT_EMQX_ADD_TOPIC_CALLBACK'] = {
    init: function() {
     this.setColour(Blockly.Blocks.iot.HUE);
     // this.appendValueInput('VAR')
     //     .setCheck("var")
     this.appendDummyInput()
         .appendField("MQTT")
     this.appendValueInput('TOPIC')
         .appendField(Blockly.MIXLY_EMQX_FOR)
         .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
     this.appendValueInput('METHOD')
         .appendField(Blockly.MIXLY_EMQX_SET_METHOD);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_PUBLISH_DICT_TOOLTIP);
 }
 };

 Blockly.Blocks['IOT_EMQX_REMOVE_TOPIC_CALLBACK'] = {
    init: function() {
     this.setColour(Blockly.Blocks.iot.HUE);
     // this.appendValueInput('VAR')
     //     .setCheck("var")
     this.appendDummyInput()
         .appendField("MQTT")
     this.appendValueInput('TOPIC')
         .appendField(Blockly.MIXLY_EMQX_FOR)
         .appendField(Blockly.MIXLY_EMQX_PUBLISH_TOPIC);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_EMQX_REMOVE_METHOD);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_PUBLISH_DICT_TOOLTIP);
 }
 };

 Blockly.Blocks['IOT_EMQX_USERNAME_PW_SET'] = {
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendValueInput('USERNAME')
        .appendField(Blockly.MIXLY_EMQX_SET_USERNAME);
        this.appendValueInput('PASSWORD')
        .appendField(Blockly.MIXLY_EMQX_SET_PASSWORD);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
 }
};

Blockly.Blocks['IOT_EMQX_CONNECT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_CONNECT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
    }
};

Blockly.Blocks['IOT_EMQX_DISCONNECT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_DISCONNECT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        //this.setTooltip(Blockly.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
    }
};

Blockly.Blocks['IOT_EMQX_PING']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        // this.appendValueInput('VAR')
        //     .setCheck("var")
        this.appendDummyInput()
            .appendField("MQTT")     
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_EMQX_PING);   
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

Blockly.Blocks['CREATE_DEFAULT_CONTEXT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SSL_DEFAULT);     
        this.setInputsInline(true);
        this.setOutput(true, Boolean);
    }
};

Blockly.Blocks['WIFI_RADIO_CONNECT']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        this.appendValueInput('USERNAME')
            .appendField(Blockly.MIXLY_WIFI_CONNECT)   
            .appendField(Blockly.MIXLY_WIFI_USERNAME);
        this.appendValueInput('PASSWORD')
            .appendField(Blockly.MIXLY_WIFI_PASSWORD);  
        this.setInputsInline(true);
        this.setPreviousStatement(true);   
        this.setNextStatement(true);
    }
};

Blockly.Blocks['CREATE_SOCKETPOOL']={
    init: function() {
        this.setColour(Blockly.Blocks.iot.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_CREATE_SOCKETPOOL);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};