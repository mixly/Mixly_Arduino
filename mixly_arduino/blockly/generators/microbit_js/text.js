'use strict';

goog.provide('Blockly.JavaScript.texts');

goog.require('Blockly.JavaScript');


Blockly.JavaScript.text = function() {
  // Text value.
    //var code = 'String('+Blockly.JavaScript.quote_(this.getFieldValue('TEXT'))+')';
  var code =  Blockly.JavaScript.quote_(this.getFieldValue('TEXT')) ;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_char = function() {
  var code = '\''+this.getFieldValue('TEXT')+'\'';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_join = function() {
  // Text value.
    var a = '(\'\' + ' + Blockly.JavaScript.valueToCode(this, 'A', Blockly.JavaScript.ORDER_ATOMIC) + ')';
    var b = '(\'\' + ' + Blockly.JavaScript.valueToCode(this, 'B', Blockly.JavaScript.ORDER_ATOMIC) + ')';
    return [a  + ' + ' + b , Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str = '(\'\' + ' + Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) + ')';
  return [towhat + "(" +  str  + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.ascii_to_char = function () {
    var asciivalue = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '0'
    return ['String.fromCharCode(' + asciivalue+')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.char_to_ascii = function () {
    var charvalue = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || 'a'; 
    return [charvalue + '.charCodeAt(0)', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.number_to_text = function() {
  var str = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  return ['\'\' + '+str, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_length = function() {
  var str = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"';
  return ['(\'\' + ' + str+')'+'.length', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_char_at = function() {
  var str = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"';
  var at = Blockly.JavaScript.valueToCode(this, 'AT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return ['(\'\' + ' +str+')'+'.charAt('+at+')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_equals_starts_ends = function() {
  var str1 = '(\'\' + ' +(Blockly.JavaScript.valueToCode(this, 'STR1', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"')+')';
  var str2 = '(\'\' + ' +(Blockly.JavaScript.valueToCode(this, 'STR2', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"')+')';
  var dowhat = this.getFieldValue('DOWHAT');
  if (dowhat === '===')
      return [str1+' === ' + str2, Blockly.JavaScript.ORDER_ATOMIC];
  else
      return [str1+'.'+dowhat+'('+str2+')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_compareTo = function() {
  var str1 = '(\'\' + (' +(Blockly.JavaScript.valueToCode(this, 'STR1', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"')+'))';
  var str2 = '(\'\' + (' +(Blockly.JavaScript.valueToCode(this, 'STR2', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"')+'))';
  return [str1+'.localeCompare('+str2+')', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_substring = function() {
    var str = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '\"\"';
    var start = Blockly.JavaScript.valueToCode(this, 'START', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var end = Blockly.JavaScript.valueToCode(this, 'END', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    return ['(\'\' + ' +str+')'+'.substring('+start+', ' + end + ')', Blockly.JavaScript.ORDER_ATOMIC];
};