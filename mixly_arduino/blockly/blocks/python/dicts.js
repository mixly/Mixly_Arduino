/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dictionary blocks for Blockly.
 * @author acbart@vt.edu (Austin Cory Bart)
 */
'use strict';

goog.provide('Blockly.Blocks.dicts');

goog.require('Blockly.Blocks');


Blockly.Blocks.dicts.HUE = 345;



Blockly.Blocks['dicts_create_with'] = {

    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */

    init: function () {
        this.setColour(Blockly.Blocks.dicts.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
            .appendField(new Blockly.FieldLabel(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH), 'TIP')
        this.itemCount_ = 3;
        this.updateShape_();
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
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
            workspace.newBlock('dicts_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('dicts_create_with_item');
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
        if (this.itemCount_ == 0) {
            this.getField('TIP').setText(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
        } else {
            this.getField('TIP').setText(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH);
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i)
                    .setCheck(null)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(
                        new Blockly.FieldTextInput(
                            keyNames.length > i
                                ? keyNames[i]
                                : (i == 0 ? '"key"' :'"key'+(i+1)+'"')),
                        'KEY'+i)
                    .appendField(":")
            }
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



Blockly.Blocks['dicts_create_with_container'] = {

  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['dicts_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['dicts_keys'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
    this.appendDummyInput("")        
        .appendField(Blockly.Msg.DICT_KEYS);  
    this.setTooltip(Blockly.Msg.DICTS_KEYS_TOOLTIP);      
    this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_get'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    // this.appendDummyInput("")
  
    //     .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
        
    this.appendValueInput('DICT')
        .setCheck('Dict')    
    this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_GET_IN)
    this.appendDummyInput("")   
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_GET_VALUE);
       
    this.setOutput(true);
  this.setTooltip(Blockly.Msg.DICTS_GET_TOOLTIP);
  }
};

Blockly.Blocks['dicts_add_or_change'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
    this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_ADD)
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
    this.appendDummyInput()
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DICTS_ADD_OR_CHANGE_TOOLTIP);
  }
};


Blockly.Blocks['dicts_delete'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS);
    this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_DELETE_IN)
    this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_DELETE_VALUE);
       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.Msg.DICTS_DELETE_TOOLTIP);
  }
};


Blockly.Blocks['dicts_update'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT2')
        .setCheck('Dict')
        .appendField(Blockly.Msg.MAKE_DICT)      
    this.appendValueInput('DICT')
        .setCheck('Dict')
        .appendField(Blockly.Msg.DICT_UPDATE); 
    this.appendDummyInput("")        
        .appendField(Blockly.MIXLY_MID);    
    this.setTooltip(Blockly.Msg.DICTS_UPDATE_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_clear'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
    this.appendDummyInput("")        
        .appendField(Blockly.Msg.DICT_CLEAR);  
    this.setTooltip(Blockly.Msg.DICTS_CLEAR_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_items'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
  this.appendDummyInput("")        
        
        .appendField(Blockly.Msg.DICT_ITEMS);  
  this.setTooltip(Blockly.Msg.DICTS_ITEMS_TOOLTIP);      
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_values'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
  this.appendDummyInput("")        
        
        .appendField(Blockly.Msg.DICT_VALUES);  
  this.setTooltip(Blockly.Msg.DICTS_VALUES_TOOLTIP);      
  this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
  this.appendDummyInput("")
        .appendField(Blockly.Msg.LISTS_LENGTH_TITLE)
        
  this.setTooltip(Blockly.Msg.DICT_LENGTH_TOOLTIP);
  this.setOutput(true, Number);
  }
};

Blockly.Blocks['dicts_deldict'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
    this.appendDummyInput("")        
        
        .appendField(Blockly.Msg.DICT_DELDICT);  
    this.setTooltip(Blockly.Msg.DICTS_DEL_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

 Blockly.Blocks['dicts_add_change_del'] = {
  /**
   * Block for getting sublist.
   * @this Blockly.Block
   */
  init: function() {
   
    this['MODE'] =
        [[Blockly.Msg.DICTS_ADD_OR_CHANGE, 'INSERT'],
         
         [Blockly.MIXLY_MICROBIT_JS_DELETE_VAR, 'DELETE']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
    this.appendDummyInput('AT2')
    this.appendValueInput('KEY')
    this.appendDummyInput("")   
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE)
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
    this.updateAt_(true);
    this.setInputsInline(true);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    var b = this;
        this.setTooltip(function() {
            var e = b.getFieldValue("WHERE"),
                d = "";
            switch (e) {
            
            case "INSERT":
                d = Blockly.Msg.DICTS_ADD_TOOLTIP;
                break;
            case "DELETE":
                d = Blockly.Msg.DICTS_DELETE_TOOLTIP;
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
          var newAt = (value == 'INSERT') ;
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

Blockly.Blocks['dicts_pop'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict')
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_DICT_POP)
    this.appendValueInput('KEY')
    this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_GET_VALUE);    
    this.setTooltip(Blockly.Msg.DICT_POP_TOOLTIP);
    this.setInputsInline(true);
    this.setOutput(true);
  }
};

Blockly.Blocks['dicts_setdefault'] = {
  init: function() {
    this.setColour(Blockly.Blocks.dicts.HUE);
    this.appendValueInput('DICT')
        .setCheck('Dict');
    this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_SET_DEFAULT)
    this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_DEFAULT_VALUE);
    this.appendValueInput('VAR')    
       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.Msg.DICTS_SETDEFAULT_TOOLTIP);
  }
};

Blockly.Blocks['dicts_create_with_noreturn'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function () {
        this.setColour(Blockly.Blocks.dicts.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
            .appendField(new Blockly.FieldLabel(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH), 'TIP')
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, "Dict")
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
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
            workspace.newBlock('dicts_create_with_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('dicts_create_with_item');
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
        if (this.itemCount_ == 0) {
            this.getField('TIP').setText(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
        } else {
            this.getField('TIP').setText(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH);
            for (var i = 0; i < this.itemCount_; i++) {
                this.appendValueInput('ADD' + i)
                    .setCheck(null)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(
                        new Blockly.FieldTextInput(
                            keyNames.length > i
                                ? keyNames[i]
                                : (i == 0 ? '"key"' :'"key'+(i+1)+'"')),
                        'KEY'+i)
                    .appendField(":")
            }
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