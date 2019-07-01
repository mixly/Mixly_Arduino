'use strict';

goog.provide('Blockly.Blocks.sensor');
goog.require('Blockly.Blocks');
Blockly.Blocks.sensor.HUE = 40;
Blockly.Blocks.chaoshengbo = {
    init: function () {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("")
        .appendField(Blockly.MIXLY_CHAOSHENGBO)
        .appendField('Trig#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN1")
        .appendField(' Echo#')
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN2");
        this.setOutput(true, Number);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_CHAOSHENGBO);
    }
};

//IIC地址查找
Blockly.Blocks.IICSCAN = {
  init: function() {
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.IICSCAN);
    this.setInputsInline(true);
    this.setTooltip('');
}
};
