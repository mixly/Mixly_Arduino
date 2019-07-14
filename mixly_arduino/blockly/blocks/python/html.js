'use strict';

goog.provide('Blockly.Blocks.html');

goog.require('Blockly.Blocks');


Blockly.Blocks.html.HUE = '#1ec1e4';

Blockly.Blocks.html_document = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_DOCUMENT);
    this.appendStatementInput('HEAD')
        .appendField(Blockly.Msg.HTML_HEAD);
    this.appendStatementInput('BODY')
        .appendField(Blockly.Msg.HTML_BODY);
    this.setOutput(true);
  }
};

Blockly.Blocks.html_title = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_LEVEL)
        .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"],["3","3"],["4","4"],["5","5"],["6","6"]]), 'LEVEL');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_head_body = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.HTML_HEAD,"head"],
                                                [Blockly.Msg.HTML_BODY,"body"]]), 'LEVEL');
    this.appendStatementInput('DO')
        .appendField('');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_content = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.HTML_P,"p"],
                                                [Blockly.Msg.HTML_SPAN,"span"],
                                                [Blockly.Msg.HTML_FORM,"form"],
                                                [Blockly.Msg.HTML_TABLE,"table"],
                                                [Blockly.Msg.HTML_LINE,"tr"],
                                                [Blockly.Msg.HTML_CELL,"td"],
                                                [Blockly.Msg.HTML_OL,"ol"],
                                                [Blockly.Msg.HTML_UL,"ul"],
                                                [Blockly.Msg.HTML_LI,"li"]]), 'LEVEL')
    // this.appendValueInput('style')
    //     .appendField(Blockly.MIXLY_AIP_ATTR)
    //     .setAlign(Blockly.ALIGN_RIGHT);            
    this.appendStatementInput('DO')
        .appendField('');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_content_more = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField('<')
        .appendField(new Blockly.FieldTextInput('tag'),"LEVEL")
        .appendField('>')
    this.appendValueInput('style')
        .appendField(Blockly.MIXLY_AIP_ATTR)
        .setAlign(Blockly.ALIGN_RIGHT);            
    this.appendStatementInput('DO')
        .appendField('');
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_STYLE)
    this.appendStatementInput('STYLE');
    this.setOutput(true);
  }
};

Blockly.Blocks.html_form = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_FORM_CONTENT)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.HTML_TEXT,"text"],
                                                [Blockly.Msg.HTML_EMAIL,"email"],
                                                [Blockly.Msg.HTML_NUMBER,"number"],
                                                [Blockly.Msg.HTML_PASSWORD,"password"],
                                                [Blockly.Msg.HTML_CHECKBOX,"checkbox"],
                                                [Blockly.Msg.HTML_RADIOBUTTON,"radiobutton"],
                                                [Blockly.Msg.HTML_BUTTON,"button"],
                                                [Blockly.Msg.HTML_COLOUR,"colour"],
                                                [Blockly.Msg.HTML_DATE,"date"],
                                                [Blockly.Msg.HTML_LOCALTIME,"local time"],
                                                [Blockly.Msg.HTML_FILE,"file"],
                                                [Blockly.Msg.HTML_HIDDEN,"hidden"],
                                                [Blockly.Msg.HTML_IMAGE,"image"],
                                                [Blockly.Msg.HTML_MONTH,"month"],
                                                [Blockly.Msg.HTML_RANGE,"range"],
                                                [Blockly.Msg.HTML_RESET,"reset"],
                                                [Blockly.Msg.HTML_SEARCH,"search"],
                                                [Blockly.Msg.HTML_SUBMIT,"submit"],
                                                [Blockly.Msg.HTML_TELEPHONENUMBER,"telephone number"],
                                                [Blockly.Msg.HTML_TIME,"time"],
                                                [Blockly.Msg.HTML_URL,"url"],
                                                [Blockly.Msg.HTML_WEEK,"week"]]), 'LEVEL')
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_NAME)
        .appendField(new Blockly.FieldTextInput('car'),"NAME")
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_VALUE)
        .appendField(new Blockly.FieldTextInput('go'),"VALUE")
    this.appendValueInput('style')
        .appendField(Blockly.MIXLY_AIP_ATTR)
        .setAlign(Blockly.ALIGN_RIGHT);            
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style_content = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('property'),"KEY")
        .appendField(':')
        .appendField(new Blockly.FieldTextInput('value'),"VALUE")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_style_color = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('property'),"KEY")
        .appendField(':')
        .appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.html_text = {
  init: function() {
    this.setColour(Blockly.Blocks.html.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.HTML_TEXT)
        .appendField(new Blockly.FieldTextInput('text'),"TEXT");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};