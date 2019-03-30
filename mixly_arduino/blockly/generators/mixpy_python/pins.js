'use strict';
goog.provide('Blockly.Python.pins');
goog.require('Blockly.Python');

Blockly.Python.pins_digital = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.pins_digital_write=Blockly.Python.pins_digital;
Blockly.Python.pins_digital_read=Blockly.Python.pins_digital;
Blockly.Python.pins_analog_write=Blockly.Python.pins_digital;
Blockly.Python.pins_analog_read=Blockly.Python.pins_digital;