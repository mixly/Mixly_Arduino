'use strict';

goog.provide('Blockly.Blocks.serial');

goog.require('Blockly.Blocks');

Blockly.Blocks.serial.HUE = 40

Blockly.Blocks.serial_open = {
    init: function () {
        var bps =
        [
         ["115200", '115200'],["256000", '256000'],["128000", '128000'],["57600", '57600'], ["56000", '56000'],  
         ["43000", '43000'],["38400", '38400'],["28800", '28800'],["19200", '19200'], ["9600", '9600'] ,  
         ["4800", '4800'],["2400", '2400'],["1200", '1200'],["600", '600'], ["300", '300']  , ["110", '110']
        ];
        this.setColour(Blockly.Blocks.serial.HUE);   
        this.appendDummyInput("")
          .appendField(new Blockly.FieldLabel(Blockly.Msg.MIXPY_SERIAL_OPEN))   
          .appendField(new Blockly.FieldTextInput('ser'), 'SER')     
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SERIAL_BEGIN)    
            .appendField(new Blockly.FieldDropdown(bps), 'BPS')
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXPY_SERIAL_OPEN_TIMEOUT);    
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXPY_SERIAL_OPEN_TOOLTIP);
    }
};

Blockly.Blocks.serial_write = {
    init: function () {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput('SER')
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXPY_SERIAL_WRITE);
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXPY_SERIAL_WRITE_TOOLTIP);
    }
};

Blockly.Blocks.serial_read_b = {
  init: function() {
    this.setColour(Blockly.Blocks.serial.HUE);
    this.appendValueInput('SER')
    this.appendValueInput('VAR')
        .setCheck(Number)
        .appendField(Blockly.Msg.MIXPY_SERIAL_READ);
    this.setInputsInline(true);
    this.setOutput(true, String);
    this.setTooltip(Blockly.Msg.MIXPY_SERIAL_READ_TOOLTIP);
  }
};

Blockly.Blocks.serial_close = {
    init: function () {
        this.setColour(Blockly.Blocks.serial.HUE);
        this.appendValueInput('SER')
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXPY_SERIAL_CLOSE);
        
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.MIXPY_SERIAL_CLOSE_TOOLTIP);
    }
};