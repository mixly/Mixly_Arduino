import * as Blockly from 'blockly/core';

const FACTORY_HUE = "#777777"; //65;

export const factory_from_import = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField("from ")
            .appendField(new Blockly.FieldTextInput('microbit'), 'path')
            .appendField(" import ")
            .appendField(new Blockly.FieldTextInput('*'), 'module');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const factory_import = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField("import ")
            .appendField(new Blockly.FieldTextInput('module'), 'module');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const factory_function_noreturn = {
    init: function () {
        //console.log('init');
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('my_function'), 'NAME');
        this.itemCount_ = 1;
        this.arguments_ = ['x'];//add
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['factory_create_with_item'], this));
    },
    mutationToDom: function () {
        //console.log('mutationToDom');
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        //add
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        //console.log('domToMutation');
        this.arguments_ = [];//add
        //add
        for (var i = 0; xmlElement.childNodes[i]; i++) {
            let childNode = xmlElement.childNodes[i]
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
            }
        }
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    decompose: function (workspace) {
        //console.log('decompose');
        var containerBlock =
            workspace.newBlock('factory_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK')
            .connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('factory_create_with_item');
            itemBlock.initSvg();
            itemBlock.setFieldValue(this.arguments_[i], 'NAME');//add
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        //console.log('compose');
        this.arguments_ = [];//add
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
            this.arguments_.push(itemBlock.getFieldValue('NAME'));//add
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
                this.getInput('ADD' + i)
                    .connection.connect(connections[i]);
            }
        }
    },
    saveConnections: function (containerBlock) {
        //console.log('saveConnections');
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
    updateShape_: function () {
        //console.log('updateShape_');
        // Delete everything.
        if (this.getInput('EMPTY')) {
            this.removeInput('EMPTY');
        } else {
            var i = 0;
            while (this.getInput('ADD' + i)) {
                this.removeInput('ADD' + i);
                i++;
            }
        }
        // Rebuild block.
        for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i)
                .setAlign(Blockly.inputs.Align.RIGHT)
                .appendField(this.arguments_[i]);
        }
    }
};

export const factory_create_with_container = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PARAMS);
        this.appendStatementInput('STACK');
        this.contextMenu = false;
    }
};

export const factory_create_with_item = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE + ':')
            .appendField(new Blockly.FieldTextInput('x'), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    }
};

export const factory_function_return = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('my_function'), 'NAME');
        this.itemCount_ = 1;
        this.arguments_ = ['x'];//add
        this.updateShape_();
        this.setOutput(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['factory_create_with_item'], this));
    },
    mutationToDom: factory_function_noreturn.mutationToDom,
    domToMutation: factory_function_noreturn.domToMutation,
    decompose: factory_function_noreturn.decompose,
    compose: factory_function_noreturn.compose,
    saveConnections: factory_function_noreturn.saveConnections,
    updateShape_: factory_function_noreturn.updateShape_
};

export const factory_declare = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('test'), 'NAME')
            .appendField("=")
            .appendField(new Blockly.FieldTextInput('Test'), 'TYPE')
            .appendField("()");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}


export const factory_callMethod_noreturn = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('test'), 'NAME')
            .appendField('.')
            .appendField(new Blockly.FieldTextInput('callMethod'), 'METHOD');
        this.itemCount_ = 1;
        this.arguments_ = ['x'];//add
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['factory_create_with_item'], this));
    },
    mutationToDom: factory_function_noreturn.mutationToDom,
    domToMutation: factory_function_noreturn.domToMutation,
    decompose: factory_function_noreturn.decompose,
    compose: factory_function_noreturn.compose,
    saveConnections: factory_function_noreturn.saveConnections,
    updateShape_: factory_function_noreturn.updateShape_
};

export const factory_callMethod_return = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('test'), 'NAME')
            .appendField('.')
            .appendField(new Blockly.FieldTextInput('callMethod'), 'METHOD');
        this.itemCount_ = 1;
        this.arguments_ = ['x'];//add
        this.updateShape_();
        this.setOutput(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['factory_create_with_item'], this));
    },
    mutationToDom: factory_function_noreturn.mutationToDom,
    domToMutation: factory_function_noreturn.domToMutation,
    decompose: factory_function_noreturn.decompose,
    compose: factory_function_noreturn.compose,
    saveConnections: factory_function_noreturn.saveConnections,
    updateShape_: factory_function_noreturn.updateShape_
};

export const factory_block = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('display.scroll("Hello World!")'), 'VALUE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const factory_block_return = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('test'), 'VALUE');
        this.setOutput(true);
    }
};

export const factory_block_with_textarea = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldMultilineInput('display.scroll("Hello World!")\ndisplay.scroll("Hello Mixly!")'), 'VALUE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const factory_block_return_with_textarea = {
    init: function () {
        this.setColour(FACTORY_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldMultilineInput('Hello\nMixly'), 'VALUE');
        this.setOutput(true);
    }
};