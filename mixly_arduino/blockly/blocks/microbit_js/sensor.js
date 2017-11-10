'use strict';

goog.provide('Blockly.Blocks.sensor');

goog.require('Blockly.Blocks');

Blockly.Blocks.sensor.HUE = 40;
Blockly.Blocks.controls_attachGestureInterrupt = {
    init: function() {
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MICROBIT_JS_IS_GESTURE)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_MICROBIT_shake, "Shake"], [Blockly.MIXLY_MICROBIT_up, "LogoUp"], [Blockly.MIXLY_MICROBIT_down, "LogoDown"], [Blockly.MIXLY_MICROBIT_left, "TiltLeft"], [Blockly.MIXLY_MICROBIT_right, "TiltRight"], [Blockly.MIXLY_MICROBIT_face_up, "ScreenUp"], [Blockly.MIXLY_MICROBIT_face_down, "ScreenDown"], [Blockly.MIXLY_MICROBIT_freefall, "FreeFall"], ["3g", "ThreeG"], ["6g", "SixG"], ["8G", "EightG"]]), "gesture");
        this.appendStatementInput('DO')
            .appendField(Blockly.MIXLY_DO);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_ATTACHINTERRUPT);
    }
};

Blockly.Blocks['sensor_get_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["x", "Dimension.X"],
                ["y", "Dimension.Y"],
                ["z", "Dimension.Z"],
                ["strength", "Dimension.Strength"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_set_acceleration'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_ACCELERATION)
            .appendField(new Blockly.FieldDropdown([
                ["1g", "AcceleratorRange.OneG"],
                ["2g", "AcceleratorRange.TwoG"],
                ["4g", "AcceleratorRange.FourG"],
                ["8g", "AcceleratorRange.EightG"]
            ]), "key");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['sensor_light_level'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_LIGHT_LEVEL)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_calibrate_compass'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_CALIBRATE_COMPASS)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_compass_heading'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_COMPASS_HEADING)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_temperature'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_TEMPERATURE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_rotation'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_ROTATION)
            .appendField(new Blockly.FieldDropdown([
                ["pitch", "Rotation.Pitch"],
                ["roll", "Rotation.Roll"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
Blockly.Blocks['sensor_magnetic'] = {
    init: function(){
        this.setColour(Blockly.Blocks.sensor.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MAGETIC_FORCE)
            .appendField(new Blockly.FieldDropdown([
                ["x", "Dimension.X"],
                ["y", "Dimension.Y"],
                ["z", "Dimension.Z"],
                ["strength", "Dimension.Strength"]
            ]), "key");
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
};
