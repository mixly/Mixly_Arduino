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
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#id2");
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
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#id4");
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
    ['xor', '^'],
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
    this.setTooltip("");
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#id8");
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
    ['~', '~'],
    ];
    //this.setHelpUrl(Blockly.Msg.MATH_TRIG_HELPURL);
    this.setColour(Blockly.Blocks.math.HUE);
    this.setOutput(true, Number);
    this.appendValueInput('NUM')
    .setCheck(Number)
    .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#id17");
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
   [Blockly.Msg.MATH_SQ, 'sq'],
   [Blockly.Msg.MATH_SQRT, 'sqrt']];
   this.setColour(Blockly.Blocks.math.HUE);
   this.appendValueInput('A')
   .setCheck(Number)
   .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
   this.setOutput(true, Number);
   this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#id18");
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
//变量定义
Blockly.Blocks.arduino_variate_type= {
  init: function() { 
  var DATATYPES =
  [[Blockly.LANG_MATH_INT, 'int'],
  [Blockly.LANG_MATH_UNSIGNED_INT, 'unsigned int'],
  [Blockly.LANG_MATH_WORD, 'word'],
  [Blockly.LANG_MATH_LONG, 'long'],
  [Blockly.LANG_MATH_UNSIGNED_LONG, 'unsigned long'],
  [Blockly.LANG_MATH_FLOAT, 'float'],
  [Blockly.LANG_MATH_DOUBLE, 'double'],
  [Blockly.LANG_MATH_BOOLEAN, 'boolean'],
  [Blockly.LANG_MATH_BYTE, 'byte'],
  [Blockly.LANG_MATH_CHAR, 'char'],
  [Blockly.LANG_MATH_UNSIGNED_CHAR, 'unsigned char'],
  [Blockly.LANG_MATH_STRING, 'String'],
  ["uint8_t","uint8_t"],
  ["uint16_t","uint16_t"],
  ["uint32_t","uint32_t"],
  ["uint64_t","uint64_t"]];
  this.appendDummyInput()  
      .appendField(new Blockly.FieldDropdown(DATATYPES), "variate_type");
  this.setOutput(true, null);
  this.setColour(Blockly.Blocks.math.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};
//获取某个变量在内存中所占用的字节数
Blockly.Blocks.math_SizeOf= {
  init: function() { 
  this.appendValueInput("data")
  .setCheck(null)  
  .appendField(Blockly.MIXLY_GET+" "+Blockly.MIXLY_I2C_BYTES);
  this.setInputsInline(false);
  this.setOutput(true, null);
  this.setColour(Blockly.Blocks.math.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
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
   this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#min-max");
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
        // this.appendDummyInput()
        //     .appendField(Blockly.LANG_MATH_RANDOM_SEED);
        this.appendValueInput('NUM')
        .setCheck(Number)
        .appendField(Blockly.LANG_MATH_RANDOM_SEED);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_MATH_RANDOM_SEED);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#randomseed");
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
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#random");
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
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#constrain");
  }
};

Blockly.Blocks.base_map = {
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_MAP)
    .appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT,"map_int"],[Blockly.LANG_MATH_FLOAT,"map_float"]]), "maptype")
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
    this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/04.Mathematics.html#map");
  }
};

Blockly.Blocks['variables_operation'] = {
  init: function() {
    this.setColour(Blockly.Blocks.math.HUE);
    this.appendValueInput("variables")
    .setCheck(null);
    this.appendValueInput("data")
    .setCheck(null)
    .appendField(new Blockly.FieldDropdown([["+=","+"], ["-=","-"], ["*=","*"], ["/=","/"]]), "type");
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip();
 this.setHelpUrl("");
  }
};

Blockly.Blocks.math_auto_add_or_minus= {
  init: function() { 
  this.appendValueInput("math_auto_add_minus_output")
  .setCheck(null);
  this.appendDummyInput()  
  .appendField(new Blockly.FieldDropdown([["++","++"],["--","--"]]), "math_auto_add_minus_type");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(Blockly.Blocks.math.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};