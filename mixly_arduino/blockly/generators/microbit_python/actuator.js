'use strict';

goog.provide('Blockly.Python.actuator');
goog.require('Blockly.Python');

Blockly.Python.microbit_music_play_built_in = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var dropdown_melody = block.getFieldValue('melody');
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var code = 'music.play(music.' + dropdown_melody +', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
  return code;
};

Blockly.Python.microbit_music_pitch = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var number_pitch = block.getFieldValue('pitch');
  var number_duration = block.getFieldValue('duration');
  var code = 'music.pitch(' + number_pitch + ', ' + number_duration + ')\n';
  return code;
};

Blockly.Python.microbit_music_play_list_of_notes = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var value_notes = Blockly.Python.valueToCode(block, 'notes', Blockly.Python.ORDER_ATOMIC);
  var checkbox_wait = block.getFieldValue('wait') == 'TRUE' ? 'True' : 'False';
  var checkbox_loop = block.getFieldValue('loop') == 'TRUE' ? 'True' : 'False';
  var code = 'music.play(' + value_notes + ', wait=' + checkbox_wait + ', loop=' + checkbox_loop + ')\n';
  return code;
};

Blockly.Python.microbit_music_reset = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var code = 'music.reset()\n';
  return code;
};

Blockly.Python.microbit_music_stop = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var code = 'music.stop()\n';
  return code;
};

Blockly.Python.microbit_music_get_tempo = function(block) {
  Blockly.Python.definitions_['import_music'] = 'import music';
  var code = 'music.get_tempo()';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python.tone_set_tempo=function(){
   var degree = Blockly.Python.valueToCode(this, 'DEGREE', Blockly.Python.ORDER_ASSIGNMENT);
   var code = "music.set_tempo(bpm="+ degree +");\n";
   return code;
};

Blockly.Python.speech_say=function(){
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.say("+ text +")\n";
  return code
};

Blockly.Python.speech_sing=function(){
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.sing("+ text +")\n";
  return code
};


Blockly.Python.speech_prenounce=function(){
  Blockly.Python.definitions_['import_speech'] = 'import speech';
  var text = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = "speech.pronounce("+ text +")\n";
  return code
};

