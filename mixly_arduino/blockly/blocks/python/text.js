'use strict';

goog.provide('Blockly.Blocks.texts');

goog.require('Blockly.Blocks');


Blockly.Blocks.texts.HUE = 160//'#9ec440'//160;

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
        [[Blockly.MIXLY_TO_INT, 'int'],[Blockly.MIXLY_TO_FLOAT, 'float'],[Blockly.MIXLY_TO_BITES, 'b']];
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('VAR')
        .setCheck(String)
		.appendField(new Blockly.FieldDropdown(TO_INT_FLOAT), 'TOWHAT');
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('TOWHAT');
      var TOOLTIPS = {
        'int': Blockly.MIXLY_TOOLTIP_TEXT_TOINT,
        'float': Blockly.MIXLY_TOOLTIP_TEXT_TOFLOAT
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


Blockly.Blocks['text_char_at2'] = {
    init: function() {
        this.WHERE_OPTIONS = [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
                              [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
                              [Blockly.Msg.TEXT_GET_INDEX_RANDOM+1+Blockly.Msg.TEXT_CHARAT2, "RANDOM"]];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("VAR")
            .setCheck(String)
        //    .appendField(Blockly.MIXLY_MICROBIT_TYPE_LIST)
        this.appendValueInput("AT")
            .setCheck(Number)
        this.appendDummyInput()
            //.appendField(Blockly.MIXLY_MID)
            .appendField(Blockly.Msg.LISTS_GET_INDEX_GET, "MODE");
//            .appendField("", "SPACE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        // this.appendDummyInput().appendField(Blockly.MIXLY_DE);
        this.setInputsInline(!0);
        this.setOutput(!0);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE"),
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (a + " " + e) {
            case "GET FROM_START":
            case "GET FROM_END":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
                break;
            case "GET RANDOM":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
                break;
            case "GET_REMOVE FROM_START":
            case "GET_REMOVE FROM_END":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
                break;
            case "GET_REMOVE RANDOM":
                d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
                break;
            }
            if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", Blockly.Blocks.ONE_BASED_INDEXING ? "#1": "#0");
            return d
        })
        var thisBlock = this;
        this.setTooltip(function() {
        var mode = thisBlock.getFieldValue('WHERE');
        var TOOLTIPS = {
        'FROM_START': Blockly.Msg.LISTS_GET_INDEX_FROM_START,
        'FROM_END': Blockly.Msg.LISTS_GET_INDEX_FROM_END,
        'RANDOM': Blockly.Msg.TEXT_GET_INDEX_RANDOM
      };
      return Blockly.Msg.PROCEDURES_DEFRETURN_RETURN+Blockly.MIXLY_MICROBIT_TYPE_STRING+TOOLTIPS[mode]+'n'+Blockly.Msg.TEXT_CHARAT2;
    });
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("statement", !this.outputConnection);
        var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function(a) {
        var b = "true" == a.getAttribute("statement");
        this.updateStatement_(b);
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateStatement_: function(a) {
        a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
    },
    updateAt_: function(a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck(Number), Blockly.Msg.TEXT_CHARAT2 && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.TEXT_CHARAT2)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS,
        function(b) {
            var e = "FROM_START" == b || "FROM_END" == b;
            if (e != a) {
                var d = this.sourceBlock_;
                d.updateAt_(e);
                d.setFieldValue(b, "WHERE");
                return null
            }
        });
        this.getInput("AT").appendField(b, "WHERE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
    }
};


Blockly.Blocks['text_substring2'] = {
  /**
   * Block for getting sublist.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE_OPTIONS_1'] =
        [[Blockly.Msg.LISTS_GET_INDEX_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_INDEX_FROM_END, 'FROM_END'],
         [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, 'FIRST']];
    this['WHERE_OPTIONS_2'] =
        [[Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, 'FROM_START'],
         [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, 'FROM_END'],
         [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, 'LAST']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput("VAR")
        .setCheck(String)
        //.appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL)
    // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
    //   this.appendDummyInput('TAIL')
    //       .appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
    // }
    this.appendDummyInput('')
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    this.setInputsInline(true);
    this.setOutput(true, 'List');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg._GET_TEXT_SUBLIST_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck(Number);
      if (Blockly.Msg.TEXT_CHARAT2) {
        this.appendDummyInput('ORDINAL' + n)
            .appendField(Blockly.Msg.TEXT_CHARAT2);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
        function(value) {
          var newAt = (value == 'FROM_START') || (value == 'FROM_END');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(n, newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE' + n);
            return null;
          }
          return undefined;
        });
    this.getInput('AT' + n)
        .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
    // if (Blockly.Msg.LISTS_GET_SUBLIST_TAIL) {
    //   this.moveInputBefore('TAIL', null);
    // }
  }
};


Blockly.Blocks['text_equals_starts_ends']={
init: function() {
	var TEXT_DOWHAT =
        [[Blockly.MIXLY_EQUALS, '==='],
        [Blockly.MIXLY_STARTSWITH, 'startswith'],
		[Blockly.MIXLY_ENDSWITH, 'endswith']];
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