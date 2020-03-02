'use strict';

goog.provide('Blockly.Blocks.sensor');
goog.require('Blockly.Blocks');
Blockly.Blocks.sensor.HUE = 40;
//ESP32片内霍尔传感器值
profile["default"] = profile["esp32_handbit"];
Blockly.Blocks['ESP32_hallRead'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(Blockly.ESP32_HALL);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip();
    this.setHelpUrl("");
}
};

//ESP32片内温度传感器值
Blockly.Blocks['ESP32_temprature'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(Blockly.ESP32_TEMP);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip();
    this.setHelpUrl("");
}
};

Blockly.Blocks.OneButton = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
     this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_BUTTON)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_CLICK, "attachClick"], [Blockly.MIXLY_DOUBLE_CLICK, "attachDoubleClick"], [Blockly.MIXLY_LONG_PRESS_START, "attachLongPressStart"], [Blockly.MIXLY_DURING_LONG_PRESS, "attachDuringLongPress"], [Blockly.MIXLY_LONG_PRESS_END, "attachLongPressStop"]]), "mode");
    this.appendStatementInput('DO')
    .appendField(Blockly.MIXLY_DO);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    this.setInputsInline(true);
    this.setHelpUrl();
}
};