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
    var a = 'str(' + Blockly.Python.valueToCode(this, 'A', Blockly.Python.ORDER_ATOMIC) + ')';
    var b = 'str(' + Blockly.Python.valueToCode(this, 'B', Blockly.Python.ORDER_ATOMIC) + ')';
    return [a  + ' + ' + b , Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  if (towhat == 'b') return [towhat +   str  , Blockly.Python.ORDER_ATOMIC];
  else return [towhat + "(str(" +  str  + '))', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.ascii_to_char = function () {
    var asciivalue = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
    return ['chr(' + asciivalue+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.char_to_ascii = function () {
    var charvalue = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || 'a'; 
    return ['ord(' +charvalue +')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.number_to_text = function() {  
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '0'
  return ['str('+str+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_length = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  return ['len(' + str+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_char_at2 = function(a) {
    var b = a.getFieldValue("MODE") || "GET",
    c = a.getFieldValue("WHERE") || "FROM_START",
    str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    switch (c) {
    case "FROM_START":
        a = Blockly.Python.getAdjustedInt(a, "AT");
        return [str + "[" + a + "]", Blockly.Python.ORDER_ATOMIC];
        break;
    case "FROM_END":
        a = Blockly.Python.getAdjustedInt(a, "AT", 1, !0);
        return [str + "[" + a + "]", Blockly.Python.ORDER_ATOMIC];
        break;
    case "RANDOM":
        Blockly.Python.definitions_.import_random = "import random";
        return ["random.choice(" + str + ")", Blockly.Python.ORDER_FUNCTION_CALL];
        break;
    }
    throw "Unhandled combination (lists_getIndex).";
};

Blockly.Python.text_equals_starts_ends = function() {
  var str1 = 'str(' +(Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"')+')';
  var str2 = 'str(' +(Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"')+')';
  var dowhat = this.getFieldValue('DOWHAT');
  if (dowhat === '===')
      return [str1+' == ' + str2, Blockly.Python.ORDER_ATOMIC];
  else
      return [str1+'.'+dowhat+'('+str2+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_compareTo = function() {
  var str1 = 'str(' +(Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"')+'))';
  var str2 = 'str(' +(Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"')+'))';
  return ['cmp('+str1+','+str2+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['text_substring2'] = function(block) {
  // Get sublist.
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '0';
      break;
    default:
      throw 'Unhandled option (lists_getSublist)';
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1);
          at2 = at2;
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '-1';
      break;
    default:
      throw 'Unhandled option (lists_getSublist)';
  }
  var code = str + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};