'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');

Blockly.Arduino.servo_move = function() {
 var dropdown_pin = this.getFieldValue('PIN');
 var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
 var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
 Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
 Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
 Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
 var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
 return code;
};

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone=function(){
 var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
 var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
  Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
 var code = ""; 
 if(window.isNaN(dropdown_pin)){
  code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
}else{
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
}
code += "tone("+dropdown_pin+","+fre+");\n";
return code;
};

Blockly.Arduino.controls_notone=function(){
 var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
 var code='';
 if(window.isNaN(dropdown_pin)){
   code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
 }else{
   Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
 }
 code += "noTone("+dropdown_pin+");\n";
 return code;
};
//执行器-蜂鸣器
Blockly.Arduino.controls_tone_noTimer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <NewTone.h>';
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewTone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
  return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.controls_notone_noTimer = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewNoTone(" + dropdown_pin + ");\n";
  return code;
};

Blockly.Arduino.group_stepper_setup = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_declare_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_setup2 = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_declare_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+','+dropdown_pin3+','+dropdown_pin4+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_move = function () {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var step = Blockly.Arduino.valueToCode(this, 'step', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  return varName + '.step(' + step + ');\n';
};

Blockly.Arduino.display_rgb_show=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var code ='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb_init=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '= Adafruit_NeoPixel(' + value_ledcount + ','+dropdown_rgbpin+',NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  Blockly.Arduino.setups_['setup_rgb_display_setBrightness' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setBrightness('+Brightness+');';
  return '';
};
Blockly.Arduino.display_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+'rgb_display_' + dropdown_rgbpin+'.Color('+value_rvalue+','+value_gvalue+','+value_bvalue+'));\n';
  return code;
};

Blockly.Arduino.display_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  return code;
};

Blockly.Arduino.display_rgb_rainbow1=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
  code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
  code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {\n';
  code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n {\n';
  code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
  code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var code = 'rainbow('+ wait_time+');\n'
  return code;
};

Blockly.Arduino.display_rgb_rainbow2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT',Blockly.Arduino.ORDER_ATOMIC);
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3  = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {               \n';
  code3 += 'for(i=0; i<rgb_display_'+dropdown_rgbpin+'.numPixels(); i++)\n{\n';
  code3 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel((i+j) & 255));\n}\n';                    
  code3 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var funcName4 = 'rainbowCycle';
  var code4  = 'void rainbowCycle(uint8_t wait) \n{\nuint16_t i, j;\n';
  code4 += 'for(j=0; j<256*5; j++) {\n';
  code4 += 'for(i=0; i< rgb_display_'+dropdown_rgbpin+'.numPixels(); i++) \n{\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.setPixelColor(i, Wheel(((i * 256 / rgb_display_'+dropdown_rgbpin+'.numPixels()) + j) & 255));}\n';
  code4 += 'rgb_display_'+dropdown_rgbpin+'.show();\n';
  code4 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName4] = code4;
  var code = 'rainbowCycle('+ wait_time+');\n'
  return code;
};
Blockly.Arduino.display_rgb_rainbow3=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color',Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2  = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_'+dropdown_rgbpin+'.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_'+dropdown_rgbpin+'.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_'+dropdown_rgbpin+'.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if(type=="normal")
    var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel('+rainbow_color+' & 255));\n}\n';
  else 
    var code3  = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + '+rainbow_color+') & 255));\n}\n';
  return code3;
};
//执行器-电机转动
Blockly.Arduino.Mixly_motor = function() {
  var SPEED_PIN = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DIR_PIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + SPEED_PIN + ', '+DIR_PIN+',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S'] = 'pinMode('+SPEED_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D'] = 'pinMode('+DIR_PIN+', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_S_W'] = 'digitalWrite('+SPEED_PIN+', LOW);';
  Blockly.Arduino.setups_['setup_output_'+SPEED_PIN+DIR_PIN+'_D_W'] = 'digitalWrite('+DIR_PIN+', LOW);';
  var funcName= 'setMotor';
  var code2 =' void '+funcName+'(int speedpin,int dirpin, int speed)\n {\nif (speed == 0)\n{\n   digitalWrite(speedpin, LOW);\n  } \n else if (speed > 0)\n{\n   digitalWrite(dirpin, LOW);\nanalogWrite(speedpin, speed);\n  } \nelse \n{\n digitalWrite(dirpin, HIGH);\n   analogWrite(speedpin, speed);  \n}\n}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};