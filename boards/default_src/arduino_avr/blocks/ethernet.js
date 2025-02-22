import * as Blockly from 'blockly/core';

const ETHERNET_HUE = 0;

export const ethernet_init_begin = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_BEGIN)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_ETHERNET, 'Ethernet'], [Blockly.Msg.MIXLY_ETHERNET2, 'Ethernet2']]), "Ethernet");
        this.appendValueInput('MAC')
            .setCheck(Array)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_MAC_ADDRESS);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_INIT);
    }
};

export const ethernet_mac_address = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('DE'), 'VAR1')
            .appendField('-')
            .appendField(new Blockly.FieldTextInput('AD'), 'VAR2')
            .appendField('-')
            .appendField(new Blockly.FieldTextInput('BE'), 'VAR3')
            .appendField('-')
            .appendField(new Blockly.FieldTextInput('EF'), 'VAR4')
            .appendField('-')
            .appendField(new Blockly.FieldTextInput('FE'), 'VAR5')
            .appendField('-')
            .appendField(new Blockly.FieldTextInput('ED'), 'VAR6');
        this.setOutput(true, Array);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_MACADDRESS);
    }
}

export const ethernet_init_local_ip = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_LOCALIP);
        this.setOutput(true, 'IPAddress');
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_LOCALIP);
    }
};

export const ethernet_client_connect_server = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_CONNECT_SERVER)
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput('mixly.org'), 'SERVER')
            .appendField(this.newQuote_(false));
        this.appendValueInput('PORT')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PORT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CONNECT);
    },
    newQuote_: function (open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }
}

export const ethernet_client_stop = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_STOP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_STOP);
    }
};

export const ethernet_client_connected = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_CONNECTED);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CONNECTED);
    }
};

export const ethernet_client_available = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_AVAILABLE);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CLIENT_AVAILABLE);
    }
};

export const ethernet_client_print = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendValueInput('TEXT')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CLIENT_PRINT);
    }
};

export const ethernet_client_println = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendValueInput('TEXT')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PRINTLN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CLIENT_PRINTLN);
    }
};

export const ethernet_client_read = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_READ);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_CLIENT_READ);
    }
};

export const ethernet_client_get_request = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_GET_REQUEST);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_URL)
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'URL')
            .appendField(this.newQuote_(false));
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_SERVER)
            .appendField(this.newQuote_(true))
            .appendField(new Blockly.FieldTextInput(''), 'SERVER')
            .appendField(this.newQuote_(false));
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_ETHERNET_GET_REQUEST);
    },
    newQuote_: function (open) {
        if (open == this.RTL) {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
        } else {
            var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
        }
        return new Blockly.FieldImage(file, 12, 12, '"');
    }
}


export const NTP_server = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.NTP_SERVER);
        this.appendValueInput("server_add")
            .appendField(Blockly.Msg.blynk_SERVER_ADD)
            .setCheck(String);
        this.appendValueInput("timeZone")
            .appendField(Blockly.Msg.MIXLY_TimeZone)
            .setCheck(Number);
        this.appendValueInput("Interval")
            .appendField(Blockly.Msg.blynk_WidgetRTC_setSyncInterval)
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};
//传感器-实时时钟块_时间变量
var NTP_TIME_TYPE = [
    [Blockly.Msg.MIXLY_YEAR, "NTP.getDateYear()"],
    [Blockly.Msg.MIXLY_MONTH, "NTP.getDateMonth()"],
    [Blockly.Msg.MIXLY_DAY, "NTP.getDateDay()"],
    [Blockly.Msg.MIXLY_HOUR, "NTP.getTimeHour24()"],
    [Blockly.Msg.MIXLY_MINUTE, "NTP.getTimeMinute()"],
    [Blockly.Msg.MIXLY_SECOND, "NTP.getTimeSecond()"],
    [Blockly.Msg.MIXLY_WEEK, "NTP.getDateWeekday()"]
];
//传感器-实时时钟块_获取时间
export const NTP_server_get_time = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.NTP_server_get_time);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(NTP_TIME_TYPE), "TIME_TYPE");
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};

export const MQTT_server = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldImage(require('../media/blynk/iot.png'), 20, 20))
            .appendField(Blockly.Msg.MQTT_SERVER);
        this.appendValueInput("server_add")
            .appendField(Blockly.Msg.MQTT_SERVER_ADD)
            .setCheck(String);
        this.appendValueInput("server_port")
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PORT)
            .setCheck(Number);
        this.appendValueInput("IOT_ID")
            .appendField(Blockly.Msg.MIXLY_EMQX_USERNAME)
            .setCheck(String);
        this.appendValueInput("IOT_PWD", String)
            .appendField(Blockly.Msg.HTML_PASSWORD)
            .setCheck([String, Number]);
        this.appendValueInput("Client_ID")
            .appendField(Blockly.Msg.MQTT_Client_ID)
            .setCheck(String);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip();
        this.setHelpUrl();
    }
};

//WIFI信息
export const WIFI_info = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldImage(require('../media/blynk/iot.png'), 20, 20))
            .appendField(Blockly.Msg.MIXLY_NETWORK_INIT);
        this.appendValueInput("SSID")
            .appendField(Blockly.Msg.HTML_NAME);
        this.appendValueInput("PWD")
            .appendField(Blockly.Msg.HTML_PASSWORD);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(" ");
        this.setHelpUrl();
    }
};

export const network_connect = {
    init: function () {
        this.setColour(ETHERNET_HUE);
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
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_NETWORK_WIFI_CONNECT);
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_WIFI_CONNECT_TOOLTIP);
    }
};

export const network_get_connect = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DEVICE)
            .appendField(new Blockly.FieldDropdown([["MAC", "MAC"], ["IP", "IP"]]), "mode")
            .appendField(Blockly.Msg.MQTT_SERVER_ADD);
        this.setOutput(true);
        this.setInputsInline(true);
    }
};

export const MQTT_connect = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MQTT_connect);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip();
    }
};
var Topic_validator = function (newValue) {
    return newValue.replace(/\//g, '');
};

//MQTT-发送消息到topic
export const MQTT_publish = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldImage(require('../media/blynk/iot.png'), 20, 20))
            .appendField(Blockly.Msg.MQTT_publish);
        this.appendValueInput("data");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.LANG_MATH_RANDOM_INT_INPUT_TO);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MQTT_Topic)
            .appendField(new Blockly.FieldTextInput('Topic', Topic_validator), "Topic");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(" ");
        this.setHelpUrl();
    }
};

export const MQTT_subscribe_value = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MQTT_Topic)
            .appendField(new Blockly.FieldTextInput('Topic_0', Topic_validator), "Topic_0");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.HTML_VALUE)
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};
export const MQTT_add_subscribe_topic = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MQTT_Topic);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};

export const MQTT_subscribe = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT)
            .appendField(Blockly.Msg.MQTT_Topic + Blockly.Msg.MQTT_subscribe2)
            .appendField(new Blockly.FieldTextInput('Topic_0', Topic_validator), "Topic_0");
        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setMutator(new Blockly.icons.MutatorIcon(['MQTT_add_subscribe_topic'], this));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            if (!thisBlock.elseifCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (thisBlock.elseifCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            }
        });
        this.elseifCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        var containerBlock = this;
        var statementConnections = [];
        for (var i = this.elseifCount_; i > 0; i--) {
            this.removeInput('DummyInput' + i);
            if (containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
                statementConnections[i] = (containerBlock.getInputTargetBlock('DO' + i).previousConnection);
            else
                statementConnections[i] = null;
            this.removeInput('DO' + i);
        }
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
        //this.compose(containerBlock);
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendDummyInput('DummyInput' + i)
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT)
                .appendField(Blockly.Msg.MQTT_Topic + Blockly.Msg.MQTT_subscribe2)
                .appendField(new Blockly.FieldTextInput('Topic_' + i, Topic_validator), "Topic_" + i);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        for (var i = statementConnections.length - 2; i > 0; i--) {
            if (statementConnections[i])
                statementConnections[i] && statementConnections[i].reconnect(this, 'DO' + i);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('mqtt_topics_set');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('MQTT_add_subscribe_topic');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var i = this.elseifCount_; i > 0; i--) {
            this.removeInput('DummyInput' + i);
            this.removeInput('DO' + i);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var statementConnections = [null];
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'MQTT_add_subscribe_topic':
                    this.elseifCount_++;
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                default:
                    throw Error('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }

        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(statementConnections);

    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'MQTT_add_subscribe_topic':
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var statementConnections = [null];

        var i = 1;
        while (this.getInput('DummyInput' + i)) {
            var inputDo = this.getInput('DO' + i);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(statementConnections);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        var i = 1;
        while (this.getInput('DummyInput' + i)) {
            this.removeInput('DummyInput' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendDummyInput("DummyInput" + i)
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT)
                .appendField(Blockly.Msg.MQTT_Topic + Blockly.Msg.MQTT_subscribe2)
                .appendField(new Blockly.FieldTextInput('Topic_' + i, Topic_validator), "Topic_" + i);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (statementConnections) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            //valueConnections[i] && valueConnections[i].reconnect(this, 'IF' + i);
            statementConnections[i] && statementConnections[i].reconnect(this, 'DO' + i);
        }
    }
};

export const mqtt_topics_set = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_EMQX_SUBSCRIBE + Blockly.Msg.MQTT_Topic);
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

//GET请求
export const http_get = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_GET_REQUEST);
        this.appendValueInput("api")
            .setCheck(null)
            .appendField(Blockly.Msg.blynk_SERVER_ADD);
        this.appendStatementInput("success")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SUCCESS);
        this.appendStatementInput("failure")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_FAILED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
    }
};

//自动配网
export const WIFI_smartConfig = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blynk_smartconfig)
            .appendField(new Blockly.FieldDropdown([["SmartConfig", 'SmartConfig'], ["AP", 'AP']]), "MODE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);//可上下连接
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MQTT_TEST_TOOLTIP);
    }
};

export const WIFI_ap_or_sta = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/blynk/wifi_udp.png'), 25, 25, "*"))
            .appendField(Blockly.Msg.MIXLY_SETUP + " UDP WIFI");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE + ":")
            .appendField(new Blockly.FieldDropdown([["STA", "STA"], ["AP", "AP"]]), "mode");
        this.appendValueInput("SSID")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_NAME);
        this.appendValueInput("PSK")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_PASSWORD);
        this.appendValueInput("IP1")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_LINK_DEVICE + " IP1");
        this.appendValueInput("IP2")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_LINK_DEVICE + " IP2");
        this.appendValueInput("IP")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ESP32_BLUETOOTH_FLAG + " IP");
        this.appendValueInput("duankou")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PORT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setHelpUrl("");
    }
};

export const WIFI_ap_and_sta = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/blynk/wifi_udp.png'), 25, 25, "*"))
            .appendField(Blockly.Msg.MIXLY_SETUP + " UDP WIFI");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_MODE + ": AP+STA");
        this.appendValueInput("SSID1")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_NAME + "(STA)");
        this.appendValueInput("SSID2")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_NAME + "(AP)");
        this.appendValueInput("PSK1")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_PASSWORD + "(STA)");
        this.appendValueInput("PSK2")
            .setCheck(null)
            .appendField("WIFI " + Blockly.Msg.HTML_PASSWORD + "(AP)");
        this.appendValueInput("IP1")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_LINK_DEVICE + " IP1");
        this.appendValueInput("IP2")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_LINK_DEVICE + " IP2");
        this.appendValueInput("IP")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ESP32_BLUETOOTH_FLAG + " IP");
        this.appendValueInput("duankou")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_PORT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setHelpUrl("");
    }
};

export const WIFI_incomingPacket = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/blynk/wifi_udp.png'), 25, 25, "*"))
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF + " WIFI UDP " + Blockly.Msg.MIXLY_STM32_SPI_DATA_RECEIVED + "？")
        this.appendValueInput("input_data")
            .setCheck(null)
            .appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS);
        this.appendDummyInput()
            .appendField("(" + Blockly.Msg.LANG_MATH_STRING + ")");
        this.appendStatementInput("do")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const WIFI_send_data = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/blynk/wifi_udp.png'), 25, 25, "*"))
            .appendField("WIFI UDP " + Blockly.Msg.MIXLY_SEND_DATA);
        this.appendValueInput("data")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//天气GET
export const WeatherGet = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.WeatherGet)
            .appendField(new Blockly.FieldTextInput('北京'), 'data')
            .appendField("1", "check");
        this.setOutput(true, Boolean);
        this.setTooltip("输入正确的城市名（不用带“市”字)如：深圳 北京 广州，如果错误会显示'error'刷新成功则返回true\n天气接口优化注意：\n1. 接口每 8 小时更新一次，机制是  CDN  缓存 8 小时更新一次。注意：自己做缓存。\n2. 接口采用城市 ID 来精准查询请求，省份不能直接查询天气。\n3.每分钟阈值为 300 次，如果超过会禁用一天。请谨慎使用。");
    }
};

//获取当天天气
export const WeatherGetToday = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.WeatherGetToday)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_Humidity, "0"],
                ['PM2.5', "1"],
                ['PM1.0', "2"],
                [Blockly.Msg.TodayQuality, "3"],
                [Blockly.Msg.MIXLY_TEMPERATURE, "4"]
            ]), "type");
        this.setOutput(true, Number);
        this.setTooltip("返回对应数据 字符串型。");
    }
};

//获取当天天气
export const WeatherGetForecast = {
    init: function () {
        this.setColour(ETHERNET_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.WeatherGetForecast)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_GPS_DATE, "ForecastDate"],
                [Blockly.Msg.ForecastHigh, "ForecastHigh"],
                [Blockly.Msg.ForecastLow, "ForecastLow"],
                [Blockly.Msg.ForecastYmd, "ForecastYmd"],
                [Blockly.Msg.MIXLY_WEEK, "ForecastWeek"],
                [Blockly.Msg.ForecastAqi, "ForecastAqi"],
                [Blockly.Msg.ForecastFx, "ForecastFx"],
                [Blockly.Msg.ForecastFl, "ForecastFl"],
                [Blockly.Msg.ForecastType, "ForecastType"]
            ]), "type");
        this.appendValueInput('date', Number)
            .appendField(Blockly.Msg.MIXLY_GPS_DATE + '(0~14)');
        this.setOutput(true, Number);
        this.setTooltip("返回预报天气内容0表示当天，最大为14，字符串型。");
        this.setInputsInline(true);
    }
};

export const mixio_mqtt_subscribe = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CREATE_MQTT_CLIENT_AND_CONNECT);
        this.appendValueInput("server")
            .setCheck(null)
            .appendField(Blockly.Msg.blynk_SERVER_ADD);
        this.appendValueInput("port")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_EMQX_PORT);
        this.appendValueInput("mqtt_username")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_USERNAME);
        this.appendValueInput("mqtt_password")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_WIFI_PASSWORD);
        this.appendValueInput("project")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_EMQX_PROJECT);
        //this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(170);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const mixio_mqtt_subscribe_key = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.USE_MIXLY_KEY)
            .appendField(new Blockly.FieldTextInput("1RFOH08C"), "key")
            .appendField(Blockly.Msg.CONNECT_TO_MIXIO)
            .appendField(Blockly.Msg.blynk_SERVER_ADD)
            .appendField(new Blockly.FieldTextInput("mixio.mixly.cn"), "server");
        this.setNextStatement(true, null);
        this.setColour(170);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const mixio_mqtt_publish = {
    init: function () {
        this.appendValueInput("data")
            .setCheck(null)
            .appendField(Blockly.Msg.MQTT_SEND_MESSAGE);
        this.appendValueInput("topic")
            .setCheck(null)
            .appendField(Blockly.Msg.TO_TOPIC);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["MixIO", "1"], ["Mixly Key", "2"]]), "mode");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(170);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const mixio_mqtt_received_the_news = {
    init: function () {
        this.appendValueInput("topic")
            .setCheck(null)
            .appendField(Blockly.Msg.WHEN_THE_SUBJECT_IS_RECEIVED);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_MSG)
            .appendField(new Blockly.FieldDropdown([["MixIO", "1"], ["Mixly Key", "2"]]), "mode");
        this.appendStatementInput("function")
            .setCheck(null);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setColour(170);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//OTA
export const asyncelegantota = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage(require('../media/blocks_icons/loop.png'), 15, 15, { alt: "*", flipRtl: "FALSE" }))
            .appendField("ElegantOTA");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("http://ip/update");
        this.setHelpUrl("");
    }
};