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
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  if(xmlText.indexOf("type=\"ir_recv\"") == -1 && xmlText.indexOf("type=\"ir_recv_enable\"") == -1 && xmlText.indexOf("type=\"ir_recv_raw\"") == -1)
  {
    this.setWarningText(null);
  }
  else
  {
    this.setWarningText(Blockly.IR_AND_TONE_WARNING);
  }

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
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  if(xmlText.indexOf("type=\"ir_recv\"") == -1 && xmlText.indexOf("type=\"ir_recv_enable\"") == -1 && xmlText.indexOf("type=\"ir_recv_raw\"") == -1)
  {
    this.setWarningText(null);
  }
  else
  {
    this.setWarningText(Blockly.IR_AND_TONE_WARNING);
  }

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
  colour = '0x' + colour.substring(1, colour.length);
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.RGB_color_rgb = function () {
  var R = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC);
  var G = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC);
  var B = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC);
  var colour = "(("+R+" & 0xffffff) << 16) | (("+G+" & 0xffffff) << 8) | "+B;
  return [colour, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino.display_rgb_init = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var type = this.getFieldValue('TYPE');
  var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.definitions_['var_declare_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel rgb_display_' + dropdown_rgbpin + ' = Adafruit_NeoPixel(' + value_ledcount + ',' + dropdown_rgbpin + ','+type+' + NEO_KHZ800);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  return '';
};

Blockly.Arduino.display_rgb_Brightness = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var Brightness = Blockly.Arduino.valueToCode(this, 'Brightness', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Adafruit_NeoPixel'] = '#include <Adafruit_NeoPixel.h>';
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
  var code = 'rgb_display_' + dropdown_rgbpin + '.setBrightness(' + Brightness + ');\n';
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

Blockly.Arduino.RGB_color_HSV = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var H = Blockly.Arduino.valueToCode(this, 'H', Blockly.Arduino.ORDER_ATOMIC);
  var S= Blockly.Arduino.valueToCode(this, 'S', Blockly.Arduino.ORDER_ATOMIC);
  var V = Blockly.Arduino.valueToCode(this, 'V', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'rgb_display_' + dropdown_rgbpin + '.setPixelColor((' + value_led + ')-1, ' + 'rgb_display_' + dropdown_rgbpin + '.ColorHSV(' +H+','+S+','+V+ '));\n';
  return code;
};

Blockly.Arduino.display_rgb_show = function () {
  var board_type = JSFuncs.getPlatform();
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var code = 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  if (board_type.match(RegExp(/ESP32/))) {
    code+='rgb_display_' + dropdown_rgbpin + '.show();\n';
  }
  return code;
};

Blockly.Arduino.display_rgb_rainbow1 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();\n';
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos){\n'
  + '  if(WheelPos < 85){\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
  + '  }\n'
  + '  else if(WheelPos < 170){\n'
  + '    WheelPos -= 85;\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
  + '  }\n '
  + '  else{\n'
  + '    WheelPos -= 170;\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3 = 'void rainbow(uint8_t wait){\n'
  + '  uint16_t i, j;\n'
  + '  for(j=0; j<256; j++){\n'
  + '    for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
  + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n'
  + '    }\n'
  + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
  + '    delay(wait);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var code = 'rainbow(' + wait_time + ');\n'
  return code;
};

Blockly.Arduino.display_rgb_rainbow2 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var wait_time = Blockly.Arduino.valueToCode(this, 'WAIT', Blockly.Arduino.ORDER_ATOMIC);
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos){\n'
  + '  if(WheelPos < 85){\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
  + '  }\n'
  + '  else if(WheelPos < 170){\n'
  + '    WheelPos -= 85;\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
  + '  }\n'
  + '  else{\n'
  + '    WheelPos -= 170;\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  var funcName3 = 'rainbow';
  var code3 = 'void rainbow(uint8_t wait){\n'
  + '  uint16_t i, j;\n'
  + '  for(j=0; j<256; j++){\n'
  + '    for(i=0; i<rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
  + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel((i+j) & 255));\n'
  + '    }\n'
  + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
  + '    delay(wait);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName3] = code3;
  var funcName4 = 'rainbowCycle';
  var code4 = 'void rainbowCycle(uint8_t wait){\n'
  + '  uint16_t i, j;\n'
  + '  for(j=0; j<256*5; j++){\n'
  + '    for(i=0; i< rgb_display_' + dropdown_rgbpin + '.numPixels(); i++){\n'
  + '      rgb_display_' + dropdown_rgbpin + '.setPixelColor(i, Wheel(((i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + j) & 255));\n'
  + '    }\n'
  + '    rgb_display_' + dropdown_rgbpin + '.show();\n'
  + '    delay(wait);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName4] = code4;
  var code = 'rainbowCycle(' + wait_time + ');\n'
  return code;
};

Blockly.Arduino.display_rgb_rainbow3 = function () {
  var dropdown_rgbpin = this.getFieldValue('PIN');
  var rainbow_color = Blockly.Arduino.valueToCode(this, 'rainbow_color', Blockly.Arduino.ORDER_ATOMIC);
  var type = this.getFieldValue('TYPE');
  var funcName2 = 'Wheel';
  var code2 = 'uint32_t Wheel(byte WheelPos){\n'
  + '  if(WheelPos < 85){\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(WheelPos * 3, 255 - WheelPos * 3, 0);\n'
  + '  }\n'
  + '  else if(WheelPos < 170){\n'
  + '    WheelPos -= 85;\n'
  + '    return rgb_display_' + dropdown_rgbpin + '.Color(255 - WheelPos * 3, 0, WheelPos * 3);\n'
  + '  }\n'
  + '  else{\n'
  + '    WheelPos -= 170;return rgb_display_' + dropdown_rgbpin + '.Color(0, WheelPos * 3, 255 - WheelPos * 3);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName2] = code2;
  if (type == "normal")
    var code3 = 'for(int RGB_RAINBOW_i = 0; RGB_RAINBOW_i < rgb_display_' + dropdown_rgbpin + '.numPixels(); RGB_RAINBOW_i++){\n'
  + '  rgb_display_' + dropdown_rgbpin + '.setPixelColor(RGB_RAINBOW_i, Wheel(' + rainbow_color + ' & 255));\n'
  + '}\n'
  + 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  else
    var code3 = 'for(int RGB_RAINBOW_i = 0; RGB_RAINBOW_i < rgb_display_' + dropdown_rgbpin + '.numPixels(); RGB_RAINBOW_i++){\n'
  + '  rgb_display_' + dropdown_rgbpin + '.setPixelColor(RGB_RAINBOW_i, Wheel(((RGB_RAINBOW_i * 256 / rgb_display_' + dropdown_rgbpin + '.numPixels()) + ' + rainbow_color + ') & 255));\n'
  + '}\n'
  + 'rgb_display_' + dropdown_rgbpin + '.show();\n';
  return code3;
};
//执行器-电机转动
Blockly.Arduino.Mixly_motor = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var PIN2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var PIN_EN = Blockly.Arduino.valueToCode(this, 'PIN_EN', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor(' + PIN1 + ', ' + PIN2 + ', ' + PIN_EN + ', ' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
  var funcName = 'setMotor';
  var code2 = 'void ' + funcName + '(int dirpin1,int dirpin2,int speedpin, int speed)\n'
  + '{\n'
  + ' digitalWrite(dirpin2,!digitalRead(dirpin1));\n'
  + '  if (speed == 0)\n'
  + '  {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, 0);\n'
  + '  } \n'
  + '    else if (speed > 0)\n'
  + '  {\n'
  + '    digitalWrite(dirpin1, LOW);\n'
  + '    analogWrite(speedpin, speed);\n'
  + '  } \n'
  + '  else\n'
  + '  {\n'
  + '    digitalWrite(dirpin1, HIGH);\n'
  + '    analogWrite(speedpin, -speed);\n'
  + '  }\n'
  + '}\n';
  Blockly.Arduino.definitions_[funcName] = code2;
  return code;

};
Blockly.Arduino.Motor_8833 = function () {
  var PIN1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var PIN2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var code = 'setMotor8833(' + PIN1 + ', ' + PIN2 + ', ' + speed + ');\n';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S'] = 'pinMode(' + PIN1 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D'] = 'pinMode(' + PIN2 + ', OUTPUT);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_S_W'] = 'digitalWrite(' + PIN1 + ', LOW);';
  Blockly.Arduino.setups_['setup_output_' + PIN1 + PIN2 + '_D_W'] = 'digitalWrite(' + PIN2 + ', LOW);';
  var funcName = 'setMotor8833';
  var code2 = 'void ' + funcName + '(int speedpin,int dirpin, int speed)\n'
  + '{\n'
  + '  if (speed == 0)\n'
  + '  {\n'
  + '    digitalWrite(dirpin, LOW);\n'
  + '    analogWrite(speedpin, 0);\n'
  + '  } \n'
  + '  else if (speed > 0)\n'
  + '  {\n'
  + '    digitalWrite(dirpin, LOW);\n'
  + '    analogWrite(speedpin, speed);\n'
  + '  } \n'
  + '  else \n'
  + '  {\n'
  + '    digitalWrite(dirpin, HIGH);\n'
  + '    analogWrite(speedpin, 255 + speed);\n'
  + '  }\n'
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
  var code2 = 'void send_data(int addr){\n'
  + '  int i;\n'
  + '  digitalWrite(' + dropdown_pin + ' , LOW);\n'
  + '  delay(3); //>2ms\n'
  + '  for(i=0; i<8; i++){\n'
  + '    digitalWrite(' + dropdown_pin + ', HIGH);\n'
  + '    if(addr&1){\n'
  + '      delayMicroseconds(2400); //>2400us\n'
  + '      digitalWrite(' + dropdown_pin + ', LOW);\n'
  + '      delayMicroseconds(800);\n'
  + '    } //>800us\n'
  + '    else{\n'
  + '      delayMicroseconds(800); //>800us\n'
  + '      digitalWrite(' + dropdown_pin + ', LOW);\n'
  + '      delayMicroseconds(2400);\n'
  + '    } //>2400us\n'
  + '    addr>>=1;\n'
  + '  }\n'
  + '  digitalWrite(' + dropdown_pin + ', HIGH);\n'
  + '}\n';
  Blockly.Arduino.definitions_['funcName'] = code2;
  return code;
};

//gd5800 mp3 控制播放
Blockly.Arduino.GD5800_MP3_CONTROL = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var CONTROL_TYPE = this.getFieldValue('CONTROL_TYPE');
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.' + CONTROL_TYPE + '\n';
  return code;
};

//gd5800 mp3 循环模式
Blockly.Arduino.GD5800_MP3_LOOP_MODE = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var LOOP_MODE = this.getFieldValue('LOOP_MODE');
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setLoopMode(' + LOOP_MODE + ');\n';
  return code;
};

//gd5800 mp3 EQ模式
Blockly.Arduino.GD5800_MP3_EQ_MODE = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var EQ_MODE = this.getFieldValue('EQ_MODE');
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setEqualizer(' + EQ_MODE + ');\n';
  return code;
};

//gd5800 mp3 设置音量
Blockly.Arduino.GD5800_MP3_VOL = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var vol = Blockly.Arduino.valueToCode(this, 'vol', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.setVolume(' + vol + ');\n';
  return code;
};

//gd5800 mp3 播放第N首
Blockly.Arduino.GD5800_MP3_PLAY_NUM = function () {
  var rxpin = Blockly.Arduino.valueToCode(this, 'RXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var txpin = Blockly.Arduino.valueToCode(this, 'TXPIN', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_GD5800'] = '#include <GD5800_Serial.h>';
  Blockly.Arduino.definitions_['var_declare_GD5800_ mp3' + rxpin + txpin] = 'GD5800_Serial mp3' + rxpin + txpin + '(' + rxpin + ', ' + txpin + ');';
  Blockly.Arduino.setups_['setup_ mp3' + rxpin + txpin] = 'mp3' + rxpin + txpin + '.begin(9600);';
  var code = 'mp3' + rxpin + txpin + '.playFileByIndexNumber(' + NUM + ');\n';
  return code;
};

Blockly.Arduino.AFMotorRun = function () {
  Blockly.Arduino.definitions_['include_AFMotor'] = '#include <AFMotor.h>';
  var motorNO = this.getFieldValue('motor');
  var direction = this.getFieldValue('direction');
  var speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC);
  var code = "";
  Blockly.Arduino.definitions_['var_declare_motor_' + motorNO] =  "AF_DCMotor" + ' motor'+motorNO+'(' + motorNO + ');';
  code = ' motor'+motorNO + ".setSpeed(" + speed + ");\n" + ' motor'+motorNO  + ".run(" + direction + ");\n";
  return code;
};

Blockly.Arduino.AFMotorStop = function () {
  Blockly.Arduino.definitions_['include_AFMotor'] = '#include <AFMotor.h>';
  var motorNO = this.getFieldValue('motor');
  var code = "";
  Blockly.Arduino.definitions_['var_declare_motor_' + motorNO] =  "AF_DCMotor" + ' motor'+motorNO+'(' + motorNO + ');';
  code = ' motor'+motorNO+".setSpeed(0);\n" +' motor'+motorNO + ".run(RELEASE);\n";
  return code;
};

//初始化DFPlayer Mini
Blockly.Arduino.arduino_dfplayer_mini_begin = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_dfplayer_pin = Blockly.Arduino.valueToCode(this, 'dfplayer_pin', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_Arduino'] = '#include "Arduino.h"';
  Blockly.Arduino.definitions_['include_DFRobotDFPlayerMini'] = '#include "DFRobotDFPlayerMini.h"';
  Blockly.Arduino.definitions_['var_declare_DFPlayerMini_' + text_dfplayer_name] = 'DFRobotDFPlayerMini '+text_dfplayer_name+';';
  Blockly.Arduino.setups_['setup_DFPlayerMini_' + text_dfplayer_name] = ''+text_dfplayer_name+'.begin('+value_dfplayer_pin+');';
  var code = '';
  return code;
};

//定义DFPlayer Mini 所使用的串口类型
Blockly.Arduino.arduino_dfplayer_mini_pin = function() {
  var dropdown_pin_type = this.getFieldValue('pin_type');
  Blockly.Arduino.definitions_['include_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  var code = dropdown_pin_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 设置串口通信的超时时间
Blockly.Arduino.arduino_dfplayer_mini_setTimeOut = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_timeout_data = Blockly.Arduino.valueToCode(this, 'timeout_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.setTimeOut('+value_timeout_data+');\n';
  return code;
};

//DFPlayer Mini 设置音量
Blockly.Arduino.arduino_dfplayer_mini_volume = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_volume_data = Blockly.Arduino.valueToCode(this, 'volume_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.volume('+value_volume_data+');\n';
  return code;
};

//DFPlayer Mini 音量+|-
Blockly.Arduino.arduino_dfplayer_mini_volume_up_down = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var dropdown_volume_type = this.getFieldValue('volume_type');
  var code = ''+text_dfplayer_name+'.'+dropdown_volume_type+'();\n';
  return code;
};

//DFPlayer Mini 设置音效
Blockly.Arduino.arduino_dfplayer_mini_EQ = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_eq_data = Blockly.Arduino.valueToCode(this, 'eq_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.EQ('+value_eq_data+');\n';
  return code;
};

//DFPlayer Mini 定义音效类型
Blockly.Arduino.arduino_dfplayer_mini_EQ_type = function() {
  var dropdown_eq_type = this.getFieldValue('eq_type');
  var code = dropdown_eq_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 指定播放设备
Blockly.Arduino.arduino_dfplayer_mini_outputDevice = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_outputdevice_data = Blockly.Arduino.valueToCode(this, 'outputdevice_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.outputDevice('+value_outputdevice_data+');\n';
  return code;
};

//DFPlayer Mini 定义播放设备类型
Blockly.Arduino.arduino_dfplayer_mini_outputDevice_type = function() {
  var dropdown_outputdevice_type = this.getFieldValue('outputdevice_type');
  var code = dropdown_outputdevice_type;
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 设置-1
Blockly.Arduino.arduino_dfplayer_set_1 = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var dropdown_set_data = this.getFieldValue('set_data');
  var code = ''+text_dfplayer_name+'.'+dropdown_set_data+'();\n';
  return code;
};

//DFPlayer Mini 播放和循环指定曲目
Blockly.Arduino.arduino_dfplayer_play_loop = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_play_data = Blockly.Arduino.valueToCode(this, 'play_data', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_play_type = this.getFieldValue('play_type');
  var code = ''+text_dfplayer_name+'.'+dropdown_play_type+'('+value_play_data+');\n';
  return code;
};

//DFPlayer Mini 播放指定文件夹下的曲目
Blockly.Arduino.arduino_dfplayer_playFolder = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_fold_data = Blockly.Arduino.valueToCode(this, 'fold_data', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_fold_type = this.getFieldValue('fold_type');
  var value_play_data = Blockly.Arduino.valueToCode(this, 'play_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.'+dropdown_fold_type+'('+value_fold_data+', '+value_play_data+');\n';
  return code;
};

//DFPlayer Mini 循环播放指定文件夹下的曲目
Blockly.Arduino.arduino_dfplayer_loopFolder = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_fold_data = Blockly.Arduino.valueToCode(this, 'fold_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.loopFolder('+value_fold_data+');\n';
  return code;
};

//DFPlayer Mini 获取当前信息
Blockly.Arduino.arduino_dfplayer_read_now = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var dropdown_read_type = this.getFieldValue('read_type');
  var code = ''+text_dfplayer_name+'.'+dropdown_read_type+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 获取U盘|SD卡|FLASH的总文件数
Blockly.Arduino.arduino_dfplayer_readFileCounts = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_device_type = Blockly.Arduino.valueToCode(this, 'device_type', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_play_data = this.getFieldValue('play_data');
  var code = ''+text_dfplayer_name+'.'+dropdown_play_data+'('+value_device_type+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//DFPlayer Mini 获取指定文件夹下的文件数
Blockly.Arduino.arduino_dfplayer_readFileCountsInFolder = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var value_folder_data = Blockly.Arduino.valueToCode(this, 'folder_data', Blockly.Arduino.ORDER_ATOMIC);
  var code = ''+text_dfplayer_name+'.readFileCountsInFolder('+value_folder_data+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.arduino_dfplayer_available = function() {
  var text_dfplayer_name = this.getFieldValue('dfplayer_name');
  var dropdown_type = this.getFieldValue('type');
  var code = ''+text_dfplayer_name+'.'+dropdown_type+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};