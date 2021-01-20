'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');

Blockly.Arduino.display_rgb_show = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n'
 // +'rgb_display_' + dropdown_rgbpin + '.show();\n'
  //+"delay(1);"
  return code;
};

Blockly.Arduino.servo_move = function() {
 var dropdown_pin = this.getFieldValue('PIN');
 var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
 var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0' 
 Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
 Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
 Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+',500,2500);';
 var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
 return code;
};

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['include_Servo'] = '#include <ESP32_Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone=function(){
  Blockly.Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var DELAY_TIME = Blockly.Arduino.valueToCode(this, 'DELAY_TIME',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = " tone("+dropdown_pin+", "+fre+", "+DELAY_TIME+", "+channel+");\n";
  return code;
};

Blockly.Arduino.controls_notone=function(){
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = " noTone("+dropdown_pin+", "+channel+");\n";
  return code;
};
Blockly.Arduino.onboard_tone=function(){
  Blockly.Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var DELAY_TIME = Blockly.Arduino.valueToCode(this, 'DELAY_TIME',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = " tone(BUZZER, "+fre+", "+DELAY_TIME+", "+channel+");\n";
  return code;
};

Blockly.Arduino.onboard_notone=function(){
 var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
 var code = ""; 
 code = " noTone(BUZZER, "+channel+");\n";
 return code;
};
//执行器-电机转动
Blockly.Arduino.Mixly_motor = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + SPEED_PIN + ', '+DIR_PIN+', ' + speed + ');\n';
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>';
  Blockly.Arduino.definitions_['include_analogWrite'] = '#include <analogWrite.h>';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName= 'setMotor';
  var code2 ='void '+funcName+'(int speedpin,int dirpin, int speed)\n '
  +'{\n'
  +'  if (speed == 0)\n'
  +'  {\n'
  +'    digitalWrite(dirpin, LOW);\n'
  +'    analogWrite(speedpin, 0);\n'
  +'  } \n'
  +'  else if (speed > 0)\n'
  +'  {\n'
  +'    digitalWrite(dirpin, LOW);\n'
  +'    analogWrite(speedpin, speed);\n'
  +'  }\n'
  +'  else\n'
  +'  {\n'
  +'    if(speed < -255)\n'
  +'      speed = -255;\n'
  +'    digitalWrite(dirpin, HIGH);\n'
  +'    analogWrite(speedpin, 255 + speed);\n'
  +'  }\n'
  +'}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};

Blockly.Arduino.HR8833_Motor_Setup = function() {
  var motor_id = Blockly.Arduino.valueToCode(this, 'MOTOR_ID', Blockly.Arduino.ORDER_ATOMIC);
  var pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['HR8833_Motor_Setup_fun'] ='void HR8833_Motor_Setup(int motorID,int pin1,int pin2){//电机初始化 ID=1~4 定义四组电机\n'
  +'  ledcSetup(motorID*2-2, 5000, 8);\n'
  +'  ledcAttachPin(pin1, motorID*2-2);\n'
  +'  ledcSetup(motorID*2-1, 5000, 8);\n'
  +'  ledcAttachPin(pin2, motorID*2-1);\n'
  +'}';
  Blockly.Arduino.setups_['motorID_'+motor_id]='HR8833_Motor_Setup('+motor_id+','+pin1+','+pin2+');';
  var code ='';
  return code;
};

Blockly.Arduino.HR8833_Motor_Speed = function() {
  var motor_id = Blockly.Arduino.valueToCode(this, 'MOTOR_ID', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['HR8833_Motor_Speed_fun'] ='void HR8833_Motor_Speed(int motorID,int speed){//电机速度设置 ID=1~4,speed=-255~255\n'
  +'  if (speed == 0){  \n'
  +'    ledcWrite(motorID*2-2, 0);\n'
  +'    ledcWrite(motorID*2-1, 0);\n'
  +'  }\n'
  +'  else if (speed > 0){\n'
  +'    ledcWrite(motorID*2-2, speed);\n'
  +'    ledcWrite(motorID*2-1, 0);\n'
  +'  }\n'
  +'  else{\n'
  +'    ledcWrite(motorID*2-2, 0);\n'
  +'    ledcWrite(motorID*2-1, -speed);\n'
  +'  }\n'
  +'}\n';
  var code ='HR8833_Motor_Speed('+motor_id+','+speed+');\n';
  return code;
};

Blockly.Arduino.handbit_motor_move = function() {
  var dropdown_type = this.getFieldValue('type');
  var value_speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Wire'] = '#include <Wire.h>';
  Blockly.Arduino.setups_['setup_i2c_23_22'] = 'Wire.begin(23, 22);';
  Blockly.Arduino.definitions_['HandBit_Motor_Speed_fun'] ='void HandBit_Motor_Speed(int pin, int speed){//电机速度设置 pin=1~2,speed=--100~100\n'
  +'  Wire.beginTransmission(0x10);\n'
  +'  Wire.write(pin);\n'
  +'  Wire.write(speed);\n'
  +'  Wire.endTransmission();\n'
  +'}';
  var code = 'HandBit_Motor_Speed('+dropdown_type+', '+value_speed+');\n';
  return code;
};