'use strict';

goog.provide('Blockly.Blocks.Handbit');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;

Blockly.Blocks.handbit_button_is_pressed = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.MIXLY_BUTTON);
    this.appendDummyInput("").appendField(new Blockly.FieldDropdown([['A', '0'], ['B', '2']]), 'btn');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
  }
};


Blockly.Blocks.handbit_light= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
  }
};

Blockly.Blocks.handbit_sound= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
  }
};


Blockly.Blocks.sensor_mixgo_pin_near = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "34"], [Blockly.Msg.TEXT_TRIM_RIGHT, "36"]]), "direction")
    .appendField(Blockly.MIXLY_ESP32_NEAR);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('direction');
      var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
      var mode1 = Blockly.MIXLY_ESP32_NEAR;
      var TOOLTIPS = {
        'left':Blockly.Msg.TEXT_TRIM_LEFT,
        'right':Blockly.Msg.TEXT_TRIM_RIGHT,
      };
      return mode0 +TOOLTIPS[mode] + mode1
    });
  }
};
Blockly.Blocks.mixGo_led = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING)
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LEFT,"0"],[Blockly.MIXLY_RIGHT,"5"]]), 'STAT');
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.mixGo_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING)
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LEFT,"0"],[Blockly.MIXLY_RIGHT,"5"]]), 'STAT');
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

var MixGo_MPU9250_GETAB = [
[Blockly.MixGo_MPU9250_AX, "a"],
[Blockly.MixGo_MPU9250_AY, "b"],
[Blockly.MixGo_MPU9250_AZ, "c"],
[Blockly.MixGo_MPU9250_GX, "d"],
[Blockly.MixGo_MPU9250_GY, "e"],
[Blockly.MixGo_MPU9250_GZ, "f"],
[Blockly.MixGo_MPU9250_MX, "g"],
[Blockly.MixGo_MPU9250_MY, "h"],
[Blockly.MixGo_MPU9250_MZ, "i"]
];

//传感器_重力感应块_获取9轴数据
Blockly.Blocks.mixgo_MPU9250 = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("").appendField(Blockly.MixGo_MPU9250);
    this.appendDummyInput("").setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown(MixGo_MPU9250_GETAB), "MixGo_MPU9250_GETAB");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("");
    this.setHelpUrl('');
  }
};

Blockly.Blocks.inout_touchRead = {
    init: function(){
        this.setColour(20);
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_TOUCH)
        .appendField(Blockly.MIXLY_PIN)
        .appendField(new Blockly.FieldDropdown([["P", "27"], ["Y", "14"],["T", "12"],["H", "13"],["O", "15"],["N", "4"]]), 'touch_pin');
        this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};