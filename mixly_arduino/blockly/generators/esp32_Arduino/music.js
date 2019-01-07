'use strict';

goog.provide('Blockly.Arduino.music');

goog.require('Blockly.Arduino');


// Blockly.Arduino.tone_notes = function() {
//   var code = this.getFieldValue('STAT');
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };

// Blockly.Arduino.controls_tone=function(){
//    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
//    var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
//       Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
//    var code = ""; 
//    if(window.isNaN(dropdown_pin)){
//       code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
//    }else{
//       Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
//    }
//    code += "tone("+dropdown_pin+","+fre+");\n";
//    return code;
// };

// Blockly.Arduino.controls_tone2=function(){
//    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
//    var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
//       Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
//    var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
//       Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
//    var code = ""; 
//    if(window.isNaN(dropdown_pin)){
//       code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
//    }else{
//       Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
//    }
//    code += "tone("+dropdown_pin+","+fre+","+dur+");\n";
//    return code;
// };

// Blockly.Arduino.controls_notone=function(){
//    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
//    var code='';
//    if(window.isNaN(dropdown_pin)){
//      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
//    }else{
//      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
//    }
//    code += "noTone("+dropdown_pin+");\n";
//    return code;
// };
//执行器-蜂鸣器频率选择列表
Blockly.Arduino.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器-蜂鸣器
Blockly.Arduino.controls_tone2 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  Blockly.Arduino.definitions_['newtone0'] = 'float period;\nfloat pulse;';
  Blockly.Arduino.definitions_['newtone1'] = 'void newtone(int tonePin, int frequency, int duration)';
  Blockly.Arduino.definitions_['newtone2'] = '{\nfloat period = 1000000.0 /frequency;';
  Blockly.Arduino.definitions_['newtone3'] = 'float pulse = period / 2.0;';
  Blockly.Arduino.definitions_['newtone4'] = 'for (int i=1; i<=((duration * 1000.0)/period);i=i+1)';
  Blockly.Arduino.definitions_['newtone5'] = ' {\npinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,HIGH);';
  Blockly.Arduino.definitions_['newtone6'] = 'delayMicroseconds(pulse);';
  Blockly.Arduino.definitions_['newtone7'] = 'pinMode(tonePin, OUTPUT);\n digitalWrite(tonePin,LOW);';
  Blockly.Arduino.definitions_['newtone8'] = ' delayMicroseconds(pulse);\n}\n}\n';
  var code = "newtone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
  return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.controls_notone = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "digitalWrite(" + dropdown_pin + ", LOW);\n";
  return code;
};
