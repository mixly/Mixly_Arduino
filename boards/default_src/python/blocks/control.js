import * as Blockly from 'blockly/core';

const LOOPS_HUE = 120;

export const controls_main = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_NAME_MAIN);
        this.appendStatementInput('DO')
            .appendField('');
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_SETUP);
    }
};

export const base_setup = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SETUP);
        this.appendStatementInput('DO')
            .appendField('');
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_SETUP);
    }
};

export const controls_delay = {
    init: function () {
        var UNIT = [
            [Blockly.Msg.MIXLY_mSecond, 'delay'],
            [Blockly.Msg.MIXLY_uSecond, 'delayMicroseconds']
        ];
        this.setColour(LOOPS_HUE);
        this.appendValueInput("DELAY_TIME", Number)
            .appendField(Blockly.Msg.MIXLY_DELAY)
            .appendField(new Blockly.FieldDropdown(UNIT), 'UNIT')
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id9");
        this.wiki = {
            'zh-hans': {
                page: ['Arduino AVR', '控制', '延时']
            }
        };
    }
};

export const controls_end_program = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_CONTROL_END_PROGRAM);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_CONTROL_END_TOOLTIP);
    }
};

export const controls_if = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(LOOPS_HUE);
        this.appendValueInput('IF0')
            .setCheck([Boolean, Number])
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl("https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#if");
        this.setMutator(new Blockly.icons.MutatorIcon(['controls_if_elseif',
            'controls_if_else'], this));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
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
    mutationToDom: function () {
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
    domToMutation: function (xmlElement) {
        var containerBlock = this;
        var valueConnections = [];
        var statementConnections = [];
        // var elseStatementConnection = null;
        if (this.elseCount_) {
            // if (containerBlock.getInputTargetBlock('ELSE') && containerBlock.getInputTargetBlock('ELSE').previousConnection)
            //     elseStatementConnection = containerBlock.getInputTargetBlock('ELSE').previousConnection;
            this.removeInput('ELSE');
        }
        for (var i = this.elseifCount_; i > 0; i--) {
            if (containerBlock.getInputTargetBlock('IF' + i) && containerBlock.getInputTargetBlock('IF' + i).previousConnection)
                valueConnections[i] = (containerBlock.getInputTargetBlock('IF' + i).previousConnection);
            else
                valueConnections[i] = null;
            this.removeInput('IF' + i);
            if (containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
                statementConnections[i] = (containerBlock.getInputTargetBlock('DO' + i).previousConnection);
            else
                statementConnections[i] = null;
            this.removeInput('DO' + i);
        }
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
        //this.compose(containerBlock);
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck([Boolean, Number])
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
        for (var i = valueConnections.length - 2; i > 0; i--) {
            if (valueConnections[i])
                valueConnections[i].reconnect(this, 'IF' + i);
        }
        for (var i = statementConnections.length - 2; i > 0; i--) {
            if (statementConnections[i])
                statementConnections[i].reconnect(this, 'DO' + i);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('controls_if_if');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('controls_if_elseif');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_if_else');
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
    compose: function (containerBlock) {
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
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_if_elseif':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw Error('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }

        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);

    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
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
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;

        if (this.getInput('ELSE')) {
            elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            console.log(inputIf.connection.targetConnection);
            valueConnections.push(inputIf.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck([Number, Boolean])
                .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF']);
            this.appendStatementInput('DO' + i)
                .appendField(Blockly.Msg['CONTROLS_IF_MSG_THEN']);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSE']);
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (valueConnections, statementConnections,
        elseStatementConnection) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            valueConnections[i] && valueConnections[i].reconnect(this, 'IF' + i);
            statementConnections[i] && statementConnections[i].reconnect(this, 'DO' + i);
        }
        elseStatementConnection && elseStatementConnection.reconnect(this, 'ELSE');
    }
};


export const controls_range = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput('FROM')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PYTHON_RANGE)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendValueInput('STEP')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.PYTHON_RANGE_STEP);
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_RANGE_TOOLTIP);
    }
};


export const controls_forEach = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput('LIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_ITEM)
        //    .appendField(new Blockly.FieldTextInput('i'), 'VAR');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('“%1”', '');
        });
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

export const controls_whileUntil = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput('BOOL')
            .setCheck([Boolean, Number])
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_CURRENT)
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'MODE')
        // this.appendDummyInput()
        //     .appendField(Blockly.Msg.CONTROLS_WHILE_SHI);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT + Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('MODE');
            var TOOLTIPS = {
                'WHILE': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                'UNTIL': Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            };
            return TOOLTIPS[op];
        });
    }
};

export const controls_try_finally = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_TRY);
        this.appendStatementInput('try');
        this.appendValueInput('IF1')
            .appendField(Blockly.Msg.MIXLY_PYTHON_EXCEPT);
        this.appendStatementInput('DO1')
            .appendField('');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.icons.MutatorIcon(['controls_except', 'controls_finally'], this));
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_CONTROL_TRY_TOOLTIP);
        this.elseifCount_ = 1;
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function () {
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
    domToMutation: function (xmlElement) {
        var containerBlock = this;
        var valueConnections = [];
        var statementConnections = [];
        // var elseStatementConnection = null;
        if (this.elseCount_) {
            // if (containerBlock.getInputTargetBlock('ELSE') && containerBlock.getInputTargetBlock('ELSE').previousConnection)
            //     elseStatementConnection = containerBlock.getInputTargetBlock('ELSE').previousConnection;
            this.removeInput('ELSE');
        }
        for (var i = this.elseifCount_; i > 0; i--) {
            if (containerBlock.getInputTargetBlock('IF' + i) && containerBlock.getInputTargetBlock('IF' + i).previousConnection)
                valueConnections[i] = (containerBlock.getInputTargetBlock('IF' + i).previousConnection);
            else
                valueConnections[i] = null;
            this.removeInput('IF' + i);
            if (containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
                statementConnections[i] = (containerBlock.getInputTargetBlock('DO' + i).previousConnection);
            else
                statementConnections[i] = null;
            this.removeInput('DO' + i);
        }
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10);
        //this.compose(containerBlock);
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck([Boolean, Number])
                .appendField(Blockly.Msg.MIXLY_PYTHON_EXCEPT);
            this.appendStatementInput('DO' + i)
                .appendField("");
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.MIXLY_PYTHON_FINALLY);
        }
        for (var i = valueConnections.length - 2; i > 0; i--) {
            if (valueConnections[i])
                valueConnections[i].reconnect(this, 'IF' + i);
        }
        for (var i = statementConnections.length - 2; i > 0; i--) {
            if (statementConnections[i])
                statementConnections[i].reconnect(this, 'DO' + i);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('controls_try');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('controls_except');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_finally');
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
    compose: function (containerBlock) {
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
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_except':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_finally':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw Error('Unknown block type: ' + clauseBlock.type);
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }

        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);

    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'controls_except':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'controls_finally':
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
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;

        if (this.getInput('ELSE')) {
            elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            var inputIf = this.getInput('IF' + i);
            var inputDo = this.getInput('DO' + i);
            console.log(inputIf.connection.targetConnection);
            valueConnections.push(inputIf.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck([Number, Boolean])
                .appendField(Blockly.Msg.MIXLY_PYTHON_EXCEPT);
            this.appendStatementInput('DO' + i)
                .appendField('');
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .appendField(Blockly.Msg.MIXLY_PYTHON_FINALLY);
        }
    },
    /**
     * Reconnects child blocks.
     * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
     * connectsions for if input.
     * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
     * statement connections for do input.
     * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
     * connection for else input.
     */
    reconnectChildBlocks_: function (valueConnections, statementConnections,
        elseStatementConnection) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            valueConnections[i] && valueConnections[i].reconnect(this, 'IF' + i);
            statementConnections[i] && statementConnections[i].reconnect(this, 'DO' + i);
        }
        elseStatementConnection && elseStatementConnection.reconnect(this, 'ELSE');
    }
};

export const controls_flow_statements = {
    init: function () {
        this.setColour(LOOPS_HUE);
        var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
        this.appendDummyInput()
            .appendField(dropdown, 'FLOW')
            .appendField(Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_FLOW_STATEMENTS_TOOLTIP);
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue('FLOW');
            var TOOLTIPS = {
                'BREAK': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                'CONTINUE': Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            };
            return TOOLTIPS[op];
        });
    },
    onchange: function () {
        if (!this.workspace) {
            // Block has been deleted.
            return;
        }
        var legal = false;
        // Is the block nested in a control statement?
        var block = this;
        do {
            if (block.type == 'controls_repeat' ||
                block.type == 'controls_for' ||
                block.type == 'controls_forEach' ||
                block.type == 'controls_repeat_ext' ||
                block.type == 'controls_whileUntil' ||
                block.type == 'do_while') {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            this.setWarningText(null);
        } else {
            this.setWarningText(Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_WARNING);
        }
    }
};


export const controls_for = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldTextInput('i'), 'VAR');
        this.appendValueInput('FROM')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendValueInput('STEP')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEP);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};

export const controls_for_range = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldTextInput('i'), 'VAR');
        this.appendValueInput('FROM')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput('TO')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendValueInput('STEP')
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEP);
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.MIXLY_PYTHON_CONTROLS_FOR_RANGE_TOOLTIP.replace('%1',
                thisBlock.getFieldValue('VAR'));
        });
    },
    getVars: function () {
        return [this.getFieldValue('VAR')];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
            this.setTitleValue(newName, 'VAR');
        }
    }
};


controls_whileUntil.OPERATORS = [
    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']
];



controls_flow_statements.OPERATORS = [
    [Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
    [Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']
];



export const controls_if_if = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput('STACK');
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    }
};

export const controls_if_elseif = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    }
};

export const controls_if_else = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    }
};



export const controls_try = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField('try');
        this.appendStatementInput('STACK');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.contextMenu = false;
    }
};

export const controls_except = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_EXCEPT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_CONTROL_EXCEPT_TOOLTIP);
    }
};

export const controls_finally = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_FINALLY);
        this.setPreviousStatement(true);
        this.contextMenu = false;
        this.setTooltip(Blockly.Msg.MIXLY_MIXPY_CONTROL_FINALLY_TOOLTIP);
    }
};



export const controls_repeat_ext = {
    /**
     * Block for repeat n times (external number).
     * @this Blockly.Block
     */
    init: function () {
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
            "colour": LOOPS_HUE,
            "tooltip": Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            "helpUrl": Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput('DO');
    }
};



export const controls_lambda = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput('BOOL')
            .appendField('lambda')
        //.appendField(new Blockly.FieldDropdown(this.OPERATORS), 'MODE');
        this.appendStatementInput('DO')
            .appendField(Blockly.Msg.MIXLY_STAT);
        this.setOutput(true);
        // this.setNextStatement(true);
    }
};

export const controls_pass = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_PASS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_PASS_TOOLTIP);
    }
};

export const controls_thread = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_START)
        this.appendValueInput('callback')
            .appendField(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_USE)
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_PARAMS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_PYTHON_CONTROLS_THREAD_TOOLTIP);
    }
};

//do-while循环
export const do_while = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT + Blockly.Msg.MIXLY_DO);
        this.appendStatementInput("input_data")
            .setCheck(null)
        this.appendValueInput("select_data")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_OPERATOR_UNTIL)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "true"], [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "false"]]), "type");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(LOOPS_HUE);
        this.setTooltip("do-while loop");
        this.setHelpUrl("");
    }
};

export const garbage_collection = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_OP_GARBAGE_COLLECT);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


export const get_mem_alloc = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_MEM_ALLOC);
        this.setOutput(true)
    }
};

export const get_mem_free = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_MEM_FREE);
        this.setOutput(true)
    }
};

export const get_unique_identifier = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET + Blockly.Msg.MIXLY_DEVICE + 'ID');
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.Msg.MIXLY_GET_UNIQUE_IDEN);
    }
};

// export const base_type = controls_type;
// export const controls_TypeLists = controls_typeLists;

export const datetime_fromtimestamp = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_RTC_TIMESTAMP);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_TIMESTAMP_TO_DATA);
        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
};


export const gene_unique_identifier = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GET_UNIQUE_IDEN);
        this.setOutput(true)
    }
};