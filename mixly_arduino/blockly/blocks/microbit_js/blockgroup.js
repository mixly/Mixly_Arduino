'use strict';

goog.provide('Blockly.Blocks.blockgroup');

goog.require('Blockly.Blocks');

Blockly.Blocks.blockgroup.HUE = 65;
Blockly.Blocks.blockgroup.HUE1 = 40;
Blockly.Blocks.blockgroup.HUE2 = 100;
Blockly.Blocks.blockgroup.HUE3 = 140;
Blockly.Blocks.blockgroup.HUE4 = 180;
Blockly.FieldCheckbox.CHECK_CHAR='■';

Blockly.Blocks['serial_begin'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", Number)
		.appendField(Blockly.MIXLY_SERIAL_BEGIN)
		.setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['serial_write'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE);
        this.appendValueInput("CONTENT", String)
            .appendField(Blockly.MIXLY_SERIAL_WRITE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_WRITE_TOOLTIP);
    }
};

Blockly.Blocks['serial_print'] = {
  init: function() {
   this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", String)
        .appendField("Serial " + Blockly.MIXLY_SERIAL_PRINT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
   init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", String)
        .appendField("Serial " + Blockly.MIXLY_SERIAL_PRINTLN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};
//打印16进制数
Blockly.Blocks['serial_print_hex'] = {
   init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendValueInput("CONTENT", Number)
        .appendField("Serial " + Blockly.MIXLY_SERIAL_PRINT_HEX)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
  }
};

Blockly.Blocks['serial_receive_data_event'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE);
        this.appendValueInput('char_marker')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SERIAL_WHEN_CONTAIN_DATA)
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
    }
};

Blockly.Blocks['serial_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        .appendField(Blockly.MIXLY_SERIAL_AVAILABLE);
	this.setOutput(true, Boolean);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
  }
};

Blockly.Blocks['serial_readstr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        .appendField("Serial " + Blockly.MIXLY_SERIAL_READSTR);
	this.setOutput(true, String);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
  }
};

Blockly.Blocks['serial_readline'] = {
    init: function() {
        this.setColour(Blockly.Blocks.blockgroup.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SERIAL_READ_LINE);
        this.setOutput(true, String);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
    }
};

Blockly.Blocks['serial_readstr_until'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        .appendField("Serial " + Blockly.MIXLY_SERIAL_READSTR_UNTIL)
        .appendField(new Blockly.FieldDropdown([
            ["new line", "serial.delimiters(Delimiters.NewLine)"],
            [",", "serial.delimiters(Delimiters.Comma)"],
            ["$", "serial.delimiters(Delimiters.Dollar)"],
            [":", "serial.delimiters(Delimiters.Colon)"],
            [".", "serial.delimiters(Delimiters.Fullstop)"],
            ["#", "serial.delimiters(Delimiters.Hash)"]
        ]), "char_marker");

	this.setInputsInline(true);
	this.setOutput(true, String);
  }
};

Blockly.Blocks['serial_parseInt_Float'] = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE);
	this.appendDummyInput()
        //.appendField(Blockly.MIXLY_SERIAL_READ)
		.appendField(new Blockly.FieldDropdown([["read", "read"],["peek", "peek"],["parseInt", "parseInt"], ["parseFloat", "parseFloat"]]), "STAT");
	this.setOutput(true, Number);
	var thisBlock = this;
    this.setTooltip(function() {
      var op = thisBlock.getFieldValue('STAT');
      var TOOLTIPS = {
        'parseInt': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_INT,
        'parseFloat': Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_FLOAT
      };
      return TOOLTIPS[op];
    });
  }
};

Blockly.Blocks['serial_flush'] = {
  init: function() {
   this.setColour(Blockly.Blocks.blockgroup.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SERIAL_FLUSH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['serial_softserial'] = {
  init: function() {
   this.setColour(Blockly.Blocks.blockgroup.HUE);
   this.appendValueInput("RX", Number)
       .appendField(Blockly.MIXLY_SETUP)
	   .appendField("RX#")
       .setCheck(Number)
	   .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("TX", Number)
	   .appendField("TX#")
       .setCheck(Number)
	   .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
          .appendField("BAUDRATE#")
          .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['37400', '38400'], ['31250', '31250'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600'], ['4800', '4800'], ['2400', '2400'], ['1200', '1200'], ['300', '300']]), 'baudrate');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks['serial_event'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SERIAL_EVENT);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};


////////////////////////// radio ///////////////////////////
Blockly.Blocks['radio_send_number'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SEND_NUMBER);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_send_value'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('name')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SEND_VALUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(" = ");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_send_string'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SEND_STRING);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_receive_args'] = {
    /**
     * Mutator block for procedure argument.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldDropdown([['receivedNumber', 'receivedNumber'], ['receivedString', 'receivedNumber'], ['time', 'time'], ['serial', 'serial'], ['signal', 'signal']]), "TYPEVAR")
            .appendField(new Blockly.FieldTextInput('x', this.validator_), 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    /**
     * Obtain a valid name for the procedure.
     * Merge runs of whitespace.  Strip leading and trailing whitespace.
     * Beyond this, all names are legal.
     * @param {string} newVar User-supplied name.
     * @return {?string} Valid name, or null if a name was not specified.
     * @private
     * @this Blockly.Block
     */
    validator_: function(newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        return newVar || null;
    }
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
    /**
     * Mutator block for procedure container.
     * @this Blockly.Block
     */
    init: function() {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput('STACK');
        this.appendDummyInput('STATEMENT_INPUT')
            .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks['radio_receive_number_mutator'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_ON_RECEIVE)
            //.appendField(new Blockly.FieldTextInput('receivedNumber'), 'var')
            .appendField('', 'PARAMS');
        //this.appendStatementInput('do')
        //    .appendField(Blockly.MIXLY_DO);
        this.setMutator(new Blockly.Mutator(['radio_receive_args']));
        this.arguments_ = [];
        this.argumentstype_ = [];//新增
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: function(hasStatements) {
        if (this.hasStatements_ === hasStatements) {
            return;
        }
        if (hasStatements) {
            this.appendStatementInput('STACK')
                .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
            if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
            }
        } else {
            this.removeInput('STACK', true);
        }
        this.hasStatements_ = hasStatements;
    },
    /**
     * Update the display of parameters for this procedure definition block.
     * Display a warning if there are duplicately named parameters.
     * @private
     * @this Blockly.Block
     */
    updateParams_: function() {
        // Check for duplicated arguments.
        var badArg = false;
        var hash = {};
        for (var i = 0; i < this.arguments_.length; i++) {
            if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
                badArg = true;
                break;
            }
            hash['arg_' + this.arguments_[i].toLowerCase()] = true;
        }
        if (badArg) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }
        // Merge the arguments into a human-readable list.
        var paramString = '';
        if (this.arguments_.length) {
            paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
                ' ' + this.arguments_.join(', ');
        }
        // The params field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        this.setFieldValue(paramString, 'PARAMS');
        Blockly.Events.enable();
    },
    /**
     * Create XML to represent the argument inputs.
     * @param {=boolean} opt_paramIds If true include the IDs of the parameter
     *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = document.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            parameter.setAttribute('vartype', this.argumentstype_[i]);//新增
            container.appendChild(parameter);
        }

        // Save whether the statement input is visible.
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    /**
     * Parse XML to restore the argument inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.arguments_ = [];
        this.argumentstype_ = [];//新增
        for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                this.arguments_.push(childNode.getAttribute('name'));
                this.argumentstype_.push(childNode.getAttribute('vartype'));//新增
            }
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);

        // Show or hide the statement input.
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
        containerBlock.initSvg();

        // Check/uncheck the allow statement box.
        if (this.getInput('RETURN')) {
            containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                'STATEMENTS');
        } else {
            containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
        }

        // Parameter list.
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.arguments_.length; i++) {
            var paramBlock = workspace.newBlock('procedures_mutatorarg');
            paramBlock.initSvg();
            paramBlock.setFieldValue(this.arguments_[i], 'NAME');
            paramBlock.setFieldValue(this.argumentstype_[i], 'TYPEVAR');//新增
            // Store the old location.
            paramBlock.oldLocation = i;
            connection.connect(paramBlock.previousConnection);
            connection = paramBlock.nextConnection;
        }
        // Initialize procedure's callers with blank IDs.
        Blockly.Procedures.mutateCallers(this);
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        // Parameter list.
        this.arguments_ = [];
        this.paramIds_ = [];
        this.argumentstype_= [];//新增
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock) {
            this.arguments_.push(paramBlock.getFieldValue('NAME'));
            this.argumentstype_.push(paramBlock.getFieldValue('TYPEVAR'));//新增
            this.paramIds_.push(paramBlock.id);
            paramBlock = paramBlock.nextConnection &&
                paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);

        // Show/hide the statement input.
        var hasStatements = containerBlock.getFieldValue('STATEMENTS');
        if (hasStatements !== null) {
            hasStatements = hasStatements == 'TRUE';
            if (this.hasStatements_ != hasStatements) {
                if (hasStatements) {
                    this.setStatements_(true);
                    // Restore the stack, if one was saved.
                    Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
                    this.statementConnection_ = null;
                } else {
                    // Save the stack, then disconnect it.
                    var stackConnection = this.getInput('STACK').connection;
                    this.statementConnection_ = stackConnection.targetConnection;
                    if (this.statementConnection_) {
                        var stackBlock = stackConnection.targetBlock();
                        stackBlock.unplug();
                        stackBlock.bumpNeighbours_();
                    }
                    this.setStatements_(false);
                }
            }
        }
    },
    /**
     * Dispose of any callers.
     * @this Blockly.Block
     */
    dispose: function() {
        var name = this.getFieldValue('NAME');
        Blockly.Procedures.disposeCallers(name, this.workspace);
        // Call parent's destructor.
        this.constructor.prototype.dispose.apply(this, arguments);
    },
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES NOT have a return value.
     * @this Blockly.Block
     */
    getProcedureDef: function() {
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this Blockly.Block
     */
    getVars: function() {
        return this.arguments_;
    },
    /**
     * Notification that a variable is renaming.
     * If the name matches one of this block's variables, rename it.
     * @param {string} oldName Previous name of variable.
     * @param {string} newName Renamed variable.
     * @this Blockly.Block
     */
    renameVar: function(oldName, newName) {
        var change = false;
        for (var i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                change = true;
            }
        }
        if (change) {
            this.updateParams_();
            // Update the mutator's variables if the mutator is open.
            if (this.mutator.isVisible()) {
                var blocks = this.mutator.workspace_.getAllBlocks();
                for (var i = 0, block; block = blocks[i]; i++) {
                    if (block.type == 'procedures_mutatorarg' &&
                        Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                        block.setFieldValue(newName, 'NAME');
                    }
                }
            }
        }
    },
    /**
     * Add custom menu options to this block's context menu.
     * @param {!Array} options List of menu options to add to.
     * @this Blockly.Block
     */
    customContextMenu: function(options) {
        // Add option to create caller.
        var option = {enabled: true};
        var name = this.getFieldValue('NAME');
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
        var xmlMutation = goog.dom.createDom('mutation');
        xmlMutation.setAttribute('name', name);
        for (var i = 0; i < this.arguments_.length; i++) {
            var xmlArg = goog.dom.createDom('arg');
            xmlArg.setAttribute('name', this.arguments_[i]);
            xmlArg.setAttribute('type', this.argumentstype_[i]);//新增
            xmlMutation.appendChild(xmlArg);
        }
        var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
        xmlBlock.setAttribute('type', this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);

        // Add options to create getters for each parameter.
        if (!this.isCollapsed()) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var option = {enabled: true};
                var name = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
                var xmlField = goog.dom.createDom('field', null, name);
                xmlField.setAttribute('name', 'VAR');
                xmlField.setAttribute('type', 'TYPEVAR');//新增
                var xmlBlock = goog.dom.createDom('block', null, xmlField);
                xmlBlock.setAttribute('type', 'variables_get');
                option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
                options.push(option);
            }
        }
    },
    callType_: 'procedures_callnoreturn'
}

Blockly.Blocks['radio_receive_number'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_ON_RECEIVE)
            .appendField(new Blockly.FieldTextInput('receivedNumber'), 'var');

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}
Blockly.Blocks['radio_receive_value'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_ON_RECEIVE)
            .appendField(new Blockly.FieldTextInput('name'), 'name')
            .appendField(" = ")
            .appendField(new Blockly.FieldTextInput('value'), 'value')

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    },
    getVars: function() {
        return [this.getFieldValue('name'), this.getFieldValue('value')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('name'))) {
          this.setTitleValue(newName, 'name');
        }

        if (Blockly.Names.equals(oldName, this.getFieldValue('value'))) {
            this.setTitleValue(newName, 'value');
        }
    }
}


Blockly.Blocks['radio_receive_string'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_ON_RECEIVE)
            .appendField(new Blockly.FieldTextInput('receivedString'), 'var');

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
          this.setTitleValue(newName, 'var');
        }
    }
}

Blockly.Blocks['radio_set_group'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SET_GROUP);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_send_transmit_power'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SET_TRANSMIT_POWER);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_set_transmit_serial_number'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_SET_TRANSMIT_SERIAL_NUMBER)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "true"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "false"]]), "stat");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['radio_write_received_packet_to_serial'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_WRITE_RECEIVE_PACKET_TO_SERIAL);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

///////////////////////// i2c ///////////////////////
Blockly.Blocks['i2c_read'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_READ_ADDRESS);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_FORMAT)
            .appendField(new Blockly.FieldDropdown([
                ["Int8LE", "NumberFormat.Int8LE"],
                ["UInt8LE", "NumberFormat.UInt8LE"],
                ["Int16LE", "NumberFormat.Int16LE"],
                ["UInt16LE", "NumberFormat.UInt16LE"],
                ["Int32LE", "NumberFormat.Int32LE"],
                ["Int8BE", "NumberFormat.Int8BE"],
                ["UInt8BE", "NumberFormat.UInt8BE"],
                ["Int16BE", "NumberFormat.Int16BE"],
                ["UInt16BE", "NumberFormat.UInt16BE"],
                ["Int32BE", "NumberFormat.Int32BE"]
            ]), "format")
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'true'],
                [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'false']
            ]), "is_repeated");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['i2c_write'] = {
    init:function(){
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('address')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_WRITE_ADDRESS);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_VALUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_I2C_FORMAT)
            .appendField(new Blockly.FieldDropdown([
                ["Int8LE", "NumberFormat.Int8LE"],
                ["UInt8LE", "NumberFormat.UInt8LE"],
                ["Int16LE", "NumberFormat.Int16LE"],
                ["UInt16LE", "NumberFormat.UInt16LE"],
                ["Int32LE", "NumberFormat.Int32LE"],
                ["Int8BE", "NumberFormat.Int8BE"],
                ["UInt8BE", "NumberFormat.UInt8BE"],
                ["Int16BE", "NumberFormat.Int16BE"],
                ["UInt16BE", "NumberFormat.UInt16BE"],
                ["Int32BE", "NumberFormat.Int32BE"]
            ]), "format")
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.LOGIC_BOOLEAN_TRUE, 'true'],
                [Blockly.Msg.LOGIC_BOOLEAN_FALSE, 'false']
            ]), "is_repeated");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

//////////////////////// spi /////////////////////////
Blockly.Blocks['spi_write'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_WRITE);

        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['spi_frequency'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_FREQUENCY);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['spi_format'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('bits')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_FORMAT + " bits");
        this.appendValueInput('mode')
            .setCheck(Number)
            .appendField('mode');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['spi_set_pins'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('MOSI')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_SET_PINS + " MOSI#");
        this.appendValueInput('MISO')
            .setCheck(Number)
            .appendField('MISO#');

        this.appendValueInput('SCK')
            .setCheck(Number)
            .appendField('SCK#');

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

////////////////// bluetooth ////////////////////////////
Blockly.Blocks['ble_service'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_SERVICE)
            .appendField(new Blockly.FieldDropdown([
                ["accelerometer", "startAccelerometerService"],
                ["button", "startButtonService"],
                ["io pin", "startIOPinService"],
                ["led", "startLEDService"],
                ["temperature", "startTemperatureService"],
                ["magnetometer", "startMagnetometerService"],
            ]), 'key')

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['ble_on_connected'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_CONNECTED);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);

    }
};
Blockly.Blocks['ble_on_disconnected'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_DISCONNECTED);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
};
Blockly.Blocks['ble_on_received'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_RECEIVE);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
};
Blockly.Blocks['ble_advertise_uid'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_UID_CONNECTED)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "true"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "false"]]), "is_connected");

        this.appendValueInput('namespace')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_NAMESPACE)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('instance')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_INSTANCE)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('power')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_POWER)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
Blockly.Blocks['ble_advertise_url'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_URL_CONNECTED)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "true"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "false"]]), "is_connected");

        this.appendValueInput('url')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_URL)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('power')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_POWER)
            .setAlign(Blockly.ALIGN_RIGHT);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
Blockly.Blocks['ble_write_number'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_WRITE_NUMBER);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_write_string'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_WRITE_STRING);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_write_value'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendValueInput('name')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_WRITE_VALUE);

        this.appendValueInput('value')
            .setCheck(Number)
            .appendField(' = ');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_read_until'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendValueInput('marker')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_READ_UNTIL);

        this.setOutput(true, String);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['ble_uart_service'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_UART_SERVICE);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_stop_advertising'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_STOP_ADVERTISING);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_set_power'] = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE3);

        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_SET_POWER);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
///////////////// catActuator /////////////////////////
Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
  }
};

Blockly.Blocks.servo_pulse = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('writeMicroseconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

var TONE_NOTES=[["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
           ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
           ["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]];


Blockly.Blocks.tone_notes = {
   init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.tone_beats = {
    init: function() {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["1", "BeatFraction.Whole"],
                ["1/2", "BeatFraction.Half"],
                ["1/4", "BeatFraction.Quarter"],
                ["1/8", "BeatFraction.Eighth"],
                ["1/16", "BeatFraction.Sixteenth"],
                ["2", "BeatFraction.Double"],
                ["4", "BeatFraction.Breve"]
            ]), 'BEAT')
            .appendField("beat");
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.tone_play={
init:function(){
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MBOT_TONE +  ' ' + Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('BEAT')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_BEAT);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
  }
};

Blockly.Blocks.tone_ring={
init:function(){
    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_RING_TONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.tone_rest={
init:function(){

    this.setColour(Blockly.Blocks.blockgroup.HUE2);
    this.appendValueInput('BEAT')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_REST_TONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.tone_start_melody = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_START_MELODY)
            .appendField(new Blockly.FieldDropdown([
                ["dadadum", "Melodies.Dadadadum"],
                ["entertainer", "Melodies.Entertainer"],
                ["prelude", "Melodies.Prelude"],
                ["ode", "Melodies.Ode"],
                ["nyan", "Melodies.Nyan"],
                ["ringtone", "Melodies.Ringtone"],
                ["funk", "Melodies.Funk"],
                ["blues", "Melodies.Blues"],
                ["birthday", "Melodies.Birthday"],
                ["wedding", "Melodies.Wedding"],
                ["funereal", "Melodies.Funereal"],
                ["punchline", "Melodies.Punchline"],
                ["baddy", "Melodies.Baddy"],
                ["chase", "Melodies.Chase"],
                ["ba ding", "Melodies.BaDing"],
                ["wawawawaa", "Melodies.Wawawawaa"],
                ["jump up", "Melodies.JumpUp"],
                ["jump down", "Melodies.JumpDown"],
                ["power up", "Melodies.PowerUp"],
                ["power down", "Melodies.PowerDown"]
            ]), "melody");
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                ["once", "MelodyOptions.Once"],
                ["forever", "MelodyOptions.Forever"],
                ["once in backgroup", "MelodyOptions.OnceInBackground"],
                ["forever in backgroup", "MelodyOptions.ForeverInBackground"]
            ]), "repeat");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks.tone_event = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MUSIC_EVENT)
            .appendField(new Blockly.FieldDropdown([
                ["melody note played", "MusicEvent.MelodyNotePlayed"],
                ["melody started", "MusicEvent.MelodyStarted"],
                ["melody ended", "MusicEvent.MelodyEnded"],
                ["melody repeated", "MusicEvent.MelodyRepeated"],
                ["background melody note played", "MusicEvent.BackgroundMelodyNotePlayed"],
                ["background melody started", "MusicEvent.BackgroundMelodyStarted"],
                ["background melody ended", "MusicEvent.BackgroundMelodyEnded"],
                ["background melody repeated", "MusicEvent.BackgroundMelodyRepeated"],
                ["background melody paused", "MusicEvent.BackgroundMelodyPaused"],
                ["background melody resumed", "MusicEvent.BackgroundMelodyResumed"]

            ]), "event");
        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
}

Blockly.Blocks.tone_get_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GET_TEMPO);

        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks.tone_change_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendValueInput('DEGREE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_CHANGE_TEMPO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks.tone_set_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE2);
        this.appendValueInput('DEGREE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_TEMPO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

//////////////////////// monitor ///////////////////////////
Blockly.Blocks.monitor_show_number = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('data')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_NUMBER);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('data')
        .setCheck(String)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_show_leds = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_LEDS)

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 5; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //Blockly.FieldCheckbox.CHECK_CHAR=tmp_check_char;
  }
};
Blockly.Blocks.monitor_show_arrow = {
  init: function() {
      this.setColour(Blockly.Blocks.blockgroup.HUE4);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_ARROW)
          .appendField(new Blockly.FieldDropdown([
              ["North", "ArrowNames.North"],
              ["NorthEast", "ArrowNames.NorthEast"],
              ["East", "ArrowNames.East"],
              ["SouthEast", "ArrowNames.SouthEast"],
              ["South", "ArrowNames.South"],
              ["SouthWest", "ArrowNames.SouthWest"],
              ["West", "ArrowNames.West"],
              ["NorthWest", "ArrowNames.NorthWest"]
            ]), 'arrow');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
  }
}

Blockly.Blocks.monitor_clear_screen = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE4);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CLEAR_SCREEN);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}


Blockly.Blocks.monitor_plot_point = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_unplot_point = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_UNPLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_toggle_point = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_TOGGLE_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_get_point = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
	this.setInputsInline(true);
	this.setOutput(true, Boolean);
  }
};
Blockly.Blocks.monitor_plot_bar = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('start')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_BAR_START);
	this.appendValueInput('end')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_BAR_END);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);

      this.appendValueInput('brightness')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_set_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
      this.appendValueInput('brightness')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SET_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_get_brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE4);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}
Blockly.Blocks.monitor_stop_animation= {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE4);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_STOP_ANIMATION);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.monitor_led_enable= {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE4);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_LED_ENABLE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "true"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "false"]]), "stat");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.monitor_show_image_with_offset = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
    this.appendValueInput('var')
          .setCheck('Image')
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_IMAGE);
    this.appendValueInput('data')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_AT_OFFSET);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_create_image = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE);

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 5; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }
    this.setOutput(true, "Image");
  }
};
Blockly.Blocks.monitor_scroll_image = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
    this.appendValueInput('var')
          .setCheck('Image')
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_IMAGE);
    this.appendValueInput('offset')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_WITH_OFFSET);
    this.appendValueInput('interval')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
    this.setPreviousStatement(true, null);

    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_create_big_image = {
  init: function() {
    this.setColour(Blockly.Blocks.blockgroup.HUE4);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_BIG_IMAGE);

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 10; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }
    this.setOutput(true, "Image");
  }
};
Blockly.Blocks.monitor_arrow_image = {
    init: function () {
        this.setColour(Blockly.Blocks.blockgroup.HUE4);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_ARROW_IMAGE)
            .appendField(new Blockly.FieldDropdown([
              ["North", "ArrowNames.North"],
              ["NorthEast", "ArrowNames.NorthEast"],
              ["East", "ArrowNames.East"],
              ["SouthEast", "ArrowNames.SouthEast"],
              ["South", "ArrowNames.South"],
              ["SouthWest", "ArrowNames.SouthWest"],
              ["West", "ArrowNames.West"],
              ["NorthWest", "ArrowNames.NorthWest"]
            ]), 'arrow');

        this.setOutput(true, "Image");
        this.setInputsInline(true);
    }
}
