'use strict';

goog.provide('Blockly.Blocks.network');

goog.require('Blockly.Blocks');

Blockly.Blocks['network_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
             .setCheck("var");;
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_INIT)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_NETWORK_MODE)
            .appendField(new Blockly.FieldDropdown([
                ['STA', "STA"],
                ['AP', "AP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_INIT_TOOLTIP);
    }
};


Blockly.Blocks['network_open'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_NETWORK_WIFI_OPEN, "True"],
                [Blockly.MIXLY_NETWORK_WIFI_CLOSE, "False"]
            ]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_FLAG)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('op');
        var mode0 = Blockly.MIXLY_ESP32_NETWORK_OPEN_TOOLTIP;
        var TOOLTIPS = {
        'True':Blockly.MIXLY_NETWORK_WIFI_OPEN,
        'False':Blockly.MIXLY_NETWORK_WIFI_CLOSE,
      };
      return TOOLTIPS[mode]+mode0
    });
    }
};

Blockly.Blocks['network_scan'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_SCAN)
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
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('op');
        var mode0 = Blockly.MIXLY_ESP32_NETWORK_SCAN_TOOLTIP
        var TOOLTIPS = {
        '0':"ssid",
        '1': 'bssid',
        '2': "channel",
        '3':"RSSI",
        '4':"authmode",
        '5':"hidden",
        'all':Blockly.MIXLY_NETWORK_WIFI_SCAN_ATTRIBUTE,
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks['network_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
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
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_CONNECT_TOOLTIP);
    }
};

Blockly.Blocks['network_wifi_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_NETWORK_WIFI_CONNECT);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SYMBOL_QUESTION);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_WIFI_CONNECT_TOOLTIP);
    }
};

Blockly.Blocks['network_get_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
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
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('mode');
        var mode0 = Blockly.MIXLY_ESP32_NETWORK_GET_CONNECT_TOOLTIP
        var TOOLTIPS = {
        '0':Blockly.MIXLY_ESP32_NETWORK_IP,
        '1': Blockly.MIXLY_ESP32_NETWORK_MASK,
        '2': Blockly.MIXLY_ESP32_NETWORK_GATEWAY,
        '3':"DNS",
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks['network_stop'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_STOP_CONNECT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_STOP_TOOLTIP);
    }
};

Blockly.Blocks['network_get_wifi'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_WIFI);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_NETWORK_WIFI_ESSID, "essid"],
                [Blockly.MIXLY_NETWORK_WIFI_CHANNEL, "channel"]
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_GET_WIFI_TOOLTIP);
    }
};

Blockly.Blocks['network_ap_connect'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
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
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_AP_CONNECT_TOOLTIP);
    }
};

Blockly.Blocks['network_server'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_SERVER1);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_NETWORK_SERVER2);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SERVER_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_INIT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                ['TCP', "TCP"],
                ['UDP', "UDP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('mode');
        var mode0 = Blockly.MIXLY_ESP32_NETWORK_SOCKET_INIT_TOOLTIP
        var TOOLTIPS = {
        'TCP':'TCP',
        'UDP':'UDP',
      };
      return mode0 +TOOLTIPS[mode]
    });
    }
};

Blockly.Blocks['network_socket_bind'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_LET_SOCKET)
        this.appendValueInput('address')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_BIND_TO_ADDRESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_BIND_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_listen'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendValueInput('queue')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_LISTEN)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_QUEUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_LISTEN_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_accept'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_ACCEPT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_ACCEPT_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_receive'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_send'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
            // .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('content')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_SEND_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_receive_from'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_FROM_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_send_to'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
            // .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('content')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.appendValueInput('address')
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_TO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_SEND_TO_TOOLTIP);
    }
};

Blockly.Blocks['network_socket_close'] = {
    init: function() {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_CLOSE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_SOCKET_CLOSE_TOOLTIP);
    }
};