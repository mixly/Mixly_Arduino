'use strict';

goog.provide('Blockly.Blocks.variables');

goog.require('Blockly.Blocks');


Blockly.Blocks.variables.HUE = 330//'#af5180'//330;

// ************************************************************************
// THIS SECTION IS INSERTED INTO BLOCKLY BY BLOCKLYDUINO.
//  Blockly.Blocks['variables_declare'] = {
//  // Variable setter.
//   init: function() {
//     this.setColour(Blockly.Blocks.variables.HUE);
//     this.appendValueInput('VALUE', null)
//         .appendField(Blockly.MIXLY_DECLARE)
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
//         //.appendField(Blockly.MIXLY_AS)
//         //.appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_JS_TYPE_NUMBER, 'number'], [Blockly.MIXLY_MICROBIT_JS_TYPE_STRING, 'string'], [Blockly.MIXLY_MICROBIT_JS_TYPE_BOOLEAN, 'boolean']]), 'TYPE')
// 	    .appendField(Blockly.MIXLY_VALUE);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.MIXLY_TOOLTIP_VARIABLES_DECLARE);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setTitleValue(newName, 'VAR');
//     }
//   }
// };
// ************************************************************************

Blockly.Blocks['variables_get'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'VAR')
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

// Blockly.Blocks['variables_set'] = {
//   init: function() {
//     this.setColour(Blockly.Blocks.variables.HUE);
//     this.appendValueInput('VALUE')
//         .appendField(new Blockly.FieldTextInput(''), 'VAR')
// 		.appendField(Blockly.LANG_VARIABLES_SET_TITLE);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
//   },
//   getVars: function() {
//     return [this.getFieldValue('VAR')];
//   },
//   renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//       this.setFieldValue(newName, 'VAR');
//     }
//   }/*,
//   onchange: function() {
// 	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
// 	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
// 		  this.setWarningText(null);
// 	  }else{
// 		  this.setWarningText(Blockly.MIXLY_WARNING_NOT_DECLARE);
// 	  }
//   }*/
// };
Blockly.Blocks['variables_set'] = {
   init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VALUE')
        .appendField(new Blockly.FieldTextInput(''), 'VAR')
		.appendField(Blockly.LANG_VARIABLES_SET_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
  },
  getVars: function() {
    var varValue = this.getFieldValue('VAR');
    if(varValue == null){
      return [];
    }
    return varValue.split(",");
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
         [
          [Blockly.LANG_MATH_INT, "int"],
          [Blockly.LANG_MATH_FLOAT, "float"],
          [Blockly.LANG_MATH_BOOLEAN, "bool"],
          // [Blockly.MIXLY_MICROPYTHON_TYPE_COMPLEX, "complex"],
          [Blockly.LANG_MATH_STRING, "str"],
          [Blockly.MIXLY_MICROBIT_TYPE_LIST, "list"],
          [Blockly.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
          [Blockly.MIXLY_MICROBIT_TYPE_DICT,"dict"],
          [Blockly.MIXLY_MICROBIT_TYPE_SETS,"set"]
          ];
        this.appendValueInput('MYVALUE')
            .appendField(new Blockly.FieldDropdown(DATATYPES), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        this.setOutput(true);
        // this.setInputsInline(true);
       
    }
};


Blockly.Blocks['variables_global'] = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
        this.appendValueInput("VAR")
        .appendField(Blockly.MIXLY_PYTHON_GLOBAL)
        .setCheck("var");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_INLINE_TOOLTIP);
  }
};


Blockly.Blocks.controls_type = {
  init: function() {
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput("DATA")
        .appendField(Blockly.MICROBIT_PYTHON_TYPE);
    // this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.MICROBIT_PYTHON_TYPE);
  }
};


Blockly.Blocks.controls_typeLists = {
    init: function() {
        this.setColour(Blockly.Blocks.variables.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_PY_CONTORL_GET_TYPE)
            .appendField(new Blockly.FieldDropdown([
              [Blockly.MIXLY_MICROBIT_TYPE_INT, "int"],
              [Blockly.MIXLY_MICROBIT_TYPE_FLOAT, "float"],
              [Blockly.MIXLY_MICROBIT_TYPE_STRING, "str"],
              [Blockly.MIXLY_MICROBIT_TYPE_LIST, "list"],
              [Blockly.MIXLY_MICROBIT_TYPE_TUPLE, "tuple"],
              [Blockly.MIXLY_MICROBIT_TYPE_DICT,"dict"],
              [Blockly.MIXLY_MICROBIT_TYPE_SETS,"set"],
              // [Blockly.MIXLY_MICROBIT_TYPE_IMAGE,"image"],
              [Blockly.MIXLY_MICROBIT_TYPE_NONE,"NoneType"]]), "type");
            //整数、浮点数、字符串、列表、元组、字典、集合、图像不太对, unfinished
        this.setInputsInline(true);
        this.setOutput(true);
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('type');
        var mode0 = Blockly.MICROBIT_controls_TypeLists;
        var TOOLTIPS = {
        'int': Blockly.MIXLY_MICROBIT_TYPE_INT,
        'float': Blockly.MIXLY_MICROBIT_TYPE_FLOAT,
        'str': Blockly.MIXLY_MICROBIT_TYPE_STRING,
        'list': Blockly.MIXLY_MICROBIT_TYPE_LIST,
        'tuple':Blockly.MIXLY_MICROBIT_TYPE_TUPLE,
        'dict': Blockly.MIXLY_MICROBIT_TYPE_DICT,
        'set': Blockly.MIXLY_MICROBIT_TYPE_SETS,
        'image':Blockly.MIXLY_MICROBIT_TYPE_IMAGE,
        'NoneType': Blockly.MIXLY_MICROBIT_TYPE_NONE
      };
      return mode0 + TOOLTIPS[mode];
    });
    }
};