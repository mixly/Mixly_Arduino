'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.esp32_s2_onboard_music_pitch = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixgoce.buzzer.play(' + number_pitch + ')\n';
  return code;
};

Blockly.Python.esp32_s2_onboard_music_pitch_with_time = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = 'mixgoce.buzzer.play(' + number_pitch + ', ' + number_time + ')\n';
  return code;
};

Blockly.Python.esp32_s2_onboard_music_stop = function(block) {
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var code = 'mixgoce.buzzer.stop()\n';
  return code;
};

Blockly.Python.esp32_s2_onboard_music_play_list=function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "mixgoce.buzzer.play_demo("+ lst +")\n";
    return code;
};

Blockly.Python.esp32_s2_music_set_tempo=function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
    var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "mixgoce.buzzer.set_duration_tempo("+ ticks +", "+ bpm +")\n";
    return code;
};

Blockly.Python.esp32_s2_music_get_tempo=function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var code =  "mixgoce.buzzer.get_tempo()";
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.esp32_s2_music_reset=function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    return "mixgoce.buzzer.reset()\n";
};

Blockly.Python.esp32_mixgo_music_play_list_show=function(){
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    Blockly.Python.definitions_['import_matrix'] = 'import matrix';
    var lst = Blockly.Python.valueToCode(this, 'LIST', Blockly.Python.ORDER_ASSIGNMENT);
    var pin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ASSIGNMENT);
    // var display = Blockly.Python.valueToCode(this, 'DISPLAY', Blockly.Python.ORDER_ASSIGNMENT);
    var code = "mixgoce.play_show("+ lst +", "+ pin +")\n";
    return code;
};


Blockly.Python.number = function () {
    var code = this.getFieldValue('op');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ledswitch = function () {
    var code = this.getFieldValue('flag');
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.actuator_led_bright = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgoce." + op + ".setonoff("+bright+")\n";
    return code;
};

Blockly.Python.actuator_get_led_bright = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgoce." + op + ".getonoff("+")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.actuator_led_brightness = function() {
    Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgoce.'+op+'.setbrightness('+flag+')\n';
    return code;
};

Blockly.Python.actuator_onboard_neopixel_write = function(){
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var code= 'mixgoce.rgb.write()\n';   
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_one = function(){
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'mixgoce.rgb.show_one('+value_led+', '+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_all = function(){
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= 'mixgoce.rgb.show_all('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_all_chase = function(){
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'mixgoce.rgb.color_chase('+value_rvalue+', '+value_gvalue+', '+value_bvalue+', '+number_time+')\n';
  return code;
};

Blockly.Python.actuator_onboard_neopixel_rgb_show_all_rainbow = function(){
  Blockly.Python.definitions_['import_mixgoce'] = 'import mixgoce';
  var number_time = Blockly.Python.valueToCode(this, 'time', Blockly.Python.ORDER_ATOMIC);
  var code= 'mixgoce.rgb.rainbow_cycle('+number_time+')\n';
  return code;
};