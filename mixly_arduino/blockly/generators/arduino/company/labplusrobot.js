'use strict';
goog.provide('Blockly.Arduino.labplusrobot');
goog.require('Blockly.Arduino');

Blockly.Arduino.labplusrobot_movement = function() {	
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_labRobot_API'] = '#include "labRobot_API.h"';
	Blockly.Arduino.definitions_['var_int_step_nu'] = 'int step_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step_nu1'] = 'int step_nu1 = 7;';
	Blockly.Arduino.definitions_['var_int_step1_nu'] = 'int step1_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step1_nu1'] = 'int step1_nu1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num'] = 'char step_num = 0;';
	Blockly.Arduino.definitions_['var_char_step_num1'] = 'char step_num1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num2'] = 'char step_num2 = 7;';
	Blockly.Arduino.definitions_['var_step_state_step_state1'] = 'step_state step_state1;';
	Blockly.Arduino.definitions_['var_bluetooth_state_bluetooth_state'] = '_bluetooth_state bluetooth_state;';
	Blockly.Arduino.definitions_['var_GroveColorSensor_colorSensor'] = 'GroveColorSensor colorSensor;';
	Blockly.Arduino.definitions_['var_byte_Rx3_count'] = 'byte Rx3_count;';
	Blockly.Arduino.definitions_['var_byte_Tx3_count'] = 'byte Tx3_count;';
	Blockly.Arduino.definitions_['var_byte_proess_count'] = 'byte proess_count;';
	Blockly.Arduino.definitions_['var_Adafruit_8x16matrix_matrix'] = 'Adafruit_8x16matrix  matrix = Adafruit_8x16matrix();';
	Blockly.Arduino.setups_['setup_hal_init'] = 'Hal_Init();';
	var STAT = this.getTitleValue('STAT');
	var code='blu_'+STAT+'();\n';
	return code;
}

Blockly.Arduino.labplusrobot_turn = function() {	
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_labRobot_API'] = '#include "labRobot_API.h"';
	Blockly.Arduino.definitions_['var_int_step_nu'] = 'int step_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step_nu1'] = 'int step_nu1 = 7;';
	Blockly.Arduino.definitions_['var_int_step1_nu'] = 'int step1_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step1_nu1'] = 'int step1_nu1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num'] = 'char step_num = 0;';
	Blockly.Arduino.definitions_['var_char_step_num1'] = 'char step_num1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num2'] = 'char step_num2 = 7;';
	Blockly.Arduino.definitions_['var_step_state_step_state1'] = 'step_state step_state1;';
	Blockly.Arduino.definitions_['var_bluetooth_state_bluetooth_state'] = '_bluetooth_state bluetooth_state;';
	Blockly.Arduino.definitions_['var_GroveColorSensor_colorSensor'] = 'GroveColorSensor colorSensor;';
	Blockly.Arduino.definitions_['var_byte_Rx3_count'] = 'byte Rx3_count;';
	Blockly.Arduino.definitions_['var_byte_Tx3_count'] = 'byte Tx3_count;';
	Blockly.Arduino.definitions_['var_byte_proess_count'] = 'byte proess_count;';
	Blockly.Arduino.definitions_['var_Adafruit_8x16matrix_matrix'] = 'Adafruit_8x16matrix  matrix = Adafruit_8x16matrix();';
	Blockly.Arduino.setups_['setup_hal_init'] = 'Hal_Init();';
	var STAT = this.getTitleValue('STAT');
	var degree = Blockly.Arduino.valueToCode(this, 'degree', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code=STAT+'_anyAngle('+degree+');\n';
	return code;
}

Blockly.Arduino.labplusrobot_display = function() {	
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_labRobot_API'] = '#include "labRobot_API.h"';
	Blockly.Arduino.definitions_['var_int_step_nu'] = 'int step_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step_nu1'] = 'int step_nu1 = 7;';
	Blockly.Arduino.definitions_['var_int_step1_nu'] = 'int step1_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step1_nu1'] = 'int step1_nu1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num'] = 'char step_num = 0;';
	Blockly.Arduino.definitions_['var_char_step_num1'] = 'char step_num1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num2'] = 'char step_num2 = 7;';
	Blockly.Arduino.definitions_['var_step_state_step_state1'] = 'step_state step_state1;';
	Blockly.Arduino.definitions_['var_bluetooth_state_bluetooth_state'] = '_bluetooth_state bluetooth_state;';
	Blockly.Arduino.definitions_['var_GroveColorSensor_colorSensor'] = 'GroveColorSensor colorSensor;';
	Blockly.Arduino.definitions_['var_byte_Rx3_count'] = 'byte Rx3_count;';
	Blockly.Arduino.definitions_['var_byte_Tx3_count'] = 'byte Tx3_count;';
	Blockly.Arduino.definitions_['var_byte_proess_count'] = 'byte proess_count;';
	Blockly.Arduino.definitions_['var_Adafruit_8x16matrix_matrix'] = 'Adafruit_8x16matrix  matrix = Adafruit_8x16matrix();';
	Blockly.Arduino.setups_['setup_hal_init'] = 'Hal_Init();';
	var STAT = this.getTitleValue('STAT');
	var code='blu_display_'+STAT+'();\n';
	return code;
}

Blockly.Arduino.labplusrobot_led_top = function() {	
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_labRobot_API'] = '#include "labRobot_API.h"';
	Blockly.Arduino.definitions_['var_int_step_nu'] = 'int step_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step_nu1'] = 'int step_nu1 = 7;';
	Blockly.Arduino.definitions_['var_int_step1_nu'] = 'int step1_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step1_nu1'] = 'int step1_nu1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num'] = 'char step_num = 0;';
	Blockly.Arduino.definitions_['var_char_step_num1'] = 'char step_num1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num2'] = 'char step_num2 = 7;';
	Blockly.Arduino.definitions_['var_step_state_step_state1'] = 'step_state step_state1;';
	Blockly.Arduino.definitions_['var_bluetooth_state_bluetooth_state'] = '_bluetooth_state bluetooth_state;';
	Blockly.Arduino.definitions_['var_GroveColorSensor_colorSensor'] = 'GroveColorSensor colorSensor;';
	Blockly.Arduino.definitions_['var_byte_Rx3_count'] = 'byte Rx3_count;';
	Blockly.Arduino.definitions_['var_byte_Tx3_count'] = 'byte Tx3_count;';
	Blockly.Arduino.definitions_['var_byte_proess_count'] = 'byte proess_count;';
	Blockly.Arduino.definitions_['var_Adafruit_8x16matrix_matrix'] = 'Adafruit_8x16matrix  matrix = Adafruit_8x16matrix();';
	Blockly.Arduino.setups_['setup_hal_init'] = 'Hal_Init();';
	var STAT = this.getTitleValue('STAT');
	var code='blu_buttLED_'+STAT+'();\n';
	return code;
}

Blockly.Arduino.labplusrobot_led_side = function() {	
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
	Blockly.Arduino.definitions_['define_labRobot_API'] = '#include "labRobot_API.h"';
	Blockly.Arduino.definitions_['var_int_step_nu'] = 'int step_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step_nu1'] = 'int step_nu1 = 7;';
	Blockly.Arduino.definitions_['var_int_step1_nu'] = 'int step1_nu = 0;';
	Blockly.Arduino.definitions_['var_int_step1_nu1'] = 'int step1_nu1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num'] = 'char step_num = 0;';
	Blockly.Arduino.definitions_['var_char_step_num1'] = 'char step_num1 = 7;';
	Blockly.Arduino.definitions_['var_char_step_num2'] = 'char step_num2 = 7;';
	Blockly.Arduino.definitions_['var_step_state_step_state1'] = 'step_state step_state1;';
	Blockly.Arduino.definitions_['var_bluetooth_state_bluetooth_state'] = '_bluetooth_state bluetooth_state;';
	Blockly.Arduino.definitions_['var_GroveColorSensor_colorSensor'] = 'GroveColorSensor colorSensor;';
	Blockly.Arduino.definitions_['var_byte_Rx3_count'] = 'byte Rx3_count;';
	Blockly.Arduino.definitions_['var_byte_Tx3_count'] = 'byte Tx3_count;';
	Blockly.Arduino.definitions_['var_byte_proess_count'] = 'byte proess_count;';
	Blockly.Arduino.definitions_['var_Adafruit_8x16matrix_matrix'] = 'Adafruit_8x16matrix  matrix = Adafruit_8x16matrix();';
	Blockly.Arduino.setups_['setup_hal_init'] = 'Hal_Init();';
	var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='display(3, 1, 0, '+R+', '+G+', '+B+');\n';
	return code;
}