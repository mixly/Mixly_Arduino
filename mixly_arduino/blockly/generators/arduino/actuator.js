'use strict';

goog.provide('Blockly.Arduino.actuator');

goog.require('Blockly.Arduino');

Blockly.Arduino.servo_move = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
  var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n' + 'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.servo_writeMicroseconds = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
  var code = 'servo_' + dropdown_pin + '.writeMicroseconds(' + value_degree + ');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function () {
  var dropdown_pin = this.getFieldValue('PIN');
  Blockly.Arduino.definitions_['include_Servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_declare_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';';
  Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');';
  var code = 'servo_' + dropdown_pin + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.tone_notes = function () {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = "";
  if (window.isNaN(dropdown_pin)) {
    code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
  } else {
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  }
  code += "tone(" + dropdown_pin + "," + fre + ");\n";
  return code;
};

Blockly.Arduino.controls_notone = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (window.isNaN(dropdown_pin)) {
    code = code + 'pinMode(' + dropdown_pin + ', OUTPUT);\n';
  } else {
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  }
  code += "noTone(" + dropdown_pin + ");\n";
  return code;
};
//执行器-蜂鸣器
Blockly.Arduino.controls_tone_noTimer = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var dur = Blockly.Arduino.valueToCode(this, 'DURATION', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.definitions_['include_NewTone'] = '#include <NewTone.h>';
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewTone(" + dropdown_pin + "," + fre + "," + dur + ");\n";
  return code;
};

//执行器-蜂鸣器结束声音
Blockly.Arduino.controls_notone_noTimer = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = "NewNoTone(" + dropdown_pin + ");\n";
  return code;
};

Blockly.Arduino.group_stepper_setup = function () {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_declare_stepper' + varName] = 'Stepper ' + varName + '(' + steps + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  Blockly.Arduino.setups_['setup_stepper' + varName] = varName + '.setSpeed(' + speed + ');';
  return '';
};

Blockly.Arduino.group_stepper_setup2 = function () {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_declare_stepper' + varName] = 'Stepper ' + varName + '(' + steps + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ');';
  Blockly.Arduino.setups_['setup_stepper' + varName] = varName + '.setSpeed(' + speed + ');';
  return '';
};

Blockly.Arduino.group_stepper_move = function () {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var step = Blockly.Arduino.valueToCode(this, 'step', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Stepper'] = '#include <Stepper.h>';
  return varName + '.step(' + step + ');\n';
};

Blockly.Arduino.RGB_color_seclet = function () {
  var colour = this.getFieldValue('COLOR');
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.RGB_color_rgb = function () {
  var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
  var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
  var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
  var colour = R + "*65536" + "+" + G + "*256" + "+" + B;
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.display_rgb_init = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '= Adafruit_NeoPixel(' + value_ledcount + ',' + dropdown_rgbpin + ',NEO_GRB + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  return '';
};

Blockly.Arduino.display_rgb_Brightness = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  var code = 'rgb_display_' + dropdown_rgbpin + '.setBrightness(' + Brightness + ');';
  return code;
};

Blockly.Arduino.display_rgb = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  var COLOR = Blockly.Arduino.valueToCode(this, 'COLOR');
  COLOR = COLOR.replace(/#/g, "0x");
  var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor((' + value_led + ')-1, ' + COLOR + ');\n';
  return code;
};

Blockly.Arduino.display_rgb_show = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  return code;
};

Blockly.Arduino.display_rgb_rainbow1 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85) \n{\nreturn rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n} \n';
  code2 += 'else if(WheelPos < 170) \n{\nWheelPos -= 85; \nreturn rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n}\n ';
  code2 += 'else\n {\nWheelPos -= 170;\nreturn rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3 = 'void rainbow(uint8_t wait) {\n uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {\n';
  code3 += 'for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {\n';
  code3 += 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
  code3 += 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var code = 'rainbow(' + wait_time + ');\n'
  return code;
};

Blockly.Arduino.display_rgb_rainbow2 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3 = 'void rainbow(uint8_t wait) { uint16_t i, j;\n';
  code3 += 'for(j=0; j<256; j++) {               \n';
  code3 += 'for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{\n';
  code3 += 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n}\n';
  code3 += 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  code3 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var funcName4 = 'rainbowCycle';
  var code4 = 'void rainbowCycle(uint8_t wait) \n{\nuint16_t i, j;\n';
  code4 += 'for(j=0; j<256*5; j++) {\n';
  code4 += 'for(i=0; i< rgb_display_' + dropdown_rgbpin + '.numPixels(); i++) \n{\n';
  code4 += 'rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + j) & 255));}\n';
  code4 += 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  code4 += 'delay(wait);\n}\n}\n';
  Blockly.Arduino.definitions_[funcName4] = code4;
  var code = 'rainbowCycle(' + wait_time + ');\n'
  return code;
};
Blockly.Arduino.display_rgb_rainbow3 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos) {\n';
  code2 += 'if(WheelPos < 85)\n {\nreturn rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);} \n';
  code2 += 'else if(WheelPos < 170)\n {\nWheelPos -= 85; return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);}\n ';
  code2 += 'else {\nWheelPos -= 170;return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);}\n';
  code2 += '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if (type == "normal")
    var code3 = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n{rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(' + rainbow_color + ' & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
  else
    var code3 = 'for (int i = 0; i < rgb_display_' + dropdown_rgbpin + '.numPixels(); i++)\n {rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + ' + rainbow_color + ') & 255));\n}\nrgb_display_' + dropdown_rgbpin + '.show();\n';
  return code3;
};
//执行器-电机转动
Blockly.Arduino.Mixly_motor = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var PIN2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + PIN1 + ', ' + PIN2 + ',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
  var funcName = 'setMotor';
  var code2 = ' void ' + funcName + '(int speedpin,int dirpin, int speed)\n '
  + '  {\n'
  + 'if (speed == 0)\n'
  + '{\n'
  + 'digitalWrite(speedpin, LOW);\n'
  + '} \n'
  + 'else if (speed > 0)\n'
  + '{\n'
  + 'digitalWrite(dirpin, LOW);\n'
  + 'analogWrite(speedpin, speed);\n'
  + '} \n'
  + 'else \n'
  + '{\n'
  +'digitalWrite(dirpin, HIGH);\n'
  +'analogWrite(speedpin, speed);\n'
  + '}\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
Blockly.Arduino.Motor_8833 = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var PIN2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + PIN1 + ', ' + PIN2 + ',' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
  var funcName = 'setMotor';
  var code2 = ' void ' + funcName + '(int speedpin,int dirpin, int speed)\n '
  + '  {\n'
  + 'if (speed == 0)\n'
  + '{\n'
  + 'digitalWrite(speedpin, LOW);\n'
  + '} \n'
  + 'else if (speed > 0)\n'
  + '{\n'
  + 'digitalWrite(dirpin, LOW);\n'
  + 'analogWrite(speedpin, speed);\n'
  + '} \n'
  + 'else \n'
  + '{\n'
  + 'digitalWrite(dirpin, HIGH);\n'
  + 'analogWrite(speedpin,255+speed);\n'
  + '}\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;
};
//语音模块（68段日常用语）
Blockly.Arduino.voice_module = function () {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_voice = this.getFieldValue('VOICE');
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  Blockly.Arduino.setups_['setup_output_sda'] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
  var code = 'send_data(' + dropdown_voice + '); //volume control 0xE0-E7;\n';
  code += 'delay(' + wait_time + ');\n'
  var funcName = 'voice_out';
  var code2 = 'void send_data(int addr)\n ';
  code2 += '{int i;digitalWrite(' + dropdown_pin + ' , LOW);\n';
  code2 += 'delay(3); //>2ms\n';
  code2 += 'for(i=0;i<8;i++)\n';
  code2 += '{digitalWrite(' + dropdown_pin + ', HIGH);\n';
  code2 += 'if(addr&1){delayMicroseconds(2400); //>2400us\n';
  code2 += '          digitalWrite(' + dropdown_pin + ', LOW);\n';
  code2 += '          delayMicroseconds(800);} //>800us\n';
  code2 += 'else{ delayMicroseconds(800); //>800us\n';
  code2 += '      digitalWrite(' + dropdown_pin + ' , LOW);\n';
  code2 += '      delayMicroseconds(2400);} //>2400us\n';
  code2 += '      addr>>=1;} ';
  code2 += '      digitalWrite(' + dropdown_pin + ', HIGH); }\n';
  Blockly.Arduino.definitions_['funcName'] = code2;
  return code;
};

//gd5800 mp3 控制播放
Blockly.Arduino.GD5800_MP3_CONTROL = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = ' mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.' + CONTROL_TYPE + '\n';
  return code;
};

//gd5800 mp3 循环模式
Blockly.Arduino.GD5800_MP3_LOOP_MODE = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var LOOP_MODE = this.getFieldValue('LOOP_MODE');
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = ' mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setLoopMode(' + LOOP_MODE + ');\n';
  return code;
};

//gd5800 mp3 EQ模式
Blockly.Arduino.GD5800_MP3_EQ_MODE = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var EQ_MODE = this.getFieldValue('EQ_MODE');
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = ' mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setEqualizer(' + EQ_MODE + ');\n';
  return code;
};

//gd5800 mp3 设置音量
Blockly.Arduino.GD5800_MP3_VOL = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var vol = Blockly.Arduino.valueToCode(this, 'vol', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = ' mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setVolume(' + vol + ');\n';
  return code;
};

//gd5800 mp3 播放第N首
Blockly.Arduino.GD5800_MP3_PLAY_NUM = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Arduino'] = '#include <Arduino.h>\n';
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>\n';
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = ' mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.playFileByIndexNumber(' + NUM + ');\n';
  return code;
};
