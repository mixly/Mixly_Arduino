'use strict';

goog.provide('Blockly.Blocks.display');
goog.require('Blockly.Blocks');

Blockly.Blocks.display.HUE = 180;
Blockly.FieldCheckbox.CHECK_CHAR='■';
Blockly.Blocks.monitor_show_number = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('data')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_NUMBER);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_show_string = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('data')
        .setCheck(String)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_show_leds = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_LEDS)

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 5; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    //Blockly.FieldCheckbox.CHECK_CHAR=tmp_check_char;
  }
};
Blockly.Blocks.monitor_show_arrow = {
  init: function() {
      this.setColour(Blockly.Blocks.display.HUE);
      this.appendDummyInput()
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_ARROW)
          .appendField(new Blockly.FieldDropdown([
              ["North", "ArrowNames.North"],
              ["NorthEast", "ArrowNames.NorthEast"],
              ["East", "ArrowNames.East"],
              ["SouthEast", "ArrowNames.SouthEast"],
              ["South", "ArrowNames.South"],
              ["SouthWest", "ArrowNames.SouthWest"],
              ["West", "ArrowNames.West"],
              ["NorthWest", "ArrowNames.NorthWest"]
            ]), 'arrow');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setInputsInline(true);
  }
}

Blockly.Blocks.monitor_clear_screen = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CLEAR_SCREEN);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}


Blockly.Blocks.monitor_plot_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

Blockly.Blocks.monitor_unplot_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_UNPLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_toggle_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_TOGGLE_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_get_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_GET_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);
	this.setInputsInline(true);
	this.setOutput(true, Boolean);
  }
};
Blockly.Blocks.monitor_plot_bar = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('start')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_BAR_START);
	this.appendValueInput('end')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_BAR_END);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_bright_point = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
	this.appendValueInput('x')
        .setCheck(Number)
		.appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_X);
	this.appendValueInput('y')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_PLOT_POINT_Y);

      this.appendValueInput('brightness')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_set_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
      this.appendValueInput('brightness')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SET_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_get_brightness = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_BRIGHTNESS);
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}
Blockly.Blocks.monitor_stop_animation= {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_STOP_ANIMATION);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.monitor_led_enable= {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_LED_ENABLE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_BOOLEAN_TRUE, "true"], [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "false"]]), "stat");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
    }
}

Blockly.Blocks.monitor_show_image_with_offset = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('var')
          .setCheck('Image')
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SHOW_IMAGE);
    this.appendValueInput('data')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_AT_OFFSET);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_create_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_IMAGE);

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 5; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }
    this.setOutput(true, "Image");
  }
};
Blockly.Blocks.monitor_scroll_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendValueInput('var')
          .setCheck('Image')
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_IMAGE);
    this.appendValueInput('offset')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_WITH_OFFSET);
    this.appendValueInput('interval')
          .setCheck(Number)
          .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_SCROLL_INTERVAL);
    this.setPreviousStatement(true, null);

    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};
Blockly.Blocks.monitor_create_big_image = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput()
        .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_CREATE_BIG_IMAGE);

    for(var row = 0 ; row < 5; row ++) {
        var leds = this.appendDummyInput();
        for (var col = 0; col < 10; col++) {
            var cbox = new Blockly.FieldCheckbox(false);
            leds.appendField(cbox, '' + row + col);
        }
    }
    this.setOutput(true, "Image");
  }
};
Blockly.Blocks.monitor_arrow_image = {
    init: function () {
        this.setColour(Blockly.Blocks.display.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MONITOR_ARROW_IMAGE)
            .appendField(new Blockly.FieldDropdown([
              ["North", "ArrowNames.North"],
              ["NorthEast", "ArrowNames.NorthEast"],
              ["East", "ArrowNames.East"],
              ["SouthEast", "ArrowNames.SouthEast"],
              ["South", "ArrowNames.South"],
              ["SouthWest", "ArrowNames.SouthWest"],
              ["West", "ArrowNames.West"],
              ["NorthWest", "ArrowNames.NorthWest"]
            ]), 'arrow');

        this.setOutput(true, "Image");
        this.setInputsInline(true);
    }
}
