"use strict";
goog.provide("Blockly.Blocks.blynk");
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

var HW_TYPE = [
["USB", "USB"],
["WIFI", "WIFI"]
];
//物联网-服务器信息
Blockly.Blocks.blynk_usb_server = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 25, 25)).appendField(Blockly.blynk_USB_SERVER_INFO);
    this.appendValueInput("auth_key", String).appendField(Blockly.blynk_IOT_AUTH).setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};
//物联网-一键配网
Blockly.Blocks.blynk_smartconfig = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/smartconfig.png", 20, 20)).appendField(Blockly.blynk_smartconfig);
    this.appendValueInput("server_add").appendField(Blockly.blynk_SERVER_ADD).setCheck(String);
    this.appendValueInput("auth_key", String).appendField(Blockly.blynk_IOT_AUTH).setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl("https://gitee.com/hznupeter/Blynk_IOT/wikis/pages");
  }
};


//物联网-服务器信息_uno
Blockly.Blocks.blynk_server = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20)).appendField(Blockly.blynk_SERVER_INFO);
    this.appendValueInput("server_add").appendField(Blockly.blynk_SERVER_ADD).setCheck(String);
    this.appendValueInput("wifi_ssid").appendField(Blockly.blynk_WIFI_SSID).setCheck(String);
    this.appendValueInput("wifi_pass").appendField(Blockly.blynk_WIFI_PASS).setCheck(String);
    this.appendValueInput("auth_key", String).appendField(Blockly.blynk_IOT_AUTH).setCheck([String, Number]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl("https://gitee.com/hznupeter/Blynk_IOT/wikis/pages");
  }
};

//虚拟管脚选择
var BLYNK_VIRTUALPIN_SELECT = [
["V0", "V0"],
["V1", "V1"],
["V2", "V2"],
["V3", "V3"],
["V4", "V4"],
["V5", "V5"],
["V6", "V6"],
["V7", "V7"],
["V8", "V8"],
["V9", "V9"],
["V10", "V10"],
["V11", "V11"],
["V12", "V12"],
["V13", "V13"],
["V14", "V14"],
["V15", "V15"],
["V16", "V16"],
["V17", "V17"],
["V18", "V18"],
["V19", "V19"],
["V20", "V20"],
["V21", "V21"],
["V22", "V22"],
["V23", "V23"],
["V24", "V24"],
["V25", "V25"],
["V26", "V26"],
["V27", "V27"],
["V28", "V28"],
["V29", "V29"],
["V30", "V30"],
["V31", "V31"],
["V32", "V32"],
["V33", "V33"],
["V34", "V34"],
["V35", "V35"],
["V36", "V36"],
["V37", "V37"],
["V38", "V38"],
["V39", "V39"],
["V40", "V40"]
];
//虚拟管脚选择
var BLYNK_TIMER_SELECT = [
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
];
//物联网-发送数据到app
Blockly.Blocks.blynk_iot_push_data = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20)).appendField(Blockly.blynk_IOT_PUSH_DATA);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendValueInput("data").appendField(Blockly.blynk_IOT_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};

//从app端获取数据
Blockly.Blocks.blynk_iot_get_data = {
    /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20)).appendField(Blockly.blynk_IOT_GET_DATA);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendDummyInput().appendField("", "PARAMS");
    //add Gear to left top
    this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.arguments_ = [];//新增参数名称
    this.argumentstype_ = [];//新增参数类型
    this.setStatements_(true);
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.statementConnection_ = null;
  },

  getVars: function () {
    return [this.getFieldValue("VAR")];
  },

  renameVar: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue("VAR"))) {
      this.setTitleValue(newName, "VAR");
    }
  },

  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
   setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput("STACK")
      .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
      if (this.getInput("RETURN")) {
        this.moveInputBefore("STACK", "RETURN");
      }
    } else {
      this.removeInput("STACK", true);
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
      if (hash["arg_" + this.arguments_[i].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash["arg_" + this.arguments_[i].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = "";
    if (this.arguments_.length) {
      paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
      " " + this.arguments_.join(", ");
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    this.setFieldValue(paramString, "PARAMS");
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
    var container = document.createElement("mutation");
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement("arg");
      parameter.setAttribute("name", this.arguments_[i]);
      parameter.setAttribute("vartype", this.argumentstype_[i]);//新增
      container.appendChild(parameter);
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute("statements", "false");
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
      if (childNode.nodeName.toLowerCase() == "arg") {
        this.arguments_.push(childNode.getAttribute("name"));
  this.argumentstype_.push(childNode.getAttribute("vartype"));//新增
}
}
this.updateParams_();
Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute("statements") !== "false");
  },
  /**
   * Populate the mutator"s dialog with this block"s components.
   * @param {!Blockly.Workspace} workspace Mutator"s workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
   decompose: function(workspace) {
    var containerBlock = workspace.newBlock("procedures_mutatorcontainer");
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput("RETURN")) {
      containerBlock.setFieldValue(this.hasStatements_ ? "TRUE" : "FALSE",
       "STATEMENTS");
    } else {
      containerBlock.getInput("STATEMENT_INPUT").setVisible(false);
    }

    // Parameter list.
    var connection = containerBlock.getInput("STACK").connection;
    for (var i = 0; i < this.arguments_.length; i++) {
      var paramBlock = workspace.newBlock("procedures_mutatorarg");
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[i], "NAME");
      paramBlock.setFieldValue(this.argumentstype_[i], "TYPEVAR");//新增
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure"s callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog"s components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
   compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    this.argumentstype_= [];//新增
    var paramBlock = containerBlock.getInputTargetBlock("STACK");
    while (paramBlock) {
      this.arguments_.push(paramBlock.getFieldValue("NAME"));
      this.argumentstype_.push(paramBlock.getFieldValue("TYPEVAR"));//新增
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
      paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue("STATEMENTS");
    if (hasStatements !== null) {
      hasStatements = hasStatements == "TRUE";
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, "STACK");
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput("STACK").connection;
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
    var name = this.getFieldValue("NAME");
    Blockly.Procedures.disposeCallers(name, this.workspace);
    // Call parent"s destructor.
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
    return ["ignoreProcedureIotGetData", this.arguments_, false];
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
   * If the name matches one of this block"s variables, rename it.
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
      // Update the mutator"s variables if the mutator is open.
      if (this.mutator.isVisible()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var i = 0, block; block = blocks[i]; i++) {
          if (block.type == "procedures_mutatorarg" &&
            Blockly.Names.equals(oldName, block.getFieldValue("NAME"))) {
            block.setFieldValue(newName, "NAME");
        }
      }
    }
  }
},
  /**
   * Add custom menu options to this block"s context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
   customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue("NAME");
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", name);
    var xmlMutation = goog.dom.createDom("mutation");
    xmlMutation.setAttribute("name", name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = goog.dom.createDom("arg");
      xmlArg.setAttribute("name", this.arguments_[i]);
      xmlArg.setAttribute("type", this.argumentstype_[i]);//新增
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom("block", null, xmlMutation);
    xmlBlock.setAttribute("type", this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var option = {enabled: true};
        var name = this.arguments_[i];
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", name);
        var xmlField = goog.dom.createDom("field", null, name);
        xmlField.setAttribute("name", "VAR");
  xmlField.setAttribute("type", "TYPEVAR");//新增
  var xmlBlock = goog.dom.createDom("block", null, xmlField);
  xmlBlock.setAttribute("type", "variables_get");
  option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
  options.push(option);
}
}
},
callType_: "procedures_callnoreturn"
};


Blockly.Blocks["procedures_mutatorarg"] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput()
    .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
    .appendField(new Blockly.FieldDropdown([[Blockly.LANG_MATH_INT, "int"], [Blockly.LANG_MATH_LONG, "long"], [Blockly.LANG_MATH_FLOAT, "float"], [Blockly.LANG_MATH_BOOLEAN, "boolean"], [Blockly.LANG_MATH_BYTE, "byte"], [Blockly.LANG_MATH_CHAR, "char"], [Blockly.LANG_MATH_STRING, "String"]]), "TYPEVAR")
    .appendField(new Blockly.FieldTextInput("x", this.validator_), "NAME");
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
    newVar = newVar.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "");
    return newVar || null;
  }
};


//blynk定时器
Blockly.Blocks.Blynk_iot_timer = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendValueInput("TIME")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.blynk_TIMER).appendField(new Blockly.FieldDropdown(BLYNK_TIMER_SELECT), "timerNo");
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MILLIS);
    this.appendStatementInput("DO")
    .appendField(Blockly.MIXLY_MSTIMER2_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};
//blynk硬件已连接
Blockly.Blocks.Blynk_iot_BLYNK_CONNECTED = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(Blockly.BLYNK_CONNECTED);
    this.appendStatementInput("DO")
    .appendField(Blockly.MIXLY_MSTIMER2_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};

//blynk硬件已连接
Blockly.Blocks.Blynk_iot_BLYNK_APP_CONNECTED = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(Blockly.BLYNK_APP_CONNECTED);
    this.appendStatementInput("DO")
    .appendField(Blockly.MIXLY_MSTIMER2_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};

//blynk硬件已连接
Blockly.Blocks.Blynk_iot_BLYNK_APP_DISCONNECTED = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(Blockly.BLYNK_APP_DISCONNECTED);
    this.appendStatementInput("DO")
    .appendField(Blockly.MIXLY_MSTIMER2_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
  }
};


//blynk 同步所有管脚状态
Blockly.Blocks.Blynk_iot_BLYNK_syncAll = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("")
    .appendField(Blockly.BLYNK_syncAll);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

//blynk 同步虚拟管脚状态
Blockly.Blocks.blynk_iot_syncVirtual = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/iot.png", 20, 20)).appendField(Blockly.blynk_IOT_syncVirtual);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};
//物联网-LED组件颜色&开关
Blockly.Blocks.blynk_iot_WidgetLED_COLOR = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_led.png", 20, 20)).appendField(Blockly.blynk_IOT_WidgetLED);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin").appendField(Blockly.blynk_iot_WidgetLED_COLOR);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
    this.appendDummyInput("").appendField(Blockly.MIXLY_STAT)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH, "HIGH"], [Blockly.MIXLY_LOW, "LOW"]]), "STAT");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};

//物联网-LED组件颜色&亮度
Blockly.Blocks.blynk_iot_WidgetLED_VALUE = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_led.png", 20, 20)).appendField(Blockly.blynk_IOT_WidgetLED);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin").appendField(Blockly.blynk_iot_WidgetLED_COLOR);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldColour("#ff0000"), "RGB_LED_COLOR");
    this.appendValueInput("NUM", Number)
    .appendField(Blockly.MIXLY_BRIGHTNESS)
    .setCheck(Number);
    //this.appendValueInput("data").appendField(Blockly.blynk_IOT_DATA);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(" ");
    this.setHelpUrl();
  }
};

var AC_TYPE = [
[Blockly.blynk_IOT_GREE, "Gree"],
[Blockly.blynk_IOT_MIDEA, "Midea"],
];

var AC_POWER = [
[Blockly.MIXLY_ON, "true"],
[Blockly.blynk_IOT_OFF, "false"]
];
var AC_MODE = [
[Blockly.blynk_IOT_FAN, "FAN"], 
[Blockly.blynk_IOT_HEAT, "HEAT"],
[Blockly.blynk_IOT_COOL, "COOL"],
[Blockly.blynk_IOT_DRY, "DRY"], 
[Blockly.blynk_IOT_AUTO, "AUTO"]];
var AC_FAN = [
[Blockly.blynk_IOT_FAN_3, "FAN_3"],
[Blockly.blynk_IOT_FAN_2, "FAN_2"],
[Blockly.blynk_IOT_FAN_1, "FAN_1"], 
[Blockly.blynk_IOT_FAN_0, "FAN_0"]];

//红外控制空调
Blockly.Blocks.blynk_iot_ir_send_ac = {
  init: function () {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(Blockly.blynk_IOT_IR_SEND).appendField(new Blockly.FieldDropdown(AC_TYPE), "AC_TYPE");
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.blynk_IOT_IR_POWER).appendField(new Blockly.FieldDropdown(AC_POWER), "AC_POWER");
    this.appendDummyInput("").appendField(Blockly.blynk_IOT_IR_MODE).appendField(new Blockly.FieldDropdown(AC_MODE), "AC_MODE");
    this.appendDummyInput("").appendField(Blockly.blynk_IOT_IR_FAN).appendField(new Blockly.FieldDropdown(AC_FAN), "AC_FAN");
    this.appendValueInput("AC_TEMP", Number).appendField(Blockly.blynk_IOT_IR_TEMP).setCheck(Number);
    this.setPreviousStatement(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_IR_SEND_NEC_TOOLTIP);
  }
};

//红外接收模块(raw)
Blockly.Blocks.blynk_iot_ir_recv_raw = {
  init: function () {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendValueInput("PIN", Number).appendField(Blockly.blynk_IOT_IR_RECEIVE_RAW).setCheck(Number);
      //  this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);
      this.setTooltip(Blockly.blynk_IOT_IR_RECEIVE_RAW_TOOLTIP);
    }
  };

//红外发送
Blockly.Blocks.blynk_iot_ir_send = {
  init: function () {
   this.setColour(Blockly.Blocks.blynk.HUE1);
   this.appendValueInput("PIN", Number).appendField(Blockly.blynk_IOT_IR_SEND).setCheck(Number);
   this.appendDummyInput("").appendField(Blockly.blynk_IOT_IR_SEND_CODE).appendField(new Blockly.FieldTextInput('0,0,0'), 'IR_CODE');
   this.setPreviousStatement(true);
   this.setNextStatement(true);
   this.setInputsInline(true);
   this.setTooltip(Blockly.blynk_IOT_IR_SEND_CODE_TOOLTIP);
 }
}


//物联网-发送邮件
Blockly.Blocks.blynk_email = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_email.png", 20, 20)).appendField(Blockly.blynk_EMAIL);
    this.appendValueInput("email_add").appendField(Blockly.blynk_EMAIL_ADD).setCheck(String);
    this.appendValueInput("Subject").appendField(Blockly.blynk_EMAIL_SUBJECT).setCheck(String);
    this.appendValueInput("content").appendField(Blockly.blynk_EMAIL_CONTENT).setCheck(String);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};
//物联网-发送通知
Blockly.Blocks.blynk_notify = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_push_notifications.png", 20, 20)).appendField(Blockly.blynk_NOTIFY);
    this.appendValueInput("content").appendField(Blockly.blynk_NOTIFY_CONTENT).setCheck([String,Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//物联网-终端组件显示文本
Blockly.Blocks.blynk_terminal = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_terminal.png", 20, 20)).appendField(Blockly.blynk_terminal);
    this.appendValueInput("content").appendField(Blockly.blynk_NOTIFY_CONTENT).setCheck([String,Number,Boolean]);
    this.appendDummyInput("").appendField(Blockly.BLYNK_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip();
    this.setHelpUrl();
  }
};
//物联网-视频流
Blockly.Blocks.blynk_videourl = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_video.png", 20, 20));
    this.appendValueInput("url").appendField(Blockly.blynk_VIDEOURL).setCheck(String);
    this.appendDummyInput("").appendField(Blockly.BLYNK_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};
//物联网-桥接授权码
Blockly.Blocks.blynk_bridge_auth = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_bridge.png", 20, 20));
    this.appendValueInput("auth").appendField(Blockly.blynk_BRIDGE_AUTH).setCheck(String);
    this.appendDummyInput("").appendField(Blockly.BLYNK_BRIDGE_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//物联网-桥接数字输出
Blockly.Blocks.blynk_bridge_digitalWrite = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_bridge.png", 20, 20));
    this.appendDummyInput("").appendField(Blockly.BLYNK_BRIDGE_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendValueInput("PIN", Number).setCheck(Number).appendField(Blockly.MIXLY_DIGITALWRITE_PIN);
    this.appendValueInput("STAT").appendField(Blockly.MIXLY_STAT).setCheck([Number,Boolean]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//物联网-桥接模拟输出
Blockly.Blocks.blynk_bridge_AnaloglWrite = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_bridge.png", 20, 20));
    this.appendDummyInput("").appendField(Blockly.BLYNK_BRIDGE_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendValueInput("PIN", Number).setCheck(Number).appendField(Blockly.MIXLY_ANALOGWRITE_PIN);
    this.appendValueInput("NUM", Number).appendField(Blockly.MIXLY_VALUE2).setCheck(Number);  
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//物联网-桥接虚拟管脚
Blockly.Blocks.blynk_bridge_VPin = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_bridge.png", 20, 20));
     this.appendDummyInput("").appendField(Blockly.BLYNK_BRIDGE_VIRTUALPIN);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendDummyInput("").appendField(Blockly.BLYNK_VIRTUALPIN).appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin2");
    this.appendValueInput("NUM").appendField(Blockly.MIXLY_VALUE2);  
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//物联网-RTC组件初始化
Blockly.Blocks.blynk_WidgetRTC_init = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_rtc.png", 20, 20)).appendField(Blockly.blynk_WidgetRTC_init);
    this.appendValueInput("NUM", Number).appendField(Blockly.blynk_WidgetRTC_setSyncInterval).setCheck(Number); 
    this.appendDummyInput("").appendField(Blockly.blynk_WidgetRTC_mintues);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//传感器-实时时钟块_时间变量
var BLYNK_RTC_TIME_TYPE = [
[Blockly.MIXLY_YEAR, "year"],
[Blockly.MIXLY_MONTH, "month"],
[Blockly.MIXLY_DAY, "day"],
[Blockly.MIXLY_HOUR, "hour"],
[Blockly.MIXLY_MINUTE, "minute"],
[Blockly.MIXLY_SECOND, "second"],
[Blockly.MIXLY_WEEK, "weekday"]
];

//传感器-实时时钟块_获取时间
Blockly.Blocks.blynk_WidgetRTC_get_time = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_rtc.png", 20, 20)).setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.blynk_WidgetRTC_get_time);

    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(BLYNK_RTC_TIME_TYPE), "TIME_TYPE");
    this.setInputsInline(true);
    this.setOutput(true, Number);
  }
};

//播放音乐
Blockly.Blocks.blynk_iot_playmusic = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_player.png", 20, 20)).appendField(Blockly.blynk_iot_playmusic);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip("");
  }
};
//从终端获取字符串
Blockly.Blocks.blynk_iot_terminal_get = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_terminal.png", 20, 20)).appendField(Blockly.blynk_IOT_terminal_get);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip("");
  }
};

//光线传感器
Blockly.Blocks.blynk_light = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_light_sensor.png", 20, 20)).appendField(Blockly.blynk_LIGHT);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip("");
  }
};

//重力传感器
Blockly.Blocks.blynk_gravity = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_gravity_sensor.png", 20, 20)).appendField(Blockly.blynk_GRAVITY);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip("");
  }
};

//加速度传感器
Blockly.Blocks.blynk_acc = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_accelerometer_sensor.png", 20, 20)).appendField(Blockly.blynk_ACC);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip(Blockly.blynk_ACC_tooltip);
  }
};

//时间输入-简单
Blockly.Blocks.blynk_time_input_1 = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.HUE1);
    this.appendDummyInput("").appendField(new Blockly.FieldImage("../../media/blynk/widget_timeinput.png", 20, 20)).appendField(Blockly.blynk_time_input_1);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown(BLYNK_VIRTUALPIN_SELECT), "Vpin");
    this.appendStatementInput('DO').appendField('');
    this.setInputsInline(true);
    this.setTooltip(Blockly.blynk_ACC_tooltip);
  }
};


//MP3播放控制
var GD5800_MP3_CONTROL_TYPE = [
[Blockly.MIXLY_MP3_PLAY, "play();"],
[Blockly.MIXLY_MP3_PAUSE, "pause();"],
[Blockly.MIXLY_MP3_NEXT, "next();"],
[Blockly.MIXLY_MP3_PREV, "prev();"],
[Blockly.MIXLY_MP3_VOL_UP, "volumeUp();"],
[Blockly.MIXLY_MP3_VOL_DOWN, "volumeDn();"]
];

//GD5800 MP3模块
Blockly.Blocks.GD5800_MP3_CONTROL = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.MusicHUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_TX_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_RX_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_CONTROL_TYPE), "CONTROL_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//MP3循环模式
var GD5800_MP3_LOOP_MODE = [
[Blockly.MIXLY_MP3_LOOP_ALL, "MP3_LOOP_ALL"],
[Blockly.MIXLY_MP3_LOOP_FOLDER, "MP3_LOOP_FOLDER"],
[Blockly.MIXLY_MP3_LOOP_ONE, "MP3_LOOP_ONE"],
[Blockly.MIXLY_MP3_LOOP_RAM, "MP3_LOOP_RAM"]
];

//GD5800 MP3模块循环模式
Blockly.Blocks.GD5800_MP3_LOOP_MODE = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.MusicHUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_LOOP_MODE).appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_LOOP_MODE), "LOOP_MODE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//MP3 设置EQ
var GD5800_MP3_EQ_MODE = [
[Blockly.MIXLY_MP3_EQ_NORMAL, "MP3_EQ_NORMAL"],
[Blockly.MIXLY_MP3_EQ_POP, "MP3_EQ_POP"],
[Blockly.MIXLY_MP3_EQ_ROCK, "MP3_EQ_ROCK"],
[Blockly.MIXLY_MP3_EQ_JAZZ, "MP3_EQ_JAZZ"],
[Blockly.MIXLY_MP3_EQ_CLASSIC, "MP3_EQ_CLASSIC"],
[Blockly.MIXLY_MP3_EQ_BASS, "MP3_EQ_BASS"]
];

//GD5800 MP3模块EQ模式
Blockly.Blocks.GD5800_MP3_EQ_MODE = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.MusicHUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_EQ_MODE).appendField(Blockly.MIXLY_STAT).appendField(new Blockly.FieldDropdown(GD5800_MP3_EQ_MODE), "EQ_MODE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//GD5800 MP3模块设置音量
Blockly.Blocks.GD5800_MP3_VOL = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.MusicHUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendDummyInput("").appendField(Blockly.MIXLY_MP3_VOL);
    this.appendValueInput("vol", Number).appendField(Blockly.MIXLY_STAT).setCheck(Number);  
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
    this.setHelpUrl();
  }
};

//GD5800 MP3模块播放第N首
Blockly.Blocks.GD5800_MP3_PLAY_NUM = {
  init: function() {
    this.setColour(Blockly.Blocks.blynk.MusicHUE);
    this.appendDummyInput("").appendField(Blockly.GD5800_MP3);
    this.appendValueInput("RXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("TXPIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.appendValueInput("NUM", Number).appendField(Blockly.MIXLY_MP3_PLAY_NUM).setCheck(Number);  
    this.appendDummyInput("").appendField("首");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('歌曲顺序按照存入U盘时间排序。');
    this.setHelpUrl();
  }
};


//lm35温度传感器-arduino
Blockly.Blocks.LM35ESP = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_LM35);
    this.appendValueInput("PIN", Number).appendField(Blockly.MIXLY_PIN).setCheck(Number);
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip('');
  }
};
//模拟传感器-IIC地址查找
Blockly.Blocks.IICSCAN = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.IICSCAN);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};




Blockly.Blocks.factory_declare2 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
  this.appendDummyInput("")
    .appendField(new Blockly.FieldTextArea('//define user code;'), 'VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

