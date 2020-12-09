'use strict';

goog.provide('Blockly.Blocks.PocketCard');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;
profile["default"] = profile["PocketCard"];

Blockly.Blocks.mixgo_button_is_pressed = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_BUTTON);
     this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
  }
};


Blockly.Blocks.sensor_mixgo_light= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
  }
};

Blockly.Blocks.sensor_mixgo_sound= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
  }
};

Blockly.Blocks.mixgo_touch_pin= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
     .appendField(Blockly.MIXLY_ESP32_TOUCH)
     .appendField(Blockly.MIXLY_PIN)
     .appendField(new Blockly.FieldDropdown(profile.default.touch), 'touch_pin');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_TOUCHED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
  }
};

Blockly.Blocks.sensor_mixgo_light = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_LIGHT)
      .appendField(new Blockly.FieldDropdown([["A", "39"], ["B", "36"]]), "direction");
    this.setOutput(true, Number);
    this.setInputsInline(true);
  }
};

//NTC电阻
Blockly.Blocks.NTC_TEMP = {
  init: function () {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("NTC")
    .appendField(Blockly.MIXLY_TEMP);
    
    this.setInputsInline(false);
    this.setOutput(true, Number);
    this.setTooltip();
  }
};