'use strict';
goog.provide('Blockly.Arduino.pins');
goog.require('Blockly.Arduino');

Blockly.Arduino.pins_digital = function() {
  var code = this.getFieldValue('PIN');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.pins_analog=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_pwm=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_interrupt=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_MOSI=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_MISO=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_SCK=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_SCL=Blockly.Arduino.pins_digital;
Blockly.Arduino.pins_SDA=Blockly.Arduino.pins_digital;