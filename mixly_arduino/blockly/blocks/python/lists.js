'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


Blockly.Blocks.lists.HUE = 260//'#70b234'//260;



Blockly.Blocks.lists_getIndex2 = {
    init: function() {
        var a = [[Blockly.Msg.LISTS_GET_INDEX_GET, "GET"],
                 [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, "GET_REMOVE"],];
        this.WHERE_OPTIONS = [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
                              [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
                              [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        a = new Blockly.FieldDropdown(a);
        this.appendValueInput("VALUE")
            .setCheck("List")
        //    .appendField(Blockly.MIXLY_MICROBIT_TYPE_LIST)
        this.appendDummyInput("AT");
        this.appendDummyInput()
            //.appendField(Blockly.MIXLY_MID)
            .appendField(a, "MODE");
//            .appendField("", "SPACE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        // this.appendDummyInput().appendField(Blockly.MIXLY_DE);
        this.setInputsInline(!0);
        this.setOutput(!0);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE"),
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (a + " " + e) {
            case "GET FROM_START":
            case "GET FROM_END":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
                break;
            case "GET RANDOM":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
                break;
            case "GET_REMOVE FROM_START":
            case "GET_REMOVE FROM_END":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
                break;
            case "GET_REMOVE RANDOM":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
                break;
            }
            //if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", Blockly.Blocks.ONE_BASED_INDEXING ? "#1": "#0");
            return d
        })
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("statement", !this.outputConnection);
        var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function(a) {
        var b = "true" == a.getAttribute("statement");
        this.updateStatement_(b);
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateStatement_: function(a) {
        a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
    },
    updateAt_: function(a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck(Number), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS,
        function(b) {
            var e = "FROM_START" == b || "FROM_END" == b;
            if (e != a) {
                var d = this.sourceBlock_;
                d.updateAt_(e);
                d.setFieldValue(b, "WHERE");
                return null
            }
        });
        this.getInput("AT").appendField(b, "WHERE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
    }
};

Blockly.Blocks['lists_moveIndex'] = {
  /**
   * Block for getting element at index.
   * @this Blockly.Block
   */
  init: function() {
    var MODE = [[Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'REMOVE']];
    this.WHERE_OPTIONS =
        [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
         [Blockly.Msg.LISTS_GET_INDEX_RANDOM, 'RANDOM']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    var modeMenu = new Blockly.FieldDropdown(MODE, function(value) {
      var isStatement = (value == 'REMOVE');
      this.sourceBlock_.updateStatement_(isStatement);
    });
    this.appendValueInput('VALUE')
        .setCheck('List')
        .appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MID)
        .appendField(Blockly.Msg.LISTS_GET_INDEX_REMOVE, 'MODE')
        .appendField('', 'SPACE');
    this.appendDummyInput('AT');
    if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(false);
    this.updateAt_(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('MODE');
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = '';
      switch (mode + ' ' + where) {
        case 'GET FROM_START':
        case 'GET FROM_END':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
          break;
        case 'GET RANDOM':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
          break;
        case 'GET_REMOVE FROM_START':
        case 'GET_REMOVE FROM_END':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
          break;
        case 'GET_REMOVE RANDOM':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
          break;
        case 'REMOVE FROM_START':
        case 'REMOVE FROM_END':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM;
          break;
        case 'REMOVE RANDOM':
          tooltip = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM;
          break;
      }
      if (where == 'FROM_START' || where == 'FROM_END') {
        var msg = (where == 'FROM_START') ?
            Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP :
            Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP;
        tooltip += '  ' + msg.replace('%1',
                thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
      return tooltip;
    });
  },
  /**
   * Create XML to represent whether the block is a statement or a value.
   * Also represent whether there is an 'AT' input.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isStatement = !this.outputConnection;
    container.setAttribute('statement', isStatement);
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'statement' defaults to false and 'at' defaults to true.
    var isStatement = (xmlElement.getAttribute('statement') == 'true');
    this.updateStatement_(isStatement);
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Switch between a value block and a statement block.
   * @param {boolean} newStatement True if the block should be a statement.
   *     False if the block should be a value.
   * @private
   * @this Blockly.Block
   */
  updateStatement_: function(newStatement) {
    var oldStatement = !this.outputConnection;
    if (newStatement != oldStatement) {
      this.unplug(true, true);
      if (newStatement) {
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      } else {
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setOutput(true);
      }
    }
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck(Number);
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL')
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT');
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendField(menu, 'WHERE');
    if (Blockly.Msg.LISTS_GET_INDEX_TAIL) {
      this.moveInputBefore('TAIL', null);
    }
  }
};

Blockly.Blocks['lists_getSublist'] = {
  /**
   * Block for getting sublist.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE_OPTIONS_1'] =
        [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
         [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST']];
    this['WHERE_OPTIONS_2'] =
        [[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END'],
         [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('LIST')
        .setCheck('List')
        //.appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL)
    // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
    //   this.appendDummyInput('TAIL')
    //       .appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
    // }
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    this.setInputsInline(true);
    this.setOutput(true, 'List');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.PYTHON_LISTS_GET_SUBLIST_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck(Number);
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n)
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
        function(value) {
          var newAt = (value == 'FROM_START') || (value == 'FROM_END');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(n, newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE' + n);
            return null;
          }
          return undefined;
        });
    this.getInput('AT' + n)
        .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
    // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
    //   this.moveInputBefore('TAIL', null);
    // }
  }
};

Blockly.Blocks['lists_setIndex2'] = {
  /**
   * Block for getting sublist.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE'] =
        [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END']];
    this['MODE'] =
        [[Blockly.MIXLY_MICROBIT_JS_LIST_INSERT, 'INSERT'],
         [Blockly.MIXLY_UPDATE, 'CHANGE'],
         [Blockly.MIXLY_MICROBIT_JS_DELETE_VAR, 'DELETE']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('LIST')
        .setCheck('List')
        // .appendField(Blockly.MIXLY_MICROBIT_TYPE_LIST)
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_DE)
        .appendField(new Blockly.FieldDropdown(this['WHERE']), 'OP');
    this.appendValueInput('AT1')
        .setCheck(Number);
    this.appendDummyInput('')
        .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
    this.appendDummyInput('AT2');
    this.updateAt_(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var b = this;
        this.setTooltip(function() {
            var 
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (e) {
            case "INSERT":
           
                d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT;
                break;
            case "CHANGE":
                d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_CHANGE;
                break;
           
            case "DELETE":
                d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_DELETE;
                break;
            
            }
            //if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", Blockly.Blocks.ONE_BASED_INDEXING ? "#1": "#0");
            return d
        })
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT2');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT2').setCheck(Number);
    } else {
      this.appendDummyInput('AT2');
    }
    var menu = new Blockly.FieldDropdown(this['MODE'],
        function(value) {
          var newAt = (value == 'INSERT') || (value == 'CHANGE');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE');
            return null;
          }
          return undefined;
        });
    this.getInput('AT2')
        .appendField(menu, 'WHERE');
    // this.moveInputBefore('AT2','LIST');
  }
};



Blockly.Blocks['lists_name'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
	this.setTooltip(Blockly.Msg.LISTS_NAME_TOOLTIP);
	this.setOutput(true, 'List');
  }
};

Blockly.Blocks['lists_name2'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
  this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('addedlist'), 'VAR');
  this.setTooltip(Blockly.Msg.LISTS_NAME_TOOLTIP);
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['lists_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'number'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'string'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'boolean'], [Blockly.MIXLY_MICROBIT_JS_TYPE_ARRAY_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_ARRAY_STRING, 'Array<string>']]), 'TYPE')
        // .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        .appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
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
  }
};

Blockly.Blocks['lists_create_with_text'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT, 'long'],[Blockly.LANG_MATH_FLOAT, 'float'],[Blockly.LANG_MATH_CHAR, 'char'], [Blockly.LANG_MATH_BYTE, 'byte']]), "TYPE")
        // .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        .appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
        .appendField(']')
	    .appendField(Blockly.MIXLY_MAKELISTFROM)
		.appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT')
        .appendField(this.newQuote_(false))
		.appendField(Blockly.MIXLY_SPLITBYDOU);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_LISTS_CREATE_WITH_TEXT);
  },
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
}

Blockly.Blocks['lists_create_with2'] = {
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

// Blockly.Blocks['lists_create_with_text2'] = {
//   init: function() {
//     this.setColour(Blockly.Blocks.lists.HUE);
// 	this.appendDummyInput("")
//   //don't need to specify the data type in Python
//         // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>']]), 'TYPE')
//         // .appendField(' ')
//         .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
//         .appendField('[')
//         //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
//         .appendField(']')
// 	    .appendField(Blockly.MIXLY_MAKELISTFROM)
// 		.appendField(this.newQuote_(true))
//         .appendField(new Blockly.FieldTextInput('0,0,0'), 'TEXT')
//         .appendField(this.newQuote_(false))
// 		.appendField(Blockly.blockpy_MIXLY_SPLITBYDOU);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
// 	this.setTooltip(Blockly.MIXLY_TOOLTIP_LISTS_CREATE_WITH_TEXT);
//   },
//   newQuote_: function(open) {
//     if (open == this.RTL) {
//       var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
//     } else {
//       var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
//     }
//     return new Blockly.FieldImage(file, 12, 12, '"');
//   }
// }

Blockly.Blocks['lists_create_with_text2'] = {
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
  // newQuote_: function(open) {
  //   if (open == this.RTL) {
  //     var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
  //   } else {
  //     var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
  //   }
  //   return new Blockly.FieldImage(file, 12, 12, '"');
  // }
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

Blockly.Blocks.lists_getIndex = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('AT')
        .setCheck(Number)
		.appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.LANG_LISTS_GET_INDEX1);
    this.appendDummyInput("")
        .appendField(Blockly.LANG_LISTS_GET_INDEX2);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_LISTS_GET_INDEX_TOOLTIP);
  }
};

Blockly.Blocks.lists_setIndex = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('AT')
        .setCheck(Number)
		.appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.LANG_LISTS_SET_INDEX1);
    this.appendValueInput('TO')
        .appendField(Blockly.LANG_LISTS_SET_INDEX2);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP);
  }
};




Blockly.Blocks['lists_append'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_ADD_VALUE);
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_TO_END);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['lists_extend'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
        .setCheck('List')

    this.appendDummyInput("")
        .appendField(Blockly.blockpy_LIST_ADD_LIST);
    this.appendValueInput('data')
        .setCheck('List')
    this.appendDummyInput("")    
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_TO_END);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.LISTS_EXTEND_TOOLTIP);    
  }
};

Blockly.Blocks['lists_append_remove'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this['TYPE'] =
        [[Blockly.MIXLY_blockpy_set_add, 'append'],
         [Blockly.MIXLY_MICROBIT_JS_DELETE_VAR, 'remove']];
  
    this.appendValueInput('VAR')
        .setCheck('List')
    this.appendValueInput('data')
        .appendField(new Blockly.FieldDropdown(this['TYPE']), 'OP')
        .appendField(Blockly.MIXLY_MICROBIT_LIST_A_VALUE)
   
      
   // this.appendDummyInput()
   //     .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_TO_END);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'append': Blockly.MIXLY_TOOLTIP_LIST_APPEND,
        'remove': Blockly.MIXLY_TOOLTIP_LIST_REMOVE
        
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
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_GET_INDEX_RANDOM2)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.Msg.LISTS_GET_INDEX_RANDOM3);
  this.setTooltip(Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM);
  this.setOutput(true);
  }
};

Blockly.Blocks['lists_push'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('data')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_ADD_VALUE);
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_TO_END);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks['lists_get_remove_last'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_GET_AND_REMOVE)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_GET_AND_REMOVE_LAST);

    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks.lists_insert_value = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('AT')
        .setCheck(Number)
		.appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_INSERT_AT);
    this.appendValueInput('TO')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_VALUE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_LISTS_SET_INDEX_TOOLTIP);
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
Blockly.Blocks['lists_get_remove_first'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_GET_AND_REMOVE_FIRST)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR');

    this.setInputsInline(true);
    this.setOutput(true);
  }
};
Blockly.Blocks['lists_insert_at_beginning'] = {

  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('data')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_INSERT);
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_AT_BEGINNING);
    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};
Blockly.Blocks['lists_remove_at'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('AT')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_REMOVE_VALUE_AT);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_REMOVE_VALUE_XIANG);

    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};


Blockly.Blocks['lists_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('VAR')
        .setCheck('List')
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE)
       //.appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
  this.setOutput(true, Number);
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
        .setCheck('List')
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

Blockly.Blocks['lists_repeat'] = {
  /**
   * Block for creating a list with one element repeated.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.LISTS_REPEAT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "ITEM"
        },
        {
          "type": "input_value",
          "name": "NUM"
          // "check": "Number"
        }
      ],
      "output": "List",
      "colour": Blockly.Blocks.lists.HUE
      // "tooltip": Blockly.Msg.LISTS_REPEAT_TOOLTIP,
      // "helpUrl": Blockly.Msg.LISTS_REPEAT_HELPURL
    });
  }
};

Blockly.Blocks['lists_isEmpty'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
  this.appendDummyInput("")
        .appendField(new Blockly.FieldTextInput('mylist'), 'VALUE')
        .appendField(Blockly.Msg.LISTS_ISEMPTY_TITLE);

    this.setInputsInline(true);
    this.setOutput(true);
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
