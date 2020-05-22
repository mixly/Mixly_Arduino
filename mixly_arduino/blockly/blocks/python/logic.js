'use strict';

goog.provide('Blockly.Blocks.logic');

goog.require('Blockly.Blocks');


Blockly.Blocks.logic.HUE = 210;

Blockly.Blocks['logic_compare'] = {
  /**
   * Block for comparison operator.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = Blockly.RTL ? [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['>', 'LT'],
          ['\u2265', 'LTE'],
          ['<', 'GT'],
          ['\u2264', 'GTE']
        ] : [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE']
        ];
    //this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true, Boolean);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'EQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
        'NEQ': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
        'LT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
        'LTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
        'GT': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
        'GTE': Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
      };
      return TOOLTIPS[op];
    });
    this.prevBlocks_ = [null, null];
  },
  /**
   * Called whenever anything on the workspace changes.
   * Prevent mismatched types from being compared.
   * @this Blockly.Block
   */
  /*onchange: function(e) {
    var blockA = this.getInputTargetBlock('A');
    var blockB = this.getInputTargetBlock('B');
    // Disconnect blocks that existed prior to this change if they don't match.
    if (blockA && blockB &&
        !blockA.outputConnection.checkType_(blockB.outputConnection)) {
      // Mismatch between two inputs.  Disconnect previous and bump it away.
      // Ensure that any disconnections are grouped with the causing event.
      Blockly.Events.setGroup(e.group);
      for (var i = 0; i < this.prevBlocks_.length; i++) {
        var block = this.prevBlocks_[i];
        if (block === blockA || block === blockB) {
          block.unplug();
          block.bumpNeighbours_();
        }
      }
      Blockly.Events.setGroup(false);
    }
    this.prevBlocks_[0] = blockA;
    this.prevBlocks_[1] = blockB;
  }*/
};

Blockly.Blocks['logic_compare_continous'] = {
  
  init: function() {
    var OPERATORS1 = Blockly.RTL ? [          
          ['>', 'LT'],
          ['\u2265', 'LTE'],
          ['<', 'GT'],
          ['\u2264', 'GTE']
        ] : [          
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE']
        ];
    var OPERATORS2 = Blockly.RTL ? [          
          ['>', 'LT'],
          ['\u2265', 'LTE'],
          ['<', 'GT'],
          ['\u2264', 'GTE']
        ] : [          
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE']
        ];    
    //this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true, Boolean);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown(OPERATORS1), 'OP1');
    this.appendValueInput('C')
        .appendField(new Blockly.FieldDropdown(OPERATORS2), 'OP2');    
    this.setInputsInline(true);    
    this.setTooltip(Blockly.MIXLY_PYTHON_LOGIC_COMPARE_CONTINOUS_TOOLTIP);
    
  }
};

Blockly.Blocks['logic_operation'] = {
  /**
   * Block for logical operations: 'and', 'or'.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS =
        [[Blockly.Msg.LOGIC_OPERATION_AND, 'AND'],
         [Blockly.Msg.LOGIC_OPERATION_OR, 'OR']];
    //this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true, Boolean);
    this.appendValueInput('A')
        .setCheck([Boolean,Number]);
    this.appendValueInput('B')
        .setCheck([Boolean,Number])
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'AND': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
        'OR': Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['logic_negate'] = {
  /**
   * Block for negation.
   * @this Blockly.Block
   */
  init: function() {
    //this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true, Boolean);
	this.appendValueInput('BOOL')
        .setCheck([Number,Boolean])
        .appendField(Blockly.Msg.LOGIC_NEGATE_TITLE);
    //this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,
      //                  ['BOOL', Boolean, Blockly.ALIGN_RIGHT],
        //                Blockly.ALIGN_RIGHT);
    this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
  }
};

Blockly.Blocks['logic_boolean'] = {
  /**
   * Block for boolean data type: true and false.
   * @this Blockly.Block
   */
  init: function() {
    var BOOLEANS =
        [[Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'TRUE'],
         [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'FALSE']];
    //this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true, Boolean);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
  }
};

Blockly.Blocks['logic_null'] = {
  /**
   * Block for null data type.
   * @this Blockly.Block
   */
  init: function() {
    //this.setHelpUrl(Blockly.Msg.LOGIC_NULL_HELPURL);
    this.setColour(Blockly.Blocks.logic.HUE);
    this.setOutput(true);
    this.appendDummyInput()
        .appendField(Blockly.Msg.LOGIC_NULL);
    this.setTooltip(Blockly.Msg.LOGIC_NULL_TOOLTIP);
  }
};


Blockly.Blocks['logic_true_or_false'] = {
  init: function() {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);
	this.appendValueInput('C')
        .appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);
	this.setOutput(true);
    this.setInputsInline(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_LOGIT_TRUEORFALSE);
  }
};

Blockly.Blocks['logic_is_in'] = {
  init: function() {
    var BOOLEANS =
        [[Blockly.Msg.TEXT_APPEND_TO, 'in'],
         [Blockly.MIXLY_PYTHON_LOGIC_IS_NOT_IN, 'not in']];
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .setCheck([String,'List'])
        //.appendField(Blockly.Msg.TEXT_APPEND_TO)
        .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
    this.appendDummyInput("")
        .appendField(Blockly.MICROBIT_LOGIC_IS_IN);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg_IN);
  }
};

Blockly.Blocks['logic_is'] = {
  init: function() {
    var BOOLEANS =
        [[Blockly.MIXLY_PYTHON_LOGIC_IS, 'is'],
         [Blockly.MIXLY_PYTHON_LOGIC_IS_NOT, 'is not']];
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('A');
    this.appendValueInput('B')
        .appendField(new Blockly.FieldDropdown(BOOLEANS), 'BOOL');
        //.appendField(Blockly.MIXLY_PYTHON_LOGIC_IS);    
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_PYTHON_LOGIC_IS_TOOLTIP);
  }
};

Blockly.Blocks['logic_tobool'] = {
  init: function () {
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendValueInput('VAR')
    .appendField(Blockly.MIXLY_TOBOOL);
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_PYTHON_TOOLTIP_TOBOOL);
  }
};