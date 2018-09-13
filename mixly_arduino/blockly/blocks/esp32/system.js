'use strict';

goog.provide('Blockly.Blocks.system');

goog.require('Blockly.Blocks');


Blockly.Blocks.system.HUE = 120//'#EB8045';


Blockly.Blocks.base_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_DELAY)
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_Second, "s"], [Blockly.MIXLY_mSecond, "ms"], [Blockly.MIXLY_uSecond, "us"]]), 'Time');
     this.appendValueInput("DELAY_TIME", Number)
         .setCheck(Number);
    this.setFieldValue('ms','Time')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};

Blockly.Blocks.Panic_with_status_code = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("STATUS_CODE", Number)
        .appendField(Blockly.MIXLY_MICROBIT_Panic_with_status_code)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Panic_with_status_code);
  }
};

Blockly.Blocks.reset = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Reset_micro);
    this.setPreviousStatement(true);
    // this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_MICROBIT_Reset_micro);
  }
};


Blockly.Blocks.controls_millis = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
	      .appendField(Blockly.MIXLY_RUNTIME);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_mSecond, "ms"], [Blockly.MIXLY_uSecond, "us"]]), 'Time');
    this.setOutput(true, Number);
    this.setInputsInline(true);
	  this.setTooltip(Blockly.MIXLY_RUNTIME);
  }
};


Blockly.Blocks['raw_block'] = {
  // Container.
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
        .appendField('Code Block:');
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextArea('12345'), 'TEXT');
  }
};

Blockly.Blocks.controls_uname = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_PY_CONTORL_UNAME);

    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN + Blockly.MIXLY_MICROBIT_PY_CONTORL_UNAME);
  }
};

Blockly.Blocks.timer = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput('period')
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Timer")
        .appendField(Blockly.MIXLY_MICROBIT_JS_PERIOD_MIL);
    this.appendValueInput('mode')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE);
    this.appendValueInput('callback')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    // this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS2);
  }
};

Blockly.Blocks.timer2 = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("period")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Timer")
        .appendField(Blockly.MIXLY_MICROBIT_JS_PERIOD_MIL)
        .setCheck(Number);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_PYTHON_ONE_SHOT, "ONE_SHOT"], [Blockly.MIXLY_PYTHON_PERIODIC, "PERIODIC"]]), "mode");
    this.appendStatementInput('callback')
        .appendField(Blockly.MIXLY_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
  }
};