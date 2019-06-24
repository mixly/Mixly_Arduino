"use strict";
goog.provide("Blockly.Blocks.MQTT");
goog.require("Blockly.Blocks");
Blockly.Blocks.blynk.HUE0 = 0; //红色
Blockly.Blocks.blynk.HUE1 = 159; //Mountain Meadow
Blockly.Blocks.blynk.HUE2 = 120; //绿色
Blockly.Blocks.blynk.HUE3 = 180; //青色
Blockly.Blocks.blynk.HUE4 = 240; //蓝色
Blockly.Blocks.blynk.HUE5 = 300; //紫色
Blockly.Blocks.blynk.MusicHUE = 200;
Blockly.Blocks.blynk.ICON_WIDTH = 20; //传感器图标宽度
Blockly.Blocks.blynk.ICON_HEIGHT = 20; //传感器图标高度

Blockly.Blocks.MQTT_server = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20))
    .appendField(Blockly.MQTT_SERVER);
    this.appendValueInput("server_add")
    .appendField(Blockly.MQTT_SERVER_ADD)
    .setCheck(String);
    this.appendValueInput("server_port")
    .appendField(Blockly.MIXLY_ETHERNET_CLINET_PORT)
    .setCheck(Number);
    this.appendValueInput("Client_ID")
    .appendField(Blockly.MQTT_Client_ID)
    .setCheck(String);
    this.appendValueInput("IOT_ID")
    .appendField(Blockly.MQTT_IOT_ID)
    .setCheck(String);
    this.appendValueInput("IOT_PWD", String)
    .appendField(Blockly.MQTT_IOT_PWD)
    .setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//WIFI信息
Blockly.Blocks.WIFI_info = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20))
    .appendField(Blockly.MIXLY_NETWORK_INIT);
    this.appendValueInput("SSID")
    .appendField(Blockly.MIXLY_ESP32_NETWORK_ID);
    this.appendValueInput("PWD")
    .appendField(Blockly.MIXLY_ESP32_NETWORK_PASSWORD);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};

Blockly.Blocks['network_connect'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_NETWORK_CONNECT);
    this.appendValueInput('id')
    .setCheck(String)
    .appendField(Blockly.MIXLY_ESP32_NETWORK_ID);
    this.appendValueInput('password')
    .setCheck(String)
    .appendField(Blockly.MIXLY_ESP32_NETWORK_PASSWORD);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_CONNECT_TOOLTIP);
  }
};

Blockly.Blocks['network_wifi_connect'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_NETWORK_WIFI_CONNECT);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_SYMBOL_QUESTION);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_WIFI_CONNECT_TOOLTIP);
  }
};

Blockly.Blocks['network_get_connect'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_NETWORK_GET_WIFI)
    .appendField(Blockly.MIXLY_ESP32_NETWORK_IP);
    this.setOutput(true);
    this.setInputsInline(true);
  }
};

Blockly.Blocks['network_stop'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_NETWORK_STOP_CONNECT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_NETWORK_STOP_TOOLTIP);
  }
};

Blockly.Blocks['MQTT_connect'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MQTT_connect);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip();
  }
};

//MQTT-发送消息到topic
Blockly.Blocks.MQTT_publish = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20))
    .appendField(Blockly.MQTT_publish);
    this.appendValueInput("data");
    this.appendDummyInput("")
    .appendField(Blockly.LANG_MATH_RANDOM_INT_INPUT_TO);
    this.appendValueInput("Topic")
    .appendField(Blockly.MQTT_Topic)
    .setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};

// 

Blockly.Blocks.MQTT_subscribe_value = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(Blockly.MQTT_Topic);
    this.appendValueInput("Topic");
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_I2C_VALUE)
    this.setInputsInline(true);
    this.setOutput(true, Boolean);
  }
};


Blockly.Blocks['MQTT_subscribe'] = {
  /**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(Blockly.Blocks.loops.HUE);
    this.appendValueInput('IF0')
    .setCheck([Boolean,Number])
    .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
    .appendField(Blockly.MQTT_Topic)
    .appendField(Blockly.MQTT_subscribe2);
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
    var containerBlock = this;
    var valueConnections = [];
    var statementConnections = [];
    var elseStatementConnection = null;
    if (this.elseCount_) {
      if(containerBlock.getInputTargetBlock('ELSE') && containerBlock.getInputTargetBlock('ELSE').previousConnection)
        elseStatementConnection = containerBlock.getInputTargetBlock('ELSE').previousConnection;
      this.removeInput('ELSE');
    }
    for (var i = this.elseifCount_; i > 0; i--) {
      if(containerBlock.getInputTargetBlock('IF' + i) && containerBlock.getInputTargetBlock('IF' + i).previousConnection)
        valueConnections[i] = (containerBlock.getInputTargetBlock('IF' + i).previousConnection);
      else
        valueConnections[i] = null;
      this.removeInput('IF' + i);
      if(containerBlock.getInputTargetBlock('DO' + i) && containerBlock.getInputTargetBlock('DO' + i).previousConnection)
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
      .setCheck(Boolean)
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + i)
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
      .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
    for(var i = valueConnections.length - 2; i > 0; i--){
      if(valueConnections[i])
        Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
    }
    for(var i = statementConnections.length - 2; i > 0; i--){
      if(statementConnections[i])
        Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
   decompose: function(workspace) {
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
        throw TypeError('Unknown block type: ' + clauseBlock.type);
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
  },
  /**
   * Reconstructs the block with all child blocks attached.
   */
   rebuildShape_: function() {
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
    this.reconnectChildBlocks_(valueConnections, statementConnections,elseStatementConnection);
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
   updateShape_: function() {
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
      .setCheck([Number,Boolean])
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
   reconnectChildBlocks_: function(valueConnections, statementConnections,
    elseStatementConnection) {
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
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