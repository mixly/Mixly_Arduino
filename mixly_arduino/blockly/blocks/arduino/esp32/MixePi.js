'use strict';

goog.provide('Blockly.Blocks.MixePi');
goog.require('Blockly.Blocks');
Blockly.Blocks.MixePi.HUE = "#e4324f";
Blockly.Blocks.MixePi.HUE1 = "#64b72f";
//Blockly.Blocks.display.HUE = "#13ae67";
Blockly.Blocks.display.HUE = 180;
Blockly.Blocks.MixePi.HUE3 = "#EF5411";
profile["default"] = profile["esp32_mixepi"];

var MIXEPI_ADXL345_ACTION = [
[Blockly.HANDBIT_FORWARD, "accel.getAcceleration().x>-4.7&&accel.getAcceleration().x<0&&accel.getAcceleration().y<1&&accel.getAcceleration().y>-1&&accel.getAcceleration().z<-8&&accel.getAcceleration().z>-9.8"],
[Blockly.HANDBIT_BACKWARD, "accel.getAcceleration().x>0&&accel.getAcceleration().x<4.7&&accel.getAcceleration().y<1&&accel.getAcceleration().y>-1&&accel.getAcceleration().z<-8&&accel.getAcceleration().z>-9.8"],
[Blockly.HANDBIT_LEFT, "accel.getAcceleration().y>0&&accel.getAcceleration().y<5.5&&accel.getAcceleration().z<-7.5&&accel.getAcceleration().z>-9.8"],
[Blockly.HANDBIT_RIGHT, "accel.getAcceleration().y<0&&accel.getAcceleration().y>-4.7&&accel.getAcceleration().z<-7.5&&accel.getAcceleration().z>-9.8"],
[Blockly.HANDBIT_UP, "accel.getAcceleration().z>-9.8&&accel.getAcceleration().z<-8"],
[Blockly.HANDBIT_DOWN, "accel.getAcceleration().z>8&&accel.getAcceleration().z<9.8"]
];



var BRIGHTNESS_SELECT=[["0", "0"],["1", "1"],["2", "2"],["3", "3"],["4", "4"],["5", "5"],["6", "6"],["7", "7"],["8", "8"]];

Blockly.Blocks.brightness_select = {
 init: function() {
  this.setColour(Blockly.Blocks.display.HUE);
  this.appendDummyInput("")
  .appendField(new Blockly.FieldDropdown(BRIGHTNESS_SELECT), 'STAT');
  this.setOutput(true, Number);
}
};

Blockly.Blocks.mixePi_button_is_pressed = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_BUTTON);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button),  'btn');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
}
};

Blockly.Blocks.mixepi_light= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
}
};

Blockly.Blocks.mixepi_sound= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
}
};

Blockly.Blocks.mixepi_inout_touchRead = {
  init: function(){
     this.setColour(Blockly.Blocks.sensor.HUE);
     this.appendDummyInput()
     .appendField(Blockly.MIXLY_ESP32_TOUCH)
     .appendField(Blockly.MIXLY_PIN)
     .appendField(new Blockly.FieldDropdown(profile.default.touch), 'touch_pin');
     this.appendDummyInput()
     .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
     this.setOutput(true, Number);
     this.setInputsInline(true);
     this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
 }
};


Blockly.Blocks.mixepi_ADXL345_action = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField("MIXEPI");
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldDropdown(MIXEPI_ADXL345_ACTION), "MIXEPI_ADXL345_ACTION");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip("");
    this.setHelpUrl('');
}
};

Blockly.Blocks.mixepi_rgb_rainbow1 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("WAIT")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGBdisplay_rgb_rainbow1);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.mixepi_rgb_rainbow3 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
    this.appendValueInput("rainbow_color")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_display_rgb_rainbow3);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.RGB_color_seclet = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, Number);
    this.setTooltip(Blockly.OLED_DRAW_PIXE_TOOLTIP);
}
};

Blockly.Blocks.RGB_color_rgb = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput("R")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_R);
    this.appendValueInput("G")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_G);
    this.appendValueInput("B")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_B);
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
}
};

Blockly.Blocks.mixepi_rgb = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("_LED_")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_NUM);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};

Blockly.Blocks.mixepi_rgb2 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField("1")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR1", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("2")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR2", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("3")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR3", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.mixepi_rgb_Brightness = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};

