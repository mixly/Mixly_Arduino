'use strict';

goog.provide('Blockly.Blocks.math');

goog.require('Blockly.Blocks');


Blockly.Blocks.math.HUE = 230;

Blockly.FieldTextInput.math_number_validator = function(text) {
  //return window.isNaN(text) ? null : String(text);
  return String(text);//不再校验
};

Blockly.Blocks['math_number'] = {
  /**
   * Block for numeric value.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('0',
        Blockly.FieldTextInput.math_number_validator), 'NUM');
    this.setOutput(true, Number);
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

Blockly.Blocks['math_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
         [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
         [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
         [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
		 [Blockly.Msg.MATH_QUYU_SYMBOL, 'QUYU'],
         [Blockly.Msg.MATH_POWER_SYMBOL, 'POWER']];
    //this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('A')
        .setCheck(Number);
    this.appendValueInput('B')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
		'QUYU':Blockly.Msg.MATH_MODULO_TOOLTIP,
        'POWER': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_bit'] = {
  init: function() {
    var OPERATORS =
        [['&', '&'],
         ['|', '|'],
        ['>>', '>>'],
        ['<<', '<<']];
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('A')
        .setCheck(Number);
    this.appendValueInput('B')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
	this.setTooltip("位运算");
  }
};

Blockly.Blocks['math_trig'] = {
  /**
   * Block for trigonometry operators.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [['sin', 'SIN'],
         ['cos', 'COS'],
         ['tan', 'TAN'],
         ['asin', 'ASIN'],
         ['acos', 'ACOS'],
         ['atan', 'ATAN'],
         ['ln', 'LN'],
         ['log10', 'LOG10'],
         ['e^', 'EXP'],
         ['10^', 'POW10'],
         ['++', '++'],
         ['--', '--'],
        ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'SIN': Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
        'COS': Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
        'TAN': Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
        'ASIN': Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
        'ACOS': Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
        'ATAN': Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
      };
      return TOOLTIPS[mode];
    });
  }
};

//取整等
Blockly.Blocks['math_to_int']= {
  init: function() {
	var OPERATORS =
        [[Blockly.LANG_MATH_TO_ROUND, 'round'],
         [Blockly.LANG_MATH_TO_CEIL, 'ceil'],
         [Blockly.LANG_MATH_TO_FLOOR, 'floor'],
		 [Blockly.Msg.MATH_ABS, 'abs'],
         [Blockly.Msg.MATH_SQ, 'pow'],
         [Blockly.Msg.MATH_SQRT, 'sqrt']];
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput('A')
        .setCheck(Number)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'sqrt': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
        'abs': Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
        'sq': Blockly.Msg.MATH_SINGLE_TOOLTIP_SQ,
        'log': Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
        'round': Blockly.Msg.MATH_SINGLE_TOOLTIP_ROUND,
        'ceil': Blockly.Msg.MATH_SINGLE_TOOLTIP_CEIL,
        'floor': Blockly.Msg.MATH_SINGLE_TOOLTIP_FLOOR
      };
      return TOOLTIPS[mode];
    });
  }
};
//最大最小值
Blockly.Blocks['math_max_min']= {
  init: function() {
	var OPERATORS =
        [[Blockly.MIXLY_MAX, 'max'],
		 [Blockly.MIXLY_MIN, 'min'],
        ];
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput('A')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP')
		.appendField('(');
	this.appendValueInput('B')
        .setCheck(Number)
		.setAlign(Blockly.ALIGN_RIGHT)
        .appendField(',');
	this.appendDummyInput('')
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(')');
	this.setInputsInline(true);
    this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'max': Blockly.MIXLY_TOOLTIP_MATH_MAX,
        'min': Blockly.MIXLY_TOOLTIP_MATH_MIN
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['math_random_seed'] = {
    init: function () {
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput()
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

Blockly.Blocks['math_random_boolean'] = {
    init: function() {
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(true, Boolean);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RANDOM_BOOLEAN);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MATH_RANDOM_INT_TOOLTIP);
    }
};

Blockly.Blocks['math_constrain'] = {
  /**
   * Block for constraining a number between two limits.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('VALUE')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_CONSTRAIN);
    this.appendValueInput('LOW')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_LOW);
    this.appendValueInput('HIGH')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_CONSTRAIN_INPUT_HIGH);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MATH_CONSTRAIN_TOOLTIP);
  }
};

Blockly.Blocks.base_map = {
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_MAP)
        .setCheck(Number);
    this.appendValueInput("fromLow", Number)
        .appendField(Blockly.MIXLY_MAP_FROM)
        .setCheck(Number);
    this.appendValueInput("fromHigh", Number)
        .appendField(",")
        .setCheck(Number);
    this.appendValueInput("toLow", Number)
        .appendField(Blockly.MIXLY_MAP_TO)
        .setCheck(Number);
    this.appendValueInput("toHigh", Number)
        .appendField(",")
        .setCheck(Number);
    this.appendDummyInput("")
	      .appendField("]");
    this.setInputsInline(true);
    this.setOutput(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_MATH_MAP);
  }
};