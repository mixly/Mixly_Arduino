import * as Blockly from 'blockly/core';

const MATH_HUE = 230; //'#e49f16';

Blockly.FieldTextInput.math_number_validator = function (text) {
    //return window.isNaN(text) ? null : String(text);
    // var pattern = /^-?(0X|0x|0O|0o|0B|0b)?[a-fA-F0-9]{1,}(\.[a-fA-F0-9]+)?$/;
    // return pattern.test(text) ? String(text) : null;//校验，二 八 十 十六进制匹配
    return String(text);//不再校验
};

Blockly.FieldTextInput.math_number_validator_include_blank = function (text) {
    if (text === "") {
        return "";
    }
    var pattern = /^-?(0X|0x|0O|0o|0B|0b)?[a-fA-F0-9]{1,}(\.[a-fA-F0-9]+)?$/;
    return pattern.test(text) ? String(text) : null;//校验，二 八 十 十六进制匹配
};

export const math_number = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(MATH_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('0',
                Blockly.FieldTextInput.math_number_validator), 'NUM');
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

export const math_constant = {
    init: function () {
        this.setColour(MATH_HUE);
        var constant =
            [['π', 'pi'], ['e', 'e']];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT)
            .appendField(new Blockly.FieldDropdown(constant), 'CONSTANT')

        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('CONSTANT');
            var TOOLTIPS = {
                'pi': Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT_PI_TOOLTIP,
                'e': Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT_E_TOOLTIP
            };
            return TOOLTIPS[mode];
        });

    }
};

export const math_constant_mp = {
    init: function () {
        this.setColour(MATH_HUE);
        var constant =
            [['π', 'pi'], ['e', 'e']];
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT)
            .appendField(new Blockly.FieldDropdown(constant), 'CONSTANT')

        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('CONSTANT');
            var TOOLTIPS = {
                'pi': Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT_PI_MP_TOOLTIP,
                'e': Blockly.Msg.MIXLY_PYTHON_MATH_CONSTANT_E_MP_TOOLTIP
            };
            return TOOLTIPS[mode];
        });

    }
};

export const math_arithmetic = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['×', 'MULTIPLY'],
            ['÷', 'DIVIDE'],
            ['%', 'QUYU'],
            ['//', 'ZHENGCHU'],
            ['**', 'POWER']
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
        this.setColour(MATH_HUE);
        this.setOutput(true);
        this.appendValueInput('A')
        this.appendValueInput('B')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                'QUYU': Blockly.Msg.MATH_MODULO_TOOLTIP,
                'ZHENGCHU': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            };
            return TOOLTIPS[mode];
        });
    }
};

export const math_selfcalcu = {
    /**
     * Block for basic arithmetic operator.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            ['+=', 'ADD'],
            ['-=', 'MINUS'],
            ['×=', 'MULTIPLY'],
            ['÷=', 'DIVIDE'],
            ['%=', 'QUYU'],
            ['//=', 'ZHENGCHU'],
            ['**=', 'POWER']
        ];

        this.setColour(MATH_HUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendValueInput('A')
        this.appendValueInput('B')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                'QUYU': Blockly.Msg.MATH_MODULO_TOOLTIP,
                'ZHENGCHU': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            };
            return TOOLTIPS[mode];
        });
    }
};

export const math_bit = {
    init: function () {
        var OPERATORS = [
            ['&', '&'],
            ['|', '|'],
            ['>>', '>>'],
            ['<<', '<<']
        ];
        this.setColour(MATH_HUE);
        this.setOutput(true, Number);
        this.appendValueInput('A')
            .setCheck(Number);
        this.appendValueInput('B')
            .setCheck(Number)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        this.setTooltip("位运算");
    }
};

export const math_trig = {
    /**
     * Block for trigonometry operators.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            ['sin', 'SIN'],
            ['cos', 'COS'],
            ['tan', 'TAN'],
            ['asin', 'ASIN'],
            ['acos', 'ACOS'],
            ['atan', 'ATAN'],
            ['-', '-'],
            ['ln', 'LN'],
            ['log10', 'LOG10'],
            ['e^', 'EXP'],
            ['10^', 'POW10']
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(MATH_HUE);
        this.setOutput(true, Number);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
                'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN,
                'LN': Blockly.Msg.MATH_SINGLE_TOOLTIP_LN
            };
            return TOOLTIPS[mode];
        });
    }
};

export const math_dec = {
    /**
     * Block for trigonometry operators.
     * @this Blockly.Block
     */
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MATH_BIN, 'bin'],
            [Blockly.Msg.MATH_OCT, 'oct'],
            [Blockly.Msg.MATH_HEX, 'hex'],
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(MATH_HUE);
        this.setOutput(true, String);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'bin': Blockly.Msg.MATH_DEC_TOOLTIP_BIN,
                'oct': Blockly.Msg.MATH_DEC_TOOLTIP_OCT,
                'hex': Blockly.Msg.MATH_DEC_TOOLTIP_HEX,

            };
            return TOOLTIPS[mode];
        });
    }
};

//取整等
export const math_to_int = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.LANG_MATH_TO_ROUND, 'round'],
            [Blockly.Msg.LANG_MATH_TO_CEIL, 'ceil'],
            [Blockly.Msg.LANG_MATH_TO_FLOOR, 'floor'],
            [Blockly.Msg.MATH_ABS, 'fabs'],
            // [Blockly.Msg.MATH_SQ, 'pow'],
            [Blockly.Msg.MATH_SQRT, 'sqrt']
        ];
        this.setColour(MATH_HUE);
        this.appendValueInput('A')
            .setCheck(Number)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'sqrt': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
                'fabs': Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
                'sq': Blockly.Msg.MATH_SINGLE_TOOLTIP_SQ,
                'round': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROUND,
                'ceil': Blockly.Msg.MATH_SINGLE_TOOLTIP_CEIL,
                'floor': Blockly.Msg.MATH_SINGLE_TOOLTIP_FLOOR
            };
            return TOOLTIPS[mode];
        });
    }
};
//最大最小值
export const math_max_min = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_MAX, 'max'],
            [Blockly.Msg.MIXLY_MIN, 'min'],
        ];

        this.setColour(MATH_HUE);
        this.appendValueInput('A')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
            .appendField('(');
        this.appendValueInput('B')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(',');
        this.appendDummyInput('')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(')');
        this.setInputsInline(true);
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'max': Blockly.Msg.MIXLY_TOOLTIP_MATH_MAX,
                'min': Blockly.Msg.MIXLY_TOOLTIP_MATH_MIN
            };
            return TOOLTIPS[mode];
        });
    }
};

export const math_number_base_conversion = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MATH_TWO, 'two'],
            [Blockly.Msg.MATH_EIGHT, 'eight'],
            [Blockly.Msg.MATH_TEN, 'ten'],
            [Blockly.Msg.MATH_SIXTEEN, 'sixteen']
        ];
        this.setColour(MATH_HUE);
        this.appendDummyInput('')
            .appendField(Blockly.Msg.MATH_BA)
        this.appendValueInput("NUM")
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
            .appendField(Blockly.Msg.MATH_JinZhi)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MATH_ZHW)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP2')
            .appendField(Blockly.Msg.MATH_JinZhi);
        this.setFieldValue('ten', 'OP2')
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setOutput(true)
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'two': Blockly.Msg.MATH_Before_two,
                'eight': Blockly.Msg.MATH_Before_eight,
                'ten': Blockly.Msg.MATH_Before_ten,
                'sixteen': Blockly.Msg.MATH_Before_sixteen,
            };
            var mode2 = thisBlock.getFieldValue('OP2');
            var TOOLTIPS2 = {
                'two': Blockly.Msg.MATH_Behind_two,
                'eight': Blockly.Msg.MATH_Behind_eight,
                'ten': Blockly.Msg.MATH_Behind_ten,
                'sixteen': Blockly.Msg.MATH_Behind_sixteen,
            };
            return TOOLTIPS[mode] + TOOLTIPS2[mode2];
        });
    }
};


export const math_random = {
    init: function () {
        var INT_FLOAT = [[Blockly.Msg.LANG_MATH_INT, 'int'], [Blockly.Msg.LANG_MATH_FLOAT, 'float']];
        this.setColour(MATH_HUE);
        this.setOutput(true, Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_RANDOM)
            .appendField(new Blockly.FieldDropdown(INT_FLOAT), 'TYPE');
        this.appendValueInput('FROM')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_MATH_RANDOM_INT_INPUT_TO);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('TYPE');
            var TOOLTIPS = {
                'int': Blockly.Msg.LANG_MATH_INT,
                'float': Blockly.Msg.LANG_MATH_FLOAT_RANDOM
            };
            return Blockly.Msg.MATH_RANDOM_INT_TOOLTIP + TOOLTIPS[mode];
        });
    }
};


export const math_constrain = {
    /**
     * Block for constraining a number between two limits.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(MATH_HUE);
        this.setOutput(true, Number);
        this.appendValueInput('VALUE')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN);
        this.appendValueInput('LOW')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_CONSTRAIN_INPUT_LOW);
        this.appendValueInput('HIGH')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_CONSTRAIN_INPUT_HIGH);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
    }
};

export const math_map = {
    init: function () {
        this.setColour(MATH_HUE);
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.Msg.MIXLY_MAP)
            .setCheck(Number);
        this.appendValueInput("fromLow", Number)
            .appendField(Blockly.Msg.MIXLY_MAP_FROM)
            .setCheck(Number);
        this.appendValueInput("fromHigh", Number)
            .appendField(",")
            .setCheck(Number);
        this.appendValueInput("toLow", Number)
            .appendField(Blockly.Msg.MIXLY_MAP_TO)
            .setCheck(Number);
        this.appendValueInput("toHigh", Number)
            .appendField(",")
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_MATH_MAP);
    }
};

export const math_indexer_number = {
    /**
     * Block for numeric value.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(MATH_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.math_number_validator_include_blank), 'NUM');
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
    }
};

export const math_random_seed = {
    init: function () {
        this.setColour(MATH_HUE);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.Msg.LANG_MATH_RANDOM_SEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_MATH_RANDOM_SEED);
    }
};

export const math_round = {

    init: function () {
        this.setColour(MATH_HUE);
        this.setOutput(true, Number);
        this.appendValueInput('VALUE')
            .setCheck(Number)
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.Msg.MATH_ROUND)
            .appendField(Blockly.Msg.TEXT_KEEP);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_DECIMAL);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_ROUND_NEW_TOOLTIP);
    }
};

export const text_to_number = {
    init: function () {
        var TO_INT_FLOAT =
            [[Blockly.Msg.MIXLY_TO_INT, 'int'], [Blockly.Msg.MIXLY_TO_FLOAT, 'float'], [Blockly.Msg.MIXLY_TO_BITES, 'b'], [Blockly.Msg.LANG_MATH_BYTE + Blockly.Msg.MIXLY_TO_INT, 'bti']];
        this.setColour(MATH_HUE);
        this.appendValueInput('VAR')
            .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('TOWHAT');
            var TOOLTIPS = {
                'int': Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOINT,
                'float': Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOFLOAT,
                'b': Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOBYTE
            };
            return TOOLTIPS[mode];
        });
    }
};

export const text_to_number_skulpt = {
    init: function () {
        var TO_INT_FLOAT =
            [[Blockly.Msg.MIXLY_TO_INT, 'int'], [Blockly.Msg.MIXLY_TO_FLOAT, 'float']];
        this.setColour(MATH_HUE);
        this.appendValueInput('VAR')
            .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('TOWHAT');
            var TOOLTIPS = {
                'int': Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOINT,
                'float': Blockly.Msg.MIXLY_TOOLTIP_TEXT_TOFLOAT
            };
            return TOOLTIPS[mode];
        });
    }
};

export const base_map = math_map

export const turn_to_int = {
    init: function () {
        this.setColour(MATH_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.LANG_MATH_BYTE + Blockly.Msg.MIXLY_TO_HEX);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOHEX)
    }
};

export const generate_cartesian_product = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(MATH_HUE);
        this.itemCount_ = 1;
        this.setMutator(new Blockly.icons.MutatorIcon(['lists_create_with_item'], this));
        this.appendDummyInput('DUMMY')
            .appendField(Blockly.Msg.MIXLY_PRODUCT + Blockly.Msg.MIXLY_GENERATE_CARTESIAN_PRODUCT);
        this.appendValueInput('REPEAT')
            .appendField(Blockly.Msg.MIXLY_EVERY_PER_ELEPER_ELEMENT);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_TIMES);
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_PYTHON_TOOLTIP);
        this.updateShape_();
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
            workspace.newBlock('lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('lists_create_with_item');
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
                this.getInput(`ADD${i}`).connection.connect(connections[i]);
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
            var input = this.getInput(`ADD${i}`);
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
        } else {
            let i = 0;
            while (this.getInput(`ADD${i}`)) {
                this.removeInput(`ADD${i}`);
                i++;
            }
        }
        // Rebuild block.
        if (this.itemCount_ == 0) {
            this.appendDummyInput('EMPTY')
                .appendField(Blockly.Msg.MIXLY_EMPTY_REMINDER);
        } else {
            for (let i = 0; i < this.itemCount_; i++) {
                this.appendValueInput(`ADD${i}`);
                this.moveInputBefore(`ADD${i}`, 'REPEAT');
            }
        }
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