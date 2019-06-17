'use strict';

goog.provide('Blockly.Blocks.lists');

goog.require('Blockly.Blocks');


Blockly.Blocks.lists.HUE = 260;

Blockly.Blocks['lists_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'number'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'string'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'boolean'], [Blockly.MIXLY_MICROBIT_JS_TYPE_ARRAY_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_ARRAY_STRING, 'Array<string>']]), 'TYPE')
        .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        .appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
        .appendField(']');
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
  }
};

Blockly.Blocks['lists_create_with_text'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT, 'long'],[Blockly.LANG_MATH_FLOAT, 'float'],[Blockly.LANG_MATH_CHAR, 'char'], [Blockly.LANG_MATH_BYTE, 'byte']]), "TYPE")
        .appendField(' ')
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
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'Array<string>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
        .appendField(']');
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP);
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
          .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        }
      }
    }
  }
};

Blockly.Blocks['lists_create_with_text2'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>']]), 'TYPE')
        .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField('[')
        //.appendField(new Blockly.FieldTextInput('3',Blockly.FieldTextInput.math_number_validator), 'SIZE')
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

Blockly.Blocks['lists_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
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

Blockly.Blocks['lists_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
	this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR');
	this.setTooltip(Blockly.Msg.LISTS_LENGTH_TOOLTIP);
	this.setOutput(true, Number);
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
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_GET_AND_REMOVE_LAST)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR');

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
	this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_REVERSE)
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR');

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
Blockly.Blocks['lists_find'] = {
  init: function() {
    this.setColour(Blockly.Blocks.lists.HUE);
    this.appendValueInput('data')
        .appendField(new Blockly.FieldTextInput('mylist'), 'VAR')
        .appendField(Blockly.MIXLY_MICROBIT_JS_LIST_FIND_INDEX_OF);
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
