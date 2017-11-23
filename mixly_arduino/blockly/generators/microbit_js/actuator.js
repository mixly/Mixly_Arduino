'use strict';

goog.provide('Blockly.JavaScript.actuator');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.servo_move = function() {
  var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN',Blockly.JavaScript.ORDER_ATOMIC);
  var value_degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'pins.servoWritePin('+dropdown_pin+', '+value_degree+');\n';
  return code;
};

Blockly.JavaScript.servo_pulse = function() {
  var dropdown_pin = Blockly.JavaScript.valueToCode(this, 'PIN',Blockly.JavaScript.ORDER_ATOMIC);
  var value_degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'pins.servoSetPulse('+dropdown_pin+', '+value_degree+');\n';
  return code;
};

Blockly.JavaScript.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.tone_beats = function() {
  var code = "music.beat(" + this.getFieldValue('BEAT') + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.tone_play=function(){
   var fre = Blockly.JavaScript.valueToCode(this, 'FREQUENCY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
   var beat = Blockly.JavaScript.valueToCode(this, 'BEAT', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.playTone("+fre+", "+beat+");\n";
   return code;
};

Blockly.JavaScript.tone_ring=function(){
   var fre = Blockly.JavaScript.valueToCode(this, 'FREQUENCY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
   var code = "music.ringTone("+fre+");\n";
   return code;
};

Blockly.JavaScript.tone_rest=function(){
   var beat = Blockly.JavaScript.valueToCode(this, 'BEAT', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.rest("+beat+");\n";
   return code;
};
Blockly.JavaScript.tone_start_melody= function() {
    var melody = this.getFieldValue('melody');
    var repeat = this.getFieldValue('repeat');

    var code = "music.beginMelody(music.builtInMelody(" + melody + "), " + repeat + ");\n";
    return code;
};
Blockly.JavaScript.tone_event= function() {
    var event= this.getFieldValue('event');
    var branch = Blockly.JavaScript.statementToCode(this, 'do');

    Blockly.JavaScript.definitions_['func_tone_event_' + event] =  "music.onEvent(" + event + ", () => {\n" + branch + "});\n";
};
Blockly.JavaScript.tone_get_tempo= function() {
    return ["music.tempo()", Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.tone_change_tempo=function(){
   var degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.changeTempoBy("+ degree +");\n";
   return code;
};
Blockly.JavaScript.tone_set_tempo=function(){
   var degree = Blockly.JavaScript.valueToCode(this, 'DEGREE', Blockly.JavaScript.ORDER_ASSIGNMENT);
   var code = "music.setTempo("+ degree +");\n";
   return code;
};
