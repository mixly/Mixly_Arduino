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
     var file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkBAMAAAB/KNeuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///////////////////////////////+tNPsIAAAAIdFJOUwAe1q4KRGaFPS0VAQAAAKlJREFUGNNVkD0LwkAMhlNsnUvBH+DmKnXoeODgWgXBsaOj+AGuVfTys8318l7OTA/hTe7JEWmVNwekA/fAHfNSsVoxew0/mfkbeSvo6wkLSbx0tJH2XdPS/pClsfxs7TA5WOQNl5M9X3bMF8RlS608z+JhFOZNMowybftw4GDvjHmTsc84PJJ4iPbgWcZVxuEUMHXKvS2dZHVgxJHpV4qr4Brei+Oe/usHT1JfDpNGeM0AAAAASUVORK5CYII=";
     
    } else {
      var file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkBAMAAAB/KNeuAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURQAAAP///////////////////////////////+tNPsIAAAAIdFJOUwAe1q4KRGaFPS0VAQAAAKpJREFUGNNV0bEKAjEMBuActOd6KIKrg+h4cII3Cg6u5yA6Ot4DONxcUfPYJmnaxn/6KEmaUoD/LK+XxAUibhuhR85bvBLjQHR99DqXIL7ItTo0xdyQ3RrvjWlQZQyT8cnYjcXgbl2XzBmNe5kv4WUfar6kUc9o56N6nh4Zy1NrHZ8iuSN+lB5LCR0HnXIuy/hd7qymUs3bf7WajsNQrn9CHr7Jn+IOaUH4ATxJW2wDnL5kAAAAAElFTkSuQmCC";
    }
    return new Blockly.FieldImage(file, 7, 12, '"');
  }
};


Blockly.Blocks['text_join'] = {
  init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('A')
        .setCheck([String,Number]);
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
        [[Blockly.MIXLY_TO_INT, 'toInt'],
        [Blockly.MIXLY_TO_FLOAT, 'toFloat']];
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
		.appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('TOWHAT');
      var TOOLTIPS = {
        'toInt': Blockly.MIXLY_TOOLTIP_TEXT_TOINT,
        'toFloat': Blockly.MIXLY_TOOLTIP_TEXT_TOFLOAT
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
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_TOASCII)
            .appendField("'")
            .appendField(new Blockly.FieldTextInput('',Blockly.FieldTextInput.char_validator), 'TEXT')
            .appendField("'");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_TOASCII);
    }
};

Blockly.Blocks['number_to_text'] = {
    init: function () {
      var TO_INT_FLOAT =
        [[Blockly.Msg.MATH_BIN, 'BIN'],
        [Blockly.Msg.MATH_OCT, 'OCT'],
        [Blockly.Msg.MATH_DEC, 'DEC'],
        [Blockly.Msg.MATH_HEX, 'HEX']];
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput('VAR')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_TOSTRING)
            .appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
        this.setOutput(true, String);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_TOTEXT);
    }
};

Blockly.Blocks['number_to_text_'] = {
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
  this.setTooltip(Blockly.MIXLY_TOOLTIP_TEXT_LENGTH);
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
  var self = this;
  this.setTooltip(function(){
    return Blockly.MIXLY_TOOLTIP_TEXT_FIND_CHAR_AT.replace('%1',Blockly.Arduino.valueToCode(self, 'VAR',Blockly.Arduino.ORDER_ATOMIC));
  });
  } 
}

Blockly.Blocks['text_equals_starts_ends']={
init: function() {
	var TEXT_DOWHAT =
        [[Blockly.MIXLY_EQUALS, 'equals'],
        [Blockly.MIXLY_STARTSWITH, 'startsWith'],
		[Blockly.MIXLY_ENDSWITH, 'endsWith']];
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("STR1")
        .setCheck([String,Number]);
	this.appendValueInput("STR2")
        .appendField(new Blockly.FieldDropdown(TEXT_DOWHAT), 'DOWHAT')
        .setCheck([String,Number]);
	this.setOutput(true, [Boolean,Number]);
	this.setInputsInline(true);
  var self = this;
  this.setTooltip(function(){
    var op = self.getFieldValue('DOWHAT');
      var TOOLTIPS = {
        'equals': Blockly.MIXLY_EQUALS,
        'startsWith': Blockly.MIXLY_STARTSWITH,
        'endsWith':Blockly.MIXLY_ENDSWITH
      };
      return Blockly.MIXLY_TOOLTIP_TEXT_EQUALS_STARTS_ENDS.replace('%1',TOOLTIPS[op]).replace('%2',Blockly.Arduino.valueToCode(self, 'STR2',Blockly.Arduino.ORDER_ATOMIC));
  });
  }
}

Blockly.Blocks['text_compareTo']={
init: function() {
    this.setColour(Blockly.Blocks.texts.HUE);
	this.appendValueInput("STR1")
       .setCheck([String,Number]);
	this.appendValueInput("STR2")
        .appendField(Blockly.MIXLY_COMPARETO)
       .setCheck([String,Number]);
	this.setOutput(true, Number);
	this.setInputsInline(true);
	this.setTooltip(Blockly.MIXLY_COMPARETO_HELP);
  }
}