'use strict';

goog.provide('Blockly.Arduino.blockgroup');

goog.require('Blockly.Arduino');

Blockly.Arduino.ir_recv = function() {
   var variable = Blockly.Arduino.variableDB_.getName(this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
   var dropdown_pin = this.getTitleValue('PIN');
   var branch = Blockly.Arduino.statementToCode(this, 'DO');
   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   Blockly.Arduino.setups_['setup_ir_recv'] = 'Serial.begin(9600);\n';
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
   code += branch;
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='} else {\n';
   code +=branch2;
   code +='}\n';
   return code;
};
Blockly.Arduino.chaoshengbo = function() {
	var dropdown_pin1 = this.getTitleValue('PIN1');
	var dropdown_pin2 = this.getTitleValue('PIN2');
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin1] = 'pinMode('+dropdown_pin1+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin2] = 'pinMode('+dropdown_pin2+', INPUT);';
	var funcName='checkdistance_'+dropdown_pin1+'_'+dropdown_pin2;
	var code='int'+ ' ' + funcName + '() {\n' 
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n' +'  delayMicroseconds(2);\n'
	+ '  digitalWrite('+dropdown_pin1+', HIGH);\n'+'  delayMicroseconds(10);\n'
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n'
	+ '  float distance = pulseIn('+dropdown_pin2+', HIGH) / 58.00;\n'
	+ '  delay(10);\n'+'  return distance;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.i2c_master_writer = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
   var device = Blockly.Arduino.valueToCode(this, 'device',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var value = Blockly.Arduino.valueToCode(this, 'value',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var code ="Wire.beginTransmission("+device+");\n";
   code += "Wire.write("+value+");\n";
   code += "Wire.endTransmission();\n";
   return code;
};
Blockly.Arduino.i2c_master_reader = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
   var device = Blockly.Arduino.valueToCode(this, 'device',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var bytes = Blockly.Arduino.valueToCode(this, 'bytes',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var code ="Wire.requestFrom("+device+", "+bytes+");\n";
   return code;
};
Blockly.Arduino.i2c_master_reader2 = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
   var code ="Wire.read()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_available = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
   var code ="Wire.available()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.servo_move = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = this.getTitleValue('PIN');
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return code;
};