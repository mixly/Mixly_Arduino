'use strict';

goog.provide('Blockly.Blocks.base');
goog.require('Blockly.Blocks');

Blockly.Blocks.base.HUE = 20//'#ae3838';//40;

Blockly.Blocks['inout_highlow'] = {
   init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_HIGH, "HIGH"], [Blockly.MIXLY_LOW, "LOW"]]), 'BOOL')
    this.setOutput(true, Boolean);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_HIGHLOW_TOOLTIP);
  }
};

Blockly.Blocks.inout_digital_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN",Number)
        .appendField(Blockly.MIXLY_Digital_PINMODEOUT)
        .setCheck(Number);
    this.appendValueInput("STAT")
        .appendField(Blockly.MIXLY_STAT)
        .setCheck([Number,Boolean]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_DIGITAL_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_digital_read = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_Digital_PINMODEIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
	this.setInputsInline(true);
    this.setOutput(true, [Boolean,Number]);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_DIGITAL_READ_TOOLTIP);
  }
};

Blockly.Blocks.inout_pwm_analog_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PWM_ANALOG_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_analog_write = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
    this.appendValueInput("PIN", Number)
        .appendField("DAC"+Blockly.MIXLY_Analog_PINMODEOUT)
        .setCheck(Number);
    this.appendValueInput("NUM", Number)
        .appendField(Blockly.MIXLY_VALUE2)
        .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_WRITE_TOOLTIP);
  }
};

Blockly.Blocks.inout_analog_write_set = {
    init: function(){
        this.setColour(Blockly.Blocks.base.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_Analog_PINMODEOUT)
            .setCheck(Number);
        this.appendDummyInput()
           .appendField(Blockly.MIXLY_MICROBIT_JS_PERIOD_MIL)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.MIXLY_mSecond, "period"],
                [Blockly.MIXLY_uSecond, "period_microseconds"]
            ]), "key");
        this.appendValueInput("NUM", Number)
            .appendField(Blockly.MIXLY_STAT)
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_WRITE_SET_TOOLTIP);
    }
};

Blockly.Blocks.inout_pwm_analog_write_set_freq = {
    init: function(){
                this.setColour(Blockly.Blocks.base.HUE);
                this.appendValueInput("PIN", Number)
                    .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
                    .setCheck(Number);
                this.appendValueInput("NUM", Number)
                    .appendField(Blockly.MIXLY_FREQUENCY + Blockly.MIXLY_STAT)
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PWM_ANALOG_WRITE_SET_FREQ_TOOLTIP);
            }
        };

Blockly.Blocks.inout_analog_read = {
  init: function() {
    this.setColour(Blockly.Blocks.base.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
        .appendField(Blockly.MIXLY_Analog_PINMODEIN)
        .setCheck(Number);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
	this.setInputsInline(true);
	this.setOutput(true, Number);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_READ_TOOLTIP);
  }
};

Blockly.Blocks.inout_analog_atten = {
    init: function(){
        this.setColour(Blockly.Blocks.base.HUE);
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_Analog_PINMODEIN)
            .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_REF_VOLTAGE + Blockly.MIXLY_STAT)
			.appendField(new Blockly.FieldDropdown([
                ["3.3V", "machine.ADC.ATTN_11DB"],
                ["2.2V", "machine.ADC.ATTN_6DB"],
				["1.5V", "machine.ADC.ATTN_2_5_DB"],
                ["1.2V", "machine.ADC.ATTIN_0DB"]
				]), "atten");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_ATTEN_TOOLTIP);
    }
};


Blockly.Blocks['inout_pin_pressed'] = {
    init: function(){
        this.setColour(Blockly.Blocks.base.HUE);
        this.appendValueInput('pin')
            .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET)
            .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR);
        // this.appendDummyInput()
        //     .appendField(Blockly.MIXLY_IS_TOUCHED);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_ESP32_MACHINE_VALUE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_TOOLTIP);
    }
};

Blockly.Blocks.inout_pin_attachInterrupt = {
  init: function() {
    this.setColour(20);
    this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_ATTACHINTERRUPT_PIN)
        .setCheck(Number);
    this.appendDummyInput("")
        .appendField(Blockly.MIXLY_MODE)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RISING, "machine.Pin.IRQ_RISING"], [Blockly.MIXLY_FALLING, "machine.Pin.IRQ_FALLING"], [Blockly.MIXLY_CHANGE, "(machine.Pin.IRQ_RISING or machine.Pin.IRQ_FALLING)"]]), "mode");
    this.appendValueInput('DO')
        .appendField(Blockly.MIXLY_DO)
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_ATTACHINTERRUPT_TOOLTIP);
  }
};

Blockly.Blocks['inout_digital_init'] = {
    init: function() {
        this.setColour(20);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldTextInput('pin#'), 'PIN_OBJ');
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_MICROPYTHON_AS)
            // .appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_MODE+Blockly.Msg.LISTS_SET_INDEX_INPUT_TO)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_Digital_PINMODEOUT, "machine.Pin.OUT"],
                [Blockly.MIXLY_Digital_PINMODEIN, "machine.Pin.IN"],
                [Blockly.MIXLY_PINMODEPULLUP, "machine.Pin.IN, machine.Pin.PULL_UP"],
                [Blockly.MIXLY_PINMODEPULLDOWN, "machine.Pin.IN, machine.Pin.PULL_DOWN"]
                ]),"MODE")
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_DIGITAL_INIT_TOOLTIP);
      },
      getVars: function() {
        return [this.getFieldValue('PIN_OBJ')=='pin#'?null:this.getFieldValue('PIN_OBJ')];
      },
      renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('PIN_OBJ'))) {
          this.setTitleValue(newName, 'PIN_OBJ');
        }
      }
};

Blockly.Blocks.inout_pwm_analog_write_init = {
    init: function() {
        this.setColour(Blockly.Blocks.base.HUE);
        // this.appendValueInput("PIN", Number)
        //     .appendField(Blockly.MIXLY_SETUP)
        //     .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
        //     .appendField('pwm')
        //     .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldTextInput('pwm#'), 'PIN_OBJ')
            .appendField(Blockly.MIXLY_MICROPYTHON_AS)
        this.appendDummyInput("")
            .appendField("PWM" + Blockly.MIXLY_Analog_PINMODEOUT)
        // .appendField('pwm')
        // .appendField(new Blockly.FieldDropdown(profile.default.pwm_pin),"PIN")
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PWM_ANALOG_WRITE_INIT_TOOLTIP);
    },
    getVars: function() {
        return [this.getFieldValue('PIN_OBJ') == 'pwm#' ? null : this.getFieldValue('PIN_OBJ')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('PIN_OBJ'))) {
            this.setTitleValue(newName, 'PIN_OBJ');
        }
    }
};

Blockly.Blocks.inout_analog_write_init = {
    init: function() {
        this.setColour(Blockly.Blocks.base.HUE);
        // this.appendValueInput("PIN", Number)
        //     .appendField(Blockly.MIXLY_SETUP)
        //     .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
        //     .appendField('pwm')
        //     .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldTextInput('dac#'), 'PIN_OBJ')
            .appendField(Blockly.MIXLY_MICROPYTHON_AS)
        this.appendDummyInput("")
            .appendField("DAC" + Blockly.MIXLY_Analog_PINMODEOUT)
        // .appendField('dac')
        // .appendField(new Blockly.FieldDropdown(profile.default.dac_pin),"PIN")
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_WRITE_INIT_TOOLTIP);
    },
    getVars: function() {
        return [this.getFieldValue('PIN_OBJ') == 'dac#' ? null : this.getFieldValue('PIN_OBJ')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('PIN_OBJ'))) {
            this.setTitleValue(newName, 'PIN_OBJ');
        }
    }
};

Blockly.Blocks.inout_analog_read_init = {
    init: function() {
        this.setColour(Blockly.Blocks.base.HUE);
        // this.appendValueInput("PIN", Number)
        //     .appendField(Blockly.MIXLY_SETUP)
        //     .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
        //     .appendField('pwm')
        //     .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldTextInput('adc#'), 'PIN_OBJ')
            .appendField(Blockly.MIXLY_MICROPYTHON_AS)
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_Analog_PINMODEIN)
        // .appendField('adc')
        // .appendField(new Blockly.FieldDropdown(profile.default.adc_pin),"PIN")
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_ANALOG_READ_INIT_TOOLTIP);
    },
    getVars: function() {
        return [this.getFieldValue('PIN_OBJ') == 'adc#' ? null : this.getFieldValue('PIN_OBJ')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('PIN_OBJ'))) {
            this.setTitleValue(newName, 'PIN_OBJ');
        }
    }
};

Blockly.Blocks['inout_pin_pressed_init'] = {
    init: function() {
        this.setColour(Blockly.Blocks.base.HUE);
        // this.appendValueInput("PIN", Number)
        //     .appendField(Blockly.MIXLY_SETUP)
        //     .appendField("PWM"+Blockly.MIXLY_Analog_PINMODEOUT)
        //     .appendField('pwm')
        //     .setCheck(Number);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldTextInput('tc#'), 'PIN_OBJ')
            .appendField(Blockly.MIXLY_MICROPYTHON_AS)
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_ESP32_TOUCH_SENSOR)
        // .appendField('tc')
        // .appendField(new Blockly.FieldDropdown(profile.default.tc_pin),"PIN")
        this.appendValueInput("PIN", Number)
            .appendField(Blockly.MIXLY_PIN + " #")
            .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.MIXLY_ESP32_INOUT_PIN_PRESSED_INIT_TOOLTIP);
    },
    getVars: function() {
        return [this.getFieldValue('PIN_OBJ') == 'tc#' ? null : this.getFieldValue('PIN_OBJ')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('PIN_OBJ'))) {
            this.setTitleValue(newName, 'PIN_OBJ');
        }
    }
};

Blockly.Blocks.inout_pinMode=Blockly.Blocks.inout_digital_init;
Blockly.Blocks.inout_analog_write_set_freq = Blockly.Blocks.inout_pwm_analog_write_set_freq;
Blockly.Blocks['pin_pressed_init'] = Blockly.Blocks['inout_pin_pressed_init'];
Blockly.Blocks['pin_pressed']=Blockly.Blocks['inout_pin_pressed'];
Blockly.Blocks.controls_pin_attachInterrupt=Blockly.Blocks.inout_pin_attachInterrupt;
