import * as Blockly from 'blockly/core';

export const inout_input = {
    init: function () {
        this.setColour(20);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.blockpy_inout_raw_input)
            .setCheck(String);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
    }
};

export const inout_print = {
    init: function () {
        this.setColour(20);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.BLOCKPY_PRINT_TOOLTIP);
    }
};

export const inout_print_inline = {
    init: function () {
        this.setColour(20);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

export const inout_print_end = {
    init: function () {
        this.setColour(20);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT);
        this.appendValueInput("END")
            .appendField(Blockly.Msg.MIXLY_ENDSWITH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_INOUT_PRINT_END_TOOLTIP);
    }
};

export const inout_type_input = {
    init: function () {

        var input_type =
            [[Blockly.Msg.LANG_MATH_STRING, 'str'], [Blockly.Msg.LANG_MATH_INT, 'int']
                , [Blockly.Msg.LANG_MATH_FLOAT, 'float']];
        this.setColour(20);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown(input_type), 'DIR')
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE)
            .setCheck(String);

        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'str': Blockly.Msg.MIXLY_MIXPY_INOUT_STR_INPUT_TOOLTIP,
                'int': Blockly.Msg.MIXLY_MIXPY_INOUT_INT_INPUT_TOOLTIP,
                'float': Blockly.Msg.MIXLY_MIXPY_INOUT_FLOAT_INPUT_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

export const pyinout_type_input = {
    init: function () {

        var input_type =
            [[Blockly.Msg.LANG_MATH_STRING, 'str'], [Blockly.Msg.LANG_MATH_INT, 'int']
                , [Blockly.Msg.LANG_MATH_FLOAT, 'float']];
        this.setColour(20);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown(input_type), 'DIR')
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE)
            .setCheck(String);

        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('DIR');
            var TOOLTIPS = {
                'str': Blockly.Msg.MIXLY_MIXPY_INOUT_STR_INPUT_TOOLTIP,
                'int': Blockly.Msg.MIXLY_MIXPY_INOUT_INT_INPUT_TOOLTIP,
                'float': Blockly.Msg.MIXLY_MIXPY_INOUT_FLOAT_INPUT_TOOLTIP
            };
            return TOOLTIPS[mode];
        });
    }
};

export const inout_print_many = {

    init: function () {
        this.setColour(20);

        this.itemCount_ = 2;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['inout_print_item'], this));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_MANY_TOOLTIP);
    },

    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },

    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },

    decompose: function (workspace) {
        var containerBlock =
            workspace.newBlock('inout_print_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('inout_print_item');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },

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
                this.getInput('ADD' + i)
                    .connection.connect(connections[i]);
            }
        }
    },

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

    updateShape_: function () {
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
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_EMPTY);
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
                }
            }
        }
    }
};
export const inout_print_container = {
    init: function () {
        this.setColour(20);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_MANY_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

export const inout_print_item = {
    init: function () {
        this.setColour(20);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_MANY_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};