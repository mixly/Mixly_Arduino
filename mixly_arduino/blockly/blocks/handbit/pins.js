'use strict';
goog.provide('Blockly.Blocks.pins');
goog.require('Blockly.Blocks');
Blockly.Blocks.pins.HUE = 230;

Blockly.Blocks['pins_digital'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.digital), 'PIN');
    this.setOutput(true);
  }
};

Blockly.Blocks['pins_digital_pin'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.digital_pin), 'PIN');
    this.setOutput(true, Number);
  }
};


Blockly.Blocks['pins_analog'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.analog), 'PIN');
    this.setOutput(true);
  }
};

Blockly.Blocks['pins_analog_pin'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.analog_pin), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_dac'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.dac), 'PIN');
    this.setOutput(true);
  }
};

Blockly.Blocks['pins_dac_pin'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.dac_pin), 'PIN');
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
    this.setOutput(true);
  }
};

Blockly.Blocks['pins_pwm_pin'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.pwm_pin), 'PIN');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['pins_touch_pin'] = {
   init: function() {
    this.setColour(Blockly.Blocks.pins.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(profile.default.touch_pin), 'PIN');
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

Blockly.Blocks['pins_builtinimg'] = {
    init: function() {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown(profile.default.builtinimg), 'PIN');
        this.setOutput(true, "esp32_image");
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