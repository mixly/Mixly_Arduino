'use strict';

goog.provide('Blockly.Arduino.texts');

goog.require('Blockly.Arduino');


Blockly.Arduino.text = function() {
  // Text value.
    //var code = 'String('+Blockly.Arduino.quote_(this.getFieldValue('TEXT'))+')';
  var code =  Blockly.Arduino.quote_(this.getFieldValue('TEXT')) ;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_char = function() {
  var code = '\''+this.getFieldValue('TEXT')+'\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_join = function() {
  // Text value.
    var a = 'String(' + Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) + ')';
    var b = 'String(' + Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) + ')';
    return [a  + ' + ' + b , Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str = 'String(' + Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) + ')';
  return [str + '.' + towhat + '()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ascii_to_char = function () {
    var asciivalue = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '0'
    return ['char(' + asciivalue+')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.char_to_ascii = function () {
    var charvalue = '\'' + this.getFieldValue('TEXT') + '\'';
    return ['toascii(' + charvalue + ')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.number_to_text = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '0'
  return ['String('+str+", "+towhat+")", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_length = function() {
  var str = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  return ['String(' +str+')'+'.length()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_char_at = function() {
  var str = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var at = Blockly.Arduino.valueToCode(this, 'AT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  return ['String(' +str+')'+'.charAt('+at+')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_equals_starts_ends = function() {
  var str1 = 'String(' +(Blockly.Arduino.valueToCode(this, 'STR1', Blockly.Arduino.ORDER_ATOMIC) || '\"\"')+')';
  var str2 = 'String(' +(Blockly.Arduino.valueToCode(this, 'STR2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"')+')';
  var dowhat = this.getFieldValue('DOWHAT');
  return [str1+'.'+dowhat+'('+str2+')', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_compareTo = function() {
  var str1 = 'String(' +(Blockly.Arduino.valueToCode(this, 'STR1', Blockly.Arduino.ORDER_ATOMIC) || '\"\"')+')';
  var str2 = 'String(' +(Blockly.Arduino.valueToCode(this, 'STR2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"')+')';
  return [str1+'.compareTo('+str2+')', Blockly.Arduino.ORDER_ATOMIC];
};