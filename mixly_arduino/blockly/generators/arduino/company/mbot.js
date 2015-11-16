'use strict';

goog.provide('Blockly.Arduino.mbot');

goog.require('Blockly.Arduino');

Blockly.Arduino.mbot_move = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeDCMotor'] = '#include "MeDCMotor.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	Blockly.Arduino.definitions_['var_MeDCMotor_motor'] = 'MeDCMotor motor(0);';//
	var direction = this.getTitleValue('direction');
	var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code="motor.move("+direction+","+speed+");\n";
	return code;
}

Blockly.Arduino.mbot_motor = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeDCMotor'] = '#include "MeDCMotor.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var port = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MeDCMotor_motor_'+port] = 'MeDCMotor motor_'+port+'('+port+');';//
	var speed=Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='motor_'+port+'.run(('+port+')==M1?-('+speed+'):('+speed+'));\n';
	return code;
}

Blockly.Arduino.mbot_servo_move = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var port = this.getTitleValue('PIN');
	var slot = this.getTitleValue('PIN2');
	Blockly.Arduino.definitions_['var_Servo_servo_'+port+'_'+slot] = 'Servo servo_'+port+'_'+slot+';';//
	Blockly.Arduino.definitions_['var_MePort_port_'+port] = 'MePort port_'+port+'('+port+');';//
	var DEGREE=Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='servo_'+port+'_'+slot+'.attach(port_'+port+'.pin'+slot+'());\nservo_'+port+'_'+slot+'.write('+DEGREE+');\n';
	return code;
}

Blockly.Arduino.mbot_led = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeRGBLed'] = '#include "MeRGBLed.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin1 = this.getTitleValue('PIN');
	var pin2 = this.getTitleValue('PIN2');
	Blockly.Arduino.definitions_['var_MeRGBLed_rgbled_'+pin1] = 'MeRGBLed rgbled_'+pin1+'('+pin1+');';//
	var R=Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var G=Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var B=Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='rgbled_'+pin1+'.setNumber('+pin1+'==7?2:16);\nrgbled_'+pin1+'.setColor('+pin2+','+R+','+G+','+B+');\nrgbled_'+pin1+'.show();\n';
	return code;
}

Blockly.Arduino.mbot_tone = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeBuzzer'] = '#include "MeBuzzer.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	Blockly.Arduino.definitions_['var_MeBuzzer_buzzer'] = 'MeBuzzer buzzer;';//
	var fre=Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='buzzer.tone('+fre+');\n';
	return code;
}

Blockly.Arduino.mbot_notone = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeBuzzer'] = '#include "MeBuzzer.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	Blockly.Arduino.definitions_['var_MeBuzzer_buzzer'] = 'MeBuzzer buzzer;';//
	var code='buzzer.noTone();\n';
	return code;
}

Blockly.Arduino.mbot_showface_text = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeLEDMatrix'] = '#include "MeLEDMatrix.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin = this.getTitleValue('PIN');
	Blockly.Arduino.definitions_['var_MeLEDMatrix_ledMtx_'+pin] = 'MeLEDMatrix ledMtx_'+pin+'('+pin+');';//
	var x=Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var y=Blockly.Arduino.valueToCode(this, 'y', Blockly.Arduino.ORDER_ATOMIC) || '0';
	//var text = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
	//text=text.replace(/String/,"");
	var text=Blockly.Arduino.quote_(this.getFieldValue('text'));
	var code='ledMtx_'+pin+'.clearScreen();\nledMtx_'+pin+'.setColorIndex(1);\nledMtx_'+pin+'.setBrightness(6);\nledMtx_'+pin+'.drawStr('+x+',7-'+y+','+text+');\n';
	return code;
}
Blockly.Arduino.mbot_showface_time = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeLEDMatrix'] = '#include "MeLEDMatrix.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin = this.getTitleValue('PIN');
	Blockly.Arduino.definitions_['var_MeLEDMatrix_ledMtx_'+pin] = 'MeLEDMatrix ledMtx_'+pin+'('+pin+');';//
	var h=Blockly.Arduino.valueToCode(this, 'h', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var m=Blockly.Arduino.valueToCode(this, 'm', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='ledMtx_'+pin+'.clearScreen();\nledMtx_'+pin+'.setColorIndex(1);\nledMtx_'+pin+'.setBrightness(6);\nledMtx_'+pin+'.showClock('+h+','+m+',strcmp(":",":")==0);\n';
	return code;
}
Blockly.Arduino.mbot_display = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_Me7SegmentDisplay'] = '#include <Me7SegmentDisplay.h>';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin = this.getTitleValue('PIN');
	Blockly.Arduino.definitions_['var_Me7SegmentDisplay_seg7_'+pin] = 'Me7SegmentDisplay seg7_'+pin+'('+pin+');';//
	var value=Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code='seg7_'+pin+'.display((double)'+value+');\n';
	return code;
}
Blockly.Arduino.mbot_set_light_senser_led = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin = this.getTitleValue('PIN');
	Blockly.Arduino.definitions_['var_MePort_lightsensor_'+pin] = 'MePort lightsensor_'+pin+'('+pin+');';//
	var stat=this.getTitleValue('STAT');
	var code='lightsensor_'+pin+'.dWrite1('+stat+');\n';
	return code;
}

Blockly.Arduino.mbot_set_camera = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var pin = this.getTitleValue('PIN');
	Blockly.Arduino.definitions_['var_MePort_shutter_'+pin] = 'MePort shutter_'+pin+'('+pin+');';//
	var stat = this.getTitleValue('STAT');
	var code='shutter_'+pin+'.dWrite1('+stat+');\n';
	return code;
}

Blockly.Arduino.mbot_light_sensor = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MePort_lightsensor_'+PORT] = 'MePort lightsensor_'+PORT+'('+PORT+');';//
	var code='lightsensor_'+PORT+'.aRead2()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_button = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var STAT = this.getTitleValue('STAT');
	var code='('+STAT+'^(analogRead(A7)>10?0:1))';
	Blockly.Arduino.setups_['setup_input_A7'] = 'pinMode(A7,INPUT);';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_chaoshengbo = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeUltrasonic'] = '#include "MeUltrasonic.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MeUltrasonic_ultrasonic_'+PORT] = 'MeUltrasonic ultrasonic_'+PORT+'('+PORT+');';//
	var code="ultrasonic_"+PORT+".distanceCm()";
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_line_follower = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MePort_linefollower_'+PORT] = 'MePort linefollower_'+PORT+'('+PORT+');';//
	var code='linefollower_'+PORT+'.dRead1()*2+linefollower_'+PORT+'.dRead2()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_joystick = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	var axis = this.getTitleValue('axis');
	Blockly.Arduino.definitions_['var_MePort_joystick_'+PORT] = 'MePort joystick_'+PORT+'('+PORT+');';//
	var code='joystick_'+PORT+'.aRead'+axis+'()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_potentiometer = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MePort_potentiometer_'+PORT] = 'MePort potentiometer_'+PORT+'('+PORT+');';//
	var code='potentiometer_'+PORT+'.aRead2()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_sound_sensor = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MePort_soundsensor_'+PORT] = 'MePort soundsensor_'+PORT+'('+PORT+');';//
	var code='soundsensor_'+PORT+'.aRead2()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_limit_switch = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	var SLOT = this.getTitleValue('SLOT');
	Blockly.Arduino.definitions_['var_MePort_sw_'+PORT+'_'+SLOT] = 'MePort sw_'+PORT+'_'+SLOT+'('+PORT+');';//
	var code='sw_'+PORT+'_'+SLOT+'.dpRead'+SLOT+'()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_temperature = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeTemperature'] = '#include "MeTemperature.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	var SLOT = this.getTitleValue('SLOT');
	Blockly.Arduino.definitions_['var_MeTemperature_temperature_'+PORT+'_'+SLOT] = 'MeTemperature temperature_'+PORT+'_'+SLOT+'('+PORT+','+SLOT+');';//
	var code='temperature_'+PORT+'_'+SLOT+'.temperature()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_pir_motion_sensor = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var PORT = this.getTitleValue('PORT');
	Blockly.Arduino.definitions_['var_MePort_pir_'+PORT] = 'MePort pir_'+PORT+'('+PORT+');';//
	var code='pir_'+PORT+'.aRead2()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_ir_remote = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeIR'] = '#include "MeIR.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	var btn = this.getTitleValue('btn');
	Blockly.Arduino.definitions_['var_MeIR_ir'] = 'MeIR ir;';//
	Blockly.Arduino.setups_['setup_ir_begin'] = 'ir.begin();';
	//var code='ir.keyPressed('+btn+');\nir.loop()';
	var code='ir.keyPressed('+btn+')';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.mbot_send_message = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeIR'] = '#include "MeIR.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	Blockly.Arduino.definitions_['var_MeIR_ir'] = 'MeIR ir;';//
	Blockly.Arduino.setups_['setup_ir_begin'] = 'ir.begin();';
	var text = Blockly.Arduino.valueToCode(this, 'text', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
	var code='ir.sendString('+text+');\n';
	return code;
}


Blockly.Arduino.mbot_message_received = function() {
	Blockly.Arduino.definitions_['define_arduino'] = '#include <Arduino.h>';
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
	Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
	Blockly.Arduino.definitions_['define_mBot'] = '#include "mBot.h"';
	Blockly.Arduino.definitions_['define_MePort'] = '#include "MePort.h"';
	Blockly.Arduino.definitions_['var_MeBoard_myBoard'] = 'MeBoard myBoard(mBot);';
	Blockly.Arduino.definitions_['define_MeIR'] = '#include "MeIR.h"';//
	Blockly.Arduino.definitions_['var_double_angle_rad'] = 'double angle_rad = PI/180.0;';
	Blockly.Arduino.definitions_['var_double_angle_deg'] = 'double angle_deg = 180.0/PI;';
	Blockly.Arduino.definitions_['var_MeIR_ir'] = 'MeIR ir;';//
	Blockly.Arduino.setups_['setup_ir_begin'] = 'ir.begin();';
	var code='ir.getString()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}