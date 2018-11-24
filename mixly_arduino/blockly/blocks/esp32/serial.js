'use strict';

goog.provide('Blockly.Blocks.serial');
goog.require('Blockly.Blocks');

Blockly.Blocks.serial.HUE = 65//'#58a8de'//65;
Blockly.Blocks['serial_print'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", String)
        .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
        .appendField(Blockly.MIXLY_SERIAL_PRINT);
    //this.setFieldValue('1','mode')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
   init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", String)
        .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
        .appendField(Blockly.MIXLY_SERIAL_PRINTLN);
    //this.setFieldValue('1','mode')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.TEXT_PRINT_Huanhang_TOOLTIP+Blockly.Msg.TEXT_PRINT_TOOLTIP);
  }
};
//打印16进制数
Blockly.Blocks['serial_print_hex'] = {
   init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("CONTENT", Number)
        .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
        .appendField(Blockly.MIXLY_SERIAL_PRINT_HEX)
        .setCheck(Number);
    //this.setFieldValue('1','mode')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setTooltip(Blockly.Msg.TEXT_PRINT_HEX_TOOLTIP);
  }
};

Blockly.Blocks['serial_receive_data_event'] = {
    init: function () {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput('char_marker')
            .setCheck(String)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SERIAL_WHEN_CONTAIN_DATA)
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
    }
};

Blockly.Blocks['serial_readstr'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
	this.appendDummyInput()
          .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
        .appendField(Blockly.MIXLY_SERIAL_READSTR);
	//this.setFieldValue('1','mode')
  this.setOutput(true, String);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERIAL_READ_STR);
  }
};

Blockly.Blocks['serial_any'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
  this.appendDummyInput()
          .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
        .appendField(Blockly.MIXLY_SERIAL_AVAILABLE);
  //this.setFieldValue('1','mode')
  this.setOutput(true, Boolean);
  this.setTooltip(Blockly.MIXLY_SERIAL_AVAILABLE1);
  }
};

Blockly.Blocks['serial_readline'] = {
    init: function() {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendDummyInput()
                .appendField("Serial")
        .appendField(new Blockly.FieldDropdown([['uart1', '1'], ['uart2', '2']]), 'mode')
            .appendField(Blockly.MIXLY_ESP32_READ_LINE);
        //this.setFieldValue('1','mode')
        this.setOutput(true, String);
        this.setTooltip(Blockly.MIXLY_MICROBIT_JS_SERIAL_READ_LINE1);
    }
};

Blockly.Blocks['serial_readstr_until'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
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

Blockly.Blocks['serial_softserial'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
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
          .appendField(Blockly.MIXLY_SERIAL_BEGIN)
          .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['37400', '38400'], ['31250', '31250'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600'], ['4800', '4800'], ['2400', '2400'], ['1200', '1200'], ['300', '300']]), 'baudrate');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_SERIAL_softserial);
  }
};

Blockly.Blocks['serial_softserial'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_SETUP)
        .appendField(new Blockly.FieldDropdown([['uart1 (RX=23,TX=19)', '1'], ['uart2 (RX=5,TX=18)', '2']]), 'mode'); 
    //this.setFieldValue('1','mode')
    this.appendDummyInput()
          .appendField(Blockly.MIXLY_SERIAL_BEGIN)
          .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['37400', '38400'], ['31250', '31250'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600'], ['4800', '4800'], ['2400', '2400'], ['1200', '1200'], ['300', '300']]), 'baudrate');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.MIXLY_SERIAL_softserial);
  }
};

Blockly.Blocks['serial_begin'] = {
  init: function() {
   this.setColour(Blockly.Blocks.serial.HUE);
   this.appendDummyInput()
          .appendField("Serial " + Blockly.MIXLY_SERIAL_BEGIN)
          .appendField(new Blockly.FieldDropdown([['115200', '115200'], ['57600', '57600'], ['37400', '38400'], ['31250', '31250'], ['28800', '28800'], ['19200', '19200'], ['14400', '14400'], ['9600', '9600'], ['4800', '4800'], ['2400', '2400'], ['1200', '1200'], ['300', '300']]), 'baudrate');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  this.setInputsInline(true);
  this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_SET+Blockly.MIXLY_SERIAL_BEGIN);
  }
};

Blockly.Blocks['system_input']={
init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_raw_input)
        .setCheck(String);
    this.setOutput(true);
        this.setTooltip(Blockly.Msg.INOUT_input_TOOLTIP);
  }
}

Blockly.Blocks['system_print'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_print);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.BLOCKPY_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['system_print_inline'] = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput("VAR")
        .appendField(Blockly.blockpy_inout_print_inline);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_INLINE_TOOLTIP);
  }
};