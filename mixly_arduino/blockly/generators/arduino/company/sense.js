'use strict';

goog.provide('Blockly.Arduino.sense');

goog.require('Blockly.Arduino');

Blockly.Arduino.sense_motor_speed = function() {
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
  Blockly.Arduino.definitions_['var_MBMotor'] = 'MBMotor MOT;';
  Blockly.Arduino.setups_['setup_output_PIN_MOTOR_DIR'] = 'pinMode(PIN_MOTOR_DIR, OUTPUT);';
  var code = 'MOT.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, '+speed+');\n'
  return code;
};

Blockly.Arduino.sense_motor_stop = function() {
  Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
  Blockly.Arduino.definitions_['var_MBMotor'] = 'MBMotor MOT;';
  Blockly.Arduino.setups_['setup_output_PIN_MOTOR_DIR'] = 'pinMode(PIN_MOTOR_DIR, OUTPUT);';
  var code = 'MOT.MotorDriver(PIN_MOTOR_DIR, PIN_MOTOR_PWM, 0);\n'
  return code;
};

Blockly.Arduino.sense_servo = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC) || '0';
	return 'servopulse(PIN_SERVO, '+angle+');\n';
}

Blockly.Arduino.sense_led_digital_display = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['var_TM1637'] = 'TM1637 digitalLedSense;';
	Blockly.Arduino.setups_['setup_sense_digitalLed_set'] = 'digitalLedSense.set(5);';
	Blockly.Arduino.setups_['setup_sense_digitalLed_init'] = 'digitalLedSense.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);';
	var funcName='senseDigitalDisplay';
    var code2='void '+funcName+'(byte i) {\n' 
	+ '  digitalLedSense.display(0, (byte)(i%10));\n'
	+ '  digitalLedSense.display(1, (byte)(i/10));\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	return 'senseDigitalDisplay('+value+');\n';
}

Blockly.Arduino.sense_led_digital_display_close = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['var_TM1637'] = 'TM1637 digitalLedSense;';
	Blockly.Arduino.setups_['setup_sense_digitalLed_set'] = 'digitalLedSense.set(5);';
	Blockly.Arduino.setups_['setup_sense_digitalLed_init'] = 'digitalLedSense.init(PIN_DIG_LED_CLK, PIN_DIG_LED_DIO);';
	return 'digitalLedSense.clearDisplay();\n';
}

Blockly.Arduino.sense_rgbled = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.setups_['setup_output_PIN_LED_R'] = 'pinMode(PIN_LED_R, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_LED_G'] = 'pinMode(PIN_LED_G, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_LED_B'] = 'pinMode(PIN_LED_B, OUTPUT);';
	var code='analogWrite(PIN_LED_R, '+R+');\n'+'analogWrite(PIN_LED_G, '+G+');\n'+'analogWrite(PIN_LED_B, '+B+');\n';
	return code;
}
Blockly.Arduino.sense_traffic_led = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var direction = this.getTitleValue('direction');
	var stat_r = this.getTitleValue('stat_r');
	var stat_y = this.getTitleValue('stat_y');
	var stat_g = this.getTitleValue('stat_g');
	Blockly.Arduino.setups_['setup_output_PIN_NORTH_LED_R'] = 'pinMode(PIN_NORTH_LED_R, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_NORTH_LED_Y'] = 'pinMode(PIN_NORTH_LED_Y, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_NORTH_LED_G'] = 'pinMode(PIN_NORTH_LED_G, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_SOUTH_LED_R'] = 'pinMode(PIN_SOUTH_LED_R, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_SOUTH_LED_Y'] = 'pinMode(PIN_SOUTH_LED_Y, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_SOUTH_LED_G'] = 'pinMode(PIN_SOUTH_LED_G, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_WEST_LED_R'] = 'pinMode(PIN_WEST_LED_R, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_WEST_LED_Y'] = 'pinMode(PIN_WEST_LED_Y, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_WEST_LED_G'] = 'pinMode(PIN_WEST_LED_G, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_EAST_LED_R'] = 'pinMode(PIN_EAST_LED_R, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_EAST_LED_Y'] = 'pinMode(PIN_EAST_LED_Y, OUTPUT);';
	Blockly.Arduino.setups_['setup_output_PIN_EAST_LED_G'] = 'pinMode(PIN_EAST_LED_G, OUTPUT);';
	var code='digitalWrite(PIN_'+direction+'_LED_R, '+stat_r+');\n'+'digitalWrite(PIN_'+direction+'_LED_Y, '+stat_y+');\n'+'digitalWrite(PIN_'+direction+'_LED_G, '+stat_g+');\n';
	return code;
}
Blockly.Arduino.sense_buzzer = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.setups_['setup_output_PIN_BUZZER'] = 'pinMode(PIN_BUZZER, OUTPUT);';
	var stat = this.getTitleValue('stat');
	var code='digitalWrite(PIN_BUZZER, '+stat+');\n';
	return code;
}

Blockly.Arduino.sense_ledmatrix = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['define_NumDevices'] = '#define NumDevices  1';
	Blockly.Arduino.definitions_['define_myNumChar'] = 'const static byte myNumChar[288] = {0x30,0x48,0x48,0x48,0x48,0x48,0x30,0x00, /* 0 */\n'
													 + '                                    0x20,0x60,0x20,0x20,0x20,0x20,0x70,0x00, /* 1 */\n'
													 + '                                    0x30,0x48,0x08,0x10,0x20,0x40,0x78,0x00, /* 2 */\n'
													 + '                                    0x30,0x48,0x08,0x30,0x08,0x48,0x30,0x00, /* 3 */\n'
													 + '                                    0x10,0x30,0x30,0x50,0x50,0x78,0x10,0x00, /* 4 */\n'
													 + '                                    0x78,0x40,0x40,0x70,0x08,0x08,0x70,0x00, /* 5 */\n'
													 + '                                    0x30,0x48,0x40,0x70,0x48,0x48,0x30,0x00, /* 6 */\n'
													 + '                                    0x78,0x48,0x08,0x10,0x20,0x20,0x20,0x00, /* 7 */\n'
													 + '                                    0x30,0x48,0x48,0x30,0x48,0x48,0x30,0x00, /* 8 */\n'
													 + '                                    0x30,0x48,0x48,0x38,0x08,0x48,0x30,0x00}; /* 9 */';
	Blockly.Arduino.definitions_['define_LedControl'] = 'LedControl LedCtrl(PIN_MATRIX_LED_DIN, PIN_MATRIX_LED_CLK, PIN_MATRIX_LED_CS,NumDevices);';
	Blockly.Arduino.setups_['setup_sense_ledctrl_shutdown'] = 'LedCtrl.shutdown(0, false);';
	var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='senseSetLedMatrix('+value+');\n';
	var funcName='senseSetLedMatrix';
    var code2='void '+funcName+'(char i) {\n' 
	+ '  if(i>=0&&i<=9){\n'
	+ '  	for(int j=i*8;j<i*8+8;j++)\n'
	+ '  		LedCtrl.setRow(0,j%8,myNumChar[j]);\n'
	+ '  }\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	return code;
}

Blockly.Arduino.sense_ledmatrix_close = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['define_NumDevices'] = '#define NumDevices  1';
	Blockly.Arduino.definitions_['define_LedControl'] = 'LedControl LedCtrl(PIN_MATRIX_LED_DIN, PIN_MATRIX_LED_CLK, PIN_MATRIX_LED_CS,NumDevices);';
	Blockly.Arduino.setups_['setup_sense_ledctrl_shutdown'] = 'LedCtrl.shutdown(0, false);';
	var code='LedCtrl.clearDisplay(0);\n';
	return code;
}

Blockly.Arduino.sense_ultrasonic = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var code='distanceCm(PIN_TRIG, PIN_ECHO)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_sound = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var code='loudness(PIN_SOUND)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_light = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var code='lightVal(PIN_LIGHT)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_temperature = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['var_HumidityDHT11'] = 'HumidityDHT11 senseDHT11(PIN_HUMIDITY);';
	var funcName='senseReadTemperature';
    var code2='float '+funcName+'() {\n' 
	+ '  senseDHT11.read11();\n'
	+ '  return senseDHT11.temperature;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	var code='senseReadTemperature()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_humidity = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['var_HumidityDHT11'] = 'HumidityDHT11 senseDHT11(PIN_HUMIDITY);';
	var funcName='senseReadHumidity';
    var code2='float '+funcName+'() {\n' 
	+ '  senseDHT11.read11();\n'
	+ '  return senseDHT11.humidity;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	var code='senseReadHumidity()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_sliding = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	var code='analogRead(PIN_POT)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.sense_weight = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['var_HX711'] = 'HX711 Weight(PIN_WEIGHT_DIO, PIN_WEIGHT_CLK);';
	var code='Weight.read()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

//红外接收模块
Blockly.Arduino.sense_ir = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.definitions_['var_ir_recv_PIN_INFRARED'] = 'IRrecv sense_irrecv(PIN_INFRARED);\ndecode_results sense_results;\n';
    Blockly.Arduino.setups_['setup_ir_recv_PIN_INFRARED'] = 'sense_irrecv.enableIRIn();';
	var variable = Blockly.Arduino.variableDB_.getName(this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
	var branch = Blockly.Arduino.statementToCode(this, 'DO');
	var code="if (sense_irrecv.decode(&sense_results)) {\n"
    code += '  '+variable+'=sense_results.value;\n';
    code += branch;
    code +='  sense_irrecv.resume();\n'
    code +='}\n';
    return code;
}

Blockly.Arduino.sense_motion = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.setups_['setup_input_PIN_HUMAN_INFRARED'] = 'pinMode(PIN_HUMAN_INFRARED, INPUT);';
	var code='digitalRead(PIN_HUMAN_INFRARED)';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.sense_button = function() {
	Blockly.Arduino.definitions_['define_config'] = '#include <Config.h>';
	Blockly.Arduino.setups_['setup_input_PIN_BT_UP'] = 'pinMode(PIN_BT_UP, INPUT);';
	Blockly.Arduino.setups_['setup_input_PIN_BT_DOWN'] = 'pinMode(PIN_BT_DOWN, INPUT);';
	Blockly.Arduino.setups_['setup_input_PIN_BT_LEFT'] = 'pinMode(PIN_BT_LEFT, INPUT);';
	Blockly.Arduino.setups_['setup_input_PIN_BT_RIGHT'] = 'pinMode(PIN_BT_RIGHT, INPUT);';
	Blockly.Arduino.setups_['setup_input_PIN_BT_MID'] = 'pinMode(PIN_BT_MID, INPUT);';
	var stat = this.getTitleValue('stat');
	var code='!digitalRead(PIN_BT_'+stat+')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}