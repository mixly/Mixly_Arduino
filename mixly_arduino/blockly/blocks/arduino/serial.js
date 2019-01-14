'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');
Blockly.Blocks.serial.HUE = 65;
Blockly.Blocks['serial_begin'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", Number)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
		.appendField(Blockly.MIXLY_SERIAL_BEGIN)
		.setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIAL_BEGIN);
  }
};

Blockly.Blocks['serial_write'] = {
    init: function () {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput("CONTENT", String)
            .appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
            .appendField(Blockly.MIXLY_SERIAL_WRITE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_WRITE_TOOLTIP);
    }
};

Blockly.Blocks['serial_print'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", String)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_PRINT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
   init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", String)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_PRINTLN);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};
//打印16进制数
Blockly.Blocks['serial_print_hex'] = {
   init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", Number)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_PRINT_HEX)
        .setCheck(Number);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
  }
};

Blockly.Blocks['serial_available'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
	this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_AVAILABLE);
	this.setOutput(true, Boolean);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_AVAILABLE);
  }
};

Blockly.Blocks['serial_readstr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
	this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_READSTR);
	this.setOutput(true, String);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
  }
};

Blockly.Blocks['serial_readstr_until'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
	this.appendValueInput("CONTENT", Number)
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_READSTR_UNTIL)
		.setCheck(Number);
	this.setInputsInline(true);
	this.setOutput(true, String);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIAL_READSTRUNITL.replace('%1',Blockly.Arduino.valueToCode(this, 'CONTENT',Blockly.Arduino.ORDER_ATOMIC)));
  }
};

Blockly.Blocks['serial_parseInt_Float'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
	this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
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
   this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
		.appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
        .appendField(Blockly.MIXLY_SERIAL_FLUSH);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIAL_FLUSH);
  }
};

Blockly.Blocks['serial_softserial'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
   this.appendValueInput("RX", Number)
       .appendField(Blockly.MIXLY_SETUP)
	   .appendField(new Blockly.FieldDropdown(profile.softserial_select), "serial_select")
	   .appendField("RX#")
       .setCheck(Number)
	   .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("TX", Number)
	   .appendField("TX#")
       .setCheck(Number)
	   .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_TOOLTIP_SOFTSERIAL.replace('%1',Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC)).replace('%2',Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC)));
  }
};

Blockly.Blocks['serial_event'] = {
    init: function () {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(profile.default.serial_select), "serial_select")
            .appendField(Blockly.MIXLY_SERIAL_EVENT);
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_SERIALEVENT);
    }
};