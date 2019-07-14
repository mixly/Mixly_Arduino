'use strict';

goog.provide('Blockly.Python.html');

goog.require('Blockly.Python');

Blockly.Python.html_document = function() {
  var head = Blockly.Python.statementToCode(this, 'HEAD');
  var body = Blockly.Python.statementToCode(this, 'BODY');
  var code = "'''<!DOCTYPE HTML>\n<html>\n<head>\n"+'\t<meta charset="utf-8">\n' + head + "</head>\n<body>\n" + body + "</body>\n</html>\n'''";
  return [code,Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python.html_title = function() {
  var t = Blockly.Python.statementToCode(this, 'DO');
  var l = this.getFieldValue('LEVEL');
  var code = "<h" + l + ">\n" + t + "</h" + l + ">\n";
  return code;
};


Blockly.Python.html_head_body = function() {
  var t = Blockly.Python.statementToCode(this, 'DO');
  var l = this.getFieldValue('LEVEL');
  if(l=='head'){
    var code = "<" + l + '>\n\t<meta charset="utf-8">\n' + t + "</" + l + ">\n";
  }
  else{
    var code = "<" + l + ">\n" + t + "</" + l + ">\n";
  }
  return code;
};

Blockly.Python.html_content = function() {
  var t = Blockly.Python.statementToCode(this, 'DO');
  // var s = Blockly.Python.valueToCode(this, 'style');
  var l = this.getFieldValue('LEVEL');
  // var code = "<" + l + " " + s + " >\n" + t + "</" + l + ">\n";
  var code = "<" + l + ">\n" + t + "</" + l + ">\n";
  return code;
};

Blockly.Python.html_content_more = function() {
  var t = Blockly.Python.statementToCode(this, 'DO');
  var s = Blockly.Python.valueToCode(this, 'style');
  var l = this.getFieldValue('LEVEL');
  var code = "<" + l + " " + s + " >\n" + t + "</" + l + ">\n";
  return code;
};

Blockly.Python.html_style = function() {
  var style = Blockly.Python.statementToCode(this, 'STYLE');
  var code = 'style="' + style + '"';
  return [code,Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.html_form = function() {
  var tag = this.getFieldValue('LEVEL');
  var name = this.getFieldValue('NAME');
  var value = this.getFieldValue('VALUE');
  var s = Blockly.Python.valueToCode(this, 'style')||"";
  var code ='<input type="'+ tag +'" name="'+ name +'" value="'+ value +'" '+ s +' />';
  return code;
};

Blockly.Python.html_style_content = function() {
  var key = this.getFieldValue('KEY');
  var value = this.getFieldValue('VALUE');
  var code = key + ':' + value + ";";
  return code;
};

Blockly.Python.html_text = function() {
  var text = this.getFieldValue('TEXT');
  var code = text+"\n";
  return code;
};