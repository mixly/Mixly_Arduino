'use strict';

goog.provide('Blockly.Blocks.tuple');

goog.require('Blockly.Blocks');


Blockly.Blocks.tuple.HUE = 45;



Blockly.Blocks['tuple_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
  this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'Array<string>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        // .appendField(' ')
        .appendField(new Blockly.FieldTextInput('mytup'), 'VAR');
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['tuple_create_with_item']));
    this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_TOOLTIP);
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
        Blockly.Block.obtain(workspace, 'tuple_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'tuple_create_with_item');
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
          .appendField(Blockly.Msg.TUPLE_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.TUPLE_CREATE_WITH_INPUT_WITH);
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

Blockly.Blocks['tuple_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.TUPLE_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['tuple_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.blockpy_SET_VARIABLES_NAME);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.TUPLE_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks.tuple_getIndex = {
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('AT')
        .setCheck(Number)
    .appendField(new Blockly.FieldTextInput('mytup'), 'VAR')
        .appendField(Blockly.LANG_LISTS_GET_INDEX1);
    this.appendDummyInput("")
        .appendField(Blockly.LANG_LISTS_GET_INDEX2);
    this.setInputsInline(true);
    this.setTooltip(Blockly.TUPLE_GET_INDEX_TOOLTIP);
  }
};

Blockly.Blocks['tuple_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE)
        .appendField(new Blockly.FieldTextInput('mytup'), 'VAR');
  this.setTooltip(Blockly.Msg.TUPLE_LENGTH_TOOLTIP);
  this.setOutput(true, Number);
  }
};

Blockly.Blocks['tuple_del'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.appendDummyInput("")        
        .appendField(new Blockly.FieldTextInput('mytup'), 'VAR')
        .appendField(Blockly.Msg.TUPLE_DEL);  
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['tuple_join'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
  this.appendDummyInput("")
      .appendField(new Blockly.FieldTextInput('mytup1'), 'VAR1');
  this.appendDummyInput("")
        .appendField(Blockly.Msg.TUPLE_JOIN)
        .appendField(new Blockly.FieldTextInput('mytup2'), 'VAR2');
  this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.TUPLE_JOIN_TOOLTIP);
  this.setOutput(true, Number);
  }
};

Blockly.Blocks['tuple_create_with_lists'] = {
  init: function() {
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.appendValueInput('data')
        .setCheck("List")
        .appendField(Blockly.blockpy_USE_LIST);   
    this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_TO_TUPLE)
        .appendField(new Blockly.FieldTextInput('mytup'), 'VAR');
    this.setTooltip(Blockly.Msg.LISTS_TO_TUPLE_TOOLTIP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['tuple_max'] = {
  init: function() {
     this.appendDummyInput("")
      .appendField(new Blockly.FieldTextInput('mytup'), 'TUR')
  var max_min =
        [[Blockly.blockpy_TUPLE_MAX, 'max'],[Blockly.blockpy_TUPLE_MIN, 'min']];
    this.setColour(Blockly.Blocks.tuple.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_TUPLE_GET)
        .appendField(new Blockly.FieldDropdown(max_min), 'DIR')
        

  this.setInputsInline(true);
  this.setOutput(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'max': Blockly.MIXLY_TOOLTIP_TUPLE_MAX,
        'min': Blockly.MIXLY_TOOLTIP_TUPLE_MIN
      };
      return TOOLTIPS[mode];
    });
  }
};