'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 0//'#3288dd';

Blockly.Blocks['requests_get'] = {
  init: function() {
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendValueInput("DOMAIN")
      .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  this.appendDummyInput("")
  
      .appendField(Blockly.blockpy_REQUESTS_GET)
      .appendField(new Blockly.FieldTextInput('response'), 'VAR')
                       
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  this.setTooltip(Blockly.blockpy_REQUESTS_GET_TOOLTIP);
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
 
}


Blockly.Blocks['requests_attribute'] = {
  init: function() {
     this.appendValueInput('VAL')

  var attr =
        [[Blockly.blockpy_REQUESTS_GET_ATTR_STATUS_CODE, 'status_code'],[Blockly.blockpy_REQUESTS_GET_ATTR_TEXT, 'text']
        ,[Blockly.blockpy_REQUESTS_GET_ATTR_COOKIES, 'cookies'],[Blockly.blockpy_REQUESTS_GET_ATTR_CONTENT, 'content']];
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_NOVA_GET_STAT)
        .appendField(new Blockly.FieldDropdown(attr), 'ATTR')
        

  this.setInputsInline(true);
   this.setOutput(true, String);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'clear': Blockly.MIXLY_TOOLTIP_TURTEL_CLEAR,
        'reset': Blockly.MIXLY_TOOLTIP_TURTEL_RESET,
        'home': Blockly.MIXLY_TOOLTIP_TURTEL_HOME
      };
      return TOOLTIPS[mode];
    });
  }
};



Blockly.Blocks['requests_method'] = {
  init: function() {
    this.appendValueInput("DOMAIN")
      .appendField(Blockly.Msg.DISPLAY_IMAGE_LET2)
      .setCheck(String);
  var method =
        [['post', 'post'],['put', 'put'],
        ['delete', 'delete'],['head', 'head'],
        ['option', 'option']];
    this.setColour(Blockly.Blocks.communicate.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_CONDUCT)
        .appendField(new Blockly.FieldDropdown(method), 'DIR')
    this.appendDummyInput("")
        .appendField(Blockly.blockpy_REQUESTS)    
        

  this.setInputsInline(true);
   this.setPreviousStatement(true);
    this.setNextStatement(true);
  var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('DIR');
      var TOOLTIPS = {
        'forward': Blockly.MIXLY_TOOLTIP_TURTEL_FORWARD,
        'backward': Blockly.MIXLY_TOOLTIP_TURTEL_BACKWARD
      };
      return TOOLTIPS[mode];
    });
  }
};