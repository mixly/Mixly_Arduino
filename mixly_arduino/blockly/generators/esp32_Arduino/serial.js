'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');

Blockly.Arduino.serial_softserial = function () {
    var serial_select = this.getFieldValue('serial_select');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_ESP32SoftwareSerial'] = '#include <Arduino.h>\n#include <ESP32SoftwareSerial.h>';
    Blockly.Arduino.definitions_['var_' + serial_select] = 'ESP32SoftwareSerial ' + serial_select + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
    return '';
};