import * as Blockly from 'blockly/core';

const HEAR_HUE = "#47B670";

export const asrloca_init = {
    init: function () {
        this.setColour(HEAR_HUE);
        this.appendValueInput('SUB')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("初始化");
        this.appendDummyInput("")
            .appendField("硅麦")
            .appendField(new Blockly.FieldDropdown([
                ["左声道", "0"],
                ["右声道", "1"]
            ]), "KEY");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("初始化语音识别，及需要麦克风输入通信设备");
    }
};


export const asrloca_config = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(HEAR_HUE);
        this.appendValueInput('SUB')
            .appendField("添加词条")
            .setCheck("var");
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel("拼音:阈值"), 'TIP')
            .setAlign(Blockly.inputs.Align.RIGHT)
        this.itemCount_ = 1;
        this.updateShape_();
        this.setInputsInline(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['iot_publish_item'], this));
        this.setTooltip("初始化语音识别，添加语音识别词条，需拼音中间-隔开，阈值");
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
                .setValue("拼音:阈值");
        } else {
            this.getField('TIP')
                .setValue("拼音:阈值");
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i)
                    .setCheck(Number)
                    .setAlign(Blockly.inputs.Align.RIGHT)
                    .appendField('“')
                    .appendField(new Blockly.FieldTextInput(keyNames.length > i ? keyNames[i] : 'ni-hao'), 'KEY' + i)
                    .appendField('”:')
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




export const asrloca_recognize = {
    init: function () {
        this.setColour(HEAR_HUE);
        this.appendValueInput('SUB')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("启动识别 返回结果");
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip("语音识别，获取识别结果");
    }
};

export const asrloca_del = {
    init: function () {
        this.setColour(HEAR_HUE);
        this.appendValueInput('SUB')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("注销识别 内存释放");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("语音识别，注销语音识别，释放内存");
    }
};

