import * as Blockly from "blockly/core";

const LOOPS_HUE = 120;

export const base_setup = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_SETUP);
        this.appendStatementInput("DO").appendField("");
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_SETUP);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id2"
        );
    },
};

export const controls_delay = {
    init: function () {
        var UNIT = [
            [Blockly.Msg.MIXLY_MILLIS, "delay"],
            [Blockly.Msg.MIXLY_MILLISECOND, "delayMicroseconds"],
        ];
        this.setColour(LOOPS_HUE);
        this.appendValueInput("DELAY_TIME", Number)
            .appendField(Blockly.Msg.MIXLY_DELAY)
            .appendField(new Blockly.FieldDropdown(UNIT), "UNIT")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_DELAY);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id9"
        );
    },
};

export const controls_for = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_WITH)
            .appendField(new Blockly.FieldTextInput("i"), "VAR");
        this.appendValueInput("FROM")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_FROM);
        this.appendValueInput("TO")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.LANG_CONTROLS_FOR_INPUT_TO);
        this.appendValueInput("STEP")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(Blockly.Msg.MIXLY_STEP);
        this.appendStatementInput("DO").appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id2"
        );
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace(
                "%1",
                thisBlock.getFieldValue("VAR")
            );
        });
    },
    getVars: function () {
        return [this.getFieldValue("VAR")];
    },
    renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue("VAR"))) {
            this.setTitleValue(newName, "VAR");
        }
    },
};

export const controls_whileUntil = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput("BOOL")
            .setCheck([Boolean, Number])
            .appendField(Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown(this.OPERATORS), "MODE");
        this.appendStatementInput("DO").appendField(Blockly.Msg.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#while"
        );
        var thisBlock = this;
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue("MODE");
            var TOOLTIPS = {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL,
            };
            return TOOLTIPS[op];
        });
    },
};

controls_whileUntil.OPERATORS = [
    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "WHILE"],
    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "UNTIL"],
];

export const controls_flow_statements = {
    init: function () {
        this.setColour(LOOPS_HUE);
        var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
        this.appendDummyInput()
            .appendField(dropdown, "FLOW")
            .appendField(Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP);
        this.setPreviousStatement(true);
        var thisBlock = this;
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id2"
        );
        this.setTooltip(function () {
            var op = thisBlock.getFieldValue("FLOW");
            var TOOLTIPS = {
                BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE,
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
            if (
                block.type == "controls_repeat" ||
                block.type == "controls_forEach" ||
                block.type == "controls_for" ||
                block.type == "controls_whileUntil"
            ) {
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
    },
};

controls_flow_statements.OPERATORS = [
    [Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, "BREAK"],
    [Blockly.Msg.LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, "CONTINUE"],
];

export const controls_millis = {
    init: function () {
        var UNIT = [
            [Blockly.Msg.MIXLY_MILLIS, "millis"],
            [Blockly.Msg.MIXLY_MILLISECOND, "micros"],
        ];
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RUNTIME)
            .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MILLIS);
    },
};

export const controls_if = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function () {
        //this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(LOOPS_HUE);
        this.appendValueInput("IF0")
            .setCheck([Boolean, Number])
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("DO0").appendField(
            Blockly.Msg.CONTROLS_IF_MSG_THEN
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#if"
        );
        this.setMutator(
            new Blockly.icons.MutatorIcon(
                ["controls_if_elseif", "controls_if_else"],
                this
            )
        );
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
            return "";
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
        var container = document.createElement("mutation");
        if (this.elseifCount_) {
            container.setAttribute("elseif", this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute("else", 1);
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
            this.removeInput("ELSE");
        }
        for (var i = this.elseifCount_; i > 0; i--) {
            if (
                containerBlock.getInputTargetBlock("IF" + i) &&
                containerBlock.getInputTargetBlock("IF" + i).previousConnection
            )
                valueConnections[i] = containerBlock.getInputTargetBlock(
                    "IF" + i
                ).previousConnection;
            else valueConnections[i] = null;
            this.removeInput("IF" + i);
            if (
                containerBlock.getInputTargetBlock("DO" + i) &&
                containerBlock.getInputTargetBlock("DO" + i).previousConnection
            )
                statementConnections[i] = containerBlock.getInputTargetBlock(
                    "DO" + i
                ).previousConnection;
            else statementConnections[i] = null;
            this.removeInput("DO" + i);
        }
        this.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10);
        //this.compose(containerBlock);
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput("IF" + i)
                .setCheck([Boolean, Number])
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput("DO" + i).appendField(
                Blockly.Msg.CONTROLS_IF_MSG_THEN
            );
        }
        if (this.elseCount_) {
            this.appendStatementInput("ELSE").appendField(
                Blockly.Msg.CONTROLS_IF_MSG_ELSE
            );
        }
        for (var i = valueConnections.length - 2; i > 0; i--) {
            if (valueConnections[i]) valueConnections[i].reconnect(this, "IF" + i);
        }
        for (var i = statementConnections.length - 2; i > 0; i--) {
            if (statementConnections[i])
                statementConnections[i].reconnect(this, "DO" + i);
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock("controls_if_if");
        containerBlock.initSvg();
        var connection = containerBlock.getInput("STACK").connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock("controls_if_elseif");
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock("controls_if_else");
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
            this.removeInput("ELSE");
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var i = this.elseifCount_; i > 0; i--) {
            this.removeInput("IF" + i);
            this.removeInput("DO" + i);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock("STACK");
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw Error("Unknown block type: " + clauseBlock.type);
            }
            clauseBlock =
                clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }

        this.updateShape_();
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(
            valueConnections,
            statementConnections,
            elseStatementConnection
        );
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock("STACK");
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_if_elseif":
                    var inputIf = this.getInput("IF" + i);
                    var inputDo = this.getInput("DO" + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case "controls_if_else":
                    var inputDo = this.getInput("ELSE");
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock =
                clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Reconstructs the block with all child blocks attached.
     */
    rebuildShape_: function () {
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;

        if (this.getInput("ELSE")) {
            elseStatementConnection =
                this.getInput("ELSE").connection.targetConnection;
        }
        var i = 1;
        while (this.getInput("IF" + i)) {
            var inputIf = this.getInput("IF" + i);
            var inputDo = this.getInput("DO" + i);
            console.log(inputIf.connection.targetConnection);
            valueConnections.push(inputIf.connection.targetConnection);
            statementConnections.push(inputDo.connection.targetConnection);
            i++;
        }
        this.updateShape_();
        this.reconnectChildBlocks_(
            valueConnections,
            statementConnections,
            elseStatementConnection
        );
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function () {
        // Delete everything.
        if (this.getInput("ELSE")) {
            this.removeInput("ELSE");
        }
        var i = 1;
        while (this.getInput("IF" + i)) {
            this.removeInput("IF" + i);
            this.removeInput("DO" + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput("IF" + i)
                .setCheck([Number, Boolean])
                .appendField(Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"]);
            this.appendStatementInput("DO" + i).appendField(
                Blockly.Msg["CONTROLS_IF_MSG_THEN"]
            );
        }
        if (this.elseCount_) {
            this.appendStatementInput("ELSE").appendField(
                Blockly.Msg["CONTROLS_IF_MSG_ELSE"]
            );
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
    reconnectChildBlocks_: function (
        valueConnections,
        statementConnections,
        elseStatementConnection
    ) {
        for (var i = 1; i <= this.elseifCount_; i++) {
            valueConnections[i] && valueConnections[i].reconnect(this, "IF" + i);
            statementConnections[i] &&
                statementConnections[i].reconnect(this, "DO" + i);
        }
        elseStatementConnection && elseStatementConnection.reconnect(this, "ELSE");
    },
};

export const controls_if_if = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = false;
    },
};

export const controls_if_elseif = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(
            Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = false;
    },
};

export const controls_if_else = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(
            Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE
        );
        this.setPreviousStatement(true);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = false;
    },
};

export const controls_switch_case = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput("IF0")
            .setCheck([Number, Boolean])
            .appendField("switch");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#switch"
        );
        this.setMutator(
            new Blockly.icons.MutatorIcon(["controls_case", "controls_default"], this)
        );
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
        var container = document.createElement("mutation");
        if (this.elseifCount_) {
            container.setAttribute("elseif", this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute("else", 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.compose(this);
        this.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10);
        this.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10);
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput("IF" + i)
                .setCheck([Number, Boolean])
                .appendField("case");
            this.appendStatementInput("DO" + i).appendField("");
        }
        if (this.elseCount_) {
            this.appendStatementInput("ELSE").appendField("default");
        }
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock("controls_switch");
        containerBlock.initSvg();
        var connection = containerBlock.getInput("STACK").connection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock("controls_case");
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock("controls_default");
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
        //  console.log(arguments.callee.caller.name);
        // Disconnect the else input blocks and remove the inputs.
        if (this.elseCount_) {
            this.removeInput("ELSE");
        }
        this.elseCount_ = 0;
        // Disconnect all the elseif input blocks and remove the inputs.
        for (var i = this.elseifCount_; i > 0; i--) {
            this.removeInput("IF" + i);
            this.removeInput("DO" + i);
        }
        this.elseifCount_ = 0;
        // Rebuild the block's optional inputs.
        var clauseBlock = containerBlock.getInputTargetBlock("STACK");
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_case":
                    this.elseifCount_++;
                    var ifInput = this.appendValueInput("IF" + this.elseifCount_)
                        .setCheck([Number, Boolean])
                        .appendField("case");
                    var doInput = this.appendStatementInput("DO" + this.elseifCount_);
                    doInput.appendField("");
                    // Reconnect any child blocks.
                    if (clauseBlock.valueConnection_) {
                        ifInput.connection.connect(clauseBlock.valueConnection_);
                    }
                    if (clauseBlock.statementConnection_) {
                        doInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                case "controls_default":
                    this.elseCount_++;
                    var elseInput = this.appendStatementInput("ELSE");
                    elseInput.appendField("default");
                    // Reconnect any child blocks.
                    if (clauseBlock.statementConnection_) {
                        elseInput.connection.connect(clauseBlock.statementConnection_);
                    }
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock =
                clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.getInputTargetBlock("STACK");
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case "controls_case":
                    var inputIf = this.getInput("IF" + i);
                    var inputDo = this.getInput("DO" + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case "controls_default":
                    var inputDo = this.getInput("ELSE");
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            clauseBlock =
                clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
        }
    },
};

export const controls_switch = {
    /**
     * Mutator block for if container.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField("switch");
        this.appendStatementInput("STACK");
        this.contextMenu = false;
    },
};

export const controls_case = {
    /**
     * Mutator bolck for else-if condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField("case");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
    },
};

export const controls_default = {
    /**
     * Mutator block for else condition.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField("default");
        this.setPreviousStatement(true);
        this.contextMenu = false;
    },
};

export const controls_mstimer2 = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendValueInput("TIME")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("MsTimer2" + Blockly.Msg.MIXLY_MSTIMER2_EVERY);
        this.appendDummyInput().appendField("ms");
        this.appendStatementInput("DO").appendField(Blockly.Msg.MIXLY_MSTIMER2_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#MsTimer2"
        );
    },
};

export const controls_mstimer2_start = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(
            "MsTimer2" + Blockly.Msg.MIXLY_MSTIMER2_START
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id45"
        );
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2_START);
    },
};

export const controls_mstimer2_stop = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput()
            .appendField("MsTimer2")
            .appendField(Blockly.Msg.MIXLY_STOP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_MSTIMER2_STOP);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id48"
        );
    },
};

export const controls_end_program = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_CONTROL_END_PROGRAM);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_END_PROGRAM);
    },
};
export const controls_soft_reset = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.SOFT_RESET);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_END_PROGRAM);
    },
};

export const controls_interrupts = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_CONTROL_INTERRUPTS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_TOOLTIP_CONTROL_ALLOW_INTERRUPT);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id51"
        );
    },
};

export const controls_nointerrupts = {
    init: function () {
        this.setColour(LOOPS_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_CONTROL_NOINTERRUPTS);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.MIXLY_CONTROL_NOINTERRUPTS);
        this.setHelpUrl(
            "https://mixly.readthedocs.io/zh_CN/latest/arduino/03.Control.html#id55"
        );
    },
};
export const base_delay = controls_delay;

//简单定时器
export const simple_timer = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_SIMPLE_TIMER)
            .appendField(
                new Blockly.FieldDropdown([
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["10", "10"],
                    ["11", "11"],
                    ["12", "12"],
                    ["13", "13"],
                    ["14", "14"],
                    ["15", "15"],
                    ["16", "16"],
                ]),
                "NO"
            )
            .appendField(Blockly.Msg.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
        this.appendValueInput("timein").setCheck(null);
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_mSecond);
        this.appendStatementInput("zxhs")
            .setCheck(null)
            .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setColour(120);
        this.setTooltip();
        this.setHelpUrl("");
    },
};
//do-while循环
export const do_while = {
    init: function () {
        this.appendStatementInput("input_data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_DO);
        this.appendValueInput("select_data")
            .setCheck(null)
            .appendField(Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT)
            .appendField(
                new Blockly.FieldDropdown([
                    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "true"],
                    [Blockly.Msg.LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "false"],
                ]),
                "type"
            );
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("do-while loop");
        this.setHelpUrl("");
    },
};

//注册超级延时函数
export const super_delay_function1 = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.super_delay_function)
            .appendField(
                new Blockly.FieldDropdown([
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["10", "10"],
                    ["11", "11"],
                    ["12", "12"],
                    ["13", "13"],
                    ["14", "14"],
                    ["15", "15"],
                    ["16", "16"],
                ]),
                "number"
            );
        this.appendStatementInput("delay_function").setCheck(null);
        this.setColour(120);
        this.setTooltip(Blockly.Msg.super_delay_function_help);
        this.setHelpUrl("");
    },
};

//执行超级延时函数
export const execute_super_delay_function1 = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.execute_super_delay_function)
            .appendField(
                new Blockly.FieldDropdown([
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["5", "5"],
                    ["6", "6"],
                    ["7", "7"],
                    ["8", "8"],
                    ["9", "9"],
                    ["10", "10"],
                    ["11", "11"],
                    ["12", "12"],
                    ["13", "13"],
                    ["14", "14"],
                    ["15", "15"],
                    ["16", "16"],
                ]),
                "number"
            );
        this.appendValueInput("time_interval")
            .setCheck(null)
            .appendField(Blockly.Msg.time_interval);
        this.appendValueInput("frequency")
            .setCheck(null)
            .appendField(Blockly.Msg.number_of_executions);
        this.appendDummyInput();
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip(Blockly.Msg.execute_super_delay_function_help);
        this.setHelpUrl("");
    },
};
