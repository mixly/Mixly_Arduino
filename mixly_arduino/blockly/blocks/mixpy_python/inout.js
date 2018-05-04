'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');



Blockly.Blocks['inout_input']={
init: function() {
    this.setColour(20);
    this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_raw_input)
        .setCheck(String);
    this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
  }
}

Blockly.Blocks['inout_print'] = {
  init: function() {
    this.setColour(20);
        this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_print);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.BLOCKPY_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['inout_print_inline'] = {
  init: function() {
    this.setColour(20);
        this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_print_inline);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_INLINE_TOOLTIP);
  }
};

Blockly.Blocks['inout_type_input'] = {
  init: function() {
    
  var input_type =
        [[Blockly.LANG_MATH_STRING, 'str'],[Blockly.LANG_MATH_INT, 'int']
        ,[Blockly.LANG_MATH_FLOAT, 'float']];
    this.setColour(20);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(new Blockly.FieldDropdown(input_type), 'DIR')
    this.appendValueInput("VAR")
        .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE)
        .setCheck(String);    

  this.setInputsInline(true);
   this.setOutput(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'str': Blockly.MIXLY_TOOLTIP_TURTEL_CLEAR,
        'int': Blockly.MIXLY_TOOLTIP_TURTEL_RESET,
        'float': Blockly.MIXLY_TOOLTIP_TURTEL_HOME
      };
      return TOOLTIPS[mode];
    });
  }
};