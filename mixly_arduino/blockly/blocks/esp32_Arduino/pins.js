'use strict';
goog.provide('Blockly.Blocks.pins');
goog.require('Blockly.Blocks');
Blockly.Blocks.pins.HUE = 230;

Blockly.Blocks['pins_dac'] = {
 init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.dac), 'PIN');
    this.setOutput(true);
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

Blockly.Blocks['pins_touch'] = {
 init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.touch), 'PIN');
    this.setOutput(true);
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

Blockly.Blocks['pins_playlist'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.playlist), 'PIN');
        this.setOutput(true);
    }
};

Blockly.Blocks['pins_exlcdh'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.exlcdh), 'PIN');
        this.setOutput(true, Number);
    }
};

Blockly.Blocks['pins_exlcdv'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.exlcdv), 'PIN');
        this.setOutput(true, Number);
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

Blockly.Blocks['pins_one_more'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.one_more), 'PIN');
        this.setOutput(true);
    }
};

Blockly.Blocks['serial_select'] = {
    init: function() {
        this.setColour(Blockly.Blocks.pins.HUE);
        this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.serial_select), 'PIN');
        this.setOutput(true);
    }
};
