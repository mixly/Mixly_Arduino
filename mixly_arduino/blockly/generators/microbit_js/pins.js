'use strict';
goog.provide('Blockly.JavaScript.pins');
goog.require('Blockly.JavaScript');

Blockly.JavaScript.pins_digital = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.pins_analog=Blockly.JavaScript.pins_digital;
Blockly.JavaScript.pins_button=Blockly.JavaScript.pins_digital;
Blockly.JavaScript.pins_pwm=Blockly.JavaScript.pins_digital;
Blockly.JavaScript.pins_interrupt=Blockly.JavaScript.pins_digital;
Blockly.JavaScript.pins_serial=Blockly.JavaScript.pins_digital;
