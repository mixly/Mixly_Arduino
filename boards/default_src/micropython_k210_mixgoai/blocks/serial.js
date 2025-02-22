import * as Blockly from 'blockly/core';

const SERIAL_HUE = 65; //'#58a8de'//65;

export const serial_print = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT);
        //this.setFieldValue('1','mode')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

export const serial_println = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT", String)
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        //this.setFieldValue('1','mode')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP + Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};
//打印16进制数
export const serial_print_hex = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.appendValueInput("CONTENT", Number)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MATH_BIN, "bin"], [Blockly.Msg.MATH_OCT, "oct"], [Blockly.Msg.MATH_DEC, "int"], [Blockly.Msg.MATH_HEX, "hex"]]), "STAT")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setFieldValue('hex', 'STAT')
        this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
    }
};

export const serial_receive_data_event = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput('char_marker')
            .setCheck(String)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_SERIAL_WHEN_CONTAIN_DATA)
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
    }
};

export const serial_readstr = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_SERIAL_READSTR);
        //this.setFieldValue('1','mode')
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
    }
};

export const serial_any = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_SERIAL_AVAILABLE);
        //this.setFieldValue('1','mode')
        this.setOutput(true, Boolean);
        this.setTooltip(Blockly.Msg.MIXLY_SERIAL_AVAILABLE1);
    }
};

export const serial_readline = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_ESP32_READ_LINE);
        //this.setFieldValue('1','mode')
        this.setOutput(true, String);
        this.setTooltip(Blockly.Msg.MIXLY_MICROBIT_JS_SERIAL_READ_LINE1);
    }
};

export const serial_readstr_until = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial " + Blockly.Msg.MIXLY_SERIAL_READSTR_UNTIL)
            .appendField(new Blockly.FieldDropdown([
                ["new line", "serial.delimiters(Delimiters.NewLine)"],
                [",", "serial.delimiters(Delimiters.Comma)"],
                ["$", "serial.delimiters(Delimiters.Dollar)"],
                [":", "serial.delimiters(Delimiters.Colon)"],
                [".", "serial.delimiters(Delimiters.Fullstop)"],
                ["#", "serial.delimiters(Delimiters.Hash)"]
            ]), "char_marker");

        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};


export const serial_softserial1 = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("RX", Number)
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField("RX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX", Number)
            .appendField("TX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_BEGIN)
            .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['37400', '38400'], ['31250', '31250'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600'], ['4800', '4800'], ['2400', '2400'], ['1200', '1200'], ['300', '300']]), 'baudrate');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_SERIAL_softserial);
    }
};


export const system_input = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.blockpy_inout_raw_input)
            .setCheck(String);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
    }
}

export const system_print = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.BLOCKPY_PRINT_TOOLTIP);
    }
};

export const system_print_inline = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("VAR")
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
    }
};

export const system_print_end = {
    init: function () {
        this.setColour(SERIAL_HUE);
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

export const system_print_many = {

    init: function () {
        this.setColour(SERIAL_HUE);

        this.itemCount_ = 2;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setInputsInline(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['system_print_item'], this));
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
            workspace.newBlock('system_print_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('system_print_item');
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
export const system_print_container = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SERIAL_PRINTLN);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_MANY_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

export const system_print_item = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_INOUT_PRINT_MANY_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};

export const serial_send_to_mixgoce = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendValueInput("CONTENT")
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_EMQX_PUBLISH);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_TO + 'MixGo CE')
            .appendField(Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_TRUE, '1'], [Blockly.Msg.MIXLY_TURTLE_WRITE_MOVE_FALSE, '0']]), 'STAT')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};


export const serial_read_from_mixgoce = {
    init: function () {
        this.setColour(SERIAL_HUE);
        this.appendDummyInput()
            .appendField("Serial")
            .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2'], ['uart3', '3']]), 'mode')
            .appendField(Blockly.Msg.MIXLY_ESP32_READ + 'MixGo CE' + Blockly.Msg.MIXLY_SD_DATA);
        this.setOutput(true, Boolean);
    }
};