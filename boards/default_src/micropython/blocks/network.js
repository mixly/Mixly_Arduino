import * as Blockly from 'blockly/core';

const NETWORK_HUE = 225;

export const network_init = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_INIT)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_NETWORK_MODE)
            .appendField(new Blockly.FieldDropdown([
                ['STA', "STA"],
                ['AP', "AP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_INIT_TOOLTIP);
    }
};


export const network_open = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_NETWORK_WIFI_OPEN, "True"],
                [Blockly.Msg.MIXLY_NETWORK_WIFI_CLOSE, "False"]
            ]), "op");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_FLAG)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('op');
            var mode0 = Blockly.Msg.MIXLY_ESP32_NETWORK_OPEN_TOOLTIP;
            var TOOLTIPS = {
                'True': Blockly.Msg.MIXLY_NETWORK_WIFI_OPEN,
                'False': Blockly.Msg.MIXLY_NETWORK_WIFI_CLOSE,
            };
            return TOOLTIPS[mode] + mode0
        });
    }
};

export const network_is_active = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_IS_ACTIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_NETWORK_WIFI_IS_ACTIVE);
    }
};

export const network_scan = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_SCAN)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(function () {
            var mode = 'all';
            var mode0 = Blockly.Msg.MIXLY_ESP32_NETWORK_SCAN_TOOLTIP
            var TOOLTIPS = {
                '0': "ssid",
                '1': 'bssid',
                '2': "channel",
                '3': "RSSI",
                '4': "authmode",
                '5': "hidden",
                'all': Blockly.Msg.MIXLY_NETWORK_WIFI_SCAN_ATTRIBUTE,
            };
            return mode0 + TOOLTIPS[mode]
        });
    }
};

export const network_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_CONNECT);
        this.appendValueInput('id')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);
        this.appendValueInput('password')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_PASSWORD);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_CONNECT_TOOLTIP);
    }
};

export const network_wifi_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_CONNECT + Blockly.Msg.MIXLY_SYMBOL_QUESTION);
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_WIFI_CONNECT_TOOLTIP);
    }
};

export const network_get_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_GET_WIFI);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_ESP32_NETWORK_IP, "0"],
                [Blockly.Msg.MIXLY_ESP32_NETWORK_MASK, "1"],
                [Blockly.Msg.MIXLY_ESP32_NETWORK_GATEWAY, "2"],
                ["DNS", "3"]
            ]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('mode');
            var mode0 = Blockly.Msg.MIXLY_ESP32_NETWORK_GET_WIFI_TOOLTIP
            var TOOLTIPS = {
                '0': Blockly.Msg.MIXLY_ESP32_NETWORK_IP,
                '1': Blockly.Msg.MIXLY_ESP32_NETWORK_MASK,
                '2': Blockly.Msg.MIXLY_ESP32_NETWORK_GATEWAY,
                '3': "DNS",
            };
            return mode0 + TOOLTIPS[mode]
        });
    }
};

export const network_stop = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_STOP_CONNECT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_STOP_TOOLTIP);
    }
};

export const network_get_wifi = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_GET_WIFI);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_NETWORK_WIFI_ESSID, "essid"],
                [Blockly.Msg.MIXLY_NETWORK_WIFI_CHANNEL, "channel"]
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_GET_WIFI_TOOLTIP);
    }
};

export const network_ap_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET);
        this.appendValueInput('essid')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_ESSID);
        this.appendValueInput('channel')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_CHANNEL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_AP_CONNECT_TOOLTIP);
    }
};

export const network_server = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_SERVER1);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_ESP32_NETWORK_SERVER2);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_CLOSE_TOOLTIP);
    }
};

export const network_socket_init = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_INIT)
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_TYPE)
            .appendField(new Blockly.FieldDropdown([
                ['TCP', "TCP"],
                ['UDP', "UDP"]
            ]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('mode');
            var mode0 = Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_INIT_TOOLTIP
            var TOOLTIPS = {
                'TCP': 'TCP',
                'UDP': 'UDP',
            };
            return mode0 + TOOLTIPS[mode]
        });
    }
};

export const network_socket_bind = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_LET_SOCKET)
        this.appendValueInput('address')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_BIND_TO_ADDRESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_BIND_TOOLTIP);
    }
};

export const network_socket_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_LET_SOCKET)
        this.appendValueInput('address')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_CONNECT_TO_ADDRESS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_CONNECT_TOOLTIP);
    }
};

export const network_socket_listen = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendValueInput('queue')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_LISTEN)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_QUEUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_LISTEN_TOOLTIP);
    }
};

export const network_socket_accept = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_ACCEPT);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_ACCEPT_TOOLTIP);
    }
};

export const network_socket_receive = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_TOOLTIP);
    }
};

export const network_socket_send = {
    init: function () {
        this.setColour(NETWORK_HUE);
        // .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("TCP")
        this.appendValueInput('content')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_SEND_TOOLTIP);
    }
};

export const network_socket_receive_from = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('size')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_RECEIVE)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_RECEIVE_FROM_TOOLTIP);
    }
};

export const network_socket_send_to = {
    init: function () {
        this.setColour(NETWORK_HUE);
        // .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_MAKE)
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("UDP")
        this.appendValueInput('content')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_SEND)
        this.appendValueInput('address')
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_TO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_SEND_TO_TOOLTIP);
    }
};

export const network_socket_close = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_CLOSE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_CLOSE_TOOLTIP);
    }
};


export const requests_get = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput("DOMAIN")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")

            .appendField(Blockly.Msg.blockpy_REQUESTS_GET)
            .appendField(new Blockly.FieldTextInput('response'), 'VAR')

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.blockpy_REQUESTS_GET_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }

}


export const requests_attribute = {
    init: function () {
        this.appendValueInput('VAL')

        var attr =
            [[Blockly.Msg.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'], [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_TEXT, 'text']
                , [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_COOKIES, 'cookies'], [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content']];
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown(attr), 'ATTR')


        this.setInputsInline(true);
        this.setOutput(true, String);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'clear': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_CLEAR,
                'reset': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_RESET,
                'home': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_HOME
            };
            return TOOLTIPS[mode];
        });
    }
};



export const requests_method = {
    init: function () {
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        var method = [
            ['post', 'post'], ['put', 'put'],
            ['delete', 'delete'], ['head', 'head'],
            ['option', 'option']
        ];
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown(method), 'DIR')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_REQUESTS)


        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'forward': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_FORWARD,
                'backward': Blockly.Msg.MIXLY_TOOLTIP_TURTEL_BACKWARD
            };
            return TOOLTIPS[mode];
        });
    }
};

export const ntptime_time = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET_NTP + '(NTP)')
        this.appendValueInput("data")
            .appendField(Blockly.Msg.blynk_SERVER_ADD)
        this.setOutput(true, 'Tuple');
        this.setInputsInline(true);
    }
};

export const ntptime_address = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ['ntp.aliyun.com', "ntp.aliyun.com"],
                ['ntp1.aliyun.com', "ntp1.aliyun.com"],
                ['ntp2.aliyun.com', "ntp2.aliyun.com"],
                ['ntp3.aliyun.com', "ntp3.aliyun.com"],
                ['ntp4.aliyun.com', "ntp4.aliyun.com"],
                ['ntp5.aliyun.com', "ntp5.aliyun.com"],
                ['ntp6.aliyun.com', "ntp6.aliyun.com"],
                ['ntp7.aliyun.com', "ntp7.aliyun.com"],
                ['time1.cloud.tencent.com', "time1.cloud.tencent.com"],
                ['time2.cloud.tencent.com', "time2.cloud.tencent.com"],
                ['time3.cloud.tencent.com', "time3.cloud.tencent.com"],
                ['time4.cloud.tencent.com', "time4.cloud.tencent.com"],
                ['time5.cloud.tencent.com', "time5.cloud.tencent.com"]
            ]), 'op')
        this.setOutput(true);
    }
};

const COMMUNICATE_HUE = '#3288dd';

export const requests_get2 = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("URL")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown([["get", "get"], ["head", "head"], ["delete", "delete"]]), 'TYPE')
            .appendField(Blockly.Msg.blockpy_REQUESTS)
            .appendField(Blockly.Msg.MIXPY_REQUESTS_GET_RESULT)
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
    },
};

export const requests_post = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput("URL")
            .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
            .setCheck(String);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.blockpy_CONDUCT)
            .appendField(new Blockly.FieldDropdown([["post", "post"], ["put", "put"], ["patch", "patch"]]), 'TYPE')
            .appendField(Blockly.Msg.blockpy_REQUESTS)
        this.appendValueInput("data")
            .appendField(Blockly.Msg.blockpy_REQUESTS + Blockly.Msg.OLED_STRING)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXPY_REQUESTS_GET_RESULT)
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip("");
    },
};

export const requests_attribute2 = {
    init: function () {
        this.appendValueInput('VAL')

        var attr = [
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_TEXT, 'text'],
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_JSON, 'json()'],
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'],
            [Blockly.Msg.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content'],
            [Blockly.Msg.MIXPY_TEXT_ENCODE, 'encoding']
        ];
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_GET)
            .appendField(new Blockly.FieldDropdown(attr), 'ATTR')
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};

//educore_networke
export const educore_wifi_connect = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_IOT_CONNECT_WIFI);
        this.appendValueInput('WIFINAME')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);
        this.appendValueInput('PASSWORD')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_PASSWORD);
        this.appendValueInput('TIMEOUT')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_IR_TIMEOUT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MILLIS)
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_WIFI_CONNECT_TOOLTIP);
    }
};



export const educore_mqtt_connect = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_IOT_EMQX_CONNECT_TOOLTIP);
        this.appendValueInput('SERVER')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_EMQX_SERVER)
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendValueInput('PORT')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_EMQX_PORT)
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendValueInput('CLIENT_ID')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_EMQX_CLIENT_ID)
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendValueInput('USERNAME')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_WIFI_USERNAME)
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendValueInput('PASSWORD')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_IOT_PASSWORD)
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const educore_mqtt_subscribe_message = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MIXLY_EMQX_SUBSCRIBE + Blockly.Msg.MIXLY_MICROBIT_MSG)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('MESSAGE')
            .appendField(Blockly.Msg.blockpy_set_of);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const educore_mqtt_topic_subscribe = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField("mqtt")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MIXLY_EMQX_SUBSCRIBE + Blockly.Msg.MIXLY_MICROBIT_MSG)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('METHOD')
            .appendField(Blockly.Msg.MIXLY_EMQX_SET_METHOD);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const educore_mqtt_topic_publish = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField("mqtt")
        this.appendValueInput('TOPIC')
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_NEW)
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH_TOPIC);
        this.appendValueInput('MSG')
            .appendField(Blockly.Msg.HTML_BODY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const educore_mqtt_connect_success = {
    init: function () {
        this.setColour(COMMUNICATE_HUE);
        this.appendDummyInput()
            .appendField("mqtt"+Blockly.Msg.MIXLY_EMQX_IS_CONNECT)
        this.setInputsInline(true);
        this.setOutput(true);
    }
};