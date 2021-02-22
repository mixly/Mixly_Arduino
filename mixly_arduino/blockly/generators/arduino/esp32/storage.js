'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

//初始化SPIFFS
Blockly.Arduino.initialize_spiffs = function () {
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File myFile;\n';
	Blockly.Arduino.setups_['setup_SPIFFS.begin'] = 'SPIFFS.begin(true);';
	var code='';
	return code;
};

//打开文件
Blockly.Arduino.spiffs_open_file = function () {
	var file_var = this.getFieldValue('file_var');
	var file_path = this.getFieldValue('file_path');
	file_path='"'+file_path+'"';
	var mode = this.getFieldValue('MODE');
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	return file_var+'= SPIFFS.open(String(' + file_path + '), '+mode+');\n';
};
Blockly.Arduino.spiffs_close_file = function () {
	var file_var = this.getFieldValue('file_var');
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	return file_var+'.close();\n';
};

//将数据追加到文件
Blockly.Arduino.spiffs_write_data = function () {
	var file_var = this.getFieldValue('file_var');
	var data= Blockly.Arduino.valueToCode(this, 'data', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	return file_var+'.print(String(' + data + '));\n';
};

//文件可读 
Blockly.Arduino.spiffs_read_available = function () {
	var file_var = this.getFieldValue('file_var');
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	var code=file_var+'.available()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//读取文件内容
Blockly.Arduino.spiffs_read_data = function () {
	var file_var = this.getFieldValue('file_var');
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	var code = file_var+'.read()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//检查文件大小
Blockly.Arduino.spiffs_file_size = function () {
	var file_var = this.getFieldValue('file_var');
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	Blockly.Arduino.definitions_['esp32_spiffs'] ='File '+file_var+';\n';
	var code = file_var+'.size()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//删除文件
Blockly.Arduino.spiffs_delete_file = function () {
	Blockly.Arduino.definitions_['include_FS'] ='#include "FS.h"';
	Blockly.Arduino.definitions_['include_SPIFFS'] ='#include "SPIFFS.h"';
	var file_path = this.getFieldValue('file_path');
	file_path='"'+file_path+'"';
	return 'SPIFFS.remove(String(' + file_path + '));';
};

Blockly.Arduino.store_eeprom_write_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
		Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
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
	+'   EEPROM.commit();\n'
	+ '}\n';
	Blockly.Arduino.definitions_[funcName] = code2;
	return 'eepromWriteLong('+address+', '+data+');\n';
}

Blockly.Arduino.store_eeprom_read_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
		Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
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
	Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	return 'EEPROM.write('+address+', '+data+');\nEEPROM.commit();\n';
}

Blockly.Arduino.store_eeprom_read_byte = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	var code ='EEPROM.read('+address+')';
	return [code,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.store_eeprom_put = function () {
    Blockly.Arduino.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.put(' + address + ', ' + data + ');\nEEPROM.commit();';
}

Blockly.Arduino.store_eeprom_get = function () {
    Blockly.Arduino.setups_['setup_EEPROM_begin'] = 'EEPROM.begin(4000);';
    var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    return 'EEPROM.get(' + address + ', ' + data + ');\n';
}