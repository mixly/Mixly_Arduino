'use strict';
goog.provide('Blockly.Python.pins');
goog.require('Blockly.Python');

Blockly.Python.pins_digital = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};
Blockly.Python.pins_analog=Blockly.Python.pins_digital;
Blockly.Python.pins_button=Blockly.Python.pins_digital;
Blockly.Python.pins_pwm=Blockly.Python.pins_digital;
Blockly.Python.pins_interrupt=Blockly.Python.pins_digital;
Blockly.Python.pins_serial=Blockly.Python.pins_digital;
