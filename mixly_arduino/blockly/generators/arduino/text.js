'use strict';

goog.provide('Blockly.Arduino.texts');

goog.require('Blockly.Arduino');


Blockly.Arduino.text = function() {
  // Text value.
  var code = 'String('+Blockly.Arduino.quote_(this.getFieldValue('TEXT'))+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_char = function() {
  var code = '\''+this.getFieldValue('TEXT')+'\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_join = function() {
  // Text value.
  var a = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var b = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  return [a+' + '+b, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.text_to_number = function() {
  var towhat = this.getFieldValue('TOWHAT');
  var str = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  return [str+'.'+towhat+'()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.number_to_text = function() {
  var str = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_ATOMIC) || '0'
  return ['String("")+'+str, Blockly.Arduino.ORDER_ATOMIC];
};
