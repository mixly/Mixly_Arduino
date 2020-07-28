'use strict';

goog.provide('Blockly.Blocks.sensor');
goog.require('Blockly.Blocks');
Blockly.Blocks.sensor.HUE = 40;

Blockly.Blocks.chaoshengbo2 = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_CHAOSHENGBO);
    this.appendDummyInput("")  
    .appendField('Trig#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "Trig")
    .appendField('Echo#')
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "Echo");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    // this.setFieldValue("2","Trig");
    // this.setFieldValue("4","Echo");
  }
};

//DS18B20温度传感器
Blockly.Blocks.ds18b20 = {
  init: function () {
    var UNIT = [[Blockly.MIXLY_DS18B20_C, '0'], [Blockly.MIXLY_DS18B20_F, '1']];
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DS18B20)
    .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
    .appendField(Blockly.MIXLY_GETTEMPERATUE)
    .appendField(new Blockly.FieldDropdown(UNIT), "UNIT");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_DS18);
  }
};

//初始化TCS230颜色传感器
Blockly.Blocks.tcs230_init= {
  init: function() { 
  this.appendDummyInput()  
  .appendField(Blockly.MIXLY_SETUP+" TCS230");
  this.appendValueInput("tcs230_s0")
  .setCheck(null)  
  .appendField("S0");
  this.appendValueInput("tcs230_s1")
  .setCheck(null)  
  .appendField("S1");
  this.appendValueInput("tcs230_s2")
  .setCheck(null)  
  .appendField("S2");
  this.appendValueInput("tcs230_s3")
  .setCheck(null)  
  .appendField("S3");
  this.appendValueInput("tcs230_led")
  .setCheck(null)  
  .appendField("LED");
  this.appendValueInput("tcs230_out")
  .setCheck(null)  
  .appendField("OUT");
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
  this.setColour(Blockly.Blocks.sensor.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};

//TCS230颜色传感器 获取RGB值
Blockly.Blocks.tcs230_Get_RGB= {
  init: function() { 
  this.appendDummyInput()  
  .appendField("TCS230")
  .appendField(Blockly.MIXLY_GET)
  .appendField(new Blockly.FieldDropdown([[Blockly.Msg.COLOUR_RGB_RED,"R"],[Blockly.Msg.COLOUR_RGB_GREEN,"G"],[Blockly.Msg.COLOUR_RGB_BLUE,"B"]]), "tcs230_color");
  this.setInputsInline(true);
  this.setOutput(true, null);
  this.setColour(Blockly.Blocks.sensor.HUE);
  this.setTooltip("");
  this.setHelpUrl("");
  }
};