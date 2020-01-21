'use strict';

goog.provide('Blockly.Arduino.sensor');
goog.require('Blockly.Arduino');


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

Blockly.Arduino.DHT = function () {
  var sensor_type = this.getFieldValue('TYPE');
  var dropdown_pin = this.getFieldValue('PIN');
  var what = this.getFieldValue('WHAT');
  Blockly.Arduino.definitions_['include_DHT'] = '#include <DHT.h>';
  //Blockly.Arduino.definitions_['define_dht_pin' + dropdown_pin] = '#define DHTPIN'+dropdown_pin +' ' + dropdown_pin ;
  //Blockly.Arduino.definitions_['define_dht_type' + dropdown_pin] = '#define DHTTYPE'+dropdown_pin +' '+ sensor_type ;
  Blockly.Arduino.definitions_['var_declare_dht' + dropdown_pin] = 'DHT dht'+dropdown_pin+'('+dropdown_pin+', '+sensor_type+');'
  Blockly.Arduino.setups_['DHT_SETUP'+dropdown_pin] = ' dht'+dropdown_pin+'.begin();';
  var code;
  if(what=="temperature")
    code= 'dht'+dropdown_pin+'.readTemperature()'
  else
    code= 'dht'+dropdown_pin+'.readHumidity()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
//ESP32片内霍尔传感器值
Blockly.Arduino.ESP32_hallRead = function() {
    var code = 'hallRead()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//ESP32片内温度传感器值
Blockly.Arduino.ESP32_temprature = function() {
    Blockly.Arduino.definitions_['wendu'] ='extern "C"\n{\nuint8_t temprature_sens_read();\n}\nuint8_t temprature_sens_read();\n';
    var code = '(temprature_sens_read() - 32) / 1.8';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_light= function(){
  return ['analogRead(LIGHT)', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_sound= function(){
  return ['analogRead(SOUND)', Blockly.Arduino.ORDER_ATOMIC];
};

