'use strict';

goog.provide('Blockly.Blocks.texts');

goog.require('Blockly.Blocks');


Blockly.Blocks.texts.HUE = 160;

Blockly.Blocks['text'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    //this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, String);
    this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.FieldTextInput.char_validator = function(text) {
  if (text.length > 1){
	  if(text.charAt(0) === "\\"){
		  var charAtOne = text.charAt(1); 
		  if(charAtOne === "0" || 
		     charAtOne === "b" ||
		     charAtOne === "f" ||
		     charAtOne === "n" ||
		     charAtOne === "r" ||
		     charAtOne === "t" ||
		     charAtOne === "\\" ||
		     charAtOne === "'" ){
			 return String(text).substring(0, 2);
		  }else if(charAtOne === "x" && text.charAt(2) === "0" && text.charAt(3) === "B"){
			  return String(text).substring(0, 4);
		  } 
	  }
  }
  return String(text).substring(0, 1);
};

Blockly.Blocks['text_char'] = {
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput('',Blockly.FieldTextInput.char_validator), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, Number);
    this.setTooltip(Blockly.Msg.TEXT_CHAR_TOOLTIP);
  },
  newQuote_: function(open) {
    if (open == true) {
      var file = '../../media/quote2.png';
    } else {
      var file = '../../media/quote3.png';
    }
    return new Blockly.FieldImage(file, 7, 12, '"');
  }
};


Blockly.Blocks['text_join'] = {
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('A')
        .setCheck([String, Number]);
    this.appendValueInput('B')
        .setCheck([String,Number])
        .appendField(Blockly.MIXLY_TEXT_JOIN);
    this.setInputsInline(true);
	this.setOutput(true, String);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_JOIN);
  }
};

Blockly.Blocks['text_to_number'] = {
  init: function() {
	var TO_INT_FLOAT =
        [[Blockly.MIXLY_TO_INT, 'parseInt']];
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
		.appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('TOWHAT');
      var TOOLTIPS = {
        'parseInt': Blockly.MIXLY_TOOLTIP_TEXT_TOINT,
        'parseFloat': Blockly.MIXLY_TOOLTIP_TEXT_TOFLOAT
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['ascii_to_char'] = {
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('VAR')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_TOCHAR);
	this.setOutput(true, String);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_TOCHAR);
  }
};

Blockly.Blocks['char_to_ascii'] = {
    init: function () {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.MIXLY_TOASCII);
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_TOASCII);
    }
};

Blockly.Blocks['number_to_text'] = {
    init: function () {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_TOSTRING);;
        this.setOutput(true, String);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_TOTEXT);
    }
};

Blockly.Blocks['text_length']={
init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("VAR")
        .appendField(Blockly.MIXLY_LENGTH)
        .setCheck(String);
	this.setOutput(true, Number);
  }
}

Blockly.Blocks['text_char_at']={
init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("VAR")
        .setCheck(String);
	this.appendValueInput("AT")
        .appendField(Blockly.Msg.TEXT_CHARAT)
        .setCheck(Number);
	this.appendDummyInput()
		.appendField(Blockly.Msg.TEXT_CHARAT2);
	this.setOutput(true, Number);
	this.setInputsInline(true);
  }
}
Blockly.Blocks['text_substring']={
init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("VAR")
        .setCheck(String);
	this.appendValueInput("START")
        .appendField(Blockly.Msg.TEXT_CHARAT)
        .setCheck(Number);
	this.appendValueInput("END")
        .appendField(Blockly.Msg.VARIABLES_SET_TAIL)
        .setCheck(Number);
	this.appendDummyInput()
		.appendField(Blockly.Msg.TEXT_CHARAT2);
	this.setOutput(true, Number);
	this.setInputsInline(true);
  }
}
Blockly.Blocks['text_equals_starts_ends']={
init: function() {
	var TEXT_DOWHAT =
        [[Blockly.MIXLY_EQUALS, '==='],
        [Blockly.MIXLY_STARTSWITH, 'startsWith'],
		[Blockly.MIXLY_ENDSWITH, 'endsWith']];
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("STR1")
        .setCheck(String);
	this.appendValueInput("STR2")
        .appendField(new Blockly.FieldDropdown(TEXT_DOWHAT), 'DOWHAT')
        .setCheck(String);
	this.setOutput(true, [Boolean,Number]);
	this.setInputsInline(true);
  }
}

Blockly.Blocks['text_compareTo']={
init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("STR1")
        .setCheck(String);
	this.appendValueInput("STR2")
        .appendField(Blockly.MIXLY_COMPARETO)
        .setCheck(String);
	this.setOutput(true, Number);
	this.setInputsInline(true);
	this.setTooltip(Blockly.MIXLY_COMPARETO_HELP);
  }
}