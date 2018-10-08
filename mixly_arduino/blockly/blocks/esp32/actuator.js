'use strict';

goog.provide('Blockly.Blocks.actuator');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100

//Servo
Blockly.Blocks.servo_move = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_SERVO)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DEGREE_0_180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
    }
};

//LED
Blockly.Blocks['number'] = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["1", "1"],
                ["2", "2"]
            ]), 'op')
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks['light'] = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_ESP32_ON, "on"],
                [Blockly.MIXLY_ESP32_OFF, "off"],
                [Blockly.MIXLY_ESP32_TOGGLE, "toggle"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks.led_bright = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SET_LED);
        this.appendValueInput('led')
            .appendField(Blockly.LUXE_LED)
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_PULSEIN_STAT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_ESP32_ON, "on"],
                [Blockly.MIXLY_ESP32_OFF, "off"],
                [Blockly.MIXLY_ESP32_TOGGLE, "toggle"]
            ]), "bright");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

Blockly.Blocks.led_brightness = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SET_LED);
        this.appendValueInput('led')
            .appendField(Blockly.LUXE_LED)
        this.appendValueInput('bright')
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
};

//music
Blockly.Blocks.esp32_music_pitch = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_MBOT_TONE)
            .appendField(Blockly.MIXLY_PIN)
            .setCheck(Number);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_FREQUENCY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
    }
};

Blockly.Blocks.esp32_music_stop = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_NOTONE_PIN)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_NOTONE_PIN);
    }
};
