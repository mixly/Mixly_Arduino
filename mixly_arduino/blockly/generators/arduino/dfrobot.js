'use strict';

goog.provide('Blockly.Arduino.dfrobot');

goog.require('Blockly.Arduino');

Blockly.Arduino.df_led = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.df_buzzer = Blockly.Arduino.df_led;

Blockly.Arduino.df_buzzer2=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code="tone("+dropdown_pin+","+fre+");\n";
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   return code;
};

Blockly.Arduino.df_buzzer3=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code="tone("+dropdown_pin+","+fre+","+dur+");\n";
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   return code;
};

Blockly.Arduino.df_btn = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.df_vibration = Blockly.Arduino.df_btn;
Blockly.Arduino.df_tilt = Blockly.Arduino.df_btn;
Blockly.Arduino.df_touch = Blockly.Arduino.df_btn;
Blockly.Arduino.df_magnetic = Blockly.Arduino.df_btn;
Blockly.Arduino.df_pyroelectric_infrared = Blockly.Arduino.df_btn;
Blockly.Arduino.df_joystick_d = Blockly.Arduino.df_btn;

Blockly.Arduino.df_potentiometer = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  //Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.df_joystick_a = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_rotation = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_voltage = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_piezo_disk_virbration = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_sound = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_light = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_grayscale = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_flame = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_temperature = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_accelerometer = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_moisture = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_water = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_co = Blockly.Arduino.df_potentiometer;
Blockly.Arduino.df_Sharp_GP2Y0A21 = Blockly.Arduino.df_potentiometer;

Blockly.Arduino.df_relay = Blockly.Arduino.df_led;