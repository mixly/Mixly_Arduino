'use strict';
goog.provide('Blockly.Blocks.pins');
goog.require('Blockly.Blocks');
Blockly.Blocks.pins.HUE = 230;

Blockly.Blocks['pins_digital'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_analog'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_button'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_pwm'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.pwm), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_interrupt'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.interrupt), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_serial'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.serial_pin), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_builtinimg'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.builtinimg), 'PIN');
        this.setOutput(true, "microbit_image");
    }
};

Blockly.Blocks['pins_imglist'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.imglist), 'PIN');
        this.setOutput(true);
    }
};

Blockly.Blocks['pins_axis'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.axis), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_brightness'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.brightness), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_tone_notes'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.tone_notes), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_radio_power'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.radio_power), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_radio_datarate'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.radio_datarate), 'PIN');
        this.setOutput(true, Number);
    }
};