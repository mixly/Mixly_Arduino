'use strict';

goog.provide('Blockly.Arduino.dfrobot');

goog.require('Blockly.Arduino');

Blockly.Arduino.df_romeo_motor=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var speed = Blockly.Arduino.valueToCode(this, 'speed',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code='setRomeoMotor('+dropdown_pin+', '+speed+');\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setRomeoMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
	+ '  int speedPin, directionPin;\n'
	+ '  if (motorId == 1){\n'
	+ '  	speedPin = 5;\n'
	+ '  	directionPin = 4;\n'
	+ '  } else {\n'
	+ '  	if (motorId == 2){\n'
	+ '  		speedPin = 6;\n'
	+ '  		directionPin = 7;\n'
	+ '  	} else {\n'
	+ '  		return;\n'
	+ '  	}\n'
	+ '  }\n'
	+ '  if (speed == 0){\n'
	+ '  	digitalWrite(speedPin, LOW);\n'
	+ '  }\n'
	+ '  if (speed > 0){\n'
	+ '  	digitalWrite(directionPin, HIGH);\n'
	+ '  	analogWrite(speedPin, speed);\n'
	+ '  } else {\n'
	+ '  	digitalWrite(directionPin, LOW);\n'
	+ '  	analogWrite(speedPin, -speed);\n'
	+ '  }\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

Blockly.Arduino.df_romeo_motor_stop=function(){
   var dropdown_pin = this.getTitleValue('PIN');
   var code='setRomeoMotor('+dropdown_pin+', 0);\n';
   Blockly.Arduino.setups_['setup_output_4'] = 'pinMode(4, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_6'] = 'pinMode(6, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_7'] = 'pinMode(7, OUTPUT);';
   Blockly.Arduino.setups_['setup_output_w4'] = 'digitalWrite(4, LOW);';
   Blockly.Arduino.setups_['setup_output_w5'] = 'digitalWrite(5, LOW);';
   Blockly.Arduino.setups_['setup_output_w6'] = 'digitalWrite(6, LOW);';
   Blockly.Arduino.setups_['setup_output_w7'] = 'digitalWrite(7, LOW);';
   var funcName='setRomeoMotor';
   var code2='void '+funcName+'(int motorId, int speed) {\n' 
	+ '  int speedPin, directionPin;\n'
	+ '  if (motorId == 1){\n'
	+ '  	speedPin = 5;\n'
	+ '  	directionPin = 4;\n'
	+ '  } else {\n'
	+ '  	if (motorId == 2){\n'
	+ '  		speedPin = 6;\n'
	+ '  		directionPin = 7;\n'
	+ '  	} else {\n'
	+ '  		return;\n'
	+ '  	}\n'
	+ '  }\n'
	+ '  if (speed == 0){\n'
	+ '  	digitalWrite(speedPin, LOW);\n'
	+ '  }\n'
	+ '  if (speed > 0){\n'
	+ '  	digitalWrite(directionPin, HIGH);\n'
	+ '  	analogWrite(speedPin, speed);\n'
	+ '  } else {\n'
	+ '  	digitalWrite(directionPin, LOW);\n'
	+ '  	analogWrite(speedPin, -speed);\n'
	+ '  }\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
   return code;
};

Blockly.Arduino.df_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.df_buzzer = Blockly.Arduino.df_led;

Blockly.Arduino.df_buzzer2=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code="tone("+dropdown_pin+","+fre+");\n";
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   return code;
};

Blockly.Arduino.df_buzzer3=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code="tone("+dropdown_pin+","+fre+","+dur+");\n";
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   return code;
};

Blockly.Arduino.df_btn = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
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
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
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

Blockly.Arduino.df_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.setCursor(0, 0);\n'
  code+='df_lcd.print('+str1+');\n';
  code+='df_lcd.setCursor(0, 1);\n';
  code+='df_lcd.print('+str2+');\n';
  return code;
};

Blockly.Arduino.df_lcd_power = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_df_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_df_lcd'] = 'LiquidCrystal_I2C df_lcd(0x20,16,2);';
  Blockly.Arduino.setups_['setup_df_lcd1'] = 'df_lcd.init();';
  Blockly.Arduino.setups_['setup_df_lcd2'] = 'df_lcd.backlight();';
  var code = 'df_lcd.'+dropdown_stat+'();\n'
  return code;
};