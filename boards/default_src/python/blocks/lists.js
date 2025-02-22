import * as Blockly from 'blockly/core';

const LISTS_HUE = 260; //'#70b234'//260;

export const lists_get_index = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(LISTS_HUE);
        this.appendValueInput("LIST")
        this.appendValueInput("AT")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START)
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM);
    }
}


export const lists_get_sublist = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(LISTS_HUE);
        this.appendValueInput('LIST')
        this.appendDummyInput('')
        this.appendValueInput('AT1')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendValueInput('AT2')
            .appendField(Blockly.Msg.TEXT_CHARAT_TAIL + " " + Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.PYTHON_LISTS_GET_SUBLIST_TOOLTIP);
    }
}

export const lists_2d_get_data_with_col_row = {
    init: function () {
        this.appendValueInput("LIST")
            .setCheck(null);
        this.appendValueInput("row")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.DATAFRAME_RAW);
        this.appendValueInput("col")
            .setCheck(null)
            .appendField(Blockly.Msg.DATAFRAME_COLUMN);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(LISTS_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const lists_2d_get_col_row_data = {
    init: function () {
        this.appendValueInput("LIST")
            .setCheck(null);
        this.appendValueInput("row_start")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_GET + " " + Blockly.Msg.DATAFRAME_RAW + " [");
        this.appendValueInput("row_end")
            .setCheck(null)
            .appendField(",");
        this.appendValueInput("col_start")
            .setCheck(null)
            .appendField(")  " + Blockly.Msg.DATAFRAME_COLUMN + " [");
        this.appendValueInput("col_end")
            .setCheck(null)
            .appendField(",");
        this.appendDummyInput()
            .appendField(") " + Blockly.Msg.DICTS_ADD_VALUE);
        this.setInputsInline(true);
        this.setOutput(true, 'List');
        this.setColour(LISTS_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const lists_create_with = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput("")
            //don't need to specify the data type in Python
            // .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_NUMBER, 'Array<number>'], [Blockly.Msg.LANG_MATH_STRING, 'Array<string>'], [Blockly.Msg.LANG_MATH_BOOLEAN, 'Array<boolean>']]), 'TYPE')
            // .appendField(' ')
            .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
            .appendField('[')
            //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
            .appendField(']');
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['lists_create_with_item'], this));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_PYTHON_TOOLTIP);
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
                .appendField(Blockly.Msg.LISTS_CREATE_PYTHON_EMPTY_TITLE);
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.blockpy_LISTS_CREATE_WITH_INPUT_WITH);
                }
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
};


export const lists_create_with_text = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput("")
            //don't need to specify the data type in Python
            // .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_NUMBER, 'Array<number>']]), 'TYPE')
            // .appendField(' ')
            // .appendField(Blockly.Msg.blockpy_MIXLY_SPLITBYDOU)
            .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
            //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
            // .appendField(Blockly.Msg.MIXLY_MAKELISTFROM)
            // .appendField(this.newQuote_(true))
            .appendField(' = [')
            .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT')
            .appendField(']');
        // .appendField(this.newQuote_(false))
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_LISTS_CREATE_WITH_TEXT2);
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


export const lists_create_with_container = {
    /**
     * Mutator block for list container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

export const lists_create_with_item = {
    /**
     * Mutator bolck for adding items.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = false;
    }
};


export const lists_set_index = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('LIST');
        this.appendValueInput('AT')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_LIST_ASSIGN_AT);
        this.appendValueInput('TO')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIST_VALUE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LANG_LISTS_SET_INDEX_TOOLTIP);
    }
};

export const lists_append_extend = {
    init: function () {
        this.setColour(LISTS_HUE);
        this['TYPE'] = [
            [Blockly.Msg.MIXLY_blockpy_set_add, 'append'],
            [Blockly.Msg.MIXLY_MICROBIT_LIST_EXTEND, 'extend']
        ];

        this.appendValueInput('LIST')
            .setCheck('List')
        this.appendValueInput('DATA')
            .appendField(new Blockly.FieldDropdown(this['TYPE']), 'OP')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_LIST_A_ITEM)
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIST_TO_END);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'append': Blockly.Msg.MIXLY_TOOLTIP_LIST_APPEND,
                'extend': Blockly.Msg.LISTS_EXTEND_TOOLTIP

            };
            return TOOLTIPS[mode];
        });
    }

};

export const lists_get_random_item = {
    /**
     * Block for get a random item from list.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput("LIST");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_RANDOM)
        this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM);
        this.setOutput(true);
    }
};

export const lists_get_random_sublist = {
    /**
     * Block for get a random item from list.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput("LIST");
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET + Blockly.Msg.MIXLY_MICROBIT_RANDOM)
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_LISTS_GET_INDEX2 + Blockly.Msg.LISTS_GET_RANDOM_SUBLIST)
        this.setTooltip(Blockly.Msg.LISTS_GET_RANDOM_SUBLIST_TOOLTIP);
        this.setOutput(true, 'List');
    }
};

export const lists_insert_value = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('LIST');
        this.appendValueInput('AT')
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIST_INSERT_AT);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIST_VALUE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.LANG_LISTS_SET_INDEX_TOOLTIP);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT);
    }
};

export const lists_reverse = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
            .setCheck('List') //this.appendDummyInput("")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_LIST_REVERSE)
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
        this.setTooltip(Blockly.Msg.LANG_LISTS_CLEAR_TOOLTIP);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
export const lists_clear = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_CLEAR)
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
        this.setTooltip(Blockly.Msg.LANG_LISTS_REVERSE_TOOLTIP);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const lists_remove_at = {
    init: function () {
        this.setColour(LISTS_HUE);
        this['TYPE'] = [
            [Blockly.Msg.SERIES_INDEX, 'del'],
            [Blockly.Msg.MIXLY_MICROBIT_JS_I2C_VALUE, 'remove']
        ];
        this.appendValueInput('LIST')
            .setCheck('List')
        this.appendValueInput('DATA')
            .appendField(Blockly.Msg.MIXLY_MIXPY_LISTS_REMOVE)
            .appendField(new Blockly.FieldDropdown(this['TYPE']), 'OP')
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'del': Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_DELETE,
                'remove': Blockly.Msg.MIXLY_TOOLTIP_LIST_REMOVE
            };
            return TOOLTIPS[mode];
        });
    }
};
export const lists_pop = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('LIST');
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_LIST_POP);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM);
    }
};

export const lists_find = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_LIST_INDEX, 'INDEX'],
            [Blockly.Msg.MIXLY_LIST_COUNT, 'COUNT']
        ];
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
            .setCheck('List')
        this.appendValueInput('data')
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.Msg.HTML_VALUE)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_DE)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        this.setInputsInline(true);
        this.setOutput(true, Number);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'INDEX': Blockly.Msg.MIXLY_TOOLTIP_LIST_FIND_INDEX,
                'COUNT': Blockly.Msg.MIXLY_TOOLTIP_LIST_FIND_COUNT

            };
            return TOOLTIPS[mode];
        });
    }
};
export const list_trig = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_LIST_LEN, 'LEN'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
            [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
        ];
        //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
        this.setColour(LISTS_HUE);
        this.setOutput(true, Number);
        this.appendValueInput('data')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'LEN': Blockly.Msg.LISTS_LENGTH_TOOLTIP,
                'SUM': Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                'MAX': Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                'MIN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                'AVERAGE': Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                'MEDIAN': Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                'MODE': Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                'STD_DEV': Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV

            };
            return TOOLTIPS[mode];
        });
    }
};

export const lists_sort = {
    /**
     * Block for sorting a list.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "args0": [
                {
                    "type": "input_value",
                    "name": "LIST",
                    "check": "List"
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [Blockly.Msg.LISTS_SORT_TYPE_NUMERIC, "NUMERIC"],
                        [Blockly.Msg.LISTS_SORT_TYPE_TEXT, "TEXT"],
                        [Blockly.Msg.LISTS_SORT_TYPE_IGNORECASE, "IGNORE_CASE"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        [Blockly.Msg.LISTS_SORT_ORDER_ASCENDING, "1"],
                        [Blockly.Msg.LISTS_SORT_ORDER_DESCENDING, "-1"]
                    ]
                },
            ],
            "message0": Blockly.Msg.LISTS_SORT_TITLE,
            "inputsInline": true,
            "output": "List",
            "colour": LISTS_HUE,
            "tooltip": Blockly.Msg.LISTS_SORT_TOOLTIP,
            "helpUrl": Blockly.Msg.LISTS_SORT_HELPURL
        });
    }
};

export const lists_change_to = {
    init: function () {
        var OPERATORS = [
            [Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE, 'tuple'],
            [Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD, 'set'],
            [Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD, 'array']
        ];
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
            .setCheck("List")
        // .appendField(Blockly.Msg.blockpy_USE_LIST);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.A_TO_B)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'tuple': Blockly.Msg.MIXLY_TOOLTIP_CONVERT_LIST_TO_TUPLE,
                'set': Blockly.Msg.MIXLY_TOOLTIP_CONVERT_LIST_TO_SET,
                'array': Blockly.Msg.MIXLY_TOOLTIP_CONVERT_LIST_TO_ARRAY
            };
            return TOOLTIPS[mode];
        });

        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const list_many_input = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput("")
            .appendField('[')
            .appendField(new Blockly.FieldTextInput('0,0,0'), "CONTENT")
            .appendField(']');
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const lists_create_with_noreturn = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, "List")
        this.setMutator(new Blockly.icons.MutatorIcon(['lists_create_with_item'], this));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_PYTHON_TOOLTIP);
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
                .appendField(Blockly.Msg.LISTS_CREATE_PYTHON_EMPTY_TITLE);
        } else {
            for (var i = 0; i < this.itemCount_; i++) {
                var input = this.appendValueInput('ADD' + i);
                if (i == 0) {
                    input.appendField(Blockly.Msg.blockpy_LISTS_CREATE_WITH_INPUT_WITH);
                }
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

export const lists_change_to_general = {
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_LIST, 'list'],
                [Blockly.Msg.MIXLY_MICROBIT_TYPE_TUPLE, 'tuple'],
                [Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD, 'set']
            ];
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR');
        this.appendDummyInput("")
            .appendField(Blockly.Msg.A_TO_B)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');

        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const lists_del_general = {
    /**
     * Block for list length.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('TUP')
        this.appendDummyInput("")
            .appendField(Blockly.Msg.OBJECT_DELETE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const list_tolist = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_TOLIST);
        this.setOutput(true, 'List');
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_TOOLTIP_TOLIST);
    }
};

export const lists_create_with2 = lists_create_with
export const lists_create_with_text2 = lists_create_with_text
export const lists_getIndex3 = lists_get_index
export const lists_getSublist3 = lists_get_sublist
export const lists_setIndex3 = lists_set_index
export const lists_insert_value2 = lists_insert_value
export const lists_remove_at2 = lists_remove_at
export const list_tolist2 = list_tolist;


export const ENUMERATE ={
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.blockpy_USE_LIST);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TO_INDEX_SEQUENCE);
        // this.appendValueInput('VAR_N')
        //     .appendField(Blockly.Msg.MIXLY_INDEX+Blockly.Msg.MIXLY_STARTSWITH);
        this.setInputsInline(true);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOTO_INDEX_SEQUENC_TOOLTIP);
    }
};

export const enumerate = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.blockpy_USE_LIST);
        this.appendValueInput('LIST');
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg.MIXLY_TO_INDEX_SEQUENCE)
            .appendField(Blockly.Msg.MIXLY_INDEX+Blockly.Msg.MIXLY_STARTSWITH);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOTO_INDEX_SEQUENC_TOOLTIP);
    }
};

export const content_in_lists = {
    init: function () {
        this.setColour(LISTS_HUE);
        this.appendValueInput("CON")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ESP32_MIXGO_MUSIC_SHOW_IN);
        this.appendValueInput("LIST")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MID);
        this.setInputsInline(true);
        this.setOutput(true);
    }
}