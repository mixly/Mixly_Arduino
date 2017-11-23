'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


Blockly.Blocks.variables.HUE = 330;

// ************************************************************************
// THIS SECTION IS INSERTED INTO BLOCKLY BY BLOCKLYDUINO.
Blockly.Blocks['variables_declare'] = {
  // Variable setter.
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VALUE', null)
        .appendField(Blockly.MIXLY_DECLARE)
        .appendField(new Blockly.FieldTextInput('item'), 'VAR')
        //.appendField(Blockly.MIXLY_AS)
        //.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'number'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'string'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'boolean']]), 'TYPE')
	    .appendField(Blockly.MIXLY_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_VARIABLES_DECLARE);
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
// ************************************************************************

Blockly.Blocks['variables_get'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('item'), 'VAR')
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }/*,
  onchange: function() {
	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
		  this.setWarningText(null);
	  }else{
		  this.setWarningText(Blockly.MIXLY_WARNING_NOT_DECLARE);
	  }
  }*/
};

Blockly.Blocks['variables_set'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VALUE')
        .appendField(new Blockly.FieldTextInput('item'), 'VAR')
		.appendField(Blockly.LANG_VARIABLES_SET_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }/*,
  onchange: function() {
	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
		  this.setWarningText(null);
	  }else{
		  this.setWarningText(Blockly.MIXLY_WARNING_NOT_DECLARE);
	  }
  }*/
};
Blockly.Blocks['variables_set'] = {
   init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VALUE')
        .appendField(new Blockly.FieldTextInput('item'), 'VAR')
		.appendField(Blockly.LANG_VARIABLES_SET_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  }
};
/**
  * Block for basic data type change.
  * @this Blockly.Block
  */
Blockly.Blocks['variables_change'] = {
    init: function () {
        this.setColour(Blockly.Blocks.variables.HUE);
        var DATATYPES =
         [[Blockly.LANG_MATH_INT, 'int'],
          [Blockly.LANG_MATH_LONG, 'long'],
          [Blockly.LANG_MATH_FLOAT, 'float'],
          [Blockly.LANG_MATH_BOOLEAN, 'boolean'],
          [Blockly.LANG_MATH_BYTE, 'byte'],
          [Blockly.LANG_MATH_CHAR, 'char'],
          [Blockly.LANG_MATH_STRING, 'String']];
       
        this.appendValueInput('MYVALUE')
             .appendField(new Blockly.FieldDropdown(DATATYPES), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        this.setOutput(true);
       
    }
};




    