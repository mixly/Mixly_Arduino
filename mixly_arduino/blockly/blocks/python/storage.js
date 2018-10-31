'use strict';

goog.provide('Blockly.Blocks.storage');

goog.require('Blockly.Blocks');

Blockly.Blocks.storage.HUE = 0//'#5d69c5'//0;

Blockly.Blocks.storage_fileopen = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("FILENAME")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE);
        //.appendField(new Blockly.FieldTextInput('filename.txt'), 'FILENAME');
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_READ, 'r'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE, 'w'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ, 'rb'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE, 'wb']]), 'MODE');
    this.appendValueInput("FILE")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_AS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
     var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_USE;
        var mode1 = Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_OPEN_FILE;
        var mode3 =Blockly.MIXLY_BELONG;
        var TOOLTIPS = {
        'r': Blockly.MIXLY_MICROBIT_PY_STORAGE_READ,
        'w': Blockly.MIXLY_MICROBIT_PY_STORAGE_WRITE,
        'rb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_READ,
        'wb':Blockly.MIXLY_MICROBIT_PY_STORAGE_BIT_WRITE
      };
      return mode0 + TOOLTIPS[mode]+mode3+mode1+mode2;
    });
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

Blockly.Blocks['storage_file_write'] = {
    init:function(){
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE);
        this.appendValueInput("FILE")
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
        //    .appendField(new Blockly.FieldTextInput('f'), 'FILE');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_MAKE+Blockly.MIXLY_MICROBIT_TYPE_STRING+Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE_WRITE);
    }
}

 Blockly.Blocks['storage_get_contents'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck('Variable')
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
     this.appendDummyInput()
         .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE,'read'],[Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE,'readline']]),'MODE');
     this.appendValueInput("SIZE")
         .setCheck(Number);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
     this.setInputsInline(true);
     this.setPreviousStatement(false); //in front of the block has something
     this.setNextStatement(false);  //beyond the ... has something
     this.setOutput(true, String);
     var thisBlock = this;
     this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('MODE');
        var mode0 = Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE;
        var mode2 = Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER;
        var TOOLTIPS = {
        'read': Blockly.MIXLY_MICROBIT_PY_STORAGE_NO_MORE_THAN_SIZE,
        'readline': Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE
      };
      return mode0 + TOOLTIPS[mode]+'x'+mode2;
    });
   }
 };

 Blockly.Blocks['storage_get_a_line'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FROM_FILE);
     this.setNextStatement(true);
     this.appendValueInput("SIZE")
         .setCheck(Number)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_ONE_LINE_NO_MORE_THAN_SIZE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CHARACTER);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, String);
     this.setTooltip(Blockly.MICROBIT_PYTHON_TYPE);
   }
 };

 Blockly.Blocks['storage_can_write_ornot'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, Boolean);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CAN_WRITE_ORNOT1);
   }
 };

 Blockly.Blocks['storage_get_filename'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_FILENAME);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, String);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILENAME);
   }
 };

 Blockly.Blocks['storage_close_file'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_CLOSE_FILE);
   }
 };

 Blockly.Blocks['storage_list_all_files'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true,'List');
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_LIST_ALL_FILES);
   }
 };
 Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE
 Blockly.Blocks['storage_delete_file'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
     this.setInputsInline(true);
     this.setPreviousStatement(true);
     this.setNextStatement(true);
     this.setOutput(false);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_DELETE_FILE);
   }
 };

 Blockly.Blocks['storage_get_file_size'] = {
   init: function() {
     this.setColour(Blockly.Blocks.storage.HUE);
     this.appendValueInput("FILE")
         .setCheck(String)
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE);
     this.appendDummyInput()
         .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_SIZE);
     this.setInputsInline(true);
     this.setPreviousStatement(false);
     this.setNextStatement(false);
     this.setOutput(true, Number);
     this.setTooltip(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET_FILE_SIZE+Blockly.MIXLY_MICROBIT_PY_STORAGE_SIZE);
   }
 };