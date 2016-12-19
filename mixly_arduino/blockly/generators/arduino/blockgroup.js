'use strict';

goog.provide('Blockly.Arduino.blockgroup');

goog.require('Blockly.Arduino');

Blockly.Arduino.serial_begin = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || profile.default.serial;
  Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+content+');';
  return '';
};

Blockly.Arduino.serial_write = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select + profile.default.serial]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select + profile.default.serial] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
};

Blockly.Arduino.serial_print = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.print('+content+');\n';
  return code;
};

Blockly.Arduino.serial_println = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.println('+content+');\n';
  return code;
};

Blockly.Arduino.serial_print_hex = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.println('+content+',HEX);\n';
  return code;
};

Blockly.Arduino.serial_available = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".available() > 0";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".readString()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr_until = function() {
   var serial_select = this.getFieldValue('serial_select');
   var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".readStringUntil("+content+")";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_parseInt_Float = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var dropdown_stat = this.getFieldValue('STAT');
   var code =serial_select+'.'+dropdown_stat+'()';
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_flush = function() {
  var serial_select = this.getFieldValue('serial_select');
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.flush();\n';
  return code;
};

Blockly.Arduino.serial_softserial = function() {
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['var_SoftwareSerial'] = 'SoftwareSerial mySerial('+dropdown_pin1+','+dropdown_pin2+');';
  return '';
};

Blockly.Arduino.ir_recv = function() {
   var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var branch = Blockly.Arduino.statementToCode(this, 'DO');
   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
   code += '  String type="UNKNOWN";\n';
   ////////////////////////////////////////////////////////////////
   code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
   code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
   code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
   code += '  }\n';
   code += '  Serial.print("IR TYPE:"+type+"  ");\n';
   code += branch;
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='} else {\n';
   code +=branch2;
   code +='}\n';
   return code;
};

Blockly.Arduino.serial_event = function() {
    var serial_select = this.getFieldValue('serial_select');
    var funcName = 'attachPinInterrupt_fun_' + serial_select;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void ' + serial_select.replace('Serial', 'serialEvent') + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return "";
};

Blockly.Arduino.ir_recv_enable = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>';
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var code='irrecv_'+dropdown_pin+'.enableIRIn();\n';
	return code;
}

Blockly.Arduino.ir_send_nec = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
	Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
	var data = Blockly.Arduino.valueToCode(this, 'data',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var bits = Blockly.Arduino.valueToCode(this, 'bits',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var type = this.getFieldValue('TYPE');
	var code='irsend.send'+type+'('+data+','+bits+');\n';
	/*
	for (var name in Blockly.Arduino.definitions_) {
		var def = Blockly.Arduino.definitions_[name];
		if (def.match(/^IRrecv irrecv_/)) {
			var tmp=def.substring(7,def.indexOf('('));
			code=code+tmp+'.enableIRIn();\n';
		}
	}*/
	return code;
}

Blockly.Arduino.ir_recv_raw = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   if(Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');'; 
   }
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+'dumpRaw(&results_'+dropdown_pin+');\n';
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='}\n';
   var funcode='void dumpRaw(decode_results *results) {\n' 
	+ '  int count = results->rawlen;\n'
	+ '  Serial.print("RawData (");\n'
	+ '  Serial.print(count, DEC);\n'
	+ '  Serial.print("): ");\n'
	+ '  for (int i = 0; i < count; i++) {\n'
	+ '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
	+ '    if(i!=count-1){\n'
	+ '      Serial.print(",");\n'
	+ '    }\n'
	+ '  }\n'
	+ '  Serial.println("");\n'
	+ '}\n';
   Blockly.Arduino.definitions_['dumpRaw'] = funcode;
   return code;
};

Blockly.Arduino.ir_send_raw = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
	Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
	var length = Blockly.Arduino.valueToCode(this, 'length',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var freq = Blockly.Arduino.valueToCode(this, 'freq',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var text = this.getFieldValue('TEXT');
	var code='unsigned int buf_raw['+length+']={'+text+'};\n'
	code=code+'irsend.sendRaw(buf_raw,'+length+','+freq+');\n';
	return code;
}

Blockly.Arduino.i2c_master_writer = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
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

Blockly.Arduino.spi_transfer = function() {
   Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
   Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
   var pin = Blockly.Arduino.valueToCode(this, 'pin',Blockly.Arduino.ORDER_ATOMIC);
   var value = Blockly.Arduino.valueToCode(this, 'value',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.setups_['setup_output_'+pin] = 'pinMode('+pin+', OUTPUT);';
   var code ="digitalWrite("+pin+", LOW);\n";
   code += "SPI.transfer("+value+");\n";
   code += "digitalWrite("+pin+", HIGH);\n";
   return code;
};

Blockly.Arduino.chaoshengbo = function() {
	var dropdown_pin1 = this.getFieldValue('PIN1');
	var dropdown_pin2 = this.getFieldValue('PIN2');
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin1] = 'pinMode('+dropdown_pin1+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin2] = 'pinMode('+dropdown_pin2+', INPUT);';
	var funcName='checkdistance_'+dropdown_pin1+'_'+dropdown_pin2;
	var code='float'+ ' ' + funcName + '() {\n' 
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n' +'  delayMicroseconds(2);\n'
	+ '  digitalWrite('+dropdown_pin1+', HIGH);\n'+'  delayMicroseconds(10);\n'
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n'
	+ '  float distance = pulseIn('+dropdown_pin2+', HIGH) / 58.00;\n'
	+ '  delay(10);\n'+'  return distance;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.chaoshengbo2 = function() {
	var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
	var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin1] = 'pinMode('+dropdown_pin1+', OUTPUT);';
	Blockly.Arduino.setups_['setup_output_'+dropdown_pin2] = 'pinMode('+dropdown_pin2+', INPUT);';
	var funcName='checkdistance_'+dropdown_pin1+'_'+dropdown_pin2;
	var code='float'+ ' ' + funcName + '() {\n' 
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n' +'  delayMicroseconds(2);\n'
	+ '  digitalWrite('+dropdown_pin1+', HIGH);\n'+'  delayMicroseconds(10);\n'
	+ '  digitalWrite('+dropdown_pin1+', LOW);\n'
	+ '  float distance = pulseIn('+dropdown_pin2+', HIGH) / 58.00;\n'
	+ '  delay(10);\n'+'  return distance;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.dht11 = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var what = this.getFieldValue('WHAT');
	Blockly.Arduino.definitions_['define_dht11'] = '#include <dht11.h>';
	Blockly.Arduino.definitions_['var_dht11'+dropdown_pin] = 'dht11 myDHT_'+dropdown_pin+';';
	var funcName='dht_'+dropdown_pin+'_get'+what;
	var code='int'+ ' ' + funcName + '() {\n' 
	+ '  int chk = myDHT_'+dropdown_pin+'.read('+dropdown_pin+');\n'
	+ '  int value = myDHT_'+dropdown_pin+'.'+what+';\n'
	+ '  return value;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return [funcName+'()', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.ds18b20 = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var unit = this.getFieldValue('UNIT');
	Blockly.Arduino.definitions_['define_OneWire'] = '#include <OneWire.h>';
	Blockly.Arduino.definitions_['define_DallasTemperature'] = '#include <DallasTemperature.h>';
	Blockly.Arduino.definitions_['var_OneWire_oneWire'] = 'OneWire oneWire'+'('+dropdown_pin+');';
	Blockly.Arduino.definitions_['var_DallasTemperature_sensors'] = 'DallasTemperature sensors(&oneWire);';
	Blockly.Arduino.definitions_['var_DeviceAddress_insideThermometer'] = 'DeviceAddress insideThermometer;';
	Blockly.Arduino.setups_['setup_sensors_getAddress'] = 'sensors.getAddress(insideThermometer, 0);';
	Blockly.Arduino.setups_['setup_sensors_setResolution'] = 'sensors.setResolution(insideThermometer, 9);';
	var funcName='ds18b20_getTemp';
	var code='float'+ ' ' + funcName + '(int w) {\n' 
	+ '  sensors.requestTemperatures();\n'
	+ '  if(w==0) {return sensors.getTempC(insideThermometer);}\n'
	+ '  else {return sensors.getTempF(insideThermometer);}\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
	return ['ds18b20_getTemp('+unit+')', Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.servo_move = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
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

Blockly.Arduino.controls_tone2=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = ""; 
   if(window.isNaN(dropdown_pin)){
      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "tone("+dropdown_pin+","+fre+","+dur+");\n";
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

Blockly.Arduino.group_lcd_init = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_i2c_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C '+varName+'('+device+','+TYPE+');';
  return '';
};

Blockly.Arduino.group_lcd_init2 = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_softi2c'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['define_softi2c_lcd'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  return '';
};

Blockly.Arduino.group_lcd_init3 = function () {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin5 = Blockly.Arduino.valueToCode(this, 'PIN5', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin6 = Blockly.Arduino.valueToCode(this, 'PIN6', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['define_lcd'] = '#include <LiquidCrystal.h>';
    Blockly.Arduino.definitions_['var_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ',' + dropdown_pin5 + ',' + dropdown_pin6 + ');';
    Blockly.Arduino.setups_['setup_lcd_begin_' + varName] = varName + '.begin('+TYPE+');';
   
    return '';
};

Blockly.Arduino.group_lcd_print = function() {
  var varName = this.getFieldValue('VAR');
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  //var str3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  //var str4 = Blockly.Arduino.valueToCode(this, 'TEXT4', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.setCursor(0, 0);\n'
  code+=varName+'.print('+str1+');\n';
  code+=varName+'.setCursor(0, 1);\n';
  code+=varName+'.print('+str2+');\n';  
  //code+=varName+'.setCursor(0, 2);\n';
  //code+=varName+'.print('+str3+');\n';
  //code+=varName+'.setCursor(0, 3);\n';
  //code+=varName+'.print('+str4+');\n';
  return code;
};

Blockly.Arduino.group_lcd_print2 = function() {
  var varName = this.getFieldValue('VAR');
  var str = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var row = Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var column = Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC) || '1';
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.setCursor('+column+'-1, '+row+'-1);\n'
  code+=varName+'.print('+str+');\n';
  return code;
};

Blockly.Arduino.group_lcd_power = function() {
  var varName = this.getFieldValue('VAR');
  var dropdown_stat = this.getFieldValue('STAT');
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.'+dropdown_stat+'();\n'
  return code;
};

Blockly.Arduino.group_stepper_setup = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+');';
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
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+','+dropdown_pin3+','+dropdown_pin4+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_move = function () {
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var step = Blockly.Arduino.valueToCode(this, 'step', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
    return varName + '.step(' + step + ');\n';
};
Blockly.Arduino.lp2i_u8g_draw_string = function () {
    var value_text = Blockly.Arduino.valueToCode(this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + 'do {'
      + 'u8g.setFont(u8g_font_unifont);\n'
      + 'u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '} while( u8g.nextPage());\n'
      + 'delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += 'do {\n'
    code += 'u8g.drawStr(' + x + ', ' + y + ', ' + value_text + ');\n'
    code += '}\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.lp2i_u8g_draw_4strings = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + 'do {'
      + 'u8g.setFont(u8g_font_unifont);\n'
      + 'u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '} while( u8g.nextPage());\n'
      + 'delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += 'do {\n'
    code += 'u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
    code += 'u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
    code += 'u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
    code += 'u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
    code += '}\n while( u8g.nextPage() );\n';
    return code;
};

Blockly.Arduino.lp2i_u8g_print = function () {
    var value_n = Blockly.Arduino.valueToCode(this, 'N', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
      'u8g.firstPage();\n'
      + 'do {'
      + 'u8g.setFont(u8g_font_unifont);\n'
      + 'u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '} while( u8g.nextPage());\n'
      + 'delay(1000);\n';
    var code =
      'u8g.firstPage();\n'
    code += 'do {\n'
    code += 'u8g.setPrintPos(' + x + ', ' + y + ');\n'
    code += 'u8g.print(' + value_n + ');\n'
    code += '}\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.lp2i_u8g_4draw_print = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_n1 = Blockly.Arduino.valueToCode(this, 'N1', Blockly.Arduino.ORDER_ATOMIC);
    var value_n2 = Blockly.Arduino.valueToCode(this, 'N2', Blockly.Arduino.ORDER_ATOMIC);
    var value_n3 = Blockly.Arduino.valueToCode(this, 'N3', Blockly.Arduino.ORDER_ATOMIC);
    var value_n4 = Blockly.Arduino.valueToCode(this, 'N4', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + 'do {'
      + 'u8g.setFont(u8g_font_unifont);\n'
      + 'u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '} while( u8g.nextPage());\n'
      + 'delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += 'do {\n'
    code += 'u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
    code += 'u8g.setPrintPos(100, 12 );\n'
    code += 'u8g.print(' + value_n1 + ');\n'
    code += 'u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
    code += 'u8g.setPrintPos(100, 28 );\n'
    code += 'u8g.print(' + value_n2 + ');\n'
    code += 'u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
    code += 'u8g.setPrintPos(100, 44 );\n'
    code += 'u8g.print(' + value_n3 + ');\n'
    code += 'u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
    code += 'u8g.setPrintPos(100, 60 );\n'
    code += 'u8g.print(' + value_n4 + ');\n'
    code += '}\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.display_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
  Blockly.Arduino.definitions_['var_rgb_display'+dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_'+dropdown_rgbpin+''+'(4);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_'+dropdown_rgbpin] ='rgb_display_'+dropdown_rgbpin+'.begin();';
  Blockly.Arduino.setups_['setup_rgb_display_setpin'+dropdown_rgbpin] ='rgb_display_'+dropdown_rgbpin+'.setPin('+dropdown_rgbpin+');';
  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
  Blockly.Arduino.definitions_['var_rgb_display'+dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_'+dropdown_rgbpin+''+'(4);';
  Blockly.Arduino.setups_['setup_rgb_display_begin_'+dropdown_rgbpin] ='rgb_display_'+dropdown_rgbpin+'.begin();';
  Blockly.Arduino.setups_['setup_rgb_display_setpin'+dropdown_rgbpin] ='rgb_display_'+dropdown_rgbpin+'.setPin('+dropdown_rgbpin+');';
  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_4digitdisplay_power=function(){
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.'+stat+'();\n';
}
Blockly.Arduino.display_4digitdisplay_displayString=function(){
	var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.displayString('+value+');\n';
}
Blockly.Arduino.display_4digitdisplay_showDot=function(){
	var no=this.getFieldValue("NO");
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.setDot('+no+','+stat+');\n';
}