'use strict';

goog.provide('Blockly.Arduino.seeed');

goog.require('Blockly.Arduino');

Blockly.Arduino.seeed_servo_move = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.seeed_servo_read_degrees = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.seeed_led = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'digitalWrite('+dropdown_pin+','+dropdown_stat+');\n'
  return code;
};

Blockly.Arduino.seeed_buzzer = Blockly.Arduino.seeed_led;
Blockly.Arduino.seeed_relay = Blockly.Arduino.seeed_led;

Blockly.Arduino.seeed_btn = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_input_'+dropdown_pin] = 'pinMode('+dropdown_pin+', INPUT);';
  var code = 'digitalRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.seeed_tilt = Blockly.Arduino.seeed_btn;
Blockly.Arduino.seeed_touch = Blockly.Arduino.seeed_btn;

Blockly.Arduino.seeed_rotation = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var code = 'analogRead('+dropdown_pin+')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.seeed_sound = Blockly.Arduino.seeed_rotation;
Blockly.Arduino.seeed_light = Blockly.Arduino.seeed_rotation;
Blockly.Arduino.seeed_temperature = Blockly.Arduino.seeed_rotation;

Blockly.Arduino.grove_serial_lcd_print = function() {
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_rgb_lcd'] = '#include <rgb_lcd.h>';
  Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
  Blockly.Arduino.setups_['setup_lcd_rgb'] = 'lcd.begin(16, 2);';
  var code = 'lcd.setCursor(0, 0);\n'
  code+='lcd.print('+str1+');\n';
  code+='lcd.setCursor(0, 1);\n';
  code+='lcd.print('+str2+');\n';
  return code;
};

Blockly.Arduino.grove_serial_lcd_print2 = function() {
  var str = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var row = Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var column = Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC) || '1';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_rgb_lcd'] = '#include <rgb_lcd.h>';
  Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
  Blockly.Arduino.setups_['setup_lcd_rgb'] = 'lcd.begin(16, 2);';
  var code = 'lcd.setCursor('+column+'-1, '+row+'-1);\n'
  code+='lcd.print('+str+');\n';
  return code;
};

Blockly.Arduino.grove_serial_lcd_setrgb = function() {
  var r = Blockly.Arduino.valueToCode(this, 'R', Blockly.Arduino.ORDER_ATOMIC) || '255'
  var g = Blockly.Arduino.valueToCode(this, 'G', Blockly.Arduino.ORDER_ATOMIC) || '255'
  var b = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '255'
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_rgb_lcd'] = '#include <rgb_lcd.h>';
  Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
  Blockly.Arduino.setups_['setup_lcd_rgb'] = 'lcd.begin(16, 2);';
  var code = 'lcd.setRGB('+r+', '+g+', '+b+');\n'
  return code;
};

Blockly.Arduino.grove_serial_lcd_power = function() {
  var dropdown_stat = this.getTitleValue('STAT');
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_rgb_lcd'] = '#include <rgb_lcd.h>';
  Blockly.Arduino.definitions_['var_lcd_rgb'] = 'rgb_lcd lcd;';
  Blockly.Arduino.setups_['setup_lcd_rgb'] = 'lcd.begin(16, 2);';
  var code = 'lcd.'+dropdown_stat+'();\n'
  return code;
};