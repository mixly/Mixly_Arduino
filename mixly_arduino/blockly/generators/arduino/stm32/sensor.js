'use strict';

goog.provide('Blockly.Arduino.sensor');
goog.require('Blockly.Arduino');

Blockly.Arduino.chaoshengbo2 = function () {
  var Trig = this.getFieldValue('Trig');
  var Echo = this.getFieldValue('Echo');
  Blockly.Arduino.setups_['setup_output_' + Trig] = 'pinMode(' + Trig + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + Echo] = 'pinMode(' + Echo + ', INPUT);';
  var funcName = 'checkdistance_' + Trig + '_' + Echo;
  var code = 'float' + ' ' + funcName + '() {\n'
  + '  digitalWrite(' + Trig + ', LOW);\n' + '  delayMicroseconds(2);\n'
  + '  digitalWrite(' + Trig + ', HIGH);\n' + '  delayMicroseconds(10);\n'
  + '  digitalWrite(' + Trig + ', LOW);\n'
  + '  float distance = pulseIn(' + Echo + ', HIGH) / 58.00;\n'
  + '  delay(10);\n' + '  return distance;\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName + '()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ds18b20 = function () {
 var dropdown_pin = this.getFieldValue('PIN');
 var unit = this.getFieldValue('UNIT');
 Blockly.Arduino.definitions_['include_OneWire'] = '#include <OneWire.h>';
 Blockly.Arduino.definitions_['include_DallasTemperature'] = '#include <DallasTemperature.h>';
 Blockly.Arduino.definitions_['var_declare_OneWire_DallasTemperature_sensors_' + dropdown_pin] = 'OneWire oneWire_' + dropdown_pin + '(' + dropdown_pin + ');\nDallasTemperature sensors_' + dropdown_pin + '(&oneWire_' + dropdown_pin + ');';
 Blockly.Arduino.definitions_['var_declare_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
 Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_getAddress'] = 'sensors_' + dropdown_pin + '.getAddress(insideThermometer, 0);';
 Blockly.Arduino.setups_['setup_sensors_' + dropdown_pin + '_setResolution'] = 'sensors_' + dropdown_pin + '.setResolution(insideThermometer, 9);';
 var funcName = 'ds18b20_' + dropdown_pin + '_getTemp';
 var code = 'float' + ' ' + funcName + '(int w) {\n'
 + '  sensors_' + dropdown_pin + '.requestTemperatures();\n'
 + '  if(w==0) {\n    return sensors_' + dropdown_pin + '.getTempC(insideThermometer);\n  }\n'
 + '  else {\n    return sensors_' + dropdown_pin + '.getTempF(insideThermometer);\n  }\n'
 + '}\n';
 Blockly.Arduino.definitions_[funcName] = code;
 return ['ds18b20_' + dropdown_pin + '_getTemp(' + unit + ')', Blockly.Arduino.ORDER_ATOMIC];
}

//初始化TCS230颜色传感器
Blockly.Arduino.tcs230_init = function() {
    var value_tcs230_s0 = Blockly.Arduino.valueToCode(this, 'tcs230_s0', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s1 = Blockly.Arduino.valueToCode(this, 'tcs230_s1', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s2 = Blockly.Arduino.valueToCode(this, 'tcs230_s2', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_s3 = Blockly.Arduino.valueToCode(this, 'tcs230_s3', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_led = Blockly.Arduino.valueToCode(this, 'tcs230_led', Blockly.Arduino.ORDER_ATOMIC);
    var value_tcs230_out = Blockly.Arduino.valueToCode(this, 'tcs230_out', Blockly.Arduino.ORDER_ATOMIC);

  Blockly.Arduino.definitions_['var_declare_tcs230_pin'] = '#define tcs230_S0 '+value_tcs230_s0+''
                                                     +'\n#define tcs230_S1 '+value_tcs230_s1+''
                                                     +'\n#define tcs230_S2 '+value_tcs230_s2+''
                                                     +'\n#define tcs230_S3 '+value_tcs230_s3+''
                                                     +'\n#define tcs230_sensorOut '+value_tcs230_out+''
                                                     +'\n#define tcs230_LED '+value_tcs230_led+'';

  Blockly.Arduino.definitions_['function_tcs230_Getcolor'] = '//TCS230颜色传感器获取RGB值'
                                                          +'\nint tcs230_Getcolor(char data)'
                                                          +'\n{'
                                                          +'\n  int frequency = 0;'
                                                          +'\n  switch(data)'
                                                          +'\n  {'
                                                          +'\n    case \'R\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,LOW);'
                                                          +'\n      digitalWrite(tcs230_S3,LOW);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 25, 72, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    case \'G\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,HIGH);'
                                                          +'\n      digitalWrite(tcs230_S3,HIGH);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 30, 90, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    case \'B\':'
                                                          +'\n    {'
                                                          +'\n      digitalWrite(tcs230_S2,LOW);'
                                                          +'\n      digitalWrite(tcs230_S3,HIGH);'
                                                          +'\n      frequency = pulseIn(tcs230_sensorOut, LOW);'
                                                          +'\n      frequency = map(frequency, 25, 70, 255, 0);'
                                                          +'\n      break;'
                                                          +'\n    }'
                                                          +'\n    default:'
                                                          +'\n      return -1;'
                                                          +'\n  }'
                                                          +'\n  if (frequency < 0)'
                                                          +'\n    frequency = 0;'
                                                          +'\n  if (frequency > 255)'
                                                          +'\n    frequency = 255;'
                                                          +'\n  return frequency;'
                                                          +'\n}\n';

  Blockly.Arduino.setups_['setup_tcs230_pin'] = 'pinMode(tcs230_S0, OUTPUT);'
                                             +'\n  pinMode(tcs230_S1, OUTPUT);'
                                             +'\n  pinMode(tcs230_S2, OUTPUT);'
                                             +'\n  pinMode(tcs230_S3, OUTPUT);'
                                             +'\n  pinMode(tcs230_LED, OUTPUT);'
                                             +'\n  pinMode(tcs230_sensorOut, INPUT);'
                                             +'\n  digitalWrite(tcs230_S0,HIGH);'
                                             +'\n  digitalWrite(tcs230_S1,LOW);'
                                             +'\n  digitalWrite(tcs230_LED,HIGH);';
  var code = '';
  return code;
};

//TCS230颜色传感器 获取RGB值
Blockly.Arduino.tcs230_Get_RGB = function() {
  var dropdown_tcs230_color = this.getFieldValue('tcs230_color');
  var code = 'tcs230_Getcolor(\''+dropdown_tcs230_color+'\')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};