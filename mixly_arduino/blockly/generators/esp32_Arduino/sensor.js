'use strict';

goog.provide('Blockly.Arduino.sensor');
goog.require('Blockly.Arduino');

Blockly.Arduino.gps_init = function() {
  Blockly.Arduino.definitions_['include_TinyGPS++'] = '#include <TinyGPS++.h>';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
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
    Blockly.Arduino.definitions_['include_dht'] = '#include <dht.h>';
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
//LM35 Temperature
Blockly.Arduino.LM35 = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead(' + dropdown_pin + ')*0.488';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.ds18b20 = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var unit = this.getFieldValue('UNIT');
    Blockly.Arduino.definitions_['include_OneWire'] = '#include <OneWire.h>';
    Blockly.Arduino.definitions_['include_DallasTemperature'] = '#include <DallasTemperature.h>';
    Blockly.Arduino.definitions_['var_OneWire_oneWire_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DallasTemperature_sensors_' + dropdown_pin] = 'DallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
    Blockly.Arduino.definitions_['var_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
    Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
    var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
    var code = 'float' + ' ' + funcName + '(int w) {\n'
	+ '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
	+ '  if(w==0) {\nreturn sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n}\n'
	+ '  else {\nreturn sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n}\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}
//DS1302
Blockly.Arduino.DS1302_init = function () {
    var RTCName = this.getFieldValue('RTCName');
    var dropdown_rst = Blockly.Arduino.valueToCode(this, 'RST', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_dat = Blockly.Arduino.valueToCode(this, 'DAT', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_clk = Blockly.Arduino.valueToCode(this, 'CLK', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_DS1302'] = '#include <DS1302.h>';
    Blockly.Arduino.definitions_['DS1302'+RTCName] = 'DS1302 '+ RTCName +'(' + dropdown_rst + ',' + dropdown_dat + ',' + dropdown_clk + ');';
    return "";
};

Blockly.Arduino.DS1307_init = function () {
  var SDA = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
  var RTCName = this.getFieldValue('RTCName');
  Blockly.Arduino.definitions_['include_RTC'] = '#include <RTC.h>';
  Blockly.Arduino.definitions_['DS1307'+RTCName] = 'DS1307 ' + RTCName + '('+SDA+','+SCL+');';
  return "";
}
Blockly.Arduino.RTC_get_time = function () {
  var RTCName = this.getFieldValue('RTCName');
  var timeType = this.getFieldValue('TIME_TYPE');
  var code = RTCName + '.' + timeType +'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
Blockly.Arduino.RTC_set_time = function () {
  var RTCName = this.getFieldValue('RTCName');
  var hour = Blockly.Arduino.valueToCode(this, "hour", Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, "minute", Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(this, "second", Blockly.Arduino.ORDER_ATOMIC);
  var code = RTCName + '.setTime('+ hour + ','+ minute + ','+ second +');\n';
  return code;
}
Blockly.Arduino.RTC_set_date = function () {
  var RTCName = this.getFieldValue('RTCName');
  var year = Blockly.Arduino.valueToCode(this, "year", Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(this, "month", Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(this, "day", Blockly.Arduino.ORDER_ATOMIC);
  var code = RTCName + '.setDate('+ year + ','+ month + ','+ day +');\n';
  code += RTCName + '.setDOW('+ year + ','+ month + ','+ day +');\n';
  return code;
}
//传感器-重力感应块-获取数据
Blockly.Arduino.ADXL345 = function() {
  Blockly.Arduino.definitions_['include_ADXL345'] = '#include <ADXL345.h>';
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_I2Cdev'] = '#include <I2Cdev.h>';
  Blockly.Arduino.definitions_['var_ADXL345'] = 'ADXL345 accel;';
  Blockly.Arduino.setups_['setup_ADXL345-A'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_ADXL345-B'] = 'accel.initialize();';
  var dropdown_type = this.getFieldValue('ADXL345_PIN');
  var code = '';
  if (dropdown_type == "xa") code += 'accel.X_angle()';
  if (dropdown_type == "ya") code += 'accel.Y_angle()';
  if (dropdown_type == "x") code += 'accel.getAccelerationX()';
  if (dropdown_type == "y") code += 'accel.getAccelerationY()';
  if (dropdown_type == "z") code += 'accel.getAccelerationZ()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};