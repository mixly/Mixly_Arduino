'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

/***************
*   IN / OUT   *
***************/
Blockly.Blocks.inout_digital_write2 = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_DIGITALWRITE_PIN)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_digital_read2 = {
  init: function() {
    this.setColour(20);
  this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_DIGITALREAD_PIN)
        .setCheck(Number);
  this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_DIGITAL_READ);
  }
};


/***************
*   CONTROL    *
***************/
Blockly.Blocks['controls_repeat_ext'] = {
  /**
   * Block for repeat n times (external number).
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.CONTROLS_REPEAT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES",
          // "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.loops.HUE,
      "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
    });
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
  }
};

/***************
*   MATH    *
***************/
Blockly.Blocks['math_random_seed'] = {
    init: function () {
        this.setColour(Blockly.Blocks.math.HUE);
        // this.appendDummyInput()
        //     .appendField(Blockly.LANG_MATH_RANDOM_SEED);
        this.appendValueInput('NUM')
            .setCheck(Number)
            .appendField(Blockly.LANG_MATH_RANDOM_SEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


Blockly.Blocks['math_random_int'] = {
  /**
   * Block for random integer between [X] and [Y].
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('FROM')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_RANDOM_INT_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
  }
};


Blockly.Blocks['math_random_float'] = {
  /**
   * Block for random integer between [X] and [Y].
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('FROM')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_RANDOM_FLOAT_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LANG_MATH_RANDOM_FLOAT_INPUT_TO);
    this.setInputsInline(true);
    this.setTooltip(Blockly.LANG_MATH_RANDOM_FLOAT_TOOLTIP2);
  }
};


Blockly.Blocks['math_random_boolean'] = {
    init: function() {
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(true, Boolean);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RANDOM_BOOLEAN);
        this.setInputsInline(true);
    }
};


Blockly.Blocks['math_random_random'] = {
    init: function() {
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(true, Number);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP);
    }
};


Blockly.Blocks['bin_to_number'] = {
  init: function() {
  var TO_INT_FLOAT =
        [[Blockly.MIXLY_TO_INT, 'int'],[Blockly.MIXLY_TO_FLOAT, 'float']];
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput('VAR')
        // .setCheck(String)
        .appendField(Blockly.Msg.MATH_BIN)
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


/***************
*   TEXT    *
***************/
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