'use strict';

goog.provide('Blockly.Blocks.set');
goog.require('Blockly.Blocks');

Blockly.Blocks.set.HUE = 100;

Blockly.Blocks['set_create_with'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
  this.appendDummyInput("")
  //don't need to specify the data type in Python
        // .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'Array<number>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'Array<string>'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'Array<boolean>']]), 'TYPE')
        // .appendField(' ')
        .appendField(new Blockly.FieldTextInput('s1'), 'VAR')
       
    this.itemCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['set_create_with_item']));
    this.setTooltip(Blockly.Msg.blockpy_SET_CREATE_WITH_TOOLTIP);
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
        Blockly.Block.obtain(workspace, 'set_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = Blockly.Block.obtain(workspace, 'set_create_with_item');
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
          .appendField(Blockly.Msg.blockpy_SET_CREATE_EMPTY_TITLE);
    } else {
      for (var i = 0; i < this.itemCount_; i++) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.blockpy_SET_CREATE_WITH_INPUT_WITH);
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

Blockly.Blocks['set_create_with_container'] = {
  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.blockpy_SET_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['set_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.blockpy_SET_VARIABLES_NAME);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.blockpy_SET_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['set_length'] = {
  
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE);        
  this.appendValueInput('SET');
  this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.SET_LENGTH_TOOLTIP);
  this.setOutput(true, Number);
  }
};

Blockly.Blocks['set_get_remove_last'] = {
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendValueInput('SET')
        .setCheck('Set')
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_SET_GET_AND_REMOVE_LAST);
    this.setTooltip(Blockly.Msg.SET_POP_TOOLTIP);
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['set_clear'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendValueInput('SET')
        .setCheck('Set')
    this.appendDummyInput("")        
        .appendField(Blockly.Msg.SET_CLEAR);  
    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['set_operate'] = {
  init: function() {
    
    this.appendDummyInput("")
      .appendField(Blockly.blockpy_set)
    this.appendValueInput('SET1')
        .setCheck('Set')  
  var operate =
        [[Blockly.blockpy_set_union, 'union'],
        [Blockly.blockpy_set_intersection, 'intersection'],[Blockly.blockpy_set_difference, 'difference']];
    this.setColour(Blockly.Blocks.set.HUE);    
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_and_set)    
    this.appendValueInput('SET2')
        .setCheck('Set')       
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_set_get_operate)
        .appendField(new Blockly.FieldDropdown(operate), 'OPERATE')

    this.setInputsInline(true);
    this.setOutput(true, "set");
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OPERATE');
      var TOOLTIPS = {
        'union': Blockly.MIXLY_TOOLTIP_SET_UNION,
        'intersection': Blockly.MIXLY_TOOLTIP_SET_INTERSECTION,
        'difference': Blockly.MIXLY_TOOLTIP_SET_DIFFERENCE
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['set_operate_update'] = {
  init: function() {
    this.appendDummyInput("")
      .appendField(Blockly.blockpy_set)
      
    this.appendValueInput('SET1')
        .setCheck('Set')  
  var operate_update =
        [[Blockly.blockpy_set_union, 'update'],
        [Blockly.blockpy_set_intersection, 'intersection_update'],
        [Blockly.blockpy_set_difference, 'difference_update']];
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_and_set)   
    this.appendValueInput('SET2')
        .setCheck('Set')      
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_set_get_operate)
        .appendField(new Blockly.FieldDropdown(operate_update), 'OPERATE')
         
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_set_update)  
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OPERATE');
      var TOOLTIPS = {
        'update': Blockly.MIXLY_TOOLTIP_SET_UPDATE,
        'intersection_update': Blockly.MIXLY_TOOLTIP_SET_INTERSECTION_UPDATE,
        'difference_update': Blockly.MIXLY_TOOLTIP_SET_DIFFERENCE_UPDATE
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['set_add_discard'] = {
  init: function() {
    this.appendDummyInput("")
      .appendField(Blockly.blockpy_set)
      
    this.appendValueInput('SET')
        .setCheck('Set')  
  var changenum =
        [[Blockly.MIXLY_blockpy_set_add, 'add'],[Blockly.MIXLY_blockpy_set_discard, 'discard']];
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MID)        
        .appendField(new Blockly.FieldDropdown(changenum), 'OPERATE')
    this.appendValueInput('data')
        .setCheck(Number)
        .appendField(Blockly.Msg.blockpy_SET_VARIABLES_NAME)    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OPERATE');
      var TOOLTIPS = {
        'add': Blockly.Msg.SET_ADD_TOOLTIP,
        'discard': Blockly.Msg.SET_DISCARD_TOOLTIP,
        
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['set_sub'] = {
  init: function() {
     this.appendDummyInput("")
      .appendField(Blockly.blockpy_set)
      
    this.appendValueInput('SET1')
        .setCheck('Set') 
  var sub_super =
        [[Blockly.blockpy_set_sub, 'issubset'],
        [Blockly.blockpy_set_super, 'issuperset']];
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_is_set) 
    this.appendValueInput('SET2')
        .setCheck('Set')       
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_set_of)
        .appendField(new Blockly.FieldDropdown(sub_super), 'OPERATE')
        

    this.setInputsInline(true);
    this.setOutput(true, Boolean);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OPERATE');
      var TOOLTIPS = {
        'issubset': Blockly.MIXLY_TOOLTIP_SET_SUB,
        'issuperset': Blockly.MIXLY_TOOLTIP_SET_SUPER
        
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['set_update'] = {
 init: function() {
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_set)
    this.appendValueInput('SET')
        .setCheck('Set')
    this.setColour(Blockly.Blocks.set.HUE);
    this.appendValueInput('VAR')
        .setCheck([String,'List'])
        .appendField(Blockly.blockpy_set_add_update);    
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.SET_UPDATE_TOOLTIP); 
  }
};

// Blockly.Blocks['set_change_to'] = {
//   init: function() {
//     var OPERATORS =
//         [[Blockly.MIXLY_MICROBIT_TYPE_LIST, 'list'],
//          [Blockly.MIXLY_MICROBIT_TYPE_TUPLE, 'tuple']
//         ];
//     this.setColour(Blockly.Blocks.set.HUE);
//     this.appendValueInput('VAR')
//         .setCheck("Set")
//         // .appendField(Blockly.blockpy_USE_LIST);   
//     this.appendDummyInput("")
//         .appendField(Blockly.Msg.A_TO_B)
//         .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
//     this.setInputsInline(true);
//     this.setOutput(true);
//     var thisBlock = this;
//     this.setTooltip(function() {
//       var mode = thisBlock.getFieldValue('OP');
//       var TOOLTIPS = {
//         'list': Blockly.Msg.SET_TO_LISTS,
//         'tuple': Blockly.Msg.SET_TO_TUPLE,
//       };
//       return TOOLTIPS[mode];
//     });
//   }
// };