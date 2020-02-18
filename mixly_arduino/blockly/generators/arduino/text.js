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
//小数获取有效位
Blockly.Arduino.decimal_places = function() {
  var numeral= Blockly.Arduino.valueToCode(this, 'numeral', Blockly.Arduino.ORDER_ATOMIC);
  var decimal_places= Blockly.Arduino.valueToCode(this, 'decimal_places', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'String('+ numeral+', '+ decimal_places+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//截取字符串
Blockly.Arduino.substring = function() {
  var name= Blockly.Arduino.valueToCode(this, 'name', Blockly.Arduino.ORDER_ATOMIC);
  var Start= Blockly.Arduino.valueToCode(this, 'Start', Blockly.Arduino.ORDER_ATOMIC);
  var end= Blockly.Arduino.valueToCode(this, 'end', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'String('+ name+').substring('+ Start+','+ end+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//字符串转化为大小写
Blockly.Arduino.letter_conversion = function() {
  var type= this.getFieldValue('type');
  var String= Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC);
  var code=''+String+''+type+';\n';
  return code;
};

//字符串变量替换
Blockly.Arduino.data_replacement = function() {
  var String= Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC);
  var replace= Blockly.Arduino.valueToCode(this, 'replace', Blockly.Arduino.ORDER_ATOMIC);
  var source_data= Blockly.Arduino.valueToCode(this, 'source_data', Blockly.Arduino.ORDER_ATOMIC);
  var code=''+String+'.replace('+source_data+', '+replace+');\n';
  return code;
};

//消除非可视字符
Blockly.Arduino.eliminate = function() {
  var String= Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC);
  var code=''+String+'.trim();\n';
  return code;
};

//检测是否以特定字符串开头或结尾
Blockly.Arduino.first_and_last = function() {
  var type= this.getFieldValue('type');
  var String= Blockly.Arduino.valueToCode(this, 'String', Blockly.Arduino.ORDER_ATOMIC);
  var String1= Blockly.Arduino.valueToCode(this, 'String1', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'String('+String+')'+type+'('+String1+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//数据类型转换
Blockly.Arduino.type_conversion = function() {
  var variable= Blockly.Arduino.valueToCode(this, 'variable', Blockly.Arduino.ORDER_ATOMIC);
  var type= this.getFieldValue('type');
  var code = ''+ type+'('+ variable+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.String_indexOf = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'str1', Blockly.Arduino.ORDER_ATOMIC);
  var str2 = Blockly.Arduino.valueToCode(this, 'str2', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'String('+str1+').indexOf(String('+str2+'))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.text_join2 = function() {
  // Create a list with any number of elements of any type.
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.Arduino.valueToCode(this, 'ADD' + n,
      Blockly.Arduino.ORDER_NONE) || '0';
  }
  var code1 = '';
  for (var n = 0; n < this.itemCount_; n++) {
    code1 = code1 + ' + ' + 'String(' + code[n] + ')';
  }
  code1 = code1.substring(3);
  return [code1, Blockly.Arduino.ORDER_ATOMIC];
};
