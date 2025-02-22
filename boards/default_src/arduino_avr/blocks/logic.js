import * as Blockly from 'blockly/core';

const LOGIC_HUE = 210;

export const logic_compare = {
    /**
     * Block for comparison operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = Blockly.RTL ? [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['>', 'LT'],
            ['\u2265', 'LTE'],
            ['<', 'GT'],
            ['\u2264', 'GTE']
        ] : [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']
        ];
        //this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(LOGIC_HUE);
        this.setOutput(true, Boolean);
        this.appendValueInput('A');
        this.appendValueInput('B')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                'NEQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                'LTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                'GTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            };
            return TOOLTIPS[op];
        });
        this.prevBlocks_ = [null, null];
    }
};

export const logic_operation = {
    /**
     * Block for logical operations: 'and', 'or'.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
            [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']
        ];
        //this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
        this.setColour(LOGIC_HUE);
        this.setOutput(true, Boolean);
        this.appendValueInput('A')
            .setCheck([Boolean, Number]);
        this.appendValueInput('B')
            .setCheck([Boolean, Number])
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'AND': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                'OR': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            };
            return TOOLTIPS[op];
        });
    }
};

export const logic_negate = {
    /**
     * Block for negation.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);
        this.setColour(LOGIC_HUE);
        this.setOutput(true, Boolean);
        this.appendValueInput('BOOL')
            .setCheck([Number, Boolean])
            .appendField(Blockly.Msg.LOGIC_NEGATE_TITLE);
        //this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
        //                  ['BOOL', Boolean, Blockly.inputs.Align.RIGHT],
        //                Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
    }
};

export const logic_boolean = {
    /**
     * Block for boolean data type: true and false.
     * @this Blockly.Block
     */
    init: function () {
        var BOOLEANS = [
            [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
            [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']
        ];
        //this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
        this.setColour(LOGIC_HUE);
        this.setOutput(true, Boolean);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
        this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
    }
};

export const logic_null = {
    /**
     * Block for null data type.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);
        this.setColour(LOGIC_HUE);
        this.setOutput(true);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LOGIC_NULL);
        this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
    }
};


export const logic_true_or_false = {
    init: function () {
        this.setColour(LOGIC_HUE);
        this.appendValueInput('A');
        this.appendValueInput('B')
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);
        this.appendValueInput('C')
            .appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_LOGIT_TRUEORFALSE);
    }
};
