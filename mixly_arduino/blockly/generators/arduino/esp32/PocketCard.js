'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');

Blockly.Arduino.mixgo_button_is_pressed = function(){
 var btn = this.getFieldValue('PIN');
 Blockly.Arduino.setups_['setup_btn'+btn] = 'pinMode('+btn+',INPUT);';
 var code =  'digitalRead('+btn+')';
 return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_light= Blockly.Arduino.sensor_light;

Blockly.Arduino.sensor_mixgo_sound=Blockly.Arduino.sensor_sound; 

Blockly.Arduino.mixgo_touch_pin = function(){
  var touch_pin = this.getFieldValue('touch_pin');
  var code = 'touchRead('+touch_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.sensor_mixgo_light = function(){
  var direction = this.getFieldValue('direction');
  var code = 'analogRead('+ direction +')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Blocks.sensor_button_is_pressed=Blockly.Blocks.mixgo_button_is_pressed;
Blockly.Blocks.sensor_button_was_pressed=Blockly.Blocks.sensor_mixgo_button_was_pressed;
Blockly.Blocks.sensor_button_get_presses=Blockly.Blocks.sensor_mixgo_button_get_presses;
Blockly.Blocks.sensor_pin_pressed=Blockly.Blocks.sensor_mixgo_pin_pressed;
Blockly.Blocks.sensor_pin_near=Blockly.Blocks.sensor_mixgo_pin_near;
Blockly.Blocks.sensor_light=Blockly.Blocks.sensor_mixgo_light;
Blockly.Blocks.sensor_sound=Blockly.Blocks.sensor_mixgo_sound;

Blockly.Arduino.OneButton = function () {
 Blockly.Arduino.definitions_['include_OneButton'] = '#include <OneButton.h>';
 var dropdown_pin = this.getFieldValue('PIN');
 var dropdown_mode = this.getFieldValue('mode');
 Blockly.Arduino.definitions_['var_declare_button'+dropdown_pin] = 'OneButton button'+dropdown_pin+'('+dropdown_pin+ ',false);';
 Blockly.Arduino.setups_['setup_onebutton_' + dropdown_pin+dropdown_mode] = 'button'+dropdown_pin+'.' + dropdown_mode + '('+dropdown_mode+dropdown_pin+');';
 var code = 'button' +dropdown_pin+ '.tick();';
 var funcName = dropdown_mode+dropdown_pin;
 var branch = Blockly.Arduino.statementToCode(this, 'DO');
 var code2 = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
 Blockly.Arduino.definitions_[funcName] = code2;
 return code;
};
Blockly.Arduino.NTC_TEMP = function () {
  var PIN = 34;
  var NominalResistance= 10000;
  var betaCoefficient= 3380;
  var seriesResistor= 10000;
  Blockly.Arduino.definitions_['include_thermistor'] = '#include <thermistor.h>';
  Blockly.Arduino.definitions_['var_declare_thermistor'+PIN] = 'THERMISTOR thermistor'+PIN+'(' + PIN + ',' + NominalResistance+","+betaCoefficient+","+seriesResistor+");";
  var code = 'thermistor'+PIN+'.read()/10.0';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}
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
Blockly.Arduino.onboard_tone=function(){
  Blockly.Arduino.definitions_['include_ESP32Tone'] = '#include <ESP32Tone.h>';
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var channel = Blockly.Arduino.valueToCode(this, 'CHANNEL',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var DELAY_TIME = Blockly.Arduino.valueToCode(this, 'DELAY_TIME',Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = ""; 
  code = " tone(BUZZER, "+fre+", "+DELAY_TIME+", "+channel+");\n";
  return code;
};

//传感器_重力感应块_获取9轴数据
Blockly.Arduino.mixgo_MPU9250 = function() {
  var dropdown_type = this.getFieldValue('MixGo_MPU9250_GETAB');
  Blockly.Arduino.definitions_['include_MPU9250_asukiaaa'] = '#include <MPU9250_asukiaaa.h>';
  Blockly.Arduino.definitions_['define_CALIB_SEC']='#define CALIB_SEC 20';
  Blockly.Arduino.definitions_['var_declare_MPU9250_asukiaaa'] = 'MPU9250_asukiaaa myMPU9250;\n float aX, aY, aZ, aSqrt, gX, gY, gZ, mDirection, mX, mY, mZ;';
  Blockly.Arduino.setups_['setup_Wire_begin'] = 'Wire.begin(SDA, SCL);\n';
  Blockly.Arduino.setups_['setup_myMPU9250_setWire'] = 'myMPU9250.setWire(&Wire);';
  Blockly.Arduino.setups_['setup_myMPU9250_beginAccel'] = 'myMPU9250.beginAccel();';
  Blockly.Arduino.setups_['setup_myMPU9250_beginMag'] = 'myMPU9250.beginMag();';
  Blockly.Arduino.setups_['setup_myMPU9250_beginGyro'] = 'myMPU9250.beginGyro();';
  var func_setMagMinMaxAndSetOffset = 'void setMagMinMaxAndSetOffset(MPU9250_asukiaaa* sensor, int seconds) {\n'
  +'unsigned long calibStartAt = millis();\n'
  +'float magX, magXMin, magXMax, magY, magYMin, magYMax, magZ, magZMin, magZMax;\n'
  +'sensor->magUpdate();\n'
  +'magXMin = magXMax = sensor->magX();\n'
  +'magYMin = magYMax = sensor->magY();\n'
  +'magZMin = magZMax = sensor->magZ();\n'
  +'while(millis() - calibStartAt < (unsigned long) seconds * 1000) {\n'
  +' delay(100);\n'
  +' sensor->magUpdate();\n'
  +' magX = sensor->magX();\n'
  +' magY = sensor->magY();\n'
  +' magZ = sensor->magZ();\n'
  +' if (magX > magXMax) magXMax = magX;\n'
  +' if (magY > magYMax) magYMax = magY;\n'
  +' if (magZ > magZMax) magZMax = magZ;\n'
  +' if (magX < magXMin) magXMin = magX;\n'
  +' if (magY < magYMin) magYMin = magY;\n'
  +' if (magZ < magZMin) magZMin = magZ;\n'
  +'}\n'
  +'sensor->magXOffset = - (magXMax + magXMin) / 2;\n'
  +'sensor->magYOffset = - (magYMax + magYMin) / 2;\n'
  +'sensor->magZOffset = - (magZMax + magZMin) / 2;\n'
  +'}'
  var code = '';
  if (dropdown_type == "a") code += 'myMPU9250.accelX()';
  if (dropdown_type == "b") code += 'myMPU9250.accelY()';
  if (dropdown_type == "c") code += 'myMPU9250.accelZ()';
  if (dropdown_type == "d") code += 'myMPU9250.gyroX()';
  if (dropdown_type == "e") code += 'myMPU9250.gyroY()';
  if (dropdown_type == "f") code += 'myMPU9250.gyroZ()';
  if (dropdown_type == "g") code += 'myMPU9250.magX()';
  if (dropdown_type == "h") code += 'myMPU9250.magY()';
  if (dropdown_type == "i") code += 'myMPU9250.magZ()';
  if (dropdown_type == "j"||dropdown_type == "h"||dropdown_type == "g"||dropdown_type == "i") 
  {
    Blockly.Arduino.setups_['setup_magnetometer']=  'Serial.println("Start scanning values of magnetometer to get offset values.Rotate your device for " + String(CALIB_SEC) + " seconds.");';
    Blockly.Arduino.setups_['setup_setMagMinMaxAndSetOffset'] = 'setMagMinMaxAndSetOffset(&myMPU9250, CALIB_SEC);';
    Blockly.Arduino.setups_['setup_magnetometerFinished']= ' Serial.println("Finished setting offset values.");';
    Blockly.Arduino.definitions_[func_setMagMinMaxAndSetOffset] = func_setMagMinMaxAndSetOffset;
    code += 'myMPU9250.magHorizDirection()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//传感器-MPU9250-更新数据
Blockly.Arduino.MPU9250_update = function() {
 var code = 'myMPU9250.accelUpdate();\nmyMPU9250.gyroUpdate();\nmyMPU9250.magUpdate();\n';
 return code;
};

Blockly.Arduino.Pocket_rgb=function(){
  var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
  COLOR=COLOR.replace(/#/g,"0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
  var code = 'rgb_display_12.setPixelColor(0,'+COLOR+');\n';
  return code;
};

Blockly.Arduino.Pocket_rgb2=function(){
 var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR1');
 COLOR=COLOR.replace(/#/g,"0x");
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
 Blockly.Arduino.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
 var code = 'rgb_display_12.setPixelColor(0,'+COLOR+');\n';
 return code;
};

Blockly.Arduino.Pocket_rgb_Brightness=function(){
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_12'] = 'rgb_display_12.begin();';
  var code='rgb_display_12.setBrightness('+Brightness+');\n';
  return code;
};

Blockly.Arduino.Pocket_rgb_show = function () {
  var code = 'rgb_display_12.show();\ndelay(1);\n';
  return code;
};
Blockly.Arduino.pocket_RGB_color_HSV = function () {
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display12'] = 'Adafruit_NeoPixel rgb_display_12= Adafruit_NeoPixel(1,12,NEO_GRB + NEO_KHZ800);';
  var dropdown_rgbpin = 12;
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var H = Blockly.Arduino.valueToCode(this, 'H', Blockly.Arduino.ORDER_ATOMIC);
  var S= Blockly.Arduino.valueToCode(this, 'S', Blockly.Arduino.ORDER_ATOMIC);
  var V = Blockly.Arduino.valueToCode(this, 'V', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(' +'0, ' + 'rgb_display_' + dropdown_rgbpin + '.ColorHSV(' +H+','+S+','+V+ '));\n';
  return code;
};