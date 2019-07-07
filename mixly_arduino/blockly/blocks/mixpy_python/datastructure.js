'use strict';

goog.provide('Blockly.Blocks.DS');

goog.require('Blockly.Blocks');


Blockly.Blocks.DS.HUE = 80;

 Blockly.Blocks['ds_create_linkedlist'] = {

    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */

     init: function () {
      this.setColour(Blockly.Blocks.DS.HUE);
      this.appendDummyInput("")
          .appendField(new Blockly.FieldLabel(Blockly.Msg.DS_CREATE_LINKEDLIST_NEW))
      this.appendDummyInput("")
          .appendField(new Blockly.FieldLabel(Blockly.Msg.DS_CREATE_LINKEDLIST_HEAD))   
          .appendField(new Blockly.FieldTextInput('head'), 'VAR')
      this.appendDummyInput("")
          .appendField(new Blockly.FieldLabel(Blockly.Msg.DS_CREATE_LINKEDLIST_TYPE))   
          .appendField(new Blockly.FieldTextInput('tag'), 'TYPE')    
      this.appendDummyInput()
          .appendField(Blockly.Msg.DS_CREATE_LINKEDLIST_ATTRIBUTE);    
      this.itemCount_ = 1;
      this.updateShape_();
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setMutator(new Blockly.Mutator(['ds_create_linkedlist_item']));
      this.setTooltip(Blockly.Msg.DS_CREATE_LINKEDLIST_TOOLTIP);
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
      workspace.newBlock('ds_create_linkedlist_container');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('ds_create_linkedlist_item');
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
        }

        var keyNames = [];
        for (var i = 0; this.getInput('ADD' + i); i++) {
            //this.getInput('VALUE' + i).removeField("KEY"+i);
            keyNames.push(this.getFieldValue("KEY" + i))
            this.removeInput('ADD' + i);
          }
        // Rebuild block.
        //if (this.itemCount_ == 0) {
        //  this.getField('TIP').setText(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
       // } else {
        //  this.getField('TIP').setText(Blockly.Msg.DS_CREATE_LINKEDLIST_NEW);
          for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
              new Blockly.FieldTextInput(keyNames.length > i
                ? keyNames[i]
                : 'name'),
              'KEY'+i)
            .appendField("=")
          
        }
      }, getVars: function () {
        return [this.getFieldValue('VAR')];
      },
      renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };



    Blockly.Blocks['ds_create_linkedlist_container'] = {

  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);
    this.appendDummyInput()
    .appendField(Blockly.Msg.DS_CREATE_LINKEDLIST_CONTAINER_TITLE);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.DS_CREATE_LINKEDLIST_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['ds_create_linkedlist_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);
    this.appendDummyInput()
    .appendField(Blockly.Msg.DS_CREATE_LINKEDLIST_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DS_CREATE_LINKEDLIST_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};


Blockly.Blocks['ds_create_node'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_CREATE_NODE_USE)
        .appendField(new Blockly.FieldTextInput('tag'), 'TYPE')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DS_CREATE_NODE_NEW)
    this.appendValueInput('NODE')    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_CREATE_NODE_TOOLTIP);
  }
}

Blockly.Blocks['ds_get_node_attr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DS_GET_NODE_ATTR_NODE)   
    this.appendValueInput('NODE')    
    this.appendDummyInput("")          
        .appendField(Blockly.MIXLY_AIP_ATTR)
        .appendField(new Blockly.FieldTextInput('name'), 'TYPE')
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DICTS_ADD_VALUE)
    this.setOutput(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_GET_NODE_ATTR_TOOLTIP);
  }
}

Blockly.Blocks['ds_set_node_attr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DS_SET_NODE_ATTR_NODE)   
    this.appendValueInput('NODE')    
    this.appendDummyInput("")          
        .appendField(Blockly.MIXLY_AIP_ATTR)
        .appendField(new Blockly.FieldTextInput('name'), 'TYPE')
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.DS_SET_NODE_ATTR_SET)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_SET_NODE_ATTR_TOOLTIP);
  }
}

Blockly.Blocks['ds_add_node_by_name'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendValueInput('NODE')
        .appendField(Blockly.Msg.DS_ADD_NODE_HEAD_NODE)   
    var pos =
        [[Blockly.Msg.DS_ADD_NODE_BEFORE, 'before'],[Blockly.Msg.DS_ADD_NODE_AFTER, 'after']];    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_LINKEDLIST)
    this.appendValueInput('NODE2')
        .appendField(Blockly.Msg.DS_SET_NODE_ATTR_NODE)
    this.appendValueInput('NODE3')
        .appendField(new Blockly.FieldDropdown(pos), 'DIR')
        .appendField(Blockly.Msg.DS_ADD_NODE)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_ADD_NODE_TOOLTIP);
  }
}

Blockly.Blocks['ds_add_node_by_attr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendValueInput('NODE')
        .appendField(Blockly.Msg.DS_ADD_NODE_HEAD_NODE)   
    var pos =
        [[Blockly.Msg.DS_ADD_NODE_BEFORE, 'before'],[Blockly.Msg.DS_ADD_NODE_AFTER, 'after']];    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_LINKEDLIST)
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DS_CREATE_LINKEDLIST_ITEM_TITLE)
        .appendField(new Blockly.FieldTextInput('name'), 'TYPE')
    this.appendValueInput('VAR')
        .appendField(Blockly.MIXLY_AS)    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_ATTR)    
    this.appendValueInput('NODE3')
        .appendField(new Blockly.FieldDropdown(pos), 'DIR')
        .appendField(Blockly.Msg.DS_ADD_NODE)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_ADD_NODE_TOOLTIP);
  }
}

Blockly.Blocks['ds_del_node_by_name'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendValueInput('NODE')
        .appendField(Blockly.Msg.DS_ADD_NODE_HEAD_NODE)   
    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_LINKEDLIST)
    this.appendValueInput('NODE2')
        .appendField(Blockly.Msg.DS_DEL_NODE_NAME)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_DEL_NODE_TOOLTIP);
  }
}

Blockly.Blocks['ds_del_node_by_attr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendValueInput('NODE')
        .appendField(Blockly.Msg.DS_ADD_NODE_HEAD_NODE)   
    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_LINKEDLIST)
    this.appendDummyInput("")
        .appendField(Blockly.Msg.DS_DEL_NODE_ATTR)
        .appendField(new Blockly.FieldTextInput('name'), 'TYPE')
    this.appendValueInput('VAR')
        .appendField(Blockly.MIXLY_AS)    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_ADD_NODE_ATTR)    
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_DEL_NODE_TOOLTIP);
  }
}

Blockly.Blocks['ds_reverse_linkedlist'] = {
  init: function() {
    this.setColour(Blockly.Blocks.DS.HUE);    
    this.appendValueInput('NODE')
        .appendField(Blockly.Msg.DS_ADD_NODE_HEAD_NODE)   
    
    this.appendDummyInput("")          
        .appendField(Blockly.Msg.DS_REVERSE_LINKEDLIST)
    this.appendValueInput('NODE2')
        .appendField(Blockly.Msg.DS_REVERSE_LINKEDLIST_NEW_HEAD)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.DS_DEL_NODE_TOOLTIP);
  }
}