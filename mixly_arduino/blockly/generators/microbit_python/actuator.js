'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.microbit_music_play_built_in = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var dropdown_melody = block.getFieldValue('melody');
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin +', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
  return code;
};

Blockly.Python.microbit_music_play_built_in_easy = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var dropdown_melody = block.getFieldValue('melody');
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'music.play(music.' + dropdown_melody + ', pin=pin' + pin +')\n';
  return code;
};

Blockly.Python.microbit_music_pitch_delay = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  Blockly.Python.definitions_['import_math'] = 'import math';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var number_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var code = 'music.pitch(round(' + number_pitch + '), round(' + number_duration + '), pin' + pin + ', wait = ' + checkbox_wait + ')\n';
  return code;
};

Blockly.Python.microbit_music_pitch = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  Blockly.Python.definitions_['import_math'] = 'import math';
  var number_pitch = Blockly.Python.valueToCode(block, 'pitch', Blockly.Python.ORDER_ATOMIC);
  // var number_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'music.pitch(round(' + number_pitch + '), pin=pin' + pin + ')\n';
  return code;
};

Blockly.Python.microbit_music_play_list_of_notes = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var value_notes = Blockly.Python.valueToCode(block, 'notes', Blockly.Python.ORDER_ATOMIC) ||'[]';
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var code = 'music.play(' + value_notes + ', pin=pin' + pin + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
  return code;
};



Blockly.Python.microbit_music_reset = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var code = 'music.reset()\n';
  return code;
};

Blockly.Python.microbit_music_stop = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var pin = Blockly.Python.valueToCode(block, 'PIN', Blockly.Python.ORDER_ATOMIC);
  var code = 'music.stop(pin' + pin + ')\n';
  return code;
};

Blockly.Python.microbit_music_get_tempo = function(block) {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_music'] = 'import music';
  var code = 'music.get_tempo()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.tone_set_tempo=function(){
   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
   var bpm = Blockly.Python.valueToCode(this, 'BPM', Blockly.Python.ORDER_ASSIGNMENT);
   var ticks = Blockly.Python.valueToCode(this, 'TICKS', Blockly.Python.ORDER_ASSIGNMENT);
   var code = "music.set_tempo(ticks="+ ticks +", bpm="+ bpm +")\n";
   return code;
};

Blockly.Python.speech_translate=function(){
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.translate("+ text +")\n";
  return code
};

Blockly.Python.speech_say=function(){
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var mode = this.getFieldValue("MODE");
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
  var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
  var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
  var code = "speech."+mode+"("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
  return code
};

// Blockly.Python.speech_sing=function(){
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Blockly.Python.definitions_['import_speech'] = 'import speech';
//   var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
//   var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
//   var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
//   var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
//   var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
//   var code = "speech.sing("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };


// Blockly.Python.speech_prenounce=function(){
//   Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
//   Blockly.Python.definitions_['import_speech'] = 'import speech';
//   var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
//   var pitch = Blockly.Python.valueToCode(this, 'pitch', Blockly.Python.ORDER_ATOMIC);
//   var speed = Blockly.Python.valueToCode(this, 'speed', Blockly.Python.ORDER_ATOMIC);
//   var mouth = Blockly.Python.valueToCode(this, 'mouth', Blockly.Python.ORDER_ATOMIC);
//   var throat = Blockly.Python.valueToCode(this, 'throat', Blockly.Python.ORDER_ATOMIC);
//   var code = "speech.pronounce("+ text +", pitch="+pitch+", speed="+speed+", mouth="+mouth+", throat="+throat+")\n";
//   return code
// };

Blockly.Python.speech_say_easy=function(){
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.say("+ text +")\n";
  return code
};

Blockly.Python.speech_sing_easy=function(){
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.sing("+ text +")\n";
  return code
};


Blockly.Python.speech_prenounce_easy=function(){
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.pronounce("+ text +")\n";
  return code
};

Blockly.Python.servo_move = function() {
  Blockly.Python.definitions_['import_microbit_*'] = 'from microbit import *';
  Blockly.Python.setups_['class_servo'] =
      'class Servo:\n'+'    def __init__(self, pin, freq=50, min_us=600, max_us=2400, angle=180):\n'+
      '        self.min_us = min_us\n'+'        self.max_us = max_us\n'+'        self.us = 0\n'+'        self.freq = freq\n'+
      '        self.angle = angle\n'+'        self.analog_period = 0\n'+'        self.pin = pin\n'+
      '        analog_period = round((1/self.freq) * 1000)\n'+'        self.pin.set_analog_period(analog_period)\n\n'+
      '    def write_us(self, us):\n'+'        us = min(self.max_us, max(self.min_us, us))\n'+'        duty = round(us * 1024 * self.freq // 1000000)\n'+
      '        self.pin.write_analog(duty)\n'+'        self.pin.write_digital(0)\n\n'+'    def write_angle(self, degrees=None):\n'+
      '        degrees = degrees % 360\n'+'        total_range = self.max_us - self.min_us\n'+'        us = self.min_us + total_range * degrees // self.angle\n'+'        self.write_us(us)\n';
  var dropdown_pin = Blockly.Python.valueToCode(this, 'PIN',Blockly.Python.ORDER_ATOMIC);
  var value_degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Python.valueToCode(this, 'DELAY_TIME', Blockly.Python.ORDER_ATOMIC) || '0'
  //delay_time = delay_time.replace('(','').replace(')',''); 
  
  var code = 'Servo(pin'+dropdown_pin+').write_angle('+value_degree+')\n'+'sleep(' + delay_time + ')\n';
  return code;
};
