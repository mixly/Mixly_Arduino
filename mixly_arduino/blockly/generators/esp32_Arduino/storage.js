'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

Blockly.Arduino.store_sd_write = function() {
	var file = Blockly.Arduino.quote_(this.getFieldValue('FILE'));
	//file=file.replace(/String/,"");
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
	//data=data.replace(/String/,"");
	var newline = Blockly.Arduino.valueToCode(this, 'NEWLINE', Blockly.Arduino.ORDER_ATOMIC) || 'false';
	Blockly.Arduino.definitions_['include_SD'] = '#include <SD.h>';
	Blockly.Arduino.definitions_['include_SPI'] = '#include <SPI.h>';
	Blockly.Arduino.setups_['setup_sd_write_chipselect'] = 'const int chipSelect = 4;';
	Blockly.Arduino.setups_['setup_sd_write_begin'] = 'SD.begin(chipSelect);';
	Blockly.Arduino.definitions_['var_File_datafile'] = 'File datafile;';
	var code='datafile = SD.open('+file+', FILE_WRITE);\n';
	code+='if(datafile){\n';
	code+='	datafile.print('+data+');\n';
	if(newline=='true'){
		code+='	datafile.println("");\n';
	}
	code+='	datafile.close();\n';
	code+='}\n';
	return code;
}

Blockly.Arduino.store_eeprom_write_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	var funcName='eepromWriteLong';
    var code2='void '+funcName+'(int address, unsigned long value) {\n' 
	+ '  union u_tag {\n'
	+ '  	byte b[4];\n'
	+ '  	unsigned long ULtime;\n'
	+ '  }\n'
	+ '  time;\n'
	+ '  time.ULtime=value;\n'
	+ '  EEPROM.write(address, time.b[0]);\n'
	+ '  EEPROM.write(address+1, time.b[1]);\n'
	+ '  if (time.b[2] != EEPROM.read(address+2) ) EEPROM.write(address+2, time.b[2]);\n'
	+ '  if (time.b[3] != EEPROM.read(address+3) ) EEPROM.write(address+3, time.b[3]);\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	return 'eepromWriteLong('+address+', '+data+');\n';
}

Blockly.Arduino.store_eeprom_read_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	var code ='eepromReadLong('+address+')';
	var funcName='eepromReadLong';
    var code2='unsigned long '+funcName+'(int address) {\n' 
	+ '  union u_tag {\n'
	+ '  	byte b[4];\n'
	+ '  	unsigned long ULtime;\n'
	+ '  }\n'
	+ '  time;\n'
	+ '  time.b[0] = EEPROM.read(address);\n'
	+ '  time.b[1] = EEPROM.read(address+1);\n'
	+ '  time.b[2] = EEPROM.read(address+2);\n'
	+ '  time.b[3] = EEPROM.read(address+3);\n'
	+ '  return time.ULtime;\n'
	+ '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return [code,Blockly.Arduino.ORDER_ATOMIC];
}



Blockly.Arduino.store_eeprom_write_byte = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	return 'EEPROM.write('+address+', '+data+');\n';
}

Blockly.Arduino.store_eeprom_read_byte = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	var code ='EEPROM.read('+address+')';
	return [code,Blockly.Arduino.ORDER_ATOMIC];
}