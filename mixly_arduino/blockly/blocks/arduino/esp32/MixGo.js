'use strict';

goog.provide('Blockly.Blocks.MixGo');
goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;
profile["default"] = profile["esp32_MixGo"];

//执行器_点阵屏显示_字符显示
Blockly.Blocks.HT16K33_TEXT={
  init:function(){
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MAX7219_PUTSTR); 
    this.appendValueInput("TEXT", String)
    .setCheck([Number, String])
    .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip("");
  }
};

//执行器_点阵屏显示_画点显示
Blockly.Blocks.HT16K33_POS = {
  init: function() {
    //执行器_点阵屏显示_画点变量
    var MixGo_DrawPixel_NUM = [
    [Blockly.MIXLY_4DIGITDISPLAY_ON, "LED_ON"],
    [Blockly.MIXLY_4DIGITDISPLAY_OFF, "LED_OFF"]
    ];
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_monitor);
    this.appendValueInput('XVALUE')
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_X);
    this.appendValueInput("YVALUE")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_Y);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_SHOWPOINT )
    .appendField(new Blockly.FieldDropdown(MixGo_DrawPixel_NUM), "DrawPixel_TYPE");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
  }
};

//执行器_点阵屏显示_显示图案
Blockly.Blocks.HT16K33_DisplayChar = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_monitor);
    this.appendValueInput("Chars")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_PICARRAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip();
  }
};

//执行器_点阵屏显示_图案数组
Blockly.Blocks.HT16K33_LedArray = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_DISPLAY_MATRIX_ARRAYVAR)
    .appendField(new Blockly.FieldTextInput("LedArray1"), "VAR");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a81")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a82")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a83")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a84")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a85")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a86")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a87")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a88")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a89")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a810")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a811")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a812")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a813")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a814")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a815")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a816");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a71")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a72")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a73")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a74")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a75")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a76")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a77")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a78")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a79")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a710")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a711")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a712")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a713")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a714")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a715")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a716");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a61")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a62")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a63")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a64")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a65")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a66")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a67")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a68")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a69")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a610")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a611")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a612")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a613")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a614")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a615")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a616");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a51")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a52")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a53")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a54")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a55")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a56")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a57")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a58")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a59")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a510")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a511")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a512")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a513")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a514")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a515")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a516");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a41")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a42")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a43")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a44")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a45")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a46")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a47")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a48")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a49")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a410")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a411")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a412")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a413")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a414")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a415")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a416");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a31")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a32")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a33")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a34")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a35")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a36")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a37")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a38")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a39")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a310")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a311")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a312")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a313")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a314")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a315")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a316");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a21")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a22")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a23")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a24")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a25")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a26")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a27")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a28")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a29")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a210")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a211")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a212")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a213")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a214")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a215")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a216");
    this.appendDummyInput("")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a11")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a12")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a13")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a14")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a15")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a16")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a17")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a18")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a19")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a110")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a111")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a112")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a113")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a114")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a115")
    .appendField(new Blockly.FieldCheckbox("FALSE"), "a116");
    this.setOutput(true, Number);
    this.setTooltip();
    
  }
};

//物联网_点阵屏_清除显示
Blockly.Blocks.HT16K33_Displayclear = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_monitor);
    this.appendDummyInput("")
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_MICROBIT_Clear_display);   
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip();
  }
};

Blockly.Blocks.HT16K33_show_image = {
  init: function() {
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_ESP32_SHOW_IMAGE_OR_STRING_OR_ANIMATION)
    .appendField(new Blockly.FieldDropdown([
     ["❤", "0100038007c00fe01ff01ff00ee00640"],
     ["♥", "00000100038007c00fe00ee004400000"],
     ["▲", "00003ffc1ff80ff007e003c001800000"],
     ["▼", "0000018003c007e00ff01ff83ffc0000"],
     ["◄", "100030007000f000f000700030001000"],
      // ["↓", "18181818db7e3c18"],
      // ["←", "103060ffff603010"],
      // ["→", "080c06ffff060c08"],
      // ["►", "080c0e0f0f0e0c08"],
      // ["△", "182442ff00000000"],
      // ["▽", "00000000ff422418"],
      // ["☺", "3c42a581a599423c"],
      // ["○", "3c4281818181423c"],
      // ["◑", "3c4e8f8f8f8f4e3c"],
      // ["◐", "3c72f1f1f1f1723c"],
      // ["￥", "4224ff08ff080808"],
      // ["Χ", "8142241818244281"],
      // ["✓", "0000010204885020"],
      // ["□", "007e424242427e00"],
      // ["▣", "007e425a5a427e00"],
      // ["◇", "1824428181422418"],
      // ["♀", "3844444438107c10"],
      // ["♂", "0f030579d888d870"],
      // ["♪", "0c0e0b080878f860"],
      // ["✈", "203098ffff983020"],
      // //["卍", "00f21212fe90909e"],
      // //["卐", "009e9090fe1212f2"],
      // ["︱", "1010101010101010"],
      // ["—", "000000ff00000000"],
      // ["╱", "0102040810204080"],
      // ["＼", "8040201008040201"],
      // ["大", "1010fe1010284482"],
      // ["中", "1010fe9292fe1010"],
      // ["小", "1010105454921070"],
      // ["米", "00925438fe385492"],
      // ["正", "00fe10105e5050fc"],
      // ["囧", "ffa5a5c3bda5a5ff"]
      ]), "img_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(Blockly.Blocks.display.HUE);
    this.setTooltip(Blockly.OLED_BITMAP_OR_STRING);
    this.setHelpUrl('');
  }
};

Blockly.Blocks.HT16K33_blink_rate = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_monitor);
    this.appendValueInput('x')
    .setCheck(Number)
    .appendField(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_BLINK_RATE);
  }
};

Blockly.Blocks.HT16K33_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.display.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_MICROBIT_monitor);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_JS_MONITOR_SET_SCREEN_BRIGHTNESS);
  }
};

Blockly.Blocks.mixgo_button_is_pressed = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_BUTTON);
     this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(profile.default.button), 'PIN');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_PRESSED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_SENOR_IS_PRESSED);
  }
};


Blockly.Blocks.sensor_mixgo_light= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_LIGHT);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_LIGHT_TOOLTIP);
  }
};

Blockly.Blocks.sensor_mixgo_sound= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_ESP32_SOUND);
    this.setOutput(true, Number);
    this.setInputsInline(true);
    this.setTooltip(Blockly.ESP32_SENSOR_NIXGO_SOUND_TOOLTIP);
  }
};

Blockly.Blocks.mixgo_touch_pin= {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
     .appendField(Blockly.MIXLY_ESP32_TOUCH)
     .appendField(Blockly.MIXLY_PIN)
     .appendField(new Blockly.FieldDropdown(profile.default.touch), 'touch_pin');
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_IS_TOUCHED);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_sensor_pin_pressed);
  }
};

Blockly.Blocks.sensor_mixgo_pin_near = {
  init: function(){
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([[Blockly.Msg.TEXT_TRIM_LEFT, "34"], [Blockly.Msg.TEXT_TRIM_RIGHT, "36"]]), "direction")
    .appendField(Blockly.MIXLY_ESP32_NEAR);
    this.setOutput(true, Boolean);
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('direction');
      var mode0 = Blockly.MIXLY_ESP32_SENSOR_MIXGO_PIN_NEAR_TOOLTIP;
      var mode1 = Blockly.MIXLY_ESP32_NEAR;
      var TOOLTIPS = {
        'left':Blockly.Msg.TEXT_TRIM_LEFT,
        'right':Blockly.Msg.TEXT_TRIM_RIGHT,
      };
      return mode0 +TOOLTIPS[mode] + mode1
    });
  }
};
Blockly.Blocks.mixGo_led = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING)
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LEFT,"0"],[Blockly.MIXLY_RIGHT,"5"]]), 'STAT');
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.mixGo_led_brightness = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_SETTING)
    .appendField(Blockly.MIXLY_BUILDIN_LED)
    .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_LEFT,"0"],[Blockly.MIXLY_RIGHT,"5"]]), 'STAT');
    this.appendValueInput('bright')
    .appendField(Blockly.MIXLY_PULSEIN_STAT)  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_ESP32_LED_SETONOFF);
  }
};

Blockly.Blocks.MixGo_rgb_rainbow1 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("WAIT")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGBdisplay_rgb_rainbow1);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.MixGo_rgb_rainbow3 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField(new Blockly.FieldDropdown(DISPLAY_RAINBOW_TYPE), "TYPE");
    this.appendValueInput("rainbow_color")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_display_rgb_rainbow3);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.MixGo_rgb = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("_LED_")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_RGB_NUM);
    this.appendDummyInput("")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};

Blockly.Blocks.MixGo_rgb2 = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendDummyInput("")
    .appendField("1")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR1", Number)
    .setCheck(Number);
    this.appendDummyInput("")
    .appendField("2")
    .appendField(Blockly.Msg.HTML_COLOUR);
    this.appendValueInput("COLOR2", Number)
    .setCheck(Number);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};

Blockly.Blocks.MixGo_rgb_Brightness = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB);
    this.appendValueInput("Brightness")
    .setCheck(Number)
    .setAlign(Blockly.ALIGN_RIGHT)
    .appendField(Blockly.MIXLY_BRIGHTNESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
}
};
Blockly.Blocks.MixGo_rgb_show = {
  init: function () {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_RGB_SHOW)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
}
};