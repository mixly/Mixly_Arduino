'use strict';

goog.provide('Blockly.Python.texts');

goog.require('Blockly.Python');


Blockly.Python.text = function() {
  // Text value.
    //var code = 'String('+Blockly.Python.quote_(this.getFieldValue('TEXT'))+')';
  var code =  Blockly.Python.quote_(this.getFieldValue('TEXT')) ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_char = function() {
  var code = '\''+this.getFieldValue('TEXT')+'\'';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_join = function() {
  // Text value.
    var a = '(\'\' + ' + Blockly.Python.valueToCode(this, 'A', Blockly.Python.ORDER_ATOMIC) + ')';
    var b = '(\'\' + ' + Blockly.Python.valueToCode(this, 'B', Blockly.Python.ORDER_ATOMIC) + ')';
    return [a  + ' + ' + b , Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str = '(\'\' + ' + Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) + ')';
  return [towhat + "(" +  str  + ')', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.ascii_to_char = function () {
    var asciivalue = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
    return ['chr(' + asciivalue+')', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.char_to_ascii = function () {
    var charvalue = '\'' + this.getFieldValue('TEXT') + '\'';
    return ['ord(' +charvalue +')', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.number_to_text = function() {  
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
  return ['str('+str+')', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.text_length = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['len(' + str+')', Blockly.Python.ORDER_ATOMIC];
};
//ok, change 'start from 0' to 1
Blockly.Python.text_char_at = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ATOMIC) || '0';
  return [str+'['+at+'-1]', Blockly.Python.ORDER_ATOMIC];
};
//ok
Blockly.Python.text_equals_starts_ends = function() {
  var str1 = '(\'\' + ' +(Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"')+')';
  var str2 = '(\'\' + ' +(Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"')+')';
  var dowhat = this.getFieldValue('DOWHAT');
  if (dowhat === '===')
      return [str1+' == ' + str2, Blockly.Python.ORDER_ATOMIC];
  else
      return [str1+'.'+dowhat+'('+str2+')', Blockly.Python.ORDER_ATOMIC];
};
//ok, cmp() is not supported in Python 3 
Blockly.Python.text_compareTo = function() {
  var str1 = '(\'\' + (' +(Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"')+'))';
  var str2 = '(\'\' + (' +(Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"')+'))';
  return ['cmp('+str1+','+str2+')', Blockly.Python.ORDER_ATOMIC];
};
//ok, change 'start from 0' to 1
Blockly.Python.text_substring = function() {
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var start = Blockly.Python.valueToCode(this, 'START', Blockly.Python.ORDER_ATOMIC) || '0';
    var end = Blockly.Python.valueToCode(this, 'END', Blockly.Python.ORDER_ATOMIC) || '1';
    return ['(\'\' + ' +str+')'+'[slice(('+start+'-1), ' + end + ')]', Blockly.Python.ORDER_ATOMIC];
};