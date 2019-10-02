'use strict';

goog.provide('Blockly.Arduino.serial');

goog.require('Blockly.Arduino');

// Blockly.Arduino.serial_softserial = function () {
//     var serial_select = this.getFieldValue('serial_select');
//     var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
//     var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);
//     Blockly.Arduino.definitions_['include_ESP32SoftwareSerial'] = '#include <Arduino.h>\n#include <ESP32SoftwareSerial.h>';
//     Blockly.Arduino.definitions_['var_declare' + serial_select] = 'ESP32SoftwareSerial ' + serial_select + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
//     return '';
// };

Blockly.Arduino.serial_softserial = function () {
	var serial_select = this.getFieldValue('serial_select');
	var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
	//var serial_no=serial_select.charAt(serial_select.length – 1);
	Blockly.Arduino.definitions_['var_declare_'+serial_select] = 'HardwareSerial  mySerial'+serial_select+'('+serial_select+');';
	var RX = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_ATOMIC);
	var TX = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.setups_['setup_serial_' + serial_select] =  'mySerial'+serial_select + '.begin(' +content+',SERIAL_8N1,'+ RX + ',' + TX + ');';
	return '';
};