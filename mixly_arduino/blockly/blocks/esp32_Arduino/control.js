'use strict';

goog.provide('Blockly.Blocks.loops');

goog.require('Blockly.Blocks');


Blockly.Blocks.loops.HUE = 120;

Blockly.Blocks.base_setup = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
	    .appendField(Blockly.MIXLY_SETUP);
	this.appendStatementInput('DO')
        .appendField('');
	this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_SETUP);
  }
};

Blockly.Blocks.controls_delay = {
  init: function() {
	var UNIT =
        [[Blockly.MIXLY_DELAY_MS, 'delay'],
		 [Blockly.MIXLY_DELAY_US, 'delayMicroseconds']];
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.MIXLY_DELAY)
		.appendField(new Blockly.FieldDropdown(UNIT), 'UNIT')
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};

Blockly.Blocks.controls_for = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_WITH)
        .appendField(new Blockly.FieldTextInput('i'), 'VAR');
    this.appendValueInput('FROM')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_FROM);
    this.appendValueInput('TO')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_TO);
    this.appendValueInput('STEP')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_STEP);
    this.appendStatementInput('DO')
        .appendField(Blockly.LANG_CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
	var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  },
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};

Blockly.Blocks.controls_whileUntil = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput('BOOL')
        .setCheck([Boolean,Number])
        .appendField(Blockly.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'MODE');
    this.appendStatementInput('DO')
        .appendField(Blockly.LANG_CONTROLS_WHILEUNTIL_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	var thisBlock = this;
	this.setTooltip(function() {
      var op = thisBlock.getFieldValue('MODE');
      var TOOLTIPS = {
        'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
        'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks.controls_whileUntil.OPERATORS =
    [[Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
     [Blockly.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']];

Blockly.Blocks.controls_flow_statements = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    this.appendDummyInput()
        .appendField(dropdown, 'FLOW')
        .appendField(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
    this.setPreviousStatement(true);
	var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('FLOW');
      var TOOLTIPS = {
        'BREAK': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
        'CONTINUE': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
      };
      return TOOLTIPS[op];
    });
  },
  onchange: function() {
    if (!this.workspace) {
      // Block has been deleted.
      return;
    }
    var legal = false;
    // Is the block nested in a control statement?
    var block = this;
    do {
      if (block.type == 'controls_repeat' ||
          block.type == 'controls_forEach' ||
          block.type == 'controls_for' ||
          block.type == 'controls_whileUntil') {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);
    if (legal) {
      this.setWarningText(null);
    } else {
      this.setWarningText(Blockly.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
    }
  }
};

Blockly.Blocks.controls_flow_statements.OPERATORS =
    [[Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
     [Blockly.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']];

Blockly.Blocks.controls_millis = {
  init: function() {
	var UNIT =
        [[Blockly.MIXLY_DELAY_MS, 'millis'],
		 [Blockly.MIXLY_DELAY_US, 'micros']];
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
	    .appendField(Blockly.MIXLY_RUNTIME)
        .appendField(new Blockly.FieldDropdown(UNIT), 'UNIT');
    this.setOutput(true, Number);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MILLIS);
  }
};

Blockly.Blocks['controls_if'] = {
  /**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
  init: function() {
    //this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput('IF0')
        .setCheck([Boolean,Number])
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput('DO0')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                                         'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck([Boolean,Number])
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + i)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var i = this.elseifCount_; i > 0; i--) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck([Boolean,Number])
              .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_if_else':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_if_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['controls_if_if'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_elseif'] = {
  /**
   * Mutator bolck for else-if condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_else'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
    this.setPreviousStatement(true);
    this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_switch_case'] = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput('IF0')
        .setCheck([Number,Boolean])
        .appendField('switch');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_case',
                                         'controls_default']));
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
  },
  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
          .setCheck([Number,Boolean])
          .appendField('case');
      this.appendStatementInput('DO' + i)
          .appendField('');
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
          .appendField('default');
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = Blockly.Block.obtain(workspace, 'controls_switch');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = Blockly.Block.obtain(workspace, 'controls_case');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = Blockly.Block.obtain(workspace, 'controls_default');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Disconnect the else input blocks and remove the inputs.
    if (this.elseCount_) {
      this.removeInput('ELSE');
    }
    this.elseCount_ = 0;
    // Disconnect all the elseif input blocks and remove the inputs.
    for (var i = this.elseifCount_; i > 0; i--) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
    }
    this.elseifCount_ = 0;
    // Rebuild the block's optional inputs.
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_case':
          this.elseifCount_++;
          var ifInput = this.appendValueInput('IF' + this.elseifCount_)
              .setCheck([Number,Boolean])
              .appendField('case');
          var doInput = this.appendStatementInput('DO' + this.elseifCount_);
          doInput.appendField('');
          // Reconnect any child blocks.
          if (clauseBlock.valueConnection_) {
            ifInput.connection.connect(clauseBlock.valueConnection_);
          }
          if (clauseBlock.statementConnection_) {
            doInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        case 'controls_default':
          this.elseCount_++;
          var elseInput = this.appendStatementInput('ELSE');
          elseInput.appendField('default');
          // Reconnect any child blocks.
          if (clauseBlock.statementConnection_) {
            elseInput.connection.connect(clauseBlock.statementConnection_);
          }
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_case':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'controls_default':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
          clauseBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['controls_switch'] = {
  /**
   * Mutator block for if container.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField('switch');
    this.appendStatementInput('STACK');
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_case'] = {
  /**
   * Mutator bolck for else-if condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField('case');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_default'] = {
  /**
   * Mutator block for else condition.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
        .appendField('default');
    this.setPreviousStatement(true);
    this.contextMenu = false;
  }
};

Blockly.Blocks.controls_mstimer2 = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
	this.appendValueInput('TIME')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
		.appendField('MsTimer2')
        .appendField(Blockly.MIXLY_MSTIMER2_EVERY);
    this.appendDummyInput()
		.appendField('ms');
	this.appendStatementInput('DO')
        .appendField(Blockly.MIXLY_MSTIMER2_DO);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2);
  }
};

Blockly.Blocks.controls_mstimer2_start = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.MIXLY_MSTIMER2_START);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2_START);
  }
};

Blockly.Blocks.controls_mstimer2_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.MIXLY_MSTIMER2_STOP);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MSTIMER2_STOP);
  }
};

Blockly.Blocks.controls_end_program = {
  init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendDummyInput()
	    .appendField(Blockly.MIXLY_CONTROL_END_PROGRAM);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_END_PROGRAM);
  }
};

Blockly.Blocks.controls_interrupts = {
    init: function () {
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_CONTROL_INTERRUPTS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_ALLOW_INTERRUPT);
    }
};

Blockly.Blocks.controls_nointerrupts = {
    init: function () {
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_CONTROL_NOINTERRUPTS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_FORBID_INTERRUPT);
    }
};
Blockly.Blocks.base_delay=Blockly.Blocks.controls_delay;