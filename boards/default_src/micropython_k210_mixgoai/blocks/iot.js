import * as Blockly from 'blockly/core';

const IOT_HUE = '#637AAC';

export const iot_wifi_connect = {
    init: function () {
        this.setColour(IOT_HUE);
        this.appendDummyInput()
            .appendField("OneNET 连接WiFi");
        this.appendValueInput('WIFINAME')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_NAME);
        this.appendValueInput('PASSWORD')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_PASSWORD);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_WIFI_CONNECT_TOOLTIP);
    }
};

export const iot_onenet_connect = {
    init: function () {
        this.setColour(IOT_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("OneNET" + Blockly.Msg.TUPLE_JOIN);
        this.appendValueInput('CLIENT')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_CLIENT);
        this.appendValueInput('SERVER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_SERVER);
        this.appendValueInput('USERNAME')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_USERNAME);
        this.appendValueInput('PASSWORD')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_PASSWORD);
        this.appendValueInput('TOPIC')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_TOPIC);
        this.appendValueInput('SUB')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_ESP32_ONENET_SUB);
        //this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_CONNECT_TOOLTIP);
    }
};

export const iot_onenet_disconnect = {
    init: function () {
        this.setColour(IOT_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("OneNET")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_DISCONNECT_ONENET);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_DISCONNECT_TOOLTIP);
    }
};

export const iot_onenet_check = {
    init: function () {
        this.setColour(IOT_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("OneNET")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_CHECK_ONENET);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_CHECK_TOOLTIP);
    }
};

export const iot_onenet_publish_dict = {
    init: function () {
        this.setColour(IOT_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("OneNET")
        this.appendValueInput('DICT')
            .appendField(Blockly.Msg.MIXLY_ESP32_PUBLISH_ONENET);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_PRINT_DATA)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'is_print');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_PUBLISH_DICT_TOOLTIP);
    }
};

export const iot_onenet_publish = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(IOT_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
            .appendField("OneNET")
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel(Blockly.Msg.MIXLY_ESP32_PUBLISH_ONENET), 'TIP')
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.itemCount_ = 2;
        this.updateShape_();
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['iot_publish_item'], this));
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_IOT_ONENET_PUBLISH_TOOLTIP);
    },
    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock =
            workspace.newBlock('iot_publish_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('iot_create_with_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            connections[i] = itemBlock.valueConnection_;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
            i++;
        }
        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ADD' + i).connection.connect(connections[i]);
            }
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ADD' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        }
        var keyNames = [];
        for (var i = 0; this.getInput('ADD' + i); i++) {
            //this.getInput('VALUE' + i).removeField("KEY"+i);
            keyNames.push(this.getFieldValue("KEY" + i))
            this.removeInput('ADD' + i);
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.getField('TIP')
                .setValue(Blockly.Msg.MIXLY_ESP32_PUBLISH_ONENET_EMPTY);
        } else {
            this.getField('TIP')
                .setValue(Blockly.Msg.MIXLY_ESP32_PUBLISH_ONENET);
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i)
                    .setCheck(null)
                    .setAlign(Blockly.inputs.Align.RIGHT)
                    .appendField(
                        new Blockly.FieldTextInput(
                            keyNames.length > i
                                ? keyNames[i]
                                : '"key' + (i + 1) + '"'),
                        'KEY' + i)
                    .appendField(":")
            }
        }
    }, getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

export const iot_publish_container = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(IOT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_TYPE_DICT);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};


export const iot_publish_item = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(IOT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

export const iot_create_with_item = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(IOT_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

export const iot_wificonnect = iot_wifi_connect;
export const iot_onenetconnect = iot_onenet_connect;
export const iot_onenetdisconnect = iot_onenet_disconnect;
export const iot_checkonenet = iot_onenet_check;
export const iot_publish = iot_onenet_publish;