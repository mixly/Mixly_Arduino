'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


Blockly.Blocks.lists.HUE = 260//'#70b234'//260;


Blockly.Blocks.lists_get_index = {
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST")
        this.appendValueInput("AT")
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START)
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM);
    }
}


Blockly.Blocks['lists_get_sublist'] = {
    /**
     * Block for getting sublist.
     * @this Blockly.Block
     */
    init: function () {
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput('LIST')
        this.appendDummyInput('')
        this.appendValueInput('AT1')
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendValueInput('AT2')
            .appendField(Blockly.Msg.TEXT_INDEXOF_TAIL + " " + Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.PYTHON_LISTS_GET_SUBLIST_TOOLTIP);
    }
}


Blockly.Blocks['lists_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'Array<string>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        // .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
        .appendField(']');
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_PYTHON_TOOLTIP);
  },
  /**
   * Create XML to represent list inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock =
        Blockly.Block.obtain(workspace, 'lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'lists_create_with_item');
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
  compose: function(containerBlock) {
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
  saveConnections: function(containerBlock) {
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
  updateShape_: function() {
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
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};


Blockly.Blocks['lists_create_with_text'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
  this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>']]), 'TYPE')
        // .appendField(' ')
    // .appendField(Blockly.blockpy_MIXLY_SPLITBYDOU)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
      // .appendField(Blockly.MIXLY_MAKELISTFROM)
    // .appendField(this.newQuote_(true))
        .appendField(' = [')
        .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT')
        .appendField(']');
        // .appendField(this.newQuote_(false))
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_LISTS_CREATE_WITH_TEXT2);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
}


Blockly.Blocks['lists_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_TYPE_LIST);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};


Blockly.Blocks.lists_set_index = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput('LIST');
        this.appendValueInput('AT')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_LIST_ASSIGN_AT);
        this.appendValueInput('TO')
            .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_VALUE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP);
    }
};

Blockly.Blocks['lists_append_extend'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this['TYPE'] =
        [[Blockly.MIXLY_blockpy_set_add, 'append'],
         [Blockly.MIXLY_MICROBIT_LIST_EXTEND, 'extend']];

    this.appendValueInput('LIST')
        .setCheck('List')
    this.appendValueInput('DATA')
        .appendField(new Blockly.FieldDropdown(this['TYPE']), 'OP')
        .appendField(Blockly.MIXLY_MICROBIT_LIST_A_ITEM)
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_TO_END);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'append': Blockly.MIXLY_TOOLTIP_LIST_APPEND,
        'extend': Blockly.Msg.LISTS_EXTEND_TOOLTIP

      };
      return TOOLTIPS[mode];
    });
  }

};

Blockly.Blocks['lists_get_random_item'] = {
  /**
   * Block for get a random item from list.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
  this.appendValueInput("LIST");
  this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET + " " + Blockly.Msg.LISTS_GET_INDEX_RANDOM)
  this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM);
  this.setOutput(true);
  }
};

Blockly.Blocks.lists_insert_value = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('LIST');
    this.appendValueInput('AT')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_INSERT_AT);
    this.appendValueInput('VALUE')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_VALUE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP);
    this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT);
  }
};

Blockly.Blocks['lists_reverse'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
        .setCheck('List') //this.appendDummyInput("")
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_REVERSE)
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
    this.setTooltip(Blockly.LANG_LISTS_REVERSE_TOOLTIP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['lists_clear'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROPYTHON_CLEAR)
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
    this.setTooltip(Blockly.LANG_LISTS_REVERSE_TOOLTIP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.lists_remove_at = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this['TYPE'] =
            [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'del'],
                [Blockly.MIXLY_MICROBIT_JS_I2C_VALUE, 'remove']];
        this.appendValueInput('LIST')
            .setCheck('List')
        this.appendValueInput('DATA')
            .appendField(Blockly.MIXLY_MICROBIT_JS_DELETE_VAR + " ")
            .appendField(new Blockly.FieldDropdown(this['TYPE']), 'OP')
        this.appendDummyInput()
            .appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('OP');
            var TOOLTIPS = {
                'del': Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_DELETE,
                'remove': Blockly.MIXLY_TOOLTIP_LIST_REMOVE
            };
            return TOOLTIPS[mode];
        });
    }
};
Blockly.Blocks.lists_pop = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('LIST');
    this.appendValueInput('VALUE')
        .appendField(Blockly.MIXLY_MICROBIT_LIST_POP);
    this.appendDummyInput()
        .appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM);
  }
};

Blockly.Blocks['lists_find'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MIXLY_LIST_INDEX, 'INDEX'],
         [Blockly.Msg.MIXLY_LIST_COUNT, 'COUNT']
        ];
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
        .setCheck('List')
    this.appendValueInput('data')
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_I2C_VALUE)
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_DE)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
        //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
    this.setInputsInline(true);
    this.setOutput(true, Number);
     var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'INDEX': Blockly.MIXLY_TOOLTIP_LIST_FIND_INDEX,
        'COUNT': Blockly.MIXLY_TOOLTIP_LIST_FIND_COUNT
        
      };
      return TOOLTIPS[mode];
    });  
  }
};
Blockly.Blocks['list_trig'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MIXLY_LIST_LEN, 'LEN'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
         [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('data')
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
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

Blockly.Blocks['lists_sort'] = {
  /**
   * Block for sorting a list.
   * @this Blockly.Block
   */
  init: function() {
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
      "colour": Blockly.Blocks.lists.HUE,
      "tooltip": Blockly.Msg.LISTS_SORT_TOOLTIP,
      "helpUrl": Blockly.Msg.LISTS_SORT_HELPURL
    });
  }
};


Blockly.Blocks['lists_change_to'] = {
  init: function() {
    var OPERATORS =
        [[Blockly.MIXLY_MICROBIT_TYPE_TUPLE, 'tuple'],
         [Blockly.MIXLY_MICROBIT_TYPE_SETS, 'set']
        ];
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
        .setCheck("List")
        // .appendField(Blockly.blockpy_USE_LIST);   
    this.appendDummyInput("")
        .appendField(Blockly.Msg.A_TO_B)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'tuple': Blockly.MIXLY_TOOLTIP_CONVERT_LIST_TO_TUPLE,
        'set': Blockly.MIXLY_TOOLTIP_CONVERT_LIST_TO_SET
        
      };
      return TOOLTIPS[mode];
    });    
    
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['list_many_input']= {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendDummyInput("")
        .appendField('[')
        .appendField(new Blockly.FieldTextInput('0,0,0'),"CONTENT")
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['lists_create_with_noreturn'] = {
    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true, "List")
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
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
            Blockly.Block.obtain(workspace, 'lists_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = Blockly.Block.obtain(workspace, 'lists_create_with_item');
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

Blockly.Blocks['lists_change_to_general'] = {
  init: function() {
    var OPERATORS =
        [
         [Blockly.MIXLY_MICROBIT_TYPE_LIST, 'list'],
         [Blockly.MIXLY_MICROBIT_TYPE_TUPLE, 'tuple'],
         [Blockly.MIXLY_MICROBIT_TYPE_SETS, 'set']
        ];
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.A_TO_B)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    var thisBlock = this;

    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['lists_del_general'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('TUP')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.OBJECT_DELETE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['lists_create_with2'] = Blockly.Blocks['lists_create_with']
Blockly.Blocks['lists_create_with_text2'] = Blockly.Blocks['lists_create_with_text']
Blockly.Blocks['lists_getIndex3'] = Blockly.Blocks['lists_get_index']
Blockly.Blocks['lists_getSublist3'] = Blockly.Blocks['lists_get_sublist']
Blockly.Blocks['lists_setIndex3'] = Blockly.Blocks['lists_set_index']
Blockly.Blocks['lists_insert_value2'] = Blockly.Blocks['lists_insert_value']
Blockly.Blocks['lists_remove_at2'] = Blockly.Blocks['lists_remove_at']


