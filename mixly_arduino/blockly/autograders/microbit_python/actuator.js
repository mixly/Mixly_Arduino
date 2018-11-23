'use strict';

goog.provide('Blockly.Grader.actuator');
goog.require('Blockly.Grader');

Blockly.Grader.servo_move = function () {
    var dropdown_pin = Blockly.Grader.valueToCode(this, 'PIN', Blockly.Grader.ORDER_ATOMIC);
    var value_degree = Blockly.Grader.valueToCode(this, 'DEGREE', Blockly.Grader.ORDER_ATOMIC);
    var code = 'mixly_servo_write_angle(' + dropdown_pin + ', ' + value_degree + ')'
    return code;
};


Blockly.Grader.microbit_music_play_built_in_easy = function(block) {
    var dropdown_melody = block.getFieldValue('melody');
    var pin = Blockly.Grader.valueToCode(block, 'PIN', Blockly.Grader.ORDER_ATOMIC);
    var code = 'music.play("music.' + dropdown_melody + '", pin=pin' + pin +')\n';
    return code;
};


Blockly.Grader.display_rgb=function(){
  var value_led = Blockly.Grader.valueToCode(this, '_LED_', Blockly.Grader.ORDER_ATOMIC);
  var value_rvalue = Blockly.Grader.valueToCode(this, 'RVALUE', Blockly.Grader.ORDER_ATOMIC);
  var value_gvalue = Blockly.Grader.valueToCode(this, 'GVALUE', Blockly.Grader.ORDER_ATOMIC);
  var value_bvalue = Blockly.Grader.valueToCode(this, 'BVALUE', Blockly.Grader.ORDER_ATOMIC);
  Blockly.Grader.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Grader.definitions_['import_neopixel'] = 'import neopixel';
  Blockly.Grader.setups_['mixly_rgb_show'] = Blockly.Grader.FUNCTION_MIXLY_RGB_SHOW;
  var code ='neopixel.mixly_rgb_show(' + value_led + ', ' + value_rvalue + ', ' + value_gvalue + ', ' + value_bvalue + ')\n';
  return code;
};

