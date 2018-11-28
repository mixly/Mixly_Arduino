'use strict';

goog.provide('Blockly.Python.texts');

goog.require('Blockly.Python');


Blockly.Python.text = function() {
  // Text value.
    //var code = 'String('+Blockly.Python.quote_(this.getFieldValue('TEXT'))+')';
  var code =  Blockly.Python.quote_(this.getFieldValue('TEXT')) ;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_textarea = function() {
  // Text value.
    //var code = 'String('+Blockly.Python.quote_(this.getFieldValue('TEXT'))+')';
  var code = "'''" + (this.getFieldValue('VALUE')) + "'''";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_char = function() {
  var code = '\''+this.getFieldValue('TEXT')+'\'';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_join = function() {
  // Text value.
    var a = Blockly.Python.valueToCode(this, 'A', Blockly.Python.ORDER_ATOMIC);
    var b = Blockly.Python.valueToCode(this, 'B', Blockly.Python.ORDER_ATOMIC);
    return [a  + ' + ' + b , Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  if (towhat == 'b') return ['' +   str + '.encode("utf-8")', Blockly.Python.ORDER_ATOMIC];
  else return [towhat + "(" +  str  + ')', Blockly.Python.ORDER_ATOMIC];
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

Blockly.Python.text_char_at = function() {
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var at = Blockly.Python.valueToCode(this, 'AT', Blockly.Python.ORDER_ATOMIC) || 0;
    return [str + "[" + at + "]", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.text_random_char = function() {
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    Blockly.Python.definitions_.import_random = "import random";
    return ["random.choice(" + str + ")", Blockly.Python.ORDER_FUNCTION_CALL];
}

Blockly.Python.text_equals_starts_ends = function() {
  var str1 = (Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"');
  var str2 = (Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"');
  var dowhat = this.getFieldValue('DOWHAT');
  if (dowhat === '===')
      return [str1+' == ' + str2, Blockly.Python.ORDER_ATOMIC];
  else
      return [str1+'.'+dowhat+'('+str2+')', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_compare_to = function() {
  var str1 = (Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC) || '\"\"');
  var str2 = (Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC) || '\"\"');
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
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 0, true);
      break;
    case 'FIRST':
      var at1 = '0';
      break;
    default:
      throw 'Unhandled option (lists_getSublist)';
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2');
          at2 = at2;
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0, true);
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

Blockly.Python['text_substring'] = function(block) {
    // Get sublist.
    var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
    var at1 = Blockly.Python.valueToCode(this, 'AT1', Blockly.Python.ORDER_ATOMIC);
    var at2 = Blockly.Python.valueToCode(this, 'AT2', Blockly.Python.ORDER_ATOMIC);
    var code = str + '[' + at1 + ' : ' + at2 + ']';
    return [code, Blockly.Python.ORDER_MEMBER];
}

Blockly.Python.text_capital = function() {
  var capital = this.getFieldValue('CAPITAL');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  if (capital == 'title') return [''+str+'.title()' , Blockly.Python.ORDER_ATOMIC];
  else return [''+str+'.lower()', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_center = function() {
  var center = this.getFieldValue('CENTER');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var width =Blockly.Python.valueToCode(this, 'WID', Blockly.Python.ORDER_ATOMIC);
  var symbol =Blockly.Python.valueToCode(this, 'Symbol', Blockly.Python.ORDER_ATOMIC);
  return [''+str+'.'+center+'('+width+','+symbol+')' , Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_find = function() {
  var sentence =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var str=Blockly.Python.valueToCode(this, 'STR', Blockly.Python.ORDER_ATOMIC);
  return [''+sentence+'.find('+str+')' , Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_replace = function() {
  var sentence =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var str1=Blockly.Python.valueToCode(this, 'STR1', Blockly.Python.ORDER_ATOMIC);
  var str2=Blockly.Python.valueToCode(this, 'STR2', Blockly.Python.ORDER_ATOMIC);
  return [''+sentence+'.replace('+str1+','+str2+')' , Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.text_split = function() {
  var str = Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var argument = Blockly.Python.valueToCode(this, 'VAL', Blockly.Python.ORDER_ATOMIC) || '\"\"';
  var code = str + ".split(" + argument + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};



Blockly.Python.text_strip = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC) ;
  var code = str + "." + towhat + "()";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_format = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var s = this.getFieldValue('VAR');
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }

  var code = s +'.format(' + code.join(', ') + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_format_noreturn = function() {
  // Create a list with any number of elements of any type.
  var dropdown_type = this.getFieldValue('TYPE');
  var s =Blockly.Python.valueToCode(this, 'VAR', Blockly.Python.ORDER_ATOMIC);
  var code = new Array(this.itemCount_);
  var default_value = '0';


  for (var n = 0; n < this.itemCount_; n++) {

  code[n] = Blockly.Python.valueToCode(this, 'ADD' + n,
    Blockly.Python.ORDER_NONE) || default_value;
  }

  var code = s +'.format(' + code.join(', ') + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.text_substring3 = Blockly.Python.text_substring 
Blockly.Python.text_compareTo = Blockly.Python.text_compare_to
Blockly.Python.text_char_at3 = Blockly.Python.text_char_at