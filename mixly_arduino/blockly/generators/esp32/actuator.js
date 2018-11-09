'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');


Blockly.Python.esp32_music_pitch = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  Blockly.Python.definitions_['import_math'] = 'import math';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'music.pitch(round(' + number_pitch + '), ' + pin + ')\n';
  return code;
};

Blockly.Python.esp32_music_stop = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'music.stop('+pin+')\n';
  return code;
};

Blockly.Python.servo_move = function() {
  Blockly.Python.definitions_['import_servo'] = 'import servo';
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.servo_write_angle('+dropdown_pin+','+value_degree+')\n';
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

Blockly.Python.actuator_led_bright= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var bright = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    // var bright = this.getFieldValue('bright');
    var code = "mixgo.led.setonoff("+op+","+bright+")\n";
    return code;
};

Blockly.Python.actuator_get_led_bright= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var code = "mixgo.led.getonoff("+op+")";
    return [code, Blockly.Python.ORDER_ATOMIC];;
};

Blockly.Python.actuator_led_brightness= function() {
    Blockly.Python.definitions_['import_mixgo'] = 'import mixgo';
    var op = Blockly.Python.valueToCode(this,'led', Blockly.Python.ORDER_ATOMIC);
    var flag = Blockly.Python.valueToCode(this,'bright', Blockly.Python.ORDER_ATOMIC);
    var code = 'mixgo.led.setbrightness('+op+','+flag+')\n';
    return code;
};


Blockly.Python.actuator_neopixel_init=function(){
    var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
    var dropdown_rgbpin = Blockly.Python.valueToCode(this, 'PIN', Blockly.Python.ORDER_ATOMIC);
    var value_ledcount = Blockly.Python.valueToCode(this, 'LEDCOUNT', Blockly.Python.ORDER_ATOMIC);
   Blockly.Python.definitions_['import_machine'] = 'import machine';
    Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
    var code = v + ' = neopixel.NeoPixel(machine.Pin('+dropdown_rgbpin+'), '+value_ledcount+', timing = True)\n';
    return code;
};

Blockly.Python.actuator_neopixel_write=function(){
 Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var code= v + '.write()\n';   
  return code;
};
Blockly.Python.actuator_neopixel_rgb=function(){
  Blockly.Python.definitions_['import_machine'] = 'import machine';
  Blockly.Python.definitions_['import_neopixel'] = 'import neopixel';
  var v = Blockly.Python.valueToCode(this, 'SUB', Blockly.Python.ORDER_ATOMIC);
  var value_led = Blockly.Python.valueToCode(this, '_LED_', Blockly.Python.ORDER_ATOMIC);
  var value_rvalue = Blockly.Python.valueToCode(this, 'RVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_gvalue = Blockly.Python.valueToCode(this, 'GVALUE', Blockly.Python.ORDER_ATOMIC);
  var value_bvalue = Blockly.Python.valueToCode(this, 'BVALUE', Blockly.Python.ORDER_ATOMIC);
  var code= v + '['+value_led+'] = ('+value_rvalue+', '+value_gvalue+', '+value_bvalue+')\n';
  return code;
};


Blockly.Blocks.led_light=Blockly.Blocks.actuator_led_bright;
Blockly.Blocks.get_led_bright=Blockly.Blocks.actuator_get_led_bright;
Blockly.Blocks.led_brightness=Blockly.Blocks.actuator_led_brightness;