import * as Blockly from 'blockly/core';
import { Variables } from 'blockly/core';


const VARIABLES_HUE = 330;

// ************************************************************************
// THIS SECTION IS INSERTED INTO BLOCKLY BY BLOCKLYDUINO.
export const variables_declare = {
    // Variable setter.
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput('VALUE', null)
            .appendField(Blockly.Msg.MIXLY_DECLARE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GLOBAL_VARIABLE, "global_variate"], [Blockly.Msg.MIXLY_LOCAL_VARIABLE, "local_variate"]]), "variables_type")
            .appendField(new Blockly.FieldTextInput('item'), 'VAR')
            .appendField(Blockly.Msg.MIXLY_AS)
            .appendField(new Blockly.FieldDropdown(Variables.DATA_TYPE), "TYPE")
            .appendField(Blockly.Msg.MIXLY_VALUE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_VARIABLES_DECLARE);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};
// ************************************************************************

export const variables_get = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput('item'), 'VAR')
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }/*,
  onchange: function() {
	  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
	  if(Blockly.Arduino.definitions_['var_declare'+varName]){
		  this.setWarningText(null);
	  }else{
		  this.setWarningText(Blockly.Msg.MIXLY_WARNING_NOT_DECLARE);
	  }
  }*/
};

export const variables_set = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput('VALUE')
            .appendField(new Blockly.FieldTextInput('item'), 'VAR')
            .appendField(Blockly.Msg.MIXLY_VALUE2);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setFieldValue(newName, 'VAR');
        }
    }
};
/**
  * Block for basic data type change.
  * @this Blockly.Block
  */
export const variables_change = {
    init: function () {
        this.setColour(VARIABLES_HUE);
        this.appendValueInput('MYVALUE')
            .appendField(new Blockly.FieldDropdown(Variables.DATA_TYPE), 'OP');
        // Assign 'this' to a variable for use in the tooltip closure below.
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_VARIABLES_CHANGE);
    }
};




