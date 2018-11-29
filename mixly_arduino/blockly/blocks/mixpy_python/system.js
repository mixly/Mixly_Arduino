'use strict';

goog.provide('Blockly.Blocks.system');

goog.require('Blockly.Blocks');


Blockly.Blocks.system.HUE = 120;


Blockly.Blocks.base_delay = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.MIXLY_DELAY + '(' + Blockly.MIXLY_DELAY_MS + ')')
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};

Blockly.Blocks.controls_millis = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
	    .appendField(Blockly.blockpy_time_time);
    this.setOutput(true, Number);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_MILLIS);
  }
};

Blockly.Blocks['time_localtime'] = {
    init: function() {
        this.setColour(Blockly.Blocks.system.HUE);        
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SYSTEM_TIME_LOCALTIME)
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_ALL, "all"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_YEAR, "0"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_MONTH, "1"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_DATE, "2"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_HOUR, "3"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_MINUTE, "4"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_SECOND, "5"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_INWEEK, "6"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_INYEAR, "7"],
                [Blockly.MIXLY_SYSTEM_TIME_LOCALTIME_DST, "8"]                
            ]), "op");
        this.setOutput(true);
        this.setInputsInline(true);
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
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};

Blockly.Blocks.reset = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
      .appendField(Blockly.MIXLY_MICROBIT_Reset_micro);
    this.setPreviousStatement(true);
    // this.setNextStatement(true);
  }
};



Blockly.Blocks.controls_mstimer2 = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
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
  }
};

Blockly.Blocks.controls_mstimer2_start = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.MIXLY_MSTIMER2_START);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.controls_mstimer2_stop = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendDummyInput()
		.appendField('MsTimer2')
		.appendField(Blockly.MIXLY_MSTIMER2_STOP);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};


Blockly.Blocks.time_sleep = {
  init: function() {
    this.setColour(Blockly.Blocks.system.HUE);
    this.appendValueInput("DELAY_TIME", Number)
        .appendField(Blockly.MIXLY_DELAY)        
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_NOVA_RTC_SEC)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_CONTROL_DELAY);
  }
};