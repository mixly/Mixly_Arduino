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
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.appendValueInput("DEGREE", Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_DEGREE_0_180);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_SERVO_MOVE);
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
    }
};

Blockly.Blocks['ledswitch'] = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_ESP32_ON, "1"],
                [Blockly.MIXLY_ESP32_OFF, "0"],
                [Blockly.MIXLY_ESP32_TOGGLE, "-1"]
            ]), "flag");
        this.setOutput(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_INOUT_HIGHLOW);
    }
};

Blockly.Blocks.actuator_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.actuator_get_led_bright = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput('led')
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setOutput(true);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_GETONOFF);
  }
};

Blockly.Blocks.actuator_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING);
    this.appendValueInput('led')
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETBRIGHT);
  }
};

//music
Blockly.Blocks.esp32_music_pitch = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_MBOT_TONE)
            .appendField(Blockly.MIXLY_PIN + " #")
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

Blockly.Blocks.esp32_music_pitch_with_time = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_MBOT_TONE)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.appendValueInput('pitch')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_FREQUENCY);
        this.appendValueInput('time')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_DURATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE2);
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

Blockly.Blocks.esp32_music_set_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('TICKS')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_TEMPO)
            .appendField(Blockly.MICROBIT_ACTUATOR_ticks);
        this.appendValueInput('BPM')
            .setCheck(Number)
            .appendField(Blockly.MICROBIT_ACTUATOR_bpm);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_SET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_get_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_Get_current_tempo)
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_GET_TEMPO);
    }
}

Blockly.Blocks.esp32_music_reset = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_Reset_music)
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_RESET);
    }
}

Blockly.Blocks.esp32_music_play_list = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.appendValueInput('PIN')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_PIN + " #");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_PLAY_LISTS);

    }
}

Blockly.Blocks.esp32_mixgo_music_play_list_show = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('LIST')
            .appendField(Blockly.MIXLY_ESP32_MUSIC_PLAY_LISTS)
        this.appendValueInput('PIN')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_PIN + " #");
        // this.appendValueInput('DISPLAY')
        //     .appendField(Blockly.MIXLY_ESP32_MIXGO_MUSIC_SHOW_IN);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_MIXGO_MUSIC_PLAY_TONE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_PLAYSHOW)
    }
}
//RGB
Blockly.Blocks.actuator_neopixel_init = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_SETUP)
            .setCheck("var");
        this.appendValueInput("PIN", Number)
           .setCheck(Number)
           .setAlign(Blockly.ALIGN_RIGHT)
           .appendField(Blockly.MIXLY_PIN+" #");
        this.appendValueInput("LEDCOUNT")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_COUNT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_RGB_PIN_COUNT);
    }
};

Blockly.Blocks.actuator_neopixel_rgb = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
        this.appendValueInput('SUB')
            .setCheck("var");
            // .appendField(Blockly.MIXLY_SETUP)
        this.appendValueInput("_LED_")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_NUM);
        this.appendValueInput("RVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_R);
        this.appendValueInput("GVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_G);
        this.appendValueInput("BVALUE")
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.MIXLY_RGB_B);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_RGB_NUM_R_G_B);
    }
};

Blockly.Blocks.actuator_neopixel_write = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_RGB)
         // this.appendValueInput("PIN", Number)
         //    .setCheck(Number)
         //    .setAlign(Blockly.ALIGN_RIGHT)
         //    .appendField(Blockly.MIXLY_PIN);
        this.appendValueInput('SUB')
            .setCheck("var");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_RGB_WRITE)
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setTooltip(Blockly.MIXLY_ESP32_MUSIC_WRI);
    }
};


Blockly.Blocks.led_light=Blockly.Blocks.actuator_led_bright;
Blockly.Blocks.get_led_bright=Blockly.Blocks.actuator_get_led_bright;
Blockly.Blocks.led_brightness=Blockly.Blocks.actuator_led_brightness;
