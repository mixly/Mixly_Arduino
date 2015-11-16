'use strict';

goog.provide('Blockly.Arduino.makeblock');

goog.require('Blockly.Arduino');

Blockly.Arduino.mb_servo_move = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_MePort'+dropdown_pin] = 'MePort port_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin+dropdown_pin2] = 'Servo servo_'+dropdown_pin+'_'+dropdown_pin2+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin+dropdown_pin2] = 'servo_'+dropdown_pin+'_'+dropdown_pin2+'.attach(port_'+dropdown_pin+'.pin1());\n';
  var code = 'servo_'+dropdown_pin+'_'+dropdown_pin2+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.mb_bluetooth_readString = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth  myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.readString()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_bluetooth_available = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_bluetooth'+dropdown_pin] = 'MeBluetooth  myBluetooth_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_bluetooth'+dropdown_pin] = 'myBluetooth_'+dropdown_pin+'.begin(9600);';
  var code = 'myBluetooth_'+dropdown_pin+'.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_display = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var num = Blockly.Arduino.valueToCode(this, 'num',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_display'+dropdown_pin] = 'Me7SegmentDisplay  dis_'+dropdown_pin+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_makeblock_display_init'+dropdown_pin] = 'dis_'+dropdown_pin+'.init();';
  Blockly.Arduino.setups_['setup_makeblock_display_set'+dropdown_pin] = 'dis_'+dropdown_pin+'.set(BRIGHT_TYPICAL);';
  var code = 'dis_'+dropdown_pin+'.display((float)('+num+'));\n';
  return code;
};

Blockly.Arduino.mb_motor = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_motor'+dropdown_pin] = 'MeDCMotor  myMotor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myMotor_'+dropdown_pin+'.run('+speed+');\n';
  return code;
};

Blockly.Arduino.mb_sound = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_sound'+dropdown_pin] = 'MeSoundSensor mySound_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'mySound_'+dropdown_pin+'.strength()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_temperature = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_temperature'+dropdown_pin+dropdown_pin2] = 'MeTemperature myTemperature_'+dropdown_pin+'_'+dropdown_pin2+'('+dropdown_pin+');';
  Blockly.Arduino.setups_['setup_mb_temperature_'+dropdown_pin+dropdown_pin2] = 'myTemperature_'+dropdown_pin+'_'+dropdown_pin2+'.reset('+dropdown_pin+','+dropdown_pin2+');';
  var code = 'myTemperature_'+dropdown_pin+'_'+dropdown_pin2+'.temperature()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_joystick = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_joystick'+dropdown_pin] = 'MeJoystick  myJoystick_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myJoystick_'+dropdown_pin+'.read'+dropdown_stat+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_potentiometer = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_potentiometer'+dropdown_pin] = 'MePotentiometer  myPotentiometer_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myPotentiometer_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_pyroelectric_infrared = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_infrared'+dropdown_pin] = 'MePIRMotionSensor  myPIRMotionSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myPIRMotionSensor_'+dropdown_pin+'.isPeopleDetected()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_chaoshengbo = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_pin2 = this.getTitleValue('PIN2');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_chaoshengbo'+dropdown_pin] = 'MeUltrasonicSensor  myUltraSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myUltraSensor_'+dropdown_pin+'.distance'+dropdown_pin2+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_light_grayscale = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor  myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.mb_light_grayscale_led = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_makeblock'] = '#include <Makeblock.h>';
  Blockly.Arduino.definitions_['var_makeblock_light_grayscale'+dropdown_pin] = 'MeLightSensor  myLightSensor_'+dropdown_pin+'('+dropdown_pin+');';
  var code = 'myLightSensor_'+dropdown_pin+'.'+dropdown_stat+'();\n';
  return code;
};
