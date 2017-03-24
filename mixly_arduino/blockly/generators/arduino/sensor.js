'use strict';

goog.provide('Blockly.Arduino.sensor');
goog.require('Blockly.Arduino');

Blockly.Arduino.gps_init = function() {
  Blockly.Arduino.definitions_['define_TinyGPS++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  var rx = Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC);
  var tx = Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC);
  var bt = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC)
  Blockly.Arduino.definitions_['var_TinyGPSPlus_gps'] = 'TinyGPSPlus gps;';
  Blockly.Arduino.definitions_['var_SoftwareSerial_gps_ss'] = 'SoftwareSerial gps_ss('+rx+', '+tx+');';
  Blockly.Arduino.setups_['setup_gps_ss_begin'] = 'gps_ss.begin('+bt+');';
  return '';
};

Blockly.Arduino.gps_data_available = function() {
  var code = 'gps_ss.available()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_data_encode = function() {
  var code = 'gps.encode(gps_ss.read())';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_xxx_isValid = function() {
  var WHAT = this.getFieldValue('WHAT');
  var code = 'gps.'+WHAT+'.isValid()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.gps_getData_xxx = function() {
  var WHAT = this.getFieldValue('WHAT');
  var code = 'gps.'+WHAT+'()';
  return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.chaoshengbo = function () {
    var dropdown_pin1 = this.getFieldValue('PIN1');
    var dropdown_pin2 = this.getFieldValue('PIN2');
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', INPUT);';
    var funcName = 'checkdistance_' + dropdown_pin1 + '_' + dropdown_pin2;
    var code = 'float' + ' ' + funcName + '() {\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', LOW);\n' + '  delayMicroseconds(2);\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', HIGH);\n' + '  delayMicroseconds(10);\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', LOW);\n'
	+ '  float distance = pulseIn(' + dropdown_pin2 + ', HIGH) / 58.00;\n'
	+ '  delay(10);\n' + '  return distance;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.chaoshengbo2 = function () {
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', INPUT);';
    var funcName = 'checkdistance_' + dropdown_pin1 + '_' + dropdown_pin2;
    var code = 'float' + ' ' + funcName + '() {\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', LOW);\n' + '  delayMicroseconds(2);\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', HIGH);\n' + '  delayMicroseconds(10);\n'
	+ '  digitalWrite(' + dropdown_pin1 + ', LOW);\n'
	+ '  float distance = pulseIn(' + dropdown_pin2 + ', HIGH) / 58.00;\n'
	+ '  delay(10);\n' + '  return distance;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.dht11 = function () {
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var what = this.getFieldValue('WHAT');
    Blockly.Arduino.definitions_['define_dht'] = '#include <dht.h>';
    Blockly.Arduino.definitions_['var_dht_' + dropdown_pin] = 'dht myDHT_' + dropdown_pin + ';';
    var funcName = 'dht_' + dropdown_pin + '_get' + what;
    var code = 'int' + ' ' + funcName + '() {\n'
	+ '  int chk = myDHT_' + dropdown_pin + '.read' + sensor_type + '(' + dropdown_pin + ');\n'
	+ '  int value = myDHT_' + dropdown_pin + '.' + what + ';\n'
	+ '  return value;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ds18b20 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var unit = this.getFieldValue('UNIT');
    Blockly.Arduino.definitions_['define_OneWire'] = '#include <OneWire.h>';
    Blockly.Arduino.definitions_['define_DallasTemperature'] = '#include <DallasTemperature.h>';
    Blockly.Arduino.definitions_['var_OneWire_oneWire_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DallasTemperature_sensors_' + dropdown_pin] = 'DallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
    var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
    var code = 'float' + ' ' + funcName + '(int w) {\n'
	+ '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
	+ '  if(w==0) {return sensors_' + dropdown_pin + '.getTempC(insideThermometer);}\n'
	+ '  else {return sensors_' + dropdown_pin + '.getTempF(insideThermometer);}\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}
