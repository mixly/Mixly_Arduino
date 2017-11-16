'use strict';

goog.provide('Blockly.Arduino.communicate');

goog.require('Blockly.Arduino');

Blockly.Arduino.ir_recv = function () {
    var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['var_declare' + variable] = 'long ' + variable + ';';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
       Blockly.Variables.NAME_TYPE);
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
    //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
    Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();';
    var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
    code += '  ' + variable + '=results_' + dropdown_pin + '.value;\n';
    code += '  String type="UNKNOWN";\n';
    ////////////////////////////////////////////////////////////////
    code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
    code += '  if(results_' + dropdown_pin + '.decode_type>=1&&results_' + dropdown_pin + '.decode_type<=13){\n';
    code += '    type=typelist[results_' + dropdown_pin + '.decode_type];\n'
    code += '  }\n';
    code += '  Serial.print("IR TYPE:"+type+"  ");\n';
    code += branch;
    code += '  irrecv_' + dropdown_pin + '.resume();\n'
    code += '} else {\n';
    code += branch2;
    code += '}\n';
    return code;
};


Blockly.Arduino.ir_recv_enable = function () {
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>';
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    return code;
}

Blockly.Arduino.ir_send_nec = function () {
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
    var data = Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bits = Blockly.Arduino.valueToCode(this, 'bits', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var type = this.getFieldValue('TYPE');
    var code = 'irsend.send' + type + '(' + data + ',' + bits + ');\n';
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

Blockly.Arduino.ir_recv_raw = function () {
    var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_recv' + dropdown_pin] = 'IRrecv irrecv_' + dropdown_pin + '(' + dropdown_pin + ');\ndecode_results results_' + dropdown_pin + ';\n';
    if (Blockly.Arduino.setups_['setup_serial_Serial' + profile.default.serial]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_Serial' + profile.default.serial] = 'Serial.begin(' + profile.default.serial + ');';
    }
    Blockly.Arduino.setups_['setup_ir_recv_' + dropdown_pin] = 'irrecv_' + dropdown_pin + '.enableIRIn();\n';
    var code = "if (irrecv_" + dropdown_pin + ".decode(&results_" + dropdown_pin + ")) {\n"
    code += '  ' + 'dumpRaw(&results_' + dropdown_pin + ');\n';
    code += '  irrecv_' + dropdown_pin + '.resume();\n'
    code += '}\n';
    var funcode = 'void dumpRaw(decode_results *results) {\n'
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

Blockly.Arduino.ir_send_raw = function () {
    Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
    Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
    var length = Blockly.Arduino.valueToCode(this, 'length', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var freq = Blockly.Arduino.valueToCode(this, 'freq', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var text = this.getFieldValue('TEXT');
    var code = 'unsigned int buf_raw[' + length + ']={' + text + '};\n'
    code = code + 'irsend.sendRaw(buf_raw,' + length + ',' + freq + ');\n';
    return code;
}

Blockly.Arduino.i2c_master_writer = function () {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.beginTransmission(" + device + ");\n";
    code += "Wire.write(" + value + ");\n";
    code += "Wire.endTransmission();\n";
    return code;
};
Blockly.Arduino.i2c_master_reader = function () {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bytes = Blockly.Arduino.valueToCode(this, 'bytes', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var code = "Wire.requestFrom(" + device + ", " + bytes + ");\n";
    return code;
};
Blockly.Arduino.i2c_master_reader2 = function () {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
    var code = "Wire.read()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_available = function () {
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();\n';
    var code = "Wire.available()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_slave_onreceive = function () {
    var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
    Blockly.Arduino.setups_['setup_i2c_' + pin] = 'Wire.begin(' + pin + ');';
    Blockly.Arduino.setups_['setup_i2c_onReceive_' + pin] = 'Wire.onReceive(i2cReceiveEvent_' + pin + ');';
    var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return '';
}

Blockly.Arduino.spi_transfer = function () {
    Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
    Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
    var pin = Blockly.Arduino.valueToCode(this, 'pin', Blockly.Arduino.ORDER_ATOMIC);
    var value = Blockly.Arduino.valueToCode(this, 'value', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup_output_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
    var code = "digitalWrite(" + pin + ", LOW);\n";
    code += "SPI.transfer(" + value + ");\n";
    code += "digitalWrite(" + pin + ", HIGH);\n";
    return code;
};