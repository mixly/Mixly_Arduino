'use strict';

goog.provide('Blockly.Blocks.communicate');
goog.require('Blockly.Blocks');

Blockly.Blocks.communicate.HUE = 140;
Blockly.Blocks['radio_send_number'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_RADIO_ON_RECEIVE)
            .appendField(new Blockly.FieldTextInput('key'), 'key')
            .appendField(" = ")
            .appendField(new Blockly.FieldTextInput('value'), 'value')

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    },
    getVars: function() {
        return [this.getFieldValue('key'), this.getFieldValue('value')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('key'))) {
          this.setTitleValue(newName, 'key');
        }

        if (Blockly.Names.equals(oldName, this.getFieldValue('value'))) {
            this.setTitleValue(newName, 'value');
        }
    }
}


Blockly.Blocks['radio_receive_string'] = {
    init:function(){
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SPI_WRITE);

        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['spi_frequency'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
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
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_CONNECTED);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);

    }
};
Blockly.Blocks['ble_on_disconnected'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_DISCONNECTED);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
};
Blockly.Blocks['ble_on_received'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);
        this.appendValueInput('data')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_ON_RECEIVE);

        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
};
Blockly.Blocks['ble_advertise_uid'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);

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
        this.setColour(Blockly.Blocks.communicate.HUE);

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
        this.setColour(Blockly.Blocks.communicate.HUE);

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
        this.setColour(Blockly.Blocks.communicate.HUE);

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
        this.setColour(Blockly.Blocks.communicate.HUE);

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
        this.setColour(Blockly.Blocks.communicate.HUE);

        this.appendValueInput('marker')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_READ_UNTIL);

        this.setOutput(true, String);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['ble_uart_service'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_UART_SERVICE);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_stop_advertising'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);

        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_STOP_ADVERTISING);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['ble_set_power'] = {
    init: function () {
        this.setColour(Blockly.Blocks.communicate.HUE);

        this.appendValueInput('data')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_BLE_SET_POWER);

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

